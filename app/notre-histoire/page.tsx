'use client'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useI18n } from '@/lib/i18n-context'
import { contentPages } from '@/data/content-pages'

export default function AboutPage() {
  const { locale } = useI18n(); const c = contentPages[locale].story
  const images = [
    '/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg',
    '/images/story-winter-living.png',
    '/images/photorealistic-timber-house-interior-with-wooden-decor-furnishings.jpg',
  ]
  return <><Header /><main id="main-content" className="bk-home"><section className="bk-section bk-container"><p className="bk-eyebrow">{c.eyebrow}</p><h1 className="bk-title">{c.title}</h1><p className="bk-lead">{c.intro}</p></section><section className="bk-story bk-section"><div className="bk-container bk-story-steps">{c.sections.map(([title, body], i) => <article className={'bk-story-step' + (i % 2 ? ' bk-story-step--reverse' : '')} key={title}><div className="bk-story-step-media"><Image src={images[i]} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="bk-image" /></div><div className="bk-story-step-copy"><span className="bk-quality-index">0{i + 1}</span><h2>{title}</h2><p>{body}</p></div></article>)}</div></section><section className="bk-final bk-container"><div className="bk-final-copy"><p className="bk-eyebrow">BRAVIKO</p><h2>{c.cta}</h2><Link href="/boutique?universe=heating" className="bk-button">{c.ctaLabel}<span aria-hidden="true">↗</span></Link></div><div className="bk-final-copy"><p className="bk-lead">{c.intro}</p></div></section></main><Footer /></>
}
