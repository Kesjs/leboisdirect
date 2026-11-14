export interface ItalianProductOverride {
  name: string
  description: string
  longDescription?: string
  features: string[]
  conditioning: string
  deliveryInfo: string
  variantLabel: string
  googleCategory?: string
}

export const ITALIAN_PRODUCT_OVERRIDES: Record<string, ItalianProductOverride> = {
  'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm': {
    name: 'Legna da ardere Premium – Quercia, Carpino & Faggio – Bancale da 2 steri',
    description:
      'Legna da ardere premium di latifoglie dure selezionate — quercia, carpino e faggio — essiccata in forno e pronta all’uso. Confezionata su bancale da 2 steri con ceppi da 33 cm.',
    longDescription:
      'Una miscela equilibrata di quercia, carpino e faggio pensata per chi cerca brace compatte, fiamma costante e alto potere calorifico. Essiccata in forno al di sotto del 20 % di umidità residua, la legna si accende rapidamente, sporca meno vetro e canna fumaria e sviluppa calore regolare fin dal primo utilizzo.\n\nTagliata in ceppi versatili da 33 cm compatibili con la maggior parte di stufe a legna, inserti e camini chiusi, arriva ordinata e protetta su bancale da 2 steri (circa 1,4 m³) per un rapido stoccaggio al coperto.',
    features: [
      'Tipo: Legna da ardere / latifoglie dure',
      'Essenze: Quercia, carpino e faggio',
      'Quantità: 2 steri',
      'Volume confezionato: Circa 1,4 m³',
      'Lunghezza dei ceppi: 33 cm',
      'Umidità: Meno del 20 %',
      'Essiccazione: Essiccata in forno',
      'Stato: Pronta all’uso',
      'Confezionamento: Bancale',
      'Utilizzo: Stufa a legna, inserto, camino',
      'Conservazione: Luogo asciutto, ventilato e rialzato',
      'Categoria Braviko: Legna da ardere',
      'SKU: BRV-BOIS-CHH-2S-33',
    ],
    conditioning: 'Bancale da 2 steri',
    deliveryInfo: 'Consegna in 5–8 giorni lavorativi su appuntamento',
    variantLabel: 'Bancale da 2 steri – ceppi da 33 cm',
    googleCategory: 'Casa e giardino > Riscaldamento > Combustibile da riscaldamento',
  },
  'granules-bois-premium-6mm-palette-990-kg': {
    name: 'Pellet di legno Premium 6 mm – Bancale 990 kg',
    description:
      'Pellet di legno premium da 6 mm progettato per offrire combustione regolare, alto rendimento e minima produzione di cenere. Confezionato in 66 sacchi da 15 kg per alimentare stufa o caldaia a pellet durante la stagione fredda.',
    longDescription:
      'Formulato da legno resinoso vergine con calibro uniforme da 6 mm, questo pellet garantisce alimentazione fluida nella coclea e combustione pulita giorno dopo giorno. Le certificazioni ENplus A1 e DINplus assicurano basso residuo di cenere, elevato potere calorifico e protezione della camera di combustione.\n\nIl bancale comprende 66 sacchi maneggevoli da 15 kg (990 kg complessivi), facili da movimentare e riporre al riparo dall’umidità per coprire l’intera stagione invernale.',
    features: [
      'Tipo: Pellet di legno',
      'Quantità: 990 kg',
      'Confezionamento: 66 sacchi',
      'Peso per sacco: 15 kg',
      'Diametro: 6 mm',
      'Certificazione dichiarata: ENplus A1 / DINplus',
      'Materiale: Legno resinoso',
      'Utilizzo: Stufe e caldaie a pellet',
      'Imballo principale: Bancale',
      'Categoria: Pellet di legno',
      'SKU Braviko: BRV-PELLET-990-6',
    ],
    conditioning: 'Bancale 990 kg – 66 sacchi da 15 kg',
    deliveryInfo: 'Consegna in 5–8 giorni lavorativi su appuntamento',
    variantLabel: 'Bancale 990 kg – 66 sacchi da 15 kg',
    googleCategory: 'Casa e giardino > Riscaldamento > Combustibile da riscaldamento',
  },
  'poele-bois-fonte-bronpi-karen-8-kw': {
    name: 'Stufa a legna in ghisa Bronpi KAREN – 8 kW',
    description:
      'Stufa a legna ermetica interamente in ghisa, progettata per offrire calore duraturo e combustione ad alte prestazioni. Potenza nominale di 8 kW, sistema a tripla combustione e camera adatta a ceppi fino a 50 cm.',
    longDescription:
      'Costruita interamente in ghisa massiccia da 157 kg, la Bronpi KAREN accumula il calore e lo rilascia per irraggiamento anche dopo lo spegnimento della fiamma. Il sistema a tripla combustione e la presa d’aria canalizzabile dall’esterno portano il rendimento all’82 % in classe energetica A+, riducendo i consumi a circa 2,2 kg/h.\n\nL’ampia camera accoglie ceppi fino a 50 cm e permette di configurare l’uscita fumi da Ø150 mm superiormente o posteriormente in base all’impianto domestico.',
    features: [
      'Combustibile: Ceppi di legna',
      'Potenza nominale: 8 kW',
      'Intervallo di potenza: 5–10 kW',
      'Rendimento: 82 %',
      'Volume riscaldabile dichiarato: 200 m³',
      'Materiale: Ghisa',
      'Lunghezza max ceppi: 50 cm',
      'Consumo dichiarato: 2,2 kg/h',
      'Peso: 157 kg',
      'Uscita fumi: Ø150 mm, superiore o posteriore',
      'Sistema: Tripla combustione',
      'Presa d’aria esterna: Sì',
      'Classe energetica: A+',
      'Categoria Braviko: Stufe a legna',
      'SKU: BRV-POELE-KAREN-8',
    ],
    conditioning: 'Stufa a legna in ghisa – 8 kW',
    deliveryInfo: 'Consegna in 6–10 giorni lavorativi su appuntamento',
    variantLabel: 'Stufa a legna in ghisa – 8 kW',
    googleCategory: 'Casa e giardino > Riscaldamento > Stufe a legna',
  },
  'brasero-plancha-le-bigorneau-acier-corten-100-cm': {
    name: 'Braciere Plancha Le Bigorneau – Acciaio Corten Ø100 cm',
    description:
      'Braciere-plancha di fascia alta a legna che unisce focolare da esterno e ampia piastra di cottura. Base in acciaio Corten e plancha circolare da 100 cm per cucinare attorno al fuoco per 10–15 ospiti.',
    longDescription:
      'Progettato per vivere il giardino tutto l’anno, Le Bigorneau combina la solidità dell’acciaio Corten autopatinante con un’ampia piastra plancha circolare da Ø100 cm e spessore 10 mm in acciaio smaltato. Le zone a temperatura differenziata consentono di rosolare ad alta temperatura verso l’interno e mantenere in caldo sul bordo.\n\nCompleto di griglia centrale da Ø44,5 cm e base stabile alta 92 cm (135 kg totali), permette di cucinare comodamente alla brace per 10–15 persone.',
    features: [
      'Tipo: Braciere + plancha',
      'Combustibile: Legna',
      'Materiale base: Acciaio Corten',
      'Plancha: Acciaio smaltato',
      'Diametro plancha: 100 cm',
      'Spessore plancha: 10 mm',
      'Capacità dichiarata: 10–15 persone',
      'Griglia centrale: Inclusa',
      'Diametro griglia: 44,5 cm',
      'Peso: 135 kg',
      'Altezza: 92 cm',
      'Utilizzo: Esterno',
      'Marca: France Braseros',
      'Codice produttore: BBSG6_EM',
      'Categoria Braviko: Bracieri & cucina esterna',
      'SKU: BRV-BIGORNEAU-100',
    ],
    conditioning: 'Braciere-plancha Ø100 cm con base',
    deliveryInfo: 'Consegna in 6–10 giorni lavorativi su appuntamento',
    variantLabel: 'Braciere plancha Corten Ø100 cm',
    googleCategory: 'Casa e giardino > Giardino > Bracieri e barbecue',
  },
  'ofyr-wood-storage-corten-100-range-buches': {
    name: 'OFYR Wood Storage Corten 100 – Portalegna',
    description:
      'Struttura premium in acciaio Corten progettata per trasformare lo stoccaggio della legna in un elemento architettonico da esterno, con vano superiore integrato per utensili e accessori.',
    longDescription:
      'Realizzato in acciaio Corten spessorato, il modulo OFYR Wood Storage Corten 100 organizza la scorta di ceppi lungo la parete sviluppandosi in altezza (216 × 100 × 45 cm) senza ingombrare la terrazza. Nel tempo la superficie sviluppa la caratteristica patina calda color ruggine protettiva resistente agli agenti atmosferici.\n\nIl vano superiore integrato offre uno spazio dedicato a spatole, guanti e accessori di cottura o accensione, ed è predisposto per l’abbinamento modulare di più elementi con fissaggio a muro.',
    features: [
      'Tipo: Portalegna verticale premium',
      'Marca: OFYR',
      'Modello: Wood Storage Corten 100',
      'Materiale: Acciaio Corten',
      'Larghezza: Circa 100 cm',
      'Altezza: Circa 216 cm',
      'Profondità: Circa 45 cm',
      'Vano accessori: Sì',
      'Installazione consigliata: Fissaggio a parete',
      'Modularità: Più moduli abbinabili',
      'Uso: Stoccaggio della legna',
      'Categoria Braviko: Ordine & stoccaggio',
      'SKU: BRV-OFYR-WS-C100',
    ],
    conditioning: 'Portalegna verticale Corten 100',
    deliveryInfo: 'Consegna in 5–9 giorni lavorativi su appuntamento',
    variantLabel: 'Portalegna verticale Corten 100',
    googleCategory: 'Casa e giardino > Giardino > Portalegna e deposito',
  },
  'insert-bois-invicta-p947044-10-kw': {
    name: 'Inserto a legna Invicta P947044 – 10 kW',
    description:
      'Inserto a legna Invicta progettato per trasformare un camino aperto in un impianto di riscaldamento efficiente. Focolare da 10 kW e frontale lineare per godere del calore e della vista fuoco.',
    longDescription:
      'Studiato per riqualificare un focolare aperto esistente migliorando nettamente rendimento e sicurezza, l’inserto Invicta P947044 unisce una robusta struttura in acciaio a un corpo scaldante interamente in ghisa da 134 kg.\n\nCon 10 kW di potenza nominale, frontale lineare panoramico, imbocco per ceppi fino a 69 cm e uscita fumi da Ø200 mm, trasforma il camino tradizionale in una vera fonte di calore domestico controllato.',
    features: [
      'Tipo: Inserto a legna',
      'Potenza: 10 kW',
      'Combustibile: Ceppi di legna',
      'Lunghezza ceppi: Fino a 69 cm',
      'Corpo scaldante: Ghisa',
      'Struttura: Acciaio',
      'Uscita / tubo fumi: Ø200 mm',
      'Larghezza: 69,2 cm',
      'Altezza: 61,5 cm',
      'Profondità: 46,7 cm',
      'Peso: 134 kg',
      'Categoria: Inserti & camini',
      'SKU: BRV-INV-P947044-10',
    ],
    conditioning: 'Inserto a legna in ghisa – 10 kW',
    deliveryInfo: 'Consegna in 6–10 giorni lavorativi su appuntamento',
    variantLabel: 'Inserto a legna in ghisa – 10 kW',
    googleCategory: 'Casa e giardino > Riscaldamento > Inserti e camini',
  },
  'ofyr-fire-guard-ring-100-teck': {
    name: 'OFYR Fire Guard Ring 100 – Anello protettivo in teak',
    description:
      'Anello protettivo in teak pensato per mettere in sicurezza il bordo della piastra di cottura OFYR 100, aggiungendo una pratica superficie d’appoggio periferica da 12,5 cm.',
    longDescription:
      'L’anello periferico in legno di teak da 12,5 cm crea una barriera naturale intorno alla piastra bollente dei bracieri OFYR 100, aumentando il comfort degli ospiti quando ci si riunisce attorno al fuoco.\n\nOltre alla protezione termica, funge da comodo piano d’appoggio per piatti, salse e utensili e si aggancia o rimuove in pochi gesti tramite i 6 morsetti dedicati in acciaio.',
    features: [
      'Tipo: Protezione per braciere',
      'Marca: OFYR',
      'Compatibilità: OFYR 100',
      'Materiale: Teak',
      'Larghezza anello: 12,5 cm',
      'Fissaggio: 6 morsetti in acciaio',
      'Smontabile: Sì',
      'Funzione secondaria: Piano d’appoggio',
      'Categoria: Accessori braciere',
      'SKU: BRV-OFYR-GUARD-100',
    ],
    conditioning: 'Anello protettivo OFYR 100 – Teak',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Anello protettivo OFYR 100 – Teak',
    googleCategory: 'Casa e giardino > Giardino > Accessori barbecue',
  },
  'ofyr-cage-100-accessoire-cuisson': {
    name: 'OFYR Cage 100 – Accessorio premium per braciere',
    description:
      'Accessorio di cottura verticale dedicato alle unità OFYR compatibili, ideale per appendere e cuocere gli alimenti direttamente sopra e attorno al fuoco.',
    longDescription:
      'Pensata per espandere le tecniche di cucina sul braciere OFYR 100, la gabbia OFYR Cage 100 introduce la cottura verticale e lenta a sospensione sopra le braci e lungo la corona di calore.\n\nConsente di appendere grandi tagli di carne, ortaggi o preparazioni a fiamma viva lasciando allo stesso tempo libera l’intera piastra circolare sottostante per contorni e rosolature.',
    features: [
      'Tipo: Accessorio di cottura',
      'Marca: OFYR',
      'Modello: Cage 100',
      'Compatibilità: Gamma OFYR 100',
      'Uso: Cottura all’aperto',
      'Installazione: Su unità di cottura compatibile',
      'Gamma: Cottura esterna premium',
      'Categoria: Accessori cucina esterna',
      'SKU: BRV-OFYR-CAGE-100',
    ],
    conditioning: 'Gabbia di cottura OFYR 100',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Gabbia di cottura OFYR 100',
    googleCategory: 'Casa e giardino > Giardino > Accessori barbecue',
  },
  'barbecue-kamado-bee-grill-xl-luxe-ceramique': {
    name: 'Barbecue Kamado Bee Grill XL Luxe – Ceramica',
    description:
      'Kamado premium in ceramica spessa per grigliare, arrostire, brasare, cuocere e affumicare con elevata inerzia termica e dotazione completa con carrello, telo e deflettore.',
    longDescription:
      'Con guscio in ceramica spessa ad alta tenuta termica, struttura in acciaio inox satinato nero e griglia da Ø47 cm, il Kamado Bee Grill XL Luxe mantiene la temperatura stabile per ore con un consumo minimo di carbone di legna.\n\nFornito pronto per cucinare con carrello robusto su ruote, ripiani laterali in noce, deflettore di calore per cotture indirette o affumicatura e telo di protezione incluso.',
    features: [
      'Tipo: Barbecue Kamado',
      'Combustibile: Carbone di legna',
      'Altezza: 122 cm',
      'Diametro: 55 cm',
      'Griglia: Ø47 cm',
      'Peso: 78 kg',
      'Corpo: Ceramica',
      'Struttura: Inox satinato nero',
      'Ripiani laterali: Noce',
      'Carrello: Incluso',
      'Copertura: Inclusa',
      'Deflettore: Incluso',
      'Garanzia ceramica dichiarata: A vita',
      'Categoria: Barbecue & cucina esterna',
      'SKU: BRV-BEE-XL-LUXE',
    ],
    conditioning: 'Barbecue Kamado XL Luxe – Ceramica',
    deliveryInfo: 'Consegna in 6–10 giorni lavorativi su appuntamento',
    variantLabel: 'Barbecue Kamado XL Luxe – Ceramica',
    googleCategory: 'Casa e giardino > Giardino > Barbecue e grill',
  },
  'radiateur-electrique-connecte-sauter-hekla-1500w': {
    name: 'Radiatore elettrico connesso Sauter Hekla – 1500 W',
    description:
      'Radiatore elettrico connesso Sauter Hekla da 1.500 W con doppio nucleo riscaldante in ghisa, calore dolce e rapido, gestione smart e illuminazione LED d’ambiente per ambienti fino a 15 m².',
    longDescription:
      'Il radiatore connesso Sauter Hekla abbina una facciata reattiva per una salita rapida in temperatura a un nucleo interno in ghisa ad alta inerzia, garantendo calore uniforme senza sbalzi né aria secca in stanze fino a circa 15 m².\n\nDotato di funzione di auto-apprendimento delle abitudini settimanali, illuminazione LED inferiore regolabile su 4 intensità e programmazione intelligente connessa, ottimizza i consumi elettrici quotidiani.',
    features: [
      'Tipo: Radiatore elettrico connesso',
      'Potenza: 1.500 W',
      'Tecnologia: Doppio nucleo riscaldante',
      'Nucleo principale: Ghisa',
      'Superficie indicativa: Fino a 15 m²',
      'Connesso: Sì',
      'Auto-apprendimento: Sì',
      'Illuminazione: LED, 4 intensità',
      'Categoria: Riscaldamento elettrico interno',
      'SKU: BRV-SAUTER-HEKLA-1500',
    ],
    conditioning: 'Radiatore connesso – 1.500 W',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Radiatore connesso – 1.500 W',
    googleCategory: 'Casa e giardino > Riscaldamento > Radiatori elettrici',
  },
  'radiateur-electrique-connecte-sauter-ipala-1500w': {
    name: 'Radiatore elettrico connesso a inerzia fluida Sauter Ipala – 1500 W',
    description:
      'Radiatore elettrico connesso Sauter Ipala da 1.500 W a inerzia fluida, progettato per mantenere un calore dolce, regolare e silenzioso negli ambienti domestici.',
    longDescription:
      'Grazie al circuito a fluido termovettore ad alta inerzia, il Sauter Ipala da 1.500 W diffonde un calore avvolgente, silenzioso e molto simile a quello di un impianto idronico tradizionale.\n\nPensato per camere da letto, studi e zone giorno con installazione a parete compatta, integra programmazione smart connessa per regolare la temperatura ambiente al grado.',
    features: [
      'Tipo: Radiatore elettrico',
      'Potenza: 1.500 W',
      'Tecnologia: Inerzia fluida',
      'Connesso: Sì',
      'Installazione: A parete',
      'Uso: Riscaldamento interno',
      'Categoria: Riscaldamento elettrico',
      'SKU: BRV-SAUTER-IPALA-1500',
    ],
    conditioning: 'Radiatore connesso a inerzia fluida – 1.500 W',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Radiatore connesso a inerzia fluida – 1.500 W',
    googleCategory: 'Casa e giardino > Riscaldamento > Radiatori elettrici',
  },
  'buches-densifiees-premium-palette-1000-kg': {
    name: 'Tronchetti di legno densificato Premium – Bancale 1.000 kg',
    description:
      'Tronchetti di legno densificato prodotti da segatura e trucioli asciutti ad alta compressione senza colla né additivi. Bassa umidità e alta densità per una combustione regolare.',
    longDescription:
      'Ottenuti per pura compressione meccanica di segatura e trucioli vergini senza colle né leganti chimici, questi tronchetti densificati presentano una densità di 1.000 kg/m³ e un tasso di umidità inferiore al 12 %, offrendo resa calorica costante e residuo minimo.\n\nIl formato cilindrico da 30 × 9 cm permette di dosare con precisione ogni ricarica di stufa, inserto o camino. Consegnato su bancale da 1.000 kg suddiviso in 66 confezioni pulite da 8 pezzi (circa 15,2 kg ciascuna).',
    features: [
      'Tipo: Tronchetti / bricchetti di legno densificato',
      'Peso totale: 1.000 kg',
      'Confezionamento: 66 confezioni su bancale',
      'Contenuto confezione: 8 tronchetti',
      'Peso per confezione: Circa 15,2 kg',
      'Materiale: Segatura e trucioli di legno asciutti',
      'Colla aggiunta: No',
      'Umidità: Meno del 12 %',
      'Lunghezza singolo tronchetto: Circa 30 cm',
      'Diametro: Circa 9 cm',
      'Densità dichiarata: 1.000 kg/m³',
      'Utilizzo: Stufa a legna, inserto, camino',
      'Categoria Braviko: Legna da ardere / Tronchetti densificati',
      'SKU: BRV-DENS-1000-JOUR',
    ],
    conditioning: '66 confezioni su bancale – 1.000 kg',
    deliveryInfo: 'Consegna in 5–8 giorni lavorativi su appuntamento',
    variantLabel: 'Bancale 1.000 kg – 66 confezioni',
    googleCategory: 'Casa e giardino > Riscaldamento > Combustibile da riscaldamento',
  },
  'buches-densifiees-nuit-eo2-palette-520-buches': {
    name: 'Tronchetti densificati da notte EO2 – Bancale da 520 pezzi',
    description:
      'Tronchetti densificati studiati per prolungare la combustione durante la notte o le assenze. Ottenuti da cortecce selezionate senza leganti per mantenere vive le braci e facilitare la riaccensione.',
    longDescription:
      'Studiati appositamente per le ore notturne o le assenze giornaliere, i tronchetti da notte EO2 impiegano corteccia selezionata e compressa senza alcun additivo: rilasciano braci lente e durature per 6–10 ore con due soli pezzi.\n\nCon umidità inferiore all’11 % e ceneri ridotte sotto il 3 %, evitano lo spegnimento completo del focolare e facilitano la ripartenza al mattino. Il bancale contiene 520 tronchetti ripartiti in 104 pacchi compatti da 5 pezzi.',
    features: [
      'Tipo: Tronchetti densificati da notte',
      'Quantità: 520 tronchetti',
      'Confezionamento: 104 pacchi × 5 tronchetti',
      'Materiale: Corteccia di legno selezionata',
      'Additivi / leganti: Nessuno dichiarato',
      'Lunghezza: 30 cm',
      'Diametro: 10 cm',
      'Umidità: Meno dell’11 %',
      'Residuo di ceneri: Meno del 3 %',
      'Durata combustione dichiarata: Circa 6–10 h con 2 tronchetti',
      'Utilizzo: Stufa a legna, inserto, cucina economica',
      'Categoria: Tronchetti densificati',
      'SKU Braviko: BRV-NUIT-EO2-520',
    ],
    conditioning: 'Bancale 520 tronchetti – 104 pacchi',
    deliveryInfo: 'Consegna in 5–8 giorni lavorativi su appuntamento',
    variantLabel: 'Bancale 520 tronchetti – 104 pacchi',
    googleCategory: 'Casa e giardino > Riscaldamento > Combustibile da riscaldamento',
  },
  'poele-granules-jolly-mec-6-kw-programmable': {
    name: 'Stufa a pellet Jolly Mec – 6 kW programmabile',
    description:
      'Stufa a pellet Jolly Mec compatta e programmabile con potenza di 6 kW e rendimento dichiarato del 90 %. Serbatoio da 18 kg, regolazione elettronica e programmazione automatica.',
    longDescription:
      'Compatta, stagna e canalizzabile, questa stufa a pellet Jolly Mec da 6 kW raggiunge un rendimento dichiarato del 90 % (classe energetica A+) modulando automaticamente la potenza tra 2,9 e 6,7 kW secondo la temperatura desiderata.\n\nIl serbatoio da 18 kg offre ampia autonomia, mentre telecomando incluso, modalità silenziosa e programmazione giornaliera, settimanale o weekend semplificano la gestione termica quotidiana.',
    features: [
      'Combustibile: Pellet di legno',
      'Potenza: 6 kW',
      'Intervallo dichiarato: 2,9–6,7 kW',
      'Rendimento: 90 %',
      'Capacità serbatoio: 18 kg',
      'Classe energetica: A+',
      'Stagna: Sì',
      'Canalizzabile: Sì',
      'Programmazione: Giornaliera / settimanale / weekend',
      'Regolazione: Elettronica',
      'Modalità silenziosa: Sì',
      'Telecomando: Incluso',
      'Uscita fumi: Ø80 mm',
      'Peso: 95 kg',
      'Normativa dichiarata: EN 14785',
      'Garanzia produttore dichiarata: 2 anni',
      'Categoria Braviko: Stufe a pellet',
      'SKU: BRV-JOLLY-6KW',
    ],
    conditioning: 'Stufa a pellet – 6 kW programmabile',
    deliveryInfo: 'Consegna in 6–10 giorni lavorativi su appuntamento',
    variantLabel: 'Stufa a pellet – 6 kW programmabile',
    googleCategory: 'Casa e giardino > Riscaldamento > Stufe a pellet',
  },
  'cheminee-electrique-purline-verre-noir-2000w': {
    name: 'Camino elettrico Purline – Vetro temperato nero 2000 W',
    description:
      'Camino elettrico decorativo con frontale in vetro temperato nero ed effetto fiamma, senza legna, fumo né cenere. Potenza fino a 2.000 W ideale per ambienti fino a circa 20 m².',
    longDescription:
      'Progettato per portare l’atmosfera del focolare in salotto o in camera senza canna fumaria, lavori murari né residui di cenere, il camino Purline combina un pannello frontale lucido in vetro temperato nero con un realistico effetto fiamma regolabile.\n\nLa potenza fino a 2.000 W riscalda rapidamente ambienti fino a circa 20 m² e può essere comandata comodamente a distanza tramite il telecomando in dotazione.',
    features: [
      'Tipo: Camino elettrico',
      'Potenza: 2000 W',
      'Alimentazione: Elettrica',
      'Superficie indicativa: 20 m²',
      'Frontale: Vetro temperato nero',
      'Effetto visivo: Fiamme',
      'Telecomando: Sì',
      'Installazione: Da appoggio',
      'Combustibile richiesto: Nessuno',
      'Categoria Braviko: Camini elettrici',
      'SKU: BRV-CHEM-PUR-2000',
    ],
    conditioning: 'Camino elettrico 2.000 W',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Camino elettrico 2.000 W',
    googleCategory: 'Casa e giardino > Riscaldamento > Camini elettrici',
  },
  'chauffage-exterieur-gaz-planika-faro-8-kw': {
    name: 'Riscaldatore da esterno a gas Planika Faro – 8 kW',
    description:
      'Riscaldatore da esterno a gas dal design contemporaneo con fiamma visibile a 360° e ruote con freno, ideale per scaldare terrazze, giardini e spazi aperti.',
    longDescription:
      'Con colonna in vetro temperato che valorizza la fiamma naturale a 360° e bruciatore GPL fino a 8 kW, il Planika Faro trasforma terrazze, verande aperte e giardini in ambienti accoglienti dalla mezza stagione all’inverno.\n\nOffre fino a 55 ore di autonomia dichiarata con una bombola standard protetta all’interno del basamento, con ruote dotate di freno e certificazione di sicurezza Kiwa.',
    features: [
      'Tipo: Riscaldatore da esterno a gas',
      'Marca: Planika',
      'Modello: Faro',
      'Potenza massima: 8 kW',
      'Combustibile: GPL',
      'Autonomia dichiarata: Fino a 55 h',
      'Fiamma visibile: 360°',
      'Mobilità: Ruote con freno',
      'Altezza: 146 cm',
      'Larghezza: 36 cm',
      'Profondità: 36 cm',
      'Certificazione dichiarata: Kiwa',
      'Uso: Giardino, terrazza, spazio esterno',
      'Categoria Braviko: Riscaldamento da esterno',
      'SKU: BRV-PLANIKA-FARO-8',
    ],
    conditioning: 'Riscaldatore da esterno a gas – 8 kW',
    deliveryInfo: 'Consegna in 5–8 giorni lavorativi su appuntamento',
    variantLabel: 'Riscaldatore da esterno a gas – 8 kW',
    googleCategory: 'Casa e giardino > Giardino > Riscaldatori da esterno',
  },
  'four-pizza-ofyr-100-cuisson-feu-bois': {
    name: 'Forno per pizza OFYR 100 – Cottura a legna',
    description:
      'Accessorio di cottura premium che trasforma un braciere OFYR compatibile in forno per pizza alimentato a legna, con pietra refrattaria, pala e campana a doppia parete.',
    longDescription:
      'Progettato su misura per i bracieri OFYR 100, questo kit trasforma in pochi istanti il focolare a legna in un autentico forno per pizza da esterno. La piastra inferiore in ghisa doppia faccia trasmette il calore direttamente alla pietra refrattaria garantendo basi croccanti e cotture rapide a fuoco vivo.\n\nLa campana superiore a doppia parete con pomello rotante permette di regolare il flusso d’aria e il calore interno con precisione, ed è fornita insieme alla pala dedicata per infornare e sfornare in sicurezza.',
    features: [
      'Tipo: Forno per pizza da esterno',
      'Energia: Calore del fuoco OFYR',
      'Compatibilità: OFYR 100',
      'Pietra per pizza: Inclusa',
      'Pala per pizza: Inclusa',
      'Piastra: Ghisa doppia faccia',
      'Campana: Doppia parete',
      'Circolazione aria: Regolabile',
      'Utilizzo: Cucina esterna',
      'Categoria: Cucina sul fuoco',
      'SKU: BRV-OFYR-PIZZA-100',
    ],
    conditioning: 'Forno per pizza OFYR 100',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Forno per pizza OFYR 100',
    googleCategory: 'Casa e giardino > Giardino > Forni per pizza da esterno',
  },
  'abri-buches-timbela-m985-414m2': {
    name: 'Legnaia con ripostiglio TIMBELA M985 – 4,14 m²',
    description:
      'Ampia legnaia da esterno che unisce uno spazio coperto per la legna da ardere e un ripostiglio chiuso su 4,14 m² complessivi per proteggere combustibile e attrezzi.',
    longDescription:
      'Soluzione due-in-uno su una superficie totale di 4,14 m² (120 × 345 × 220 cm), la struttura TIMBELA M985 affianca un’ampia tettoia laterale ventilata per mantenere asciutta la scorta di ceppi a una rimessa chiusa per spaccalegna, attrezzi da giardino o pacchi di pellet.\n\nProgettata per l’installazione esterna in giardino, permette di tenere combustibile e attrezzatura invernale protetti da pioggia e umidità in un unico volume ordinato.',
    features: [
      'Tipo: Legnaia + ripostiglio',
      'Modello: TIMBELA M985',
      'Superficie: 4,14 m²',
      'Dimensioni: 120 × 345 × 220 cm',
      'Colore: Marrone naturale (Terra Brown)',
      'Uso: Esterno',
      'Funzione: Stoccaggio legna + rimessa',
      'Codice modello: M985-TERRA BROWN',
      'Categoria: Stoccaggio esterno',
      'SKU: BRV-TIMBELA-M985-TB',
    ],
    conditioning: 'Legnaia con ripostiglio – 4,14 m²',
    deliveryInfo: 'Consegna in 7–12 giorni lavorativi su appuntamento',
    variantLabel: 'Legnaia con ripostiglio – 4,14 m²',
    googleCategory: 'Casa e giardino > Giardino > Casette e legnaie',
  },
  'foyer-bois-panoramique-acaminetti-flat-150x50': {
    name: 'Focolare panoramico a legna A.Caminetti Flat 150 × 50',
    description:
      'Focolare panoramico a legna di grande formato per progetti di camini di design, con vetro ceramico resistente fino a 800 °C e potenza termica elevata per ampi volumi.',
    longDescription:
      'Con luce frontale panoramica da 150 × 50 cm e potenza compresa tra 17 e 25 kW, il focolare A.Caminetti Flat nasce per grandi living e progetti architettonici su misura che uniscono forte presenza scenica della fiamma e resa termica elevata (81 % dichiarato, certificazione Ecodesign).\n\nCostruito con massa termica da 461 kg, vetro ceramico resistente fino a 800 °C, presa d’aria Ø160 mm e uscita fumi Ø250 mm, beneficia di una garanzia dichiarata del produttore di 5 anni.',
    features: [
      'Tipo: Focolare panoramico a legna',
      'Combustibile: Legna / bricchetti',
      'Potenza dichiarata: 17–25 kW',
      'Rendimento dichiarato: 81 %',
      'Consumo: 5,4 kg/h',
      'Vetro: Ceramico, resistenza dichiarata 800 °C',
      'Scarico fumi: Ø250 mm',
      'Presa d’aria: Ø160 mm',
      'Peso: 461 kg',
      'Certificazione dichiarata: Ecodesign',
      'Garanzia dichiarata: 5 anni',
      'Categoria: Focolari & camini',
      'SKU: BRV-AC-FLAT15050',
    ],
    conditioning: 'Focolare panoramico a legna – 150 × 50',
    deliveryInfo: 'Consegna in 7–12 giorni lavorativi su appuntamento',
    variantLabel: 'Focolare panoramico a legna – 150 × 50',
    googleCategory: 'Casa e giardino > Riscaldamento > Camini e focolari',
  },
  'chariot-buches-le-marquier-fjord-noir': {
    name: 'Carrello portalegna Le Marquier Fjord – Nero',
    description:
      'Carrello portalegna dal design contemporaneo progettato per trasportare comodamente la legna dal deposito e riporla con eleganza vicino al camino o alla stufa.',
    longDescription:
      'Prodotto in Francia con finitura sobria nera opaca, il carrello Le Marquier Fjord facilita il trasporto dei ceppi dal punto di stoccaggio esterno direttamente accanto alla stufa o al camino senza sporcare il pavimento.\n\nLe linee verticali essenziali si integrano con naturalezza negli interni contemporanei, fungendo sia da pratico carrello su ruote sia da portalegna fisso accanto al focolare.',
    features: [
      'Tipo: Carrello / portalegna',
      'Modello: Fjord',
      'Colore: Nero',
      'Funzione: Trasporto e stoccaggio',
      'Uso: Interno',
      'Produzione dichiarata: Francia',
      'Categoria: Ordine & trasporto legna',
      'SKU: BRV-LM-FJORD-NOIR',
    ],
    conditioning: 'Carrello portalegna Fjord – Nero',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Carrello portalegna Fjord – Nero',
    googleCategory: 'Casa e giardino > Riscaldamento > Accessori per camino',
  },
  'chauffage-infrarouge-exterieur-frico-term-ip67-2000w': {
    name: 'Riscaldatore a infrarossi FRICO Term IP67 – 2000 W',
    description:
      'Riscaldatore a infrarossi da parete da 2.000 W per terrazze e spazi esterni con grado di protezione impermeabile IP67 e tecnologia a ridotta emissione di luce rossa.',
    longDescription:
      'Compatto, leggero (2,3 kg) e resistente alle intemperie grazie al corpo in alluminio certificato IP67, il FRICO Term 2000 W trasmette calore radiante immediato a onde corte coprendo fino a 8 m² su terrazze, pergole e dehor.\n\nLa lampada Ultra Low Glare abbatte fino all’80 % l’abbagliamento rosso rispetto agli apparecchi tradizionali, mantenendo un comfort visivo discreto durante le serate all’aperto.',
    features: [
      'Tipo: Riscaldatore a infrarossi',
      'Potenza: 2000 W',
      'Alimentazione: 230 V',
      'Protezione: IP67',
      'Tecnologia: Ultra Low Glare (basso abbagliamento)',
      'Riduzione luce rossa dichiarata: Fino all’80 %',
      'Copertura massima dichiarata: 8 m²',
      'Corpo: Alluminio',
      'Installazione: A parete',
      'Dimensioni: 610 × 125 × 95 mm',
      'Peso: 2,3 kg',
      'Uso: Terrazza / patio / esterno',
      'Categoria: Riscaldamento da esterno',
      'SKU: BRV-FRICO-TERM-2000',
    ],
    conditioning: 'Riscaldatore infrarossi da parete – 2.000 W',
    deliveryInfo: 'Consegna in 3–5 giorni lavorativi',
    variantLabel: 'Riscaldatore infrarossi da parete – 2.000 W',
    googleCategory: 'Casa e giardino > Giardino > Riscaldatori da esterno',
  },
  'fendeur-buches-scheppach-compact-10t-3150w': {
    name: 'Spaccalegna Scheppach Compact 10T – 3150 W',
    description:
      'Spaccalegna verticale elettrico da 10 tonnellate a 230 V, progettato per lavorare ceppi fino a 107 cm di lunghezza e 38 cm di diametro.',
    longDescription:
      'Pensato per preparare in autonomia scorte consistenti di legna da ardere, lo Scheppach Compact 10T sviluppa 10 tonnellate di spinta idraulica (256 bar) alimentato su comune presa domestica monofase a 230 V tramite motore da 3.150 W.\n\nLa struttura verticale compatta accoglie tronchi fino a 107 cm di lunghezza e 38 cm di diametro, consentendo di ridurre rapidamente ceppi di quercia, faggio o carpino nelle pezzature ideali per stufa e camino.',
    features: [
      'Marca: Scheppach',
      'Modello: Compact 10T',
      'Forza di spacco: 10 tonnellate',
      'Potenza: 3150 W',
      'Alimentazione: 230 V',
      'Lunghezza max. ceppi: 1070 mm',
      'Diametro max.: 380 mm',
      'Pressione idraulica: 256 bar',
      'Posizione: Verticale',
      'Categoria: Attrezzi legna / Spaccalegna',
      'SKU Braviko: BRV-SCHEPPACH-C10T',
    ],
    conditioning: 'Spaccalegna verticale – 10 tonnellate',
    deliveryInfo: 'Consegna in 5–8 giorni lavorativi su appuntamento',
    variantLabel: 'Spaccalegna verticale – 10 tonnellate',
    googleCategory: 'Casa e giardino > Giardino > Spaccalegna',
  },
  'test-paiement-1-euro': {
    name: 'Test di pagamento - 1 euro',
    description: 'Articolo temporaneo per verificare un pagamento reale. Nessun prodotto fisico sarà spedito.',
    longDescription:
      'Test interno del carrello e del pagamento con carta. Importo reale addebitato: 1 euro. Nessuna spedizione fisica.',
    features: [],
    conditioning: 'Test interno',
    deliveryInfo: 'Nessuna spedizione: solo test di pagamento.',
    variantLabel: 'Test singolo - senza spedizione',
    googleCategory: 'Casa e giardino',
  },
}

