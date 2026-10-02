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
