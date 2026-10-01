'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'

export default function Hero() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('[data-hero-line]', { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out' })
        gsap.from('[data-hero-enter]', { y: 24, opacity: 0, duration: 0.85, stagger: 0.1, delay: 0.15, ease: 'power3.out' })
      }, root)
      return () => ctx.revert()
    })
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.to('[data-hero-parallax]', {
          yPercent: 5, ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.7 },
        })
      }, root)
      return () => ctx.revert()
    })
    return () => media.revert()
  }, [])

  return (
    <section ref={root} className="bk-hero bk-container" aria-labelledby="hero-title">
      <div className="bk-hero-heading">
        <div>
          <p className="bk-hero-kicker" data-hero-enter>{copy.heroKicker}</p>
          <h1 id="hero-title">
          {copy.hero.map((line, i) => <span className="bk-line-mask" key={i}><span data-hero-line className={i === 1 ? 'bk-accent' : ''}>{line}</span></span>)}
          </h1>
        </div>
        <div className="bk-hero-intro" data-hero-enter>
          <p>{copy.intro}</p>
          <a className="bk-text-link" href="#selection">{copy.discover}<span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="bk-hero-worlds">
        <Link href="/boutique?universe=heating" className="bk-world bk-world-heat" data-hero-enter>
          <div className="bk-world-media" data-hero-parallax>
            <Image src="/images/fireplace-with-woods-modern-wooden-house.jpg" alt="" fill priority sizes="(max-width: 700px) 100vw, 58vw" className="bk-image" quality={85} />
          </div>
          <div className="bk-world-shade" />
          <div className="bk-world-top"><span>{copy.home}</span><span>01</span></div>
          <div className="bk-world-bottom">
            <div><h2>{copy.heating}</h2><p>{copy.heatingSub}</p></div>
            <span className="bk-round-arrow" aria-hidden="true">↗</span>
          </div>
        </Link>
        <Link href="/boutique?universe=agriculture" className="bk-world bk-world-agri" data-hero-enter>
          <div className="bk-world-media" data-hero-parallax>
          <Image src="/images/agriculture-chainsaw.jpg" alt="" fill priority sizes="(max-width: 700px) 100vw, 42vw" className="bk-image bk-agri-image" quality={85} />
          </div>
          <div className="bk-world-shade" />
          <div className="bk-world-top"><span>{copy.field}</span><span>02</span></div>
          <div className="bk-world-bottom">
            <div><h2>{copy.agriculture}</h2><p>{copy.agricultureSub}</p></div>
            <span className="bk-round-arrow" aria-hidden="true">↗</span>
          </div>
        </Link>
      </div>
      <div className="bk-hero-foot" data-hero-enter><span>BRAVIKO</span><p>{copy.footer}</p><span aria-hidden="true">© {new Date().getFullYear()}</span></div>
    </section>
  )
}