const VARIANT_LABEL_TO_ITALIAN: Record<string, string> = {
  'Palette de 2 stères – bûches 33 cm': 'Bancale da 2 steri – ceppi da 33 cm',
  'Palette 990 kg – 66 sacs de 15 kg': 'Bancale 990 kg – 66 sacchi da 15 kg',
  'Poêle à bois fonte – 8 kW': 'Stufa a legna in ghisa – 8 kW',
  'Brasero plancha Corten Ø100 cm': 'Braciere plancha Corten Ø100 cm',
  'Range-bûches vertical Corten 100': 'Portalegna verticale Corten 100',
  'Insert à bois fonte – 10 kW': 'Inserto a legna in ghisa – 10 kW',
  'Anneau de protection OFYR 100 – Teck': 'Anello protettivo OFYR 100 – Teak',
  'Cage de cuisson OFYR 100': 'Gabbia di cottura OFYR 100',
  'Barbecue Kamado XL Luxe – Céramique': 'Barbecue Kamado XL Luxe – Ceramica',
  'Radiateur connecté – 1 500 W': 'Radiatore connesso – 1.500 W',
  'Radiateur connecté à inertie fluide – 1 500 W': 'Radiatore connesso a inerzia fluida – 1.500 W',
  'Palette 1 000 kg – 66 packs': 'Bancale 1.000 kg – 66 confezioni',
  'Palette 520 bûches – 104 paquets': 'Bancale 520 tronchetti – 104 pacchi',
  'Poêle à granulés – 6 kW programmable': 'Stufa a pellet – 6 kW programmabile',
  'Cheminée électrique 2 000 W': 'Camino elettrico 2.000 W',
  'Chauffage extérieur gaz – 8 kW': 'Riscaldatore da esterno a gas – 8 kW',
  'Four à pizza OFYR 100': 'Forno per pizza OFYR 100',
  'Abri à bûches avec remise – 4,14 m²': 'Legnaia con ripostiglio – 4,14 m²',
  'Foyer à bois panoramique – 150 × 50': 'Focolare panoramico a legna – 150 × 50',
  'Chariot à bûches Fjord – Noir': 'Carrello portalegna Fjord – Nero',
  'Chauffage infrarouge mural – 2 000 W': 'Riscaldatore infrarossi da parete – 2.000 W',
  'Fendeur de bûches vertical – 10 tonnes': 'Spaccalegna verticale – 10 tonnellate',
  'Test unique - sans expedition': 'Test singolo - senza spedizione',
}

