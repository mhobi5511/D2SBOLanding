import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sendApplicationMail } from './application-mail.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

const app = express()
const port = Number(process.env.PORT || 3001)

app.use(express.json({ limit: '32kb' }))

app.post('/api/application', async (request, response) => {
  try {
    const result = await sendApplicationMail(request.body)

    response.status(result.status).json(result.ok ? { ok: true } : { error: result.error })
  } catch (error) {
    console.error('Application mail failed:', error)
    response.status(500).json({ error: 'mail_failed' })
  }
})

app.use(express.static(distDir))

app.get(/.*/, (_request, response) => {
  response.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Application server listening on http://localhost:${port}`)
})
