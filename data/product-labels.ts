import type { Product } from './products'
import type { Locale } from '@/lib/i18n-context'

export const categoryLabels = {
  fr: {
    buches: 'Bûches',
    'bois-compresse': 'Bois compressé',
    granules: 'Granulés',
    allumage: 'Bois d’allumage',
    'allume-feu': 'Allume-feu',
    'accessoires-chauffage': 'Accessoires chauffage',
    'machines-agricoles': 'Machines agricoles',
    'chauffage-au-bois-buches': 'Bois de chauffage (bûches)',
    'chauffage-au-bois-bois-compresse': 'Bûches densifiées',
    'chauffage-au-bois-granules': 'Granulés & pellets',
    'chauffage-au-bois-preparation': 'Préparation & fendeurs',
    'poeles-a-bois': 'Poêles à bois',
    'poeles-a-granules': 'Poêles à granulés',
    'inserts-cheminees': 'Inserts & foyers fermés',
    'foyers-cheminees': 'Foyers panoramiques',
    'cheminees-electriques': 'Cheminées électriques',
    'chauffage-electrique-interieur': 'Radiateurs électriques',
    'chauffage-exterieur': 'Chauffage d’extérieur',
    'braseros-cuisson-exterieure': 'Braseros & planchas',
    'barbecues-cuisine-exterieure': 'Barbecues & kamados',
    'cuisine-au-feu': 'Fours & cuisine au feu',
    'accessoires-brasero': 'Accessoires brasero',
    'accessoires-cuisson-exterieure': 'Accessoires cuisson extérieure',
    'rangement-stockage': 'Range-bûches',
    'rangement-transport-bois': 'Chariots à bûches',
    'stockage-exterieur': 'Abris & bûchers extérieurs',
    alimentazione: 'Test interne',
  },
  de: {
    buches: 'Brennholz',
    'bois-compresse': 'Holzbriketts',
    granules: 'Pellets',
    allumage: 'Anzündholz',
    'allume-feu': 'Feueranzünder',
    'accessoires-chauffage': 'Heizungszubehör',
    'machines-agricoles': 'Landmaschinen',
    'chauffage-au-bois-buches': 'Kaminholz (Scheite)',
    'chauffage-au-bois-bois-compresse': 'Holzbriketts',
    'chauffage-au-bois-granules': 'Holzpellets',
    'chauffage-au-bois-preparation': 'Holzspalter & Vorbereitung',
    'poeles-a-bois': 'Kaminöfen',
    'poeles-a-granules': 'Pelletöfen',
    'inserts-cheminees': 'Kamineinsätze',
    'foyers-cheminees': 'Panoramakamine',
    'cheminees-electriques': 'Elektrokamine',
    'chauffage-electrique-interieur': 'Elektroheizkörper',
    'chauffage-exterieur': 'Außenheizungen',
    'braseros-cuisson-exterieure': 'Feuerschalen & Planchas',
    'barbecues-cuisine-exterieure': 'Grills & Kamados',
    'cuisine-au-feu': 'Holzbacköfen & Feuerküche',
    'accessoires-brasero': 'Feuerschalen-Zubehör',
    'accessoires-cuisson-exterieure': 'Outdoor-Kochzubehör',
    'rangement-stockage': 'Holzregale',
    'rangement-transport-bois': 'Holzwagen',
    'stockage-exterieur': 'Holzunterstände',
    alimentazione: 'Interner Test',
  },
  it: {
    buches: 'Legna',
    'bois-compresse': 'Bricchetti',
    granules: 'Pellet',
    allumage: 'Legna da accensione',
    'allume-feu': 'Accendifuoco',
    'accessoires-chauffage': 'Accessori per il riscaldamento',
    'machines-agricoles': 'Macchine agricole',
    'chauffage-au-bois-buches': 'Legna da ardere',
    'chauffage-au-bois-bois-compresse': 'Tronchetti compressi',
    'chauffage-au-bois-granules': 'Pellet di legno',
    'chauffage-au-bois-preparation': 'Spaccalegna & preparazione',
    'poeles-a-bois': 'Stufe a legna',
    'poeles-a-granules': 'Stufe a pellet',
    'inserts-cheminees': 'Inserti camino',
    'foyers-cheminees': 'Camini panoramici',
    'cheminees-electriques': 'Camini elettrici',
    'chauffage-electrique-interieur': 'Radiatori elettrici',
    'chauffage-exterieur': 'Riscaldamento da esterno',
    'braseros-cuisson-exterieure': 'Bracieri & planche',
    'barbecues-cuisine-exterieure': 'Barbecue & kamado',
    'cuisine-au-feu': 'Forni a legna',
    'accessoires-brasero': 'Accessori braciere',
    'accessoires-cuisson-exterieure': 'Accessori cottura esterna',
    'rangement-stockage': 'Portalegna',
    'rangement-transport-bois': 'Carrelli portalegna',
    'stockage-exterieur': 'Legnaie da esterno',
    alimentazione: 'Test interno',
  },
}