export function getItalianProductOverride(slug?: string | null): ItalianProductOverride | undefined {
  if (!slug) return undefined
  return ITALIAN_PRODUCT_OVERRIDES[slug]
}

export function translateVariantLabel(label?: string | null, slug?: string | null): string {
  const raw = label?.trim() || ''
  if (raw && VARIANT_LABEL_TO_ITALIAN[raw]) {
    return VARIANT_LABEL_TO_ITALIAN[raw]
  }
  const bySlug = getItalianProductOverride(slug)?.variantLabel
  if (bySlug) {
    return bySlug
  }
  if (!raw) return ''
  return raw
    .replace(/\bPalette de\b/gi, 'Bancale da')
    .replace(/\bPalette\b/gi, 'Bancale')
    .replace(/\bstères\b/gi, 'steri')
    .replace(/\bstère\b/gi, 'stero')
    .replace(/\bbûches\b/gi, 'ceppi')
    .replace(/\bbûche\b/gi, 'ceppo')
    .replace(/\bsacs de\b/gi, 'sacchi da')
    .replace(/\bsacs\b/gi, 'sacchi')
    .replace(/\bpaquets\b/gi, 'pacchi')
    .replace(/\bpacks\b/gi, 'confezioni')
    .replace(/\bTest unique - sans expedition\b/gi, 'Test singolo - senza spedizione')
}
