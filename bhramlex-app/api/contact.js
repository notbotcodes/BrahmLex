import { clean, escapeHtml, json, requirePost, assertEnv } from './_lib/http.js'

export default async function handler(request, response) {
  if (!requirePost(request, response)) return
  try {
    assertEnv(['RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'EMAIL_FROM'])
    const name = clean(request.body?.name, 100)
    const email = clean(request.body?.email, 200)
    const matter = clean(request.body?.matter, 100)
    const message = clean(request.body?.message, 5000)
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !matter || message.length < 10) {
      return json(response, 400, { error: 'Please complete all fields with valid information.' })
    }
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `New BrahmLex enquiry: ${matter}`,
        html: `<h2>New website enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Matter:</strong> ${escapeHtml(matter)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      }),
    })
    const result = await sent.json().catch(() => ({}))
    if (!sent.ok) throw new Error(result.message || 'Email service rejected the request.')
    return json(response, 200, { ok: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return json(response, 500, { error: 'Your enquiry could not be sent. Please email contact@brahmlex.in directly.' })
  }
}
