import type { Locale } from '@/lib/i18n-context'

export const commerceInfoLinks = {
  fr: { shipping: 'Expédition', returns: 'Retours et remboursements', assurance: 'Assurance transport', details: 'État et détails', vat: 'TVA et facturation' },
  de: { shipping: 'Versand', returns: 'Rückgabe und Erstattung', assurance: 'Transportversicherung', details: 'Zustand und Details', vat: 'MwSt. und Rechnungen' },
  it: { shipping: 'Spedizione', returns: 'Resi e rimborsi', assurance: 'Assicurazione trasporto', details: 'Stato e dettagli', vat: 'IVA e fatturazione' },
} satisfies Record<Locale, Record<string, string>>

export type CommerceInfoDocument = { eyebrow: string; title: string; intro: string; updated: string; sections: { title: string; body: string }[] }

export const commerceInfoCopy: Record<'retours-remboursements' | 'expedition' | 'assurance' | 'informations-produits' | 'tva', Record<Locale, CommerceInfoDocument>> = {
  'retours-remboursements': {
    fr: {
      eyebrow: 'BRAVIKO / RETOURS & RÉTRACTATION',
      title: 'Retours et remboursements',
      intro: 'Procédure claire de rétractation sous 14 jours, prise en charge des avaries transport et remboursement.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Droit de rétractation de 14 jours', body: 'Vous disposez d’un délai légal de 14 jours calendaires à compter de la livraison pour nous notifier votre souhait de retour à contact@braviko.fr en précisant votre référence de commande.' },
        { title: 'État du produit & exception', body: 'Le produit doit être retourné non utilisé, complet avec ses accessoires et notices, dans son emballage d’origine intact. En cas de colis ou palette endommagée à la livraison, joignez des photos et la copie du bon portant réserves précises.' },
        { title: 'Organisation du retour', body: 'Après validation par notre équipe, nous vous communiquons l’étiquette ou les modalités d’enlèvement adaptées au gabarit (colis ou transporteur palette). Merci de ne pas réexpédier d’article sans numéro d’accord préalable.' },
        { title: 'Remboursement rapide', body: 'Le remboursement est déclenché sous 14 jours maximum après réception et contrôle de la marchandise (ou dès confirmation en cas d’annulation avant expédition), directement sur la carte Stripe ou le compte IBAN d’origine.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / SERVICE',
      title: 'Rückgabe und Erstattung',
      intro: 'Klares Verfahren für Ihr 14-tägiges Widerrufsrecht, Transportschäden und Erstattungen.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: '14 Tage Widerrufsrecht', body: 'Kontaktieren Sie contact@braviko.fr innerhalb von 14 Kalendertagen ab Lieferung unter Angabe Ihrer Bestellnummer.' },
        { title: 'Produktzustand', body: 'Rücksendungen müssen unbenutzt, vollständig und in Originalverpackung erfolgen. Bei Transportschäden bitte Fotos und Vermerke auf dem Lieferschein beifügen.' },
        { title: 'Rücksendung abstimmen', body: 'Nach Prüfung erhalten Sie die Rücksendeadresse oder Abholhinweise für Paket bzw. Palette.' },
        { title: 'Erstattung', body: 'Nach Wareneingangsprüfung erfolgt die Rückzahlung innerhalb von maximal 14 Tagen auf das ursprüngliche Zahlungsmittel.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / RESI E RECESSO',
      title: 'Resi e rimborsi',
      intro: 'Procedura chiara per il diritto di recesso entro 14 giorni, danni da trasporto e rimborsi.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Diritto di recesso di 14 giorni', body: 'Disponi di 14 giorni solari dalla consegna per comunicarci la volontà di recesso scrivendo a contact@braviko.fr con il riferimento dell’ordine.' },
        { title: 'Stato del prodotto e avarie', body: 'Il prodotto deve essere restituito non utilizzato, completo di accessori e istruzioni, nell’imballo originale integro. In caso di pacco o bancale danneggiato alla consegna, allega fotografie e copia della ricevuta firmata con riserva specifica.' },
        { title: 'Organizzazione del rientro', body: 'Dopo verifica del nostro team, ti comunichiamo l’etichetta o le modalità di ritiro adatte al formato (pacco o corriere su bancale). Non rispedire alcun articolo senza autorizzazione preventiva.' },
        { title: 'Rimborso rapido', body: 'Il rimborso viene disposto entro un massimo di 14 giorni dal ricevimento e controllo della merce (oppure alla conferma in caso di annullamento prima della spedizione), direttamente sulla carta Stripe o sul conto IBAN utilizzato.' },
      ],
    },
  },
  expedition: {
    fr: {
      eyebrow: 'BRAVIKO / EXPÉDITION & TRANSPORT',
      title: 'Expédition et livraison',
      intro: 'Livraison offerte en France métropolitaine, préparation sous 48 h et prise de rendez-vous pour les charges lourdes.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Livraison offerte en France métropolitaine', body: 'Toutes les références du catalogue bénéficient de la livraison incluse en France métropolitaine, sans supplément caché au moment du paiement.' },
        { title: 'Délais de préparation & d’acheminement', body: 'Les produits en stock sont expédiés sous 48 h ouvrées. Comptez ensuite 3 à 5 jours ouvrés pour la messagerie colis et 5 à 12 jours ouvrés selon gabarit sur rendez-vous pour les palettes de bois, granulés, abris et appareils lourds.' },
        { title: 'Rendez-vous & accès camion hayon', body: 'Avant passage d’une palette ou d’un poêle, le transporteur vous contacte par téléphone ou SMS pour fixer le créneau. Prévoyez un accès carrossable, dégagé et une surface plane et dure (béton, enrobé, pavés) pour le déchargement au transpalette.' },
        { title: 'Contrôle à la réception', body: 'Vérifiez l’état du filmage, du colis ou de l’appareil en présence du chauffeur. En cas d’avarie visible, mentionnez des réserves détaillées sur le récépissé et prévenez contact@braviko.fr sous 48 h.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / VERSAND',
      title: 'Versand und Lieferung',
      intro: 'Kostenlose Lieferung innerhalb des französischen Festlands mit Versand innerhalb von 48 Werkstunden.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Kostenlose Lieferung', body: 'Keine zusätzlichen Versandkosten innerhalb des französischen Festlands.' },
        { title: 'Lieferzeiten', body: 'Versand binnen 48 Werkstunden; Zustellung in 3–5 Werktagen (Paket) bzw. 5–12 Werktagen je nach Größe nach Terminabstimmung (Palette/Ofen/Holzunterstand).' },
        { title: 'Zufahrt & Hebebühne', body: 'Für Paletten und Öfen ist eine befestigte Zufahrt und ein fester, ebener Untergrund für den Hubwagen erforderlich.' },
        { title: 'Kontrolle bei Annahme', body: 'Prüfen Sie Verpackung und Ware direkt beim Fahrer und dokumentieren Sie sichtbare Schäden exakt auf dem Lieferschein.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / SPEDIZIONE E TRASPORTO',
      title: 'Spedizione e consegna',
      intro: 'Spedizione gratuita su tutto il catalogo senza minimo d’ordine, preparazione entro 48 ore lavorative e appuntamento per i carichi pesanti.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Consegna gratuita su tutto il catalogo', body: 'Tutti gli articoli a catalogo beneficiano della consegna gratuita nelle destinazioni servite (Italia, Francia, Svizzera, Germania, Belgio e Lussemburgo), senza minimo d’ordine e senza costi nascosti al checkout.' },
        { title: 'Tempi di preparazione e consegna', body: 'I prodotti disponibili partono entro 48 ore lavorative. La consegna avviene in 3–5 giorni lavorativi per i pacchi e in 5–12 giorni lavorativi in base al formato su appuntamento per bancali di legna, pellet, legnaie e apparecchi pesanti.' },
        { title: 'Appuntamento e accesso camion con sponda', body: 'Prima della consegna di un bancale o di una stufa, il corriere ti contatta per telefono o SMS per concordare la fascia oraria. Prevedi accesso carrabile libero e superficie piana e compatta (asfalto, cemento o pavimentazione) per lo scarico con transpallet.' },
        { title: 'Controllo alla ricezione', body: 'Verifica imballo, reggettatura o integrità del prodotto davanti all’autista. In caso di anomalie visibili, annota riserve dettagliate sul documento di trasporto e scrivi a contact@braviko.fr entro 48 ore.' },
      ],
    },
  },
  assurance: {
    fr: {
      eyebrow: 'BRAVIKO / PROTECTION TRANSPORT',
      title: 'Assurance et transport',
      intro: 'Chaque expédition est acheminée avec suivi et couverture transport adaptée au poids et au volume des équipements.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Transporteurs spécialisés', body: 'Les palettes de combustible, poêles en fonte, inserts et braseros voyagent cerclés et filmés sur porteur équipé de hayon élévateur et transpalette.' },
        { title: 'Réserves en cas de choc', body: 'Pour activer la garantie transporteur en cas de dégât, photographiez la palette ou le colis avant ouverture et rédigez des réserves précises (la mention « sous réserve de déballage » seule n’a pas de valeur juridique).' },
        { title: 'Prise en charge SAV', body: 'Transmettez votre dossier (référence, photos et bon émargé) à contact@braviko.fr : nous coordonnons l’envoi de pièce, le remplacement ou le remboursement sans vous laisser seul face au transporteur.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / TRANSPORTSCHUTZ',
      title: 'Versicherung und Transport',
      intro: 'Jede Sendung wird mit geeignetem Frachtschutz transportiert.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Spezialisierter Transport', body: 'Paletten und Öfen reisen gesichert per Lkw mit Hebebühne.' },
        { title: 'Schadensmeldung', body: 'Konkrete Vorbehalte auf dem Frachtbrief notieren und Fotos an contact@braviko.fr senden.' },
        { title: 'Unterstützung im Schadensfall', body: 'Wir übernehmen die Koordination für Ersatzteile, Ersatzlieferung oder Erstattung.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / PROTEZIONE TRASPORTO',
      title: 'Assicurazione e trasporto',
      intro: 'Spedizioni assicurate e affidate a corrieri specializzati per carichi pesanti e combustibili.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Corrieri dedicati', body: 'Bancali, stufe e bracieri viaggiano protetti su mezzi con sponda idraulica.' },
        { title: 'Riserve in caso di danno', body: 'Annota sempre danni visibili sul DDT con dettaglio preciso e invia foto a contact@braviko.fr.' },
        { title: 'Assistenza diretta', body: 'Coordiniamo noi la pratica di sostituzione o rimborso con il corriere.' },
      ],
    },
  },
  'informations-produits': {
    fr: {
      eyebrow: 'BRAVIKO / FICHE & CONFORMITÉ',
      title: 'État et détails des produits',
      intro: 'Toutes les références commercialisées sur braviko.fr sont neuves, complètes et conformes aux normes européennes en vigueur.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Produits neufs & garantis', body: 'L’ensemble des appareils de chauffage, équipements extérieurs et combustibles proposés sont neufs, livrés avec notices et garanties constructeurs de 2 à 5 ans selon les fabricants.' },
        { title: 'Combustibles certifiés', body: 'Nos bois de chauffage, granulés ENplus A1 / DINplus et bûches densifiées affichent leurs caractéristiques clés (essences, taux d’humidité, pouvoir calorifique, conditionnement exact) directement sur chaque fiche.' },
        { title: 'Prix TTC & déclinaisons', body: 'Chaque format ou variante sélectionnée met automatiquement à jour le prix TTC et l’équivalent unitaire (au stère, au kilo ou au sac) avant le passage en caisse.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / PRODUKTINFORMATIONEN',
      title: 'Produktzustand und Details',
      intro: 'Alle angebotenen Artikel sind neu, geprüft und entsprechen den geltenden europäischen Normen.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Neuware mit Garantie', body: 'Alle Öfen, Outdoor-Geräte und Brennstoffe sind Neuware mit 2 bis 5 Jahren Herstellergarantie je nach Marke.' },
        { title: 'Zertifizierte Brennstoffe', body: 'Holzarten, Feuchtegrad, Heizwert und Gebindegröße stehen transparent auf jeder Produktseite.' },
        { title: 'Preise & Varianten', body: 'Der Bruttopreis und Grundpreis passen sich vor dem Checkout automatisch der gewählten Variante an.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / SCHEDE PRODOTTO',
      title: 'Stato e dettagli dei prodotti',
      intro: 'Tutti gli articoli su braviko.fr sono nuovi, completi e conformi alle normative europee.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Prodotti nuovi e garantiti', body: 'Apparecchi di riscaldamento, accessori e combustibili sono nuovi e coperti da garanzia legale e del produttore.' },
        { title: 'Combustibili certificati', body: 'Essenze, umidità, potere calorifico e peso netto sono specificati in ogni scheda tecnica.' },
        { title: 'Prezzi IVA inclusa', body: 'La selezione del formato aggiorna in tempo reale il prezzo finale e il prezzo unitario.' },
      ],
    },
  },
  tva: {
    fr: {
      eyebrow: 'BRAVIKO / FACTURATION & TVA',
      title: 'TVA et facturation',
      intro: 'Tarifs affichés toutes taxes comprises (TTC) et obtention de facture pour particuliers ou professionnels.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Prix TTC transparents', body: 'Tous les prix affichés sur braviko.fr incluent la TVA française applicable selon la nature du produit (taux réduit pour les combustibles bois, taux normal pour les appareils et accessoires).' },
        { title: 'Facture & justificatif', body: 'Votre confirmation de commande et votre justificatif récapitulent le détail des articles et montants payés. Pour recevoir une facture PDF personnalisée, écrivez à contact@braviko.fr avec votre numéro de commande.' },
        { title: 'Entreprises & facturation pro', body: 'Indiquez la raison sociale et l’adresse de facturation lors de la commande ou par email dès validation afin que notre service établisse la facture correspondante.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / MWST. & RECHNUNG',
      title: 'MwSt. und Rechnungen',
      intro: 'Transparente Bruttopreise inklusive französischer Mehrwertsteuer und Rechnungsstellung.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Preise inkl. MwSt.', body: 'Alle Preise enthalten die jeweils gültige gesetzliche Mehrwertsteuer.' },
        { title: 'Rechnung anfordern', body: 'Eine PDF-Rechnung mit Ihren Rechnungsdaten erhalten Sie über contact@braviko.fr unter Angabe der Bestellnummer.' },
        { title: 'Geschäftskunden', body: 'Geben Sie Firmenname und Rechnungsanschrift direkt bei der Bestellung an.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / IVA E FATTURAZIONE',
      title: 'IVA e fatturazione',
      intro: 'Prezzi trasparenti IVA inclusa ed emissione fattura per privati e aziende.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Prezzi IVA inclusa', body: 'Tutti i prezzi mostrati sul sito includono l’IVA applicabile per categoria di prodotto.' },
        { title: 'Richiesta fattura', body: 'Per ricevere una fattura PDF intestata scrivi a contact@braviko.fr indicando il riferimento dell’ordine.' },
        { title: 'Clienti business', body: 'Comunica ragione sociale e dati fiscali al momento dell’ordine.' },
      ],
    },
  },
}
