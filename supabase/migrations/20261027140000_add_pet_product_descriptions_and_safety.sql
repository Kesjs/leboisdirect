-- Customer-facing product content for the published pet catalogue.
-- Copy is deliberately conservative: it uses verified product-family facts
-- where available and category guidance elsewhere, without medical claims.

alter table public.braviko_products
  add column if not exists product_details jsonb not null default '{}'::jsonb;

with pet_rows as (
  select
    p.id,
    c.slug as category_slug,
    t.name
  from public.braviko_products p
  join public.braviko_categories c on c.id = p.category_id
  join public.braviko_product_translations t
    on t.product_id = p.id and t.locale = 'it'
  where p.status = 'published'
    and c.slug in ('alimentazione', 'comfort', 'passeggiata-trasporto')
)
update public.braviko_products p
set product_details = case
  when r.category_slug = 'alimentazione'
    and r.name ilike 'Royal Canin Maxi Adult%'
  then jsonb_build_object(
    'overview', 'Alimento secco completo per cani adulti di taglia grande, indicato dai 15 mesi e per un peso adulto di circa 26–44 kg. La formula è pensata per accompagnare la digestione e il mantenimento di ossa e articolazioni nella routine quotidiana.',
    'benefits', jsonb_build_array(
      'Formula dedicata ai cani adulti di taglia grande',
      'Formato da 15 kg indicato nella referenza',
      'Razione da adattare al peso, all’attività e alle indicazioni riportate sull’etichetta'
    ),
    'usage', 'Servi seguendo la tabella di razionamento riportata sulla confezione e lascia sempre acqua fresca a disposizione. Per un cambio di alimento, procedi gradualmente.',
    'care', 'Conserva il sacco ben chiuso, in un luogo fresco e asciutto, lontano dalla luce diretta.',
    'safety', jsonb_build_array(
      'Non utilizzare questa descrizione per sostituire il parere di un veterinario.',
      'Per esigenze cliniche, allergie o diete terapeutiche, chiedi consiglio al veterinario prima dell’acquisto.',
      'Controlla sempre etichetta, lotto e data di conservazione sulla confezione ricevuta.'
    ),
    'included', 'Una confezione del formato indicato nella scheda prodotto.'
  )
  when r.category_slug = 'comfort'
    and r.name ilike 'Natural Paradise Jasmine XXL%'
  then jsonb_build_object(
    'overview', 'Tiragraffi a colonna di grandi dimensioni progettato per offrire al gatto uno spazio dedicato per arrampicarsi, riposare e affilare le unghie, aiutando a proteggere gli altri mobili della casa.',
    'benefits', jsonb_build_array(
      'Colonna rivestita in sisal naturale per la graffiatura',
      'Tre lettini e superfici pensate per gioco e riposo',
      'Possibilità di fissaggio a parete per una maggiore stabilità'
    ),
    'usage', 'Posiziona il tiragraffi su una superficie piana e in un punto sicuro. Prima dell’uso verifica la stabilità e, se necessario, realizza il fissaggio a parete con viti e tasselli adatti al tipo di parete.',
    'care', 'Controlla regolarmente viti, basi e rivestimenti. Segui le istruzioni di cura e sostituisci il prodotto se presenta parti rotte o instabili.',
    'safety', jsonb_build_array(
      'Solo per uso da parte di animali domestici e solo in ambienti interni.',
      'Non lasciare che bambini o adulti salgano, si dondolino o si appoggino alla struttura.',
      'Tieni il prodotto lontano da fonti di calore e fiamme libere e fuori dalla portata dei bambini.'
    ),
    'included', 'Struttura Natural Paradise Jasmine XXL e componenti previsti dalla confezione. Il materiale per il fissaggio a parete va scelto in base alla parete e non è necessariamente incluso.'
  )
  when r.category_slug = 'comfort'
    and r.name ilike '%Jonna%'
  then jsonb_build_object(
    'overview', 'Cuccia ortopedica pensata per offrire un appoggio stabile e confortevole durante il riposo. La referenza Jonna utilizza un sistema a due strati con schiuma viscoelastica effetto memory e schiuma comfort.',
    'benefits', jsonb_build_array(
      'Superficie di riposo con effetto memory',
      'Rivestimento in poliestere e base antiscivolo',
      'Coperture rimovibili per una manutenzione più semplice'
    ),
    'usage', 'Scegli una superficie piana e lascia spazio sufficiente intorno alla cuccia. Verifica che il formato sia adatto alla taglia e al modo di dormire del tuo cane.',
    'care', 'Rimuovi le coperture quando previsto e lavale seguendo le istruzioni del produttore. Lascia asciugare completamente prima di riutilizzare la cuccia.',
    'safety', jsonb_build_array(
      'Solo per animali domestici: controlla regolarmente cuciture, imbottitura e base.',
      'Interrompi l’uso se il prodotto è danneggiato o se l’animale ingerisce parti del rivestimento.',
      'Non posizionare la cuccia vicino a fiamme libere o fonti di calore intenso.'
    ),
    'included', 'Una cuccia Jonna nel formato e colore indicati nella scheda.'
  )
  when r.category_slug = 'passeggiata-trasporto'
    and r.name ilike 'Trasportino Ferplast Superior L%'
  then jsonb_build_object(
    'overview', 'Trasportino pieghevole in metallo e plastica per cani, con più aperture, fondo lavabile e sistema di drenaggio. Il formato Superior L indicato nella scheda misura circa 118 × 77 × 82,5 cm e supporta fino a 50 kg secondo la referenza consultata.',
    'benefits', jsonb_build_array(
      'Struttura pieghevole per riporlo più facilmente',
      'Tre aperture e tetto apribile per un accesso più pratico',
      'Fondo in plastica lavabile con sistema di scolo e piedini antiscivolo'
    ),
    'usage', 'Scegli il formato in base alla taglia adulta del cane. Abitua gradualmente l’animale al trasportino, iniziando con la porta aperta e brevi permanenze prima dei viaggi.',
    'care', 'Rimuovi e pulisci il fondo secondo le istruzioni del produttore. Controlla chiusure, griglia, piedini e punti di piegatura prima di ogni utilizzo.',
    'safety', jsonb_build_array(
      'Non superare il carico massimo e le dimensioni interne indicate per il formato scelto.',
      'Durante il trasporto in auto, assicurati che il trasportino sia posizionato e fissato in modo stabile.',
      'Non utilizzare un trasportino danneggiato e non trasformarlo in una punizione per l’animale.'
    ),
    'included', 'Trasportino Superior L nel formato indicato, con fondo e componenti previsti dalla referenza.'
  )
  when r.category_slug = 'alimentazione'
  then jsonb_build_object(
    'overview', 'Alimento per animali selezionato per accompagnare la routine quotidiana. Il formato e il peso indicati nel nome aiutano a scegliere la confezione più adatta alle esigenze della casa.',
    'benefits', jsonb_build_array(
      'Referenza e formato indicati chiaramente nella scheda',
      'Soluzione pratica per la gestione quotidiana dei pasti',
      'Formato da scegliere in base a specie, età, taglia e razione consigliata'
    ),
    'usage', 'Segui le indicazioni riportate sull’etichetta del produttore, adatta la razione al peso e all’attività dell’animale e lascia sempre acqua fresca a disposizione.',
    'care', 'Conserva il prodotto nella confezione originale, ben chiusa, in un luogo fresco e asciutto. Rispetta lotto e data di conservazione.',
    'safety', jsonb_build_array(
      'Non usare un alimento dietetico o terapeutico senza il parere di un veterinario.',
      'Controlla sempre specie, età, formato, ingredienti e razione sull’etichetta ricevuta.',
      'In caso di reazione o cambiamento improvviso della dieta, interrompi e chiedi consiglio a un professionista.'
    ),
    'included', 'Una confezione del formato indicato nella scheda prodotto.'
  )
  when r.category_slug = 'comfort'
  then jsonb_build_object(
    'overview', 'Accessorio per creare uno spazio dedicato al comfort, al riposo o all’attività del tuo animale in casa. Il formato e il colore corrispondono alla referenza indicata nella scheda.',
    'benefits', jsonb_build_array(
      'Aiuta a organizzare una zona dedicata all’animale',
      'Pensato per la routine domestica, il riposo o il gioco',
      'Scelta più semplice grazie a formato, taglia e materiali indicati'
    ),
    'usage', 'Posiziona il prodotto su una superficie stabile e scegli una zona adatta alla taglia e alle abitudini del tuo animale.',
    'care', 'Segui le istruzioni di lavaggio e manutenzione del produttore. Controlla regolarmente cuciture, rivestimenti e parti mobili.',
    'safety', jsonb_build_array(
      'Solo per animali domestici: sorveglia il primo utilizzo.',
      'Controlla la stabilità e non utilizzare il prodotto se presenta rotture o parti che possono essere ingerite.',
      'Tieni l’accessorio lontano da fiamme libere e fonti di calore intenso.'
    ),
    'included', 'Una referenza nel formato e colore indicati nella scheda; per il montaggio, verifica i componenti inclusi nella confezione.'
  )
  else jsonb_build_object(
    'overview', 'Accessorio pensato per accompagnare passeggiate, spostamenti e viaggi con il tuo animale, con un formato da scegliere in base a taglia, peso e utilizzo previsto.',
    'benefits', jsonb_build_array(
      'Aiuta a organizzare gli spostamenti quotidiani',
      'Formato e variante riportati chiaramente nella scheda',
      'Scelta da adattare alla taglia e al peso dell’animale'
    ),
    'usage', 'Prima dell’uso verifica misure, carico massimo e compatibilità con il tuo animale. Abitualo gradualmente e segui le istruzioni del produttore.',
    'care', 'Controlla regolarmente cuciture, chiusure, ruote, griglie e punti di fissaggio. Pulisci il prodotto secondo le istruzioni della referenza.',
    'safety', jsonb_build_array(
      'Non superare mai misure e carico massimo indicati dal produttore.',
      'Durante gli spostamenti assicurati che l’animale abbia ventilazione e spazio adeguati.',
      'Non utilizzare l’accessorio se è danneggiato o se le chiusure non funzionano correttamente.'
    ),
    'included', 'Una referenza nel formato indicato nella scheda; verifica eventuali accessori inclusi prima dell’ordine.'
  )
