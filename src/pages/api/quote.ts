import type { APIRoute } from 'astro'
import { Resend } from 'resend'
import { sanityWriteClient } from '../../lib/sanity'

export const prerender = false

interface QuotePayload {
  name: string
  email: string
  services?: string[]
  channel?: string
  budget?: string
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
  let data: Partial<QuotePayload>
  try {
    data = await request.json()
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request body.' }, 400)
  }

  const { name, email, services, channel, budget, message } = data

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return jsonResponse({ success: false, error: 'Name, email, and project details are required.' }, 400)
  }
  if (!EMAIL_RE.test(email.trim())) {
    return jsonResponse({ success: false, error: 'Please enter a valid email address.' }, 400)
  }
  if (!services?.length) {
    return jsonResponse({ success: false, error: 'Pick at least one service you need.' }, 400)
  }

  try {
    await sanityWriteClient.create({
      _type: 'quoteRequest',
      name, email, services,
      channel: channel || undefined,
      budget: budget || undefined,
      message,
      submittedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Quote request: failed to save to Sanity.', err)
  }

  const adminEmail = import.meta.env.ADMIN_EMAIL
  const resendApiKey = import.meta.env.RESEND_API_KEY

  if (!adminEmail || !resendApiKey) {
    console.error('Quote request: missing ADMIN_EMAIL or RESEND_API_KEY env vars.')
    return jsonResponse({ success: false, error: 'The quote form is not configured yet. Please email us directly.' }, 500)
  }

  const resend = new Resend(resendApiKey)
  const fromAddress = 'adnan.yt <hello@adnan.yt>'

  const detailRows = [
    ['Name', name],
    ['Email', email],
    ['Services', services.join(', ')],
    ['Channel / Brand Link', channel || '—'],
    ['Monthly Budget', budget || '—'],
  ]
  const detailsHtml = detailRows.map(([label, value]) => `<p><strong>${label}:</strong> ${value}</p>`).join('')

  try {
    const notifyResult = await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      replyTo: email,
      subject: `New quote request from ${name}`,
      html: `${detailsHtml}<p><strong>Project details:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    })
    if (notifyResult.error) throw notifyResult.error

    const confirmResult = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: "Got your quote request — I'll be in touch soon",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for sharing your project details! I've received your quote request and will get back to you within 24 hours (Mon–Sat).</p>
        <p>— Adnan</p>
      `,
    })
    if (confirmResult.error) throw confirmResult.error

    return jsonResponse({ success: true }, 200)
  } catch (err) {
    console.error('Quote request: Resend send failed.', err)
    return jsonResponse({ success: false, error: 'Something went wrong sending your request. Please try again or email us directly.' }, 500)
  }
}
