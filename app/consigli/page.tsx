'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { contentPages } from '@/data/content-pages'

export default function TipsPage() {
  const { locale } = useI18n()
  const c = contentPages[locale].advice

  return <><Header /><main id="main-content" className="bk-home bk-advice-page">
    <section className="bk-section bk-container bk-advice-hero">
      <p className="bk-eyebrow">{c.eyebrow}</p>
      <h1 className="bk-title">{c.title}</h1>
      <p className="bk-lead">{c.intro}</p>
      <div className="bk-advice-hero-links"><Link className="bk-text-link" href="/boutique">{locale === 'it' ? 'Esplora i prodotti' : locale === 'de' ? 'Produkte entdecken' : 'Explorer les produits'} <span aria-hidden="true">↗</span></Link><Link className="bk-text-link" href="/faq">FAQ <span aria-hidden="true">↗</span></Link></div>
    </section>
    <section className="bk-section bk-container">
      <div className="bk-advice-section-heading"><div><p className="bk-eyebrow">BRAVIKO</p><h2>{locale === 'it' ? 'Le indicazioni utili prima dell’ordine.' : locale === 'de' ? 'Die wichtigen Hinweise vor der Bestellung.' : 'Les bons repères avant de commander.'}</h2></div><p>{locale === 'it' ? 'Una scheda semplice per scegliere con più serenità, dal formato all’uso quotidiano.' : locale === 'de' ? 'Eine klare Orientierung für Format, Nutzung und Alltag.' : 'Une lecture claire du format, de l’usage et du quotidien.'}</p></div>
      <div className="bk-quality-grid bk-advice-grid">{c.sections.map(([title, body], i) => <article key={title}><span className="bk-quality-index">{String(i + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{body}</p></article>)}</div>
    </section>
    <section className="bk-advice-path bk-container" aria-label={locale === 'it' ? 'Percorso di scelta' : locale === 'de' ? 'Auswahlhilfe' : 'Parcours de choix'}>
      <div><p className="bk-eyebrow">01 / {locale === 'it' ? 'Prima di scegliere' : locale === 'de' ? 'Vor der Auswahl' : 'Avant de choisir'}</p><h2>{locale === 'it' ? 'Confronta ciò che conta davvero.' : locale === 'de' ? 'Vergleichen Sie, was wirklich zählt.' : 'Comparez ce qui compte vraiment.'}</h2></div>
      <div className="bk-advice-path-list"><p><strong>{locale === 'it' ? 'Uso' : locale === 'de' ? 'Nutzung' : 'Usage'}</strong>{locale === 'it' ? ' Per quale momento della giornata?' : locale === 'de' ? ' Für welchen Moment im Alltag?' : ' Pour quel moment du quotidien ?'}</p><p><strong>{locale === 'it' ? 'Misure' : locale === 'de' ? 'Maße' : 'Dimensions'}</strong>{locale === 'it' ? ' Il formato è adatto allo spazio e all’animale?' : locale === 'de' ? ' Passt das Format zum Platz und zum Tier?' : ' Le format convient-il à l’espace et à l’animal ?'}</p><p><strong>{locale === 'it' ? 'Consegna' : locale === 'de' ? 'Lieferung' : 'Livraison'}</strong>{locale === 'it' ? ' Le modalità sono chiare prima della conferma?' : locale === 'de' ? ' Sind die Bedingungen vor der Bestätigung klar?' : ' Les modalités sont-elles claires avant la confirmation ?'}</p></div>
    </section>
    <section className="bk-final bk-container"><div className="bk-final-copy"><p className="bk-eyebrow">BRAVIKO</p><h2>{c.cta}</h2><Link className="bk-button" href="/faq">{c.ctaLabel}<span aria-hidden="true">↗</span></Link></div><div className="bk-final-copy"><p className="bk-lead">{c.intro}</p><Link className="bk-text-link" href="/contact">{locale === 'it' ? 'Parla con noi' : locale === 'de' ? 'Kontakt aufnehmen' : 'Nous contacter'} <span aria-hidden="true">↗</span></Link></div></section>
  </main><Footer /></>
}
