export type ProductReview = {
  rating?: number
  author?: string
  date?: string
  text?: string
  label: string
}

type ReviewEntry = ProductReview & { matches: string[] }

const entries: ReviewEntry[] = [
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Julien M.', text: 'Très beau chauffage, il rend vraiment bien sur notre terrasse. La chaleur est agréable le soir et le design est encore plus réussi en vrai.', label: 'Avis de démonstration' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Sophie R.', text: 'Installation assez simple et résultat très élégant. Nous l’utilisons surtout lors des soirées fraîches sur la terrasse.', label: 'Avis de démonstration' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Marc D.', text: 'Produit bien fini et beaucoup moins encombrant que je l’imaginais. Très satisfait de l’achat.', label: 'Avis de démonstration' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Laurent P.', text: 'Le format panoramique donne vraiment du caractère au salon. Très belle finition et superbe vue sur le feu.', label: 'Avis de démonstration' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Émilie B.', text: 'Nous cherchions un foyer moderne sans avoir quelque chose de trop massif. Celui-ci correspond parfaitement.', label: 'Avis de démonstration' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Thomas G.', text: 'Très beau rendu une fois installé. C’est clairement devenu l’élément central de la pièce.', label: 'Avis de démonstration' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Nicolas V.', text: 'Très convivial pour cuisiner dehors. La grande surface permet de préparer plusieurs choses en même temps.', label: 'Avis de démonstration' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Claire T.', text: 'L’acier corten est vraiment joli dans le jardin. Après plusieurs utilisations, nous sommes très contents du brasero.', label: 'Avis de démonstration' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Antoine L.', text: 'On l’a utilisé tout l’été avec des amis. Cuisson simple et ambiance autour du feu vraiment sympa.', label: 'Avis de démonstration' },
  { matches: ['buches-densifiees-premium-palette-1000-kg'], rating: 5, author: 'Michel C.', text: 'Bûches bien compactes et pratiques à stocker. Elles prennent moins de place que mon ancien bois.', label: 'Avis de démonstration' },
  { matches: ['buches-densifiees-premium-palette-1000-kg'], rating: 5, author: 'Patrick F.', text: 'Bonne combustion et surtout très peu de manipulation avec la palette complète.', label: 'Avis de démonstration' },
  { matches: ['buches-densifiees-premium-palette-1000-kg'], rating: 5, author: 'Jean-Louis R.', text: 'Première commande de bûches densifiées pour moi et plutôt convaincu. Produit propre et facile à ranger.', label: 'Avis de démonstration' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Camille N.', text: 'Très pratique pour déplacer le bois jusqu’à la cheminée sans en mettre partout.', label: 'Avis de démonstration' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'François A.', text: 'Le chariot est stable et le design noir reste discret dans la maison. Exactement ce que je cherchais.', label: 'Avis de démonstration' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Isabelle M.', text: 'Beaucoup plus pratique que mes anciens paniers à bois. Je m’en sers presque tous les jours en hiver.', label: 'Avis de démonstration' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Alexandre P.', text: 'Bonne addition à notre installation. L’ensemble paraît plus sécurisé lorsque les enfants sont dans le jardin.', label: 'Avis de démonstration' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Mathieu S.', text: 'Très belle finition et l’anneau s’intègre parfaitement au reste de notre équipement.', label: 'Avis de démonstration' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Caroline V.', text: 'Accessoire simple mais vraiment utile autour du foyer. Satisfait de la qualité.', label: 'Avis de démonstration' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg'], rating: 5, author: 'Olivier D.', text: 'Palette arrivée bien conditionnée et sacs faciles à stocker. Les granulés sont propres et réguliers.', label: 'Avis de démonstration' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg'], rating: 5, author: 'Stéphane R.', text: 'Nous avons pris la palette pour éviter de racheter des sacs toutes les semaines. Beaucoup plus pratique pour l’hiver.', label: 'Avis de démonstration' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg'], rating: 5, author: 'David L.', text: 'Bon conditionnement et très peu de poussière dans les sacs que j’ai ouverts jusqu’ici.', label: 'Avis de démonstration' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Philippe G.', text: 'Je les utilise en complément de mes bûches classiques. Très pratique pour éviter de remettre du bois trop souvent le soir.', label: 'Avis de démonstration' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Nathalie B.', text: 'Les bûches sont faciles à ranger et le conditionnement est propre. Bonne expérience pour cette première commande.', label: 'Avis de démonstration' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Gérard T.', text: 'Produit intéressant pour les longues soirées d’hiver. Je vais probablement en reprendre la saison prochaine.', label: 'Avis de démonstration' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Benoît F.', text: 'Enfin tout mon bois est regroupé et protégé au même endroit. L’abri est aussi plutôt joli dans le jardin.', label: 'Avis de démonstration' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Aurélie C.', text: 'Montage fait tranquillement pendant le week-end. Une fois installé, l’ensemble est solide et spacieux.', label: 'Avis de démonstration' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Pierre M.', text: 'Très pratique pour organiser notre réserve de bois. Ça change complètement le coin stockage derrière la maison.', label: 'Avis de démonstration' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm'], rating: 5, author: 'Christian D.', text: 'Bois reçu bien rangé et les morceaux de 33 cm sont pratiques pour notre poêle.', label: 'Avis de démonstration' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm'], rating: 5, author: 'Alain R.', text: 'Mélange chêne, charme et hêtre qui correspond exactement à ce que je recherchais pour l’hiver.', label: 'Avis de démonstration' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm'], rating: 5, author: 'Marie P.', text: 'Première commande en ligne de bois pour moi. Le format deux stères est pratique et le bois semble de bonne qualité.', label: 'Avis de démonstration' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Rémi B.', text: 'Installé dans une chambre et très satisfait pour le moment. Chauffe agréablement et reste discret.', label: 'Avis de démonstration' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Céline A.', text: 'J’apprécie surtout de pouvoir mieux gérer le chauffage sans devoir constamment toucher au radiateur.', label: 'Avis de démonstration' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Jérôme V.', text: 'Design sobre, fonctionnement simple et bonne sensation de confort dans la pièce.', label: 'Avis de démonstration' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Sébastien L.', text: 'Nous l’avons installé dans notre bureau. La montée en température est agréable et le radiateur est très discret.', label: 'Avis de démonstration' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Laura F.', text: 'Bon produit, facile à utiliser au quotidien. Le design passe bien dans une pièce moderne.', label: 'Avis de démonstration' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Vincent M.', text: 'Remplace un vieux radiateur beaucoup moins pratique. Pour l’instant, rien à redire.', label: 'Avis de démonstration' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Damien R.', text: 'Très content du poêle. La programmation est vraiment pratique pour retrouver une pièce agréable en rentrant.', label: 'Avis de démonstration' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Sandrine P.', text: 'Format compact et joli rendu dans notre séjour. Il ne prend pas autant de place que je le craignais.', label: 'Avis de démonstration' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Éric N.', text: 'Nous voulions passer aux granulés sans installer un appareil énorme. Celui-ci correspond très bien à notre besoin.', label: 'Avis de démonstration' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Maxime C.', text: 'Très agréable à utiliser et la céramique conserve vraiment bien la chaleur. On commence à tester différentes cuissons.', label: 'Avis de démonstration' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Romain T.', text: 'Le format XL est idéal lorsqu’on reçoit du monde. Très belle pièce dans la cuisine extérieure.', label: 'Avis de démonstration' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Fabien G.', text: 'J’avais longtemps hésité avant de passer au kamado. Aucun regret, surtout pour les cuissons lentes.', label: 'Avis de démonstration' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Hugo D.', text: 'Accessoire original qui permet de changer complètement la façon de cuisiner sur notre OFYR.', label: 'Avis de démonstration' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Valérie M.', text: 'Très sympa quand on reçoit des amis. La cuisson devient presque une partie du spectacle.', label: 'Avis de démonstration' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Christophe B.', text: 'Bonne finition et installation assez intuitive. Un accessoire que nous utilisons finalement plus souvent que prévu.', label: 'Avis de démonstration' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Bernard P.', text: 'L’insert donne un très beau rendu à notre ancienne cheminée. La différence dans le salon est impressionnante.', label: 'Avis de démonstration' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Thierry A.', text: 'Nous voulions conserver le charme du feu de bois tout en modernisant l’installation. Très contents du résultat.', label: 'Avis de démonstration' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Monique L.', text: 'Appareil robuste et belle vision des flammes. Une fois installé, il s’intègre très bien dans la cheminée.', label: 'Avis de démonstration' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Pascal V.', text: 'Très joli poêle en fonte. Il correspond parfaitement au style de notre maison sans faire trop rustique.', label: 'Avis de démonstration' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Catherine F.', text: 'Nous l’utilisons régulièrement depuis son installation et le confort dans le séjour est très agréable.', label: 'Avis de démonstration' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Daniel R.', text: 'Belle qualité de fabrication et appareil rassurant une fois en place. Satisfait de notre choix.', label: 'Avis de démonstration' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Manon C.', text: 'Très jolie dans le salon et surtout beaucoup plus simple pour nous qu’une vraie cheminée.', label: 'Avis de démonstration' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Lucas B.', text: 'L’effet visuel crée une ambiance vraiment agréable le soir. C’était principalement ce que je recherchais.', label: 'Avis de démonstration' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Julie T.', text: 'Design noir sobre et moderne. Elle s’intègre très bien avec notre meuble TV.', label: 'Avis de démonstration' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Arthur M.', text: 'Très beau meuble de rangement. Le bois fait maintenant partie de l’aménagement de la terrasse au lieu d’être caché.', label: 'Avis de démonstration' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Élodie P.', text: 'Solide, pratique et parfaitement assorti à notre installation extérieure.', label: 'Avis de démonstration' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Guillaume R.', text: 'On peut stocker une bonne quantité de bûches tout en gardant l’espace propre et organisé.', label: 'Avis de démonstration' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Benjamin L.', text: 'Les soirées pizza ont clairement changé depuis qu’on l’a. Très convivial et vraiment agréable à utiliser dehors.', label: 'Avis de démonstration' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Anaïs D.', text: 'Après quelques essais pour prendre le coup de main, les pizzas sont très réussies.', label: 'Avis de démonstration' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Mathieu C.', text: 'Très bon complément à notre espace de cuisson extérieur. Les enfants adorent les soirées pizza maison.', label: 'Avis de démonstration' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Didier M.', text: 'Gros gain de temps par rapport au fendage manuel. Très utile quand on prépare beaucoup de bois pour l’hiver.', label: 'Avis de démonstration' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Jean P.', text: 'Machine stable et pratique pour notre utilisation à la maison. Je regrette surtout de ne pas l’avoir achetée plus tôt.', label: 'Avis de démonstration' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Franck B.', text: 'Utilisé pour préparer ma réserve de bois, le travail est beaucoup moins fatigant qu’avant.', label: 'Avis de démonstration' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Adrien G.', text: 'Installé sur notre terrasse couverte. Très pratique lorsqu’il commence à faire frais en soirée.', label: 'Avis de démonstration' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Pauline R.', text: 'J’aime beaucoup le fait que le chauffage reste discret et ne prenne aucune place au sol.', label: 'Avis de démonstration' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Xavier N.', text: 'Nous l’utilisons surtout à l’automne pour prolonger les repas dehors. Très satisfait jusqu’à présent.', label: 'Avis de démonstration' },
]

export const productReviewsData = entries

export function getProductReviews(slug: string, options: { preview?: boolean } = {}): ProductReview[] {
  return entries
    .filter((entry) => entry.matches.includes(slug))
    .map(({ matches: _matches, ...review }) => review)
}
