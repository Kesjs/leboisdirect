import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-charcoal">
          <div className="absolute inset-0">
            <Image
              src="/images/fireplace-with-woods-modern-wooden-house.jpg"
              alt="Notre histoire"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-charcoal/70" />
          </div>
          <div className="relative z-10 container-custom text-center text-white">
            <div className="inline-flex items-center gap-8 px-16 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-24">
              <div className="w-6 h-6 rounded-full bg-braise" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Notre histoire
              </span>
            </div>
            <h1 className="text-[56px] md:text-[72px] font-semibold tracking-tight leading-none">
              Simplifier l'hiver
            </h1>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-120">
          <div className="container-custom max-w-[900px]">
            <div className="prose prose-lg">
              <h2 className="text-heading-lg font-semibold text-charcoal mb-24 tracking-tight">
                Pourquoi LeBoisDirect existe
              </h2>
              <p className="text-body-lg text-smoke mb-32 leading-relaxed">
                Commander du bois de chauffage ne devrait pas être compliqué. Pas de longues recherches, pas de numéros à appeler, pas d'attente. Juste un site simple, des produits clairs et une livraison organisée.
              </p>
              <p className="text-body-lg text-smoke mb-48 leading-relaxed">
                LeBoisDirect est né de cette idée : rendre l'achat de bois de chauffage aussi simple qu'une commande en ligne classique, tout en garantissant la qualité d'un produit naturel essentiel.
              </p>

              <div className="grid grid-cols-3 gap-16 sm:gap-32 py-32 mb-64 border-y border-hairline not-prose">
                <div className="text-center sm:text-left">
                  <div className="text-[32px] sm:text-[40px] font-semibold text-braise tracking-tight leading-none mb-8">18-24</div>
                  <p className="text-body-sm text-smoke">mois de séchage naturel</p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-[32px] sm:text-[40px] font-semibold text-braise tracking-tight leading-none mb-8">&lt;20%</div>
                  <p className="text-body-sm text-smoke">taux d'humidité garanti</p>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-[32px] sm:text-[40px] font-semibold text-braise tracking-tight leading-none mb-8">100%</div>
                  <p className="text-body-sm text-smoke">France métropolitaine</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-32 my-64">
                <div className="relative aspect-[4/3] rounded-card overflow-hidden">
                  <Image
                    src="/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg"
                    alt="Bois de qualité"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-card overflow-hidden">
                  <Image
                    src="/images/view-fireplace-with-burning-logs-natural-fur-skin-floor-holder-with-logs-cozy-room.jpg"
                    alt="Chaleur du foyer"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-heading-lg font-semibold text-charcoal mb-24 tracking-tight mt-64">
                Le bois avant tout
              </h2>
              <p className="text-body-lg text-smoke mb-32 leading-relaxed">
                Nous sélectionnons du bois français, séché naturellement pendant 18 à 24 mois. Chaque essence est choisie pour son pouvoir calorifique et sa combustion optimale. Pas de bois humide, pas de mauvaises surprises.
              </p>
              <p className="text-body-lg text-smoke mb-64 leading-relaxed">
                Le taux d'humidité est contrôlé, le conditionnement est pensé pour faciliter le stockage, et les formats correspondent aux besoins réels des foyers et poêles modernes.
              </p>

              <h2 className="text-heading-lg font-semibold text-charcoal mb-24 tracking-tight">
                Une livraison pensée
              </h2>
              <p className="text-body-lg text-smoke mb-32 leading-relaxed">
                Le bois de chauffage est lourd. Nous le savons. C'est pourquoi la livraison inclut le déchargement à l'emplacement de votre choix. Vous choisissez votre créneau, nous nous occupons du reste.
              </p>

              <h2 className="text-heading-lg font-semibold text-charcoal mb-24 tracking-tight mt-64">
                L'hiver plus simple
              </h2>
              <p className="text-body-lg text-smoke mb-32 leading-relaxed">
                Notre objectif n'est pas de révolutionner le bois de chauffage. C'est de rendre son achat simple, transparent et fiable. Commandez en ligne, recevez rapidement, chauffez sereinement.
              </p>
              <p className="text-body-lg text-smoke leading-relaxed">
                Voilà comment nous voyons LeBoisDirect : un service utile, sans artifice, qui facilite l'essentiel.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-120 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-heading-lg font-semibold text-charcoal mb-24">
              Prêt à commander ?
            </h2>
            <p className="text-body-lg text-smoke mb-40 max-w-[600px] mx-auto">
              Découvrez notre sélection de bois de chauffage premium et préparez votre hiver dès maintenant.
            </p>
            <a
              href="/boutique"
              className="inline-flex items-center gap-12 px-40 py-16 bg-charcoal text-white rounded-pill hover:bg-charcoal/90 transition-colors font-medium"
            >
              Voir nos produits
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10m0 0l-4-4m4 4l-4 4" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
