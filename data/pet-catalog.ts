import type { Product } from './products'

type PetSeed = { category: string; names: string[]; base: number; description: string }

const seeds: PetSeed[] = [
  { category: 'cani', names: ['Crocchette quotidiane pollo e riso', 'Crocchette salmone adulto', 'Paté morbido manzo', 'Bocconcini per passeggiata', 'Snack dentali', 'Ciotola rialzata', 'Guinzaglio in nylon', 'Pettorina regolabile', 'Collare verde salvia', 'Cuccia morbida', 'Tappetino riposo', 'Gioco corda naturale', 'Palla resistente', 'Borsa porta snack', 'Cintura sicurezza auto'], base: 9, description: 'Un essenziale pratico per accompagnare ogni giornata del tuo cane.' },
  { category: 'gatti', names: ['Crocchette pollo adulto', 'Crocchette salmone sterilizzato', 'Paté tenero tacchino', 'Snack croccanti', 'Fontanella silenziosa', 'Ciotola ceramica', 'Lettiera chiusa', 'Sabbia agglomerante', 'Tiragraffi compatto', 'Tiragraffi alto', 'Canna da gioco', 'Palla con campanello', 'Cuccia finestra', 'Trasportino pieghevole', 'Spazzola pelo corto'], base: 7, description: 'Un prodotto pensato per il comfort e le abitudini quotidiane del tuo gatto.' },
  { category: 'piccoli-animali', names: ['Fieno naturale conigli', 'Pellet conigli adulti', 'Mix semi criceti', 'Lettiera vegetale', 'Casetta in legno', 'Tunnel gioco', 'Abbeveratoio piccolo', 'Ciotola anti-rovesciamento', 'Recinto modulare', 'Trasportino piccolo'], base: 6, description: 'Un accessorio semplice per un ambiente più ricco e confortevole.' },
  { category: 'uccelli', names: ['Mix semi pappagallini', 'Mix semi cocorite', 'Bastoncini naturali', 'Altalena in legno', 'Posatoio naturale', 'Abbeveratoio trasparente', 'Mangiatoia sospesa', 'Copertura gabbia notte'], base: 5, description: 'Un essenziale scelto per la routine e l’ambiente degli uccelli domestici.' },
  { category: 'accessori', names: ['Coperta viaggio impermeabile', 'Ciotola da viaggio', 'Tappetino auto antiscivolo', 'Porta sacchetti', 'Borraccia pieghevole', 'Organizer accessori', 'Luce sicurezza passeggiata'], base: 8, description: 'Un accessorio versatile per rendere più semplici le uscite insieme.' },
  { category: 'cura-igiene', names: ['Shampoo delicato cane', 'Shampoo delicato gatto', 'Salviette pulizia zampe', 'Spazzola doppia', 'Tagliaunghie compatto'], base: 7, description: 'Un prodotto per una routine di cura semplice e regolare.' },
]

const slugify = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const imageFor = (category: string) => category === 'cani' ? '/images/pet-cani.png' : category === 'gatti' ? '/images/pet-gatti.png' : category === 'piccoli-animali' ? '/images/pet-piccoli-animali.png' : category === 'uccelli' ? '/images/pet-uccelli.png' : '/images/pet-cura.png'
const marketPrices: Record<string, number[]> = {
  cani: [29, 34, 12, 9, 14, 29, 12, 28, 10, 39, 24, 11, 16, 7, 19],
  gatti: [27, 32, 8, 7, 39, 18, 49, 12, 29, 69, 9, 6, 29, 24, 14],
  'piccoli-animali': [8, 15, 7, 12, 24, 16, 8, 11, 39, 22],
  uccelli: [9, 12, 8, 15, 10, 7, 13, 19],
  accessori: [29, 12, 14, 8, 13, 18, 11],
  'cura-igiene': [12, 13, 9, 11, 8],
}

export const petCatalog: Product[] = seeds.flatMap((seed) => seed.names.map((name, index) => {
  const id = `pet-${seed.category}-${index + 1}`
  const price = marketPrices[seed.category]?.[index] ?? seed.base + (index % 5) * 4 + (index % 3)
  return {
    id, slug: slugify(name), name, category: seed.category as Product['category'], description: seed.description,
    longDescription: `${seed.description} Formato facile da usare e informazioni chiare prima dell’acquisto.`,
    features: ['Formato pratico', 'Uso quotidiano', 'Confezione pronta per la consegna'], price,
    image: imageFor(seed.category), images: [imageFor(seed.category)], conditioning: '1 unità', deliveryInfo: 'Consegna in 2-4 giorni', featured: index < 2,
    variants: [{ id: `${id}-standard`, price, stock: 24, label: 'Formato standard' }],
    translations: { it: name, de: name, description: { it: seed.description, de: seed.description }, conditioning: { it: '1 unità', de: '1 Stück' }, delivery: { it: 'Consegna in 2-4 giorni', de: 'Lieferung in 2-4 Tagen' } },
  }
}))

export const petArticles = [
  ['come-scegliere-il-cibo-del-cane', 'Come scegliere il cibo del cane', 'Età, abitudini e formato: i primi criteri per orientarsi senza complicare la scelta.'],
  ['passeggiate-piu-serene', 'Passeggiate più serene', 'Gli accessori utili per preparare una passeggiata comoda e sicura.'],
  ['arricchimento-per-il-gatto', 'Arricchimento per il gatto', 'Giochi, tiragraffi e piccoli rituali per rendere più interessante la casa.'],
  ['trasportare-il-tuo-animale', 'Trasportare il tuo animale', 'Come preparare auto e trasportino per spostamenti più semplici.'],
  ['routine-di-igiene', 'Una routine di igiene semplice', 'Pochi gesti regolari per prendersi cura del mantello e degli accessori.'],
  ['prendersi-cura-dei-piccoli-animali', 'Prendersi cura dei piccoli animali', 'Ambiente, fieno, acqua e stimoli: le basi da controllare ogni giorno.'],
  ['preparare-la-gabbia-degli-uccelli', 'Preparare la gabbia degli uccelli', 'Posatoi, acqua e posizione: come creare un ambiente ordinato e tranquillo.'],
  ['prima-lista-braviko', 'La prima lista Braviko', 'Gli essenziali da considerare quando un nuovo animale entra in casa.'],
] as const
