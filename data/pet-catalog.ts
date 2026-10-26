import type { Product, ProductCategory } from './products'

type PetSeed = { category: ProductCategory; names: string[]; prices: number[]; description: string; image: string }

const seeds: PetSeed[] = [
  { category: 'alimentazione', names: ['Natural Trainer Sensitive Salmone 12 kg', 'Wolf of Wilderness Junior Soft Pollo 5 kg', 'Wolf of Wilderness Junior Soft Pollo 1 kg', 'Wolf of Wilderness Junior Soft Pollo 12 kg', 'Natural Trainer Sensitive Coniglio 12 kg', 'Natural Trainer Adult Manzo 2 × 12 kg', 'Natural Trainer Sensitive Agnello 12 kg', 'Purina Pro Plan HA Hypoallergenic 11 kg', 'Purina Pro Plan Neurocare 12 kg', "Hill's c/d Multicare Pollo 1,5 kg", 'Farmina N&D Prime Adult Pollo 5 kg', 'Farmina N&D Neutered Pollo 5 kg', 'Farmina N&D Ocean Aringa 1,5 kg', 'Purina Pro Plan Feline EN 1,5 kg', 'Natural Trainer Adult Tonno 10 kg', 'Padovan Grandmix Coniglietti', 'Gimbi Fieno Naturale Roditori', 'Grandmix Cocorite 400 g', 'Wellness Mix Canarini', 'Padovan Natural Mix Parrocchetti'], prices: [49, 59, 49, 119, 79, 129, 79, 99, 109, 49, 89, 89, 59, 59, 99, 69, 49, 49, 49, 89], description: 'Alimento selezionato per la routine quotidiana del tuo animale. I prezzi mostrati corrispondono a formati o pack pensati per una spesa utile, non a piccoli articoli isolati.', image: '/images/pet-alimentazione.png' },
  { category: 'bisogni', names: ['Lettiera agglomerante per gatti 10 l', 'Lettiera vegetale per piccoli animali', 'Sacchetti igienici compostabili 120 pezzi', 'Borsa porta lettiera e accessori', 'Tappetini assorbenti per cani 30 pezzi', 'Paletta per lettiera con supporto', 'Lettiera per uccelli Ocean Fresh Air', 'Biogrit per uccelli 700 g'], prices: [59, 69, 49, 79, 69, 49, 49, 49], description: 'Soluzioni pratiche per mantenere ordinati gli spazi degli animali, proposte in pack o kit più utili per la routine in casa.', image: '/images/pet-bisogni.png' },
  { category: 'cura-igiene', names: ['Shampoo delicato per cani', 'Shampoo delicato per gatti', 'Salviette pulizia zampe 40 pezzi', 'Spazzola doppia per pelo', 'Tagliaunghie compatto', 'Balsamo districante per mantello', 'Detergente delicato per superfici pet'], prices: [49, 49, 49, 59, 49, 69, 59], description: 'Kit di prodotti per una cura regolare e semplice, sempre nel rispetto delle istruzioni d’uso.', image: '/images/pet-cura.png' },
  { category: 'passeggiata-trasporto', names: ['Ciotola pieghevole in silicone', 'Impermeabile per cane Vancouver', 'Trasportino pieghevole per gatto', 'Borraccia da passeggio', 'Pettorina regolabile', 'Cintura sicurezza auto', 'Porta sacchetti da passeggio'], prices: [59, 69, 89, 79, 89, 69, 49], description: 'Kit pensati per uscite più ordinate, spostamenti più sicuri e pause facili da gestire.', image: '/images/pet-passeggiata.png' },
  { category: 'comfort', names: ['Cuccia Ciambella per cane', 'Amaca per finestra del gatto', 'Ciotola Modern Bianca', 'Ciotola Modern Rosa', 'Bidone porta crocchette Happy Kibble', 'Coperta viaggio impermeabile', 'Tappetino auto antiscivolo', 'Casetta in legno per roditori'], prices: [89, 69, 59, 59, 79, 69, 59, 79], description: 'Elementi e kit utili per creare un angolo più comodo, pulito e adatto alle abitudini di ogni animale.', image: '/images/pet-comfort.png' },
  { category: 'giochi', names: ['Canna da pesca con pesce per gatti', 'Tiragraffi compatto', 'Gioco corda naturale per cani', 'Palla resistente per cani', 'Tunnel gioco per roditori', 'Altalena in legno per uccelli', 'Posatoio naturale per uccelli'], prices: [49, 79, 59, 59, 59, 59, 49], description: 'Kit di giochi e stimoli semplici per arricchire la giornata senza complicare gli spazi di casa.', image: '/images/pet-giochi.png' },
  { category: 'piccoli-animali', names: ['Abbeveratoio Ferplast Sippy', 'Gabbia Ferplast Casita', 'Bunny Rabbit Dream Herbs', 'Fieno Bunny da prati non trattati', 'Fieno Real Nature Green Nature', 'Legno da rosicchiare per roditori', 'Padovan Herbal Tarassaco', 'Padovan Herbal Erba medica'], prices: [49, 159, 59, 89, 69, 59, 49, 49], description: 'Kit di fieno, habitat, acqua e piccoli accessori per conigli, roditori e altri piccoli animali domestici.', image: '/images/pet-piccoli-animali.png' },
  { category: 'uccelli', names: ['Cliffi Morbido Super', 'Grandmix Esotici 400 g', 'Padovan Granpaté Insects', 'Beverino Cristal per uccelli', 'Mangiatoia trasparente', 'Spighe di panico Vitakraft 100 g', 'Snack miglio giallo MultiFit', 'Gabbia per uccelli Rio', 'Gabbia per uccelli Bogotà', 'Cliffi Nutrient Special'], prices: [49, 49, 89, 49, 59, 49, 49, 189, 99, 59], description: 'Pack, accessoires et habitats pour oiseaux domestiques, avec attention à la specie et aux dimensions.', image: '/images/pet-uccelli.png' },
]

