import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="container-custom py-120">
          <div className="max-w-[700px] mx-auto text-center">
            <div className="w-80 h-80 mx-auto mb-32 rounded-full bg-braise/10 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#B85C3A" opacity="0.1" />
                <path
                  d="M12 20l6 6 10-12"
                  stroke="#B85C3A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="text-heading-lg md:text-display font-semibold text-charcoal mb-20 tracking-tight">
              Commande confirmée
            </h1>

            <p className="text-body-lg text-smoke mb-48 leading-relaxed">
              Merci pour votre commande. Vous allez recevoir un email de confirmation avec tous les détails de votre commande et les informations de livraison.
            </p>

            <div className="bg-white rounded-card border border-hairline p-32 mb-48 text-left">
              <h2 className="text-heading-sm font-semibold text-charcoal mb-20">
                Prochaines étapes
              </h2>
              <div className="space-y-20">
                <div className="flex gap-16">
                  <div className="flex-shrink-0 w-32 h-32 rounded-full bg-braise/10 flex items-center justify-center text-body-sm font-semibold text-braise">
                    1
                  </div>
                  <div>
                    <p className="text-body font-semibold text-charcoal mb-4">
                      Confirmation par email
                    </p>
                    <p className="text-body-sm text-smoke">
                      Vous recevrez un email récapitulatif de votre commande dans quelques instants.
                    </p>
                  </div>
                </div>
                <div className="flex gap-16">
                  <div className="flex-shrink-0 w-32 h-32 rounded-full bg-braise/10 flex items-center justify-center text-body-sm font-semibold text-braise">
                    2
                  </div>
                  <div>
                    <p className="text-body font-semibold text-charcoal mb-4">
                      Préparation
                    </p>
                    <p className="text-body-sm text-smoke">
                      Votre commande sera préparée sous 24-48h.
                    </p>
                  </div>
                </div>
                <div className="flex gap-16">
                  <div className="flex-shrink-0 w-32 h-32 rounded-full bg-braise/10 flex items-center justify-center text-body-sm font-semibold text-braise">
                    3
                  </div>
                  <div>
                    <p className="text-body font-semibold text-charcoal mb-4">
                      Livraison
                    </p>
                    <p className="text-body-sm text-smoke">
                      Vous serez contacté pour organiser la livraison à votre convenance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-16 justify-center">
              <Link href="/boutique">
                <Button size="lg">Continuer mes achats</Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="secondary">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
