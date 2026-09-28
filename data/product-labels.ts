import type { Product } from './products'
import type { Locale } from '@/lib/i18n-context'

export const categoryLabels = {
  fr: { buches: 'Bûches', 'bois-compresse': 'Bois compressé', granules: 'Granulés', allumage: 'Bois d’allumage', 'allume-feu': 'Allume-feu' },
  de: { buches: 'Brennholz', 'bois-compresse': 'Holzbriketts', granules: 'Pellets', allumage: 'Anzündholz', 'allume-feu': 'Feueranzünder' },
  it: { buches: 'Legna', 'bois-compresse': 'Bricchetti', granules: 'Pellet', allumage: 'Legna da accensione', 'allume-feu': 'Accendifuoco' },
}

const names: Record<string, [string, string]> = {
  '1': ['Eichenscheite 33 cm', 'Ceppi di quercia 33 cm'],
  '2': ['Buchenscheite 33 cm', 'Ceppi di faggio 33 cm'],
  '3': ['Eichenscheite 50 cm', 'Ceppi di quercia 50 cm'],
  '4': ['Hainbuchenscheite 33 cm', 'Ceppi di carpino 33 cm'],
  '5': ['Holzbriketts Tag & Nacht', 'Bricchetti giorno e notte'],
  '6': ['Premium-Pellets DIN+', 'Pellet Premium DIN+'],
  '7': ['Anzündholz in der Kiste', 'Legna da accensione in cassetta'],
  '8': ['Natürliche Feueranzünder', 'Accendifuoco naturali'],
}

export function productLabel(product: Product, locale: Locale) {
  if (locale === 'fr') return { name: product.name, conditioning: product.conditioning, delivery: product.deliveryInfo }
  const index = locale === 'de' ? 0 : 1
  const quantities: Record<string, [string, string]> = {
    'Palette de 1 stère': ['Palette mit 1 Raummeter', 'Bancale da 1 stero'],
    'Palette de 96 bûches (10 kg)': ['Palette mit 96 Briketts (10 kg)', 'Bancale da 96 bricchetti (10 kg)'],
    'Palette de 1 tonne (66 sacs de 15 kg)': ['Palette 1 Tonne (66 Säcke à 15 kg)', 'Bancale da 1 tonnellata (66 sacchi da 15 kg)'],
    'Caisse de 40 litres': ['40-Liter-Kiste', 'Cassetta da 40 litri'],
    'Boîte de 32 unités': ['Packung mit 32 Stück', 'Scatola da 32 pezzi'],
  }
  const days = product.deliveryInfo.match(/\d+-\d+/)?.[0]
  return {
    name: names[product.id]?.[index] ?? product.name,
    conditioning: quantities[product.conditioning ?? '']?.[index] ?? product.conditioning,
    delivery: days ? (locale === 'de' ? `Lieferung in ${days} Tagen` : `Consegna in ${days} giorni`) : '',
  }
}
