import type { APIRoute } from 'astro'
import { Resend } from 'resend'
import { sanityWriteClient } from '../../lib/sanity'

export const prerender = false

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const POST: APIRoute = async ({ request }) => {
  let data: { email?: string }
  try {
    data = await request.json()
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request body.' }, 400)
  }

  const email = data.email?.trim().toLowerCase()
  if (!email || !EMAIL_RE.test(email)) {
    return jsonResponse({ success: false, error: 'Please enter a valid email address.' }, 400)
  }

  try {
    const existing = await sanityWriteClient.fetch<string | null>(
      `*[_type == "newsletterSubscriber" && email == $email][0]._id`,
      { email }
    )

    if (!existing) {
      await sanityWriteClient.create({
        _type: 'newsletterSubscriber',
        email,
        subscribedAt: new Date().toISOString(),
      })
    }
  } catch (err) {
    console.error('Newsletter: failed to save subscriber to Sanity.', err)
    return jsonResponse({ success: false, error: 'Something went wrong. Please try again.' }, 500)
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey)
      await resend.emails.send({
        from: 'adnan.yt <hello@adnan.yt>',
        to: email,
        subject: "You're subscribed — welcome to the newsletter",
        html: `
          <p>Hi there,</p>
          <p>Thanks for subscribing! You'll get one email a month with editing tips, retention insights, and behind-the-scenes breakdowns of real projects.</p>
          <p>— Adnan</p>
        `,
      })
    } catch (err) {
      console.error('Newsletter: confirmation email failed to send.', err)
    }
  }

  return jsonResponse({ success: true }, 200)
}
