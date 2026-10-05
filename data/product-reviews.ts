export type ProductReview = {
  rating?: number
  author?: string
  date?: string
  text?: string
  label: string
}

type ReviewEntry = ProductReview & { matches: string[] }

const entries: ReviewEntry[] = [
  { matches: ['wohl und warm'], text: 'Très satisfait des granulés et du service. La livraison s’est bien déroulée et la qualité est au rendez-vous.', label: 'Avis client externe' },
  { matches: ['bronpi karen'], rating: 5, author: 'Marc', date: '14/07/2026', text: 'Très satisfait. Service rapide et envoi soigné.', label: 'Avis client externe' },
  { matches: ['purline', 'cheminée électrique'], rating: 5, author: 'Avis client', text: 'Très jolie, chauffe bien et apporte une vraie ambiance décorative.', label: 'Avis client externe' },
  { matches: ['planika faro'], rating: 5, author: 'Yann', date: '15/12/2025', text: 'Excellente chauffe.', label: 'Avis externe vérifié' },
  { matches: ['invicta p947044'], rating: 1, author: 'Retour client', text: 'L’insert s’est fendu après peu d’utilisation et la prise en charge de la garantie a été difficile.', label: 'Avis client externe' },
  { matches: ['ofyr pizza oven'], rating: 5, author: 'Jan Verbeeck', label: 'Avis externe vérifié' },
  { matches: ['ofyr fire guard ring'], rating: 4.25, author: 'A. Rieck', date: '15/12/2021', text: 'Très bel accessoire. Il protège autour de la plaque et offre aussi un espace pratique pour poser les ustensiles et servir de petits plats.', label: 'Avis externe vérifié' },
  { matches: ['scheppach compact 10t'], rating: 5, author: 'Thierry', text: 'Produit simple à utiliser, robuste et de qualité.', label: 'Avis externe vérifié' },
  { matches: ['sauter hekla'], rating: 5, author: 'Cédric', date: '28/07/2026', text: 'Radiateur très esthétique, facile à utiliser et économique. Très satisfait pour le moment.', label: 'Achat vérifié' },
  { matches: ['sauter ipala'], rating: 5, author: 'Pascal', text: 'Chaleur douce, thermostat précis et pilotage à distance très pratique depuis le smartphone.', label: 'Avis externe vérifié' },
]

export function getProductReviews(name: string): ProductReview[] {
  const normalized = name.toLocaleLowerCase('fr-FR')
  return entries.filter((entry) => entry.matches.some((match) => normalized.includes(match))).map(({ matches: _matches, ...review }) => review)
}
