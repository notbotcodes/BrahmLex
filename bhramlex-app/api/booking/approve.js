import { createToken, readToken } from '../_lib/booking-token.js'
import { assertEnv, escapeHtml } from '../_lib/http.js'

export default async function handler(request, response) {
  try {
    assertEnv(['RESEND_API_KEY', 'EMAIL_FROM', 'SITE_URL'])
    const claim = readToken(request.query?.token)
    if (request.method !== 'POST') {
      response.status(200).setHeader('Content-Type', 'text/html; charset=utf-8')
      return response.end(`<h1>Verify payment</h1><p>Confirm that payment from <strong>${escapeHtml(claim.name)}</strong> with reference <strong>${escapeHtml(claim.paymentReference)}</strong> has reached your account.</p><form method="post"><button type="submit" style="padding:12px 18px">Payment received — email booking link</button></form>`)
    }
    const bookingToken = createToken({ id: claim.id, name: claim.name, email: claim.email, phone: claim.phone, matter: claim.matter }, 72)
    const bookingUrl = `${process.env.SITE_URL.replace(/\/$/, '')}/?booking=${encodeURIComponent(bookingToken)}#consultation`
    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM, to: [claim.email], subject: 'Choose your BrahmLex consultation time',
        html: `<h2>Your payment has been verified</h2><p>Hello ${escapeHtml(claim.name)},</p><p>Please choose an available time for your online consultation.</p><p><a href="${bookingUrl}">Choose consultation slot</a></p><p>This secure link expires in 72 hours.</p>`,
      }),
    })
    if (!sent.ok) throw new Error('Booking email failed.')
    response.status(200).setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end('<h1>Payment approved</h1><p>The client has been emailed a secure slot-booking link. You may close this page.</p>')
  } catch (error) {
    response.status(400).setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end(`<h1>Approval failed</h1><p>${error.message}</p>`)
  }
}
