import { useState } from 'react'
import heroDrumsImage from './assets/d2s-hero.jpg'
import heroBlackoutImage from './assets/blackouts-hero.jpg'
import drumsCardImage from './assets/d2s-card.jpg'
import blackoutCardImage from './assets/blackouts-card.jpg'
import drumsLogo from './assets/D2S_Logo-01.jpg'
import blackoutsLogo from './assets/logo Blackouts.png'
import './App.css'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_ME'

const joinCards = [
  {
    title: 'Bühne statt Alltag',
    text: 'Werde Teil einer Gruppe, die Menschen live begeistert und auf grossen Bühnen wirkt.',
  },
  {
    title: 'Entwicklung statt Stillstand',
    text: 'Trainiere nicht nur Technik, sondern Performance, Präsenz und Zusammenspiel.',
  },
  {
    title: 'Gemeinschaft statt Einzelkampf',
    text: 'Erlebe echte Gruppendynamik mit motivierten Menschen und klarer Ausrichtung.',
  },
  {
    title: 'Show mit Anspruch',
    text: 'Hier geht es nicht nur ums Trommeln, sondern um Qualität, Energie und Wirkung.',
  },
]

const processSteps = [
  'Formular ausfüllen',
  'Wir melden uns bei dir',
  'Wir schauen gemeinsam, welche Gruppe am besten passt',
]

