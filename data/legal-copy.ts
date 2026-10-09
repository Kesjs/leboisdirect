import type { Locale } from '@/lib/i18n-context'

type LegalDocument = { eyebrow: string; title: string; intro: string; updated: string; sections: { title: string; body: string }[] }

export const legalNavigation = {
  fr: { legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'Conditions générales', cookies: 'Cookies' },
  de: { legal: 'Impressum', privacy: 'Datenschutz', terms: 'Allgemeine Bedingungen', cookies: 'Cookies' },
  it: { legal: 'Note legali', privacy: 'Privacy', terms: 'Condizioni generali', cookies: 'Cookie' },
} satisfies Record<Locale, Record<string, string>>

export const legalCopy: Record<'mentions-legales' | 'confidentialite' | 'conditions-generales' | 'cookies', Record<Locale, LegalDocument>> = {
  'mentions-legales': {
    fr: { eyebrow: 'BRAVIKO / INFORMATIONS', title: 'Mentions légales', intro: 'Les informations essentielles concernant l’édition et l’utilisation du site Braviko.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Éditeur du site', body: 'Braviko — entreprise individuelle (EI). Adresse : 32 rue Jean Jacob, 59116 Houplines, France. SIRET fourni : 123 456 789 00012. Pour toute question administrative ou demande relative à l’éditeur, écrivez à contact@braviko.fr.' },
      { title: 'Hébergement', body: 'Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Les données applicatives sont hébergées auprès de Supabase.' },
      { title: 'Propriété intellectuelle', body: 'Les textes, visuels, marques, éléments graphiques et contenus du site ne peuvent pas être reproduits ou exploités sans autorisation préalable, sauf exceptions prévues par la loi.' },
      { title: 'Contact', body: 'Pour signaler une erreur, exercer un droit ou poser une question, contactez-nous à contact@braviko.fr.' },
    ] },
    de: { eyebrow: 'BRAVIKO / INFORMATIONEN', title: 'Impressum', intro: 'Wesentliche Informationen zur Herausgabe und Nutzung der Braviko-Website.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Anbieter', body: 'Braviko — französisches Einzelunternehmen (EI). Anschrift: 32 rue Jean Jacob, 59116 Houplines, Frankreich. Angegebene SIRET-Nummer: 123 456 789 00012. Administrative Anfragen richten Sie an contact@braviko.fr.' },
      { title: 'Hosting', body: 'Hosting durch Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Anwendungsdaten werden bei Supabase gehostet.' },
      { title: 'Geistiges Eigentum', body: 'Texte, Bilder, Marken und grafische Inhalte dürfen ohne vorherige Genehmigung nicht vervielfältigt oder verwertet werden, soweit das Gesetz nichts anderes erlaubt.' },
      { title: 'Kontakt', body: 'Fehler, Rechtsanfragen und Fragen senden Sie an contact@braviko.fr.' },
    ] },
    it: { eyebrow: 'BRAVIKO / INFORMAZIONI', title: 'Note legali', intro: 'Le informazioni essenziali sulla pubblicazione e l’uso del sito Braviko.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Editore', body: 'Braviko — impresa individuale francese (EI). Indirizzo: 32 rue Jean Jacob, 59116 Houplines, Francia. Numero SIRET fornito: 123 456 789 00012. Per richieste amministrative scrivere a contact@braviko.fr.' },
      { title: 'Hosting', body: 'Il sito è ospitato da Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Stati Uniti. I dati applicativi sono ospitati presso Supabase.' },
      { title: 'Proprietà intellettuale', body: 'Testi, immagini, marchi e contenuti grafici non possono essere riprodotti o sfruttati senza autorizzazione, salvo quanto consentito dalla legge.' },
      { title: 'Contatti', body: 'Per segnalazioni, richieste relative ai propri diritti o domande: contact@braviko.fr.' },
    ] },
  },
  confidentialite: {
    fr: { eyebrow: 'BRAVIKO / VOS DONNÉES', title: 'Politique de confidentialité', intro: 'Nous collectons uniquement les données nécessaires au compte client, à la commande et à la relation de service.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Données traitées', body: 'Lors de la création d’un compte ou d’une commande, nous traitons notamment votre email, votre identité, votre téléphone, votre adresse de livraison et le contenu de vos commandes.' },
      { title: 'Finalités et bases légales', body: 'Ces données servent à authentifier votre compte, enregistrer et suivre vos commandes, organiser la livraison, répondre à vos demandes et respecter nos obligations légales. Le traitement repose sur l’exécution du contrat, nos obligations légales et, lorsque nécessaire, votre consentement.' },
      { title: 'Conservation et destinataires', body: 'Les données sont accessibles aux personnes et prestataires nécessaires au fonctionnement du service, notamment Supabase et Vercel. Elles sont conservées pendant la durée utile à la relation commerciale et aux obligations comptables ou légales.' },
      { title: 'Vos droits', body: 'Vous pouvez demander l’accès, la rectification, l’effacement, la limitation ou la portabilité de vos données, et vous opposer à certains traitements. Écrivez à contact@braviko.fr. Vous pouvez également saisir l’autorité de contrôle compétente.' },
    ] },
    de: { eyebrow: 'BRAVIKO / IHRE DATEN', title: 'Datenschutzerklärung', intro: 'Wir verarbeiten nur Daten, die für Kundenkonto, Bestellung und Service erforderlich sind.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Verarbeitete Daten', body: 'Bei Kontoerstellung oder Bestellung verarbeiten wir insbesondere E-Mail, Identität, Telefonnummer, Lieferanschrift und Bestellinhalt.' },
      { title: 'Zwecke und Rechtsgrundlagen', body: 'Die Daten dienen Anmeldung, Bestellabwicklung, Lieferung, Support und gesetzlichen Pflichten. Grundlage sind Vertragserfüllung, gesetzliche Pflichten und gegebenenfalls Ihre Einwilligung.' },
      { title: 'Speicherung und Empfänger', body: 'Zugriff erhalten nur erforderliche Personen und Dienstleister, insbesondere Supabase und Vercel. Die Speicherung erfolgt für die Geschäftsbeziehung und gesetzliche Aufbewahrungsfristen.' },
      { title: 'Ihre Rechte', body: 'Sie können Auskunft, Berichtigung, Löschung, Einschränkung oder Übertragbarkeit verlangen und bestimmten Verarbeitungen widersprechen. Kontakt: contact@braviko.fr.' },
    ] },
    it: { eyebrow: 'BRAVIKO / I TUOI DATI', title: 'Informativa sulla privacy', intro: 'Trattiamo solo i dati necessari per account, ordini e assistenza.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Dati trattati', body: 'Durante la creazione dell’account o dell’ordine trattiamo email, identità, telefono, indirizzo di consegna e contenuto degli ordini.' },
      { title: 'Finalità e basi giuridiche', body: 'I dati servono per autenticazione, gestione degli ordini, consegna, assistenza e obblighi di legge. Le basi sono esecuzione del contratto, obblighi legali e, quando necessario, consenso.' },
      { title: 'Conservazione e destinatari', body: 'I dati sono accessibili solo alle persone e ai fornitori necessari, in particolare Supabase e Vercel, e conservati per il rapporto commerciale e gli obblighi di legge.' },
      { title: 'I tuoi diritti', body: 'Puoi chiedere accesso, rettifica, cancellazione, limitazione o portabilità e opporti ad alcuni trattamenti. Scrivi a contact@braviko.fr.' },
    ] },
  },
  'conditions-generales': {
    fr: { eyebrow: 'BRAVIKO / VENTE ET UTILISATION', title: 'Conditions générales', intro: 'Ces conditions encadrent l’utilisation du site et les demandes de commande passées auprès de Braviko.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Compte et commande', body: 'Vous pouvez remplir librement votre panier. Un compte est nécessaire pour enregistrer une demande de commande. Vous êtes responsable de l’exactitude des informations communiquées et de la confidentialité de votre mot de passe.' },
      { title: 'Prix et confirmation', body: 'Les prix sont indiqués en euros. Tant que le paiement en ligne n’est pas activé, la validation du panier constitue une demande et non un paiement. La commande devient définitive après confirmation des produits, des frais de livraison et des modalités convenues.' },
      { title: 'Livraison', body: 'Les délais et conditions de livraison dépendent du produit, de la destination, de l’accès et du déchargement. Les informations définitives sont communiquées avant confirmation.' },
      { title: 'Rétractation, garanties et litiges', body: 'Les droits de rétractation et garanties légales s’appliquent selon la nature du produit et la réglementation applicable. Contactez-nous d’abord à contact@braviko.fr afin de rechercher une solution amiable.' },
    ] },
    de: { eyebrow: 'BRAVIKO / VERKAUF UND NUTZUNG', title: 'Allgemeine Bedingungen', intro: 'Diese Bedingungen regeln die Website-Nutzung und Bestellanfragen bei Braviko.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Konto und Bestellung', body: 'Der Warenkorb ist ohne Anmeldung nutzbar. Für eine Bestellanfrage ist ein Konto erforderlich. Sie sind für richtige Angaben und den Schutz Ihres Passworts verantwortlich.' },
      { title: 'Preise und Bestätigung', body: 'Preise werden in Euro angegeben. Solange Online-Zahlung nicht aktiv ist, gilt die Warenkorbbestätigung als Anfrage. Verbindlich wird die Bestellung nach Bestätigung von Produkten, Lieferung und Bedingungen.' },
      { title: 'Lieferung', body: 'Fristen und Bedingungen hängen von Produkt, Zielort, Zufahrt und Abladen ab. Endgültige Angaben werden vor der Bestätigung mitgeteilt.' },
      { title: 'Widerruf, Gewährleistung und Streitfälle', body: 'Gesetzliche Widerrufs- und Gewährleistungsrechte gelten abhängig vom Produkt. Kontaktieren Sie zunächst contact@braviko.fr für eine einvernehmliche Lösung.' },
    ] },
    it: { eyebrow: 'BRAVIKO / VENDITA E UTILIZZO', title: 'Condizioni generali', intro: 'Queste condizioni regolano l’uso del sito e le richieste d’ordine inviate a Braviko.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Account e ordine', body: 'Il carrello è utilizzabile senza account. Per registrare una richiesta d’ordine è necessario accedere. Sei responsabile dell’esattezza dei dati e della riservatezza della password.' },
      { title: 'Prezzi e conferma', body: 'I prezzi sono in euro. Finché il pagamento online non è attivo, la conferma del carrello è una richiesta e non un pagamento. L’ordine diventa definitivo dopo la conferma di prodotti, consegna e condizioni.' },
      { title: 'Consegna', body: 'Tempi e condizioni dipendono dal prodotto, dalla destinazione, dall’accesso e dallo scarico. Le informazioni definitive sono comunicate prima della conferma.' },
      { title: 'Recesso, garanzie e controversie', body: 'Si applicano i diritti di recesso e le garanzie previsti dalla legge. Contatta prima contact@braviko.fr per cercare una soluzione amichevole.' },
    ] },
  },
  cookies: {
    fr: { eyebrow: 'BRAVIKO / NAVIGATION', title: 'Politique relative aux cookies', intro: 'Braviko utilise le stockage strictement nécessaire au fonctionnement du panier, de la langue et de la session.', updated: 'Mise à jour : 1 octobre 2026', sections: [
      { title: 'Stockage nécessaire', body: 'Le panier et la langue choisie sont conservés localement dans votre navigateur. Supabase utilise les éléments techniques nécessaires pour maintenir une session sécurisée.' },
      { title: 'Mesure et publicité', body: 'Aucun cookie publicitaire ou de profilage n’est nécessaire au fonctionnement actuel du site. Si un outil de mesure optionnel est ajouté, votre choix sera demandé avant son activation lorsque la réglementation l’exige.' },
      { title: 'Vos choix', body: 'Vous pouvez effacer les données du site depuis les réglages de votre navigateur. La suppression du stockage nécessaire peut vider le panier ou vous déconnecter.' },
    ] },
    de: { eyebrow: 'BRAVIKO / NAVIGATION', title: 'Cookie-Richtlinie', intro: 'Braviko nutzt nur Speicher, der für Warenkorb, Sprache und Sitzung erforderlich ist.', updated: 'Aktualisiert am 1. Oktober 2026', sections: [
      { title: 'Erforderlicher Speicher', body: 'Warenkorb und Sprache werden lokal im Browser gespeichert. Supabase nutzt technische Elemente für eine sichere Sitzung.' },
      { title: 'Analyse und Werbung', body: 'Für den aktuellen Betrieb sind keine Werbe- oder Profiling-Cookies erforderlich. Bei optionaler Analyse wird vorher eine Einwilligung eingeholt, sofern vorgeschrieben.' },
      { title: 'Ihre Auswahl', body: 'Sie können Websitedaten im Browser löschen. Dadurch können Warenkorb und Anmeldung verloren gehen.' },
    ] },
    it: { eyebrow: 'BRAVIKO / NAVIGAZIONE', title: 'Politica sui cookie', intro: 'Braviko usa solo l’archiviazione necessaria per carrello, lingua e sessione.', updated: 'Aggiornato il 1 ottobre 2026', sections: [
      { title: 'Archiviazione necessaria', body: 'Carrello e lingua vengono salvati localmente nel browser. Supabase usa gli elementi tecnici necessari per mantenere una sessione sicura.' },
      { title: 'Misurazione e pubblicità', body: 'Il sito non richiede attualmente cookie pubblicitari o di profilazione. Se verrà aggiunta una misurazione opzionale, chiederemo il consenso quando previsto.' },
      { title: 'Le tue scelte', body: 'Puoi cancellare i dati del sito dalle impostazioni del browser. La cancellazione può svuotare il carrello o disconnetterti.' },
    ] },
  },
}
