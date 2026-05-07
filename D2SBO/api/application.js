import { sendApplicationMail } from '../server/application-mail.js'

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).json({ error: 'method_not_allowed' })
    return
  }

  try {
    const result = await sendApplicationMail(request.body || {})

    response.status(result.status).json(result.ok ? { ok: true } : { error: result.error })
  } catch (error) {
    console.error('Application mail failed:', error)
    response.status(500).json({ error: 'mail_failed' })
  }
}