const categorySuffixLabels: Record<string, Record<Locale, string>> = {
  'buches': { fr: 'Bûches', de: 'Brennholz', it: 'Legna' },
  'bois-compresse': { fr: 'Bois compressé', de: 'Holzbriketts', it: 'Bricchetti' },
  'granules': { fr: 'Granulés', de: 'Pellets', it: 'Pellet' },
  'bois-d-allumage': { fr: 'Bois d’allumage', de: 'Anzündholz', it: 'Legna da accensione' },
  'allume-feu': { fr: 'Allume-feu', de: 'Feueranzünder', it: 'Accendifuoco' },
  'accessoires-chauffage': { fr: 'Accessoires chauffage', de: 'Heizungszubehör', it: 'Accessori per il riscaldamento' },
  'motoculteurs': { fr: 'Motoculteurs', de: 'Motorhacken', it: 'Motozappe' },
  'tronconneuses': { fr: 'Tronçonneuses', de: 'Kettensägen', it: 'Motoseghe' },
  'debroussailleuses': { fr: 'Débroussailleuses', de: 'Freischneider', it: 'Decespugliatori' },
  'broyeurs': { fr: 'Broyeurs', de: 'Häcksler', it: 'Biotrituratori' },
  'fendeuses': { fr: 'Fendeuses', de: 'Holzspalter', it: 'Spaccalegna' },
  'pulverisateurs': { fr: 'Pulvérisateurs', de: 'Rückenspritzen', it: 'Irroratori' },
  'outils-de-jardin': { fr: 'Outils de jardin', de: 'Gartenwerkzeuge', it: 'Attrezzi da giardino' },
  'preparation': { fr: 'Préparation du bois', de: 'Holzvorbereitung', it: 'Preparazione della legna' },
}

