export type DeliveryCategory = 'pallet' | 'heavy_freight' | 'parcel'

export type RichProductSpec = {
  unitPriceLabel?: string
  badgeText: string
  delivery: {
    delay: string
    type: DeliveryCategory
    headline: string
    carrierNotice: string
  }
  usageTips: string[]
  storageAdvice: string
  detailedSpecs: Array<{ label: string; value: string }>
  warranty: string
  relatedSlugs: string[]
}

export const productRichSpecs: Record<string, RichProductSpec> = {
  'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm': {
    unitPriceLabel: 'Ovvero 104,50 € / stero (bancale da 2 steri)',
    badgeText: 'Disponibile — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
      type: 'pallet',
      headline: 'Consegna su bancale con sponda idraulica e transpallet',
      carrierNotice:
        'Il corriere ti contatta via SMS o telefono per concordare il giorno di consegna. Scarico a piano strada o su vialetto carrabile con fondo piano e duro (asfalto, cemento, autobloccanti).',
    },
    usageTips: [
      'Prediligi l’accensione dall’alto (top-down): ceppi grandi sotto, legna da accensione e accendifuoco naturale sopra.',
      'Lascia l’aria primaria completamente aperta per i primi 15 minuti per formare un letto di braci ardenti.',
      'Questo mix bilanciato di quercia, carpino e faggio garantisce fiamma viva e braci a lunghissima tenuta.',
    ],
    storageAdvice:
      'Conserva sul bancale originale sollevato da terra, sotto una tettoia ventilata e aperta ai lati. Evita di coprire ermeticamente la legna per permettere il ricircolo d’aria.',
    detailedSpecs: [
      { label: 'Essenze legnose', value: '100% latifoglie dure (Quercia, Carpino, Faggio)' },
      { label: 'Origine', value: 'Foreste europee gestite in modo sostenibile (PEFC / FSC)' },
      { label: 'Lunghezza dei ceppi', value: '33 cm (+/- 2 cm)' },
      { label: 'Tasso di umidità', value: 'Inferiore al 20% garantito (essiccazione in forno a biomassa)' },
      { label: 'Volume consegnato', value: 'Bancale da 2 steri (circa 1,4 m³ accatastati)' },
      { label: 'Potere calorifico (PCI)', value: 'Circa 4,2 kWh / kg' },
      { label: 'Apparecchi compatibili', value: 'Stufe a legna, inserti, focolari chiusi, camini tradizionali' },
      { label: 'Stato alla consegna', value: 'Pronta per l’uso immediato' },
      { label: 'Confezionamento', value: 'Bancale a perdere reggiato e filmato' },
    ],
    warranty: 'Umidità certificata < 20% garantita',
    relatedSlugs: [
      'granules-bois-premium-6mm-palette-990-kg',
      'buches-densifiees-premium-palette-1000-kg',
      'buches-densifiees-nuit-eo2-palette-520-buches',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'granules-bois-premium-6mm-palette-990-kg': {
    unitPriceLabel: 'Ovvero 0,44 € / kg (6,62 € / sacco da 15 kg)',
    badgeText: 'Disponibile — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
      type: 'pallet',
      headline: 'Consegna su bancale completo con sponda idraulica e transpallet',
      carrierNotice:
        'Appuntamento telefonico preventivo. Bancale impermeabilizzato da 66 sacchi da 15 kg scaricato con transpallet all’ingresso dell’abitazione o del garage accessibile.',
    },
    usageTips: [
      'Versa con delicatezza i sacchi nel serbatoio per ridurre la formazione di polvere di segatura.',
      'Pulisci il braciere della stufa ogni 2–3 giorni per mantenere ottimale il flusso d’aria.',
      'Mantieni i parametri di combustione adeguati al modello della tua stufa.',
    ],
    storageAdvice:
      'Conserva tassativamente all’asciutto, in locale temperato o garage al riparo dall’umidità. Non appoggiare mai i sacchi a diretto contatto con pavimento umido.',
    detailedSpecs: [
      { label: 'Composizione', value: '100% puro legno resinoso vergine, senza colle né leganti chimici' },
      { label: 'Certificazione ufficiale', value: 'ENplus A1 & DINplus (qualità superiore)' },
      { label: 'Diametro del pellet', value: '6 mm (+/- 0,5 mm)' },
      { label: 'Potere calorifico (PCI)', value: 'Superiore a 4,9 kWh / kg' },
      { label: 'Residuo ceneri', value: 'Inferiore o uguale allo 0,5%' },
      { label: 'Umidità', value: 'Inferiore o uguale all’8%' },
      { label: 'Durabilità meccanica', value: 'Superiore al 98% (minima polverosità)' },
      { label: 'Confezionamento', value: 'Bancale da 66 sacchi da 15 kg (Peso netto: 990 kg)' },
      { label: 'Apparecchi compatibili', value: 'Tutte le stufe, inserti e caldaie a pellet standard 6 mm' },
    ],
    warranty: 'Conformità certificata ENplus A1 / DINplus',
    relatedSlugs: [
      'poele-granules-jolly-mec-6-kw-programmable',
      'buches-densifiees-premium-palette-1000-kg',
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
    ],
  },

  'poele-bois-fonte-bronpi-karen-8-kw': {
    unitPriceLabel: 'IVA inclusa — Installazione a norma secondo le disposizioni vigenti',
    badgeText: 'Disponibile — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 6–10 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Corriere specializzato con scarico a piano strada',
      carrierNotice:
        'Prodotto pesante (157 kg). Consegna su bancale reggiato e rinforzato. Il corriere contatta il cliente per concordare la fascia oraria con mezzo dotato di sponda idraulica.',
    },
    usageTips: [
      'Effettua le prime accensioni in modo graduale a carico moderato per stabilizzare la ghisa e la vernice termica.',
      'Utilizza legna secca (< 20% umidità) per sfruttare la tripla combustione e mantenere pulito il vetro.',
      'Fai spazzolare regolarmente la canna fumaria secondo la normativa vigente.',
    ],
    storageAdvice:
      'Posizionamento su pavimento incombustibile (pedana in vetro temperato o acciaio consigliata su parquet). Rispetta una distanza minima di 40 cm dai materiali combustibili.',
    detailedSpecs: [
      { label: 'Marca e Modello', value: 'Bronpi — KAREN 8 kW' },
      { label: 'Materiale corpo', value: 'Ghisa ad alta resistenza monoblocco' },
      { label: 'Potenza nominale', value: '8 kW (modulabile da 5 a 10 kW)' },
      { label: 'Rendimento energetico', value: '82% (alta efficienza)' },
      { label: 'Volume riscaldabile', value: 'Fino a 200 m³ (circa 80 m²)' },
      { label: 'Lunghezza max ceppi', value: '50 cm' },
      { label: 'Sistema di combustione', value: 'Tripla combustione con sistema vetro pulito' },
      { label: 'Presa d’aria esterna', value: 'Sì — canalizzabile dall’esterno per case ermetiche' },
      { label: 'Scarico fumi', value: 'Ø 150 mm (uscita superiore o posteriore)' },
      { label: 'Peso netto', value: '157 kg' },
      { label: 'Classe energetica', value: 'A+ (Norma EcoDesign 2022)' },
    ],
    warranty: 'Garanzia produttore 5 anni sul corpo in ghisa',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'ofyr-wood-storage-corten-100-range-buches',
      'chariot-buches-le-marquier-fjord-noir',
      'fendeur-buches-scheppach-compact-10t-3150w',
    ],
  },

  'brasero-plancha-le-bigorneau-acier-corten-100-cm': {
    unitPriceLabel: 'Completo di base Corten e griglia centrale',
    badgeText: 'Disponibile in fabbrica — Spedizione in 72h',
    delivery: {
      delay: 'Consegna in 6–10 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Consegna su bancale protetto con sponda idraulica',
      carrierNotice:
        'Il set completo (135 kg) viaggia protetto su bancale in legno con scarico davanti alla proprietà. Prevedere due persone per posizionare la piastra di cottura.',
    },
    usageTips: [
      'Al primo utilizzo esegui la stagionatura della plancha scaldando la piastra e stendendo un velo di olio vegetale ad alto punto di fumo.',
      'Alimenta il braciere con legna secca (quercia o carpino) tagliata in ceppi da 25–33 cm.',
      'Dopo ogni cottura raschia i residui verso il centro e passa un filo d’olio per proteggere l’acciaio.',
    ],
    storageAdvice:
      'L’acciaio Corten è progettato per restare all’aperto tutto l’anno sviluppando una patina protettiva naturale. Pulisci e olia leggermente la piastra prima dei lunghi periodi di inutilizzo.',
    detailedSpecs: [
      { label: 'Marca e Produzione', value: 'France Braseros — Progettato e assemblato in Francia' },
      { label: 'Materiale base', value: 'Vero acciaio Corten auto-patinante ad alta resistenza' },
      { label: 'Piastra di cottura', value: 'Acciaio smaltato alimentare ad alto spessore (10 mm)' },
      { label: 'Diametro plancha', value: '100 cm (ideale per 10–15 ospiti)' },
      { label: 'Griglia centrale', value: 'Inclusa (diametro 44,5 cm per cottura diretta)' },
      { label: 'Altezza totale', value: '92 cm' },
      { label: 'Peso totale', value: '135 kg' },
      { label: 'Combustibile', value: 'Legna da ardere secca o carbonella naturale' },
    ],
    warranty: 'Garanzia 2 anni su struttura e piastra',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'ofyr-fire-guard-ring-100-teck',
      'four-pizza-ofyr-100-cuisson-feu-bois',
      'ofyr-cage-100-accessoire-cuisson',
    ],
  },

  'ofyr-wood-storage-corten-100-range-buches': {
    unitPriceLabel: 'Struttura architettonica 100 × 216 cm',
    badgeText: 'Disponibile — Spedizione rapida',
    delivery: {
      delay: 'Consegna in 5–9 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Consegna su bancale protetto con appuntamento',
      carrierNotice: 'Scarico a piano strada tramite corriere specializzato con sponda idraulica.',
    },
    usageTips: [
      'Impila i ceppi in modo ordinato alternando gli strati per massimizzare la stabilità della colonna.',
      'Sfrutta il vano superiore chiuso per custodire all’asciutto accendifuoco, guanti termici e legnetti.',
    ],
    storageAdvice:
      'Fissaggio a parete obbligatorio mediante i punti di ancoraggio posteriori previsti per garantire la massima sicurezza anti-ribaltamento.',
    detailedSpecs: [
      { label: 'Marca e Design', value: 'OFYR (Paesi Bassi)' },
      { label: 'Materiale', value: 'Acciaio Corten di elevato spessore ad uso architettonico' },
      { label: 'Larghezza', value: '100 cm' },
      { label: 'Altezza', value: '216 cm' },
      { label: 'Profondità', value: '45 cm' },
      { label: 'Peso netto', value: '98 kg' },
      { label: 'Capacità di carico', value: 'Circa 1 stero di ceppi da 25 a 40 cm' },
      { label: 'Vano accessori', value: 'Ripiano superiore chiuso integrato' },
      { label: 'Utilizzo', value: 'Interno ed esterno (resistente a gelo e intemperie)' },
    ],
    warranty: 'Garanzia 2 anni OFYR',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'chariot-buches-le-marquier-fjord-noir',
      'abri-buches-timbela-m985-414m2',
    ],
  },

  'insert-bois-invicta-p947044-10-kw': {
    unitPriceLabel: 'Fabbricazione francese Invicta — EcoDesign 2022',
    badgeText: 'Disponibile in fabbrica — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 6–10 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Corriere per carichi pesanti con scarico a piano strada',
      carrierNotice: 'Prodotto da 132 kg consegnato su bancale rinforzato. Appuntamento telefonico preventivo.',
    },
    usageTips: [
      'Ideale per riqualificare un camino aperto aumentando fino a 4 volte l’efficienza termica.',
      'Pulisci il vetro con un panno umido passato nella cenere fine bianca per un risultato impeccabile senza detergenti chimici.',
    ],
    storageAdvice:
      'Installazione consigliata a cura di un tecnico abilitato per garantire l’intubazione conforme (Ø 200 mm) secondo la normativa vigente.',
    detailedSpecs: [
      { label: 'Marca e Origine', value: 'Invicta — Fonderia francese nelle Ardenne dal 1924' },
      { label: 'Codice prodotto', value: 'Invicta P947044 (700 Grande Vision) — 10 kW' },
      { label: 'Materiale focolare', value: 'Ghisa e acciaio ad alta resistenza' },
      { label: 'Potenza termica', value: '10 kW nominale (modulabile 6,5–15 kW — rendimento 76%)' },
      { label: 'Lunghezza ceppi', value: 'Fino a 60 cm (caricamento frontale)' },
      { label: 'Diametro uscita fumi', value: 'Ø 200 mm' },
      { label: 'Dimensioni esterne', value: 'L 69,2 cm × H 61,4 cm × P 45,85 cm' },
      { label: 'Peso netto', value: '132 kg' },
      { label: 'Certificazione', value: 'EcoDesign 2022 / Flamme Verte 7 stelle' },
    ],
    warranty: 'Garanzia 5 anni produttore Invicta',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'buches-densifiees-premium-palette-1000-kg',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'ofyr-fire-guard-ring-100-teck': {
    unitPriceLabel: 'Accessorio originale OFYR 100',
    badgeText: 'Disponibile — Spedizione in 24h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Consegna rapida tracciata a domicilio',
      carrierNotice: 'Collo protetto e tracciato consegnato con firma al destinatario.',
    },
    usageTips: [
      'Si fissa facilmente con i 6 morsetti regolabili in acciaio inox intorno alla piastra calda.',
      'Offre una barriera protettiva antiscottatura e un comodo ripiano di appoggio per piatti e utensili.',
    ],
    storageAdvice:
      'Tratta il teak 1–2 volte l’anno con olio protettivo specifico per esterni per mantenerne la tonalità naturale.',
    detailedSpecs: [
      { label: 'Marca', value: 'OFYR' },
      { label: 'Compatibilità', value: 'Tutti i modelli OFYR 100' },
      { label: 'Materiale', value: 'Teak massiccio certificato resistente alle intemperie' },
      { label: 'Larghezza bordo', value: '12,5 cm' },
      { label: 'Sistema di fissaggio', value: '6 morsetti inox antigraffio' },
      { label: 'Smontabile', value: 'Sì, rimozione rapida in pochi secondi senza attrezzi' },
    ],
    warranty: 'Garanzia 2 anni',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'ofyr-cage-100-accessoire-cuisson',
      'four-pizza-ofyr-100-cuisson-feu-bois',
    ],
  },

  'ofyr-cage-100-accessoire-cuisson': {
    unitPriceLabel: 'Accessorio originale per cotture sospese',
    badgeText: 'Disponibile — Spedizione in 24h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Spedizione tracciata rapida a domicilio',
      carrierNotice: 'Imballo rinforzato antiurto con tracciamento online.',
    },
    usageTips: [
      'Posiziona la struttura al centro del braciere per appendere tagli di carne, pesce intero o pollame sopra la fiamma.',
      'Sfrutta l’aroma del legno duro (quercia o faggio) per una leggera affumicatura naturale.',
    ],
    storageAdvice: 'Pulisci con acqua calda e sapone dopo il raffreddamento e riponi al riparo dall’umidità.',
    detailedSpecs: [
      { label: 'Marca', value: 'OFYR' },
      { label: 'Modello', value: 'Cage 100 Cooking Accessory' },
      { label: 'Compatibilità', value: 'Bracieri OFYR 100' },
      { label: 'Materiale', value: 'Acciaio al carbonio resistente alle alte temperature' },
      { label: 'Dotazione', value: 'Gabbia verticale e barre trasversali di sospensione' },
    ],
    warranty: 'Garanzia 2 anni',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'four-pizza-ofyr-100-cuisson-feu-bois',
      'ofyr-fire-guard-ring-100-teck',
    ],
  },

  'barbecue-kamado-bee-grill-xl-luxe-ceramique': {
    unitPriceLabel: 'Set Luxe completo — Ceramica garantita a vita',
    badgeText: 'Disponibile — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 6–10 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Consegna assicurata su bancale con sponda e appuntamento',
      carrierNotice:
        'Spedizione su bancale rinforzato ad alta protezione (peso: 78 kg). Il corriere contatta il cliente per fissare il giorno di scarico.',
    },
    usageTips: [
      'Utilizza esclusivamente carbonella naturale a pezzatura grossa. Evita accendifuoco chimici liquidi per non impregnare la ceramica.',
      'Regola la temperatura al grado tramite le bocchette inferiore e superiore (da 80°C per affumicatura lenta a 400°C per scottare).',
    ],
    storageAdvice:
      'Copri con il telo impermeabile incluso una volta che il kamado è completamente freddo.',
    detailedSpecs: [
      { label: 'Marca e Modello', value: 'Bee Grill — Kamado XL Luxe Ceramica' },
      { label: 'Diametro esterno', value: '55 cm (Griglia di cottura Ø 47 cm)' },
      { label: 'Materiale principale', value: 'Ceramica refrattaria mullite ad alta densità' },
      { label: 'Telaio e minuteria', value: 'Acciaio inox satinato nero anticorrosione' },
      { label: 'Ripiani laterali', value: 'Noce massiccio pieghevoli con ganci portautensili' },
      { label: 'Accessori inclusi', value: 'Carrello a 4 ruote con freno, telo luxe, deflettore 2 zone, pinza griglia' },
      { label: 'Altezza totale', value: '122 cm' },
      { label: 'Peso netto', value: '78 kg' },
    ],
    warranty: 'Ceramica garantita a vita / 2 anni sulla componentistica',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'four-pizza-ofyr-100-cuisson-feu-bois',
      'chauffage-exterieur-gaz-planika-faro-8-kw',
    ],
  },

  'radiateur-electrique-connecte-sauter-hekla-1500w': {
    unitPriceLabel: 'Calore dolce in ghisa connessa — Gestione smart',
    badgeText: 'Disponibile — Spedizione in 24/48h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Consegna assicurata con tracciamento corriere',
      carrierNotice: 'Imballo rinforzato antiurto consegnato con firma alla consegna.',
    },
    usageTips: [
      'Associa il radiatore allo smartphone tramite l’app gratuita Sauter Cozytouch per programmare fasce orarie e monitorare i consumi.',
      'Attiva il rilevamento automatico finestra aperta per interrompere il riscaldamento durante il ricambio d’aria.',
    ],
    storageAdvice: 'Installazione a parete rapida tramite la dima di fissaggio inclusa nella confezione.',
    detailedSpecs: [
      { label: 'Marca e Origine', value: 'Sauter — Fabbricato in Francia' },
      { label: 'Modello', value: 'Hekla 1500 W Connesso' },
      { label: 'Tecnologia', value: 'Doppio nucleo riscaldante (ghisa a inerzia + pannello frontale)' },
      { label: 'Potenza', value: '1.500 Watt' },
      { label: 'Superficie indicativa', value: 'Ambienti fino a 15 m² (soggiorno, camera, studio)' },
      { label: 'Connettività', value: 'Wi-Fi integrato compatibile Cozytouch (iOS & Android)' },
      { label: 'Luce d’ambiente', value: 'LED indiretto inferiore (4 intensità)' },
      { label: 'Dimensioni', value: '104 cm × 59 cm × 14 cm' },
      { label: 'Peso', value: '23 kg' },
      { label: 'Normative', value: 'NF Électricité Performance *** / Classe II / IP24' },
    ],
    warranty: 'Garanzia 2 anni produttore Sauter',
    relatedSlugs: [
      'radiateur-electrique-connecte-sauter-ipala-1500w',
      'cheminee-electrique-purline-verre-noir-2000w',
      'poele-bois-fonte-bronpi-karen-8-kw',
    ],
  },

  'radiateur-electrique-connecte-sauter-ipala-1500w': {
    unitPriceLabel: 'Inerzia fluida termovettore — Comfort costante silenzioso',
    badgeText: 'Disponibile — Spedizione in 24/48h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Consegna assicurata con codice di tracciamento',
      carrierNotice: 'Imballo ad alta protezione consegnato con firma.',
    },
    usageTips: [
      'Perfetto per la zona notte grazie al funzionamento totalmente silenzioso e al calore uniforme che non secca l’aria.',
      'Imposta 19°C in modalità comfort e 16°C in modalità eco per bilanciare benessere ed efficienza.',
    ],
    storageAdvice: 'Mantieni il radiatore in posizione verticale prima e durante il fissaggio per il perfetto equilibrio del fluido.',
    detailedSpecs: [
      { label: 'Marca', value: 'Sauter (Francia)' },
      { label: 'Modello', value: 'Ipala 1500 W Inerzia Fluida' },
      { label: 'Tecnologia', value: 'Fluido minerale termovettore senza manutenzione' },
      { label: 'Potenza', value: '1.500 W' },
      { label: 'Superficie consigliata', value: 'Ambienti da 12 a 18 m²' },
      { label: 'Connettività', value: 'Compatibile app Sauter Cozytouch' },
      { label: 'Dimensioni', value: '88 cm × 58 cm × 12 cm' },
      { label: 'Peso', value: '17 kg' },
      { label: 'Norme', value: 'NF Électricité / Classe II / IP24' },
    ],
    warranty: 'Garanzia 2 anni produttore',
    relatedSlugs: [
      'radiateur-electrique-connecte-sauter-hekla-1500w',
      'cheminee-electrique-purline-verre-noir-2000w',
    ],
  },

  'buches-densifiees-premium-palette-1000-kg': {
    unitPriceLabel: 'Ovvero 0,44 € / kg (6,65 € per confezione da 8 tronchetti)',
    badgeText: 'Disponibile — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
      type: 'pallet',
      headline: 'Consegna su bancale da una tonnellata con sponda e transpallet',
      carrierNotice:
        'Bancale da 66 confezioni sigillate (1.000 kg netti) scaricato a terra con transpallet su superficie asfaltata o piana.',
    },
    usageTips: [
      'Inserisci un solo tronchetto densificato alla volta: bruciando si espande leggermente sprigionando il calore di 3–4 ceppi tradizionali.',
      'Accensione rapida con un accendifuoco naturale sotto un tronchetto spezzato a metà.',
    ],
    storageAdvice:
      'Conservare tassativamente in luogo asciutto (garage, cantina ventilata o ripostiglio). Il legno compresso teme l’umidità diretta.',
    detailedSpecs: [
      { label: 'Tipo di prodotto', value: 'Tronchetti densificati da giorno ad alto rendimento' },
      { label: 'Materia prima', value: '100% segatura e trucioli puri di quercia e faggio, senza colla' },
      { label: 'Confezionamento', value: 'Bancale da 66 confezioni da 8 tronchetti (Peso totale: 1.000 kg)' },
      { label: 'Potere calorifico (PCI)', value: 'Circa 5,0 kWh / kg' },
      { label: 'Tasso di umidità', value: 'Inferiore al 10% (combustione pulita)' },
      { label: 'Residuo ceneri', value: 'Meno dell’1% (vetro e canna più puliti)' },
      { label: 'Dimensioni tronchetto', value: 'Lunghezza circa 30 cm × Diametro circa 9 cm' },
      { label: 'Apparecchi compatibili', value: 'Stufe a legna, inserti, cucine economiche e camini' },
    ],
    warranty: '100% naturale senza collanti certificato',
    relatedSlugs: [
      'buches-densifiees-nuit-eo2-palette-520-buches',
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'granules-bois-premium-6mm-palette-990-kg',
    ],
  },

  'buches-densifiees-nuit-eo2-palette-520-buches': {
    unitPriceLabel: 'Ovvero 0,86 € / tronchetto (lunga durata 6–10 h)',
    badgeText: 'Disponibile — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
      type: 'pallet',
      headline: 'Consegna su bancale completo con sponda e transpallet',
      carrierNotice: 'Appuntamento concordato con il corriere per carichi pesanti. Scarico davanti all’abitazione.',
    },
    usageTips: [
      'Adagia 1 o 2 tronchetti da notte su un buon letto di braci calde prima di dormire o di uscire.',
      'Riduci al minimo le prese d’aria: il tronchetto brucia lentamente per 6–10 ore mantenendo un calore costante.',
      'Al mattino riapri l’aria e aggiungi legna classica per ravvivare subito il fuoco senza riaccendere.',
    ],
    storageAdvice: 'Conserva in ambiente asciutto e aerato, al riparo dalle infiltrazioni d’acqua.',
    detailedSpecs: [
      { label: 'Marca', value: 'EO2 (Specialista biomassa)' },
      { label: 'Composizione', value: '100% corteccia selezionata di latifoglie e resinose compressa' },
      { label: 'Durata combustione', value: '6–10 ore di braci persistenti' },
      { label: 'Confezionamento', value: 'Bancale da 104 pacchi da 5 tronchetti (520 pezzi, circa 900 kg)' },
      { label: 'Dimensioni tronchetto', value: 'L 30 cm × Ø 10 cm' },
      { label: 'Tasso di umidità', value: 'Inferiore all’11%' },
      { label: 'Residuo ceneri', value: 'Meno del 3%' },
      { label: 'Apparecchi compatibili', value: 'Stufe a legna, camini chiusi, inserti' },
    ],
    warranty: 'Legno certificato senza additivi né leganti',
    relatedSlugs: [
      'buches-densifiees-premium-palette-1000-kg',
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'poele-granules-jolly-mec-6-kw-programmable': {
    unitPriceLabel: 'Rendimento 90% — Programmazione settimanale',
    badgeText: 'Disponibile — Spedizione in 48/72h',
    delivery: {
      delay: 'Consegna in 6–10 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Corriere specializzato per apparecchi termici con sponda',
      carrierNotice:
        'Apparecchio delicato da 95 kg imballato su bancale protetto. Contatto telefonico per fissare la fascia di consegna.',
    },
    usageTips: [
      'Programma le fasce orarie di accensione (mattina e sera) per ridurre fino al 30% il consumo di pellet.',
      'Utilizza solo pellet certificato ENplus A1 o DINplus per proteggere candeletta e motoriduttore.',
    ],
    storageAdvice: 'Collegamento su canna fumaria stagna Ø 80 mm a norma UNI 10683 da parte di installatore qualificato.',
    detailedSpecs: [
      { label: 'Marca', value: 'Jolly Mec (Italia — alta tecnologia termica)' },
      { label: 'Potenza termica', value: '6 kW (modulabile da 2,9 a 6,7 kW)' },
      { label: 'Rendimento energetico', value: '90% (Classe A+)' },
      { label: 'Capacità serbatoio', value: '18 kg (autonomia fino a 32 ore)' },
      { label: 'Consumo di pellet', value: '0,6 – 1,4 kg / ora' },
      { label: 'Dotazione inclusa', value: 'Radiocomando multifunzione, modalità silenziosa a convezione naturale' },
      { label: 'Scarico fumi', value: 'Ø 80 mm stagno' },
      { label: 'Peso', value: '95 kg' },
      { label: 'Normativa europea', value: 'EN 14785 — EcoDesign' },
    ],
    warranty: 'Garanzia produttore 2 anni su ricambi e corpo scaldante',
    relatedSlugs: [
      'granules-bois-premium-6mm-palette-990-kg',
      'poele-bois-fonte-bronpi-karen-8-kw',
      'cheminee-electrique-purline-verre-noir-2000w',
    ],
  },

  'cheminee-electrique-purline-verre-noir-2000w': {
    unitPriceLabel: 'Effetto fiamma LED regolabile — Frontale vetro temperato nero',
    badgeText: 'Disponibile — Spedizione in 24h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Consegna rapida a domicilio con tracciamento',
      carrierNotice: 'Imballo doppia onda con protezione in schiuma ad alta densità.',
    },
    usageTips: [
      'L’effetto fiamma funziona anche indipendentemente dal riscaldamento per creare atmosfera in ogni stagione.',
      'Due potenze selezionabili (1000 W e 2000 W) per modulare rapidamente la temperatura.',
    ],
    storageAdvice: 'Installazione immediata senza canna fumaria: da appoggio o fissaggio a parete.',
    detailedSpecs: [
      { label: 'Marca', value: 'Purline' },
      { label: 'Potenza massima', value: '2.000 Watt (2 livelli: 1000 W / 2000 W)' },
      { label: 'Alimentazione', value: 'Elettrica 230 V (presa domestica standard)' },
      { label: 'Frontale', value: 'Vetro temperato di sicurezza nero' },
      { label: 'Effetto fiamma', value: 'Tecnologia LED dinamica con ciottoli decorativi' },
      { label: 'Telecomando', value: 'Incluso (accensione, intensità fiamma, termostato)' },
      { label: 'Superficie indicativa', value: 'Riscaldamento integrativo per stanze da 15 a 22 m²' },
      { label: 'Sicurezza', value: 'Spegnimento automatico antisurriscaldamento' },
    ],
    warranty: 'Garanzia 2 anni',
    relatedSlugs: [
      'radiateur-electrique-connecte-sauter-hekla-1500w',
      'radiateur-electrique-connecte-sauter-ipala-1500w',
      'poele-bois-fonte-bronpi-karen-8-kw',
    ],
  },

  'chauffage-exterieur-gaz-planika-faro-8-kw': {
    unitPriceLabel: 'Fiamma visibile a 360° — Autonomia fino a 55 ore',
    badgeText: 'Disponibile in fabbrica — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Corriere specializzato con protezione dedicata per i vetri',
      carrierNotice: 'Spedizione su bancale protetto con pannelli in vetro temperato imballati separatamente.',
    },
    usageTips: [
      'Utilizza una bombola di Propano o GPL fino a 11 kg alloggiata nella base (il propano resiste alle basse temperature invernali).',
      'Accensione piezoelettrica istantanea con termocoppia di sicurezza e sensore antiribaltamento.',
    ],
    storageAdvice:
      'Le 4 ruote con freno permettono di spostare facilmente il riscaldatore a fine serata e proteggerlo sotto copertura.',
    detailedSpecs: [
      { label: 'Marca e Design', value: 'Planika — Riferimento europeo per il fuoco decorativo' },
      { label: 'Modello', value: 'Faro 8,2 kW' },
      { label: 'Combustibile', value: 'Gas Propano o GPL (bombola fino a 11 kg nella base)' },
      { label: 'Potenza termica', value: 'Fino a 8,2 kW regolabile (consumo max. 0,50 kg/h)' },
      { label: 'Autonomia', value: 'Fino a 55 ore di funzionamento continuo' },
      { label: 'Protezione fiamma', value: '4 pannelli in vetro temperato antivento' },
      { label: 'Mobilità', value: '4 ruote piroettanti con freno' },
      { label: 'Peso', value: '20 kg (bombola esclusa)' },
      { label: 'Certificazioni', value: 'Norma CE / Certificazione Kiwa' },
    ],
    warranty: 'Garanzia 2 anni Planika',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'barbecue-kamado-bee-grill-xl-luxe-ceramique',
      'chauffage-infrarouge-exterieur-frico-term-ip67-2000w',
    ],
  },

  'four-pizza-ofyr-100-cuisson-feu-bois': {
    unitPriceLabel: 'Kit completo: piastra ghisa doppia faccia + pietra refrattaria + campana + pala',
    badgeText: 'Disponibile — Spedizione in 24h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Collo protetto consegnato a domicilio con tracciamento',
      carrierNotice: 'Pietra refrattaria imballata con protezione antiurto rinforzata.',
    },
    usageTips: [
      'Appoggia la piastra in ghisa doppia faccia sul braciere OFYR 100, poi posiziona pietra refrattaria e campana.',
      'Ruota il pomello superiore della campana per regolare il flusso d’aria fra le due pareti d’acciaio.',
      'Infarina leggermente la pala inclusa prima di infornare la pizza.',
    ],
    storageAdvice: 'Pulisci la pietra a secco con spazzola morbida dopo completo raffreddamento. Non immergere mai la pietra calda in acqua.',
    detailedSpecs: [
      { label: 'Marca', value: 'OFYR' },
      { label: 'Modello', value: 'Pizza Oven 100' },
      { label: 'Compatibilità', value: 'Bracieri OFYR 100' },
      { label: 'Campana', value: 'Acciaio a doppia parete rotante per regolazione aria' },
      { label: 'Piastra di cottura', value: 'Ghisa doppia faccia (supporto pietra e piastra grill)' },
      { label: 'Pietra per pizza', value: 'Pietra refrattaria inclusa' },
      { label: 'Accessorio incluso', value: 'Pala per pizza inclusa' },
      { label: 'Combustibile', value: 'Fuoco di legna naturale' },
    ],
    warranty: 'Garanzia 2 anni OFYR',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'ofyr-fire-guard-ring-100-teck',
      'barbecue-kamado-bee-grill-xl-luxe-ceramique',
    ],
  },

  'abri-buches-timbela-m985-414m2': {
    unitPriceLabel: 'Superficie 4,14 m² — Combinato legnaia + ripostiglio attrezzi',
    badgeText: 'Disponibile dal produttore — Spedizione in 72h',
    delivery: {
      delay: 'Consegna in 7–12 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Consegna con camion dotato di muletto / sponda idraulica',
      carrierNotice:
        'Collo voluminoso (274 kg) consegnato in kit su bancale lungo. Il corriere concorda giorno e fascia oraria per lo scarico fronte strada.',
    },
    usageTips: [
      'Installa la struttura su platea o basamento in cemento livellato per isolare il legno dall’umidità del terreno.',
      'Il vano aperto ventila la legna da ardere mentre il ripostiglio chiuso custodisce attrezzi e macchinari.',
    ],
    storageAdvice: 'Legno naturale certificato FSC. Applica un impregnante protettivo traspirante ogni 2–3 anni per preservarne l’aspetto.',
    detailedSpecs: [
      { label: 'Marca', value: 'TIMBELA (Produzione europea certificata FSC)' },
      { label: 'Modello', value: 'M985 Combinato Legnaia & Rimessa' },
      { label: 'Superficie a terra totale', value: '4,14 m²' },
      { label: 'Dimensioni esterne', value: 'Larghezza 345 cm × Profondità 120 cm × Altezza 220 cm' },
      { label: 'Materiale', value: 'Legno del Nord certificato FSC con pannelli trattati' },
      { label: 'Copertura tetto', value: 'Guaina bituminosa nera idrorepellente inclusa' },
      { label: 'Capacità legna', value: 'Stoccaggio ventilato per ceppi da 33 a 50 cm' },
      { label: 'Peso totale kit', value: '274 kg completo di ferramenta e manuale di montaggio' },
    ],
    warranty: 'Garanzia produttore 2 anni',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'fendeur-buches-scheppach-compact-10t-3150w',
      'ofyr-wood-storage-corten-100-range-buches',
    ],
  },

  'foyer-bois-panoramique-acaminetti-flat-150x50': {
    unitPriceLabel: 'Schermo panoramico 150 cm — Porta a saliscendi',
    badgeText: 'Su ordinazione — Spedizione in 5 giorni',
    delivery: {
      delay: 'Consegna in 7–12 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Trasportatore pesante specializzato con sponda idraulica',
      carrierNotice:
        'Prodotto eccezionale (340 kg). Consegnato in cassa su bancale rinforzato in legno con appuntamento obbligatorio.',
    },
    usageTips: [
      'La porta a saliscendi consente di passare con un gesto dalla visione a focolare aperto al massimo rendimento a camera chiusa.',
      'Progettato per riscaldare ampi living e grandi volumi da 100 a 200 m².',
    ],
    storageAdvice: 'Installazione obbligatoria a cura di un tecnico o fumista qualificato secondo la normativa vigente.',
    detailedSpecs: [
      { label: 'Marca', value: 'A.Caminetti' },
      { label: 'Modello', value: 'Flat 150 × 50 Panoramico' },
      { label: 'Potenza termica', value: '17 – 25 kW' },
      { label: 'Rendimento energetico', value: '81% (EcoDesign 2022)' },
      { label: 'Formato vetro', value: 'Vetro ceramico panoramico 150 cm × 50 cm' },
      { label: 'Sistema apertura', value: 'Saliscendi verticale + apertura laterale per pulizia' },
      { label: 'Interno camera', value: 'Mattoni refrattari ad alto accumulo termico' },
      { label: 'Diametro uscita fumi', value: 'Ø 250 mm' },
      { label: 'Peso netto', value: '340 kg' },
    ],
    warranty: 'Garanzia 5 anni sul corpo scaldante',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'ofyr-wood-storage-corten-100-range-buches',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'chariot-buches-le-marquier-fjord-noir': {
    unitPriceLabel: 'Produzione francese Le Marquier — Acciaio verniciato nero',
    badgeText: 'Disponibile — Spedizione in 24h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Consegna rapida a domicilio con tracciamento',
      carrierNotice: 'Collo protetto consegnato con firma.',
    },
    usageTips: [
      'Trasporta con facilità ceppi fino a 50 cm dalla legnaia esterna fino al camino grazie alle due ruote larghe.',
      'Il design essenziale nero funge anche da elegante portalegna verticale accanto alla stufa.',
    ],
    storageAdvice: 'Struttura in acciaio verniciato a polvere nera, adatta sia per interni sia per porticati coperti.',
    detailedSpecs: [
      { label: 'Marca e Origine', value: 'Le Marquier — Origine France Garantie (Cod. CRB100E13)' },
      { label: 'Modello', value: 'Carrello portalegna Fjord Nero' },
      { label: 'Capacità ceppi', value: 'Adatto a legna fino a 50 cm' },
      { label: 'Materiale', value: 'Acciaio con verniciatura epossidica nera' },
      { label: 'Dimensioni', value: 'Larghezza 45 cm × Profondità 50 cm × Altezza 92 cm' },
      { label: 'Peso netto', value: '13,2 kg' },
    ],
    warranty: 'Garanzia produttore 2 anni',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'poele-bois-fonte-bronpi-karen-8-kw',
      'insert-bois-invicta-p947044-10-kw',
    ],
  },

  'chauffage-infrarouge-exterieur-frico-term-ip67-2000w': {
    unitPriceLabel: 'Qualità svedese — Impermeabilità totale IP67',
    badgeText: 'Disponibile — Spedizione in 24h',
    delivery: {
      delay: 'Consegna in 3–5 giorni lavorativi',
      type: 'parcel',
      headline: 'Spedizione tracciata rapida a domicilio',
      carrierNotice: 'Lampada infrarossi al quarzo protetta in doppio strato di schiuma antiurto.',
    },
    usageTips: [
      'La tecnologia a onde corte riscalda direttamente persone e superfici senza dispersioni dovute a correnti d’aria.',
      'Calore istantaneo in meno di un secondo per godere di terrazze, verande o balconi nelle mezze stagioni.',
    ],
    storageAdvice: 'Grazie al grado IP67, può restare installato stabilmente all’aperto esposto a pioggia e umidità.',
    detailedSpecs: [
      { label: 'Marca e Origine', value: 'FRICO (Svezia — riferimento internazionale termotecnico)' },
      { label: 'Modello', value: 'Term IP67 2000 W' },
      { label: 'Tecnologia', value: 'Infrarossi al quarzo ad onde corte ad alta resa' },
      { label: 'Potenza', value: '2.000 Watt — Alimentazione 230 V' },
      { label: 'Protezione', value: 'IP67 (impermeabile a getti d’acqua e polvere)' },
      { label: 'Area coperta', value: 'Zona comfort da 12 a 16 m²' },
      { label: 'Fissaggio', value: 'Staffa orientabile a parete in acciaio inox inclusa' },
    ],
    warranty: 'Garanzia 2 anni produttore',
    relatedSlugs: [
      'chauffage-exterieur-gaz-planika-faro-8-kw',
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'radiateur-electrique-connecte-sauter-hekla-1500w',
    ],
  },

  'fendeur-buches-scheppach-compact-10t-3150w': {
    unitPriceLabel: 'Forza 10 tonnellate — Motore 3.150 W a 230 V',
    badgeText: 'Disponibile — Spedizione in 48h',
    delivery: {
      delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
      type: 'heavy_freight',
      headline: 'Consegna su bancale protetto con sponda idraulica',
      carrierNotice:
        'Macchina da 134 kg consegnata reggiata su bancale. Il corriere contatta il cliente per concordare la consegna.',
    },
    usageTips: [
      'Comando bimanuale di sicurezza: entrambe le mani devono azionare le leve per far scendere il cuneo.',
      'Spacca agevolmente legni nodosi e duri (quercia secca, carpino, olmo).',
      'Piano regolabile su più altezze per lavorare sia ceppi corti sia tronchi fino a 107 cm.',
    ],
    storageAdvice: 'Controlla il livello dell’olio idraulico una volta l’anno e riponi al coperto dopo la pulizia.',
    detailedSpecs: [
      { label: 'Marca', value: 'Scheppach (Germania — Cod. 5905423901)' },
      { label: 'Modello', value: 'Compact 10T Verticale' },
      { label: 'Forza di spacco idraulica', value: '10 Tonnellate' },
      { label: 'Motore elettrico', value: '3.150 Watt — 230 V domestico' },
      { label: 'Lunghezza max. ceppo', value: 'Fino a 107 cm (1070 mm)' },
      { label: 'Diametro ceppo', value: 'Da 8 a 38 cm (380 mm max.)' },
      { label: 'Sicurezza', value: 'Doppio comando bimanuale con blocco anti-ribaltamento' },
      { label: 'Peso netto', value: '134 kg (con 2 ruote di trasporto)' },
    ],
    warranty: 'Garanzia produttore 5 anni Scheppach',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'abri-buches-timbela-m985-414m2',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },
}

const slugAliases: Record<string, string> = {
  'chariot-le-marquier-fjord-noir': 'chariot-buches-le-marquier-fjord-noir',
  'chauffage-frico-term-ip67-2000w': 'chauffage-infrarouge-exterieur-frico-term-ip67-2000w',
  'fendeur-buches-scheppach-compact-10t': 'fendeur-buches-scheppach-compact-10t-3150w',
  'foyer-cheminee-acaminetti-flat-150x50': 'foyer-bois-panoramique-acaminetti-flat-150x50',
}

export function getProductRichSpec(slug: string): RichProductSpec | undefined {
  const resolvedSlug = slugAliases[slug] || slug
  return productRichSpecs[resolvedSlug]
}
