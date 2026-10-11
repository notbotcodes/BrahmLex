import { assertEnv } from './http.js'

const TIME_ZONE = 'Asia/Kolkata'
const SLOT_MINUTES = Number(process.env.CONSULTATION_DURATION_MINUTES || 45)

async function accessToken() {
  assertEnv(['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'])
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error_description || 'Google authorization failed.')
  return result.access_token
}

async function googleRequest(path, options = {}) {
  const token = await accessToken()
  const response = await fetch(`https://www.googleapis.com/calendar/v3${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers },
  })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(result.error?.message || 'Google Calendar request failed.')
  return result
}

function calendarId() {
  return process.env.GOOGLE_CALENDAR_ID || 'primary'
}

export async function busyPeriods(timeMin, timeMax) {
  const result = await googleRequest('/freeBusy', {
    method: 'POST',
    body: JSON.stringify({ timeMin, timeMax, timeZone: TIME_ZONE, items: [{ id: calendarId() }] }),
  })
  return result.calendars?.[calendarId()]?.busy || []
}

export function createCandidateSlots(days = 21) {
  const slots = []
  const now = new Date()
  const istNow = new Date(now.toLocaleString('en-US', { timeZone: TIME_ZONE }))
  const startHour = Number(process.env.CONSULTATION_START_HOUR || 10)
  const endHour = Number(process.env.CONSULTATION_END_HOUR || 19)
  const bufferMs = Number(process.env.CONSULTATION_MIN_NOTICE_HOURS || 12) * 3600000

  for (let offset = 1; offset <= days; offset += 1) {
    const local = new Date(istNow.getFullYear(), istNow.getMonth(), istNow.getDate() + offset)
    if (local.getDay() === 0) continue
    const date = `${local.getFullYear()}-${String(local.getMonth() + 1).padStart(2, '0')}-${String(local.getDate()).padStart(2, '0')}`
    for (let minute = startHour * 60; minute + SLOT_MINUTES <= endHour * 60; minute += SLOT_MINUTES) {
      const hour = String(Math.floor(minute / 60)).padStart(2, '0')
      const mins = String(minute % 60).padStart(2, '0')
      const start = new Date(`${date}T${hour}:${mins}:00+05:30`)
      if (start.getTime() < now.getTime() + bufferMs) continue
      slots.push({ start: start.toISOString(), end: new Date(start.getTime() + SLOT_MINUTES * 60000).toISOString() })
    }
  }
  return slots
}

export function removeBusy(slots, busy) {
  return slots.filter((slot) => !busy.some((period) =>
    new Date(slot.start) < new Date(period.end) && new Date(slot.end) > new Date(period.start)))
}

export async function slotIsAvailable(start, end) {
  const allowed = createCandidateSlots().some((slot) => slot.start === start && slot.end === end)
  if (!allowed) return false
  return (await busyPeriods(start, end)).length === 0
}

export async function findEventByBookingRequest(bookingId) {
  const query = new URLSearchParams({ privateExtendedProperty: `bookingRequestId=${bookingId}`, singleEvents: 'true' })
  const result = await googleRequest(`/calendars/${encodeURIComponent(calendarId())}/events?${query}`)
  return result.items?.[0] || null
}

export async function createMeeting({ name, email, phone, matter, start, end, bookingId }) {
  return googleRequest(`/calendars/${encodeURIComponent(calendarId())}/events?conferenceDataVersion=1&sendUpdates=all`, {
    method: 'POST',
    body: JSON.stringify({
      summary: `Online consultation — ${name}`,
      description: `Matter: ${matter}\nPhone: ${phone}\nBooking request: ${bookingId}`,
      start: { dateTime: start, timeZone: TIME_ZONE },
      end: { dateTime: end, timeZone: TIME_ZONE },
      attendees: [{ email, displayName: name }],
      conferenceData: { createRequest: { requestId: `brahmlex-${bookingId}`, conferenceSolutionKey: { type: 'hangoutsMeet' } } },
      extendedProperties: { private: { bookingRequestId: bookingId } },
      reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 60 }, { method: 'popup', minutes: 15 }] },
    }),
  })
}
