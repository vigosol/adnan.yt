import type { APIRoute } from 'astro'
import { Resend } from 'resend'

export const prerender = false

interface ContactPayload {
  name: string
  email: string
  service?: string
  budget?: string
  deadline?: string
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request }) => {
  let data: Partial<ContactPayload>
  try {
    data = await request.json()
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request body.' }, 400)
  }

  const { name, email, service, budget, deadline, message } = data

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return jsonResponse({ success: false, error: 'Name, email, and project details are required.' }, 400)
  }
  if (!EMAIL_RE.test(email.trim())) {
    return jsonResponse({ success: false, error: 'Please enter a valid email address.' }, 400)
  }

  const adminEmail = import.meta.env.ADMIN_EMAIL
  const resendApiKey = import.meta.env.RESEND_API_KEY

  if (!adminEmail || !resendApiKey) {
    console.error('Contact form: missing ADMIN_EMAIL or RESEND_API_KEY env vars.')
    return jsonResponse({ success: false, error: 'The contact form is not configured yet. Please email us directly.' }, 500)
  }

  const resend = new Resend(resendApiKey)
  // TEMPORARY: adnan.yt isn't verified in Resend yet (Settings → Domains),
  // so sending from hello@adnan.yt gets rejected with a 403. Using Resend's
  // built-in test sender until the domain is verified — swap this back to
  // 'adnan.yt <hello@adnan.yt>' once that's done.
  const fromAddress = 'adnan.yt <onboarding@resend.dev>'

  const detailRows = [
    ['Name', name],
    ['Email', email],
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
