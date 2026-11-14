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
        ['Déchargement au hayon & transpalette', 'Dépose soignée au pas de porte ou sur allée plane et carrossable (béton, goudron, pavés) en 3 à 8 jours ouvrés selon la zone.'],
      ],
      zones: 'Zone couverte',
      zonesBody: 'Livraison offerte sur l’ensemble de la France métropolitaine, sans minimum d’achat et sans frais cachés au paiement.',
      unload: 'Accès & déchargement',
      unloadBody: 'Porteur avec hayon élévateur et transpalette manuel (charges jusqu’à 1,1 t). Prévoir un accès dégagé sur sol dur et plat.',
      delays: 'Délais indicatifs',
      delaysBody: 'Expédition sous 48 h ouvrées. Comptez 3 à 5 jours ouvrés en messagerie colis et 5 à 8 jours ouvrés sur rendez-vous pour palettes et poêles.',
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
          ['Quels sont les délais de livraison ?', 'Les articles en stock sont expédiés sous 48 h ouvrées. La livraison intervient en 3 à 5 jours ouvrés pour les colis et en 5 à 8 jours ouvrés sur rendez-vous téléphonique pour les palettes et appareils.'],
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
        ['Entladung per Hebebühne', 'Zustellung in 3–8 Werktagen auf festem, ebenem Untergrund mit Hubwagen.'],
      ],
      zones: 'Liefergebiet',
      zonesBody: 'Kostenlose Lieferung innerhalb des französischen Festlands ohne versteckte Gebühren.',
      unload: 'Zufahrt & Abladen',
      unloadBody: 'Lkw mit Hebebühne und Hubwagen. Bitte befestigte Zufahrt und festen Boden sicherstellen.',
      delays: 'Lieferzeiten',
      delaysBody: '3–5 Werktage bei Paketen, 5–8 Werktage nach Terminabstimmung bei Paletten und Kaminöfen.',
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
          ['Wie lange dauert die Lieferung?', 'Versand binnen 48 Werkstunden, Zustellung in 3–8 Werktagen je nach Produktgewicht.'],
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
      eyebrow: 'BRAVIKO / CONSEGNA',
      title: 'Consegna organizzata su appuntamento fino a casa tua.',
      intro: 'Spedizione gratuita in Francia continentale, partenza entro 48 h lavorative e scarico con sponda idraulica incluso.',
      steps: [
        ['Conferma online', 'Paga in sicurezza con carta tramite Stripe o bonifico SEPA, anche senza registrazione.'],
        ['Preparazione in 48 h', 'Controlliamo e spediamo ogni prodotto entro 48 ore lavorative.'],
        ['Appuntamento telefonico', 'Per bancali e stufe, il corriere concorda con te il giorno di consegna.'],
        ['Scarico con sponda idraulica', 'Consegna in 3–8 giorni lavorativi con transpallet su superficie piana e stabile.'],
      ],
      zones: 'Zone servite',
      zonesBody: 'Consegna inclusa su tutta la Francia continentale senza costi aggiuntivi.',
      unload: 'Accesso e scarico',
      unloadBody: 'Camion con sponda idraulica e transpallet. Necessario accesso carrabile su terreno stabile.',
      delays: 'Tempi indicativi',
      delaysBody: '3–5 giorni lavorativi per pacchi, 5–8 giorni su appuntamento per bancali e stufe.',
      questions: 'Domande sull’accesso?',
      questionsBody: 'Consulta le FAQ o scrivici prima dell’ordine.',
      faq: 'Vedi le FAQ →',
    },
    faq: {
      eyebrow: 'BRAVIKO / FAQ',
      title: 'Risposte chiare prima dell’acquisto.',
      intro: 'Combustibili, stufe, pagamenti sicuri, consegne e recesso di 14 giorni.',
      categories: [
        ['Legna, pellet e stufe', [
          ['Quale legna scegliere?', 'Quercia e carpino offrono brace duratura, faggio fiamme vive. La nostra miscela essiccata (< 20 % umidità) è pronta all’uso.'],
          ['Meglio 33 cm o 50 cm?', 'I ceppi da 33 cm sono adatti alla maggior parte delle stufe moderne; 50 cm per camere di combustione ampie.'],
        ]],
        ['Ordini e pagamenti', [
          ['Serve un account per acquistare?', 'No, puoi ordinare rapidamente anche come ospite.'],
          ['Quali pagamenti accettate?', 'Carta di credito via Stripe (3D Secure) o bonifico SEPA.'],
        ]],
        ['Consegna e resi', [
          ['Quali sono i tempi di consegna?', 'Partenza entro 48 h lavorative e consegna in 3–8 giorni lavorativi.'],
          ['È previsto il diritto di recesso?', 'Sì, hai 14 giorni di calendario dalla consegna per articoli integri e non usati.'],
        ]],
      ],
      contact: 'Altre domande?',
      contactBody: 'Il nostro team risponde entro 24 h lavorative.',
      contactCta: 'Contattaci →',
    },
  },
} satisfies Record<Locale, unknown>
