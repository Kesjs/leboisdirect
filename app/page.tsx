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
      <section className="py-60 bg-white border-y border-hairline">
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
      <section className="py-120">
        <div className="container-custom">
          <div className="mb-64 text-center max-w-[700px] mx-auto">
            <h2 className="text-heading-lg md:text-display font-semibold text-charcoal mb-20 tracking-tight leading-tight">
              Bois de chauffage premium
            </h2>
            <p className="text-body-lg text-smoke">
              Chêne, hêtre et charme séchés naturellement. Livrés chez vous sous 48h en Île-de-France.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-24 md:gap-32">
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
      <section className="py-120 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-40 md:gap-32">
            <div className="text-center md:text-left">
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

            <div className="text-center md:text-left">
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

            <div className="text-center md:text-left">
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

            <div className="text-center md:text-left">
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
      <section className="py-120 bg-ivory">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-64 items-center">
            <div className="relative aspect-[4/3] rounded-card overflow-hidden">
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
            <div>
              <div className="inline-flex items-center gap-8 px-12 py-6 bg-braise/10 rounded-full mb-24">
                <div className="w-6 h-6 rounded-full bg-braise" />
                <span className="text-[11px] font-semibold text-braise uppercase tracking-wide">
                  Livraison
                </span>
              </div>
              <h2 className="text-heading-lg md:text-display font-semibold text-charcoal mb-24 tracking-tight leading-tight">
                Votre bois,<br />directement chez vous
              </h2>
              <p className="text-body-lg text-smoke mb-40 leading-relaxed">
                Nous livrons votre bois de chauffage partout en France. 
                Commandez en ligne, nous nous occupons du reste.
              </p>
              <div className="space-y-32">
                <div className="flex gap-20">
                  <div className="flex-shrink-0 w-48 h-48 rounded-full bg-white border border-hairline flex items-center justify-center text-heading-sm font-semibold text-charcoal">
                    01
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-semibold text-charcoal mb-8">Choisissez</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Sélectionnez votre bois, format et quantité en quelques clics.
                    </p>
                  </div>
                </div>
                <div className="flex gap-20">
                  <div className="flex-shrink-0 w-48 h-48 rounded-full bg-white border border-hairline flex items-center justify-center text-heading-sm font-semibold text-charcoal">
                    02
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-semibold text-charcoal mb-8">Commandez</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Paiement sécurisé et confirmation immédiate de votre commande.
                    </p>
                  </div>
                </div>
                <div className="flex gap-20">
                  <div className="flex-shrink-0 w-48 h-48 rounded-full bg-white border border-hairline flex items-center justify-center text-heading-sm font-semibold text-charcoal">
                    03
                  </div>
                  <div>
                    <h3 className="text-heading-sm font-semibold text-charcoal mb-8">Recevez</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Livraison rapide avec déchargement à l'emplacement de votre choix.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-48">
                <a
                  href="/livraison"
                  className="inline-flex items-center gap-12 px-32 py-12 bg-charcoal text-white rounded-pill hover:bg-charcoal/90 transition-colors font-medium"
                >
                  En savoir plus
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

      {/* Winter Preparation CTA */}
      <section className="py-120 bg-white">
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
