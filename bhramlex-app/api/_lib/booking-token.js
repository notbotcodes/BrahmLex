import { createHmac, timingSafeEqual } from 'node:crypto'
import { assertEnv } from './http.js'

function signature(value) {
  assertEnv(['BOOKING_SECRET'])
  return createHmac('sha256', process.env.BOOKING_SECRET).update(value).digest('base64url')
}

export function createToken(payload, lifetimeHours = 72) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + lifetimeHours * 3600000 })).toString('base64url')
  return `${body}.${signature(body)}`
}

export function readToken(token) {
  const [body, supplied] = String(token || '').split('.')
  if (!body || !supplied) throw new Error('Invalid booking link.')
  const expected = signature(body)
  const left = Buffer.from(supplied)
  const right = Buffer.from(expected)
  if (left.length !== right.length || !timingSafeEqual(left, right)) throw new Error('Invalid booking link.')
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString())
  if (!payload.exp || payload.exp < Date.now()) throw new Error('This booking link has expired.')
  return payload
}
