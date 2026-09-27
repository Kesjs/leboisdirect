import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductCard from '@/components/ProductCard'
import StorytellingSection from '@/components/StorytellingSection'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { products, categories } from '@/data/products'

export default function Home() {
  const featuredProducts = products.slice(0, 6) // 6 products

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Categories Strip */}
      <section className="py-60 bg-white border-y border-hairline reveal-up">
        <div className="container-custom">
          <div className="flex overflow-x-auto gap-16 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/boutique?category=${category.slug}`}
                className="flex-shrink-0 px-24 py-12 bg-mist hover:bg-hairline border border-hairline rounded-pill transition-all duration-300 text-body-sm font-medium text-charcoal hover:text-braise"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-120 reveal-up">
        <div className="container-custom">
          <div className="mb-64 text-center max-w-[700px] mx-auto">
            <h2 className="text-heading-lg md:text-display font-semibold text-charcoal mb-20 tracking-tight leading-tight">
              Bois de chauffage premium
            </h2>
            <p className="text-body-lg text-smoke">
              Chêne, hêtre et charme séchés naturellement. Livrés chez vous sous 48h en Île-de-France.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-24 md:gap-32 reveal-stagger">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-64 text-center">
            <a
              href="/boutique"
              className="inline-flex items-center gap-12 px-40 py-16 bg-charcoal text-white rounded-pill hover:bg-charcoal/90 transition-colors font-medium"
            >
              Voir tous les produits
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10m0 0l-4-4m4 4l-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Storytelling Cinematic Section */}
      <StorytellingSection />

      {/* Quality Section */}
      <section className="py-120 bg-white reveal-up">
        <div className="container-custom">
          <div className="grid md:grid-cols-12 gap-40 md:gap-24 reveal-stagger">
            <div className="md:col-span-6 text-center md:text-left">
              <div className="w-48 h-48 mx-auto md:mx-0 mb-20 rounded-full bg-braise/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B85C3A" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="text-heading-sm font-semibold text-charcoal mb-12">
                Bois séché sous 20% d'humidité
              </h3>
              <p className="text-body-sm text-smoke leading-relaxed">
                Séchage naturel garanti. Combustion optimale et moins de fumée.
              </p>
            </div>

            <div className="md:col-span-2 text-center md:text-left md:border-l md:border-hairline md:pl-24">
              <div className="w-48 h-48 mx-auto md:mx-0 mb-20 rounded-full bg-braise/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B85C3A" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-heading-sm font-semibold text-charcoal mb-12">
                Commande en 3 clics
              </h3>
              <p className="text-body-sm text-smoke leading-relaxed">
                Choisissez votre bois, payez en ligne, recevez votre confirmation.
              </p>
            </div>

            <div className="md:col-span-2 text-center md:text-left md:border-l md:border-hairline md:pl-24">
              <div className="w-48 h-48 mx-auto md:mx-0 mb-20 rounded-full bg-braise/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B85C3A" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <path d="M16 8h7M16 12h7M16 16h7"/>
                </svg>
              </div>
              <h3 className="text-heading-sm font-semibold text-charcoal mb-12">
                Livré sous 48h en Île-de-France
              </h3>
              <p className="text-body-sm text-smoke leading-relaxed">
                Déchargement inclus. Livraison partout en France sous 5 jours.
              </p>
            </div>

            <div className="md:col-span-2 text-center md:text-left md:border-l md:border-hairline md:pl-24">
              <div className="w-48 h-48 mx-auto md:mx-0 mb-20 rounded-full bg-braise/10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B85C3A" strokeWidth="2">
                  <path d="M3 3h18v18H3z"/>
                  <path d="M9 9l6 6M15 9l-6 6"/>
                </svg>
              </div>
              <h3 className="text-heading-sm font-semibold text-charcoal mb-12">
                Fiches techniques complètes
              </h3>
              <p className="text-body-sm text-smoke leading-relaxed">
                Essence, conditionnement, pouvoir calorifique : tout pour choisir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-120 md:py-160 bg-ivory reveal-up">
        <div className="container-custom">
          <div className="grid md:grid-cols-[0.92fr_1.08fr] gap-48 lg:gap-80 items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-charcoal">
              <Image
                src="/images/man-warming-fireplace-energy-crisis.jpg"
                alt="Livraison de bois de chauffage"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                quality={65}
              />
            </div>
            <div className="max-w-[620px]">
              <p className="text-[11px] font-semibold text-braise uppercase tracking-[0.18em] mb-20">
                Du choix à la chaleur
              </p>
              <h2 className="text-heading-lg md:text-display font-semibold text-charcoal mb-24 tracking-tight leading-[0.98]">
                Le bois, simplement<br className="hidden md:inline" /> livré chez vous
              </h2>
              <p className="text-body-lg text-smoke mb-48 leading-relaxed max-w-[560px]">
                Vous choisissez le bon format. Nous préparons votre commande et nous la livrons avec déchargement inclus.
              </p>
              <div className="relative ml-4 space-y-28 before:absolute before:left-[19px] before:top-20 before:bottom-20 before:w-px before:bg-braise/30">
                <div className="relative flex gap-20 reveal-up">
                  <div className="relative z-10 flex-shrink-0 w-40 h-40 rounded-full bg-ivory border border-braise flex items-center justify-center text-[13px] font-semibold text-braise">
                    01
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-charcoal mb-6">Choisissez</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Sélectionnez l’essence, le format et la quantité adaptés à votre foyer.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-20 reveal-up">
                  <div className="relative z-10 flex-shrink-0 w-40 h-40 rounded-full bg-ivory border border-braise flex items-center justify-center text-[13px] font-semibold text-braise">
                    02
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-charcoal mb-6">Commandez</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Votre commande est confirmée immédiatement, avec un suivi clair.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-20 reveal-up">
                  <div className="relative z-10 flex-shrink-0 w-40 h-40 rounded-full bg-braise border border-braise flex items-center justify-center text-[13px] font-semibold text-white">
                    03
                  </div>
                  <div>
                    <h3 className="text-[20px] font-semibold text-charcoal mb-6">Recevez</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Livraison rapide avec déchargement à l’emplacement de votre choix.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-40">
                <a
                  href="/livraison"
                  className="inline-flex items-center gap-8 text-body-sm font-semibold text-charcoal border-b-2 border-braise pb-2 hover:gap-12 hover:text-braise transition-all"
                >
                  En savoir plus
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10m0 0l-4-4m4 4l-4 4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winter Preparation CTA */}
      <section className="py-120 bg-white reveal-up">
        <div className="container-custom">
          <div className="relative rounded-card overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/images/view-woman-relaxing-home-with-warm-drink.jpg"
                alt="Préparez votre hiver"
                fill
                sizes="100vw"
                className="object-cover"
                loading="lazy"
                quality={65}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/40" />
            </div>
            <div className="relative z-10 py-120 px-48 md:px-64">
              <div className="max-w-[600px]">
                <h2 className="text-heading-lg md:text-display font-semibold text-white mb-24 tracking-tight leading-tight">
                  Préparez votre hiver
                </h2>
                <p className="text-body-lg text-white/90 mb-40 leading-relaxed">
                  Commandez dès maintenant pour profiter d'un stock de bois de qualité tout l'hiver.
                </p>
                <a
                  href="/boutique"
                  className="inline-flex items-center gap-12 px-40 py-16 bg-white text-charcoal rounded-pill hover:bg-white/90 transition-colors font-medium shadow-lg"
                >
                  Commander maintenant
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8h10m0 0l-4-4m4 4l-4 4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
