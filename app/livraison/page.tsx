import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DeliveryPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-64">
            <div className="inline-flex items-center gap-8 px-16 py-6 bg-braise/10 rounded-full mb-24">
              <div className="w-6 h-6 rounded-full bg-braise" />
              <span className="text-[11px] font-semibold text-braise uppercase tracking-wide">
                Livraison
              </span>
            </div>
            <h1 className="text-heading-lg md:text-display font-semibold text-charcoal mb-20 tracking-tight">
              Comment fonctionne la livraison
            </h1>
            <p className="text-body-lg text-smoke max-w-[700px]">
              Nous livrons votre bois de chauffage partout en France avec déchargement inclus.
            </p>
          </div>
        </div>

        <section className="py-120">
          <div className="container-custom max-w-[900px]">
            <div className="space-y-64">
              {/* Step 1 */}
              <div className="flex gap-32">
                <div className="flex-shrink-0 w-64 h-64 rounded-full bg-braise/10 flex items-center justify-center text-heading font-semibold text-braise">
                  01
                </div>
                <div>
                  <h2 className="text-heading font-semibold text-charcoal mb-16">
                    Vous commandez en ligne
                  </h2>
                  <p className="text-body-lg text-smoke leading-relaxed">
                    Choisissez votre bois, votre format et votre quantité. Validez votre commande en quelques clics. Vous recevez immédiatement une confirmation par email.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-32">
                <div className="flex-shrink-0 w-64 h-64 rounded-full bg-braise/10 flex items-center justify-center text-heading font-semibold text-braise">
                  02
                </div>
                <div>
                  <h2 className="text-heading font-semibold text-charcoal mb-16">
                    Nous préparons votre commande
                  </h2>
                  <p className="text-body-lg text-smoke leading-relaxed">
                    Votre commande est préparée sous 24 à 48h. Le bois est contrôlé une dernière fois avant d'être chargé pour la livraison.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-32">
                <div className="flex-shrink-0 w-64 h-64 rounded-full bg-braise/10 flex items-center justify-center text-heading font-semibold text-braise">
                  03
                </div>
                <div>
                  <h2 className="text-heading font-semibold text-charcoal mb-16">
                    Organisation de la livraison
                  </h2>
                  <p className="text-body-lg text-smoke leading-relaxed">
                    Nous vous contactons par téléphone pour organiser un créneau de livraison qui vous convient. Vous choisissez le jour et la plage horaire.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-32">
                <div className="flex-shrink-0 w-64 h-64 rounded-full bg-braise/10 flex items-center justify-center text-heading font-semibold text-braise">
                  04
                </div>
                <div>
                  <h2 className="text-heading font-semibold text-charcoal mb-16">
                    Livraison et déchargement
                  </h2>
                  <p className="text-body-lg text-smoke leading-relaxed">
                    Le jour convenu, votre bois est livré et déchargé à l'emplacement de votre choix (garage, abri de jardin, etc.). Le chauffeur s'assure que tout est en ordre avant de partir.
                  </p>
                </div>
              </div>
            </div>

            {/* Info Boxes */}
            <div className="grid md:grid-cols-2 gap-32 mt-64 pt-64 border-t border-hairline">
              <div className="bg-white rounded-card border border-hairline p-32">
                <h3 className="text-heading-sm font-semibold text-charcoal mb-16">
                  Zones de livraison
                </h3>
                <p className="text-body text-smoke leading-relaxed">
                  Nous livrons partout en France métropolitaine. Les délais peuvent varier selon votre localisation. Contactez-nous pour plus d'informations sur votre zone.
                </p>
              </div>

              <div className="bg-white rounded-card border border-hairline p-32">
                <h3 className="text-heading-sm font-semibold text-charcoal mb-16">
                  Déchargement inclus
                </h3>
                <p className="text-body text-smoke leading-relaxed">
                  Le déchargement est toujours inclus dans nos tarifs. Indiquez simplement l'emplacement souhaité lors de l'organisation de la livraison.
                </p>
              </div>

              <div className="bg-white rounded-card border border-hairline p-32">
                <h3 className="text-heading-sm font-semibold text-charcoal mb-16">
                  Délais de livraison
                </h3>
                <p className="text-body text-smoke leading-relaxed">
                  Comptez généralement entre 5 et 10 jours entre votre commande et la livraison effective, selon votre zone géographique et la disponibilité.
                </p>
              </div>

              <div className="bg-white rounded-card border border-hairline p-32">
                <h3 className="text-heading-sm font-semibold text-charcoal mb-16">
                  Questions ?
                </h3>
                <p className="text-body text-smoke leading-relaxed mb-16">
                  Vous avez une question sur la livraison ? Consultez notre FAQ ou contactez-nous directement.
                </p>
                <a href="/faq" className="text-body text-braise hover:underline font-medium">
                  Voir la FAQ →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
