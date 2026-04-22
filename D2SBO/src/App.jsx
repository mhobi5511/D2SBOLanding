import { useEffect, useState } from 'react'
import './App.css'

const languages = [
  { code: 'de', label: 'Deutsch', shortLabel: 'DE' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'fr', label: 'Français', shortLabel: 'FR' },
  { code: 'it', label: 'Italiano', shortLabel: 'IT' },
]

const demoTarget = '#so-funktioniert-teamly'
const logoSrc = '/check-logo.svg'

const legalPages = {
  impressum: {
    title: 'Impressum',
    eyebrow: 'Rechtliche Angaben',
    intro:
      'Angaben gemäß § 5 DDG. Bitte ersetze die markierten Angaben vor der Veröffentlichung durch die korrekten Anbieterinformationen.',
    sections: [
      {
        title: 'Anbieter',
        rows: [
          ['Name/Firma', '[Name oder Firma ergänzen]'],
          ['Rechtsform', '[z. B. Einzelunternehmen, GbR, GmbH oder Verein ergänzen]'],
          ['Anschrift', '[Straße Hausnummer, PLZ Ort, Land ergänzen]'],
        ],
      },
      {
        title: 'Kontakt',
        rows: [
          ['E-Mail', 'join@getteamly.com'],
          ['Telefon', '[optional ergänzen, falls vorhanden]'],
        ],
      },
      {
        title: 'Vertretungsberechtigte Person',
        rows: [['Vertreten durch', '[Name ergänzen]']],
      },
      {
        title: 'Registerangaben',
        text: 'Falls Teamly in einem Handels-, Vereins- oder sonstigen Register eingetragen ist, bitte Registergericht und Registernummer ergänzen. Falls keine Eintragung besteht, kann dieser Abschnitt entfernt werden.',
      },
      {
        title: 'Umsatzsteuer',
        text: 'Falls eine Umsatzsteuer-Identifikationsnummer vorhanden ist, bitte hier ergänzen. Falls keine vorhanden ist, kann dieser Abschnitt entfernt werden.',
      },
      {
        title: 'Haftung für Inhalte',
        text: 'Wir erstellen die Inhalte dieser Website mit Sorgfalt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.',
      },
      {
        title: 'Haftung für Links',
        text: 'Diese Website kann Links zu externen Websites enthalten. Für deren Inhalte sind ausschließlich die jeweiligen Betreiber verantwortlich.',
      },
    ],
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    eyebrow: 'Datenschutz',
    intro:
      'Diese Datenschutzerklärung ist für eine einfache Landingpage ohne Kontaktformular, ohne Tracking und ohne Marketing-Cookies formuliert. Bitte prüfe sie vor der Veröffentlichung gegen das tatsächliche Setup.',
    sections: [
      {
        title: '1. Verantwortlicher',
        rows: [
          ['Name/Firma', '[Name oder Firma ergänzen]'],
          ['Anschrift', '[Straße Hausnummer, PLZ Ort, Land ergänzen]'],
          ['E-Mail', 'join@getteamly.com'],
        ],
      },
      {
        title: '2. Allgemeine Hinweise',
        text: 'Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung dieser Website, zur Kommunikation mit Interessenten oder zur Erfüllung gesetzlicher Pflichten erforderlich ist.',
      },
      {
        title: '3. Hosting und Server-Logfiles',
        text: 'Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch notwendige Daten, insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, Browsertyp, Betriebssystem und übertragene Datenmenge. Die Verarbeitung erfolgt, um die Website technisch bereitzustellen, Stabilität und Sicherheit zu gewährleisten und Missbrauch zu erkennen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb der Website.',
      },
      {
        title: '4. Kontaktaufnahme per E-Mail',
        text: 'Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine E-Mail-Adresse sowie die von dir mitgeteilten Inhalte, um deine Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage vorvertragliche oder vertragliche Themen betrifft, und Art. 6 Abs. 1 lit. f DSGVO für allgemeine Kommunikation.',
      },
      {
        title: '5. Cookies, Tracking und Analyse',
        text: 'Diese Website setzt nach aktuellem Stand keine Marketing-Cookies, keine Analyse-Tools und kein Nutzertracking ein. Technisch notwendige Funktionen können ohne Einwilligung eingesetzt werden, sofern sie für den ausdruecklich gewuenschten Dienst erforderlich sind.',
      },
      {
        title: '6. Empfänger von Daten',
        text: 'Personenbezogene Daten können an technische Dienstleister weitergegeben werden, die für den Betrieb der Website erforderlich sind, insbesondere Hosting- und Infrastruktur-Anbieter. Eine Weitergabe zu Werbezwecken findet nicht statt.',
      },
      {
        title: '7. Speicherdauer',
        text: 'Server-Logfiles werden nur so lange gespeichert, wie dies für Sicherheit und Betrieb erforderlich ist. E-Mail-Anfragen speichern wir so lange, wie es für die Bearbeitung der Anfrage und etwaige Anschlussfragen erforderlich ist. Gesetzliche Aufbewahrungspflichten bleiben unberührt.',
      },
      {
        title: '8. Deine Rechte',
        text: 'Du hast nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen bestimmte Verarbeitungen. Soweit eine Verarbeitung auf Einwilligung beruht, kannst du diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.',
      },
      {
        title: '9. Beschwerderecht',
        text: 'Du hast das Recht, dich bei einer Datenschutzaufsichtsbehoerde zu beschweren, wenn du der Ansicht bist, dass die Verarbeitung deiner personenbezogenen Daten gegen Datenschutzrecht verstößt.',
      },
      {
        title: '10. Keine automatisierte Entscheidungsfindung',
        text: 'Eine automatisierte Entscheidungsfindung einschließlich Profiling findet auf dieser Website nicht statt.',
      },
      {
        title: '11. Stand',
        text: 'Stand dieser Datenschutzerklärung: April 2026.',
      },
    ],
  },
}

