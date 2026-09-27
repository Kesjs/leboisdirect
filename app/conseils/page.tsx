import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function TipsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <section className="relative h-[42vh] min-h-[340px] flex items-center justify-center overflow-hidden bg-charcoal">
          <div className="absolute inset-0">
            <Image
              src="/images/view-fireplace-with-burning-logs-natural-fur-skin-floor-holder-with-logs-cozy-room.jpg"
              alt="Conseils bois de chauffage"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70" />
          </div>
          <div className="relative z-10 container-custom text-center text-white">
            <div className="inline-flex items-center gap-8 px-16 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-24">
              <div className="w-6 h-6 rounded-full bg-braise" />
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Guides
              </span>
            </div>
            <h1 className="text-[40px] sm:text-[48px] md:text-[60px] font-semibold tracking-tight leading-none mb-16">
              Conseils pratiques
            </h1>
            <p className="text-body-lg text-white/85 max-w-[600px] mx-auto">
              Tout ce qu'il faut savoir pour bien choisir, stocker et utiliser votre bois de chauffage.
            </p>
          </div>
        </section>

        <section className="py-120">
          <div className="container-custom max-w-[1200px]">
            {/* Guide Cards */}
            <div className="grid md:grid-cols-2 gap-32 mb-120">
              <article className="bg-white rounded-card border border-hairline overflow-hidden group">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg"
                    alt="Choisir son bois"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-32">
                  <div className="inline-flex items-center gap-8 px-12 py-6 bg-braise/10 rounded-full mb-16">
                    <span className="text-[11px] font-semibold text-braise uppercase tracking-wide">
                      Guide
                    </span>
                  </div>
                  <h2 className="text-heading font-semibold text-charcoal mb-16">
                    Choisir le bon bois
                  </h2>
                  <p className="text-body text-smoke leading-relaxed mb-20">
                    Chaque essence de bois a ses caractéristiques. Le chêne offre une combustion longue, le hêtre des flammes vives, le charme une chaleur intense.
                  </p>
                  <ul className="space-y-12">
                    <li className="flex items-start gap-12">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-2">
                        <circle cx="10" cy="10" r="10" fill="#B85C3A" opacity="0.1" />
                        <path d="M6 10l2.5 2.5L14 7" stroke="#B85C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-body-sm text-smoke">Privilégiez les feuillus durs pour un chauffage principal</span>
                    </li>
                    <li className="flex items-start gap-12">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-2">
                        <circle cx="10" cy="10" r="10" fill="#B85C3A" opacity="0.1" />
                        <path d="M6 10l2.5 2.5L14 7" stroke="#B85C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-body-sm text-smoke">Vérifiez toujours le taux d'humidité (inférieur à 20%)</span>
                    </li>
                    <li className="flex items-start gap-12">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-2">
                        <circle cx="10" cy="10" r="10" fill="#B85C3A" opacity="0.1" />
                        <path d="M6 10l2.5 2.5L14 7" stroke="#B85C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-body-sm text-smoke">Adaptez la longueur à votre foyer (33 cm ou 50 cm)</span>
                    </li>
                  </ul>
                </div>
              </article>

              <article className="bg-white rounded-card border border-hairline overflow-hidden group">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/person-warming-up-feet-fire.jpg"
                    alt="Stocker son bois"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-32">
                  <div className="inline-flex items-center gap-8 px-12 py-6 bg-braise/10 rounded-full mb-16">
                    <span className="text-[11px] font-semibold text-braise uppercase tracking-wide">
                      Guide
                    </span>
                  </div>
                  <h2 className="text-heading font-semibold text-charcoal mb-16">
                    Stocker correctement
                  </h2>
                  <p className="text-body text-smoke leading-relaxed mb-20">
                    Un bon stockage préserve la qualité du bois et garantit une combustion optimale tout l'hiver.
                  </p>
                  <ul className="space-y-12">
                    <li className="flex items-start gap-12">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-2">
                        <circle cx="10" cy="10" r="10" fill="#B85C3A" opacity="0.1" />
                        <path d="M6 10l2.5 2.5L14 7" stroke="#B85C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-body-sm text-smoke">Protégez le bois de la pluie avec un abri aéré</span>
                    </li>
                    <li className="flex items-start gap-12">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-2">
                        <circle cx="10" cy="10" r="10" fill="#B85C3A" opacity="0.1" />
                        <path d="M6 10l2.5 2.5L14 7" stroke="#B85C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-body-sm text-smoke">Évitez le contact direct avec le sol (palettes recommandées)</span>
                    </li>
                    <li className="flex items-start gap-12">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-2">
                        <circle cx="10" cy="10" r="10" fill="#B85C3A" opacity="0.1" />
                        <path d="M6 10l2.5 2.5L14 7" stroke="#B85C3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-body-sm text-smoke">Assurez une bonne circulation d'air autour du tas</span>
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            {/* Detailed Tips */}
            <div className="max-w-[900px] mx-auto space-y-64">
              <div>
                <h2 className="text-heading-lg font-semibold text-charcoal mb-24">
                  Quelle quantité commander ?
                </h2>
                <div className="bg-white rounded-card border border-hairline p-32">
                  <div className="space-y-20">
                    <div className="flex justify-between items-center pb-20 border-b border-hairline">
                      <span className="text-body font-semibold text-charcoal">Usage principal (toute la maison)</span>
                      <span className="text-body font-semibold text-braise">8-12 stères/an</span>
                    </div>
                    <div className="flex justify-between items-center pb-20 border-b border-hairline">
                      <span className="text-body font-semibold text-charcoal">Usage régulier (pièce principale)</span>
                      <span className="text-body font-semibold text-braise">5-8 stères/an</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body font-semibold text-charcoal">Usage d'appoint (weekends)</span>
                      <span className="text-body font-semibold text-braise">3-5 stères/an</span>
                    </div>
                  </div>
                  <p className="text-body-sm text-smoke mt-24">
                    Ces quantités sont indicatives et dépendent de la surface à chauffer, de l'isolation et de la température souhaitée.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-heading-lg font-semibold text-charcoal mb-24">
                  Conseils de combustion
                </h2>
                <div className="space-y-16">
                  <div className="bg-white rounded-card border border-hairline p-24">
                    <h3 className="text-body font-semibold text-charcoal mb-12">Allumage efficace</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Utilisez du petit bois sec et des allume-feu naturels. Allumez par le haut pour une combustion plus propre et un meilleur rendement.
                    </p>
                  </div>
                  <div className="bg-white rounded-card border border-hairline p-24">
                    <h3 className="text-body font-semibold text-charcoal mb-12">Rechargement</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Rechargez votre poêle lorsque les braises sont encore vives. Ne surchargez pas pour maintenir une bonne circulation d'air.
                    </p>
                  </div>
                  <div className="bg-white rounded-card border border-hairline p-24">
                    <h3 className="text-body font-semibold text-charcoal mb-12">Entretien</h3>
                    <p className="text-body-sm text-smoke leading-relaxed">
                      Videz régulièrement les cendres et faites ramoner votre conduit au moins une fois par an pour la sécurité et le rendement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-120 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-heading-lg font-semibold text-charcoal mb-24">
              Besoin de conseils personnalisés ?
            </h2>
            <p className="text-body-lg text-smoke mb-40 max-w-[600px] mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions.
            </p>
            <a
              href="/faq"
              className="inline-flex items-center gap-12 px-40 py-16 bg-charcoal text-white rounded-pill hover:bg-charcoal/90 transition-colors font-medium"
            >
              Voir la FAQ
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