function App() {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleFieldInvalid = (event) => {
    event.preventDefault()
    const target = event.target
    if (target.validity.valueMissing) {
      target.setCustomValidity('Bitte dieses Feld ausfüllen.')
    } else if (target.type === 'email' && target.validity.typeMismatch) {
      target.setCustomValidity('Bitte gib eine gültige E-Mail-Adresse ein.')
    } else {
      target.setCustomValidity('Bitte überprüfe dieses Feld.')
    }
  }

  const clearValidity = (event) => {
    event.target.setCustomValidity('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setStatus('idle')
    setMessage('')

    const formData = new FormData(event.target)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        const result = await response.json().catch(() => null)
        throw new Error(result?.error || 'submit_error')
      }

      setStatus('success')
      setMessage('Danke! Deine Bewerbung wurde erfolgreich gesendet. Wir melden uns bei dir.')
      event.target.reset()
    } catch (error) {
      setStatus('error')
      setMessage('Beim Senden ist etwas schiefgelaufen. Bitte versuche es erneut.')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app" id="top">
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href="#top" aria-label="Drums2Streets und The Blackouts">
            <span className="brand-logo-pair" aria-hidden="true">
              <span className="brand-logo-tile brand-logo-tile-d2s">
                <img src={drumsLogo} alt="" />
              </span>
              <span className="brand-logo-tile brand-logo-tile-blackouts">
                <img src={blackoutsLogo} alt="" />
              </span>
            </span>
            <span className="brand-text">Drums2Streets</span>
            <span className="brand-separator">/</span>
            <span className="brand-text">The Blackouts</span>
          </a>
          <nav className="nav-links" aria-label="Hauptnavigation">
            <a href="#gruppen">Gruppen</a>
            <a href="#warum">Warum mitmachen</a>
            <a href="#bewerbung">Bewerbung</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-copy">
                <h1>Du willst nicht nur zusehen. Du willst Teil davon sein.</h1>
                <p className="hero-text">
                  Du hast uns am Tambourenfest Appenzell erlebt? Dann bewirb dich jetzt für Drums2Streets oder The Blackouts und werde Teil einer modernen Showgruppe mit Energie, Präzision und echter Bühnenpräsenz.
                </p>
                <p className="hero-description">
                  Ob Streetstyle, Drum-Power oder High-End LED Show: Wir suchen motivierte Persönlichkeiten, die nicht einfach nur trommeln, sondern auf die Bühne wollen.
                </p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#bewerbung">Jetzt bewerben</a>
                  <a className="button button-secondary" href="#gruppen">Mehr erfahren</a>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-images">
                  <div className="hero-image-card">
                    <img src={heroDrumsImage} alt="Drums2Streets Performance" />
                  </div>
                  <div className="hero-image-card">
                    <img src={heroBlackoutImage} alt="The Blackouts LED-Show" />
                  </div>
                </div>
                <div className="hero-visual-note">
                  <span>Drums2Streets</span>
                  <span>/</span>
                  <span>The Blackouts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="gruppen">
          <div className="container">
            <div className="section-heading">
              <h2>Unsere Formationen</h2>
              <p className="section-subtitle">Drums2Streets & The Blackouts – gemeinsam für High-Impact Live-Show</p>
            </div>
            <div className="section-grid">
              <article className="recruit-card">
                <div className="card-image">
                  <img src={drumsCardImage} alt="Drums2Streets Performance" />
                </div>
                <div className="formation-card-head">
                  <div className="formation-logo formation-logo-d2s">
                    <img src={drumsLogo} alt="Drums2Streets Logo" />
                  </div>
                  <h3>Drums2Streets</h3>
                </div>
                <p>
                  Drums2Streets bringt klassische Trommelkunst raus aus dem traditionellen Rahmen und rein in Show, Entertainment und Event-Erlebnis. Die Gruppe steht für Energie, Kreativität, Streetstyle und eine Performance, die das Publikum mitreißt.
                </p>
                <ul className="check-list">
                  <li>Moderne Drum-Show mit Entertainment-Fokus</li>
                  <li>Hohe Energie, starke Gruppendynamik und Bühnenpräsenz</li>
                  <li>Kreative Setups und ungewöhnliche Instrumente</li>
                  <li>Live besonders stark durch Interaktion, Emotion und Wirkung</li>
                  <li>Bekannt aus TV-Formaten und großen Bühnen</li>
                </ul>
                <div className="badge-list">
                  <span>Streetstyle</span>
                  <span>Show</span>
                  <span>Energie</span>
                  <span>Publikumseffekt</span>
                </div>
              </article>

              <article className="recruit-card">
                <div className="card-image">
                  <img src={blackoutCardImage} alt="The Blackouts LED-Show" />
                </div>
                <div className="formation-card-head">
                  <div className="formation-logo formation-logo-blackouts">
                    <img src={blackoutsLogo} alt="The Blackouts Logo" />
                  </div>
                  <h3>The Blackouts</h3>
                </div>
                <p>
                  The Blackouts verbinden Musik, Bewegung, Licht und modernste LED-Technologie zu einer hochinszenierten Performance. Die Show funktioniert international, ohne Sprache, und steht für Präzision, Innovation und maximalen visuellen Impact.
                </p>
                <ul className="check-list">
                  <li>LED-Anzüge und Visual Drums mit starkem Wiedererkennungswert</li>
                  <li>Hochwertige, professionelle Showproduktion</li>
                  <li>Bekannt aus internationalen TV-Formaten</li>
                  <li>Ideal für große Bühnen, starke Bilder und präzise Inszenierung</li>
                  <li>Premium-Anspruch statt klassische Trommelgruppe</li>
                </ul>
                <div className="badge-list">
                  <span>LED</span>
                  <span>Premium</span>
                  <span>International</span>
                  <span>Showproduktion</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section section-tinted" id="warum">
          <div className="container">
            <div className="section-heading">
              <h2>Warum mitmachen?</h2>
            </div>
            <div className="cards-grid">
              {joinCards.map((card) => (
                <article key={card.title} className="recruit-card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="wen">
          <div className="container">
            <div className="section-heading">
              <h2>Wen wir suchen</h2>
              <p>Nicht Perfektion ist entscheidend, sondern Energie, Verlässlichkeit und Lust auf Performance.</p>
            </div>
            <ul className="check-list role-list">
              <li>motivierte Persönlichkeiten mit Interesse an Trommeln, Show oder Performance</li>
              <li>Menschen mit Energie, Disziplin und Teamgeist</li>
              <li>Bereitschaft, an Proben und Auftritten verbindlich teilzunehmen</li>
              <li>Freude an Bühne, Bewegung und Weiterentwicklung</li>
              <li>Bei Blackouts kommt es auf jede Bewegung an – hier ist Perfektion gefragt. Bei Drums2Streets ist das gerade anders – da darf es dreckig sein.</li>
            </ul>
          </div>
        </section>

        <section className="section section-tinted" id="prozess">
          <div className="container">
            <div className="section-heading">
              <h2>So läuft es ab</h2>
            </div>
            <div className="step-grid">
              {processSteps.map((step, index) => (
                <article key={step} className="step-card">
                  <span>{index + 1}</span>
                  <h3>{step}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="bewerbung">
          <div className="container">
            <div className="section-heading">
              <h2>Jetzt bewerben</h2>
              <p>Füll das Formular aus und erzähl uns kurz, wer du bist und warum du dabei sein möchtest.</p>
            </div>

            <div className="form-card">
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="name">Vorname und Nachname</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Max Muster"
                      required
                      onInvalid={handleFieldInvalid}
                      onInput={clearValidity}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">E-Mail</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="max@muster.ch"
                      required
                      onInvalid={handleFieldInvalid}
                      onInput={clearValidity}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Telefonnummer</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+41 79 000 00 00"
                      required
                      onInvalid={handleFieldInvalid}
                      onInput={clearValidity}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="age">Alter</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="14"
                      placeholder="22"
                      required
                      onInvalid={handleFieldInvalid}
                      onInput={clearValidity}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="location">Wohnort</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Appenzell, Schweiz"
                      required
                      onInvalid={handleFieldInvalid}
                      onInput={clearValidity}
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="experience">Erfahrung</label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      onInvalid={handleFieldInvalid}
                      onInput={clearValidity}
                    >
                      <option value="">Bitte wählen</option>
                      <option value="Keine">Keine</option>
                      <option value="Wenig">Wenig</option>
                      <option value="Fortgeschritten">Fortgeschritten</option>
                      <option value="Sehr erfahren">Sehr erfahren</option>
                    </select>
                  </div>

                  <div className="form-field field-full">
                    <label htmlFor="message">Nachricht / Motivation</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Erzähl uns kurz, warum du dabei sein möchtest."
                      required
                      onInvalid={handleFieldInvalid}
                      onInput={clearValidity}
                    />
                  </div>

                  <div className="form-field field-full checkbox-field">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        onInvalid={handleFieldInvalid}
                        onInput={clearValidity}
                      />
                      Ich bin damit einverstanden, dass meine Angaben zur Kontaktaufnahme verarbeitet werden.
                    </label>
                  </div>
                </div>

                <div className="form-footer">
                  <button className="button button-primary" type="submit" disabled={submitting}>
                    Bewerbung absenden
                  </button>
                  <p className="form-note">
                    Alternativ kannst du uns direkt an <a href="mailto:marc.hobi@gmx.ch">marc.hobi@gmx.ch</a> schreiben.
                  </p>
                </div>

                {status === 'success' && <div className="success-message" role="status">{message}</div>}
                {status === 'error' && <div className="error-message" role="alert">{message}</div>}
              </form>
            </div>
          </div>
        </section>

        <section className="section section-tinted final-cta">
          <div className="container closing-cta">
            <div>
              <h2>Vielleicht war das heute nicht nur ein Auftritt, sondern dein Einstieg.</h2>
              <p>Wenn du das Gefühl hast, dass du auf diese Bühne willst, dann bewirb dich jetzt.</p>
            </div>
            <a className="button button-primary" href="#bewerbung">Jetzt bewerben</a>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="container footer-content">
          <div className="footer-brand">Drums2Streets / The Blackouts</div>
          <div className="footer-links">
            <a href="#bewerbung">Kontakt</a>
            <a href="#footer">Impressum</a>
            <a href="#footer">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
