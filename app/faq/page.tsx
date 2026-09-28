'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { pageCopy } from '@/data/page-copy'

export default function FAQPage() {
  const { locale } = useI18n(); const c = (pageCopy[locale] as any).faq; const [open, setOpen] = useState<string | null>(null)
  return <><Header /><main id="main-content" className="bk-home"><section className="bk-section bk-container"><p className="bk-eyebrow">{c.eyebrow}</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.intro}</p></section><section className="bk-section bk-container"><div style={{maxWidth:'900px'}}>{c.categories.map(([category, questions]: [string, string[][]], ci: number)=><section key={category} style={{marginBottom:'56px'}}><h2 className="bk-title" style={{fontSize:'32px', marginBottom:'20px'}}>{category}</h2><div>{questions.map(([q,a], qi)=><div key={q} style={{borderTop:'1px solid var(--bk-line)'}}><button className="bk-text-link" style={{width:'100%', borderBottom:0, minHeight:'64px', textAlign:'left'}} aria-expanded={open===`${ci}-${qi}`} onClick={()=>setOpen(open===`${ci}-${qi}`?null:`${ci}-${qi}`)}><span>{q}</span><span aria-hidden="true">{open===`${ci}-${qi}`?'−':'+'}</span></button>{open===`${ci}-${qi}`&&<p className="bk-lead" style={{margin:'0 0 24px'}}>{a}</p>}</div>)}</div></section>)}</div><div className="bk-help-card" style={{marginTop:'32px'}}><div><h2>{c.contact}</h2><p>{c.contactBody}</p></div><a className="bk-button" href="mailto:contact@leboisdirect.fr">{c.contactCta}</a></div></section></main><Footer /></>
}
