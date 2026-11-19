import type { Product } from './products'
import type { DeliveryCategory, RichProductSpec } from './product-rich-specs'

export type BenefitIconName = 'truck' | 'flame' | 'humidity' | 'leaf' | 'shield' | 'wrench'

export type QuickBenefit = {
  icon: BenefitIconName
  label: string
  detail: string
}

export type ProductFaqItem = {
  question: string
  answer: string
}

export type ResolvedProductContent = {
  quickBenefits: QuickBenefit[]
  whyChooseTitle: string
  whyChoosePoints: string[]
  usageConditionTitle: string
  usageConditionNote: string
  usageTips: string[]
  storageAdvice: string
  delivery: {
    delay: string
    type: DeliveryCategory
    headline: string
    carrierNotice: string
  }
  warranty: string
  faqItems: ProductFaqItem[]
  isTestProduct: boolean
}

type CategoryFamily =
  | 'test'
  | 'legna'
  | 'legno_compresso'
  | 'pellet'
  | 'accensione'
  | 'apparecchi-combustione'
  | 'apparecchi-elettrici'
  | 'esterno-cottura'
  | 'stoccaggio-preparazione'

function detectCategoryFamily(product: Product): CategoryFamily {
  if (product.slug === 'test-paiement-1-euro' || product.category === 'alimentazione') {
    return 'test'
  }
  const cat = product.category.toLowerCase()

  if (
    product.category === 'poeles-a-bois' ||
    product.category === 'poeles-a-granules' ||
    product.category === 'inserts-cheminees' ||
    product.category === 'foyers-cheminees'
  ) {
    return 'apparecchi-combustione'
  }
  if (product.category === 'cheminees-electriques' || product.category === 'chauffage-electrique-interieur') {
    return 'apparecchi-elettrici'
  }
  if (
    product.category === 'braseros-cuisson-exterieure' ||
    product.category === 'barbecues-cuisine-exterieure' ||
    product.category === 'cuisine-au-feu' ||
    product.category === 'chauffage-exterieur' ||
    product.category === 'accessoires-brasero' ||
    product.category === 'accessoires-cuisson-exterieure'
  ) {
    return 'esterno-cottura'
  }
  if (
    product.category === 'granules' ||
    product.category === 'chauffage-au-bois-granules' ||
    product.slug.includes('granules') ||
    product.slug.includes('pellet')
  ) {
    return 'pellet'
  }
  if (
    product.category === 'bois-compresse' ||
    product.category === 'chauffage-au-bois-bois-compresse' ||
    product.slug.includes('buches-densifiees') ||
    product.slug.includes('briquet')
  ) {
    return 'legno_compresso'
  }
  if (product.category === 'allumage' || product.category === 'allume-feu' || product.slug.includes('allumage') || product.slug.includes('allume-feu')) {
    return 'accensione'
  }
  if (
    (product.category === 'buches' || product.category === 'chauffage-au-bois-buches' || cat.startsWith('chauffage-au-bois')) &&
    !product.slug.includes('abri') &&
    !product.slug.includes('range') &&
    !product.slug.includes('chariot') &&
    !product.slug.includes('fend') &&
    !product.slug.includes('scie')
  ) {
    return 'legna'
  }
  return 'stoccaggio-preparazione'
}

export const BRAVIKO_ABOUT_CONTENT = {
  eyebrow: 'Chi siamo · Braviko',
  title: 'Competenza nel riscaldamento, consegna trasparente in tutta Italia.',
  intro:
    'Braviko seleziona combustibili certificati, stufe, focolari e attrezzature per la gestione della legna con un solo obiettivo: darti dati tecnici verificati prima dell’acquisto e una consegna organizzata senza sorprese.',
  pillars: [
    {
      title: 'Selezione controllata',
      body: 'Ogni lotto di legna, pellet e apparecchio viene proposto con parametri chiari su potere calorifico, umidità, dimensioni e compatibilità.',
    },
    {
      title: 'Logistica dedicata su tutto il territorio',
      body: 'Spedizione gratuita in tutta Italia: su bancale con sponda idraulica e appuntamento telefonico, oppure tramite corriere espresso tracciato per i colli compatti.',
    },
    {
      title: 'Acquisto protetto e assistenza diretta',
      body: 'Pagamenti crittografati via Stripe 3D Secure o bonifico SEPA, garanzia legale di conformità e supporto clienti diretto su contact@braviko.fr.',
    },
  ],
}

