export type ProductCategory = 'buches' | 'bois-compresse' | 'granules' | 'allumage' | 'allume-feu' | 'accessoires-chauffage' | 'machines-agricoles' | (string & {})

export type WoodSpecies = 'chene' | 'hetre' | 'charme' | 'mixte'

export type ProductVariant = {
  id: string
  length?: number // in cm
  volume?: number // in steri
  weight?: number // in kg
  price: number
  stock: number
  label?: string
}

export type Product = {
  id: string
  slug: string
  featured?: boolean
  name: string
  category: ProductCategory
  species?: WoodSpecies
  description: string
  longDescription?: string
  features: string[]
  price: number
  image: string
  images: string[]
  variants?: ProductVariant[]
  humidity?: string
  calorificValue?: string
  origin?: string
  conditioning?: string
  deliveryInfo: string
  translations?: {
    de?: string
    it?: string
    description?: { de?: string; it?: string }
    conditioning?: { de?: string; it?: string }
    delivery?: { de?: string; it?: string }
  }
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'buches-chene-33cm',
    name: 'Ceppi di Quercia 33 cm',
    category: 'buches',
    species: 'chene',
    description: 'Ceppi di quercia di qualità premium essiccati naturalmente. Ideali per un riscaldamento performante e duraturo.',
    features: [
      'Essiccazione 18-24 mesi',
      'Umidità < 20%',
      'Alto potere calorifico',
      'Lunga durata di combustione',
    ],
    price: 89,
    image: '/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg',
    images: [
      '/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg',
      '/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg',
    ],
    humidity: '< 20%',
    calorificValue: '4,2 kWh/kg',
    origin: 'Europa',
    conditioning: 'Bancale da 1 stero',
    deliveryInfo: 'Consegna in 5–7 giorni lavorativi',
    variants: [
      { id: 'v1', volume: 1, price: 89, stock: 50 },
      { id: 'v2', volume: 2, price: 169, stock: 30 },
      { id: 'v3', volume: 3, price: 239, stock: 20 },
    ],
  },
  {
    id: '2',
    slug: 'buches-hetre-33cm',
    name: 'Ceppi di Faggio 33 cm',
    category: 'buches',
    species: 'hetre',
    description: 'Ceppi di faggio premium riconosciuti per l’ottima combustione e il calore costante.',
    features: [
      'Fiamma viva e regolare',
      'Pochi residui',
      'Ottimo rapporto qualità-prezzo',
      'Essiccazione ottimale',
    ],
    price: 85,
    image: '/images/view-fireplace-with-burning-logs-natural-fur-skin-floor-holder-with-logs-cozy-room.jpg',
    images: [
      '/images/view-fireplace-with-burning-logs-natural-fur-skin-floor-holder-with-logs-cozy-room.jpg',
    ],
    humidity: '< 20%',
    calorificValue: '4,0 kWh/kg',
    origin: 'Europa',
    conditioning: 'Bancale da 1 stero',
    deliveryInfo: 'Consegna in 5–7 giorni lavorativi',
    variants: [
      { id: 'v1', volume: 1, price: 85, stock: 40 },
      { id: 'v2', volume: 2, price: 159, stock: 25 },
      { id: 'v3', volume: 3, price: 229, stock: 15 },
    ],
  },
  {
    id: '3',
    slug: 'buches-chene-50cm',
    name: 'Ceppi di Quercia 50 cm',
    category: 'buches',
    species: 'chene',
    description: 'Grandi ceppi di quercia per camini e stufe ad ampia capacità.',
    features: [
      'Formato 50 cm',
      'Ideale per grandi focolari',
      'Combustione di lunga durata',
      'Rendimento ottimale',
    ],
    price: 95,
    image: '/images/fireplace-with-woods-modern-wooden-house.jpg',
    images: ['/images/fireplace-with-woods-modern-wooden-house.jpg'],
    humidity: '< 20%',
    calorificValue: '4,2 kWh/kg',
    origin: 'Europa',
    conditioning: 'Bancale da 1 stero',
    deliveryInfo: 'Consegna in 5–7 giorni lavorativi',
    variants: [
      { id: 'v1', volume: 1, price: 95, stock: 35 },
      { id: 'v2', volume: 2, price: 179, stock: 20 },
    ],
  },
  {
    id: '4',
    slug: 'buches-charme-33cm',
    name: 'Ceppi di Carpino 33 cm',
    category: 'buches',
    species: 'charme',
    description: 'Il carpino offre una combustione pulita con belle fiamme ed elevato potere calorifico.',
    features: [
      'Fiamme chiare',
      'Calore intenso',
      'Pochissimo fumo',
      'Braci durature',
    ],
    price: 92,
    image: '/images/scandinavian-interior-with-fireplace-stump-table-pile-logs-fire.jpg',
    images: ['/images/scandinavian-interior-with-fireplace-stump-table-pile-logs-fire.jpg'],
    humidity: '< 20%',
    calorificValue: '4,1 kWh/kg',
    origin: 'Europa',
    conditioning: 'Bancale da 1 stero',
    deliveryInfo: 'Consegna in 5–7 giorni lavorativi',
    variants: [
      { id: 'v1', volume: 1, price: 92, stock: 30 },
      { id: 'v2', volume: 2, price: 175, stock: 18 },
    ],
  },
  {
    id: '5',
    slug: 'bois-compresse-jour-nuit',
    name: 'Tronchetti Compressi Giorno & Notte',
    category: 'bois-compresse',
    description: 'Tronchetti compressi ad alte prestazioni per un riscaldamento regolare ed economico.',
    features: [
      'Combustione 2-3h (giorno)',
      'Umidità < 10%',
      'Senza additivi chimici',
      'Puliti e pratici',
    ],
    price: 129,
    image: '/images/man-warming-fireplace-energy-crisis.jpg',
    images: ['/images/man-warming-fireplace-energy-crisis.jpg'],
    humidity: '< 10%',
    calorificValue: '5,0 kWh/kg',
    origin: 'Europa',
    conditioning: 'Bancale da 96 tronchetti (10 kg)',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
  },
  {
    id: '6',
    slug: 'granules-premium',
    name: 'Pellet Premium DIN+',
    category: 'granules',
    description: 'Pellet certificato DIN+ per stufe e caldaie. Qualità superiore garantita.',
    features: [
      'Certificazione DIN+',
      'Basso residuo di ceneri',
      'Alto potere calorifico',
      '100% resinoso',
    ],
    price: 379,
    image: '/images/man-room-with-solid-fuel-boiler-working-biofuel-economical-heating.jpg',
    images: ['/images/man-room-with-solid-fuel-boiler-working-biofuel-economical-heating.jpg'],
    humidity: '< 10%',
    calorificValue: '4,9 kWh/kg',
    origin: 'Europa',
    conditioning: 'Bancale da 1 tonnellata (66 sacchi da 15 kg)',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
  },
  {
    id: '7',
    slug: 'bois-allumage-caisse',
    name: 'Legna da Accensione in Cassetta',
    category: 'allumage',
    description: 'Legnetti secchi selezionati per facilitare l’accensione del fuoco.',
    features: [
      'Legno resinoso secco',
      'Pronto all’uso',
      'Confezione pratica',
      'Accensione rapida',
    ],
    price: 29,
    image: '/images/person-warming-up-feet-fire.jpg',
    images: ['/images/person-warming-up-feet-fire.jpg'],
    humidity: '< 15%',
    origin: 'Europa',
    conditioning: 'Cassetta da 40 litri',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
  },
  {
    id: '8',
    slug: 'allume-feu-naturel',
    name: 'Accendifuoco Naturale',
    category: 'allume-feu',
    description: 'Accendifuoco ecologico in lana di legno e cera naturale.',
    features: [
      '100% naturale',
      'Lunga durata di combustione',
      'Inodore',
      'Ecologico',
    ],
    price: 12,
    image: '/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg',
    images: ['/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg'],
    origin: 'Europa',
    conditioning: 'Scatola da 32 pezzi',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
  },
]

export const categories = [
  { id: 'buches', name: 'Legna da ardere', slug: 'buches' },
  { id: 'bois-compresse', name: 'Tronchetti compressi', slug: 'bois-compresse' },
  { id: 'granules', name: 'Pellet', slug: 'granules' },
  { id: 'allumage', name: 'Legna da accensione', slug: 'allumage' },
  { id: 'allume-feu', name: 'Accendifuoco', slug: 'allume-feu' },
  { id: 'accessoires-chauffage', name: 'Accessori per il riscaldamento', slug: 'accessoires-chauffage' },
  { id: 'machines-agricoles', name: 'Macchine agricole', slug: 'machines-agricoles' },
]
