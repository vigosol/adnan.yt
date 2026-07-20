import type { APIRoute } from 'astro'
import { Resend } from 'resend'

export const prerender = false

interface ContactPayload {
  name: string
  email: string
  whatsapp?: string
  service?: string
  budget?: string
  deadline?: string
  message: string
  'cf-turnstile-response'?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('Contact form: missing TURNSTILE_SECRET_KEY env var.')
    return false
  }
  if (!token) return false

  const body = new URLSearchParams({ secret, response: token })
  if (ip) body.set('remoteip', ip)

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body,
  })
  const result = await res.json()
  return result.success === true
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let data: Partial<ContactPayload>
  try {
    data = await request.json()
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request body.' }, 400)
  }

  const { name, email, whatsapp, service, budget, deadline, message } = data

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return jsonResponse({ success: false, error: 'Name, email, and project details are required.' }, 400)
  }
  if (!EMAIL_RE.test(email.trim())) {
    return jsonResponse({ success: false, error: 'Please enter a valid email address.' }, 400)
  }

  let clientIp: string | null = null
  try {
    clientIp = clientAddress
  } catch {
    clientIp = null
  }

  const captchaOk = await verifyTurnstile(data['cf-turnstile-response'], clientIp)
  if (!captchaOk) {
    return jsonResponse({ success: false, error: 'Spam check failed. Please try again.' }, 400)
  }

  const adminEmail = import.meta.env.ADMIN_EMAIL
  const resendApiKey = import.meta.env.RESEND_API_KEY

  if (!adminEmail || !resendApiKey) {
    console.error('Contact form: missing ADMIN_EMAIL or RESEND_API_KEY env vars.')
    return jsonResponse({ success: false, error: 'The contact form is not configured yet. Please email us directly.' }, 500)
  }

  const resend = new Resend(resendApiKey)
  // Sending domain verified in Resend as of 2026-07-20.
  const fromAddress = 'adnan.yt <hello@adnan.yt>'

  const detailRows = [
    ['Name', name],
    ['Email', email],
    ['WhatsApp', whatsapp || '—'],
    ['Service', service || '—'],
    ['Budget', budget || '—'],
    ['Deadline', deadline || '—'],
  ]
  const detailsHtml = detailRows.map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join('')

  try {
    const notifyResult = await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `${detailsHtml}<p><strong>Project details:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    })
    if (notifyResult.error) throw notifyResult.error

    const confirmResult = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Thanks for reaching out — I'll be in touch soon",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for your interest in working together! I've received your project details and will get back to you within 24 hours with a quote or any follow-up questions.</p>
        <p>— Adnan</p>
      `,
    })
    if (confirmResult.error) throw confirmResult.error

    return jsonResponse({ success: true }, 200)
  } catch (err) {
    console.error('Contact form: Resend send failed.', err)
    return jsonResponse({ success: false, error: 'Something went wrong sending your message. Please try again or email us directly.' }, 500)
  }
}
