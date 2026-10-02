import type { Locale } from '@/lib/i18n-context'

export const accountCopy = {
  fr: {
    account: 'Mon compte', login: 'Connexion', logout: 'Se déconnecter', dashboard: 'Espace client', dashboardLink: 'Tableau de bord', adminLink: 'Administration', defaultName: 'Client Braviko',
    loginTitle: 'Retrouvez vos commandes.', loginIntro: 'Connectez-vous pour poursuivre votre demande et suivre vos commandes.',
    signupTitle: 'Créer mon compte', signupIntro: 'Un compte suffit pour enregistrer vos demandes et retrouver leur suivi.',
    email: 'Email', password: 'Mot de passe', firstName: 'Prénom', lastName: 'Nom', signIn: 'Se connecter', signUp: 'Créer mon compte',
    noAccount: 'Pas encore de compte ?', existingAccount: 'Déjà un compte ?', create: 'Créer un compte', backToLogin: 'Revenir à la connexion',
    forgot: 'Mot de passe oublié ?', resetSent: 'Un lien de réinitialisation vous a été envoyé.', confirmEmail: 'Consultez votre messagerie pour confirmer votre compte.',
    orders: 'Mes commandes', ordersIntro: 'Consultez vos demandes, leur montant et leur état.', noOrders: 'Vous n’avez pas encore de commande.', shop: 'Découvrir la boutique', support: 'Une question sur une commande ?', supportLink: 'Nous contacter', delivery: 'Adresse de livraison', details: 'Voir le détail', orderedItems: 'articles', inProgress: 'En cours', delivered: 'Livrées',
    status: { pending: 'Demande reçue', confirmed: 'Confirmée', preparing: 'En préparation', shipped: 'Expédiée', delivered: 'Livrée', cancelled: 'Annulée' },
    loading: 'Chargement de votre compte…', profile: 'Mes informations', memberSince: 'Client depuis', order: 'Commande', items: 'produit(s)', checkoutRequired: 'Connectez-vous pour continuer vers la validation de votre panier.',
  },
  de: {
    account: 'Mein Konto', login: 'Anmelden', logout: 'Abmelden', dashboard: 'Kundenbereich', dashboardLink: 'Übersicht', adminLink: 'Administration', defaultName: 'Braviko-Kunde',
    loginTitle: 'Ihre Bestellungen im Blick.', loginIntro: 'Melden Sie sich an, um Ihre Anfrage fortzusetzen und Bestellungen zu verfolgen.',
    signupTitle: 'Konto erstellen', signupIntro: 'Mit einem Konto speichern Sie Anfragen und verfolgen deren Status.',
    email: 'E-Mail', password: 'Passwort', firstName: 'Vorname', lastName: 'Nachname', signIn: 'Anmelden', signUp: 'Konto erstellen',
    noAccount: 'Noch kein Konto?', existingAccount: 'Bereits registriert?', create: 'Konto erstellen', backToLogin: 'Zur Anmeldung',
    forgot: 'Passwort vergessen?', resetSent: 'Ein Link zum Zurücksetzen wurde gesendet.', confirmEmail: 'Bitte bestätigen Sie Ihr Konto über Ihre E-Mail.',
    orders: 'Meine Bestellungen', ordersIntro: 'Sehen Sie Ihre Anfragen, Beträge und den aktuellen Status.', noOrders: 'Sie haben noch keine Bestellung.', shop: 'Zum Shop', support: 'Frage zu einer Bestellung?', supportLink: 'Kontakt aufnehmen', delivery: 'Lieferadresse', details: 'Details anzeigen', orderedItems: 'Artikel', inProgress: 'In Bearbeitung', delivered: 'Geliefert',
    status: { pending: 'Anfrage eingegangen', confirmed: 'Bestätigt', preparing: 'In Vorbereitung', shipped: 'Versandt', delivered: 'Geliefert', cancelled: 'Storniert' },
    loading: 'Konto wird geladen…', profile: 'Meine Angaben', memberSince: 'Kunde seit', order: 'Bestellung', items: 'Produkt(e)', checkoutRequired: 'Melden Sie sich an, um Ihren Warenkorb zu bestätigen.',
  },
  it: {
    account: 'Il mio account', login: 'Accedi', logout: 'Esci', dashboard: 'Area cliente', dashboardLink: 'Panoramica', adminLink: 'Amministrazione', defaultName: 'Cliente Braviko',
    loginTitle: 'Ritrova i tuoi ordini.', loginIntro: 'Accedi per continuare la richiesta e seguire i tuoi ordini.',
    signupTitle: 'Crea il mio account', signupIntro: 'Un account ti permette di salvare le richieste e seguirne lo stato.',
    email: 'Email', password: 'Password', firstName: 'Nome', lastName: 'Cognome', signIn: 'Accedi', signUp: 'Crea account',
    noAccount: 'Non hai ancora un account?', existingAccount: 'Hai già un account?', create: 'Crea account', backToLogin: 'Torna all’accesso',
    forgot: 'Password dimenticata?', resetSent: 'Ti abbiamo inviato un link per reimpostare la password.', confirmEmail: 'Controlla la posta per confermare il tuo account.',
    orders: 'I miei ordini', ordersIntro: 'Consulta le richieste, gli importi e lo stato corrente.', noOrders: 'Non hai ancora effettuato ordini.', shop: 'Scopri il negozio', support: 'Domande su un ordine?', supportLink: 'Contattaci', delivery: 'Indirizzo di consegna', details: 'Vedi dettagli', orderedItems: 'articoli', inProgress: 'In corso', delivered: 'Consegnati',
    status: { pending: 'Richiesta ricevuta', confirmed: 'Confermato', preparing: 'In preparazione', shipped: 'Spedito', delivered: 'Consegnato', cancelled: 'Annullato' },
    loading: 'Caricamento account…', profile: 'I miei dati', memberSince: 'Cliente dal', order: 'Ordine', items: 'prodotto/i', checkoutRequired: 'Accedi per continuare con la conferma del carrello.',
  },
} satisfies Record<Locale, Record<string, unknown>>
