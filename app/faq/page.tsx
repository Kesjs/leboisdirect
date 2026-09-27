'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const faqs = [
  {
    category: 'Produits',
    questions: [
      {
        q: 'Quel bois choisir pour mon foyer ?',
        a: 'Le chêne offre une combustion longue et un excellent pouvoir calorifique. Le hêtre brûle avec de belles flammes et peu de résidus. Le charme produit une chaleur intense avec des braises durables. Tout dépend de votre installation et de vos préférences.',
      },
      {
        q: 'Quelle longueur de bûches choisir ?',
        a: 'Mesurez l'intérieur de votre foyer ou poêle. Pour un foyer standard, les bûches de 33 cm conviennent. Les grands foyers peuvent accueillir des bûches de 50 cm. Prévoyez toujours 5 à 10 cm de moins que la taille de votre foyer.',
      },
      {
        q: 'Quel est le taux d'humidité du bois ?',
        a: 'Notre bois est séché naturellement pendant 18 à 24 mois. Le taux d'humidité est inférieur à 20%, ce qui garantit une combustion optimale et un bon rendement énergétique.',
      },
      {
        q: 'Quelle quantité commander ?',
        a: 'Pour un usage principal, comptez environ 8 à 12 stères par hiver. Pour un chauffage d'appoint, 3 à 5 stères suffisent généralement. Votre consommation dépend de la surface à chauffer et de l'isolation de votre habitation.',
      },
    ],
  },
  {
    category: 'Commande et livraison',
    questions: [
      {
        q: 'Comment passer commande ?',
        a: 'Choisissez vos produits dans la boutique, ajoutez-les au panier, puis suivez les étapes de commande. Le paiement est sécurisé et vous recevez une confirmation immédiate par email.',
      },
      {
        q: 'Quels sont les délais de livraison ?',
        a: 'Comptez généralement entre 5 et 10 jours entre votre commande et la livraison effective. Nous vous contactons par téléphone pour organiser un créneau qui vous convient.',
      },
      {
        q: 'La livraison est-elle incluse ?',
        a: 'Les frais de livraison sont calculés selon votre localisation et affichés avant validation de votre commande. Le déchargement est toujours inclus.',
      },
      {
        q: 'Livrez-vous partout en France ?',
        a: 'Oui, nous livrons partout en France métropolitaine. Les délais peuvent varier selon votre zone géographique.',
      },
      {
        q: 'Où le bois sera-t-il déchargé ?',
        a: 'Lors de l'organisation de la livraison, vous indiquez l'emplacement souhaité (garage, abri de jardin, allée, etc.). Le chauffeur décharge le bois à cet endroit.',
      },
    ],
  },
  {
    category: 'Stockage et utilisation',
    questions: [
      {
        q: 'Comment stocker le bois correctement ?',
        a: 'Stockez votre bois dans un endroit sec, aéré et à l'abri de la pluie. Un abri ouvert sur les côtés est idéal. Évitez le contact direct avec le sol en utilisant des palettes ou des supports.',
      },
      {
        q: 'Combien de temps puis-je conserver le bois ?',
        a: 'Correctement stocké, le bois peut se conserver plusieurs années. Veillez simplement à le protéger de l'humidité et à maintenir une bonne ventilation.',
      },
      {
        q: 'Le bois est-il prêt à brûler à la réception ?',
        a: 'Oui, notre bois est séché et prêt à l'emploi immédiatement. Vous pouvez l'utiliser dès la livraison.',
      },
    ],
  },
  {
    category: 'Paiement et facturation',
    questions: [
      {
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express) via notre système de paiement sécurisé Stripe.',
      },
      {
        q: 'Puis-je avoir une facture ?',
        a: 'Oui, une facture est automatiquement générée et envoyée par email après votre commande. Vous pouvez également la retrouver dans votre espace client.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null)

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === key ? null : key)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="bg-white border-b border-hairline">
          <div className="container-custom py-64">
            <h1 className="text-heading-lg md:text-display font-semibold text-charcoal mb-20 tracking-tight">
              Questions fréquentes
            </h1>
            <p className="text-body-lg text-smoke max-w-[700px]">
              Trouvez rapidement les réponses aux questions les plus courantes sur nos produits et services.
            </p>
          </div>
        </div>

        <section className="py-120">
          <div className="container-custom max-w-[900px]">
            <div className="space-y-48">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-heading font-semibold text-charcoal mb-24">
                    {category.category}
                  </h2>
                  <div className="space-y-16">
                    {category.questions.map((item, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`
                      const isOpen = openIndex === key

                      return (
                        <div
                          key={questionIndex}
                          className="bg-white rounded-card border border-hairline overflow-hidden"
                        >
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full px-24 py-20 flex items-center justify-between text-left hover:bg-mist/50 transition-colors"
                          >
                            <span className="text-body font-semibold text-charcoal pr-16">
                              {item.q}
                            </span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className={`flex-shrink-0 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            >
                              <path d="M5 7.5l5 5 5-5" />
                            </svg>
                          </button>
                          {isOpen && (
                            <div className="px-24 pb-24">
                              <p className="text-body text-smoke leading-relaxed">{item.a}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-64 pt-64 border-t border-hairline bg-white rounded-card border p-32 text-center">
              <h2 className="text-heading-sm font-semibold text-charcoal mb-16">
                Vous ne trouvez pas votre réponse ?
              </h2>
              <p className="text-body text-smoke mb-24">
                Notre équipe est là pour vous aider. Contactez-nous directement.
              </p>
              <a
                href="mailto:contact@leboisdirect.fr"
                className="inline-flex items-center gap-12 px-32 py-12 bg-charcoal text-white rounded-pill hover:bg-charcoal/90 transition-colors font-medium"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
