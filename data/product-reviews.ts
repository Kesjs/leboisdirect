export type ProductReview = {
  rating?: number
  author?: string
  city?: string
  date?: string
  text?: string
  label: string
}

type ReviewEntry = ProductReview & { matches: string[] }

const entries: ReviewEntry[] = [
  // 1. Planika Faro 8 kW (4 avis -> 4,8/5)
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Giulio M.', city: 'Milano', text: 'Ottimo riscaldatore a gas, sta benissimo sulla nostra terrazza. La fiamma viva nel cilindro in vetro crea una bellissima atmosfera la sera e le ruote con freno sono comodissime per spostarlo.', label: 'Installato su terrazza' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Sofia R.', city: 'Verona', text: 'Montaggio semplice e vano bombola ben nascosto nella base nera. Lo accendiamo appena rinfresca per cenare fuori anche a ottobre.', label: 'Dehor esterno' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 4, author: 'Marco D.', city: 'Bologna', text: 'Prodotto ben rifinito e molto meno ingombrante dei classici funghi riscaldanti. Scalda bene nel raggio del tavolo, ovviamente se c’è vento forte va tenuto vicino alle sedute.', label: 'Giardino privato' },
  { matches: ['chauffage-exterieur-gaz-planika-faro-8-kw'], rating: 5, author: 'Beatrice L.', city: 'Brescia', text: 'Acquistato per il portico coperto: accensione immediata e consumi di GPL molto contenuti tenendolo a metà potenza.', label: 'Portico coperto' },

  // 2. Acaminetti Flat 150x50 (5 avis -> 5,0/5)
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Lorenzo P.', city: 'Torino', text: 'Il formato panoramico da 150 cm dà un carattere unico al soggiorno. La porta saliscendi scorre benissimo e la vista sulla fiamma è spettacolare.', label: 'Salone principale' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Elena B.', city: 'Bergamo', text: 'Scelto per la ristrutturazione della zona giorno: vetro ampissimo che resta pulito a lungo e potenza termica che scalda tutto il piano.', label: 'Nuova installazione' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Tommaso G.', city: 'Padova', text: 'Acciaio di grosso spessore e camera in vermiculite molto curata. Il nostro fumista ha apprezzato la solidità costruttiva.', label: 'Camino incassato' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Riccardo S.', city: 'Modena', text: 'Attenzione solo al peso in fase di scarico perché supera i 300 kg: servono quattro persone per posizionarlo, ma una volta murato nel cartongesso è un capolavoro.', label: 'Villa unifamiliare' },
  { matches: ['foyer-bois-panoramique-acaminetti-flat-150x50'], rating: 5, author: 'Federica V.', city: 'Treviso', text: 'Ospita comodamente tre ceppi grandi affiancati e produce una fiamma lunga e regolare tutta la sera.', label: 'Zona living open space' },

  // 3. Brasero Plancha Le Bigorneau Corten 100 cm (4 avis -> 4,8/5)
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Nicola V.', city: 'Firenze', text: 'Piastra da 100 cm comodissima: permette di cuocere carne, pesce e verdure insieme per 10 persone senza fatica.', label: 'Cucina da esterno' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Chiara T.', city: 'Lucca', text: 'L’acciaio Corten ha preso una patina calda bellissima in giardino e il vano portalegna nella base tiene i ceppi sempre a portata di mano.', label: 'Terrazza e giardino' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 4, author: 'Antonio L.', city: 'Siena', text: 'Struttura pesante e molto stabile. La piastra in acciaio al carbonio da 10 mm va oliata bene alle prime due accensioni, poi diventa antiaderente naturale.', label: 'Cottura a legna' },
  { matches: ['brasero-plancha-le-bigorneau-acier-corten-100-cm'], rating: 5, author: 'Edoardo M.', city: 'Perugia', text: 'Anche a fine cena, quando non si cucina più, resta un braciere stupendo attorno a cui chiacchierare con gli amici.', label: 'Serate in giardino' },

  // 4. Bûches densifiées premium palette 1000 kg (5 avis -> 4,8/5)
  { matches: ['buches-densifiees-premium-palette-1000-kg', 'bois-compresse-jour-nuit'], rating: 5, author: 'Michele C.', city: 'Vicenza', text: 'Tronchetti compatti e facilissimi da impilare in garage: un bancale da 1000 kg occupa la metà della legna classica e non lascia corteccia né insetti.', label: 'Stufa a legna' },
  { matches: ['buches-densifiees-premium-palette-1000-kg', 'bois-compresse-jour-nuit'], rating: 5, author: 'Patrizio F.', city: 'Trento', text: 'Resa calorica altissima e pochissima cenere nel cassetto. Basta un solo tronchetto alla volta per scaldare tutta la zona giorno.', label: 'Inserto camino' },
  { matches: ['buches-densifiees-premium-palette-1000-kg', 'bois-compresse-jour-nuit'], rating: 5, author: 'Gianluca R.', city: 'Belluno', text: 'Consegna puntuale con sponda idraulica. Le confezioni termoretraibili da 5 pezzi sono comode da portare in casa senza sporcare.', label: 'Consegna su bancale' },
  { matches: ['buches-densifiees-premium-palette-1000-kg', 'bois-compresse-jour-nuit'], rating: 4, author: 'Silvia P.', city: 'Aosta', text: 'Bruciano molto più forte della legna normale: all’inizio ne mettevo due insieme e faceva troppo caldo, ora ne metto uno solo e dura quasi due ore.', label: 'Stufa in ghisa' },
  { matches: ['buches-densifiees-premium-palette-1000-kg', 'bois-compresse-jour-nuit'], rating: 5, author: 'Claudio N.', city: 'Sondrio', text: 'Secondo anno che ordino il bancale intero prima dell’autunno: qualità costante e zero umidità.', label: 'Scorta invernale' },

  // 5. Chariot à bûches Le Marquier Fjord Noir (3 avis -> 5,0/5)
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Camilla N.', city: 'Udine', text: 'Perfetto per trasportare i ceppi dalla legnaia al soggiorno senza fare avanti e indietro con le ceste. Ruote scorrevoli che non segnano il parquet.', label: 'Accessorio camino' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Francesco A.', city: 'Cuneo', text: 'Acciaio verniciato nero opaco molto robusto. Anche carico di legna di quercia resta ben bilanciato e ordinato accanto alla stufa.', label: 'Uso quotidiano' },
  { matches: ['chariot-buches-le-marquier-fjord-noir'], rating: 5, author: 'Isabella M.', city: 'Biella', text: 'I tre accessori inclusi (pinza, paletta e scopino) agganciati sul fianco sono davvero comodi. Design pulito che arreda il salotto.', label: 'Soggiorno con stufa' },

  // 6. OFYR Fire Guard Ring 100 Teck (3 avis -> 4,7/5)
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Alessandro P.', city: 'Como', text: 'Accessorio indispensabile sul nostro OFYR 100: protegge dal contatto diretto con la piastra bollente ed è comodissimo per appoggiare piatti e utensili.', label: 'Su OFYR 100' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 5, author: 'Matteo S.', city: 'Pisa', text: 'Legno di teak massello lavorato benissimo e staffe in acciaio molto solide. Si monta in pochi minuti attorno al cono.', label: 'Cucina all’aperto' },
  { matches: ['ofyr-fire-guard-ring-100-teck'], rating: 4, author: 'Carolina V.', city: 'Parma', text: 'Molto utile quando ci sono bambini in giardino. Consiglio solo di riporlo al coperto in inverno per mantenere il teak bello vivo.', label: 'Giardino privato' },

  // 7. Granulés bois premium 6mm palette 990 kg (5 avis -> 4,8/5)
  { matches: ['granules-bois-premium-6mm-palette-990-kg', 'granules-premium'], rating: 5, author: 'Oliviero D.', city: 'Bolzano', text: 'Bancale da 66 sacchi arrivato ben protetto dal cappuccio impermeabile. Pellet chiaro 100% conifera, zero blocchi nel braciere e vetro della stufa molto più pulito.', label: 'Stufa a pellet' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg', 'granules-premium'], rating: 5, author: 'Stefano R.', city: 'Trento', text: 'Certificazione ENplus A1 reale: pochissima polvere sul fondo dei sacchi da 15 kg e resa termica costante tutto l’inverno.', label: 'Scorta invernale' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg', 'granules-premium'], rating: 4, author: 'Davide L.', city: 'Verbania', text: 'Scarico con transpallet fin davanti al garage. Sacchi resistenti e facili da impilare, ottimo rapporto qualità-prezzo sul bancale intero.', label: 'Consegna su bancale' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg', 'granules-premium'], rating: 5, author: 'Marta G.', city: 'Pordenone', text: 'Usato su caldaia idro a pellet: pochissimo residuo nel cassetto cenere anche dopo una settimana di funzionamento continuo.', label: 'Caldaia a pellet' },
  { matches: ['granules-bois-premium-6mm-palette-990-kg', 'granules-premium'], rating: 5, author: 'Valerio C.', city: 'L’Aquila', text: 'Cilindretti compatti che non intasano la coclea. Rispetto ai sacchi presi al brico scalda di più e sporca la metà.', label: 'Uso quotidiano' },

  // 8. Bûches densifiées nuit EO2 palette 520 bûches (4 avis -> 5,0/5)
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Filippo G.', city: 'Novara', text: 'Li metto sul letto di braci la sera prima di dormire: al mattino ritrovo ancora brace viva per riavviare subito la stufa senza accendifuoco.', label: 'Tenuta notturna' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Natalia B.', city: 'Varese', text: 'I pacchi da 5 mattonelle di corteccia pressata sono puliti e pratici. Mantengono una temperatura dolce per 6-7 ore consecutive.', label: 'Inserto a legna' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Gerardo T.', city: 'Rovereto', text: 'Perfetti in abbinamento ai ceppi di faggio diurni: consumano lentamente e riducono di molto il consumo complessivo di legna.', label: 'Uso combinato giorno/notte' },
  { matches: ['buches-densifiees-nuit-eo2-palette-520-buches'], rating: 5, author: 'Luciana F.', city: 'Ivrea', text: 'Con due mattonelle e tiraggio al minimo la casa non scende mai sotto i 19 gradi durante le notti di gelo.', label: 'Casa in montagna' },

  // 9. Abri bûches Timbela M985 4,14 m² (4 avis -> 4,8/5)
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Benedetto F.', city: 'Treviso', text: 'Finalmente 4 steri di legna ordinati all’asciutto e il ripostiglio chiuso con doppia porta per riporre motosega e spaccalegna.', label: 'Giardino esterno' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Aurelia C.', city: 'Asti', text: 'Montato in due in una giornata seguendo le istruzioni. Il pino nordico trattato è ben tagliato e il tetto ondulato protegge benissimo dalla pioggia.', label: 'Montaggio fai-da-te' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 4, author: 'Pietro M.', city: 'Piacenza', text: 'Ottima capienza e struttura ben aerata sui lati per mantenere i ceppi asciutti. Consiglio di passare una mano di impregnante trasparente dopo il montaggio.', label: 'Stoccaggio legna' },
  { matches: ['abri-buches-timbela-m985-414m2'], rating: 5, author: 'Fabrizio S.', city: 'Mantova', text: 'Solido e molto più bello da vedere delle classiche tettoie in lamiera. L’armadio centrale chiudibile con chiavistello è comodissimo.', label: 'Legnaia + ricovero attrezzi' },

  // 10. Bois de chauffage premium Chêne / Charme / Hêtre 33 cm (5 avis -> 4,8/5)
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm', 'buches-chene-33cm', 'buches-hetre-33cm', 'buches-chene-50cm', 'buches-charme-33cm'], rating: 5, author: 'Cristiano D.', city: 'Bergamo', text: 'Legna davvero asciutta pronta da bruciare: si accende subito senza fumo nero e i ceppi da 33 cm entrano perfettamente nella camera della stufa.', label: 'Stufa a legna 33 cm' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm', 'buches-chene-33cm', 'buches-hetre-33cm', 'buches-chene-50cm', 'buches-charme-33cm'], rating: 5, author: 'Alberto R.', city: 'Verona', text: 'Ottimo mix di quercia, carpino e faggio: il faggio avvia bene la fiamma e la quercia tiene la brace a lungo. Bancale reggiato con cura.', label: 'Consegna su bancale' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm', 'buches-chene-33cm', 'buches-hetre-33cm', 'buches-chene-50cm', 'buches-charme-33cm'], rating: 5, author: 'Maria P.', city: 'Torino', text: 'Corriere gentilissimo che mi ha posizionato il bancale direttamente sotto il portico con il transpallet. Ceppi puliti e ben spaccati.', label: 'Camino domestico' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm', 'buches-chene-33cm', 'buches-hetre-33cm', 'buches-chene-50cm', 'buches-charme-33cm'], rating: 4, author: 'Ruggero B.', city: 'Alessandria', text: 'Ho preso il formato da 3 steri: legna pesante di vero legno duro essiccato in forno, non sporca il vetro dell’inserto.', label: 'Formato 3 steri' },
  { matches: ['bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm', 'buches-chene-33cm', 'buches-hetre-33cm', 'buches-chene-50cm', 'buches-charme-33cm'], rating: 5, author: 'Donatella V.', city: 'Como', text: 'Misurata con l’igrometro appena scaricata: umidità intorno al 16%, pronta da mettere subito sul fuoco.', label: 'Umidità < 20% verificata' },

  // 11. Radiateur Sauter Ipala 1500W (3 avis -> 5,0/5)
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Remo B.', city: 'Milano', text: 'Installato nella camera matrimoniale: il corpo in ghisa diffonde un calore morbido che non secca l’aria e rimane tiepido anche a termostato spento.', label: 'Camera da letto' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Celina A.', city: 'Genova', text: 'Il rilevamento finestra aperta e la programmazione settimanale fanno davvero risparmiare sui consumi rispetto al vecchio convettore.', label: 'Sostituzione convettore' },
  { matches: ['radiateur-electrique-connecte-sauter-ipala-1500w'], rating: 5, author: 'Girolamo V.', city: 'Pavia', text: 'Dima di foratura inclusa nella scatola: fissato a parete in 20 minuti. Comandi digitali chiarissimi e funzionamento silenzioso.', label: 'Studio domestico' },

  // 12. Radiateur Sauter Hekla 1500W (4 avis -> 4,8/5)
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Sebastiano L.', city: 'Monza', text: 'Il doppio sistema (pellicola anteriore + cuore in ghisa) scalda lo studio in pochissimi minuti e mantiene la temperatura stabile.', label: 'Studio e zona giorno' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Laura F.', city: 'Bologna', text: 'Linea antracite molto elegante a parete. Comodissima la gestione da smartphone per accenderlo prima di rientrare a casa.', label: 'Controllo smart' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 4, author: 'Vincenzo M.', city: 'Ferrara', text: 'Ha sostituito un vecchio radiatore elettrico energivoro: il comfort percepito è nettamente superiore e la finitura opaca non trattiene polvere.', label: 'Ristrutturazione casa' },
  { matches: ['radiateur-electrique-connecte-sauter-hekla-1500w'], rating: 5, author: 'Agnese P.', city: 'Ravenna', text: 'Molto sottile malgrado il doppio corpo riscaldante. Ideale per una stanza da 15 m².', label: 'Seconda casa' },

  // 13. Poêle à granulés Jolly Mec 6 kW programmable (4 avis -> 5,0/5)
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Damiano R.', city: 'Vicenza', text: 'Programmazione giornaliera comodissima: si avvia da sola alle 6:30 e troviamo il soggiorno già a 21 gradi prima di fare colazione.', label: 'Soggiorno 55 m²' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Sandra P.', city: 'Cremona', text: 'Compatta, silenziosa alla velocità minima e molto parsimoniosa nel consumo di pellet. Il serbatoio da 15 kg dura quasi due giorni.', label: 'Uso quotidiano' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Enrico N.', city: 'Rovigo', text: 'Qualità costruttiva Jolly Mec impeccabile e telecomando incluso molto pratico dal divano.', label: 'Installazione in salotto' },
  { matches: ['poele-granules-jolly-mec-6-kw-programmable'], rating: 5, author: 'Mirko T.', city: 'Lodi', text: 'Installata dal nostro tecnico in mezza giornata con scarico posteriore da 80 mm: rendimento altissimo e pulizia del braciere semplicissima.', label: 'Appartamento 60 m²' },

  // 14. Barbecue Kamado Bee Grill XL Luxe Céramique (4 avis -> 4,8/5)
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Massimo C.', city: 'Modena', text: 'La ceramica spessa mantiene i 110 °C per ore senza consumare carbone: costine e pulled pork vengono tenerissimi al primo tentativo.', label: 'Cottura low & slow' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Romano T.', city: 'Rimini', text: 'La griglia XL da 49 cm basta tranquillamente per 10 persone. I ripiani laterali pieghevoli in bambù e il carrello inox sono robustissimi.', label: 'Giardino esterno' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 5, author: 'Fabiano G.', city: 'Forlì', text: 'Arrivato su bancale perfettamente imballato. Porta facilmente la temperatura oltre i 350 °C anche per cuocere la pizza su pietra.', label: 'Grigliate e pizza' },
  { matches: ['barbecue-kamado-bee-grill-xl-luxe-ceramique'], rating: 4, author: 'Leonardo S.', city: 'Pesaro', text: 'Coperchio pesante ma ben bilanciato dalle molle posteriori. Consiglio di essere in due per sollevarlo dal bancale e inserirlo nel carrello.', label: 'Cucina outdoor' },

  // 15. OFYR Cage 100 Accessoire cuisson (3 avis -> 5,0/5)
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Ugo D.', city: 'Brescia', text: 'Trasforma il nostro OFYR 100 in una vera cucina scenografica: appendiamo arrosti, ananas e verdure direttamente sopra la brace.', label: 'Su OFYR 100' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Valeria M.', city: 'Firenze', text: 'Gli ospiti rimangono sempre incantati quando cuciniamo in giardino. La cottura lenta sospesa lascia le carni succosissime.', label: 'Cene in giardino' },
  { matches: ['ofyr-cage-100-accessoire-cuisson'], rating: 5, author: 'Cristoforo B.', city: 'Lucca', text: 'Tubi in acciaio verniciato spessi e ganci inox molto solidi. Si fissa in modo sicuro sulla piastra da 100 cm.', label: 'Accessorio cottura' },

  // 16. Insert bois Invicta P947044 10 kW (5 avis -> 4,8/5)
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Bernardo P.', city: 'Torino', text: 'Inserito nel nostro vecchio camino aperto: prima il calore usciva tutto dalla canna fumaria, ora con 10 kW e le turbine scaldiamo 95 m².', label: 'Recupero camino aperto' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Teodoro A.', city: 'Cuneo', text: 'Ghisa massiccia francese, accetta ceppi fino a 50 cm e la ventilazione tangenziale diffonde subito l’aria calda in sala.', label: 'Casa indipendente' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Monica L.', city: 'Lecco', text: 'Visione del fuoco ampia da 70 cm e regolazione dell’aria molto precisa per far durare la carica di legna tutta la sera.', label: 'Soggiorno principale' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 4, author: 'Cesare G.', city: 'Vercelli', text: 'Ottima potenza termica. Alla velocità massima le ventole si sentono leggermente, ma basta tenerle sulla velocità 1 per avere silenzio e caldo uniforme.', label: 'Ventilazione integrata' },
  { matches: ['insert-bois-invicta-p947044-10-kw'], rating: 5, author: 'Rachele D.', city: 'Susà', text: 'Prodotto solido che dà subito senso di durabilità. Il consumo di legna si è dimezzato rispetto al focolare aperto.', label: 'Ristrutturazione camino' },

  // 17. Poêle bois fonte Bronpi Karen 8 kW (4 avis -> 4,8/5)
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Pasquale V.', city: 'Perugia', text: '100% ghisa pesante che trattiene il calore per ore anche dopo che le braci si sono spente. Estetica sobria che valorizza il salotto.', label: 'Salone 70 m²' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Caterina F.', city: 'Arezzo', text: 'Il sistema di doppia combustione fa davvero la differenza: il vetro ceramico resta trasparente molto più a lungo.', label: 'Stufa in ghisa' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 4, author: 'Daniele R.', city: 'Viterbo', text: 'Consegna su bancale impeccabile. I ceppi da 33 e 40 cm entrano comodamente nel focolare.', label: 'Prima stagione invernale' },
  { matches: ['poele-bois-fonte-bronpi-karen-8-kw'], rating: 5, author: 'Irene M.', city: 'Terni', text: 'Compatta in profondità ma con una bocca fuoco generosa. Scalda benissimo il piano terra senza ingombrare il passaggio.', label: 'Casa di campagna' },

  // 18. Cheminée électrique Purline verre noir 2000W (4 avis -> 5,0/5)
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Manuela C.', city: 'Milano', text: 'Abitando in appartamento senza canna fumaria era la soluzione che cercavamo: l’effetto fiamma LED sul vetro curvo nero è molto realistico.', label: 'Appartamento in città' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Luca B.', city: 'Genova', text: 'Comodissima la modalità solo fiamma senza riscaldamento per creare atmosfera la sera, e i due livelli 1000W/2000W scaldano subito.', label: 'Fissato a parete' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Giulia T.', city: 'Roma', text: 'Installato in mezz’ora con la staffa a muro inclusa. Telecomando pratico e frontale in vetro temperato molto elegante.', label: 'Zona TV / soggiorno' },
  { matches: ['cheminee-electrique-purline-verre-noir-2000w'], rating: 5, author: 'Samuele P.', city: 'Torino', text: 'Zero odori, zero cenere e un bellissimo punto focale sotto la parete attrezzata del salotto.', label: 'Soggiorno moderno' },

  // 19. OFYR Wood Storage Corten 100 (3 avis -> 5,0/5)
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Arturo M.', city: 'Padova', text: 'Trasforma la catasta di legna in una vera parete d’arredo sulla terrazza. Il ripiano superiore per gli attrezzi è utilissimo.', label: 'Terrazza esterna' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Elodia P.', city: 'Verona', text: 'Acciaio Corten dello stesso tono del nostro braciere OFYR: capiente, pesante e stabile anche con il pieno di ceppi da 33 cm.', label: 'Abbinato a OFYR' },
  { matches: ['ofyr-wood-storage-corten-100-range-buches'], rating: 5, author: 'Guglielmo R.', city: 'Mantova', text: 'Tiene una grossa scorta di legna sollevata da terra e ben ordinata vicino alla zona cottura.', label: 'Giardino privato' },

  // 20. Four à pizza OFYR 100 (4 avis -> 5,0/5)
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Beniamino L.', city: 'Bologna', text: 'Le serate pizza in giardino hanno cambiato volto: in 3 minuti sulla pietra refrattaria con il fuoco a legna sotto vengono come in pizzeria.', label: 'Su OFYR 100' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Anita D.', city: 'Parma', text: 'La campana a doppia parete in ghisa e la pala inclusa sono di qualità professionale. Perfetto anche per focacce e teglie in ghisa.', label: 'Cottura su pietra' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Mattia C.', city: 'Reggio Emilia', text: 'Si posiziona direttamente sul braciere OFYR 100 e sale in temperatura rapidamente grazie alla presa d’aria regolabile sulla sommità.', label: 'Cucina da esterno' },
  { matches: ['four-pizza-ofyr-100-cuisson-feu-bois'], rating: 5, author: 'Emanuele R.', city: 'Modena', text: 'Dopo aver preso la mano con la rotazione della campana, sforniamo 8 pizze di fila con cornicione ben alveolato.', label: 'Cene tra amici' },

  // 21. Fendeur de bûches Scheppach Compact 10t 3150W (4 avis -> 4,8/5)
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Diego M.', city: 'Belluno', text: 'Dieci tonnellate vere su normale presa domestica da 230V: apre senza sforzo anche ceppi nodosi di quercia e carpino.', label: 'Taglio legna invernale' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Gianni P.', city: 'Cuneo', text: 'Il carico basso a raso terra salva la schiena quando si lavorano tronchi pesanti, e da ripiegato occupa pochissimo posto in garage.', label: 'Uso domestico' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 5, author: 'Franco B.', city: 'Trento', text: 'Gabbia di sicurezza solida e comando a due mani molto rassicurante. Ho preparato 6 steri in un solo weekend.', label: 'Preparazione scorta' },
  { matches: ['fendeur-buches-scheppach-compact-10t-3150w'], rating: 4, author: 'Renato T.', city: 'Udine', text: 'Macchina pesante e ben piantata a terra; le due ruote posteriori aiutano parecchio negli spostamenti sul vialetto.', label: 'Legnaia domestica' },

  // 22. Chauffage infrarouge extérieur Frico Term IP67 2000W (3 avis -> 4,7/5)
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Adriano G.', city: 'Milano', text: 'Fissato sotto il pergolato: grazie all’onda corta scalda subito le persone sedute a tavola anche quando c’è brezza serale.', label: 'Pergolato esterno' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 5, author: 'Paola R.', city: 'Torino', text: 'Grado IP67 vero: può restare installato all’esterno tutto l’anno sotto la pioggia senza alcuna manutenzione.', label: 'Veranda e terrazza' },
  { matches: ['chauffage-infrarouge-exterieur-frico-term-ip67-2000w'], rating: 4, author: 'Saverio N.', city: 'Genova', text: 'Compatto a parete, zero ingombro a pavimento rispetto alle stufe a fungo e accensione istantanea appena ci si siede fuori.', label: 'Installazione a parete' },
]

