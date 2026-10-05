export type ProductReview = {
  rating?: number
  author?: string
  date?: string
  text?: string
  label: string
}

type ReviewEntry = ProductReview & { matches: string[] }

const entries: ReviewEntry[] = [
  { matches: ['granules-bois-premium-6mm-palette-990-kg'], text: 'Très satisfait des granulés et du service. La livraison s’est bien déroulée et la qualité est au rendez-vous.', label: 'Avis client externe' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Marc', date: '14/07/2026', text: 'Très satisfait. Service rapide et envoi soigné.', label: 'Avis client externe' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Avis client', text: 'Très jolie, chauffe bien et apporte une vraie ambiance décorative.', label: 'Avis client externe' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Yann', date: '15/12/2025', text: 'Excellente chauffe.', label: 'Avis externe vérifié' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 1, author: 'Retour client', text: 'L’insert s’est fendu après peu d’utilisation et la prise en charge de la garantie a été difficile.', label: 'Avis client externe' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Jan Verbeeck', label: 'Avis externe vérifié' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 4.25, author: 'A. Rieck', date: '15/12/2021', text: 'Très bel accessoire. Il protège autour de la plaque et offre aussi un espace pratique pour poser les ustensiles et servir de petits plats.', label: 'Avis externe vérifié' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Thierry', text: 'Produit simple à utiliser, robuste et de qualité.', label: 'Avis externe vérifié' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Cédric', date: '28/07/2026', text: 'Radiateur très esthétique, facile à utiliser et économique. Très satisfait pour le moment.', label: 'Avis externe vérifié' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Pascal', text: 'Chaleur douce, thermostat précis et pilotage à distance très pratique depuis le smartphone.', label: 'Avis externe vérifié' },
]

export function getProductReviews(slug: string): ProductReview[] {
  return entries.filter((entry) => entry.matches.includes(slug)).map(({ matches: _matches, ...review }) => review)
}
