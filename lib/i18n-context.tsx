'use client'

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

export type Locale = 'fr' | 'de' | 'it'

const translations = {
  fr: {
    language: 'Français',
    nav: { shop: 'Boutique', heating: 'Chauffage', delivery: 'Livraison', advice: 'Conseils', story: 'Notre histoire', agriculture: 'Agriculture' },
    hero: { eyebrow: 'Maison · terrain · quotidien', title: 'Des produits utiles, choisis avec soin', body: 'Du bois de chauffage aux équipements agricoles, Braviko vous aide à trouver l’essentiel sans perdre de temps.', primary: 'Découvrir les produits', secondary: 'Comment ça marche' },
    home: { eyebrow: 'Deux univers, une même exigence', title: 'Choisissez votre terrain.', heating: 'Chauffage', heatingBody: 'Bûches, granulés et allumage pour une chaleur simple à commander.', agriculture: 'Agriculture', agricultureBody: 'Machines, outils et équipements pour avancer concrètement.', explore: 'Découvrir l’univers', selection: 'Une sélection pensée pour durer', selectionBody: 'Des produits fiables, des informations claires et une livraison organisée partout en France.', allProducts: 'Voir tous les produits', quality: ['Bois séché sous 20% d’humidité', 'Séchage naturel garanti. Combustion optimale et moins de fumée.', 'Commande en 3 clics', 'Choisissez votre bois, payez en ligne, recevez votre confirmation.', 'Livré sous 48h en Île-de-France', 'Déchargement inclus. Livraison partout en France sous 5 jours.', 'Fiches techniques complètes', 'Essence, conditionnement, pouvoir calorifique : tout pour choisir.'], deliveryEyebrow: 'Du choix à la chaleur', deliveryTitle: 'Le bois, simplement livré chez vous', deliveryBody: 'Vous choisissez le bon format. Nous préparons votre commande et nous la livrons avec déchargement inclus.', deliverySteps: ['Choisissez', 'Sélectionnez l’essence, le format et la quantité adaptés à votre foyer.', 'Commandez', 'Votre commande est confirmée immédiatement, avec un suivi clair.', 'Recevez', 'Livraison rapide avec déchargement à l’emplacement de votre choix.'], deliveryLink: 'En savoir plus', winterTitle: 'Préparez votre hiver', winterBody: 'Commandez dès maintenant pour profiter d’un stock de bois de qualité tout l’hiver.', winterCta: 'Commander maintenant' },
  },
  de: {
    language: 'Deutsch',
    nav: { shop: 'Shop', heating: 'Heizung', delivery: 'Lieferung', advice: 'Ratgeber', story: 'Unsere Geschichte', agriculture: 'Landwirtschaft' },
    hero: { eyebrow: 'Zuhause · Gelände · Alltag', title: 'Nützliche Produkte, sorgfältig ausgewählt', body: 'Von Brennholz bis zu landwirtschaftlicher Ausrüstung: Braviko hilft Ihnen, das Wesentliche schnell zu finden.', primary: 'Produkte entdecken', secondary: 'So funktioniert es' },
    home: { eyebrow: 'Zwei Bereiche, ein Anspruch', title: 'Wählen Sie Ihren Bedarf.', heating: 'Heizung', heatingBody: 'Brennholz, Pellets und Anzündholz für einfach bestellbare Wärme.', agriculture: 'Landwirtschaft', agricultureBody: 'Maschinen, Werkzeuge und Ausrüstung für Ihre tägliche Arbeit.', explore: 'Bereich entdecken', selection: 'Auswahl für lange Nutzung', selectionBody: 'Zuverlässige Produkte, klare Informationen und organisierte Lieferung in ganz Frankreich.', allProducts: 'Alle Produkte ansehen', quality: ['Holz mit weniger als 20% Feuchtigkeit', 'Natürlich getrocknet für eine saubere, effiziente Verbrennung.', 'In 3 Klicks bestellen', 'Holz auswählen, online bezahlen und sofort bestätigt werden.', 'Lieferung in der Île-de-France ab 48 Stunden', 'Abladen inklusive. Lieferung in ganz Frankreich.', 'Vollständige Produktdaten', 'Holzart, Verpackung und Heizwert auf einen Blick.'], deliveryEyebrow: 'Von der Auswahl bis zur Wärme', deliveryTitle: 'Brennholz einfach zu Ihnen geliefert', deliveryBody: 'Sie wählen das passende Format. Wir bereiten Ihre Bestellung vor und liefern sie inklusive Abladen.', deliverySteps: ['Auswählen', 'Wählen Sie Holzart, Format und Menge für Ihren Bedarf.', 'Bestellen', 'Ihre Bestellung wird sofort bestätigt und transparent verfolgt.', 'Erhalten', 'Schnelle Lieferung bis zum gewünschten Abladeort.'], deliveryLink: 'Mehr erfahren', winterTitle: 'Bereiten Sie den Winter vor', winterBody: 'Bestellen Sie jetzt hochwertiges Brennholz für die ganze Heizsaison.', winterCta: 'Jetzt bestellen' },
  },
  it: {
    language: 'Italiano',
    nav: { shop: 'Negozio', heating: 'Riscaldamento', delivery: 'Consegna', advice: 'Consigli', story: 'La nostra storia', agriculture: 'Agricoltura' },
    hero: { eyebrow: 'Casa · terreno · quotidiano', title: 'Prodotti utili, scelti con cura', body: 'Dalla legna da ardere alle attrezzature agricole, Braviko ti aiuta a trovare ciò che serve senza perdere tempo.', primary: 'Scopri i prodotti', secondary: 'Come funziona' },
    home: { eyebrow: 'Due mondi, la stessa attenzione', title: 'Scegli ciò che ti serve.', heating: 'Riscaldamento', heatingBody: 'Legna, pellet e accendifuoco per un calore facile da ordinare.', agriculture: 'Agricoltura', agricultureBody: 'Macchine, utensili e attrezzature per il lavoro quotidiano.', explore: 'Scopri il mondo', selection: 'Una selezione fatta per durare', selectionBody: 'Prodotti affidabili, informazioni chiare e consegna organizzata in tutta la Francia.', allProducts: 'Vedi tutti i prodotti', quality: ['Legna essiccata sotto il 20% di umidità', 'Essiccazione naturale per una combustione efficiente e meno fumo.', 'Ordina in 3 clic', 'Scegli la legna, paga online e ricevi subito la conferma.', 'Consegna in Île-de-France da 48 ore', 'Scarico incluso. Consegna in tutta la Francia.', 'Schede tecniche complete', 'Essenza, confezione e potere calorifico per scegliere meglio.'], deliveryEyebrow: 'Dalla scelta al calore', deliveryTitle: 'La legna, consegnata semplicemente a casa tua', deliveryBody: 'Scegli il formato giusto. Prepariamo il tuo ordine e lo consegniamo con scarico incluso.', deliverySteps: ['Scegli', 'Seleziona essenza, formato e quantità adatti al tuo focolare.', 'Ordina', 'Il tuo ordine viene confermato subito e seguito con chiarezza.', 'Ricevi', 'Consegna rapida nel punto che hai indicato.'], deliveryLink: 'Scopri di più', winterTitle: 'Preparati all’inverno', winterBody: 'Ordina subito legna di qualità per tutta la stagione fredda.', winterCta: 'Ordina ora' },
  },
} as const

type Translation = (typeof translations)[Locale]
type I18nContextValue = { locale: Locale; setLocale: (locale: Locale) => void; t: Translation }

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('braviko-locale')
      if (saved === 'fr' || saved === 'de' || saved === 'it') setLocale(saved)
    } catch { /* The selector still works when browser storage is unavailable. */ }
  }, [])

  useEffect(() => { document.documentElement.lang = locale }, [locale])

  const changeLocale = useCallback((nextLocale: Locale) => {
    setLocale(nextLocale)
    try { window.localStorage.setItem('braviko-locale', nextLocale) } catch { /* Session-only choice. */ }
  }, [])

  const value = useMemo(() => ({ locale, setLocale: changeLocale, t: translations[locale] }), [locale, changeLocale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}
