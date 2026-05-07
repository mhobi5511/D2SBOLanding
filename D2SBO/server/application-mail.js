import nodemailer from 'nodemailer'

const requiredFields = ['name', 'email', 'phone', 'age', 'location', 'experience', 'message']

function clean(value) {
  return String(value || '').trim()
}

function escapeHtml(value) {
  return clean(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is incomplete.')
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true' || Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

function getMissingFields(body) {
  return requiredFields.filter((field) => !clean(body[field]))
}

function buildApplicationEmail(body) {
  const application = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    age: clean(body.age),
    location: clean(body.location),
    experience: clean(body.experience),
    message: clean(body.message),
    consent: body.consent === true,
  }

  const text = [
    'Neue Bewerbung über die Landingpage',
    '',
    `Name: ${application.name}`,
    `E-Mail: ${application.email}`,
    `Telefon: ${application.phone}`,
    `Alter: ${application.age}`,
    `Wohnort: ${application.location}`,
    `Erfahrung: ${application.experience}`,
    `Einverständnis: ${application.consent ? 'Ja' : 'Nein'}`,
    '',
    'Nachricht / Motivation:',
    application.message,
  ].join('\n')

  const html = `
    <h2>Neue Bewerbung über die Landingpage</h2>
    <p><strong>Name:</strong> ${escapeHtml(application.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(application.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(application.phone)}</p>
    <p><strong>Alter:</strong> ${escapeHtml(application.age)}</p>
    <p><strong>Wohnort:</strong> ${escapeHtml(application.location)}</p>
    <p><strong>Erfahrung:</strong> ${escapeHtml(application.experience)}</p>
    <p><strong>Einverständnis:</strong> ${application.consent ? 'Ja' : 'Nein'}</p>
    <h3>Nachricht / Motivation</h3>
    <p>${escapeHtml(application.message).replaceAll('\n', '<br>')}</p>
  `

  return { application, text, html }
}

export async function sendApplicationMail(body) {
  const missingFields = getMissingFields(body)

  if (missingFields.length > 0 || body.consent !== true) {
    return { ok: false, status: 400, error: 'missing_required_fields' }
  }

  const { application, text, html } = buildApplicationEmail(body)
  const transporter = getTransporter()

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.APPLICATION_TO || 'marc.hobi@d2s.ch',
    replyTo: application.email,
    subject: `Neue Bewerbung von ${application.name}`,
    text,
    html,
  })

  return { ok: true, status: 200 }
}