const translations = {
  de: {
    contactUrl:
      'mailto:join@getteamly.com?subject=Interesse%20an%20Teamly&body=Hallo%20Teamly%2C%0A%0Aich%20interessiere%20mich%20f%C3%BCr%20Teamly%20und%20m%C3%B6chte%20mehr%20erfahren.%0A%0AViele%20Gr%C3%BC%C3%9Fe',
    aria: {
      home: 'Teamly Startseite',
      mainNavigation: 'Hauptnavigation',
      languageSwitcher: 'Sprache wechseln',
      actions: 'Aktionen',
      useAreas: 'Teamly Einsatzbereiche',
      coreBenefits: 'Teamly Kernnutzen',
      closingActions: 'Abschlussaktionen',
      footerNavigation: 'Footer Navigation',
    },
    nav: {
      features: 'Funktionen',
      process: 'Ablauf',
      groups: 'Gruppen',
    },
    actions: {
      contact: 'Kontakt aufnehmen',
      demo: 'Demo ansehen',
      home: 'Zur Startseite',
    },
    hero: {
      eyebrow: 'Für Vereine, Formationen und aktive Gruppen',
      title: 'Teamorganisation ohne WhatsApp-Chaos',
      text: 'Plane Proben, Auftritte und interne Termine zentral. Mitglieder sehen nur das, was für sie freigegeben ist, antworten mit wenigen Klicks und haben alles direkt im Kalender.',
      focus:
        'Teamly organisiert Termine, Gruppen, Zu- und Absagen, Erinnerungen und Kalenderintegration an einem Ort.',
      pills: ['Proben', 'Auftritte', 'Interne Termine', 'Rückmeldungen', 'Kalender'],
      highlights: [
        {
          label: 'Planen',
          text: 'Termine gezielt für relevante Gruppen erstellen',
        },
        {
          label: 'Antworten',
          text: 'Zu- und Absagen ohne Chat-Verlauf sammeln',
        },
        {
          label: 'Erinnern',
          text: 'Offene Rückmeldungen automatisch nachfassen',
        },
      ],
      trustBullets: [
        'Mehrere Formationen und Gruppen',
        'Automatische Kalenderintegration',
        'Push-Erinnerungen bei fehlender Antwort',
        'Dokumente direkt am Termin',
      ],
    },
    problem: {
      eyebrow: 'Das Problem',
      title: 'Wenn Terminplanung über Chats läuft, geht schnell etwas unter',
      painPoints: [
        'Unklare Zu- und Absagen',
        'Zu viele Nachrichten in Gruppen',
        'Termine landen nicht sauber im Kalender',
        'Änderungen werden zu spät gesehen',
      ],
    },
    features: {
      eyebrow: 'Funktionen',
      title: 'Alles, was deine Gruppe für saubere Organisation braucht',
      items: [
        {
          title: 'Mehrere Formationen',
          text: 'Gruppenbereiche für Ensembles, Kurse, Register oder Teams sauber getrennt führen.',
        },
        {
          title: 'Gezielte Sichtbarkeit',
          text: 'Events nur für ausgewählte Gruppen freigeben und unnötige Einladungen vermeiden.',
        },
        {
          title: 'Freigegebene Inhalte',
          text: 'Mitglieder sehen nur Termine, Dokumente und Infos, die für sie bestimmt sind.',
        },
        {
          title: 'Schnell geplant',
          text: 'Proben, Auftritte und interne Termine in wenigen Schritten erstellen.',
        },
        {
          title: 'Einfache Rückmeldung',
          text: 'Zu- und Abmelden funktioniert mit wenigen Klicks, auch mobil.',
        },
        {
          title: 'Kalender automatisch',
          text: 'Einträge richten sich nach Zusage und Verfügbarkeit der Mitglieder.',
        },
        {
          title: 'Unterlagen am Termin',
          text: 'Dokumente, Ablauf und wichtige Details direkt beim Event hinterlegen.',
        },
        {
          title: 'Nativer Kalender',
          text: 'Relevante Inhalte bleiben auch im gewohnten Smartphone-Kalender sichtbar.',
        },
        {
          title: 'Push bei offener Antwort',
          text: 'Ausstehende Rückmeldungen können gezielt und rechtzeitig erinnert werden.',
        },
        {
          title: 'Automatische Erinnerung',
          text: 'Leiter aktivieren Erinnerungen, damit Antworten nicht manuell verfolgt werden müssen.',
        },
        {
          title: 'Filter für Termine',
          text: 'Proben und Auftritte lassen sich schnell unterscheiden und wiederfinden.',
        },
        {
          title: 'Hinweis bei Änderungen',
          text: 'Änderungen am Termin werden sichtbar, bevor wichtige Infos untergehen.',
        },
        {
          title: 'Einfacher Hilfebereich',
          text: 'Mitglieder finden Antworten, ohne erst im Chat nachfragen zu müssen.',
        },
        {
          title: 'Profil und Push',
          text: 'Bild, persönliche Daten und Benachrichtigungen bleiben an einem Ort verwaltet.',
        },
      ],
    },
    process: {
      eyebrow: 'Ablauf',
      title: 'So funktioniert Teamly',
      steps: [
        'Termin erstellen und Gruppe auswählen',
        'Mitglieder sagen zu oder ab',
        'Kalender, Unterlagen und Erinnerungen laufen automatisch',
      ],
    },
    roles: {
      leaders: {
        title: 'Für Leiter',
        benefits: [
          'Gruppen und Formationen sauber trennen',
          'Termine gezielt für relevante Personen planen',
          'Offene Antworten per Push erinnern',
          'Änderungen sichtbar kommunizieren',
          'Dokumente und Ablauf zentral ablegen',
        ],
      },
      members: {
        title: 'Für Mitglieder',
        benefits: [
          'Nur relevante Termine sehen',
          'Schnell zu- oder absagen',
          'Automatische Kalendereinträge nutzen',
          'Alle Infos direkt beim Termin finden',
          'Auch offline über den nativen Kalender informiert bleiben',
        ],
      },
    },
    groups: {
      eyebrow: 'Einsatzbereiche',
      title: 'Perfekt für Gruppen mit wiederkehrenden Terminen',
      useCases: [
        'Musikvereine',
        'Guggenmusik',
        'Tanzschulen und Formationen',
        'Showteams',
        'Ensembles',
        'Vereinsgruppen',
      ],
    },
    closing: {
      eyebrow: 'Bereit für mehr Klarheit',
      title: 'Weniger Abstimmungschaos. Mehr Klarheit für deine Gruppe.',
      text: 'Teamly verbindet Terminplanung, Rückmeldungen, Kalender und wichtige Unterlagen in einem einfachen System.',
    },
    footer: {
      contact: 'Kontakt',
      imprint: 'Impressum',
      privacy: 'Datenschutz',
    },
  },
  en: {
    contactUrl:
      'mailto:join@getteamly.com?subject=Interest%20in%20Teamly&body=Hello%20Teamly%2C%0A%0AI%20am%20interested%20in%20Teamly%20and%20would%20like%20to%20learn%20more.%0A%0ABest%20regards',
    aria: {
      home: 'Teamly homepage',
      mainNavigation: 'Main navigation',
      languageSwitcher: 'Change language',
      actions: 'Actions',
      useAreas: 'Teamly use cases',
      coreBenefits: 'Teamly core benefits',
      closingActions: 'Closing actions',
      footerNavigation: 'Footer navigation',
    },
    nav: {
      features: 'Features',
      process: 'How it works',
      groups: 'Groups',
    },
    actions: {
      contact: 'Contact us',
      demo: 'View demo',
      home: 'Home',
    },
    hero: {
      eyebrow: 'For clubs, formations and active groups',
      title: 'Team organisation without WhatsApp chaos',
      text: 'Plan rehearsals, performances and internal appointments in one central place. Members only see what is shared with them, respond in a few clicks and have everything right in their calendar.',
      focus:
        'Teamly keeps events, groups, confirmations, reminders and calendar integration together in one place.',
      pills: ['Rehearsals', 'Performances', 'Internal dates', 'Responses', 'Calendar'],
      highlights: [
        {
          label: 'Plan',
          text: 'Create events specifically for the groups that matter',
        },
        {
          label: 'Respond',
          text: 'Collect acceptances and declines without long chat threads',
        },
        {
          label: 'Remind',
          text: 'Automatically follow up on missing responses',
        },
      ],
      trustBullets: [
        'Multiple formations and groups',
        'Automatic calendar integration',
        'Push reminders for missing responses',
        'Documents directly on the event',
      ],
    },
    problem: {
      eyebrow: 'The problem',
      title: 'When scheduling happens in chats, important details get lost fast',
      painPoints: [
        'Unclear acceptances and declines',
        'Too many group messages',
        'Events do not land cleanly in the calendar',
        'Changes are noticed too late',
      ],
    },
    features: {
      eyebrow: 'Features',
      title: 'Everything your group needs for clear organisation',
      items: [
        {
          title: 'Multiple formations',
          text: 'Keep areas for ensembles, classes, sections or teams neatly separated.',
        },
        {
          title: 'Targeted visibility',
          text: 'Share events only with selected groups and avoid unnecessary invitations.',
        },
        {
          title: 'Shared content',
          text: 'Members only see events, documents and information intended for them.',
        },
        {
          title: 'Fast planning',
          text: 'Create rehearsals, performances and internal appointments in just a few steps.',
        },
        {
          title: 'Simple responses',
          text: 'Accepting or declining takes only a few clicks, also on mobile.',
        },
        {
          title: 'Automatic calendar',
          text: 'Entries adapt to member confirmations and availability.',
        },
        {
          title: 'Materials on the event',
          text: 'Store documents, schedules and important details directly with the event.',
        },
        {
          title: 'Native calendar',
          text: 'Relevant information stays visible in the familiar smartphone calendar.',
        },
        {
          title: 'Push for open responses',
          text: 'Pending responses can be reminded specifically and on time.',
        },
        {
          title: 'Automatic reminders',
          text: 'Leaders activate reminders so replies no longer need manual chasing.',
        },
        {
          title: 'Event filters',
          text: 'Rehearsals and performances are easy to distinguish and find again.',
        },
        {
          title: 'Change notices',
          text: 'Event changes become visible before important information gets missed.',
        },
        {
          title: 'Simple help area',
          text: 'Members find answers without asking in the chat first.',
        },
        {
          title: 'Profile and push',
          text: 'Photo, personal details and notifications are managed in one place.',
        },
      ],
    },
    process: {
      eyebrow: 'How it works',
      title: 'How Teamly works',
      steps: [
        'Create an event and select the group',
        'Members accept or decline',
        'Calendar entries, documents and reminders run automatically',
      ],
    },
    roles: {
      leaders: {
        title: 'For leaders',
        benefits: [
          'Keep groups and formations clearly separated',
          'Plan events for the relevant people',
          'Remind open responses via push',
          'Communicate changes visibly',
          'Store documents and schedules centrally',
        ],
      },
      members: {
        title: 'For members',
        benefits: [
          'See only relevant events',
          'Accept or decline quickly',
          'Use automatic calendar entries',
          'Find all details directly on the event',
          'Stay informed offline through the native calendar',
        ],
      },
    },
    groups: {
      eyebrow: 'Use cases',
      title: 'Perfect for groups with recurring appointments',
      useCases: [
        'Music clubs',
        'Guggenmusik groups',
        'Dance schools and formations',
        'Show teams',
        'Ensembles',
        'Club groups',
      ],
    },
    closing: {
      eyebrow: 'Ready for more clarity',
      title: 'Less coordination chaos. More clarity for your group.',
      text: 'Teamly combines scheduling, responses, calendars and important documents in one simple system.',
    },
    footer: {
      contact: 'Contact',
      imprint: 'Legal notice',
      privacy: 'Privacy policy',
    },
  },
  fr: {
    contactUrl:
      'mailto:join@getteamly.com?subject=Int%C3%A9r%C3%AAt%20pour%20Teamly&body=Bonjour%20Teamly%2C%0A%0AJe%20m%27int%C3%A9resse%20%C3%A0%20Teamly%20et%20j%27aimerais%20en%20savoir%20plus.%0A%0ACordialement',
    aria: {
      home: "Page d'accueil Teamly",
      mainNavigation: 'Navigation principale',
      languageSwitcher: 'Changer de langue',
      actions: 'Actions',
      useAreas: "Domaines d'utilisation de Teamly",
      coreBenefits: 'Avantages clés de Teamly',
      closingActions: 'Actions finales',
      footerNavigation: 'Navigation du pied de page',
    },
    nav: {
      features: 'Fonctions',
      process: 'Déroulement',
      groups: 'Groupes',
    },
    actions: {
      contact: 'Nous contacter',
      demo: 'Voir la démo',
      home: 'Accueil',
    },
    hero: {
      eyebrow: 'Pour les associations, formations et groupes actifs',
      title: "L'organisation d'équipe sans chaos WhatsApp",
      text: 'Planifiez les répétitions, prestations et rendez-vous internes au même endroit. Les membres ne voient que ce qui les concerne, répondent en quelques clics et retrouvent tout dans leur calendrier.',
      focus:
        'Teamly réunit les rendez-vous, groupes, confirmations, rappels et calendriers en un seul endroit.',
      pills: ['Répétitions', 'Prestations', 'Dates internes', 'Réponses', 'Calendrier'],
      highlights: [
        {
          label: 'Planifier',
          text: 'Créer des rendez-vous ciblés pour les groupes concernés',
        },
        {
          label: 'Répondre',
          text: 'Collecter les présences et absences sans fil de discussion',
        },
        {
          label: 'Rappeler',
          text: 'Relancer automatiquement les réponses manquantes',
        },
      ],
      trustBullets: [
        'Plusieurs formations et groupes',
        'Intégration automatique au calendrier',
        'Rappels push en cas de réponse manquante',
        "Documents directement dans l'événement",
      ],
    },
    problem: {
      eyebrow: 'Le problème',
      title: 'Quand la planification passe par les chats, les détails se perdent vite',
      painPoints: [
        'Présences et absences peu claires',
        'Trop de messages de groupe',
        'Les dates ne sont pas bien ajoutées au calendrier',
        'Les changements sont vus trop tard',
      ],
    },
    features: {
      eyebrow: 'Fonctions',
      title: 'Tout ce dont votre groupe a besoin pour une organisation claire',
      items: [
        {
          title: 'Plusieurs formations',
          text: 'Gérez séparément les espaces pour ensembles, cours, pupitres ou équipes.',
        },
        {
          title: 'Visibilité ciblée',
          text: 'Partagez les événements seulement avec les groupes choisis et évitez les invitations inutiles.',
        },
        {
          title: 'Contenus partagés',
          text: 'Les membres ne voient que les dates, documents et informations qui leur sont destinés.',
        },
        {
          title: 'Planification rapide',
          text: 'Créez répétitions, prestations et rendez-vous internes en quelques étapes.',
        },
        {
          title: 'Réponse simple',
          text: "Confirmer ou décliner se fait en quelques clics, aussi sur mobile.",
        },
        {
          title: 'Calendrier automatique',
          text: 'Les entrées tiennent compte des confirmations et disponibilités des membres.',
        },
        {
          title: "Documents dans l'événement",
          text: "Ajoutez documents, déroulé et détails importants directement à l'événement.",
        },
        {
          title: 'Calendrier natif',
          text: 'Les contenus pertinents restent visibles dans le calendrier habituel du smartphone.',
        },
        {
          title: 'Push pour réponses ouvertes',
          text: 'Les réponses en attente peuvent être rappelées de manière ciblée et au bon moment.',
        },
        {
          title: 'Rappel automatique',
          text: "Les responsables activent les rappels pour ne plus suivre les réponses à la main.",
        },
        {
          title: 'Filtres de dates',
          text: 'Répétitions et prestations se distinguent et se retrouvent rapidement.',
        },
        {
          title: 'Signalement des changements',
          text: 'Les changements deviennent visibles avant que des informations importantes ne se perdent.',
        },
        {
          title: "Espace d'aide simple",
          text: 'Les membres trouvent des réponses sans devoir demander dans le chat.',
        },
        {
          title: 'Profil et push',
          text: 'Photo, données personnelles et notifications se gèrent au même endroit.',
        },
      ],
    },
    process: {
      eyebrow: 'Déroulement',
      title: 'Comment fonctionne Teamly',
      steps: [
        'Créer un événement et choisir le groupe',
        'Les membres confirment ou déclinent',
        'Calendrier, documents et rappels se gèrent automatiquement',
      ],
    },
    roles: {
      leaders: {
        title: 'Pour les responsables',
        benefits: [
          'Séparer clairement groupes et formations',
          'Planifier les dates pour les bonnes personnes',
          'Rappeler les réponses ouvertes par push',
          'Communiquer les changements de façon visible',
          'Centraliser documents et déroulé',
        ],
      },
      members: {
        title: 'Pour les membres',
        benefits: [
          'Voir seulement les dates pertinentes',
          'Confirmer ou décliner rapidement',
          'Utiliser les entrées de calendrier automatiques',
          "Trouver tous les détails directement dans l'événement",
          'Rester informé hors ligne via le calendrier natif',
        ],
      },
    },
    groups: {
      eyebrow: "Domaines d'utilisation",
      title: 'Parfait pour les groupes avec des rendez-vous réguliers',
      useCases: [
        'Sociétés de musique',
        'Guggenmusik',
        'Écoles de danse et formations',
        'Équipes de spectacle',
        'Ensembles',
        "Groupes d'association",
      ],
    },
    closing: {
      eyebrow: 'Prêt pour plus de clarté',
      title: 'Moins de chaos dans la coordination. Plus de clarté pour votre groupe.',
      text: 'Teamly relie planification, réponses, calendrier et documents importants dans un système simple.',
    },
    footer: {
      contact: 'Contact',
      imprint: 'Mentions légales',
      privacy: 'Protection des données',
    },
  },
  it: {
    contactUrl:
      'mailto:join@getteamly.com?subject=Interesse%20per%20Teamly&body=Ciao%20Teamly%2C%0A%0ASono%20interessato%20a%20Teamly%20e%20vorrei%20saperne%20di%20pi%C3%B9.%0A%0ACordiali%20saluti',
    aria: {
      home: 'Homepage Teamly',
      mainNavigation: 'Navigazione principale',
      languageSwitcher: 'Cambiare lingua',
      actions: 'Azioni',
      useAreas: 'Ambiti di utilizzo di Teamly',
      coreBenefits: 'Vantaggi principali di Teamly',
      closingActions: 'Azioni finali',
      footerNavigation: 'Navigazione footer',
    },
    nav: {
      features: 'Funzioni',
      process: 'Come funziona',
      groups: 'Gruppi',
    },
    actions: {
      contact: 'Contattaci',
      demo: 'Guarda la demo',
      home: 'Home',
    },
    hero: {
      eyebrow: 'Per associazioni, formazioni e gruppi attivi',
      title: 'Organizzazione del team senza caos WhatsApp',
      text: 'Pianifica prove, spettacoli e appuntamenti interni in modo centralizzato. I membri vedono solo ciò che è condiviso con loro, rispondono in pochi clic e trovano tutto direttamente nel calendario.',
      focus:
        'Teamly organizza appuntamenti, gruppi, conferme, promemoria e integrazione calendario in un unico posto.',
      pills: ['Prove', 'Spettacoli', 'Date interne', 'Risposte', 'Calendario'],
      highlights: [
        {
          label: 'Pianificare',
          text: 'Creare appuntamenti mirati per i gruppi rilevanti',
        },
        {
          label: 'Rispondere',
          text: 'Raccogliere presenze e assenze senza lunghe chat',
        },
        {
          label: 'Ricordare',
          text: 'Sollecitare automaticamente le risposte mancanti',
        },
      ],
      trustBullets: [
        'Più formazioni e gruppi',
        'Integrazione automatica del calendario',
        'Promemoria push per risposte mancanti',
        "Documenti direttamente nell'evento",
      ],
    },
    problem: {
      eyebrow: 'Il problema',
      title: 'Quando la pianificazione passa dalle chat, i dettagli si perdono in fretta',
      painPoints: [
        'Presenze e assenze poco chiare',
        'Troppi messaggi nei gruppi',
        'Gli appuntamenti non arrivano bene nel calendario',
        'Le modifiche vengono viste troppo tardi',
      ],
    },
    features: {
      eyebrow: 'Funzioni',
      title: 'Tutto ciò che serve al tuo gruppo per organizzarsi con chiarezza',
      items: [
        {
          title: 'Più formazioni',
          text: 'Gestisci separatamente aree per ensemble, corsi, sezioni o team.',
        },
        {
          title: 'Visibilità mirata',
          text: 'Condividi eventi solo con gruppi selezionati ed evita inviti inutili.',
        },
        {
          title: 'Contenuti condivisi',
          text: 'I membri vedono solo appuntamenti, documenti e informazioni pensati per loro.',
        },
        {
          title: 'Pianificazione rapida',
          text: 'Crea prove, spettacoli e appuntamenti interni in pochi passaggi.',
        },
        {
          title: 'Risposta semplice',
          text: 'Confermare o rifiutare richiede pochi clic, anche da mobile.',
        },
        {
          title: 'Calendario automatico',
          text: 'Le voci si adattano alle conferme e disponibilità dei membri.',
        },
        {
          title: "Materiali nell'evento",
          text: "Salva documenti, programma e dettagli importanti direttamente nell'evento.",
        },
        {
          title: 'Calendario nativo',
          text: 'I contenuti rilevanti restano visibili nel calendario abituale dello smartphone.',
        },
        {
          title: 'Push per risposte aperte',
          text: 'Le risposte in sospeso possono essere ricordate in modo mirato e puntuale.',
        },
        {
          title: 'Promemoria automatici',
          text: 'I responsabili attivano promemoria, così non devono inseguire risposte manualmente.',
        },
        {
          title: 'Filtri per appuntamenti',
          text: 'Prove e spettacoli si distinguono e si ritrovano velocemente.',
        },
        {
          title: 'Avviso modifiche',
          text: 'Le modifiche agli appuntamenti diventano visibili prima che le informazioni si perdano.',
        },
        {
          title: 'Area aiuto semplice',
          text: 'I membri trovano risposte senza dover chiedere prima in chat.',
        },
        {
          title: 'Profilo e push',
          text: 'Foto, dati personali e notifiche restano gestiti in un unico posto.',
        },
      ],
    },
    process: {
      eyebrow: 'Come funziona',
      title: 'Come funziona Teamly',
      steps: [
        'Crea un evento e scegli il gruppo',
        'I membri confermano o rifiutano',
        'Calendario, documenti e promemoria funzionano automaticamente',
      ],
    },
    roles: {
      leaders: {
        title: 'Per responsabili',
        benefits: [
          'Separare chiaramente gruppi e formazioni',
          'Pianificare appuntamenti per le persone rilevanti',
          'Ricordare risposte aperte via push',
          'Comunicare modifiche in modo visibile',
          'Archiviare documenti e programma centralmente',
        ],
      },
      members: {
        title: 'Per membri',
        benefits: [
          'Vedere solo appuntamenti rilevanti',
          'Confermare o rifiutare rapidamente',
          'Usare voci calendario automatiche',
          "Trovare tutti i dettagli direttamente nell'evento",
          'Restare informati offline tramite il calendario nativo',
        ],
      },
    },
    groups: {
      eyebrow: 'Ambiti di utilizzo',
      title: 'Perfetto per gruppi con appuntamenti ricorrenti',
      useCases: [
        'Associazioni musicali',
        'Guggenmusik',
        'Scuole di danza e formazioni',
        'Show team',
        'Ensemble',
        'Gruppi associativi',
      ],
    },
    closing: {
      eyebrow: 'Pronto per più chiarezza',
      title: 'Meno caos nel coordinamento. Più chiarezza per il tuo gruppo.',
      text: 'Teamly collega pianificazione, risposte, calendario e documenti importanti in un sistema semplice.',
    },
    footer: {
      contact: 'Contatto',
      imprint: 'Note legali',
      privacy: 'Privacy',
    },
  },
}

