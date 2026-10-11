export function json(response, status, body) {
  response.status(status).setHeader('Content-Type', 'application/json')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(body))
}

export function requirePost(request, response) {
  if (request.method === 'POST') return true
  response.setHeader('Allow', 'POST')
  json(response, 405, { error: 'Method not allowed.' })
  return false
}

export function clean(value, max = 500) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character])
}

export function assertEnv(names) {
  const missing = names.filter((name) => !process.env[name])
  if (missing.length) throw new Error(`Missing server configuration: ${missing.join(', ')}`)
}
