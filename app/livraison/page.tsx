'use client'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { pageCopy } from '@/data/page-copy'

const ctaCopy = {
  fr: { title: 'Préparer votre commande', body: 'Parcourez la sélection ou vérifiez une contrainte d’accès avec notre équipe avant expédition.', shop: 'Voir la boutique', contact: 'Contacter Braviko' },
  de: { title: 'Bestellung vorbereiten', body: 'Entdecken Sie unser Sortiment oder klären Sie Zufahrtsfragen vor dem Versand mit uns.', shop: 'Zum Shop', contact: 'Kontakt' },
  it: { title: 'Prepara il tuo ordine', body: 'Esplora il catalogo o verifica eventuali esigenze di accesso prima della spedizione.', shop: 'Vai al negozio', contact: 'Contattaci' },
} as const

export default function DeliveryPage() {
  const { locale } = useI18n(); const c = (pageCopy[locale] as any).delivery; const cta = ctaCopy[locale]
  return <><Header /><main id="main-content" className="bk-home"><section className="bk-section bk-container"><p className="bk-eyebrow">{c.eyebrow}</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.intro}</p></section><section className="bk-section bk-container"><div className="bk-quality-grid">{c.steps.map(([title, body]: string[], i: number) => <article key={title}><span className="bk-quality-index">0{i+1}</span><h2>{title}</h2><p>{body}</p></article>)}</div><div className="bk-quality-grid" style={{marginTop: '64px'}}>{[[c.zones,c.zonesBody],[c.unload,c.unloadBody],[c.delays,c.delaysBody],[c.questions,c.questionsBody]].map(([title,body])=><article key={title}><h2>{title}</h2><p>{body}</p>{title===c.questions&&<Link className="bk-text-link" href="/faq">{c.faq}</Link>}</article>)}</div><div className="bk-help-card" style={{marginTop:'64px'}}><div><h2>{cta.title}</h2><p>{cta.body}</p></div><div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}><Link className="bk-button" href="/boutique">{cta.shop}<span aria-hidden="true">↗</span></Link><Link className="bk-text-link" href="/contact">{cta.contact}<span aria-hidden="true">↗</span></Link></div></div></section></main><Footer /></>
}
