'use client'

import { FormEvent, useState } from 'react'
import { useI18n } from '@/lib/i18n-context'

const copy = {
  fr: { eyebrow: 'RESTER INFORMÉ', title: 'Des conseils utiles, au bon moment.', body: 'Recevez nos nouveautés, conseils de chauffage et sélections de produits. Pas de messages inutiles.', placeholder: 'Votre adresse e-mail', submit: 'S’inscrire', consent: 'En vous inscrivant, vous acceptez de recevoir les actualités Braviko. Désinscription possible à tout moment.', success: 'Inscription enregistrée. Vérifiez votre boîte mail.', error: 'Impossible de finaliser l’inscription pour le moment.' },
  de: { eyebrow: 'INFORMIERT BLEIBEN', title: 'Nützliche Tipps zur richtigen Zeit.', body: 'Erhalten Sie Neuigkeiten, Heiztipps und ausgewählte Produkte. Keine unnötigen Nachrichten.', placeholder: 'Ihre E-Mail-Adresse', submit: 'Anmelden', consent: 'Mit Ihrer Anmeldung stimmen Sie dem Erhalt von Braviko-Neuigkeiten zu. Abmeldung jederzeit möglich.', success: 'Anmeldung gespeichert. Prüfen Sie Ihr Postfach.', error: 'Die Anmeldung ist derzeit nicht möglich.' },
  it: { eyebrow: 'RESTA AGGIORNATO', title: 'Consigli utili, al momento giusto.', body: 'Ricevi novità, consigli sul riscaldamento e selezioni di prodotti. Nessun messaggio inutile.', placeholder: 'Il tuo indirizzo email', submit: 'Iscriviti', consent: 'Iscrivendoti accetti di ricevere le novità Braviko. Puoi annullare l’iscrizione in qualsiasi momento.', success: 'Iscrizione registrata. Controlla la tua casella email.', error: 'Al momento non è possibile completare l’iscrizione.' },
} as const

export default function NewsletterSignup() {
  const { locale } = useI18n()
  const c = copy[locale]
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus('loading')
    try {
      const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, locale }) })
      setStatus(response.ok ? 'success' : 'error')
      if (response.ok) setEmail('')
    } catch { setStatus('error') }
  }

  return <section className="bk-newsletter" aria-labelledby="newsletter-title"><div><p className="bk-eyebrow">{c.eyebrow}</p><h2 id="newsletter-title">{c.title}</h2><p>{c.body}</p></div><form onSubmit={submit}><div className="bk-newsletter-row"><label className="sr-only" htmlFor="newsletter-email">{c.placeholder}</label><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder={c.placeholder} autoComplete="email" /><button className="bk-button" disabled={status === 'loading'}>{status === 'loading' ? '…' : c.submit}<span aria-hidden="true">↗</span></button></div><small>{c.consent}</small>{status === 'success' && <p className="bk-form-message" role="status">{c.success}</p>}{status === 'error' && <p className="bk-form-message" role="alert">{c.error}</p>}</form></section>
}
