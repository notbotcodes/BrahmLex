import { json } from '../_lib/http.js'
import { busyPeriods, createCandidateSlots, removeBusy } from '../_lib/google-calendar.js'

export default async function handler(request, response) {
  if (request.method !== 'GET') return json(response, 405, { error: 'Method not allowed.' })
  try {
    const candidates = createCandidateSlots()
    const busy = await busyPeriods(candidates[0].start, candidates.at(-1).end)
    return json(response, 200, { slots: removeBusy(candidates, busy).slice(0, 60) })
  } catch (error) {
    console.error('Slot lookup error:', error)
    return json(response, 500, { error: 'Available appointments could not be loaded.' })
  }
}