export function categoryLabel(category: string, locale: Locale) {
  const direct = (categoryLabels[locale] as Record<string, string>)[category]
  if (direct) return direct
  const suffix = category.split('-').slice(category.startsWith('chauffage-au-bois-') ? 3 : category.startsWith('agriculture-terrain-') ? 2 : 0).join('-')
  if (categorySuffixLabels[suffix]?.[locale]) return categorySuffixLabels[suffix][locale]
  const readable = category.replace(/^chauffage-au-bois-/, '').replace(/-/g, ' ')
  const fixes: Record<string, Record<Locale, string>> = {
    's chage premium': { fr: 'Bûches séchées premium', de: 'Premium-Brennholz', it: 'Legna premium' },
    'b ches de jour': { fr: 'Bûches de jour', de: 'Tagesbriketts', it: 'Bricchetti da giorno' },
    'b ches de nuit': { fr: 'Bûches de nuit', de: 'Nachtbriketts', it: 'Bricchetti da notte' },
    'b ches premium': { fr: 'Bûches premium', de: 'Premium-Briketts', it: 'Bricchetti premium' },
    'petit foyer': { fr: 'Petit foyer', de: 'Kleiner Ofen', it: 'Piccolo focolare' },
    'grand foyer': { fr: 'Grand foyer', de: 'Großer Ofen', it: 'Grande focolare' },
    'sciure compress e': { fr: 'Sciure compressée', de: 'Gepresstes Sägemehl', it: 'Segatura compressa' },
    'sans corce': { fr: 'Sans écorce', de: 'Rindenfrei', it: 'Senza corteccia' },
    'ch ne compress': { fr: 'Chêne compressé', de: 'Gepresste Eiche', it: 'Quercia compressa' },
    'h tre compress': { fr: 'Hêtre compressé', de: 'Gepresste Buche', it: 'Faggio compresso' },
    'r sineux premium': { fr: 'Résineux premium', de: 'Premium-Nadelholz', it: 'Resinoso premium' },
    'fendeuses de b ches': { fr: 'Fendeuses de bûches', de: 'Holzspalter', it: 'Spaccalegna' },
    'scies b ches': { fr: 'Scies à bûches', de: 'Brennholzsägen', it: 'Seghe per legna' },
    'combin s bois de chauffage': { fr: 'Combinés bois de chauffage', de: 'Kombigeräte Brennholz', it: 'Combinati per legna' },
  }
  return fixes[readable]?.[locale] || readable
}

export function hasMeaningfulConditioning(conditioning?: string | null) {
  return Boolean(conditioning && !/^1\s*(unité|unités|stück|st\.?|pezzo|pezzi)$/i.test(conditioning.trim()))
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
  if (locale === 'fr') return { name: product.name, description: product.description, conditioning: product.conditioning, delivery: product.deliveryInfo }
  if (product.translations) return {
    name: product.translations[locale] || product.name,
    description: product.translations.description?.[locale] || product.description,
    conditioning: product.translations.conditioning?.[locale] || product.conditioning,
    delivery: product.translations.delivery?.[locale] || product.deliveryInfo,
  }
  const index = locale === 'de' ? 0 : 1
  const quantities: Record<string, [string, string]> = {
    'Bancale da 1 stero': ['Palette mit 1 Raummeter', 'Bancale da 1 stero'],
    'Bancale da 96 tronchetti (10 kg)': ['Palette mit 96 Briketts (10 kg)', 'Bancale da 96 tronchetti (10 kg)'],
    'Bancale da 1 tonnellata (66 sacchi da 15 kg)': ['Palette 1 Tonne (66 Säcke à 15 kg)', 'Bancale da 1 tonnellata (66 sacchi da 15 kg)'],
    'Cassetta da 40 litri': ['40-Liter-Kiste', 'Cassetta da 40 litri'],
    'Scatola da 32 pezzi': ['Packung mit 32 Stück', 'Scatola da 32 pezzi'],
    'Palette de 1 stère': ['Palette mit 1 Raummeter', 'Bancale da 1 stero'],
    'Palette de 96 bûches (10 kg)': ['Palette mit 96 Briketts (10 kg)', 'Bancale da 96 bricchetti (10 kg)'],
    'Palette de 1 tonne (66 sacs de 15 kg)': ['Palette 1 Tonne (66 Säcke à 15 kg)', 'Bancale da 1 tonnellata (66 sacchi da 15 kg)'],
    'Caisse de 40 litres': ['40-Liter-Kiste', 'Cassetta da 40 litri'],
    'Boîte de 32 unités': ['Packung mit 32 Stück', 'Scatola da 32 pezzi'],
  }
  const days = product.deliveryInfo.match(/\d+[–-]\d+/)?.[0]
  return {
    name: names[product.id]?.[index] ?? product.name,
    description: product.description,
    conditioning: quantities[product.conditioning ?? '']?.[index] ?? product.conditioning,
    delivery: days ? (locale === 'de' ? `Lieferung in ${days} Tagen` : `Consegna in ${days} giorni lavorativi`) : product.deliveryInfo,
  }
}
