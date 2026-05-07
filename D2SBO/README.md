# D2SBO Landingpage

React/Vite-Landingpage mit eigenem API-Endpunkt fuer Bewerbungen.

## Entwicklung

```bash
npm install
npm run dev
```

Das startet:

- Vite-Frontend auf `http://localhost:5173`
- API-Server auf `http://localhost:3001`

Das Frontend sendet Bewerbungen an `/api/application`. In der lokalen Entwicklung leitet Vite diese API-Requests an den Node-Server weiter. Auf Vercel wird `api/application.js` als Serverless Function ausgefuehrt.

## Formularversand einrichten

Kopiere zuerst die Beispielkonfiguration:

```bash
copy .env.example .env
```

Trage dann in `.env` die SMTP-Daten einer bestehenden Mailbox oder deines Hosters ein:

```env
PORT=3001
APPLICATION_TO=marc.hobi@d2s.ch

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user@example.com
SMTP_PASS=your-smtp-password
SMTP_FROM="D2S Bewerbung <your-smtp-user@example.com>"
```

Typische Werte:

- `SMTP_HOST`: SMTP-Server deines Mailanbieters, z. B. vom Webhoster
- `SMTP_PORT`: meistens `587`, bei SSL oft `465`
- `SMTP_SECURE`: `false` fuer Port `587`, `true` fuer Port `465`
- `SMTP_USER` / `SMTP_PASS`: Login der versendenden Mailbox
- `SMTP_FROM`: Absender, der zur SMTP-Mailbox passen sollte
- `APPLICATION_TO`: Empfaenger der Bewerbungen

Wichtig: Die `.env` wird nicht eingecheckt. Sie enthaelt Passwoerter und bleibt nur auf Server/Lokalmaschine.

## Produktion

```bash
npm run build
npm start
```

Der Node-Server stellt dann die gebaute Seite aus `dist/` bereit und verarbeitet gleichzeitig `/api/application`.

Auf Vercel brauchst du keinen eigenen laufenden Node-Server. Vercel baut das Vite-Frontend und fuehrt `api/application.js` automatisch als Serverless Function aus. Die SMTP-Werte muessen in Vercel als Environment Variables hinterlegt werden.