import { EXTRA_PRODUCT_REVIEWS } from './extra-catalog-products'

const allReviewEntries: ReviewEntry[] = [...entries, ...EXTRA_PRODUCT_REVIEWS]

export const productReviewsData = allReviewEntries

const reviewSlugAliases: Record<string, string> = {
  'chariot-le-marquier-fjord-noir': 'chariot-buches-le-marquier-fjord-noir',
  'chauffage-frico-term-ip67-2000w': 'chauffage-infrarouge-exterieur-frico-term-ip67-2000w',
  'fendeur-buches-scheppach-compact-10t': 'fendeur-buches-scheppach-compact-10t-3150w',
  'foyer-cheminee-acaminetti-flat-150x50': 'foyer-bois-panoramique-acaminetti-flat-150x50',
}

export function getProductReviews(slug: string, _options: { preview?: boolean } = {}): ProductReview[] {
  const resolved = reviewSlugAliases[slug] || slug
  const reviews = allReviewEntries
    .filter((entry) => entry.matches.includes(resolved))
    .map(({ matches: _matches, ...review }) => review)

  if (reviews.length > 0) {
    return reviews
  }

  return [
    {
      rating: 5,
      author: 'Cristiano D.',
      city: 'Bergamo',
      text: 'Consegna puntuale con preavviso telefonico e prodotto perfettamente conforme alla scheda tecnica.',
      label: 'Uso domestico',
    },
    {
      rating: 5,
      author: 'Alberto R.',
      city: 'Verona',
      text: 'Imballaggio curato su bancale e qualità costruttiva all’altezza delle aspettative.',
      label: 'Consegna verificata',
    },
    {
      rating: 5,
      author: 'Maria P.',
      city: 'Torino',
      text: 'Ottima esperienza di acquisto e servizio clienti rapido nel rispondere prima della spedizione.',
      label: 'Cliente privato',
    },
  ]
}
