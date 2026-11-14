import type { Locale } from '@/lib/i18n-context'

export const pageCopy = {
  fr: {
    delivery: {
      eyebrow: 'BRAVIKO / LIVRAISON FRANCE',
      title: 'Une livraison organisée avec vous, jusqu’à votre domicile.',
      intro: 'La livraison est offerte en France métropolitaine. Expédition sous 48 h ouvrées et prise de rendez-vous préalable pour toutes les palettes et appareils lourds.',
      steps: [
        ['Commande confirmée en ligne', 'Réglez en toute sécurité par carte bancaire Stripe ou virement SEPA, sans obligation de créer un compte.'],
        ['Préparation & contrôle sous 48 h', 'Votre palette, votre appareil ou votre colis est vérifié, cerclé et remis au transporteur adapté sous 48 h ouvrées.'],
        ['Prise de rendez-vous téléphonique', 'Pour les palettes et gros équipements, le transporteur vous contacte par téléphone ou SMS afin de fixer le jour de passage.'],
        ['Déchargement au hayon & transpalette', 'Dépose soignée au pas de porte ou sur allée plane et carrossable (béton, goudron, pavés) en 3 à 12 jours ouvrés selon gabarit et zone.'],
      ],
      zones: 'Zone couverte',
      zonesBody: 'Livraison offerte sur l’ensemble de la France métropolitaine, sans minimum d’achat et sans frais cachés au paiement.',
      unload: 'Accès & déchargement',
      unloadBody: 'Porteur avec hayon élévateur et transpalette manuel (charges jusqu’à 1,1 t). Prévoir un accès dégagé sur sol dur et plat.',
      delays: 'Délais indicatifs',
      delaysBody: 'Expédition sous 48 h ouvrées. Comptez 3 à 5 jours ouvrés en messagerie colis et 5 à 12 jours ouvrés selon gabarit sur rendez-vous pour palettes, abris et poêles.',
      questions: 'Une contrainte d’accès ?',
      questionsBody: 'Rue étroite, graviers, forte pente ? Consultez notre FAQ ou contactez notre équipe avant ou après commande.',
      faq: 'Voir la FAQ livraison →',
    },
    faq: {
      eyebrow: 'BRAVIKO / QUESTIONS FRÉQUENTES',
      title: 'Les réponses claires avant de commander.',
      intro: 'Combustibles, poêles et inserts, paiement sécurisé, accès transporteur et retours sous 14 jours.',
      categories: [
        ['Bois, granulés & appareils', [
          ['Quel bois de chauffage choisir pour mon foyer ?', 'Le chêne et le charme brûlent lentement avec des braises très chaudes ; le hêtre offre des flammes vives. Notre mélange chêne/charme/hêtre séché à moins de 20 % est prêt à brûler dès réception.'],
          ['Quelle longueur de bûches choisir (33 cm ou 50 cm) ?', 'Le format 33 cm convient à la quasi-totalité des poêles à bois modernes et inserts compacts. Choisissez 50 cm si la chambre de combustion de votre foyer mesure au moins 55 cm de large.'],
          ['Comment connaître l’humidité et les certifications ?', 'Chaque fiche technique détaille le taux d’humidité garanti (< 20 % pour nos bûches séchées en séchoir, ≤ 8 % pour nos granulés certifiés ENplus A1 / DINplus) et la garantie constructeur.'],
        ]],
        ['Commande, paiement & sécurité', [
          ['Faut-il créer un compte pour commander ?', 'Non. Vous pouvez finaliser votre achat directement en mode invité avec votre adresse email, ou créer un compte pour retrouver l’historique de vos commandes.'],
          ['Quels moyens de paiement acceptez-vous ?', 'Carte bancaire (CB, Visa, Mastercard via Stripe 3D Secure) pour une validation immédiate, ou virement bancaire SEPA (expédition déclenchée dès réception des fonds).'],
          ['Les prix affichés incluent-ils la TVA et la livraison ?', 'Oui. Les tarifs sont indiqués TTC en euros et la livraison en France métropolitaine est incluse sans supplément au panier.'],
        ]],
        ['Livraison, accès & retours', [
          ['Quels sont les délais de livraison ?', 'Les articles en stock sont expédiés sous 48 h ouvrées. La livraison intervient en 3 à 5 jours ouvrés pour les colis et en 5 à 12 jours ouvrés selon gabarit sur rendez-vous téléphonique pour les palettes, abris et appareils.'],
          ['Le camion avec hayon peut-il accéder partout ?', 'Le porteur (jusqu’à 19 tonnes) décharge au transpalette au plus près de votre domicile sur sol plat et dur (goudron, béton, pavés). Le transpalette ne roule pas sur graviers épais, pelouse ou pente raide.'],
          ['Puis-je me rétracter ou retourner un produit ?', 'Oui. Vous bénéficiez d’un délai légal de 14 jours calendaires après réception pour retourner tout produit neuf, complet, non utilisé et dans son emballage d’origine via contact@braviko.fr.'],
        ]],
      ],
      contact: 'Une autre question avant d’acheter ?',
      contactBody: 'Notre équipe répond à vos questions techniques ou d’accès livraison sous 24 h ouvrées.',
      contactCta: 'Contacter Braviko →',
    },
  },
  de: {
    delivery: {
      eyebrow: 'BRAVIKO / LIEFERUNG',
      title: 'Planbare Lieferung bis vor Ihre Haustür.',
      intro: 'Kostenlose Lieferung innerhalb des französischen Festlands. Versand binnen 48 Werkstunden und telefonische Terminabsprache für Paletten und Öfen.',
      steps: [
        ['Bestellung online bestätigen', 'Sicher per Karte über Stripe oder SEPA-Überweisung bestellen – auch als Gast.'],
        ['Prüfung & Versand binnen 48 h', 'Ware wird verpackt, geprüft und innerhalb von 48 Werkstunden übergeben.'],
        ['Telefonische Terminabsprache', 'Der Spediteur stimmt den genauen Liefertag vorab per Telefon oder SMS mit Ihnen ab.'],
        ['Entladung per Hebebühne', 'Zustellung in 3–12 Werktagen je nach Größe auf festem, ebenem Untergrund mit Hubwagen.'],
      ],
      zones: 'Liefergebiet',
      zonesBody: 'Kostenlose Lieferung innerhalb des französischen Festlands ohne versteckte Gebühren.',
      unload: 'Zufahrt & Abladen',
      unloadBody: 'Lkw mit Hebebühne und Hubwagen. Bitte befestigte Zufahrt und festen Boden sicherstellen.',
      delays: 'Lieferzeiten',
      delaysBody: '3–5 Werktage bei Paketen, 5–12 Werktage je nach Größe nach Terminabstimmung bei Paletten, Holzunterständen und Kaminöfen.',
      questions: 'Besondere Zufahrt?',
      questionsBody: 'Lesen Sie unsere FAQ oder schreiben Sie uns vorab.',
      faq: 'FAQ ansehen →',
    },
    faq: {
      eyebrow: 'BRAVIKO / FAQ',
      title: 'Klare Antworten vor dem Kauf.',
      intro: 'Brennstoffe, Kaminöfen, Zahlung, Lieferung und 14 Tage Widerrufsrecht.',
      categories: [
        ['Holz, Pellets & Öfen', [
          ['Welches Brennholz passt zu meinem Ofen?', 'Eiche und Hainbuche brennen ruhig und lange, Buche sorgt für lebhafte Flammen. Unsere getrockneten Scheite (< 20 % Restfeuchte) sind sofort einsatzbereit.'],
          ['33 cm oder 50 cm Scheitlänge?', '33 cm passt in nahezu alle modernen Kaminöfen; 50 cm eignet sich für breite Feuerräume ab ca. 55 cm.'],
        ]],
        ['Bestellung & Zahlung', [
          ['Ist eine Bestellung ohne Konto möglich?', 'Ja, Gastbestellungen ohne Konto sind jederzeit möglich.'],
          ['Welche Zahlungsarten werden akzeptiert?', 'Kreditkarte über Stripe (3D Secure) oder SEPA-Banküberweisung.'],
        ]],
        ['Lieferung & Rückgabe', [
          ['Wie lange dauert die Lieferung?', 'Versand binnen 48 Werkstunden, Zustellung in 3–12 Werktagen je nach Größe und Gewicht.'],
          ['Habe ich ein Widerrufsrecht?', 'Ja, 14 Kalendertage gesetzliches Widerrufsrecht auf unbenutzte Artikel in Originalverpackung.'],
        ]],
      ],
      contact: 'Noch eine Frage?',
      contactBody: 'Unser Team hilft Ihnen innerhalb von 24 Werkstunden weiter.',
      contactCta: 'Kontakt aufnehmen →',
    },
  },
  it: {
    delivery: {
      eyebrow: 'BRAVIKO / CONSEGNA ITALIA',
      title: 'Una consegna organizzata con te, fino a casa tua.',
      intro: 'La consegna è gratuita in tutta Italia. Spedizione entro 48 ore lavorative e appuntamento telefonico preventivo per tutti i bancali e gli apparecchi pesanti.',
      steps: [
        ['Ordine confermato online', 'Paga in sicurezza con carta tramite Stripe o bonifico SEPA, anche senza creare un account.'],
        ['Preparazione e controllo in 48 h', 'Il tuo bancale, apparecchio o pacco viene verificato, reggettato e affidato al corriere specializzato entro 48 ore lavorative.'],
        ['Appuntamento telefonico', 'Per bancali e attrezzature voluminose, il corriere ti contatta per telefono o SMS per concordare il giorno della consegna.'],
        ['Scarico con sponda idraulica e transpallet', 'Consegna accurata al piano strada o su viale carrabile piano e stabile (asfalto, cemento, autobloccanti) in 3–12 giorni lavorativi in base al formato.'],
      ],
      zones: 'Area servita',
      zonesBody: 'Consegna gratuita in tutta Italia, senza minimo d’ordine e senza costi nascosti al checkout.',
      unload: 'Accesso e scarico',
      unloadBody: 'Camion dotato di sponda idraulica e transpallet manuale (carichi fino a 1,1 t). Prevedere un accesso libero su terreno duro e piano.',
      delays: 'Tempi indicativi',
      delaysBody: 'Spedizione entro 48 ore lavorative. Consegna in 3–5 giorni lavorativi per i pacchi e in 5–12 giorni lavorativi in base al formato su appuntamento per bancali, legnaie e stufe.',
      questions: 'Un dubbio sull’accesso?',
      questionsBody: 'Strada stretta, ghiaia o pendenza? Consulta le FAQ o contatta il nostro team prima o dopo l’ordine.',
      faq: 'Vedi le FAQ consegna →',
    },
    faq: {
      eyebrow: 'BRAVIKO / DOMANDE FREQUENTI',
      title: 'Risposte chiare prima di ordinare.',
      intro: 'Combustibili, stufe e inserti, pagamento sicuro, accesso del corriere e resi entro 14 giorni.',
      categories: [
        ['Legna, pellet e apparecchi', [
          ['Quale legna da ardere scegliere per il mio focolare?', 'Quercia e carpino bruciano lentamente sviluppando brace molto calda; il faggio produce fiamme vive. La nostra miscela quercia/carpino/faggio essiccata sotto il 20 % di umidità è subito pronta all’uso.'],
          ['Quale lunghezza di ceppi scegliere (33 cm o 50 cm)?', 'Il formato 33 cm è adatto alla quasi totalità delle stufe a legna moderne e degli inserti compatti. Scegli 50 cm se la camera di combustione misura almeno 55 cm di larghezza.'],
          ['Come verificare umidità e certificazioni?', 'Ogni scheda tecnica indica il tasso di umidità garantito (< 20 % per la legna essiccata in forno, ≤ 8 % per il pellet certificato ENplus A1 / DINplus) e la garanzia del produttore.'],
        ]],
        ['Ordini, pagamenti e sicurezza', [
          ['È necessario creare un account per ordinare?', 'No. Puoi completare l’acquisto come ospite con il tuo indirizzo email oppure creare un account per ritrovare lo storico degli ordini.'],
          ['Quali metodi di pagamento accettate?', 'Carta di credito o debito (Visa, Mastercard, Carta Bancaria tramite Stripe 3D Secure) per conferma immediata, oppure bonifico bancario SEPA (spedizione avviata all’accredito).'],
          ['I prezzi esposti includono IVA e spedizione?', 'Sì. I prezzi sono indicati in euro IVA inclusa e la spedizione in Italia è compresa senza supplementi al carrello.'],
        ]],
        ['Consegna, accesso e resi', [
          ['Quali sono i tempi di consegna?', 'Gli articoli disponibili vengono spediti entro 48 ore lavorative. La consegna avviene in 3–5 giorni lavorativi per i pacchi e in 5–12 giorni lavorativi in base al formato previo appuntamento telefonico per bancali, legnaie e apparecchi.'],
          ['Il camion con sponda idraulica arriva ovunque?', 'Il mezzo (fino a 19 tonnellate) scarica con transpallet il più vicino possibile all’ingresso su fondo piano e compatto (asfalto, cemento, pavimentazione). Il transpallet non può operare su ghiaia alta, prato o forte pendenza.'],
          ['Posso esercitare il diritto di recesso o effettuare un reso?', 'Sì. Hai 14 giorni solari dalla consegna per richiedere il recesso scrivendo a contact@braviko.fr su qualsiasi articolo integro, completo, non utilizzato e nell’imballo originale.'],
        ]],
      ],
      contact: 'Altre domande prima dell’acquisto?',
      contactBody: 'Il nostro team risponde alle domande tecniche o logistiche entro 24 ore lavorative.',
      contactCta: 'Contatta Braviko →',
    },
  },
} satisfies Record<Locale, unknown>