function Logo() {
  return (
    <span className="brand">
      <img src={logoSrc} alt="" aria-hidden="true" />
      <span>Teamly</span>
    </span>
  )
}

function CheckList({ items, className = '' }) {
  return (
    <ul className={`check-list ${className}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function LanguageSwitcher({ activeLanguage, onLanguageChange, label }) {
  return (
    <div className="language-switcher" aria-label={label}>
      {languages.map((language) => (
        <button
          aria-pressed={activeLanguage === language.code}
          className={activeLanguage === language.code ? 'is-active' : ''}
          key={language.code}
          onClick={() => onLanguageChange(language.code)}
          title={language.label}
          type="button"
        >
          <span className="language-short">{language.shortLabel}</span>
          <span className="language-label">{language.label}</span>
        </button>
      ))}
    </div>
  )
}

function LegalPage({ activeLanguage, onLanguageChange, page, t, onNavigate }) {
  return (
    <div className="app">
      <header className="site-header">
        <div className="container nav">
          <a
            className="logo"
            href="/"
            aria-label={t.aria.home}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/')
            }}
          >
            <Logo />
          </a>
          <nav className="nav-links" aria-label={t.aria.mainNavigation}>
            <a
              href="/#funktionen"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('/#funktionen')
              }}
            >
              {t.nav.features}
            </a>
            <a
              href="/#so-funktioniert-teamly"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('/#so-funktioniert-teamly')
              }}
            >
              {t.nav.process}
            </a>
            <a
              href="/#gruppen"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('/#gruppen')
              }}
            >
              {t.nav.groups}
            </a>
          </nav>
          <div className="nav-actions">
            <LanguageSwitcher
              activeLanguage={activeLanguage}
              label={t.aria.languageSwitcher}
              onLanguageChange={onLanguageChange}
            />
            <a
              className="button button-small"
              href="/"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('/')
              }}
            >
              {t.actions.home}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="legal-hero">
          <div className="container legal-container">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="legal-intro">{page.intro}</p>
            <div className="legal-note">
              Keine Rechtsberatung: Diese Vorlage ist bewusst schlank gehalten und muss mit den
              tatsächlichen Angaben zu Teamly abgeglichen werden.
            </div>
          </div>
        </section>

        <section className="section legal-section">
          <div className="container legal-container">
            {page.sections.map((section) => (
              <article className="legal-card" key={section.title}>
                <h2>{section.title}</h2>
                {section.text ? <p>{section.text}</p> : null}
                {section.rows ? (
                  <dl className="legal-list">
                    {section.rows.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <a
            className="footer-brand"
            href="/"
            aria-label={t.aria.home}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/')
            }}
          >
            <Logo />
          </a>
          <nav className="footer-links" aria-label={t.aria.footerNavigation}>
            <a href="mailto:kontakt@getteamly.com">{t.footer.contact}</a>
            <a
              href="/impressum"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('/impressum')
              }}
            >
              {t.footer.imprint}
            </a>
            <a
              href="/datenschutz"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('/datenschutz')
              }}
            >
              {t.footer.privacy}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [activeLanguage, setActiveLanguage] = useState('de')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const t = translations[activeLanguage]

  useEffect(() => {
    document.documentElement.lang = activeLanguage
  }, [activeLanguage])

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)

    window.addEventListener('popstate', handlePopState)

    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (target) => {
    const [path, hash] = target.split('#')
    const nextPath = path || '/'

    window.history.pushState({}, '', target)
    setCurrentPath(nextPath)

    window.setTimeout(() => {
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 0)
  }

  if (currentPath === '/impressum') {
    return (
      <LegalPage
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        page={legalPages.impressum}
        t={t}
        onNavigate={navigateTo}
      />
    )
  }

  if (currentPath === '/datenschutz') {
    return (
      <LegalPage
        activeLanguage={activeLanguage}
        onLanguageChange={setActiveLanguage}
        page={legalPages.datenschutz}
        t={t}
        onNavigate={navigateTo}
      />
    )
  }

  return (
    <div className="app">
      <header className="site-header">
        <div className="container nav">
          <a className="logo" href="#start" aria-label={t.aria.home}>
            <Logo />
          </a>
          <nav className="nav-links" aria-label={t.aria.mainNavigation}>
            <a href="#funktionen">{t.nav.features}</a>
            <a href="#so-funktioniert-teamly">{t.nav.process}</a>
            <a href="#gruppen">{t.nav.groups}</a>
          </nav>
          <div className="nav-actions">
            <LanguageSwitcher
              activeLanguage={activeLanguage}
              label={t.aria.languageSwitcher}
              onLanguageChange={setActiveLanguage}
            />
            <a className="button button-small" href={t.contactUrl}>
              {t.actions.contact}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="start" className="hero-section">
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero-text">{t.hero.text}</p>
              <div className="hero-actions" aria-label={t.aria.actions}>
                <a className="button button-primary" href={t.contactUrl}>
                  {t.actions.contact}
                </a>
                <a className="button button-secondary" href={demoTarget}>
                  {t.actions.demo}
                </a>
              </div>

              <div className="hero-pills" aria-label={t.aria.useAreas}>
                {t.hero.pills.map((pill) => (
                  <span key={pill}>{pill}</span>
                ))}
              </div>

              <div className="hero-focus" aria-label={t.aria.coreBenefits}>
                <p>{t.hero.focus}</p>
                <div className="hero-highlight-grid">
                  {t.hero.highlights.map((item) => (
                    <article key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{item.text}</span>
                    </article>
                  ))}
                </div>
              </div>

              <CheckList items={t.hero.trustBullets} className="trust-list" />
            </div>
          </div>
        </section>

        <section id="problem" className="section section-tinted">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t.problem.eyebrow}</p>
              <h2>{t.problem.title}</h2>
            </div>
            <div className="pain-grid">
              {t.problem.painPoints.map((point) => (
                <article className="pain-card" key={point}>
                  <span aria-hidden="true">!</span>
                  <p>{point}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="funktionen" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t.features.eyebrow}</p>
              <h2>{t.features.title}</h2>
            </div>
            <div className="feature-grid">
              {t.features.items.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <div className="feature-icon" aria-hidden="true">
                    <img src="/favicon.svg" alt="" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="so-funktioniert-teamly" className="section section-tinted">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t.process.eyebrow}</p>
              <h2>{t.process.title}</h2>
            </div>
            <div className="steps-grid">
              {t.process.steps.map((step, index) => (
                <article className="step-card" key={step}>
                  <span>{index + 1}</span>
                  <h3>{step}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="rollen" className="section">
          <div className="container role-grid">
            <article className="role-panel">
              <h2>{t.roles.leaders.title}</h2>
              <CheckList items={t.roles.leaders.benefits} />
            </article>
            <article className="role-panel">
              <h2>{t.roles.members.title}</h2>
              <CheckList items={t.roles.members.benefits} />
            </article>
          </div>
        </section>

        <section id="gruppen" className="section section-tinted">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{t.groups.eyebrow}</p>
              <h2>{t.groups.title}</h2>
            </div>
            <div className="use-case-grid">
              {t.groups.useCases.map((useCase) => (
                <article className="use-case-card" key={useCase}>
                  <span aria-hidden="true" />
                  <h3>{useCase}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="testen" className="section">
          <div className="container">
            <div className="closing-cta">
              <div>
                <p className="eyebrow">{t.closing.eyebrow}</p>
                <h2>{t.closing.title}</h2>
                <p>{t.closing.text}</p>
              </div>
              <div className="hero-actions" aria-label={t.aria.closingActions}>
                <a className="button button-primary" href={t.contactUrl}>
                  {t.actions.contact}
                </a>
                <a className="button button-secondary" href={demoTarget}>
                  {t.actions.demo}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <a className="footer-brand" href="#start" aria-label={t.aria.home}>
            <Logo />
          </a>
          <nav className="footer-links" aria-label={t.aria.footerNavigation}>
            <a href="mailto:kontakt@getteamly.com">{t.footer.contact}</a>
            <a
              href="/impressum"
              onClick={(event) => {
                event.preventDefault()
                navigateTo('/impressum')
              }}
            >
              {t.footer.imprint}
            </a>
            <a
              href="/datenschutz"
              onClick={(event) => {
                event.preventDefault()
                navigateTo('/datenschutz')
              }}
            >
              {t.footer.privacy}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default App
