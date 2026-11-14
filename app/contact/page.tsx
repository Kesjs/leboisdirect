'use client'

import { FormEvent, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'

const copy = {
  fr: {
    eyebrow: 'CONTACT',
    title: 'Parlons de votre projet de chauffage.',
    intro: 'Une question sur le choix du combustible, la puissance d’un poêle ou l’organisation de la livraison ? Écrivez-nous, notre équipe vous répond sous 24 h ouvrées.',
    emailLabel: 'Support client Braviko',
    emailIntro: 'Pour toute demande sur nos bûches, granulés, poêles, inserts ou braseros, précisez le produit souhaité et votre commune de livraison.',
    hours: 'Réponse par e-mail du lundi au vendredi (délai habituel : moins de 24 h ouvrées).',
    formTitle: 'Envoyer un message',
    name: 'Nom complet',
    email: 'Adresse e-mail',
    orderRef: 'Référence commande ou produit (facultatif)',
    subject: 'Objet de votre demande',
    message: 'Votre message',
    send: 'Envoyer le message',
    sending: 'Envoi en cours…',
    sentSuccess: 'Votre message a bien été enregistré. Notre équipe vous répondra très rapidement par e-mail.',
    errorUnavailable: 'Le formulaire direct est momentanément indisponible. Vous pouvez envoyer votre message en un clic via votre messagerie.',
    errorGeneric: 'Vérifiez les champs saisis et réessayez, ou utilisez votre logiciel de messagerie.',
    mailtoFallback: 'Ouvrir dans ma messagerie',
  },
  de: {
    eyebrow: 'KONTAKT',
    title: 'Sprechen wir über Ihr Heizprojekt.',
    intro: 'Fragen zur Brennstoffwahl, zur Ofenleistung oder zur Anlieferung per Spedition? Schreiben Sie uns, wir antworten innerhalb von 24 Werktagen-Stunden.',
    emailLabel: 'Braviko Kundendienst',
    emailIntro: 'Für Anfragen zu Brennholz, Pellets, Kaminöfen, Heizeinsätzen oder Feuerschalen geben Sie bitte das Produkt und Ihre Postleitzahl an.',
    hours: 'Antwort per E-Mail von Montag bis Freitag (üblich innerhalb von 24 Stunden).',
    formTitle: 'Nachricht senden',
    name: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    orderRef: 'Bestell- oder Produktreferenz (optional)',
    subject: 'Betreff',
    message: 'Ihre Nachricht',
    send: 'Nachricht senden',
    sending: 'Wird gesendet…',
    sentSuccess: 'Ihre Nachricht wurde erfolgreich übermittelt. Unser Team antwortet Ihnen zeitnah per E-Mail.',
    errorUnavailable: 'Das Direktformular ist vorübergehend nicht verfügbar. Nutzen Sie den Button unten für den Versand per E-Mail.',
    errorGeneric: 'Bitte prüfen Sie Ihre Eingaben oder senden Sie Ihre Anfrage per E-Mail.',
    mailtoFallback: 'E-Mail-Programm öffnen',
  },
  it: {
    eyebrow: 'CONTATTI',
    title: 'Parliamo del tuo progetto di riscaldamento.',
    intro: 'Domande su legna, pellet, potenza di una stufa o accesso per la consegna? Scrivici, il nostro team risponde entro 24 ore lavorative.',
    emailLabel: 'Assistenza clienti Braviko',
    emailIntro: 'Per richieste su legna da ardere, pellet, stufe, inserti o bracieri, indica il prodotto e il comune di consegna.',
    hours: 'Risposta via email dal lunedì al venerdì (solitamente entro 24 ore lavorative).',
    formTitle: 'Invia un messaggio',
    name: 'Nome e cognome',
    email: 'Indirizzo email',
    orderRef: 'Riferimento ordine o prodotto (facoltativo)',
    subject: 'Oggetto della richiesta',
    message: 'Il tuo messaggio',
    send: 'Invia il messaggio',
    sending: 'Invio in corso…',
    sentSuccess: 'Il tuo messaggio è stato registrato. Il nostro team ti risponderà al più presto via email.',
    errorUnavailable: 'Il modulo diretto è temporaneamente non disponibile. Invia il messaggio con un clic tramite email.',
    errorGeneric: 'Controlla i campi inseriti e riprova, oppure invia tramite il tuo programma di posta.',
    mailtoFallback: 'Apri nel programma email',
  },
} as const

export default function ContactPage() {
  const { locale } = useI18n()
  const c = copy[locale]
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'unavailable' | 'error'>('idle')
  const [fallbackMailto, setFallbackMailto] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const orderRef = String(data.get('orderRef') || '').trim()
    const subject = String(data.get('subject') || '').trim()
    const message = String(data.get('message') || '').trim()

    const mailBody = [
      message,
      orderRef ? `Riferimento: ${orderRef}` : '',
      `Da: ${name} (${email})`,
    ]
      .filter(Boolean)
      .join('\n\n')
    const mailtoHref = `mailto:contact@braviko.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`
    setFallbackMailto(mailtoHref)
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, orderRef, subject, message, locale }),
      })
      if (response.ok) {
        form.reset()
        setStatus('sent')
        return
      }
      const payload = await response.json().catch(() => ({}))
      if (response.status === 503 || payload?.error === 'contact_storage_unavailable') {
        setStatus('unavailable')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('unavailable')
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="bk-home bk-container bk-contact-page">
        <header>
          <p className="bk-eyebrow">{c.eyebrow}</p>
          <h1 className="bk-title">{c.title}</h1>
          <p className="bk-lead">{c.intro}</p>
        </header>
        <div className="bk-contact-layout">
          <section className="bk-contact-aside" aria-labelledby="contact-email-title">
            <p className="bk-eyebrow">{c.emailLabel}</p>
            <h2 id="contact-email-title">contact@braviko.fr</h2>
            <p>{c.emailIntro}</p>
            <p>{c.hours}</p>
            <a className="bk-text-link" href="mailto:contact@braviko.fr">
              contact@braviko.fr <span aria-hidden="true">↗</span>
            </a>
          </section>
          <form className="bk-contact-form" onSubmit={submit}>
            <div className="bk-contact-form-heading">
              <p className="bk-eyebrow">BRAVIKO</p>
              <h2>{c.formTitle}</h2>
            </div>
            <div className="bk-contact-fields">
              <label>{c.name}<input name="name" required autoComplete="name" /></label>
              <label>{c.email}<input name="email" type="email" required autoComplete="email" /></label>
            </div>
            <label>{c.orderRef}<input name="orderRef" /></label>
            <label>{c.subject}<input name="subject" required /></label>
            <label>{c.message}<textarea name="message" required minLength={5} rows={6} /></label>
            <button className="bk-button" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? c.sending : c.send}
              <span aria-hidden="true">↗</span>
            </button>
            {status === 'sent' && (
              <p className="bk-form-message" role="status">
                {c.sentSuccess}
              </p>
            )}
            {(status === 'unavailable' || status === 'error') && (
              <div className="bk-form-error" role="alert">
                <p>{status === 'unavailable' ? c.errorUnavailable : c.errorGeneric}</p>
                {fallbackMailto && (
                  <p style={{ marginTop: '10px' }}>
                    <a className="bk-text-link" href={fallbackMailto}>
                      {c.mailtoFallback} <span aria-hidden="true">↗</span>
                    </a>
                  </p>
                )}
              </div>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
