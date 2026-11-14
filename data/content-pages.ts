import type { Locale } from '@/lib/i18n-context'

type Content = { eyebrow: string; title: string; intro: string; sections: Array<[string, string]>; cta: string; ctaLabel: string }

export const contentPages: Record<Locale, { advice: Content; story: Content }> = {
  fr: {
    advice: {
      eyebrow: 'BRAVIKO / GUIDES PRATIQUES',
      title: 'Bien choisir. Bien stocker. Bien chauffer.',
      intro: 'Des repères concrets pour sélectionner votre combustible, dimensionner votre appareil et préparer le passage du transporteur.',
      sections: [
        ['Choisir son bois & son format', 'Le chêne et le charme garantissent une chaleur longue durée ; le hêtre ravive les flammes rapidement. Privilégiez le 33 cm pour la majorité des poêles et l’insert 50 cm uniquement pour les grands foyers.'],
        ['Exiger un taux d’humidité bas', 'Un bois séché à moins de 20 % d’humidité ou un granulé ENplus A1 (< 8 %) dégage jusqu’à deux fois plus d’énergie utile qu’un bois humide et encrasse nettement moins votre vitre et votre conduit.'],
        ['Stocker au sec & aéré', 'Entreposez les palettes surélevées du sol sous abri ouvert sur les côtés pour laisser l’air circuler. Évitez de bâcher hermétiquement le bois sec sous peine de créer de la condensation.'],
        ['Anticiper l’accès transporteur', 'Pour une palette ou un poêle, assurez-vous d’une voie d’accès dégagée et d’une zone plane en béton, goudron ou pavés afin que le chauffeur puisse déposer votre commande au transpalette avec hayon.'],
      ],
      cta: 'Une question sur votre installation ou votre accès ?',
      ctaLabel: 'Consulter la FAQ',
    },
    story: {
      eyebrow: 'BRAVIKO · NOTRE HISTOIRE',
      title: 'La matière fait la différence.',
      intro: 'Avant de trouver sa place chez vous, chaque produit répond à une exigence simple : chauffer efficacement et durablement.',
      sections: [
        ['Partir du besoin réel', 'Chaque maison, chaque appareil et chaque hiver imposent des contraintes différentes. Nous sélectionnons des essences dures, des granulés normés et des appareils reconnus pour leur rendement réel.'],
        ['Afficher les faits sans détours', 'Taux d’humidité, puissance en kW, poids exact de la palette, délais de rendez-vous et coût unitaire : chaque fiche rassemble les données utiles avant de commander.'],
        ['Un seul interlocuteur jusqu’à la réception', 'Expédition depuis nos partenaires sous 48 h ouvrées, prise de rendez-vous transporteur et service client réactif basé dans le Nord (Houplines).'],
      ],
      cta: 'Explorer le catalogue chauffage & extérieur',
      ctaLabel: 'Voir la boutique',
    },
  },
  de: {
    advice: {
      eyebrow: 'BRAVIKO / RATGEBER',
      title: 'Gut wählen. Gut lagern. Gut heizen.',
      intro: 'Klare Orientierung für Brennstoffe, Kaminöfen und eine reibungslose Anlieferung.',
      sections: [
        ['Holzart und Scheitlänge wählen', 'Eiche und Hainbuche liefern langanhaltende Glut, Buche schnelle Flammen. 33 cm passt in die meisten Kaminöfen.'],
        ['Auf niedrige Restfeuchte achten', 'Kammergetrocknetes Holz unter 20 % Feuchte sowie ENplus-A1-Pellets sorgen für hohen Heizwert und saubere Scheiben.'],
        ['Trocken und belüftet lagern', 'Holz leicht erhöht und überdacht mit seitlicher Belüftung lagern, um Kondensfeuchte zu vermeiden.'],
        ['Zufahrt für die Hebebühne prüfen', 'Für Paletten und Öfen wird ein fester, ebener Untergrund für den Hubwagen benötigt.'],
      ],
      cta: 'Fragen vor dem Kauf?',
      ctaLabel: 'FAQ ansehen',
    },
    story: {
      eyebrow: 'BRAVIKO · ÜBER UNS',
      title: 'Qualität, die zuverlässig wärmt.',
      intro: 'Braviko wählt Brennstoffe, Öfen und Outdoor-Feuerstellen mit klaren technischen Daten und planbarer Lieferung.',
      sections: [
        ['Praxisnahe Auswahl', 'Jedes Produkt wird nach Heizleistung, Materialqualität und Alltagstauglichkeit ausgewählt.'],
        ['Transparente Produktdaten', 'Heizwert, Abmessungen, Verpackung und Lieferablauf stehen offen vor der Bestellung bereit.'],
        ['Begleitung bis zur Lieferung', 'Versand innerhalb von 48 Werkstunden und feste Terminabstimmung bei schweren Gütern.'],
      ],
      cta: 'Sortiment entdecken',
      ctaLabel: 'Zum Shop',
    },
  },
  it: {
    advice: {
      eyebrow: 'BRAVIKO / GUIDE PRATICHE',
      title: 'Scegliere bene. Conservare bene. Riscaldare bene.',
      intro: 'Indicazioni pratiche per scegliere il combustibile, dimensionare l’apparecchio e preparare lo scarico della consegna in Italia.',
      sections: [
        ['Scegliere essenza e formato', 'Quercia e carpino garantiscono brace duratura; il faggio offre fiamme vive e rapide. Scegli i ceppi da 33 cm per la maggior parte delle stufe e il formato da 50 cm solo per focolari ampi.'],
        ['Richiedere un basso tasso di umidità', 'Legna essiccata sotto il 20 % di umidità o pellet certificato ENplus A1 (< 8 %) sviluppa fino al doppio del calore utile rispetto alla legna umida e riduce residui su vetro e canna fumaria.'],
        ['Stoccaggio asciutto e ventilato', 'Disponi i bancali sollevati da terra sotto una tettoia aperta lateralmente per favorire il ricircolo d’aria. Evita di coprire ermeticamente la legna secca per non generare condensa.'],
        ['Verificare l’accesso del corriere', 'Per bancali e stufe assicurati di avere una strada carrabile libera e una superficie piana e compatta (asfalto, cemento o pavimentazione) per lo scarico con transpallet e sponda idraulica.'],
      ],
      cta: 'Hai domande sull’installazione o sull’accesso?',
      ctaLabel: 'Consulta le FAQ',
    },
    story: {
      eyebrow: 'BRAVIKO · LA NOSTRA STORIA',
      title: 'La materia fa la differenza.',
      intro: 'Prima di arrivare a casa tua, ogni prodotto risponde a una sola esigenza: riscaldare in modo efficiente e duraturo.',
      sections: [
        ['Partire dall’esigenza reale', 'Ogni abitazione, ogni apparecchio e ogni inverno hanno esigenze diverse. Selezioniamo legni duri, pellet certificati e stufe apprezzate per la resa reale.'],
        ['Dati tecnici senza ambiguità', 'Tasso di umidità, potenza in kW, peso netto del bancale, appuntamento con il corriere e costo unitario: ogni scheda raccoglie i dati essenziali prima dell’acquisto.'],
        ['Un unico referente fino alla consegna', 'Spedizione dai nostri partner entro 48 ore lavorative, appuntamento telefonico con il corriere e assistenza clienti dedicata via email su contact@braviko.fr.'],
      ],
      cta: 'Esplora il catalogo riscaldamento ed esterni',
      ctaLabel: 'Vai al negozio',
    },
  },
}