const slugify = (value: string) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const catalogLimit: Record<PetSeed['category'], number> = { alimentazione: 15, bisogni: 7, 'cura-igiene': 6, 'passeggiata-trasporto': 6, comfort: 7, giochi: 6, 'piccoli-animali': 7, uccelli: 6 }

export const petCatalog: Product[] = seeds.flatMap((seed) => seed.names.slice(0, catalogLimit[seed.category]).map((name, index) => {
  const id = `pet-${seed.category}-${index + 1}`
  const price = seed.prices[index]
  return {
    id, slug: slugify(name), name, category: seed.category, description: seed.description,
    longDescription: `${seed.description} Prezzo indicativo rilevato sul mercato italiano: verifica sempre formato, disponibilità e prezzo aggiornati prima dell’ordine.`,
    features: ['Formato indicato nella confezione', 'Uso domestico', 'Scheda da verificare prima dell’acquisto'], price,
    image: seed.image, images: [seed.image], conditioning: '1 unità', deliveryInfo: 'Consegna in 2-4 giorni', featured: index < 2,
    variants: [{ id: `${id}-standard`, price, stock: 24, label: 'Formato indicato' }],
    translations: { it: name, de: name, description: { it: seed.description, de: seed.description }, conditioning: { it: '1 unità', de: '1 Stück' }, delivery: { it: 'Consegna in 2-4 giorni', de: 'Lieferung in 2-4 Tagen' } },
  }
}))

export const petArticles = [
  ['come-scegliere-il-cibo-del-cane', 'Come scegliere il cibo del cane', 'Età, taglia, attività e formato: i criteri da controllare prima di scegliere un alimento.'],
  ['gestire-la-lettiera-in-casa', 'Gestire la lettiera in casa', 'Dove posizionarla, come mantenerla pulita e quali accessori rendono la routine più semplice.'],
  ['passeggiate-piu-serene', 'Passeggiate più serene', 'Gli accessori utili per preparare una passeggiata comoda e sicura.'],
  ['arricchimento-per-il-gatto', 'Arricchimento per il gatto', 'Giochi, tiragraffi e piccoli rituali per rendere più interessante la casa.'],
  ['routine-di-igiene', 'Una routine di igiene semplice', 'Pochi gesti regolari per prendersi cura del mantello e degli accessori.'],
  ['prendersi-cura-dei-piccoli-animali', 'Prendersi cura dei piccoli animali', 'Ambiente, fieno, acqua e stimoli: le basi da controllare ogni giorno.'],
  ['preparare-la-gabbia-degli-uccelli', 'Preparare la gabbia degli uccelli', 'Posatoi, acqua e posizione: come creare un ambiente ordinato e tranquillo.'],
  ['prima-lista-braviko', 'La prima lista Braviko', 'Gli essenziali da considerare quando un nuovo animale entra in casa.'],
] as const