export function resolveProductContent(
  product: Product,
  richSpec?: RichProductSpec,
): ResolvedProductContent {
  const family = detectCategoryFamily(product)
  const specDelivery = richSpec?.delivery
  const specWarranty = richSpec?.warranty
  const specUsageTips = richSpec?.usageTips && richSpec.usageTips.length > 0 ? richSpec.usageTips : null
  const specStorage = richSpec?.storageAdvice || null

  if (family === 'test') {
    return {
      isTestProduct: true,
      quickBenefits: [
        { icon: 'shield', label: 'Verifica checkout', detail: 'Test interno reale a 1,00 €' },
        { icon: 'truck', label: 'Nessuna spedizione', detail: 'Articolo digitale di controllo' },
      ],
      whyChooseTitle: 'Finalità di questo articolo',
      whyChoosePoints: [
        'Consente di verificare il flusso completo di pagamento Stripe o bonifico SEPA in ambiente reale.',
        'Nessun pacco o bancale viene preparato né affidato al corriere.',
      ],
      usageConditionTitle: 'Condizioni del test',
      usageConditionNote:
        'Articolo riservato esclusivamente alla verifica tecnica del carrello e della conferma d’ordine.',
      usageTips: specUsageTips || [
        'Aggiungi l’articolo al carrello e completa il checkout con un importo simbolico di 1,00 €.',
      ],
      storageAdvice: specStorage || 'Articolo di prova interno non soggetto a consegna fisica.',
      delivery: specDelivery || {
        delay: 'Nessuna spedizione: solo test di pagamento.',
        type: 'parcel',
        headline: 'Verifica tecnica senza invio fisico',
        carrierNotice: 'Nessuna consegna prevista per questo articolo di controllo.',
      },
      warranty: specWarranty || 'Solo test tecnico interno',
      faqItems: [
        {
          question: 'Verrà spedito un prodotto fisico?',
          answer: 'No, si tratta di un articolo temporaneo di verifica tecnica a 1,00 € senza spedizione.',
        },
        {
          question: 'Il pagamento è comunque reale?',
          answer: 'Sì, il checkout elabora una transazione reale da 1,00 € per validare il circuito di pagamento.',
        },
      ],
    }
  }

  switch (family) {
    case 'legna':
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Bancale gratuito', detail: 'Consegna con sponda e appuntamento' },
          { icon: 'humidity', label: 'Umidità < 20 %', detail: 'Essiccazione controllata in forno' },
          { icon: 'flame', label: 'Alto potere calorifico', detail: 'Fiamma viva e brace duratura' },
          { icon: 'leaf', label: 'Poche ceneri', detail: 'Latifoglie scelte PEFC / FSC' },
        ],
        whyChooseTitle: 'Perché scegliere questa legna da ardere',
        whyChoosePoints: [
          'Pronta per essere bruciata fin dal giorno di arrivo grazie all’umidità inferiore al 20 %.',
          'Combustione pulita che riduce fuliggine sul vetro ceramico e depositi nella canna fumaria.',
          'Ceppi selezionati e spaccati con pezzatura uniforme per un carico ordinato del focolare.',
          'Consegna su bancale reggiato con sponda idraulica compresa nel prezzo, in tutta Italia.',
        ],
        usageConditionTitle: 'Condizioni d’uso e preparazione della fiamma',
        usageConditionNote:
          'Per ottenere il massimo rendimento termico ed evitare fumosità all’avvio, utilizza sempre accensione dall’alto (top-down) su griglia pulita e regola l’aria primaria solo dopo aver creato un buon letto di braci.',
        usageTips: specUsageTips || [
          'Disponi i ceppi più spessi alla base della camera di combustione e posiziona sopra legnetti secchi e accendifuoco naturale.',
          'Mantieni l’ingresso dell’aria primaria aperto per i primi 15 minuti per portare rapidamente in temperatura la canna fumaria.',
          'Verifica che la lunghezza del ceppo rispetti le dimensioni consigliate dal costruttore della tua stufa o inserto.',
        ],
        storageAdvice:
          specStorage ||
          'Conserva il bancale sollevato da terra sotto una tettoia ventilata o un riparo aerato. Lascia circolare l’aria evitando teli plastici chiusi a tenuta stagna che tratterrebbero condensa.',
        delivery: specDelivery || {
          delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
          type: 'pallet',
          headline: 'Consegna su bancale con sponda idraulica e transpallet',
          carrierNotice:
            'Il corriere ti contatta prima del passaggio per concordare il giorno esatto. Scarico a piano strada su fondo stabile e carrabile (asfalto, cemento o autobloccanti).',
        },
        warranty: specWarranty || 'Umidità inferiore al 20 % garantita alla consegna',
        faqItems: [
          {
            question: 'La legna è già asciutta e pronta da bruciare?',
            answer:
              'Sì. Tutti i nostri lotti in bancale sono essiccati o stagionati con umidità residua inferiore al 20 %, pronti per l’uso immediato senza attendere un ulteriore anno di asciugatura.',
          },
          {
            question: 'Come avviene lo scarico del bancale a casa mia?',
            answer:
              'Il trasportatore utilizza un camion con sponda idraulica e transpallet manuale fino all’ingresso o al vialetto, purché la strada sia accessibile e la superficie sia piana e compatta (asfalto o cemento).',
          },
          {
            question: 'Come faccio a sapere se la misura dei ceppi va bene per la mia stufa?',
            answer:
              'Controlla la larghezza interna della camera di combustione del tuo apparecchio: lascia sempre almeno 3–4 cm di margine per lato rispetto alla lunghezza indicata nella scheda tecnica.',
          },
          {
            question: 'Posso lasciare il bancale all’aperto durante l’inverno?',
            answer:
              'Sì, purché la parte superiore sia protetta dalla pioggia diretta (tettoia o telo traspirante solo sopra) e la base non poggi sulla terra umida ma resti sul bancale.',
          },
        ],
      }

    case 'legno_compresso':
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Consegna su bancale', detail: 'Con sponda e preavviso SMS/tel' },
          { icon: 'humidity', label: 'Umidità < 9 %', detail: 'Accensione immediata e pulita' },
          { icon: 'flame', label: '~4,9 kWh / kg', detail: 'Potere calorifico concentrato' },
          { icon: 'leaf', label: 'Ceneri < 1 %', detail: '100 % segatura vergine senza colla' },
        ],
        whyChooseTitle: 'Perché scegliere i tronchetti densificati',
        whyChoosePoints: [
          'A parità di calore sviluppato occupano circa un terzo dello spazio rispetto alla legna tradizionale.',
          'Compressione meccanica senza colle né additivi chimici: solo segatura e trucioli essiccati.',
          'Umidità bassissima (< 9 %) che produce calore rapido, zero scoppiettii e pochissima cenere.',
          'Confezioni pulite da maneggiare in casa, senza polvere, insetti né corteccia.',
        ],
        usageConditionTitle: 'Condizioni d’uso e dosaggio nel focolare',
        usageConditionNote:
          'I tronchetti ad alta densità sprigionano molta più energia rispetto a un ceppo umido: carica sempre 1 solo pezzo (o 2 piccoli) alla volta per evitare surriscaldamenti della stufa o del vetro.',
        usageTips: specUsageTips || [
          'Avvia la fiamma con un accendifuoco naturale e pezzetti di legna da accensione, quindi aggiungi un tronchetto intero o spezzato a metà.',
          'Carica 1–2 tronchetti per volta regolando l’aria comburente una volta avviata la fiamma.',
          'Per i formati da notte in corteccia pressata, posizionali su un letto di braci vive chiudendo leggermente l’aria primaria.',
        ],
        storageAdvice:
          specStorage ||
          'Stocca obbligatoriamente al riparo dall’umidità in garage, cantina asciutta o ripostiglio chiuso: il legno compresso tende a rigonfiarsi a contatto diretto con acqua o umidità prolungata.',
        delivery: specDelivery || {
          delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
          type: 'pallet',
          headline: 'Consegna su bancale coperto con sponda idraulica',
          carrierNotice:
            'Preavviso telefonico o SMS del corriere prima della consegna. Scarico con transpallet su pavimento piano e accesso carrabile.',
        },
        warranty: specWarranty || '100 % legno non trattato senza leganti chimici',
        faqItems: [
          {
            question: 'Quanti tronchetti devo mettere insieme nella stufa?',
            answer:
              'Un singolo tronchetto sostituisce circa 3–4 ceppi tradizionali in termini di energia. Inizia sempre con 1 tronchetto alla volta per regolare correttamente il tiraggio.',
          },
          {
            question: 'Posso conservarli fuori come la legna spaccata?',
            answer:
              'No. A differenza della legna classica, il legno densificato deve restare in un ambiente asciutto e coperto (garage, locale tecnico o sotto tettoia ben protetta dalle intemperie).',
          },
          {
            question: 'Contengono resine sintetiche o colle?',
            answer:
              'No: la coesione avviene esclusivamente tramite altissima pressione meccanica sfruttando la lignina naturale contenuta nel legno.',
          },
          {
            question: 'Come sono confezionati sul bancale?',
            answer:
              'Sono suddivisi in pacchi compatti facili da spostare a mano e protetti sul bancale con pellicola impermeabile.',
          },
        ],
      }

    case 'pellet':
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Bancale protetto', detail: 'Spedizione gratuita con sponda' },
          { icon: 'leaf', label: 'ENplus A1 / DINplus', detail: 'Qualità certificata a basse ceneri' },
          { icon: 'humidity', label: 'Umidità < 8 %', detail: 'Zero blocchi nella coclea' },
          { icon: 'flame', label: 'Alta resa termica', detail: '100 % legno vergine di conifera' },
        ],
        whyChooseTitle: 'Perché scegliere questo pellet certificato',
        whyChoosePoints: [
          'Basso contenuto di polveri fini e umidità ridotta per proteggere coclea e braciere.',
          'Residui di cenere minimi (< 0,5 %), riducendo la frequenza di pulizia della stufa.',
          'Granulometria regolare da 6 mm compatibile con la totalità delle stufe e caldaie domestiche.',
          'Sacchi resistenti da 15 kg pratici da sollevare e impilare al coperto.',
        ],
        usageConditionTitle: 'Condizioni d’uso e caricamento',
        usageConditionNote:
          'Pulisci sempre il braciere prima di ricaricare il serbatoio e evita di versare l’eventuale polvere residua accumulata sul fondo del sacco per mantenere regolare l’alimentazione.',
        usageTips: specUsageTips || [
          'Verifica a inizio stagione che la stufa a pellet abbia effettuato la manutenzione annuale e la pulizia della canna fumaria.',
          'Versa il pellet lentamente nel serbatoio mantenendo pulita la bocca di carico.',
          'Regola la portata aria/pellet se passi da un lotto di legni misti a un lotto 100 % conifera ad alto potere calorifico.',
        ],
        storageAdvice:
          specStorage ||
          'Conserva i sacchi in ambiente asciutto e sollevato dal pavimento (sul bancale originale o su assi di legno) lontano da infiltrazioni e umidità muraria.',
        delivery: specDelivery || {
          delay: 'Consegna in 5–8 giorni lavorativi su appuntamento',
          type: 'pallet',
          headline: 'Consegna su bancale protetto con sponda idraulica',
          carrierNotice:
            'Il corriere ti contatta prima della consegna per fissare l’appuntamento e posizionare il bancale tramite transpallet su superficie piana.',
        },
        warranty: specWarranty || 'Qualità certificata ENplus A1 / DINplus',
        faqItems: [
          {
            question: 'Questo pellet è adatto alla mia stufa domestica?',
            answer:
              'Sì, il diametro standard da 6 mm e la certificazione ENplus A1 garantiscono compatibilità con praticamente tutte le stufe, gli inserti e le caldaie a pellet domestiche.',
          },
          {
            question: 'Quanta polvere c’è nei sacchi?',
            answer:
              'Il pellet viene depolverizzato e vagliato prima dell’insacchettamento (< 0,5 % di polveri fini), limitando i residui nel serbatoio.',
          },
          {
            question: 'Come avviene il posizionamento del bancale?',
            answer:
              'La consegna include sponda idraulica e transpallet su strada e vialetti pavimentati, con appuntamento concordato telefonicamente o via SMS.',
          },
          {
            question: 'Posso lasciare i sacchi sotto una tettoia aperta?',
            answer:
              'Meglio riporli in garage, cantina asciutta o locale chiuso. Se restano sotto tettoia esterna, mantieni la copertura protettiva integra e non appoggiare i sacchi direttamente sul suolo.',
          },
        ],
      }

    case 'accensione':
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Spedizione rapida', detail: 'Gratuita in tutta Italia' },
          { icon: 'leaf', label: '100 % naturale', detail: 'Legno secco e cera vegetale' },
          { icon: 'flame', label: 'Presa immediata', detail: 'Accensione in pochi minuti' },
          { icon: 'shield', label: 'Zero odori chimici', detail: 'Adatto anche a forni e BBQ' },
        ],
        whyChooseTitle: 'Perché scegliere questo kit di accensione',
        whyChoosePoints: [
          'Consente di accendere facilmente stufe, inserti, bracieri e forni senza carta né liquidi chimici.',
          'Formulazione naturale in legno essiccato e lana di legno senza emissioni tossiche.',
          'Combustione prolungata sufficiente a incendiare subito anche i ceppi di quercia o carpino.',
          'Confezione pulita e compatta da tenere accanto al camino.',
        ],
        usageConditionTitle: 'Consigli per un’accensione pulita (metodo top-down)',
        usageConditionNote:
          'Posiziona sempre due ceppi grandi in basso, incrocia 4–6 legnetti di accensione sopra e colloca l’accendifuoco in cima: il fuoco scenderà lentamente riscaldando subito la canna fumaria con zero fumo.',
        usageTips: specUsageTips || [
          'Apri completamente le prese d’aria della stufa o del camino prima di accendere.',
          'Utilizza 1 o 2 rotoli di lana di legno sopra una piramide di legnetti secchi.',
          'Ideale anche per barbecue a carbonella, kamado e bracieri da cucina perché non altera il sapore dei cibi.',
        ],
        storageAdvice:
          specStorage ||
          'Conserva le scatole o le casse in luogo asciutto, lontano da fiamme libere e fonti di calore dirette.',
        delivery: specDelivery || {
          delay: 'Consegna gratuita in 3–5 giorni lavorativi',
          type: 'parcel',
          headline: 'Spedizione protetta tracciata a domicilio',
          carrierNotice:
            'Collo spedito entro 48 ore lavorative con codice di tracciamento via SMS ed email.',
        },
        warranty: specWarranty || 'Materiali 100 % naturali certificati',
        faqItems: [
          {
            question: 'Posso usarli anche per barbecue, kamado o forno per pizza?',
            answer:
              'Sì, essendo privi di petrolio e additivi chimici non rilasciano odori sgradevoli sulle pietanze.',
          },
          {
            question: 'Quanti accendifuoco servono per ogni accensione?',
            answer: 'Di norma basta 1 pezzo per stufe e camini, oppure 2 per grandi bracieri all’aperto.',
          },
          {
            question: 'La spedizione è gratuita?',
            answer: 'Sì, la spedizione verso tutta Italia è inclusa senza minimo d’ordine.',
          },
        ],
      }

    case 'apparecchi-combustione':
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Spedizione assicurata', detail: 'Consegna con sponda e appuntamento' },
          { icon: 'flame', label: 'Alto rendimento', detail: 'Progettato secondo Ecodesign 2022' },
          { icon: 'shield', label: 'Garanzia fino a 5 anni', detail: 'Copertura legale e costruttore' },
          { icon: 'wrench', label: 'Assistenza dedicata', detail: 'Supporto tecnico e ricambi' },
        ],
        whyChooseTitle: 'Perché scegliere questo apparecchio',
        whyChoosePoints: [
          'Combustione ad alto rendimento con vetro pulito grazie al sistema di post-combustione o flusso d’aria calibrato.',
          'Materiali selezionati (ghisa spessa o acciaio ad alto spessore con camera refrattaria) per durata nel tempo.',
          'Conforme alle più recenti normative europee sulle emissioni domestiche Ecodesign 2022.',
          'Consegna assicurata su bancale rinforzato con verifica all’arrivo.',
        ],
        usageConditionTitle: 'Condizioni di installazione e utilizzo',
        usageConditionNote:
          'L’installazione e il collegamento alla canna fumaria devono essere eseguiti da un tecnico o fumista qualificato nel rispetto della norma UNI 10683, verificando diametro dei fumi, tiraggio e presa d’aria esterna.',
        usageTips: specUsageTips || [
          'Alla prima accensione esegui un rodaggio graduale con carichi leggeri per stabilizzare vernice e guarnizioni.',
          'Utilizza esclusivamente legna essiccata (< 20 % umidità) o pellet certificato ENplus A1 secondo l’alimentazione prevista.',
          'Esegui almeno una pulizia completa annuale della camera fumi e della canna fumaria.',
        ],
        storageAdvice:
          specStorage ||
          'Prima dell’installazione conserva l’apparecchio nell’imballaggio originale al riparo da urti e umidità. Ispeziona l’integrità esterna alla presenza del corriere.',
        delivery: specDelivery || {
          delay: 'Consegna in 7–12 giorni lavorativi su appuntamento',
          type: 'heavy_freight',
          headline: 'Trasporto assicurato su bancale rinforzato con sponda idraulica',
          carrierNotice:
            'Il corriere concorda il giorno e la fascia oraria di consegna. Ricorda di verificare l’integrità dell’imballo prima di firmare la bolla di consegna.',
        },
        warranty: specWarranty || 'Garanzia legale 2 anni e copertura costruttore inclusa',
        faqItems: [
          {
            question: 'Come verificare la compatibilità con la mia canna fumaria?',
            answer:
              'Confronta il diametro di uscita fumi indicato nella tabella Specifiche tecniche con il condotto esistente ed affidati a un installatore certificato per verificare il tiraggio.',
          },
          {
            question: 'Cosa devo fare quando arriva il corriere con l’apparecchio?',
            answer:
              'Controlla sempre lo stato esterno del bancale e dell’apparecchio prima di congedare l’autista: in caso di urto visibile scrivi sempre «accettato con riserva specifica» descrivendo il danno.',
          },
          {
            question: 'È inclusa la garanzia in Italia?',
            answer:
              'Sì, ogni stufa o inserto nuovo beneficia della garanzia legale di conformità di 2 anni oltre all’eventuale estensione del produttore indicata in scheda.',
          },
          {
            question: 'Fornite assistenza in italiano post-acquisto?',
            answer:
              'Sì, il nostro servizio clienti risponde via email su contact@braviko.fr per documentazione, tracciamento e supporto.',
          },
        ],
      }

    case 'apparecchi-elettrici':
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Consegna tracciata', detail: 'Spedizione gratuita a domicilio' },
          { icon: 'wrench', label: 'Zero canna fumaria', detail: 'Installazione rapida a presa 230V' },
          { icon: 'flame', label: 'Calore modulabile', detail: 'Termostato e programmazione' },
          { icon: 'shield', label: 'Garanzia 2 anni', detail: 'Reso gratuito entro 14 giorni' },
        ],
        whyChooseTitle: 'Perché scegliere questa soluzione elettrica',
        whyChoosePoints: [
          'Nessuna opera muraria né canna fumaria richiesta: basta una presa domestica dedicata.',
          'Gestione precisa della temperatura per evitare sprechi energetici durante la giornata.',
          'Design lineare discreto adatto sia a soggiorni moderni sia a studi e camere da letto.',
          'Spedizione protetta con tracking e diritto di recesso entro 14 giorni.',
        ],
        usageConditionTitle: 'Condizioni di installazione e sicurezza',
        usageConditionNote:
          'Installa l’apparecchio rispettando le distanze minime da tende e mobili indicate nel manuale d’uso e collegalo direttamente a una presa a muro da 230 V con messa a terra senza usare prolunghe multiple.',
        usageTips: specUsageTips || [
          'Utilizza la programmazione settimanale o il rilevamento finestra aperta per ottimizzare i consumi.',
          'Non coprire mai le feritoie di convezione o di uscita aria calda durante il funzionamento.',
          'Mantieni pulite le superfici esterne a freddo con un panno morbido e asciutto.',
        ],
        storageAdvice:
          specStorage ||
          'Conserva l’imballo fino a installazione ultimata; se riposto in estate, avvolgi l’apparecchio pulito in luogo asciutto.',
        delivery: specDelivery || {
          delay: 'Consegna tracciata in 4–7 giorni lavorativi',
          type: 'parcel',
          headline: 'Collo protetto consegnato a domicilio',
          carrierNotice:
            'Spedizione gratuita in tutta Italia con link di tracciamento inviato alla partenza dal magazzino.',
        },
        warranty: specWarranty || 'Garanzia legale 2 anni inclusa',
        faqItems: [
          {
            question: 'Serve un elettricista o una canna fumaria?',
            answer:
              'Nessuna canna fumaria è necessaria. I modelli portatili o a spina si collegano subito a una presa 230 V dedicata; per i fissaggi a parete basta seguire lo schema con tasselli inclusi.',
          },
          {
            question: 'Consuma molto rispetto a un riscaldamento tradizionale?',
            answer:
              'La regolazione elettronica con termostato riduce i cicli inutili mantenendo costante il comfort solo nelle fasce orarie desiderate.',
          },
          {
            question: 'Cosa succede se il prodotto non è adatto al mio ambiente?',
            answer:
              'Hai 14 giorni di calendario dalla consegna per esercitare il diritto di recesso su articolo integro nel suo imballo.',
          },
        ],
      }

    case 'esterno-cottura':
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Spedizione gratuita', detail: 'Imballo protetto in tutta Italia' },
          { icon: 'flame', label: 'Uso esterno tutto l’anno', detail: 'Calore e cucina conviviale' },
          { icon: 'wrench', label: 'Manutenzione semplice', detail: 'Materiali studiati per l’esterno' },
          { icon: 'shield', label: 'Garanzia e ricambi', detail: 'Copertura 2 anni inclusa' },
        ],
        whyChooseTitle: 'Perché scegliere questo articolo da esterno',
        whyChoosePoints: [
          'Progettato per resistere all’uso esterno su terrazza, patio o giardino in ogni stagione.',
          'Elevata stabilità strutturale e qualità dei materiali per una lunga durata negli anni.',
          'Versatile: unisce funzione riscaldante o di cottura sul fuoco vivo con un forte impatto estetico.',
          'Spedizione tracciata gratuita in tutta Italia e assistenza post-vendita in italiano.',
        ],
        usageConditionTitle: 'Condizioni d’uso e precauzioni all’aperto',
        usageConditionNote:
          'Posiziona sempre il braciere, barbecue o forno su una superficie piana, stabile e non infiammabile, a debita distanza da pergole in legno, piante e tende. Non utilizzare mai apparecchi a legna o gas in ambienti chiusi.',
        usageTips: specUsageTips || [
          'Prima del primo utilizzo su piastre in acciaio al carbonio o ghisa, effettua una leggera oliatura a caldo per proteggere la superficie.',
          'Utilizza legna dura ben essiccata o carbone di qualità per limitare il fumo durante la cottura.',
          'Attendi il completo raffreddamento prima di rimuovere la cenere o applicare una copertura protettiva.',
        ],
        storageAdvice:
          specStorage ||
          'Usa una copertura traspirante una volta che il metallo o la ceramica si sono completamente raffreddati, soprattutto nei mesi di pioggia intensa.',
        delivery: specDelivery || {
          delay: 'Consegna gratuita in 5–8 giorni lavorativi',
          type: 'pallet',
          headline: 'Consegna tracciata su appuntamento o collo protetto',
          carrierNotice:
            'In base al peso dell’articolo, la consegna avviene tramite corriere con tracciamento oppure su bancale con preavviso telefonico.',
        },
        warranty: specWarranty || 'Garanzia legale 2 anni inclusa',
        faqItems: [
          {
            question: 'Può restare all’esterno tutto l’anno?',
            answer:
              'Sì, acciaio Corten, ceramica spessa e leghe da esterno sono pensati per restare all’aperto; per preservare più a lungo le finiture consigliamo una copertura traspirante quando non usato.',
          },
          {
            question: 'Serve un montaggio complesso?',
            answer:
              'Gli articoli arrivano già assemblati oppure con istruzioni illustrate passo passo per un montaggio rapido in due persone.',
          },
          {
            question: 'La consegna in giardino o su terrazza è inclusa?',
            answer:
              'La spedizione gratuita comprende il recapito all’indirizzo indicato (a piano strada per articoli pesanti su bancale).',
          },
        ],
      }

    case 'stoccaggio-preparazione':
    default:
      return {
        isTestProduct: false,
        quickBenefits: [
          { icon: 'truck', label: 'Spedizione gratuita', detail: 'Tracciata in tutta Italia' },
          { icon: 'wrench', label: 'Struttura robusta', detail: 'Progettata per carichi gravosi' },
          { icon: 'leaf', label: 'Legna più asciutta', detail: 'Aerazione e protezione ottimali' },
          { icon: 'shield', label: 'Garanzia 2 anni', detail: 'Reso garantito entro 14 giorni' },
        ],
        whyChooseTitle: 'Perché scegliere questo equipaggiamento',
        whyChoosePoints: [
          'Ottimizza la preparazione, il trasporto o la conservazione della tua scorta di legna da ardere.',
          'Materiali robusti dimensionati per sostenere il peso reale dei ceppi stagionali.',
          'Aiuta a mantenere i ceppi asciutti, ordinati e sempre aerati pronti all’uso.',
          'Spedizione gratuita in tutta Italia e assistenza clienti in italiano.',
        ],
        usageConditionTitle: 'Condizioni di montaggio e utilizzo sicuro',
        usageConditionNote:
          'Ancorare le strutture da esterno su una base livellata; per spaccalegna o seghe elettriche utilizzare sempre occhiali protettivi, guanti antitaglio e collegamento elettrico diretto con messa a terra.',
        usageTips: specUsageTips || [
          'Posiziona la legnaia o il portalegna su un piano stabile e leggermente rialzato rispetto al terreno umido.',
          'Impila i ceppi in modo uniforme senza superare l’altezza del telaio di contenimento.',
          'Controlla periodicamente il serraggio di viti o raccordi a inizio di ogni stagione invernale.',
        ],
        storageAdvice:
          specStorage ||
          'Per gli articoli in legno naturale non impregnato applica un impregnante protettivo traspirante dopo il montaggio per allungarne la durata alle intemperie.',
        delivery: specDelivery || {
          delay: 'Consegna gratuita in 5–8 giorni lavorativi',
          type: 'pallet',
          headline: 'Spedizione gratuita tracciata o su appuntamento',
          carrierNotice:
            'Collo imballato o bancale protetto consegnato all’indirizzo indicato con tracciamento o preavviso telefonico.',
        },
        warranty: specWarranty || 'Garanzia legale 2 anni inclusa',
        faqItems: [
          {
            question: 'Le istruzioni e la viteria per il montaggio sono incluse?',
            answer:
              'Sì, ogni kit da montare comprende viteria e manuale passo passo per l’assemblaggio.',
          },
          {
            question: 'Come avviene la consegna e quanto costa?',
            answer:
              'La consegna è sempre gratuita in tutta Italia senza minimo d’ordine.',
          },
          {
            question: 'Che garanzia è inclusa?',
            answer:
              'Tutti gli articoli includono la garanzia legale di conformità di 2 anni oltre al diritto di recesso di 14 giorni.',
          },
        ],
      }
  }
}
