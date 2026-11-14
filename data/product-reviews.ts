export type ProductReview = {
  rating?: number
  author?: string
  date?: string
  text?: string
  label: string
}

type ReviewEntry = ProductReview & { matches: string[] }

const entries: ReviewEntry[] = [
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Giulio M.', text: 'Ottimo riscaldatore, sta benissimo sulla nostra terrazza. Il calore la sera è molto piacevole e il design dal vivo è ancora più riuscito.', label: 'Recensione dimostrativa' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Sofia R.', text: 'Installazione abbastanza semplice e risultato molto elegante. Lo usiamo soprattutto nelle serate fresche all’aperto.', label: 'Recensione dimostrativa' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Marco D.', text: 'Prodotto ben rifinito e molto meno ingombrante di quanto immaginassi. Davvero soddisfatto dell’acquisto.', label: 'Recensione dimostrativa' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Lorenzo P.', text: 'Il formato panoramico dà davvero carattere al soggiorno. Ottime finiture e splendida vista sulla fiamma.', label: 'Recensione dimostrativa' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Elena B.', text: 'Cercavamo un focolare moderno senza un ingombro eccessivo. Questo corrisponde esattamente a ciò che volevamo.', label: 'Recensione dimostrativa' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Tommaso G.', text: 'Bellissima resa una volta installato. È diventato il punto centrale dell’intera zona giorno.', label: 'Recensione dimostrativa' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Nicola V.', text: 'Molto conviviale per cucinare all’aperto. L’ampia piastra permette di preparare più portate contemporaneamente.', label: 'Recensione dimostrativa' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Chiara T.', text: 'L’acciaio Corten fa un figurone in giardino. Dopo diversi utilizzi siamo davvero contenti del braciere.', label: 'Recensione dimostrativa' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Antonio L.', text: 'Usato tutta l’estate con gli amici. Cottura pratica e atmosfera attorno al fuoco davvero piacevole.', label: 'Recensione dimostrativa' },
  { matches: ['buches-densifiees-premium-palette-1000-kg'], rating: 5, author: 'Michele C.', text: 'Tronchetti compatti e comodi da riporre. Occupano molto meno spazio della legna tradizionale.', label: 'Recensione dimostrativa' },
  { matches: ['buches-densifiees-premium-palette-1000-kg'], rating: 5, author: 'Patrizio F.', text: 'Buona combustione e soprattutto minima movimentazione con il bancale completo.', label: 'Recensione dimostrativa' },
  { matches: ['buches-densifiees-premium-palette-1000-kg'], rating: 5, author: 'Gianluca R.', text: 'Primo ordine di tronchetti densificati e ne sono rimasto convinto. Prodotto pulito e facile da stoccare.', label: 'Recensione dimostrativa' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Camilla N.', text: 'Molto pratico per portare la legna fino al camino senza sporcare in giro.', label: 'Recensione dimostrativa' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Francesco A.', text: 'Il carrello è stabile e la finitura nera resta discreta in casa. Esattamente ciò che cercavo.', label: 'Recensione dimostrativa' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Isabella M.', text: 'Decisamente più pratico dei vecchi portaceppi. Lo uso quasi ogni giorno in inverno.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Alessandro P.', text: 'Ottima aggiunta al nostro braciere. Tutto risulta più sicuro quando ci sono bambini in giardino.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Matteo S.', text: 'Ottima finitura e integrazione perfetta con il resto dell’attrezzatura.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Carolina V.', text: 'Accessorio semplice ma davvero utile attorno alla piastra calda. Qualità soddisfacente.', label: 'Recensione dimostrativa' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg'], rating: 5, author: 'Oliviero D.', text: 'Bancale arrivato ben imballato e sacchi facili da sistemare. Pellet pulito e regolare.', label: 'Recensione dimostrativa' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg'], rating: 5, author: 'Stefano R.', text: 'Abbiamo scelto il bancale per evitare di acquistare sacchi ogni settimana. Molto più comodo per l’inverno.', label: 'Recensione dimostrativa' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg'], rating: 5, author: 'Davide L.', text: 'Buon confezionamento e pochissima segatura nei sacchi aperti finora.', label: 'Recensione dimostrativa' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Filippo G.', text: 'Li uso insieme alla legna classica. Comodissimi per non dover ricaricare la stufa di notte.', label: 'Recensione dimostrativa' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Natalia B.', text: 'Tronchetti facili da riporre e confezione ordinata. Ottima prima esperienza.', label: 'Recensione dimostrativa' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Gerardo T.', text: 'Soluzione ideale per le lunghe serate invernali. La riacquisterò sicuramente.', label: 'Recensione dimostrativa' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Benedetto F.', text: 'Finalmente tutta la legna è ordinata e riparata nello stesso posto. Sta anche molto bene in giardino.', label: 'Recensione dimostrativa' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Aurelia C.', text: 'Montaggio fatto con calma nel weekend. Struttura solida e ben sfruttabile.', label: 'Recensione dimostrativa' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Pietro M.', text: 'Molto utile per organizzare la scorta di legna e gli attrezzi dietro casa.', label: 'Recensione dimostrativa' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm'], rating: 5, author: 'Cristiano D.', text: 'Legna arrivata ben sistemata e i ceppi da 33 cm sono perfetti per la nostra stufa.', label: 'Recensione dimostrativa' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm'], rating: 5, author: 'Alberto R.', text: 'Mix di quercia, carpino e faggio esattamente come lo cercavo per la stagione invernale.', label: 'Recensione dimostrativa' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm'], rating: 5, author: 'Maria P.', text: 'Primo acquisto online di legna da ardere. Il formato da due steri è pratico e di buona qualità.', label: 'Recensione dimostrativa' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Remo B.', text: 'Installato in camera da letto e finora pienamente soddisfatto. Scalda bene ed è discreto.', label: 'Recensione dimostrativa' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Celina A.', text: 'Apprezzo soprattutto la possibilità di gestire meglio la temperatura senza regolazioni continue.', label: 'Recensione dimostrativa' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Girolamo V.', text: 'Design sobrio, funzionamento intuitivo e ottima sensazione di comfort nella stanza.', label: 'Recensione dimostrativa' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Sebastiano L.', text: 'Installato nel nostro studio. Raggiunge la temperatura piacevolmente ed è molto elegante.', label: 'Recensione dimostrativa' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Laura F.', text: 'Ottimo prodotto, semplice nell’uso quotidiano e adatto a un ambiente moderno.', label: 'Recensione dimostrativa' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Vincenzo M.', text: 'Ha sostituito un vecchio radiatore molto meno efficiente. Nulla da eccepire finora.', label: 'Recensione dimostrativa' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Damiano R.', text: 'Molto soddisfatti della stufa. La programmazione permette di trovare casa calda al rientro.', label: 'Recensione dimostrativa' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Sandra P.', text: 'Dimensioni compatte ed estetica curata nel nostro soggiorno.', label: 'Recensione dimostrativa' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Enrico N.', text: 'Volevamo passare al pellet senza installare un apparecchio ingombrante: scelta azzeccata.', label: 'Recensione dimostrativa' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Massimo C.', text: 'Molto piacevole da usare e la ceramica trattiene davvero bene il calore.', label: 'Recensione dimostrativa' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Romano T.', text: 'Il formato XL è ideale quando si invitano amici. Splendido pezzo nella cucina esterna.', label: 'Recensione dimostrativa' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Fabiano G.', text: 'Nessun rimpianto per il passaggio al kamado, soprattutto per le cotture lente.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Ugo D.', text: 'Accessorio originale che amplia tantissimo le possibilità di cottura sul nostro OFYR.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Valeria M.', text: 'Molto scenografico quando si cucina con gli ospiti in giardino.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Cristoforo B.', text: 'Ottima costruzione e montaggio intuitivo. Lo usiamo molto più spesso del previsto.', label: 'Recensione dimostrativa' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Bernardo P.', text: 'L’inserto valorizza moltissimo il nostro vecchio camino. La differenza termica in sala è netta.', label: 'Recensione dimostrativa' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Teodoro A.', text: 'Volevamo mantenere il fascino del fuoco a legna modernizzando l’impianto. Molto soddisfatti.', label: 'Recensione dimostrativa' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Monica L.', text: 'Apparecchio robusto e ottima visione delle fiamme una volta installato.', label: 'Recensione dimostrativa' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Pasquale V.', text: 'Stufa in ghisa molto curata che si integra benissimo nello stile della casa.', label: 'Recensione dimostrativa' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Caterina F.', text: 'La utilizziamo regolarmente e il comfort termico in soggiorno è davvero elevato.', label: 'Recensione dimostrativa' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Daniele R.', text: 'Solida qualità costruttiva e funzionamento affidabile fin da subito.', label: 'Recensione dimostrativa' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Manuela C.', text: 'Molto bello in salotto e praticissimo per chi non ha la canna fumaria.', label: 'Recensione dimostrativa' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Luca B.', text: 'L’effetto visivo crea un’atmosfera molto accogliente la sera.', label: 'Recensione dimostrativa' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Giulia T.', text: 'Design nero essenziale e moderno, perfetto sopra al mobile della zona giorno.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Arturo M.', text: 'Bellissima struttura portalegna che arreda la terrazza invece di nascondere i ceppi.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Elodia P.', text: 'Robusto, capiente e perfettamente abbinato al nostro spazio esterno.', label: 'Recensione dimostrativa' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Guglielmo R.', text: 'Permette di tenere una buona scorta in ordine e subito a portata di mano.', label: 'Recensione dimostrativa' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Beniamino L.', text: 'Le serate pizza all’aperto sono cambiate completamente da quando lo abbiamo preso.', label: 'Recensione dimostrativa' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Anita D.', text: 'Dopo un paio di prove per prendere confidenza con la temperatura, le pizze vengono ottime.', label: 'Recensione dimostrativa' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Mattia C.', text: 'Ottimo complemento per cucinare all’aperto sul fuoco di legna.', label: 'Recensione dimostrativa' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Diego M.', text: 'Enorme risparmio di tempo rispetto allo spacco manuale quando si prepara la scorta invernale.', label: 'Recensione dimostrativa' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Gianni P.', text: 'Macchina stabile e potente per uso domestico.', label: 'Recensione dimostrativa' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Franco B.', text: 'Lavoro molto più rapido e meno faticoso per preparare la legna.', label: 'Recensione dimostrativa' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Adriano G.', text: 'Installato sotto la veranda coperta: comodissimo appena cala l’aria la sera.', label: 'Recensione dimostrativa' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Paola R.', text: 'Discreto a parete e non occupa spazio sul pavimento della terrazza.', label: 'Recensione dimostrativa' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Saverio N.', text: 'Lo usiamo in autunno per sfruttare più a lungo gli spazi esterni.', label: 'Recensione dimostrativa' },
]

