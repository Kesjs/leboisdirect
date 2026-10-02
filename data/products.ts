export type ProductCategory = 'buches' | 'bois-compresse' | 'granules' | 'allumage' | 'allume-feu' | 'accessoires-chauffage' | 'machines-agricoles'

export type WoodSpecies = 'chene' | 'hetre' | 'charme' | 'mixte'

export type ProductVariant = {
  id: string
  length?: number // en cm
  volume?: number // en stères
  weight?: number // en kg
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
    name: 'Bûches de Chêne 33 cm',
    category: 'buches',
    species: 'chene',
    description: 'Bûches de chêne de qualité premium, séchées naturellement. Idéales pour un chauffage performant et durable.',
    features: [
      'Séchage naturel 18-24 mois',
      'Taux d\'humidité < 20%',
      'Haut pouvoir calorifique',
      'Longue durée de combustion',
    ],
    price: 89,
    image: '/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg',
    images: [
      '/images/decorative-metallic-holder-with-heap-wooden-logs-stony-fireplace-with-burning-logs.jpg',
      '/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg',
    ],
    humidity: '< 20%',
    calorificValue: '4,2 kWh/kg',
    origin: 'France',
    conditioning: 'Palette de 1 stère',
    deliveryInfo: 'Livraison sous 5-7 jours',
    variants: [
      { id: 'v1', volume: 1, price: 89, stock: 50 },
      { id: 'v2', volume: 2, price: 169, stock: 30 },
      { id: 'v3', volume: 3, price: 239, stock: 20 },
    ],
  },
  {
    id: '2',
    slug: 'buches-hetre-33cm',
    name: 'Bûches de Hêtre 33 cm',
    category: 'buches',
    species: 'hetre',
    description: 'Bûches de hêtre premium, reconnues pour leur excellente combustion et leur chaleur constante.',
    features: [
      'Flamme vive et régulière',
      'Peu de résidus',
      'Excellent rapport qualité-prix',
      'Séchage optimal',
    ],
    price: 85,
    image: '/images/view-fireplace-with-burning-logs-natural-fur-skin-floor-holder-with-logs-cozy-room.jpg',
    images: [
      '/images/view-fireplace-with-burning-logs-natural-fur-skin-floor-holder-with-logs-cozy-room.jpg',
    ],
    humidity: '< 20%',
    calorificValue: '4,0 kWh/kg',
    origin: 'France',
    conditioning: 'Palette de 1 stère',
    deliveryInfo: 'Livraison sous 5-7 jours',
    variants: [
      { id: 'v1', volume: 1, price: 85, stock: 40 },
      { id: 'v2', volume: 2, price: 159, stock: 25 },
      { id: 'v3', volume: 3, price: 229, stock: 15 },
    ],
  },
  {
    id: '3',
    slug: 'buches-chene-50cm',
    name: 'Bûches de Chêne 50 cm',
    category: 'buches',
    species: 'chene',
    description: 'Grandes bûches de chêne pour foyers et poêles de grande capacité.',
    features: [
      'Format 50 cm',
      'Idéal grands foyers',
      'Combustion longue durée',
      'Rendement optimal',
    ],
    price: 95,
    image: '/images/fireplace-with-woods-modern-wooden-house.jpg',
    images: ['/images/fireplace-with-woods-modern-wooden-house.jpg'],
    humidity: '< 20%',
    calorificValue: '4,2 kWh/kg',
    origin: 'France',
    conditioning: 'Palette de 1 stère',
    deliveryInfo: 'Livraison sous 5-7 jours',
    variants: [
      { id: 'v1', volume: 1, price: 95, stock: 35 },
      { id: 'v2', volume: 2, price: 179, stock: 20 },
    ],
  },
  {
    id: '4',
    slug: 'buches-charme-33cm',
    name: 'Bûches de Charme 33 cm',
    category: 'buches',
    species: 'charme',
    description: 'Le charme offre une combustion propre avec de belles flammes. Excellent choix pour l\'hiver.',
    features: [
      'Flammes claires',
      'Chaleur intense',
      'Peu de fumée',
      'Braises durables',
    ],
    price: 92,
    image: '/images/scandinavian-interior-with-fireplace-stump-table-pile-logs-fire.jpg',
    images: ['/images/scandinavian-interior-with-fireplace-stump-table-pile-logs-fire.jpg'],
    humidity: '< 20%',
    calorificValue: '4,1 kWh/kg',
    origin: 'France',
    conditioning: 'Palette de 1 stère',
    deliveryInfo: 'Livraison sous 5-7 jours',
    variants: [
      { id: 'v1', volume: 1, price: 92, stock: 30 },
      { id: 'v2', volume: 2, price: 175, stock: 18 },
    ],
  },
  {
    id: '5',
    slug: 'bois-compresse-jour-nuit',
    name: 'Bois Compressé Jour & Nuit',
    category: 'bois-compresse',
    description: 'Bûches compressées haute performance pour un chauffage régulier et économique.',
    features: [
      'Combustion 2-3h (jour)',
      'Taux d\'humidité < 10%',
      'Aucun additif chimique',
      'Propre et pratique',
    ],
    price: 129,
    image: '/images/man-warming-fireplace-energy-crisis.jpg',
    images: ['/images/man-warming-fireplace-energy-crisis.jpg'],
    humidity: '< 10%',
    calorificValue: '5,0 kWh/kg',
    origin: 'France',
    conditioning: 'Palette de 96 bûches (10 kg)',
    deliveryInfo: 'Livraison sous 3-5 jours',
  },
  {
    id: '6',
    slug: 'granules-premium',
    name: 'Granulés Premium DIN+',
    category: 'granules',
    description: 'Granulés certifiés DIN+ pour poêles et chaudières. Qualité supérieure garantie.',
    features: [
      'Certification DIN+',
      'Faible taux de cendres',
      'Haut pouvoir calorifique',
      '100% résineux',
    ],
    price: 379,
    image: '/images/man-room-with-solid-fuel-boiler-working-biofuel-economical-heating.jpg',
    images: ['/images/man-room-with-solid-fuel-boiler-working-biofuel-economical-heating.jpg'],
    humidity: '< 10%',
    calorificValue: '4,9 kWh/kg',
    origin: 'France',
    conditioning: 'Palette de 1 tonne (66 sacs de 15 kg)',
    deliveryInfo: 'Livraison sous 7-10 jours',
  },
  {
    id: '7',
    slug: 'bois-allumage-caisse',
    name: 'Bois d\'Allumage en Caisse',
    category: 'allumage',
    description: 'Petit bois sec pour faciliter l\'allumage de votre feu.',
    features: [
      'Bois résineux sec',
      'Prêt à l\'emploi',
      'Conditionnement pratique',
      'Allumage rapide',
    ],
    price: 29,
    image: '/images/person-warming-up-feet-fire.jpg',
    images: ['/images/person-warming-up-feet-fire.jpg'],
    humidity: '< 15%',
    origin: 'France',
    conditioning: 'Caisse de 40 litres',
    deliveryInfo: 'Livraison sous 3-5 jours',
  },
  {
    id: '8',
    slug: 'allume-feu-naturel',
    name: 'Allume-feu Naturel',
    category: 'allume-feu',
    description: 'Allume-feu écologique en laine de bois et cire naturelle.',
    features: [
      '100% naturel',
      'Longue durée de combustion',
      'Sans odeur',
      'Écologique',
    ],
    price: 12,
    image: '/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg',
    images: ['/images/fireplace-with-burning-logs-close-up-stony-fireplace-with-burning-smoldering-logs-fire.jpg'],
    origin: 'France',
    conditioning: 'Boîte de 32 unités',
    deliveryInfo: 'Livraison sous 3-5 jours',
  },
]

export const categories = [
  { id: 'buches', name: 'Bûches', slug: 'buches' },
  { id: 'bois-compresse', name: 'Bois compressé', slug: 'bois-compresse' },
  { id: 'granules', name: 'Granulés', slug: 'granules' },
  { id: 'allumage', name: 'Bois d\'allumage', slug: 'allumage' },
  { id: 'allume-feu', name: 'Allume-feu', slug: 'allume-feu' },
  { id: 'accessoires-chauffage', name: 'Accessoires chauffage', slug: 'accessoires-chauffage' },
  { id: 'machines-agricoles', name: 'Machines agricoles', slug: 'machines-agricoles' },
]
