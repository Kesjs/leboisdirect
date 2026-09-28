'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { pageCopy } from '@/data/page-copy'

export default function DeliveryPage() {
  const { locale } = useI18n(); const c = (pageCopy[locale] as any).delivery
  return <><Header /><main id="main-content" className="bk-home"><section className="bk-section bk-container"><p className="bk-eyebrow">{c.eyebrow}</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.intro}</p></section><section className="bk-section bk-container"><div className="bk-quality-grid">{c.steps.map(([title, body]: string[], i: number) => <article key={title}><span className="bk-quality-index">0{i+1}</span><h2>{title}</h2><p>{body}</p></article>)}</div><div className="bk-quality-grid" style={{marginTop: '64px'}}>{[[c.zones,c.zonesBody],[c.unload,c.unloadBody],[c.delays,c.delaysBody],[c.questions,c.questionsBody]].map(([title,body])=><article key={title}><h2>{title}</h2><p>{body}</p>{title===c.questions&&<a className="bk-text-link" href="/faq">{c.faq}</a>}</article>)}</div></section></main><Footer /></>
}
