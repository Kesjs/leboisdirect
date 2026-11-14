import type { Locale } from '@/lib/i18n-context'

type LegalDocument = { eyebrow: string; title: string; intro: string; updated: string; sections: { title: string; body: string }[] }

export const legalNavigation = {
  fr: { legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'Conditions générales', cookies: 'Cookies' },
  de: { legal: 'Impressum', privacy: 'Datenschutz', terms: 'Allgemeine Bedingungen', cookies: 'Cookies' },
  it: { legal: 'Note legali', privacy: 'Privacy', terms: 'Condizioni generali', cookies: 'Cookie' },
} satisfies Record<Locale, Record<string, string>>

export const legalCopy: Record<'mentions-legales' | 'confidentialite' | 'conditions-generales' | 'cookies', Record<Locale, LegalDocument>> = {
  'mentions-legales': {
    fr: {
      eyebrow: 'BRAVIKO / INFORMATIONS LÉGALES',
      title: 'Mentions légales',
      intro: 'Les informations relatives à l’éditeur, à l’hébergement et aux modalités de contact du site braviko.fr.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Éditeur du site', body: 'Le site braviko.fr est édité par Braviko — entreprise individuelle (EI), établie au 32 rue Jean Jacob, 59116 Houplines, France. Contact administratif et service client : contact@braviko.fr.' },
        { title: 'Hébergement & infrastructure', body: 'Le site applicatif braviko.fr est hébergé sur infrastructure Hostinger (Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Chypre). La base de données et les médias associés sont hébergés sur Supabase.' },
        { title: 'Paiements & sécurité', body: 'Les paiements par carte bancaire sont traités via l’infrastructure certifiée PCI-DSS de Stripe. Braviko ne stocke aucune donnée complète de carte bancaire sur ses propres serveurs. Le règlement par virement SEPA est également proposé.' },
        { title: 'Propriété intellectuelle', body: 'L’ensemble des textes, fiches techniques, visuels, éléments graphiques et marques reproduits sur le site est protégé au titre de la propriété intellectuelle et ne peut être réutilisé sans accord préalable.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / RECHTLICHES',
      title: 'Impressum',
      intro: 'Angaben zu Anbieter, Hosting und Kontaktmöglichkeiten für braviko.fr.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Anbieter', body: 'braviko.fr wird betrieben von Braviko — französisches Einzelunternehmen (EI), 32 rue Jean Jacob, 59116 Houplines, Frankreich. Kontakt: contact@braviko.fr.' },
        { title: 'Hosting & Infrastruktur', body: 'Die Anwendung wird bei Hostinger (Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Zypern) gehostet. Datenbank und Medien werden über Supabase bereitgestellt.' },
        { title: 'Zahlungsabwicklung', body: 'Kartenzahlungen erfolgen sicher über Stripe (PCI-DSS). Alternativ steht die SEPA-Überweisung zur Verfügung.' },
        { title: 'Urheberrecht', body: 'Texte, technische Angaben, Bilder und grafische Inhalte unterliegen dem Urheberrecht und dürfen ohne Genehmigung nicht vervielfältigt werden.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / INFORMAZIONI LEGALI',
      title: 'Note legali',
      intro: 'Informazioni su editore, hosting e contatti del sito braviko.fr.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Editore', body: 'Il sito braviko.fr è gestito da Braviko — impresa individuale francese (EI), 32 rue Jean Jacob, 59116 Houplines, Francia. Contatto: contact@braviko.fr.' },
        { title: 'Hosting e infrastruttura', body: 'Il sito è ospitato su infrastruttura Hostinger (Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Cipro). Database e file multimediali sono ospitati su Supabase.' },
        { title: 'Pagamenti e sicurezza', body: 'I pagamenti con carta sono gestiti da Stripe secondo gli standard PCI-DSS. È disponibile anche il bonifico SEPA.' },
        { title: 'Proprietà intellettuale', body: 'Testi, schede tecniche, immagini e marchi presenti sul sito sono protetti e non possono essere riprodotti senza autorizzazione.' },
      ],
    },
  },
  confidentialite: {
    fr: {
      eyebrow: 'BRAVIKO / DONNÉES PERSONNELLES',
      title: 'Politique de confidentialité',
      intro: 'Braviko traite uniquement les données nécessaires à la préparation, au paiement et à la livraison de vos commandes.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Données collectées', body: 'Lors d’une commande (avec ou sans création de compte), d’une prise de contact ou d’une inscription à la newsletter, nous collectons vos nom, prénom, adresse email, numéro de téléphone pour le rendez-vous transporteur, adresse de livraison et historique de commande.' },
        { title: 'Finalités & base légale', body: 'Ces données permettent l’exécution du contrat de vente, la prise de rendez-vous de livraison avec le transporteur, le traitement comptable et la gestion du service après-vente. Les opérations de mesure ou de consentement newsletter reposent sur votre accord.' },
        { title: 'Sous-traitants & conservation', body: 'Vos données sont traitées par Hostinger (hébergement), Supabase (base de données), Stripe (paiement) et les transporteurs chargés de l’acheminement. Elles sont conservées pendant la durée utile au suivi client et aux obligations légales comptables.' },
        { title: 'Vos droits (RGPD)', body: 'Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation et d’opposition en écrivant à contact@braviko.fr. Vous pouvez également saisir la CNIL en cas de réclamation.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / DATENSCHUTZ',
      title: 'Datenschutzerklärung',
      intro: 'Wir verarbeiten nur die Daten, die für Bestellung, Zahlung, Transport und Kundenservice nötig sind.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Erhobene Daten', body: 'Bei Bestellungen (auch als Gast), Kontaktanfragen oder Newsletter-Anmeldungen erfassen wir Name, E-Mail-Adresse, Telefonnummer für den Liefertermin, Lieferanschrift und Bestelldaten.' },
        { title: 'Zwecke & Rechtsgrundlage', body: 'Verarbeitung zur Vertragserfüllung, Terminabstimmung mit dem Frachtführer, Rechnungslegung und gesetzlichen Aufbewahrungspflichten.' },
        { title: 'Dienstleister & Dauer', body: 'Eingebundene Dienstleister sind Hostinger, Supabase, Stripe sowie beauftragte Transportunternehmen.' },
        { title: 'Ihre Rechte', body: 'Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch unter contact@braviko.fr.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / PRIVACY',
      title: 'Informativa sulla privacy',
      intro: 'Trattiamo esclusivamente i dati necessari a ordine, pagamento, consegna e assistenza clienti.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Dati trattati', body: 'In caso di ordine (anche come ospite), richiesta di contatto o newsletter raccogliamo nome, email, telefono per l’appuntamento di consegna, indirizzo e dettagli ordine.' },
        { title: 'Finalità e basi giuridiche', body: 'I dati servono per l’esecuzione del contratto, la pianificazione della consegna, l’assistenza post-vendita e gli obblighi contabili.' },
        { title: 'Fornitori e conservazione', body: 'I servizi utilizzati includono Hostinger, Supabase, Stripe e i corrieri incaricati del trasporto.' },
        { title: 'I tuoi diritti', body: 'Puoi richiedere accesso, rettifica, cancellazione o opposizione scrivendo a contact@braviko.fr.' },
      ],
    },
  },
  'conditions-generales': {
    fr: {
      eyebrow: 'BRAVIKO / CONDITIONS DE VENTE',
      title: 'Conditions générales de vente',
      intro: 'Ces conditions s’appliquent à toute commande passée sur le site braviko.fr à destination de la France métropolitaine.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Commande sans compte ou avec compte', body: 'Vous pouvez commander librement en mode invité sans créer de compte préalable, ou vous connecter à votre espace client pour conserver l’historique de vos commandes et factures. Toute commande suppose l’acceptation des présentes conditions.' },
        { title: 'Prix & modalités de paiement', body: 'Les prix sont affichés en euros TTC, hors frais de livraison offerts en France métropolitaine. Le règlement s’effectue en ligne par carte bancaire via Stripe (confirmation immédiate) ou par virement bancaire SEPA (expédition déclenchée à réception des fonds).' },
        { title: 'Expédition, prise de RDV & réception', body: 'Les articles en stock sont expédiés sous 48 h ouvrées. La livraison intervient généralement sous 3 à 12 jours ouvrés selon gabarit en France métropolitaine (3 à 5 jours en colis, 5 à 12 jours sur rendez-vous pour palettes, abris et appareils lourds). Pour les palettes et appareils lourds, le transporteur fixe un rendez-vous préalable et décharge au hayon sur sol stable et carrossable. Tout défaut ou avarie doit être signalé par réserves précises sur le bon de livraison.' },
        { title: 'Droit de rétractation (14 jours) & garanties', body: 'Conformément aux articles L221-18 et suivants du Code de la consommation, vous disposez de 14 jours calendaires à compter de la réception pour exercer votre droit de rétractation auprès de contact@braviko.fr, sur un produit non utilisé, complet et dans son emballage d’origine. Tous nos équipements bénéficient en outre de la garantie légale de conformité (2 ans), de la garantie des vices cachés et des garanties constructeurs indiquées sur les fiches.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / AGB',
      title: 'Allgemeine Geschäftsbedingungen',
      intro: 'Diese Bedingungen gelten für alle Bestellungen über braviko.fr.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Bestellung als Gast oder mit Konto', body: 'Bestellungen sind ohne vorherige Registrierung als Gast oder über ein Kundenkonto möglich.' },
        { title: 'Preise & Zahlung', body: 'Alle Preise in Euro inkl. MwSt. Der Versand innerhalb des französischen Festlands ist kostenlos. Zahlung per Karte über Stripe oder SEPA-Überweisung.' },
        { title: 'Versand & Annahme', body: 'Lagerware wird binnen 48 Werkstunden versendet (Lieferzeit ca. 3–12 Werktage je nach Größe nach Terminabstimmung). Transportschäden sind bei Annahme konkret auf dem Lieferschein zu vermerken.' },
        { title: 'Widerruf (14 Tage) & Gewährleistung', body: 'Sie haben ein 14-tägiges gesetzliches Widerrufsrecht für unbenutzte Artikel in Originalverpackung (contact@braviko.fr). Es gelten die gesetzlichen sowie herstellerspezifischen Gewährleistungsrechte.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / CONDIZIONI DI VENDITA',
      title: 'Condizioni generali di vendita',
      intro: 'Le presenti condizioni regolano gli acquisti effettuati sul sito braviko.fr.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Ordine ospite o con account', body: 'È possibile acquistare direttamente come ospite senza registrazione oppure tramite il proprio account cliente.' },
        { title: 'Prezzi e pagamenti', body: 'I prezzi sono espressi in euro IVA inclusa con spedizione gratuita in Francia continentale. Pagamento immediato con carta via Stripe o tramite bonifico SEPA.' },
        { title: 'Spedizione e consegna', body: 'Spedizione in 48 ore lavorative per i prodotti a stock; consegna in 3–12 giorni lavorativi in base al formato previo appuntamento con il corriere e scarico con sponda idraulica.' },
        { title: 'Recesso (14 giorni) e garanzie', body: 'Diritto di recesso entro 14 giorni dalla consegna per articoli integri e non utilizzati (contact@braviko.fr), oltre alle garanzie legali e del produttore.' },
      ],
    },
  },
  cookies: {
    fr: {
      eyebrow: 'BRAVIKO / COOKIES & TRACEURS',
      title: 'Politique relative aux cookies',
      intro: 'Informations sur le stockage local, les traceurs techniques et la mesure d’audience publicitaire utilisés sur braviko.fr.',
      updated: 'Mise à jour : 14 novembre 2026',
      sections: [
        { title: 'Traceurs strictement nécessaires', body: 'Votre navigateur enregistre localement l’état du panier et la langue sélectionnée. Supabase et Stripe utilisent également des traceurs techniques indispensables à la sécurité de session et au traitement du paiement.' },
        { title: 'Mesure de conversion publicitaire', body: 'La boutique intègre la balise Google Ads (identifiant AW-18503582950) afin de mesurer l’efficacité des campagnes d’annonces sans revente de données personnelles à des tiers.' },
        { title: 'Gestion depuis votre navigateur', body: 'Vous pouvez à tout moment bloquer, limiter ou effacer les cookies et données de site dans les paramètres de votre navigateur. La suppression du stockage technique peut réinitialiser le panier en cours.' },
      ],
    },
    de: {
      eyebrow: 'BRAVIKO / COOKIES',
      title: 'Cookie-Richtlinie',
      intro: 'Informationen zur Speicherung von Warenkorbdaten, Sicherheits-Cookies und Werbemessung.',
      updated: 'Aktualisiert am 14. November 2026',
      sections: [
        { title: 'Technisch notwendiger Speicher', body: 'Warenkorb und Sprache werden lokal gespeichert. Supabase und Stripe nutzen technische Sitzungs- und Sicherheits-Cookies.' },
        { title: 'Conversion-Messung', body: 'Für die Auswertung unserer Anzeigen wird das Google-Ads-Tag (AW-18503582950) eingesetzt.' },
        { title: 'Browsereinstellungen', body: 'Sie können Cookies jederzeit in den Einstellungen Ihres Browsers löschen oder einschränken.' },
      ],
    },
    it: {
      eyebrow: 'BRAVIKO / COOKIE',
      title: 'Politica sui cookie',
      intro: 'Dettagli su archiviazione tecnica, sicurezza dei pagamenti e misurazione pubblicitaria.',
      updated: 'Aggiornato il 14 novembre 2026',
      sections: [
        { title: 'Archiviazione necessaria', body: 'Il carrello e la lingua vengono salvati localmente. Supabase e Stripe utilizzano cookie tecnici essenziali per sessione e pagamento.' },
        { title: 'Misurazione pubblicitaria', body: 'Il sito utilizza il tag Google Ads (AW-18503582950) per valutare l’efficacia delle campagne senza cessione di dati a terzi.' },
        { title: 'Gestione del browser', body: 'Puoi limitare o eliminare i cookie dalle impostazioni del browser in qualsiasi momento.' },
      ],
    },
  },
}
