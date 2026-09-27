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
        a: "Le chêne offre une combustion longue et un excellent pouvoir calorifique. Le hêtre brûle avec de belles flammes et peu de résidus. Le charme produit une chaleur intense avec des braises durables. Tout dépend de votre installation et de vos préférences.",
      },
      {
        q: 'Quelle longueur de bûches choisir ?',
        a: "Mesurez l'intérieur de votre foyer ou poêle. Pour un foyer standard, les bûches de 33 cm conviennent. Les grands foyers peuvent accueillir des bûches de 50 cm. Prévoyez toujours 5 à 10 cm de moins que la taille de votre foyer.",
      },
      {
        q: "Quel est le taux d'humidité du bois ?",
        a: "Notre bois est séché naturellement pendant 18 à 24 mois. Le taux d'humidité est inférieur à 20%, ce qui garantit une combustion optimale et un bon rendement énergétique.",
      },
      {
        q: 'Quelle quantité commander ?',
        a: "Pour un usage principal, comptez environ 8 à 12 stères par hiver. Pour un chauffage d'appoint, 3 à 5 stères suffisent généralement. Votre consommation dépend de la surface à chauffer et de l'isolation de votre habitation.",
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
        a: "Lors de l'organisation de la livraison, vous indiquez l'emplacement souhaité (garage, abri de jardin, allée, etc.). Le chauffeur décharge le bois à cet endroit.",
      },
    ],
  },
  {
    category: 'Stockage et utilisation',
    questions: [
      {
        q: 'Comment stocker le bois correctement ?',
        a: "Stockez votre bois dans un endroit sec, aéré et à l'abri de la pluie. Un abri ouvert sur les côtés est idéal. Évitez le contact direct avec le sol en utilisant des palettes ou des supports.",
      },
      {
        q: 'Combien de temps puis-je conserver le bois ?',
        a: "Correctement stocké, le bois peut se conserver plusieurs années. Veillez simplement à le protéger de l'humidité et à maintenir une bonne ventilation.",
      },
      {
        q: 'Le bois est-il prêt à brûler à la réception ?',
        a: "Oui, notre bois est séché et prêt à l'emploi immédiatement. Vous pouvez l'utiliser dès la livraison.",
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
        <section className="border-b border-hairline bg-white px-20 py-80 sm:px-32 sm:py-120">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-pill border border-braise/20 bg-braise/10 px-16 py-8 text-body-sm font-semibold uppercase tracking-[0.16em] text-braise">
              FAQ
            </span>
            <h1 className="mt-24 text-heading-lg font-semibold tracking-tight text-charcoal md:text-display">
              Les réponses à vos questions
            </h1>
            <p className="mx-auto mt-20 max-w-2xl text-body-lg leading-relaxed text-smoke">
              Tout ce qu’il faut savoir sur nos bois, la commande, la livraison et le stockage.
            </p>
          </div>
        </section>

        <section className="px-20 py-80 sm:px-32 sm:py-120">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-64">
              {faqs.map((category, categoryIndex) => (
                <section key={category.category} aria-labelledby={`faq-${categoryIndex}`}>
                  <h2 id={`faq-${categoryIndex}`} className="mb-20 text-heading font-semibold text-charcoal">
                    {category.category}
                  </h2>
                  <div className="divide-y divide-hairline border-y border-hairline">
                    {category.questions.map((item, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`
                      const isOpen = openIndex === key

                      return (
                        <div key={item.q}>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`answer-${key}`}
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="group flex w-full items-center justify-between gap-20 py-24 text-left transition-colors hover:text-braise focus:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-inset"
                          >
                            <span className="text-body font-semibold text-charcoal group-hover:text-braise">
                              {item.q}
                            </span>
                            <span aria-hidden="true" className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full border border-hairline text-heading-sm font-normal text-braise transition-transform duration-200 group-hover:border-braise">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          <div id={`answer-${key}`} hidden={!isOpen} className="pb-24 pr-48">
                            <p className="text-body leading-relaxed text-smoke">{item.a}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-80 flex flex-col items-start justify-between gap-24 rounded-card border border-dashed border-braise/40 bg-white p-24 sm:flex-row sm:items-center sm:p-32">
              <div>
                <h2 className="text-heading-sm font-semibold text-charcoal">Une autre question ?</h2>
                <p className="mt-8 text-body-sm text-smoke">Notre équipe vous répond avec plaisir.</p>
              </div>
              <a href="mailto:contact@leboisdirect.fr" className="inline-flex shrink-0 items-center rounded-pill bg-charcoal px-24 py-12 text-body-sm font-medium text-white transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2">
                Nous contacter <span aria-hidden="true" className="ml-8">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
