'use client'

import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import FeaturedProducts from '@/components/FeaturedProducts'
import StorytellingSection from '@/components/StorytellingSection'
import LandingMotion from '@/components/motion/LandingMotion'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'

export default function Home() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  return (
    <>
      <Header />
      <main id="main-content" className="bk-home">
        <Hero />
        <LandingMotion>
          <FeaturedProducts />
          <StorytellingSection />
          <section className="bk-quality bk-section bk-container" aria-labelledby="quality-title">
            <div className="bk-section-heading" data-reveal><h2 className="bk-title" id="quality-title">{copy.qualityTitle}</h2><p className="bk-lead">{copy.qualityIntro}</p></div>
            <div className="bk-quality-grid">
              {copy.qualities.map(([title, body], i) => <article data-reveal key={i}><span className="bk-quality-index" aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </section>
          <section className="bk-delivery bk-section bk-container" aria-labelledby="delivery-title">
            <div className="bk-delivery-photo" data-reveal>
              <Image src="/images/braviko-hero.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className="bk-image" quality={85} />
              <span className="bk-photo-caption">{copy.home} / {copy.field}</span>
            </div>
            <div>
              <div data-reveal><p className="bk-eyebrow">{copy.delivery}</p><h2 id="delivery-title" className="bk-title">{copy.deliveryTitle}</h2><p className="bk-lead">{copy.deliveryIntro}</p></div>
              <div className="bk-delivery-timeline" data-delivery-steps>
                <span className="bk-delivery-line" aria-hidden="true"><span data-delivery-progress /></span>
                <ol className="bk-delivery-steps">
                {copy.steps.map(([title, body], i) => <li key={i} data-reveal><span className="bk-step-number" aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}
                </ol>
              </div>
              <Link className="bk-text-link" href="/livraison">{copy.deliveryCta}<span aria-hidden="true">↗</span></Link>
            </div>
          </section>
          <section className="bk-final bk-container" aria-labelledby="final-title">
            <div className="bk-final-photo" data-reveal><Image src="/images/view-woman-relaxing-home-with-warm-drink.jpg" alt="" fill sizes="(max-width: 700px) 100vw, 45vw" className="bk-image" /></div>
            <div className="bk-final-copy" data-reveal><h2 id="final-title">{copy.finalTitle}</h2><p>{copy.finalBody}</p><Link href="/boutique" className="bk-button">{copy.finalCta}<span aria-hidden="true">↗</span></Link></div>
          </section>
        </LandingMotion>
      </main>
      <Footer />
    </>
  )
}
