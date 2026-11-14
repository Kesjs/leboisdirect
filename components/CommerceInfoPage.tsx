'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { commerceInfoCopy, type CommerceInfoDocument } from '@/data/commerce-info-copy'

const infoFooterCta = {
  fr: { title: 'Poursuivre votre visite ou joindre notre équipe', shop: 'Voir le catalogue', faq: 'Consulter la FAQ', contact: 'Page contact' },
  de: { title: 'Zum Shop zurückkehren oder Team kontaktieren', shop: 'Zum Shop', faq: 'FAQ ansehen', contact: 'Kontaktseite' },
  it: { title: 'Continua gli acquisti o contatta il supporto', shop: 'Vai al negozio', faq: 'Vedi le FAQ', contact: 'Pagina contatti' },
}

export default function CommerceInfoPage({ document }: { document: keyof typeof commerceInfoCopy }) {
  const { locale } = useI18n()
  const copy: CommerceInfoDocument = commerceInfoCopy[document][locale]
  const cta = infoFooterCta[locale]
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
            <Link className="bk-text-link" href="/faq">{cta.faq}<span aria-hidden="true">↗</span></Link>
            <Link className="bk-text-link" href="/contact">{cta.contact}<span aria-hidden="true">↗</span></Link>
            <Link className="bk-button" href="/boutique">{cta.shop}<span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
