import type { Locale } from '@/lib/i18n-context'

export const commerceInfoLinks = {
  fr: { shipping: 'Expédition', returns: 'Retours et remboursements', assurance: 'Assurance transport', details: 'État et détails', vat: 'TVA et facturation' },
  de: { shipping: 'Versand', returns: 'Rückgabe und Erstattung', assurance: 'Transportversicherung', details: 'Zustand und Details', vat: 'MwSt. und Rechnungen' },
  it: { shipping: 'Spedizione', returns: 'Resi e rimborsi', assurance: 'Assicurazione trasporto', details: 'Stato e dettagli', vat: 'IVA e fatturazione' },
} satisfies Record<Locale, Record<string, string>>

export type CommerceInfoDocument = { eyebrow: string; title: string; intro: string; updated: string; sections: { title: string; body: string }[] }

export const commerceInfoCopy: Record<'retours-remboursements' | 'expedition' | 'assurance' | 'informations-produits' | 'tva', Record<Locale, CommerceInfoDocument>> = {
  'retours-remboursements': {
    fr: { eyebrow: 'BRAVIKO / APRÈS-VENTE', title: 'Retours et remboursements', intro: 'Les étapes à suivre si votre produit ne correspond pas à votre besoin ou arrive avec un problème.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Nous contacter rapidement', body: 'Écrivez à contact@leboisdirect.fr en indiquant votre référence de commande, le produit concerné et la raison de votre demande. Pour un produit endommagé, joignez des photos de l’emballage et du produit.' },
      { title: 'Délai et état du produit', body: 'Les conditions de retour dépendent de la nature du produit, de son état et des règles applicables aux biens concernés. Un produit doit rester inutilisé, complet et correctement protégé lorsque cela est possible. Certains produits sur mesure, consommables ou déjà utilisés peuvent suivre un régime différent.' },
      { title: 'Validation du retour', body: 'Après examen de votre demande, nous vous indiquons l’adresse, le transporteur et les modalités adaptées. N’expédiez pas un colis sans accord préalable : cela pourrait retarder son traitement.' },
      { title: 'Remboursement', body: 'Lorsque le remboursement est accepté, il est effectué sur le moyen de paiement utilisé ou selon la solution convenue, après réception et contrôle du produit. Les frais de livraison et de retour sont traités selon le motif du retour et la réglementation applicable.' },
    ] },
    de: { eyebrow: 'BRAVIKO / SERVICE', title: 'Rückgabe und Erstattung', intro: 'Die Schritte, wenn ein Produkt nicht passt oder beschädigt ankommt.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Schnell Kontakt aufnehmen', body: 'Schreiben Sie an contact@leboisdirect.fr mit Bestellnummer, Produkt und Grund. Bei Schäden senden Sie bitte Fotos von Verpackung und Produkt.' },
      { title: 'Frist und Produktzustand', body: 'Die Rückgabebedingungen hängen von Produktart, Zustand und anwendbarem Recht ab. Produkte sollten möglichst unbenutzt, vollständig und geschützt sein. Maßanfertigungen, Verbrauchsartikel oder benutzte Produkte können besonderen Regeln unterliegen.' },
      { title: 'Freigabe der Rückgabe', body: 'Nach Prüfung teilen wir Adresse, Versanddienstleister und Vorgehen mit. Senden Sie kein Paket ohne vorherige Bestätigung.' },
      { title: 'Erstattung', body: 'Bei Annahme erfolgt die Erstattung nach Eingang und Prüfung über das ursprüngliche Zahlungsmittel oder eine vereinbarte Lösung. Versandkosten richten sich nach Grund und geltendem Recht.' },
    ] },
    it: { eyebrow: 'BRAVIKO / ASSISTENZA', title: 'Resi e rimborsi', intro: 'Cosa fare se un prodotto non è adatto o arriva danneggiato.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Contattaci subito', body: 'Scrivi a contact@leboisdirect.fr indicando riferimento dell’ordine, prodotto e motivo. Per un danno, allega foto dell’imballaggio e del prodotto.' },
      { title: 'Termine e stato del prodotto', body: 'Le condizioni dipendono dal prodotto, dal suo stato e dalla legge applicabile. Quando possibile il prodotto deve essere inutilizzato, completo e protetto. Prodotti su misura, consumabili o già utilizzati possono seguire regole diverse.' },
      { title: 'Autorizzazione del reso', body: 'Dopo la verifica comunicheremo indirizzo, corriere e modalità. Non spedire un pacco senza autorizzazione preventiva.' },
      { title: 'Rimborso', body: 'Se accettato, il rimborso viene effettuato dopo ricezione e controllo sul metodo di pagamento usato o secondo un accordo. Le spese dipendono dal motivo e dalla legge applicabile.' },
    ] },
  },
  expedition: {
    fr: { eyebrow: 'BRAVIKO / LOGISTIQUE', title: 'Expédition et livraison', intro: 'Les informations pratiques pour préparer la réception de votre bois et de vos équipements.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Préparation', body: 'Chaque fiche indique un délai indicatif de préparation. Les produits d’une même commande peuvent être expédiés séparément selon leur disponibilité et leur origine.' },
      { title: 'Accès et déchargement', body: 'Avant la confirmation, vérifiez l’accès du véhicule, la solidité du sol et l’espace disponible pour le déchargement. Signalez toute contrainte particulière dans votre demande.' },
      { title: 'Réception', body: 'Contrôlez l’état de l’emballage et du produit à la livraison. Notez toute réserve précise sur le bon du transporteur et contactez-nous rapidement en cas d’anomalie.' },
      { title: 'Frais', body: 'Les frais dépendent de la destination, du poids, du volume et des conditions d’accès. Ils sont précisés avant la confirmation définitive de la commande.' },
    ] },
    de: { eyebrow: 'BRAVIKO / LOGISTIK', title: 'Versand und Lieferung', intro: 'Praktische Informationen zur Annahme von Brennholz und Ausrüstung.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Vorbereitung', body: 'Jede Produktseite nennt eine voraussichtliche Vorbereitungszeit. Produkte einer Bestellung können je nach Verfügbarkeit getrennt versendet werden.' },
      { title: 'Zufahrt und Abladen', body: 'Prüfen Sie vor der Bestätigung Zufahrt, Boden und Platz für das Abladen. Teilen Sie besondere Einschränkungen in Ihrer Anfrage mit.' },
      { title: 'Annahme', body: 'Prüfen Sie Verpackung und Produkt bei Lieferung. Vermerken Sie konkrete Vorbehalte beim Transporteur und melden Sie Auffälligkeiten schnell.' },
      { title: 'Kosten', body: 'Kosten hängen von Zielort, Gewicht, Volumen und Zufahrt ab und werden vor der endgültigen Bestätigung mitgeteilt.' },
    ] },
    it: { eyebrow: 'BRAVIKO / LOGISTICA', title: 'Spedizione e consegna', intro: 'Informazioni pratiche per ricevere legna e attrezzature.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Preparazione', body: 'Ogni scheda indica un tempo indicativo di preparazione. I prodotti dello stesso ordine possono essere spediti separatamente in base alla disponibilità.' },
      { title: 'Accesso e scarico', body: 'Prima della conferma verifica accesso del veicolo, fondo e spazio per lo scarico. Indica eventuali vincoli nella richiesta.' },
      { title: 'Ricezione', body: 'Controlla imballaggio e prodotto alla consegna. Segnala riserve precise al corriere e contattaci rapidamente in caso di problemi.' },
      { title: 'Costi', body: 'I costi dipendono da destinazione, peso, volume e accesso. Saranno indicati prima della conferma definitiva.' },
    ] },
  },
  assurance: {
    fr: { eyebrow: 'BRAVIKO / PROTECTION', title: 'Assurance et transport', intro: 'Ce qui encadre la protection de votre commande pendant son acheminement.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Transport encadré', body: 'Les expéditions sont confiées à des transporteurs adaptés au poids, au volume et à la nature du produit. Les modalités exactes peuvent varier selon la destination.' },
      { title: 'Dommage à la réception', body: 'Photographiez l’emballage et le produit, inscrivez des réserves précises sur le document de livraison et contactez-nous à contact@leboisdirect.fr dans les meilleurs délais.' },
      { title: 'Limites', body: 'L’assurance transport ne remplace pas les obligations de contrôle à la réception. Un emballage ouvert, un produit utilisé ou une réserve trop générale peuvent compliquer l’instruction du dossier.' },
      { title: 'Accompagnement', body: 'Nous vous aidons à réunir les éléments utiles et à transmettre la réclamation au transporteur ou au partenaire concerné.' },
    ] },
    de: { eyebrow: 'BRAVIKO / SCHUTZ', title: 'Versicherung und Transport', intro: 'Wie Ihre Bestellung während des Transports geschützt wird.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Geeigneter Transport', body: 'Der Versand erfolgt mit Dienstleistern, die zu Gewicht, Volumen und Produktart passen. Details können je nach Zielort variieren.' },
      { title: 'Schäden bei Annahme', body: 'Fotografieren Sie Verpackung und Produkt, vermerken Sie konkrete Vorbehalte und schreiben Sie schnell an contact@leboisdirect.fr.' },
      { title: 'Grenzen', body: 'Transportschutz ersetzt nicht die Prüfung bei Annahme. Geöffnete Verpackungen, benutzte Produkte oder allgemeine Vorbehalte erschweren die Bearbeitung.' },
      { title: 'Unterstützung', body: 'Wir helfen, die nötigen Unterlagen zusammenzustellen und die Reklamation an Transporteur oder Partner weiterzugeben.' },
    ] },
    it: { eyebrow: 'BRAVIKO / PROTEZIONE', title: 'Assicurazione e trasporto', intro: 'Come proteggiamo il tuo ordine durante il trasporto.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Trasporto adeguato', body: 'Le spedizioni sono affidate a trasportatori adatti a peso, volume e natura del prodotto. Le modalità possono cambiare in base alla destinazione.' },
      { title: 'Danno alla consegna', body: 'Fotografa imballaggio e prodotto, inserisci riserve precise sul documento di consegna e scrivi rapidamente a contact@leboisdirect.fr.' },
      { title: 'Limiti', body: 'La protezione del trasporto non sostituisce il controllo alla consegna. Imballaggio aperto, prodotto usato o riserva generica possono complicare la pratica.' },
      { title: 'Assistenza', body: 'Ti aiutiamo a raccogliere i documenti e a trasmettere il reclamo al corriere o al partner interessato.' },
    ] },
  },
  'informations-produits': {
    fr: { eyebrow: 'BRAVIKO / PRODUITS', title: 'État et détails des produits', intro: 'Comprendre ce que vous achetez avant de confirmer votre demande.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'État indiqué', body: 'Un produit publié est proposé comme neuf, sauf indication explicite contraire sur sa fiche. Les produits en brouillon ne sont pas visibles dans la boutique. Un produit archivé n’est plus proposé à la vente.' },
      { title: 'Fiche produit', body: 'Chaque fiche présente les caractéristiques disponibles : essence, dimensions, conditionnement, quantité, origine et délai. Les photos servent à illustrer le produit et peuvent présenter de légères différences.' },
      { title: 'Disponibilité', body: 'La disponibilité est confirmée lors du traitement de votre commande. Une rupture ou une variation de délai peut nécessiter une proposition équivalente ou un remboursement.' },
      { title: 'Prix et variantes', body: 'Le prix dépend du format ou de la variante sélectionnée. Vérifiez toujours la quantité, le conditionnement et le prix affichés dans le panier avant validation.' },
    ] },
    de: { eyebrow: 'BRAVIKO / PRODUKTE', title: 'Produktzustand und Details', intro: 'Was Sie vor der Bestätigung Ihrer Anfrage wissen sollten.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Angegebener Zustand', body: 'Veröffentlichte Produkte gelten als neu, sofern die Produktseite nichts anderes angibt. Entwürfe sind nicht sichtbar, archivierte Produkte werden nicht mehr angeboten.' },
      { title: 'Produktseite', body: 'Die Seite enthält verfügbare Angaben wie Holzart, Maße, Verpackung, Menge, Herkunft und Lieferzeit. Bilder dienen der Illustration und können leicht abweichen.' },
      { title: 'Verfügbarkeit', body: 'Die Verfügbarkeit wird bei der Bearbeitung Ihrer Bestellung bestätigt. Bei Engpässen kann eine gleichwertige Lösung oder Erstattung angeboten werden.' },
      { title: 'Preise und Varianten', body: 'Der Preis hängt von Format oder Variante ab. Prüfen Sie Menge, Verpackung und Preis im Warenkorb vor der Bestätigung.' },
    ] },
    it: { eyebrow: 'BRAVIKO / PRODOTTI', title: 'Stato e dettagli dei prodotti', intro: 'Cosa sapere prima di confermare la richiesta.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Stato indicato', body: 'Un prodotto pubblicato è nuovo salvo indicazione diversa nella scheda. Le bozze non sono visibili e i prodotti archiviati non vengono più proposti.' },
      { title: 'Scheda prodotto', body: 'La scheda presenta dati disponibili come essenza, dimensioni, confezione, quantità, origine e tempi. Le foto sono illustrative e possono differire leggermente.' },
      { title: 'Disponibilità', body: 'La disponibilità viene confermata durante l’elaborazione dell’ordine. In caso di esaurimento possiamo proporre un equivalente o un rimborso.' },
      { title: 'Prezzi e varianti', body: 'Il prezzo dipende dal formato o dalla variante. Controlla sempre quantità, confezione e prezzo nel carrello.' },
    ] },
  },
  tva: {
    fr: { eyebrow: 'BRAVIKO / PRIX', title: 'TVA et facturation', intro: 'Comment lire les prix affichés et les informations de facturation.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Prix affichés', body: 'Les prix destinés aux consommateurs sont affichés en euros, avec la TVA applicable incluse lorsque la réglementation l’exige. Les frais de livraison sont indiqués séparément avant la confirmation.' },
      { title: 'Facture', body: 'Une facture ou un justificatif peut être demandé à contact@leboisdirect.fr en rappelant la référence de commande et les coordonnées de facturation.' },
      { title: 'Taux applicable', body: 'Le taux de TVA dépend de la nature du produit, de la destination et du statut du client. Le montant définitif figure sur le document de vente.' },
      { title: 'Professionnels', body: 'Les clients professionnels doivent préciser leurs informations de facturation et, lorsque nécessaire, leur numéro de TVA intracommunautaire avant confirmation.' },
    ] },
    de: { eyebrow: 'BRAVIKO / PREISE', title: 'MwSt. und Rechnungen', intro: 'Wie Preise und Rechnungsinformationen zu verstehen sind.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Angezeigte Preise', body: 'Verbraucherpreise werden in Euro und, soweit erforderlich, inklusive anwendbarer MwSt. angezeigt. Versandkosten werden vor Bestätigung separat genannt.' },
      { title: 'Rechnung', body: 'Eine Rechnung oder ein Beleg kann über contact@leboisdirect.fr unter Angabe der Bestellnummer und Rechnungsdaten angefordert werden.' },
      { title: 'Anwendbarer Satz', body: 'Der MwSt.-Satz hängt von Produkt, Zielort und Kundenstatus ab. Der endgültige Betrag steht auf dem Verkaufsdokument.' },
      { title: 'Geschäftskunden', body: 'Geschäftskunden geben Rechnungsdaten und gegebenenfalls ihre Umsatzsteuer-ID vor der Bestätigung an.' },
    ] },
    it: { eyebrow: 'BRAVIKO / PREZZI', title: 'IVA e fatturazione', intro: 'Come leggere i prezzi e le informazioni di fatturazione.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Prezzi indicati', body: 'I prezzi per i consumatori sono in euro e includono l’IVA applicabile quando richiesto. Le spese di consegna sono indicate separatamente prima della conferma.' },
      { title: 'Fattura', body: 'Puoi chiedere fattura o ricevuta a contact@leboisdirect.fr indicando riferimento dell’ordine e dati di fatturazione.' },
      { title: 'Aliquota applicabile', body: 'L’aliquota dipende da prodotto, destinazione e stato del cliente. L’importo definitivo è riportato sul documento di vendita.' },
      { title: 'Clienti professionali', body: 'I professionisti devono indicare dati di fatturazione e, quando necessario, numero IVA intracomunitario prima della conferma.' },
    ] },
  },
}