export const productReviewsData = entries

const extraReviewAuthors = ['Natalia C.', 'Oliviero M.', 'Chiara B.']

function extraReviewTexts(slug: string): string[] {
  if (slug.includes('buches') || slug.includes('bois-de-chauffage')) {
    return [
      'Il confezionamento è pratico e la sistemazione è avvenuta senza difficoltà.',
      'Il combustibile risponde bene al nostro utilizzo quotidiano e la consegna è stata puntuale.',
      'Ottima soluzione per mantenere la scorta ordinata e facilmente accessibile.',
    ]
  }
  if (slug.includes('poele') || slug.includes('insert') || slug.includes('cheminee')) {
    return [
      'Il formato si integra bene nell’ambiente e l’utilizzo quotidiano è semplice.',
      'Il calore è gradevole e l’apparecchio trova facilmente posto in casa.',
      'Finitura curata e funzionamento all’altezza delle aspettative.',
    ]
  }
  if (slug.includes('radiateur')) {
    return [
      'La regolazione è intuitiva e la temperatura rimane confortevole nella stanza.',
      'Formato discreto, installazione semplice e comandi chiari.',
      'Si integra bene nell’ambiente e svolge al meglio il suo compito.',
    ]
  }
  if (slug.includes('ofyr') || slug.includes('brasero') || slug.includes('barbecue')) {
    return [
      'Molto piacevole durante le cene all’aperto e comodo anche con più ospiti.',
      'La finitura si abbina bene allo spazio esterno e rende conviviale la cottura.',
      'Un’attrezzatura che utilizziamo spesso appena il meteo permette di cucinare fuori.',
    ]
  }
  if (slug.includes('chauffage') || slug.includes('frico')) {
    return [
      'Il calore è ben distribuito e l’apparecchio resta discreto sulla terrazza.',
      'Comodo per prolungare le serate all’aperto quando rinfresca.',
      'Installazione adatta al nostro spazio e utilizzo immediato.',
    ]
  }
  return [
    'Prodotto conforme alle attese e pratico nell’uso quotidiano.',
    'Buona qualità percepita e integrazione semplice nel nostro ambiente.',
    'Soluzione funzionale per le nostre esigenze con una finitura curata.',
  ]
}

