'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'

const heroCardsCopy = {
  it: {
    fuelTag: 'COMBUSTIBILI CERTIFICATI',
    fuelTitle: 'Legna da ardere, pellet & tronchetti',
    fuelSub: 'Essiccata < 20 % pronta all’uso · Consegna gratuita su bancale',
    stoveTag: 'APPARECCHI & ESTERNI',
    stoveTitle: 'Stufe, inserti & bracieri',
    stoveSub: 'Ghisa e acciaio ad alto rendimento · Spedizione gratuita',
  },
  fr: {
    fuelTag: 'COMBUSTIBLES CERTIFIÉS',
    fuelTitle: 'Bois de chauffage, granulés & bûches',
    fuelSub: 'Séché < 20 % prêt à brûler · Livraison gratuite sur palette',
    stoveTag: 'APPAREILS & EXTÉRIEUR',
    stoveTitle: 'Poêles, inserts & braseros',
    stoveSub: 'Fonte et acier haut rendement · Livraison offerte',
  },
  de: {
    fuelTag: 'GEPRÜFTE BRENNSTOFFE',
    fuelTitle: 'Brennholz, Pellets & Briketts',
    fuelSub: 'Kammergetrocknet < 20 % · Kostenlose Palettenlieferung',
    stoveTag: 'ÖFEN & OUTDOOR',
    stoveTitle: 'Kaminöfen, Einsätze & Feuerschalen',
    stoveSub: 'Gusseisen & Stahl mit hohem Wirkungsgrad · Gratis Versand',
  },
} as const

export default function Hero() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const cards = heroCardsCopy[locale]
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
          <p>{copy.selectionIntro}</p>
          <div className="bk-hero-actions">
            <Link className="bk-button" href="/boutique">{copy.heroCta}<span aria-hidden="true">↗</span></Link>
            <a className="bk-text-link" href="#preuves">{copy.heroProofCta}<span aria-hidden="true">↘</span></a>
          </div>
        </div>
      </div>
      <div className="bk-hero-worlds">
        <Link href="/boutique?group=combustibles" className="bk-world bk-world-heat" data-hero-enter>
          <div className="bk-world-media" data-hero-parallax>
            <Image
              src="/images/photorealistic-perspective-wood-logs.jpg"
              alt={cards.fuelTitle}
              fill
              priority
              sizes="(max-width: 700px) 100vw, 55vw"
              className="bk-image"
              quality={85}
            />
          </div>
          <div className="bk-world-shade" />
          <div className="bk-world-top"><span>{cards.fuelTag}</span><span>01</span></div>
          <div className="bk-world-bottom">
            <div><h2>{cards.fuelTitle}</h2><p>{cards.fuelSub}</p></div>
            <span className="bk-round-arrow" aria-hidden="true">↗</span>
          </div>
        </Link>
        <Link href="/boutique?group=appareils" className="bk-world bk-world-heat" data-hero-enter>
          <div className="bk-world-media" data-hero-parallax>
            <Image
              src="/images/fireplace-with-woods-modern-wooden-house.jpg"
              alt={cards.stoveTitle}
              fill
              priority
              sizes="(max-width: 700px) 100vw, 45vw"
              className="bk-image"
              quality={85}
            />
          </div>
          <div className="bk-world-shade" />
          <div className="bk-world-top"><span>{cards.stoveTag}</span><span>02</span></div>
          <div className="bk-world-bottom">
            <div><h2>{cards.stoveTitle}</h2><p>{cards.stoveSub}</p></div>
            <span className="bk-round-arrow" aria-hidden="true">↗</span>
          </div>
        </Link>
      </div>
    </section>
  )
}
