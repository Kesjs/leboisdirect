'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { legalCopy } from '@/data/legal-copy'

const legalFooterCta = {
  fr: { title: 'Besoin d’un renseignement ou prêt à commander ?', shop: 'Retour à la boutique', delivery: 'Livraison & accès', contact: 'Contacter le support' },
  de: { title: 'Noch Fragen oder bereit zu bestellen?', shop: 'Zurück zum Shop', delivery: 'Versand & Zufahrt', contact: 'Support kontaktieren' },
  it: { title: 'Hai domande o sei pronto ad acquistare?', shop: 'Torna al negozio', delivery: 'Consegna e accesso', contact: 'Contatta l’assistenza' },
}

export default function LegalPage({ document }: { document: keyof typeof legalCopy }) {
  const { locale } = useI18n()
  const copy = legalCopy[document][locale]
  const cta = legalFooterCta[locale]
  return (
    <>
      <Header />
      <main id="main-content" className="bk-home bk-container bk-legal-page">
        <header>
          <p className="bk-eyebrow">{copy.eyebrow}</p>
          <h1 className="bk-title">{copy.title}</h1>
          <p className="bk-lead">{copy.intro}</p>
          <small>{copy.updated}</small>
        </header>
        <div className="bk-legal-sections">
          {copy.sections.map((section, index) => (
            <section key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </div>
        <div className="bk-help-card" style={{ marginTop: '56px' }}>
          <div>
            <h2>{cta.title}</h2>
            <p>contact@braviko.fr</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <Link className="bk-text-link" href="/livraison">{cta.delivery}<span aria-hidden="true">↗</span></Link>
            <Link className="bk-text-link" href="/contact">{cta.contact}<span aria-hidden="true">↗</span></Link>
            <Link className="bk-button" href="/boutique">{cta.shop}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
