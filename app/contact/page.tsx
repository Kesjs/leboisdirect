'use client'

import { FormEvent, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'

const copy = {
  fr: { eyebrow: 'CONTACT', title: 'Parlons de votre besoin.', intro: 'Une question sur un produit, une livraison ou un équipement ? Écrivez-nous, nous vous répondrons avec les informations utiles.', emailLabel: 'Écrire par e-mail', emailIntro: 'Pour une demande de bois ou de matériel agricole, indiquez votre besoin et les détails importants.', formTitle: 'Envoyer un message', name: 'Nom', email: 'E-mail', subject: 'Objet', message: 'Votre message', send: 'Préparer mon e-mail', note: 'Votre logiciel de messagerie s’ouvrira avec le message préparé.', sent: 'Votre message est prêt à être envoyé.' },
  de: { eyebrow: 'KONTAKT', title: 'Sprechen wir über Ihren Bedarf.', intro: 'Fragen zu einem Produkt, zur Lieferung oder zu Ausrüstung? Schreiben Sie uns, wir antworten mit den wichtigen Informationen.', emailLabel: 'Per E-Mail schreiben', emailIntro: 'Für eine Anfrage zu Brennholz oder landwirtschaftlicher Ausrüstung nennen Sie bitte Ihren Bedarf und die wichtigsten Details.', formTitle: 'Nachricht senden', name: 'Name', email: 'E-Mail', subject: 'Betreff', message: 'Ihre Nachricht', send: 'E-Mail vorbereiten', note: 'Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Nachricht.', sent: 'Ihre Nachricht ist bereit zum Senden.' },
  it: { eyebrow: 'CONTATTI', title: 'Parliamo delle tue esigenze.', intro: 'Domande su un prodotto, una consegna o un’attrezzatura? Scrivici e ti risponderemo con le informazioni utili.', emailLabel: 'Scrivici via email', emailIntro: 'Per una richiesta di legna o attrezzatura agricola, indica le tue esigenze e i dettagli importanti.', formTitle: 'Invia un messaggio', name: 'Nome', email: 'Email', subject: 'Oggetto', message: 'Il tuo messaggio', send: 'Prepara email', note: 'Il tuo programma email si aprirà con il messaggio preparato.', sent: 'Il tuo messaggio è pronto per essere inviato.' },
} as const

export default function ContactPage() {
  const { locale } = useI18n()
  const c = copy[locale]
  const [sent, setSent] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = String(data.get('subject') || '')
    const body = `${String(data.get('message') || '')}\n\n${String(data.get('name') || '')}\n${String(data.get('email') || '')}`
    window.location.href = `mailto:contact@braviko.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }
  return <><Header /><main id="main-content" className="bk-home bk-container bk-contact-page"><header><p className="bk-eyebrow">{c.eyebrow}</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.intro}</p></header><div className="bk-contact-layout"><section className="bk-contact-aside" aria-labelledby="contact-email-title"><p className="bk-eyebrow">{c.emailLabel}</p><h2 id="contact-email-title">contact@braviko.fr</h2><p>{c.emailIntro}</p><a className="bk-text-link" href="mailto:contact@braviko.fr">contact@braviko.fr <span aria-hidden="true">↗</span></a></section><form className="bk-contact-form" onSubmit={submit}><div className="bk-contact-form-heading"><p className="bk-eyebrow">BRAVIKO</p><h2>{c.formTitle}</h2></div><div className="bk-contact-fields"><label>{c.name}<input name="name" required autoComplete="name" /></label><label>{c.email}<input name="email" type="email" required autoComplete="email" /></label></div><label>{c.subject}<input name="subject" required /></label><label>{c.message}<textarea name="message" required rows={7} /></label><button className="bk-button" type="submit">{c.send}<span aria-hidden="true">↗</span></button>{sent && <p className="bk-form-message" role="status">{c.sent} {c.note}</p>}</form></div></main><Footer /></>
}
