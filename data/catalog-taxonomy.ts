const heatingCategories = new Set(['buches', 'bois-compresse', 'granules', 'allumage', 'allume-feu', 'accessoires-chauffage'])

export function isAgricultureCategory(category: string) {
  return category === 'machines-agricoles' || category.startsWith('agriculture-terrain')
}

export function isHeatingCategory(category: string) {
  return heatingCategories.has(category) || category.startsWith('chauffage-au-bois')
}