end
from pet_rows r
where p.id = r.id;

with pet_rows as (
  select p.id, t.name
  from public.braviko_products p
  join public.braviko_categories c on c.id = p.category_id
  join public.braviko_product_translations t on t.product_id = p.id and t.locale = 'it'
  where p.status = 'published'
    and c.slug in ('alimentazione', 'comfort', 'passeggiata-trasporto')
)
update public.braviko_products p
set product_attributes = p.product_attributes || case
  when r.name ilike 'Natural Paradise Jasmine XXL%'
  then jsonb_build_object(
    'dimensions', 'H 219 × L 117 × P 55 cm',
    'materials', 'Compensato di betulla, sisal naturale e imbottiture in poliestere certificato Oeko-Tex',
    'assembly', 'Montaggio richiesto; fissaggio a parete da valutare in base alla parete'
  )
  when r.name ilike '%Jonna%'
  then jsonb_build_object(
    'dimensions', '100 × 70 × 70 cm per la variante L',
    'materials', 'Rivestimento in poliestere, schiuma viscoelastica effetto memory e schiuma comfort',
    'assembly', 'Montaggio semplice'
  )
  when r.name ilike 'Trasportino Ferplast Superior L%'
  then jsonb_build_object(
    'dimensions', 'L 118 × P 77 × H 82,5 cm; interne circa L 113 × P 72 × H 79 cm',
    'materials', 'Barre in metallo, telaio e componenti in plastica, piedini in gomma',
    'capacity', 'Carico massimo indicato: 50 kg',
    'assembly', 'Pieghevole, montaggio senza utensili'
  )
  else '{}'::jsonb
end
from pet_rows r
where p.id = r.id;

