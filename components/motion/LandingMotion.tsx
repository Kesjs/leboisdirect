'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Progressive enhancement: everything remains visible without JS or in reduced motion. */
export default function LandingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(element => {
          gsap.from(element, {
            y: 26, opacity: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          })
        })
        gsap.fromTo('[data-delivery-progress]', { scaleY: 0 }, {
          scaleY: 1, transformOrigin: 'top', ease: 'none',
          scrollTrigger: { trigger: '[data-delivery-steps]', start: 'top 75%', end: 'bottom 65%', scrub: 0.4 },
        })
      }, root)
      return () => ctx.revert()
    })
    return () => media.revert()
  }, [])
  return <div ref={root}>{children}</div>
}
