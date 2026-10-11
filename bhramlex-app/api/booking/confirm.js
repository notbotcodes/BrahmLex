import { readToken } from '../_lib/booking-token.js'
import { clean, json, requirePost } from '../_lib/http.js'
import { createMeeting, findEventByBookingRequest, slotIsAvailable } from '../_lib/google-calendar.js'

export default async function handler(request, response) {
  if (!requirePost(request, response)) return
  try {
    const client = readToken(request.body?.token)
    const start = clean(request.body?.start, 50)
    const end = clean(request.body?.end, 50)
    const existing = await findEventByBookingRequest(client.id)
    if (existing) return json(response, 200, { ok: true, email: client.email, meetLink: existing.hangoutLink })
    if (!(await slotIsAvailable(start, end))) return json(response, 409, { error: 'That appointment is no longer available. Please choose another.' })
    const event = await createMeeting({ ...client, start, end, bookingId: client.id })
    return json(response, 200, { ok: true, email: client.email, meetLink: event.hangoutLink })
  } catch (error) {
    console.error('Booking confirmation error:', error)
    return json(response, 400, { error: error.message || 'The appointment could not be booked.' })
  }
}
