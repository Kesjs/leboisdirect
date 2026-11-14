import type { Locale } from '@/lib/i18n-context'

export type HeatingGroupId = 'all' | 'combustibles' | 'appareils' | 'exterieur' | 'rangement'

export type HeatingGroupConfig = {
  id: HeatingGroupId
  label: Record<Locale, string>
  shortLabel?: Record<Locale, string>
  description?: Record<Locale, string>
  image?: string
  categories?: Set<string>
}

export const HEATING_FILTER_GROUPS: HeatingGroupConfig[] = [
  { id: 'all', label: { fr: 'Toute la sélection', de: 'Gesamte Auswahl', it: 'Tutta la selezione' } },
  {
    id: 'combustibles',
    label: { fr: 'Bûches & granulés', de: 'Brennholz & Pellets', it: 'Legna e pellet' },
    shortLabel: { fr: 'Bûches & granulés', de: 'Brennholz & Pellets', it: 'Legna & pellet' },
    description: {
      fr: 'Bûches séchées < 20 %, bois densifié & pellets',
      de: 'Getrocknetes Brennholz < 20 %, Briketts & Pellets',
      it: 'Legna essiccata < 20 %, tronchetti e pellet',
    },
    image: '/images/photorealistic-perspective-wood-logs.jpg',
    categories: new Set([
      'buches',
      'bois-compresse',
      'granules',
      'allumage',
      'allume-feu',
      'chauffage-au-bois-buches',
      'chauffage-au-bois-bois-compresse',
      'chauffage-au-bois-granules',
      'chauffage-au-bois-preparation',
    ]),
  },
  {
    id: 'appareils',
    label: { fr: 'Poêles & inserts', de: 'Öfen & Kamine', it: 'Stufe e inserti' },
    shortLabel: { fr: 'Poêles & inserts', de: 'Öfen & Kamine', it: 'Stufe & camini' },
    description: {
      fr: 'Poêles bois & granulés, foyers & radiateurs',
      de: 'Holz- & Pelletöfen, Einsätze & Heizkörper',
      it: 'Stufe a legna o pellet, focolari e radiatori',
    },
    image: '/images/products/poele-bois-fonte-bronpi-karen-8-kw-2.jpg',
    categories: new Set([
      'poeles-a-bois',
      'poeles-a-granules',
      'inserts-cheminees',
      'foyers-cheminees',
      'cheminees-electriques',
      'chauffage-electrique-interieur',
    ]),
  },
  {
    id: 'exterieur',
    label: { fr: 'Braseros & extérieur', de: 'Feuerschalen & Garten', it: 'Bracieri ed esterni' },
    shortLabel: { fr: 'Braseros & cuisine', de: 'Feuerschalen & Grill', it: 'Bracieri & esterno' },
    description: {
      fr: 'Braseros plancha, kamados, fours & chauffages',
      de: 'Feuerschalen, Kamados, Pizzaöfen & Terrassenheizer',
      it: 'Bracieri plancha, kamado, forni e stufe esterne',
    },
    image: '/images/products/ofyr-cage-100-accessoire-cuisson-2.jpg',
    categories: new Set([
      'braseros-cuisson-exterieure',
      'barbecues-cuisine-exterieure',
      'cuisine-au-feu',
      'accessoires-brasero',
      'accessoires-cuisson-exterieure',
      'chauffage-exterieur',
    ]),
  },
  {
    id: 'rangement',
    label: { fr: 'Abris, fendeuses & rangement', de: 'Holzlager & Spalter', it: 'Portalegna e spaccalegna' },
    shortLabel: { fr: 'Abris & fendeuses', de: 'Holzlager & Spalter', it: 'Legnaie & spacco' },
    description: {
      fr: 'Abris bûches, range-bûches & préparation',
      de: 'Holzunterstände, Holzregale & Holzspalter',
      it: 'Legnaie da esterno, portalegna e spaccalegna',
    },
    image: '/images/products/abri-buches-timbela-m985-414m2-1.jpg',
    categories: new Set([
      'rangement-stockage',
      'rangement-transport-bois',
      'stockage-exterieur',
      'accessoires-chauffage',
    ]),
  },
]

export function matchesHeatingGroup(category: string, groupId: HeatingGroupId) {
  if (groupId === 'all') return true
  if (groupId === 'combustibles' && category.startsWith('chauffage-au-bois')) return true
  const group = HEATING_FILTER_GROUPS.find(item => item.id === groupId)
  return Boolean(group?.categories?.has(category))
}

const heatingCategories = new Set([
  'buches', 'bois-compresse', 'granules', 'allumage', 'allume-feu', 'accessoires-chauffage',
  'chauffage-au-bois-buches', 'chauffage-au-bois-bois-compresse', 'chauffage-au-bois-granules',
  'chauffage-au-bois-preparation', 'poeles-a-bois', 'poeles-a-granules', 'braseros-cuisson-exterieure',
  'cheminees-electriques', 'rangement-stockage', 'chauffage-exterieur', 'inserts-cheminees',
  'cuisine-au-feu', 'accessoires-brasero', 'stockage-exterieur', 'accessoires-cuisson-exterieure',
  'foyers-cheminees', 'barbecues-cuisine-exterieure', 'rangement-transport-bois', 'chauffage-electrique-interieur',
])

export function isAgricultureCategory(category: string) {
  return category === 'machines-agricoles' || category.startsWith('agriculture-terrain')
}

export function isHeatingCategory(category: string) {
  return heatingCategories.has(category) || category.startsWith('chauffage-au-bois')
}
