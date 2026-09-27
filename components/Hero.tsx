'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current || !imageRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Simple parallax only - no text animations
      gsap.to(imageRef.current, {
        scale: 1.08,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85dvh] h-[85dvh] min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-charcoal"
      aria-label="Hero section"
    >
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/photorealistic-timber-house-interior-with-wooden-decor-furnishings.jpg"
          alt="Intérieur chaleureux avec bois de chauffage"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-transparent to-charcoal/40" />
      </div>

      <div ref={contentRef} className="relative z-10 container-custom text-center">
        <div className="max-w-[840px] mx-auto">
          <h1 className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-semibold text-white text-balance mb-20 sm:mb-24 leading-[1.05] tracking-tight px-16 sm:px-0">
            Votre bois de chauffage,<br className="hidden sm:inline" /><span className="sm:hidden"> </span>livré chez vous
          </h1>
          
          <p className="text-[16px] sm:text-[18px] text-white/85 text-balance mb-32 sm:mb-40 max-w-[520px] mx-auto leading-relaxed px-20 sm:px-0">
            Choisissez votre bois, votre format et commandez en ligne.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-12 px-20 sm:px-0">
            <Link href="/boutique">
              <Button 
                size="md"
                className="w-full sm:w-auto min-w-[180px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Voir les bois
              </Button>
            </Link>
            <Link href="/livraison">
              <Button 
                size="md"
                variant="secondary" 
                className="bg-white/10 backdrop-blur-sm border-white/25 text-white hover:bg-white/20 w-full sm:w-auto min-w-[180px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}
