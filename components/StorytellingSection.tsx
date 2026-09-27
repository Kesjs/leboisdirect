'use client'

import Image from 'next/image'

export default function StorytellingSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#d8d0c6]">
      {/* Scene 01 */}
      <div className="story-scene relative min-h-[78dvh] flex items-center justify-center">
        <div className="absolute inset-0 scene-image">
          <Image
            src="/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg"
            alt="Texture du bois"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-charcoal/30" />
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
      <div className="story-scene relative min-h-[78dvh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg"
            alt="Bûches empilées"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-charcoal/30" />
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
      <div className="story-scene relative min-h-[78dvh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/man-room-with-solid-fuel-boiler-working-biofuel-economical-heating.jpg"
            alt="Livraison"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-charcoal/30" />
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
      <div className="story-scene relative min-h-[78dvh] flex items-center justify-center">
        <div className="absolute inset-0 scene-image">
          <Image
            src="/images/scandinavian-interior-with-fireplace-stump-table-pile-logs-fire.jpg"
            alt="Chaleur"
            fill
            className="object-cover"
            sizes="100vw"
            quality={75}
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