function targetReviewCount(slug: string): number {
  const hash = [...slug].reduce((total, character) => total + character.charCodeAt(0), 0)
  return 2 + (hash % 5)
}

const reviewSlugAliases: Record<string, string> = {
  'chariot-le-marquier-fjord-noir': 'chariot-buches-le-marquier-fjord-noir',
  'chauffage-frico-term-ip67-2000w': 'chauffage-infrarouge-exterieur-frico-term-ip67-2000w',
  'fendeur-buches-scheppach-compact-10t': 'fendeur-buches-scheppach-compact-10t-3150w',
  'foyer-cheminee-acaminetti-flat-150x50': 'foyer-bois-panoramique-acaminetti-flat-150x50',
}

export function getProductReviews(slug: string, options: { preview?: boolean } = {}): ProductReview[] {
  const resolved = reviewSlugAliases[slug] || slug
  const reviews = entries
    .filter((entry) => entry.matches.includes(resolved))
    .map(({ matches: _matches, ...review }) => review)

  const extras = extraReviewTexts(slug).map((text, index) => ({
    rating: 4 + ((index + slug.length) % 2),
    author: extraReviewAuthors[index],
    text,
    label: 'Recensione dimostrativa',
  }))

  return [...reviews, ...extras].slice(0, targetReviewCount(slug))
}
