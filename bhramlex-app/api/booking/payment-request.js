import { randomUUID } from 'node:crypto'
import { createToken } from '../_lib/booking-token.js'
import { assertEnv, clean, escapeHtml, json, requirePost } from '../_lib/http.js'

export default async function handler(request, response) {
  if (!requirePost(request, response)) return
  try {
    assertEnv(['RESEND_API_KEY', 'EMAIL_FROM', 'CONTACT_TO_EMAIL', 'SITE_URL', 'BOOKING_SECRET'])
    const data = {
      id: randomUUID(), name: clean(request.body?.name, 100), email: clean(request.body?.email, 200),
      phone: clean(request.body?.phone, 30), matter: clean(request.body?.matter, 100),
      paymentReference: clean(request.body?.paymentReference, 100),
    }
    if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || !data.phone || !data.matter || data.paymentReference.length < 6) {
      return json(response, 400, { error: 'Please provide your details and a valid payment reference.' })
    }
    const token = createToken(data, 168)
    const approveUrl = `${process.env.SITE_URL.replace(/\/$/, '')}/api/booking/approve?token=${encodeURIComponent(token)}`
    const safe = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(String(value))]))
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM, to: [process.env.CONTACT_TO_EMAIL], reply_to: data.email,
        subject: `Verify consultation payment: ${data.name}`,
        html: `<h2>Payment verification requested</h2><p><strong>Client:</strong> ${safe.name}</p><p><strong>Email:</strong> ${safe.email}</p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Matter:</strong> ${safe.matter}</p><p><strong>UPI reference:</strong> ${safe.paymentReference}</p><p>Check your bank/UPI app first. If payment was received, <a href="${approveUrl}">approve payment and email the booking link</a>.</p>`,
      }),
    })
    if (!sent.ok) throw new Error('Notification email failed.')
    return json(response, 200, { ok: true })
  } catch (error) {
    console.error('Payment request error:', error)
    return json(response, 500, { error: 'Your payment details could not be submitted. Please contact the office.' })
  }
}
