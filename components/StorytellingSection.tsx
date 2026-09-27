'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function StorytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only initialize GSAP when section is near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible || !sectionRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray('.story-scene') as HTMLElement[]

      // Pin section - faster scrub
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        anticipatePin: 1,
      })

      // Faster scene transitions
      scenes.forEach((scene, index) => {
        if (index < scenes.length - 1) {
          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `+=${index * 100}% top`,
              end: '+=100%',
              scrub: 0.3, // Faster scrub (was 1)
            },
          })
            .to(scene, { opacity: 0, duration: 0.3 }) // Simpler - no scale
            .from(scenes[index + 1], { opacity: 0, duration: 0.3 }, '<')
        }

        // Subtle parallax only - faster
        const img = scene.querySelector('.scene-image')
        if (img) {
          gsap.to(img, {
            scale: 1.08, // Reduced from 1.15
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `+=${index * 100}% top`,
              end: '+=100%',
              scrub: 0.5, // Faster (was 1.5)
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-charcoal"
    >
      {/* Scene 01 */}
      <div className="story-scene absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 scene-image">
          <Image
            src="/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg"
            alt="Texture du bois"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={65}
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-[700px] px-20">
          <div className="flex items-center justify-center gap-12 mb-20">
            <div className="w-24 h-1 bg-braise" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">01 / BOIS</span>
            <div className="w-24 h-1 bg-braise" />
          </div>
          <h2 className="text-[44px] md:text-[56px] font-semibold tracking-tight leading-none mb-16">
            Tout commence<br />par le bois
          </h2>
          <p className="text-[16px] text-white/75 max-w-[450px] mx-auto">
            Sélectionné avec soin pour sa qualité et son pouvoir calorifique.
          </p>
        </div>
      </div>

      {/* Scene 02 */}
      <div className="story-scene absolute inset-0 flex items-center justify-center opacity-0">
        <div className="absolute inset-0">
          <Image
            src="/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg"
            alt="Bûches empilées"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={65}
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-[700px] px-20">
          <div className="flex items-center justify-center gap-12 mb-20">
            <div className="w-24 h-1 bg-braise" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">02 / FORMAT</span>
            <div className="w-24 h-1 bg-braise" />
          </div>
          <h2 className="text-[44px] md:text-[56px] font-semibold tracking-tight leading-none mb-16">
            Le bon format<br />pour votre foyer
          </h2>
          <p className="text-[16px] text-white/75 max-w-[450px] mx-auto">
            Bûches de 33 cm ou 50 cm, prêtes à l'emploi.
          </p>
        </div>
      </div>

      {/* Scene 03 */}
      <div className="story-scene absolute inset-0 flex items-center justify-center opacity-0">
        <div className="absolute inset-0">
          <Image
            src="/images/man-room-with-solid-fuel-boiler-working-biofuel-economical-heating.jpg"
            alt="Livraison"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={65}
          />
          <div className="absolute inset-0 bg-charcoal/40" />
        </div>
        <div className="relative z-10 text-center text-white max-w-[700px] px-20">
          <div className="flex items-center justify-center gap-12 mb-20">
            <div className="w-24 h-1 bg-braise" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">03 / LIVRAISON</span>
            <div className="w-24 h-1 bg-braise" />
          </div>
          <h2 className="text-[44px] md:text-[56px] font-semibold tracking-tight leading-none mb-16">
            Le bois arrive<br />chez vous
          </h2>
          <p className="text-[16px] text-white/75 max-w-[450px] mx-auto">
            Livraison rapide partout en France, déchargement inclus.
          </p>
        </div>
      </div>

      {/* Scene 04 */}
      <div className="story-scene absolute inset-0 flex items-center justify-center opacity-0">
        <div className="absolute inset-0 scene-image">
          <Image
            src="/images/scandinavian-interior-with-fireplace-stump-table-pile-logs-fire.jpg"
            alt="Chaleur"
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={65}
          />
          <div className="absolute inset-0 bg-charcoal/30" />
        </div>
        <div className="relative z-10 text-center text-white max-w-[700px] px-20">
          <div className="flex items-center justify-center gap-12 mb-20">
            <div className="w-24 h-1 bg-braise" />
            <span className="text-[10px] font-semibold uppercase tracking-wider">04 / CHALEUR</span>
            <div className="w-24 h-1 bg-braise" />
          </div>
          <h2 className="text-[44px] md:text-[56px] font-semibold tracking-tight leading-none mb-16">
            Et l'hiver devient<br />plus simple
          </h2>
          <p className="text-[16px] text-white/75 max-w-[450px] mx-auto">
            Profitez de la chaleur et du confort d'un feu de bois de qualité.
          </p>
        </div>
      </div>
    </section>
  )
}
