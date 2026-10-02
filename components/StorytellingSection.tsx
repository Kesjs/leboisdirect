'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/lib/i18n-context'
import { bravikoCopy } from '@/data/braviko-copy'

const images = [
  '/images/snowy-firewood-sunset.png',
  '/images/snowy-wood-preparation.png',
  '/images/cozy-stove-comfort.jpg',
]

export default function StorytellingSection() {
  const { locale } = useI18n()
  const copy = bravikoCopy[locale]
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const stage = root.current?.querySelector<HTMLElement>('.bk-story-stage')
        if (!stage) return
        const panels = Array.from(stage.querySelectorAll<HTMLElement>('.bk-story-panel'))
        const markers = Array.from(stage.querySelectorAll<HTMLElement>('.bk-story-marker'))
        stage.classList.add('is-pinned')
        gsap.set(panels.slice(1), { autoAlpha: 0 })
        let active = -1
        const update = (index: number) => {
          if (index === active) return
          active = index
          panels.forEach((panel, i) => {
            panel.setAttribute('aria-hidden', String(i !== index))
            panel.inert = i !== index
          })
          markers.forEach((marker, i) => marker.classList.toggle('is-active', i === index))
        }
        update(0)
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage, start: 'top 80px', end: () => '+=' + Math.round(window.innerHeight * 1.8),
            pin: true, pinSpacing: true, anticipatePin: 1, scrub: 0.55, invalidateOnRefresh: true,
            onUpdate: (self) => update(Math.min(2, Math.floor(self.progress * 3))),
          },
        })
        timeline.to({}, { duration: 0.6 })
        for (let i = 1; i < panels.length; i++) {
          // Switch the scene in two short beats so copy never stacks on top of copy.
          timeline.to(panels[i - 1], { autoAlpha: 0, duration: 0.18 })
            .fromTo(panels[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 })
            .fromTo(panels[i].querySelector('.bk-story-photo'), { scale: 1.06 }, { scale: 1, duration: 0.42 }, '<')
            .to({}, { duration: 0.5 })
        }
        // Resolve fresh font metrics and responsive image geometry before the pin starts.
        const refresh = () => { if (root.current?.isConnected) ScrollTrigger.refresh() }
        document.fonts.ready.then(refresh)
        window.addEventListener('load', refresh, { once: true })
        panels.forEach(panel => panel.querySelector('img')?.addEventListener('load', refresh, { once: true }))
      }, root)
      return () => {
        ctx.revert()
        root.current?.querySelector('.bk-story-stage')?.classList.remove('is-pinned')
        root.current?.querySelectorAll<HTMLElement>('.bk-story-panel').forEach(panel => {
          panel.removeAttribute('aria-hidden')
          panel.inert = false
        })
      }
    })
    return () => media.revert()
  }, [locale])

  return (
    <section ref={root} className="bk-story bk-section" aria-labelledby="story-title">
      <div className="bk-container bk-section-heading" data-reveal>
        <p className="bk-eyebrow">BRAVIKO · {copy.story}</p>
        <h2 id="story-title" className="bk-title">{copy.signature}</h2>
        <p className="bk-lead">{copy.signatureIntro}</p>
      </div>
      <div className="bk-story-stage bk-container">
        <div className="bk-story-chapters" aria-hidden="true">
          {copy.chapters.map((chapter, i) => <span className={'bk-story-marker' + (i === 0 ? ' is-active' : '')} key={chapter.label}><span>0{i + 1}</span>{chapter.label}</span>)}
        </div>
        <div className="bk-story-panels">
          {copy.chapters.map((chapter, i) => (
            <article className="bk-story-panel" key={i}>
              <div className="bk-story-visual">
                <Image src={images[i]} alt="" fill sizes="(max-width: 1024px) 100vw, 58vw" className="bk-image bk-story-photo" quality={85} />
                <span className="bk-story-number" aria-hidden="true">0{i + 1}</span>
              </div>
              <div className="bk-story-copy">
                <p className="bk-eyebrow">{chapter.label}</p>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <Link className="bk-text-link" href="/boutique">{copy.discover}<span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
        <a href="#selection" className="bk-story-skip bk-text-link">{copy.all}<span aria-hidden="true">↓</span></a>
      </div>
    </section>
  )
}
