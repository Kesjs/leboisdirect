export type DeliveryCategory = 'pallet' | 'heavy_freight' | 'parcel'

export type RichProductSpec = {
  unitPriceLabel?: string
  badgeText: string
  delivery: {
    delay: string
    type: DeliveryCategory
    headline: string
    carrierNotice: string
  }
  usageTips: string[]
  storageAdvice: string
  detailedSpecs: Array<{ label: string; value: string }>
  warranty: string
  relatedSlugs: string[]
}

export const productRichSpecs: Record<string, RichProductSpec> = {
  'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm': {
    unitPriceLabel: 'Soit 104,50 € / stère (palette de 2 stères)',
    badgeText: '● En stock — Expédié sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 7 jours ouvrés sur rendez-vous',
      type: 'pallet',
      headline: 'Livraison sur palette avec hayon élévateur et transpalette',
      carrierNotice:
        'Le transporteur prend contact avec vous par SMS/téléphone pour convenir du jour de passage. Déchargement au pas de votre porte ou allée carrossable sur sol plat et dur (goudron, béton, pavés). Camion porteur 19 tonnes avec hayon.',
    },
    usageTips: [
      'Privilégiez la technique de l’allumage inversé (top-down) : grosses bûches en bas, petit bois et allume-feu naturel au-dessus.',
      'Réglez l’arrivée d’air primaire en grand lors des 15 premières minutes pour créer un lit de braises incandescentes.',
      'Ce mélange équilibré chêne/charme/hêtre offre à la fois une vive flamme d’ambiance et une braise à très longue tenue.',
    ],
    storageAdvice:
      'Conserver sur la palette d’origine surélevée du sol, sous un abri ventilé ouvert sur les côtés. Évitez de bâcher hermétiquement le bois pour permettre à l’air de circuler.',
    detailedSpecs: [
      { label: 'Essences de bois', value: '100% feuillus durs (Chêne, Charme, Hêtre)' },
      { label: 'Origine', value: 'Forêts françaises gérées durablement (PEFC / FSC)' },
      { label: 'Longueur des bûches', value: '33 cm (+/- 2 cm)' },
      { label: 'Taux d’humidité', value: 'Inférieur à 20% garanti (séchage artificiel en séchoir biomasse)' },
      { label: 'Volume livré', value: 'Palette de 2 stères (env. 1,4 m³ empilé selon norme NF)' },
      { label: 'Pouvoir calorifique (PCI)', value: 'Environ 4,2 kWh / kg' },
      { label: 'Appareils compatibles', value: 'Poêles à bois, inserts, foyers fermés, cheminées traditionnelles' },
      { label: 'État à réception', value: 'Prêt à l’emploi immédiat' },
      { label: 'Conditionnement', value: 'Palette perdue cerclée et filmée' },
    ],
    warranty: 'Garantie taux d’humidité < 20% certifié',
    relatedSlugs: [
      'granules-bois-premium-6mm-palette-990-kg',
      'buches-densifiees-premium-palette-1000-kg',
      'buches-densifiees-nuit-eo2-palette-520-buches',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'granules-bois-premium-6mm-palette-990-kg': {
    unitPriceLabel: 'Soit 0,44 € / kg (6,62 € / sac de 15 kg)',
    badgeText: '● En stock — Expédié sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 7 jours ouvrés sur rendez-vous',
      type: 'pallet',
      headline: 'Livraison sur palette complète avec hayon et transpalette',
      carrierNotice:
        'Prise de rendez-vous téléphonique préalable. Palette houssée imperméable de 66 sacs de 15 kg déchargée au sol par transpalette à l’entrée de votre domicile ou garage accessible.',
    },
    usageTips: [
      'Versez délicatement les granulés dans la trémie pour limiter la création de poussière de sciure.',
      'Nettoyez le creuset de combustion de votre poêle tous les 2 à 3 jours pour assurer un débit d’air parfait.',
      'Conservez un réglage d’extraction adapté à la marque de votre appareil.',
    ],
    storageAdvice:
      'Stockage impérativement au sec, dans une pièce tempérée ou un garage hors gel. Ne jamais laisser les sacs au contact direct du sol ou de l’eau.',
    detailedSpecs: [
      { label: 'Composition', value: '100% bois résineux pur non traité, sans liant chimique ni colle' },
      { label: 'Certification officielle', value: 'ENplus A1 & DINplus (qualité supérieure)' },
      { label: 'Diamètre des granulés', value: '6 mm (+/- 0,5 mm)' },
      { label: 'Pouvoir calorifique (PCI)', value: 'Supérieur à 4,9 kWh / kg' },
      { label: 'Taux de cendres', value: 'Inférieur ou égal à 0,5% (encrassement minimal)' },
      { label: 'Taux d’humidité', value: 'Inférieur ou égal à 8%' },
      { label: 'Durabilité mécanique', value: 'Supérieure à 98% (très peu de sciure)' },
      { label: 'Conditionnement', value: 'Palette de 66 sacs de 15 kg (Poids net : 990 kg)' },
      { label: 'Appareils compatibles', value: 'Tous poêles, inserts et chaudières à granulés / pellets standard 6 mm' },
    ],
    warranty: 'Conformité certifiée ENplus A1 / DINplus',
    relatedSlugs: [
      'poele-granules-jolly-mec-6-kw-programmable',
      'buches-densifiees-premium-palette-1000-kg',
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
    ],
  },

  'poele-bois-fonte-bronpi-karen-8-kw': {
    unitPriceLabel: 'TVA 20% incluse — Éligible aides rénovation',
    badgeText: '● En stock — Expédition sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 8 jours ouvrés sur rendez-vous',
      type: 'heavy_freight',
      headline: 'Transporteur spécialisé avec déchargement au pas de porte',
      carrierNotice:
        'Produit lourd (157 kg). Livraison sur palette cerclée et renforcée. Le transporteur prend contact pour planifier un créneau horaire avec camion muni d’un hayon.',
    },
    usageTips: [
      'Effectuez un premier feu progressif à allure modérée pour stabiliser la fonte et cuire la peinture thermique.',
      'Utilisez du bois sec (< 20% d’humidité) pour exploiter le système de triple combustion et garder la vitre propre.',
      'Ramonez le conduit deux fois par an conformément à la réglementation en vigueur.',
    ],
    storageAdvice:
      'Installation sur sol incombustible (plaque en verre trempé ou acier recommandée si sol en parquet). Respecter une distance minimale de 40 cm avec tout matériau inflammable.',
    detailedSpecs: [
      { label: 'Marque & Modèle', value: 'Bronpi — KAREN 8 kW' },
      { label: 'Matériau du corps', value: 'Fonte haute résistance monobloc' },
      { label: 'Puissance nominale', value: '8 kW (modulable de 5 à 10 kW)' },
      { label: 'Rendement énergétique', value: '82% (très haute efficacité)' },
      { label: 'Volume de chauffe', value: 'Jusqu’à 200 m³ (environ 80 m²)' },
      { label: 'Taille max. des bûches', value: '50 cm' },
      { label: 'Système de combustion', value: 'Triple combustion avec rideau d’air vitre propre' },
      { label: 'Prise d’air extérieur', value: 'Oui — raccordable à l’extérieur pour maison étanche' },
      { label: 'Diamètre d’évacuation', value: 'Ø 150 mm (sortie supérieure ou arrière)' },
      { label: 'Poids net', value: '157 kg' },
      { label: 'Classe énergétique', value: 'A+ (Norme EcoDesign 2022)' },
    ],
    warranty: 'Garantie constructeur 5 ans sur le corps en fonte',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'ofyr-wood-storage-corten-100-range-buches',
      'chariot-buches-le-marquier-fjord-noir',
      'fendeur-buches-scheppach-compact-10t-3150w',
    ],
  },

  'brasero-plancha-le-bigorneau-acier-corten-100-cm': {
    unitPriceLabel: 'Complet avec socle Corten et grille centrale',
    badgeText: '● En stock usine — Expédié sous 72h',
    delivery: {
      delay: 'Livré sous 5 à 8 jours ouvrés',
      type: 'heavy_freight',
      headline: 'Livraison transporteur sur palette sécurisée avec hayon',
      carrierNotice:
        'L’ensemble (135 kg) est livré protégé sur palette bois. Déchargement devant votre propriété. Prévoir deux personnes pour positionner la plaque de cuisson.',
    },
    usageTips: [
      'Effectuez un culottage de la plancha lors de la première utilisation : chauffez et étalez de l’huile végétale à fort point de fumée (colza ou tournesol).',
      'Alimentez le foyer avec des bûches de bois sec (chêne ou charme) coupées en 25–33 cm.',
      'Après cuisson, raclez les résidus vers le foyer et repassez un filet d’huile pour protéger la surface.',
    ],
    storageAdvice:
      'L’acier Corten est conçu pour rester dehors toute l’année et développe une patine protectrice naturelle unique. Nettoyez et huilez la plaque de cuisson avant les périodes de non-utilisation prolongée.',
    detailedSpecs: [
      { label: 'Marque & Fabrication', value: 'France Braseros — Conçu et assemblé en France' },
      { label: 'Matériau du socle', value: 'Acier Corten véritable auto-patiné résistant' },
      { label: 'Plaque de cuisson', value: 'Acier émaillé alimentaire haute résistance (épaisseur 10 mm)' },
      { label: 'Diamètre plancha', value: '100 cm (surface pour 10 à 15 convives)' },
      { label: 'Grille centrale', value: 'Incluse (diamètre 44,5 cm pour cuisson directe au feu)' },
      { label: 'Hauteur totale', value: '92 cm' },
      { label: 'Poids total', value: '135 kg' },
      { label: 'Combustible', value: 'Bois de chauffage sec ou charbon de bois naturel' },
    ],
    warranty: 'Garantie 2 ans structure et plaque',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'ofyr-fire-guard-ring-100-teck',
      'four-pizza-ofyr-100-cuisson-feu-bois',
      'ofyr-cage-100-accessoire-cuisson',
    ],
  },

  'ofyr-wood-storage-corten-100-range-buches': {
    unitPriceLabel: 'Structure architecturale 100 × 216 cm',
    badgeText: '● En stock — Expédition rapide',
    delivery: {
      delay: 'Livré sous 5 à 7 jours ouvrés',
      type: 'heavy_freight',
      headline: 'Livraison sur palette protégée avec prise de rendez-vous',
      carrierNotice: 'Livraison au pas de porte par transporteur spécialisé avec hayon élévateur.',
    },
    usageTips: [
      'Rangez les bûches de façon régulière en alternant les côtés pour optimiser la stabilité de la colonne.',
      'Utilisez le compartiment supérieur pour ranger allume-feu, gants thermiques et petit bois au sec.',
    ],
    storageAdvice:
      'Fixation murale impérative via les points d’ancrage arrière prévus pour assurer une sécurité totale contre le basculement.',
    detailedSpecs: [
      { label: 'Marque & Design', value: 'OFYR (Pays-Bas)' },
      { label: 'Matériau', value: 'Acier Corten épais de qualité architecturale' },
      { label: 'Largeur', value: '100 cm' },
      { label: 'Hauteur', value: '216 cm' },
      { label: 'Profondeur', value: '45 cm' },
      { label: 'Poids net', value: '98 kg' },
      { label: 'Capacité de stockage', value: 'Environ 1 stère de bûches de 25 à 40 cm' },
      { label: 'Compartiment accessoires', value: 'Étagère supérieure fermée intégrée' },
      { label: 'Usage', value: 'Intérieur et extérieur (résiste au gel et aux intempéries)' },
    ],
    warranty: 'Garantie 2 ans OFYR',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'chariot-buches-le-marquier-fjord-noir',
      'abri-buches-timbela-m985-414m2',
    ],
  },

  'insert-bois-invicta-p947044-10-kw': {
    unitPriceLabel: 'Fabrication 100% fonte française — Label Flamme Verte',
    badgeText: '● En stock usine — Expédié sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 8 jours ouvrés sur rendez-vous',
      type: 'heavy_freight',
      headline: 'Transporteur messagerie lourde avec déchargement au pas de porte',
      carrierNotice: 'Produit de 134 kg livré sur palette renforcée. Prise de RDV téléphonique préalable.',
    },
    usageTips: [
      'Idéal pour remplacer un foyer ouvert énergivore et multiplier par 4 le rendement thermique de votre cheminée.',
      'Nettoyez la vitre avec une éponge humide trempée dans de la cendre fine blanche : résultat éclatant sans produit chimique.',
    ],
    storageAdvice:
      'À faire installer par un professionnel qualifié RGE pour garantir la conformité du tubage (Ø 200 mm) et bénéficier des aides d’État.',
    detailedSpecs: [
      { label: 'Marque & Origine', value: 'Invicta — Fonderie française dans les Ardennes depuis 1924' },
      { label: 'Référence', value: 'Invicta P947044 — 10 kW' },
      { label: 'Matériau du foyer', value: '100% fonte d’art haute qualité' },
      { label: 'Puissance thermique', value: '10 kW (rendement > 76%)' },
      { label: 'Longueur des bûches', value: 'Jusqu’à 69 cm (très grand foyer)' },
      { label: 'Diamètre de tubage', value: 'Ø 200 mm' },
      { label: 'Dimensions extérieures', value: 'L 69,2 cm × H 61,5 cm × P 46,7 cm' },
      { label: 'Poids net', value: '134 kg' },
      { label: 'Label environnemental', value: 'Flamme Verte 7 étoiles / EcoDesign 2022' },
    ],
    warranty: 'Garantie 5 ans constructeur Invicta',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'buches-densifiees-premium-palette-1000-kg',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'ofyr-fire-guard-ring-100-teck': {
    unitPriceLabel: 'Accessoire officiel OFYR 100',
    badgeText: '● En stock — Expédié sous 24h',
    delivery: {
      delay: 'Livré sous 48h à 72h',
      type: 'parcel',
      headline: 'Livraison rapide à domicile avec numéro de suivi',
      carrierNotice: 'Colis sécurisé et soigné remis contre signature ou déposé en point relais.',
    },
    usageTips: [
      'Se monte facilement grâce aux 6 pinces en acier inoxydable ajustables autour de la plaque chaude.',
      'Sert d’écran protecteur anti-brûlures pour les enfants et de tablette de dépose conviviale pour les convives.',
    ],
    storageAdvice:
      'Huilez le teck 1 à 2 fois par an avec une huile protectrice teck extérieure pour préserver son éclat doré.',
    detailedSpecs: [
      { label: 'Marque', value: 'OFYR' },
      { label: 'Compatibilité', value: 'Tous les modèles OFYR 100' },
      { label: 'Matériau', value: 'Teck massif certifié résistant aux intempéries' },
      { label: 'Largeur de bordure', value: '12,5 cm' },
      { label: 'Système d’attache', value: '6 pinces inox anti-rayures' },
      { label: 'Démontable', value: 'Oui, démontage en quelques secondes sans outil' },
    ],
    warranty: 'Garantie 2 ans',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'ofyr-cage-100-accessoire-cuisson',
      'four-pizza-ofyr-100-cuisson-feu-bois',
    ],
  },

  'ofyr-cage-100-accessoire-cuisson': {
    unitPriceLabel: 'Accessoire officiel grillades suspendues',
    badgeText: '● En stock — Expédié sous 24h',
    delivery: {
      delay: 'Livré sous 48h à 72h',
      type: 'parcel',
      headline: 'Colis suivi avec livraison rapide à domicile',
      carrierNotice: 'Livraison soignée avec emballage renforcé anti-chocs.',
    },
    usageTips: [
      'Positionnez la cage directement au centre de l’anneau pour suspendre viandes, poissons entiers ou volailles au-dessus du foyer.',
      'Profitez de la fumée de bois noble (chêne, hêtre) pour fumer délicatement vos aliments.',
    ],
    storageAdvice: 'Nettoyer à l’eau chaude savonneuse après refroidissement et stocker à l’abri de l’humidité.',
    detailedSpecs: [
      { label: 'Marque', value: 'OFYR' },
      { label: 'Modèle', value: 'Cage 100 Cooking Accessory' },
      { label: 'Compatibilité', value: 'Braseros de cuisson OFYR 100' },
      { label: 'Matériau', value: 'Acier au carbone thermo-résistant' },
      { label: 'Éléments inclus', value: 'Cage verticale, barres de suspension transversales' },
    ],
    warranty: 'Garantie 2 ans',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'four-pizza-ofyr-100-cuisson-feu-bois',
      'ofyr-fire-guard-ring-100-teck',
    ],
  },

  'barbecue-kamado-bee-grill-xl-luxe-ceramique': {
    unitPriceLabel: 'Pack Luxe complet tout équipé — Céramique garantie à vie',
    badgeText: '● En stock — Expédition sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 8 jours ouvrés',
      type: 'heavy_freight',
      headline: 'Livraison sécurisée sur palette avec hayon et prise de RDV',
      carrierNotice:
        'Expédition sur palette protégée haute sécurité (poids : 78 kg). Le transporteur vous contacte pour convenir du jour de passage. Déchargement au pas de porte.',
    },
    usageTips: [
      'Utilisez exclusivement du charbon de bois de gros calibre naturel. Ne jamais utiliser d’allume-feu chimique liquide qui altérerait la porosité de la céramique.',
      'Réglez la température avec une précision au degré près grâce aux trappes d’aération supérieure et inférieure (de 80°C pour fumage lent à 400°C pour saisie de steaks).',
    ],
    storageAdvice:
      'Bien bâcher avec la housse tout-temps imperméable fournie dès que le barbecue est totalement refroidi.',
    detailedSpecs: [
      { label: 'Marque & Modèle', value: 'Bee Grill — Kamado XL Luxe Céramique' },
      { label: 'Diamètre extérieur', value: '55 cm (Grille de cuisson Ø 47 cm)' },
      { label: 'Matériau principal', value: 'Céramique réfractaire mullite haute densité' },
      { label: 'Châssis & Quincaillerie', value: 'Inox satiné noir traité anti-rouille' },
      { label: 'Tablettes latérales', value: 'Noyer massif pliable avec porte-ustensiles' },
      { label: 'Accessoires inclus', value: 'Chariot à 4 roulettes freinées, housse luxe, déflecteur céramique 2 zones, lève-grille' },
      { label: 'Hauteur totale', value: '122 cm' },
      { label: 'Poids net', value: '78 kg' },
    ],
    warranty: 'Céramique garantie à vie / 2 ans sur la quincaillerie',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'four-pizza-ofyr-100-cuisson-feu-bois',
      'chauffage-exterieur-gaz-planika-faro-8-kw',
    ],
  },

  'radiateur-electrique-connecte-sauter-hekla-1500w': {
    unitPriceLabel: 'Fabrication française — Chaleur douce fonte connectée',
    badgeText: '● En stock — Expédié sous 24/48h',
    delivery: {
      delay: 'Livré sous 3 à 5 jours ouvrés',
      type: 'parcel',
      headline: 'Livraison sécurisée avec suivi transporteur spécialisé',
      carrierNotice: 'Colis renforcé anti-chocs remis en main propre contre signature.',
    },
    usageTips: [
      'Associez l’appareil à votre smartphone via l’application gratuite Sauter Cozytouch pour programmer vos plages de chauffe et suivre votre consommation en direct.',
      'Activez la détection automatique de fenêtres ouvertes pour couper la chauffe lors de l’aération quotidienne.',
    ],
    storageAdvice: 'Installation murale simple grâce au dosseret de fixation gabarit inclus dans le carton.',
    detailedSpecs: [
      { label: 'Marque & Origine', value: 'Sauter — Fabriqué en France' },
      { label: 'Modèle', value: 'Hekla 1500 W Connecté' },
      { label: 'Technologie', value: 'Double cœur de chauffe (cœur fonte d’inertie + film de façade)' },
      { label: 'Puissance', value: '1 500 Watts' },
      { label: 'Surface indicative', value: 'Pièces jusqu’à 15 m² (séjour, chambre, bureau)' },
      { label: 'Connectivité', value: 'Wi-Fi intégré compatible Cozytouch (iOS & Android)' },
      { label: 'Éclairage d’ambiance', value: 'LED indirecte sous le radiateur (4 intensités)' },
      { label: 'Dimensions', value: '104 cm × 59 cm × 14 cm' },
      { label: 'Poids', value: '23 kg' },
      { label: 'Label & Norme', value: 'NF Électricité Performance *** œil / Classe II / IP24' },
    ],
    warranty: 'Garantie 2 ans constructeur Sauter',
    relatedSlugs: [
      'radiateur-electrique-connecte-sauter-ipala-1500w',
      'cheminee-electrique-purline-verre-noir-2000w',
      'poele-bois-fonte-bronpi-karen-8-kw',
    ],
  },

  'radiateur-electrique-connecte-sauter-ipala-1500w': {
    unitPriceLabel: 'Inertie fluide caloporteur — Confort doux type chauffage central',
    badgeText: '● En stock — Expédié sous 24/48h',
    delivery: {
      delay: 'Livré sous 3 à 5 jours ouvrés',
      type: 'parcel',
      headline: 'Livraison sécurisée avec numéro de suivi',
      carrierNotice: 'Colis haute protection remis contre signature.',
    },
    usageTips: [
      'Idéal pour les chambres grâce à son silence de fonctionnement absolu et sa chaleur constante qui ne dessèche pas les muqueuses.',
      'Réglez à 19°C en présence et 16°C en mode éco pour un compromis parfait confort / économies.',
    ],
    storageAdvice: 'Conserver en position verticale avant et pendant l’installation pour un équilibre optimal du fluide.',
    detailedSpecs: [
      { label: 'Marque', value: 'Sauter (France)' },
      { label: 'Modèle', value: 'Ipala 1500 W Inertie Fluide' },
      { label: 'Technologie', value: 'Fluide caloporteur minéral haute conductivité sans entretien' },
      { label: 'Puissance', value: '1 500 W' },
      { label: 'Surface recommandée', value: 'Pièces de 12 à 18 m²' },
      { label: 'Connectivité', value: 'Compatible application Sauter Cozytouch' },
      { label: 'Dimensions', value: '88 cm × 58 cm × 12 cm' },
      { label: 'Poids', value: '17 kg' },
      { label: 'Normes', value: 'NF Électricité / Classe II / IP24' },
    ],
    warranty: 'Garantie 2 ans constructeur',
    relatedSlugs: [
      'radiateur-electrique-connecte-sauter-hekla-1500w',
      'cheminee-electrique-purline-verre-noir-2000w',
    ],
  },

  'buches-densifiees-premium-palette-1000-kg': {
    unitPriceLabel: 'Soit 0,44 € / kg (6,65 € par pack de 8 bûches)',
    badgeText: '● En stock — Expédié sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 7 jours ouvrés sur rendez-vous',
      type: 'pallet',
      headline: 'Livraison sur palette d’une tonne avec hayon et transpalette',
      carrierNotice:
        'Palette de 66 packs étanches (1 000 kg net) déchargée au sol par transpalette à l’endroit souhaité si l’accès est goudronné et de plain-pied.',
    },
    usageTips: [
      'Ne chargez qu’une seule bûche densifiée à la fois dans votre foyer ! En brûlant, la bûche gonfle légèrement et dégage une chaleur équivalente à 3 ou 4 bûches classiques.',
      'Allumage très facile avec un morceau d’allume-feu naturel placé sous un morceau de bûche cassée.',
    ],
    storageAdvice:
      'Stockage impérativement au sec (garage, cave saine ou buanderie). Le bois densifié craint l’eau et l’humidité ambiante excessive.',
    detailedSpecs: [
      { label: 'Type de produit', value: 'Bûches densifiées de jour à haut rendement' },
      { label: 'Matière première', value: '100% sciures et copeaux de chêne et hêtre propres, sans colle' },
      { label: 'Conditionnement', value: 'Palette de 66 packs de 8 bûches (Poids total : 1 000 kg)' },
      { label: 'Pouvoir calorifique (PCI)', value: 'Environ 5,0 kWh / kg' },
      { label: 'Taux d’humidité', value: 'Inférieur à 10% (combustion ultra-propre)' },
      { label: 'Taux de cendres', value: 'Moins de 1% (vitre et conduit propres)' },
      { label: 'Dimensions d’une bûche', value: 'Longueur env. 30 cm × Diamètre env. 9 cm' },
      { label: 'Appareils compatibles', value: 'Tous poêles à bois, inserts, cuisinières et cheminées' },
    ],
    warranty: '100% naturel sans colle certifié',
    relatedSlugs: [
      'buches-densifiees-nuit-eo2-palette-520-buches',
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'granules-bois-premium-6mm-palette-990-kg',
    ],
  },

  'buches-densifiees-nuit-eo2-palette-520-buches': {
    unitPriceLabel: 'Soit 0,86 € / bûche (longue combustion 6 à 10h)',
    badgeText: '● En stock — Expédié sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 7 jours ouvrés sur rendez-vous',
      type: 'pallet',
      headline: 'Livraison sur palette complète avec hayon et transpalette',
      carrierNotice: 'Prise de rendez-vous par transporteur messagerie lourde. Déchargement devant votre domicile.',
    },
    usageTips: [
      'Déposez 1 à 2 bûches de nuit sur un bon lit de braises chaudes avant de vous coucher ou de partir au travail.',
      'Réduisez les arrivées d’air au minimum : la bûche va se consumer lentement pendant 6 à 10 heures sans flamme agressive, en entretenant une douce chaleur.',
      'Le matin, réouvrez les tirages d’air et remettez du bois classique pour relancer le feu sans ré-allumer !',
    ],
    storageAdvice: 'Conserver dans un endroit sec et aéré, à l’abri des infiltrations d’eau.',
    detailedSpecs: [
      { label: 'Marque', value: 'EO2 (Leader français de l’énergie biomasse)' },
      { label: 'Composition', value: '100% écorces de feuillus et résineux français compressées' },
      { label: 'Durée de combustion', value: '6 à 10 heures de braises maintenues' },
      { label: 'Conditionnement', value: 'Palette de 104 packs de 5 bûches (520 bûches, env. 900 kg)' },
      { label: 'Dimensions d’une bûche', value: 'L 30 cm × Ø 10 cm' },
      { label: 'Taux d’humidité', value: 'Inférieur à 11%' },
      { label: 'Taux de cendres', value: 'Moins de 3%' },
      { label: 'Appareils compatibles', value: 'Poêles à bois, cheminées fermées, inserts' },
    ],
    warranty: 'Garantie bois français certifié sans additif',
    relatedSlugs: [
      'buches-densifiees-premium-palette-1000-kg',
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'poele-granules-jolly-mec-6-kw-programmable': {
    unitPriceLabel: 'Rendement exceptionnel 90% — Programmation hebdomadaire',
    badgeText: '● En stock — Expédition sous 48/72h',
    delivery: {
      delay: 'Livré sous 5 à 8 jours ouvrés sur rendez-vous',
      type: 'heavy_freight',
      headline: 'Transporteur spécialisé matériel thermique avec hayon',
      carrierNotice:
        'Produit sensible de 95 kg livré emballé sur palette sécurisée. Prise de contact téléphonique pour validation du créneau de livraison.',
    },
    usageTips: [
      'Programmez les plages horaires de confort (matin et soirée) pour réduire votre consommation de granulés jusqu’à 30%.',
      'Utilisez exclusivement des granulés certifiés DINplus ou ENplus A1 pour préserver la bougie d’allumage et le ventilateur.',
    ],
    storageAdvice: 'Raccordement sur conduit étanche Ø 80 mm conforme aux règles de l’art (DTU 24.1).',
    detailedSpecs: [
      { label: 'Marque', value: 'Jolly Mec (Italie — haute technologie thermique)' },
      { label: 'Puissance thermique', value: '6 kW (modulable de 2,9 à 6,7 kW)' },
      { label: 'Rendement énergétique', value: '90% (Classe A+)' },
      { label: 'Capacité de la trémie', value: '18 kg (jusqu’à 32h d’autonomie)' },
      { label: 'Consommation de pellets', value: '0,6 à 1,4 kg / heure' },
      { label: 'Équipements inclus', value: 'Télécommande radio multifonction, mode silence par convection naturelle' },
      { label: 'Évacuation fumées', value: 'Ø 80 mm étanche' },
      { label: 'Poids', value: '95 kg' },
      { label: 'Norme européenne', value: 'EN 14785 — Éligible MaPrimeRénov’' },
    ],
    warranty: 'Garantie fabricant 2 ans pièces et corps de chauffe',
    relatedSlugs: [
      'granules-bois-premium-6mm-palette-990-kg',
      'poele-bois-fonte-bronpi-karen-8-kw',
      'cheminee-electrique-purline-verre-noir-2000w',
    ],
  },

  'cheminee-electrique-purline-verre-noir-2000w': {
    unitPriceLabel: 'Effet flamme LED réglable — Façade verre trempé noir',
    badgeText: '● En stock — Expédié sous 24h',
    delivery: {
      delay: 'Livré sous 48h à 72h',
      type: 'parcel',
      headline: 'Livraison rapide à domicile avec numéro de suivi',
      carrierNotice: 'Colis sécurisé double cannelure avec protection mousse haute densité.',
    },
    usageTips: [
      'Profitez de l’effet flammes indépendant du chauffage : illuminez votre salon en soirée d’été sans chauffer la pièce !',
      'Deux allures de chauffe (1000 W et 2000 W) pour moduler rapidement la température de la pièce.',
    ],
    storageAdvice: 'Installation rapide sans conduit ni travaux : à poser sur meuble ou à fixer au mur.',
    detailedSpecs: [
      { label: 'Marque', value: 'Purline' },
      { label: 'Puissance maximale', value: '2 000 Watts (2 allures : 1000 W / 2000 W)' },
      { label: 'Énergie', value: 'Électricité 230 V (prise secteur standard)' },
      { label: 'Façade', value: 'Verre trempé de sécurité noir' },
      { label: 'Effet de flammes', value: 'Technologie LED dynamique avec lit de galets décoratifs' },
      { label: 'Télécommande', value: 'Incluse (marche/arrêt, flamme, thermostat)' },
      { label: 'Surface indicative', value: 'Chauffage d’appoint pour pièce de 15 à 22 m²' },
      { label: 'Sécurité', value: 'Arrêt automatique anti-surchauffe' },
    ],
    warranty: 'Garantie 2 ans',
    relatedSlugs: [
      'radiateur-electrique-connecte-sauter-hekla-1500w',
      'radiateur-electrique-connecte-sauter-ipala-1500w',
      'poele-bois-fonte-bronpi-karen-8-kw',
    ],
  },

  'chauffage-exterieur-gaz-planika-faro-8-kw': {
    unitPriceLabel: 'Flamme visible à 360° — Autonomie jusqu’à 55 heures',
    badgeText: '● En stock usine — Expédié sous 48h',
    delivery: {
      delay: 'Livré sous 4 à 6 jours ouvrés',
      type: 'heavy_freight',
      headline: 'Livraison transporteur avec protection spéciale verre',
      carrierNotice: 'Livré sur palette sécurisée avec parois en verre trempé emballées séparément.',
    },
    usageTips: [
      'Utilisez une bouteille de gaz Propane standard de 13 kg (qui ne gèle pas même par température négative jusqu’à -40°C).',
      'Allumage piézo-électrique instantané avec sécurité thermo-couple coupant automatiquement le gaz si la flamme s’éteint.',
    ],
    storageAdvice:
      'Les roulettes avec frein permettent de rentrer l’appareil sous abri en quelques secondes en fin de soirée.',
    detailedSpecs: [
      { label: 'Marque & Design', value: 'Planika — Référence européenne du feu décoratif' },
      { label: 'Modèle', value: 'Faro 8 kW' },
      { label: 'Combustible', value: 'Gaz Propane ou GPL (bouteille standard 13 kg logée dans le socle)' },
      { label: 'Puissance calorifique', value: 'Jusqu’à 8 kW réglable' },
      { label: 'Autonomie', value: 'Jusqu’à 55 heures de fonctionnement continu' },
      { label: 'Visières', value: '4 parois en verre trempé coupe-vent' },
      { label: 'Mobilité', value: '4 roulettes pivotantes avec freins' },
      { label: 'Dimensions', value: 'H 146 cm × L 36 cm × P 36 cm' },
      { label: 'Poids', value: '20 kg (hors bouteille)' },
      { label: 'Certifications', value: 'Norme CE / Certification Kiwa' },
    ],
    warranty: 'Garantie 2 ans Planika',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'barbecue-kamado-bee-grill-xl-luxe-ceramique',
      'chauffage-infrarouge-exterieur-frico-term-ip67-2000w',
    ],
  },

  'four-pizza-ofyr-100-cuisson-feu-bois': {
    unitPriceLabel: 'Kit complet four en fonte + pierre réfractaire + pelle',
    badgeText: '● En stock — Expédié sous 24h',
    delivery: {
      delay: 'Livré sous 48h à 72h',
      type: 'parcel',
      headline: 'Colis soigné livré à domicile avec suivi',
      carrierNotice: 'Pierre réfractaire cordiérite emballée sous protection antichoc renforcée.',
    },
    usageTips: [
      'Atteint une température de 350°C à 400°C en moins de 15 minutes grâce au rayonnement du feu de bois.',
      'Farinez légèrement la pelle à pizza avant d’enfourner pour une glisse impeccable.',
      'Une pizza authentique napolitaine cuit en 90 secondes avec une pâte alvéolée et croustillante.',
    ],
    storageAdvice: 'Nettoyer la pierre à sec avec une brosse métallique douce. Ne jamais plonger la pierre chaude dans l’eau.',
    detailedSpecs: [
      { label: 'Marque', value: 'OFYR' },
      { label: 'Modèle', value: 'Pizza Oven 100' },
      { label: 'Compatibilité', value: 'Unités de cuisson brasero OFYR 100' },
      { label: 'Cloche', value: 'Fonte émaillée double paroi avec clapet de ventilation réglable' },
      { label: 'Pierre de cuisson', value: 'Pierre réfractaire naturelle cordiérite Ø 35 cm' },
      { label: 'Accessoire inclus', value: 'Pelle à pizza en aluminium anodisé alimentaire' },
      { label: 'Combustible', value: 'Feu de bois naturel' },
    ],
    warranty: 'Garantie 2 ans OFYR',
    relatedSlugs: [
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'ofyr-fire-guard-ring-100-teck',
      'barbecue-kamado-bee-grill-xl-luxe-ceramique',
    ],
  },

  'abri-buches-timbela-m985-414m2': {
    unitPriceLabel: 'Surface 4,14 m² — Combiné abri à bois + remise outillage',
    badgeText: '● En stock fabricant — Expédié sous 72h',
    delivery: {
      delay: 'Livré sous 6 à 10 jours ouvrés sur rendez-vous',
      type: 'heavy_freight',
      headline: 'Livraison par camion avec chariot embarqué / hayon',
      carrierNotice:
        'Colis volumineux (285 kg) livré en kit complet sur palette longue. Le transporteur planifie le jour et le créneau horaire avec vous. Dépose au sol devant votre accès.',
    },
    usageTips: [
      'Montez l’abri sur une dalle béton plane ou des plots en béton pour isoler la base de l’humidité du sol.',
      'Le côté ouvert permet de ventiler jusqu’à 6 stères de bois, tandis que la partie fermée sécurise tondeuse, tronçonneuse et outillage.',
    ],
    storageAdvice: 'Bois naturel traité autoclave. Appliquez une lasure microporeuse ou un saturateur tous les 2 à 3 ans pour préserver sa teinte.',
    detailedSpecs: [
      { label: 'Marque', value: 'TIMBELA (Fabrication européenne certifiée FSC)' },
      { label: 'Modèle', value: 'M985 Combiné Abri Bois & Remise' },
      { label: 'Surface au sol totale', value: '4,14 m²' },
      { label: 'Dimensions extérieures', value: 'Largeur 345 cm × Profondeur 120 cm × Hauteur 220 cm' },
      { label: 'Matériau', value: 'Pin sylvestre d’Europe du Nord traité autoclave classe III' },
      { label: 'Toiture', value: 'Toit étanche feutre bitumé noir hydrofuge inclus' },
      { label: 'Capacité de bois', value: 'Jusqu’à 6 stères de bûches de 33 à 50 cm' },
      { label: 'Poids total du kit', value: '285 kg avec visserie complète et guide de montage' },
    ],
    warranty: 'Garantie fabricant 2 ans',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'fendeur-buches-scheppach-compact-10t-3150w',
      'ofyr-wood-storage-corten-100-range-buches',
    ],
  },

  'foyer-bois-panoramique-acaminetti-flat-150x50': {
    unitPriceLabel: 'Écran panoramique 150 cm — Foyer relevable guillotine',
    badgeText: '● Sur commande usine — Expédié sous 5 jours',
    delivery: {
      delay: 'Livré sous 7 à 12 jours ouvrés sur rendez-vous',
      type: 'heavy_freight',
      headline: 'Transporteur spécialisé lourd avec déchargement au hayon',
      carrierNotice:
        'Produit d’exception (340 kg). Livré sur palette caissée renforcée en bois. Prise de rendez-vous obligatoire.',
    },
    usageTips: [
      'La porte à relevage guillotine permet de passer d’un foyer fermé à très haut rendement à l’ambiance d’un foyer ouvert en un geste.',
      'Conçu pour chauffer de très grands volumes ou pièces de vie cathédrale de 100 à 200 m².',
    ],
    storageAdvice: 'Installation par un professionnel fumiste qualifié RGE obligatoire.',
    detailedSpecs: [
      { label: 'Marque', value: 'A.Caminetti' },
      { label: 'Modèle', value: 'Flat 150 × 50 Panoramique' },
      { label: 'Puissance thermique', value: '17 à 25 kW' },
      { label: 'Rendement énergétique', value: '81% (EcoDesign 2022)' },
      { label: 'Format vitrage', value: 'Écran panoramique verre vitrocéramique 150 cm × 50 cm' },
      { label: 'Système d’ouverture', value: 'Relevage vertical à guillotine + ouverture latérale pour nettoyage' },
      { label: 'Matériau intérieur', value: 'Briques réfractaires chamotte haute accumulation' },
      { label: 'Diamètre conduit', value: 'Ø 250 mm' },
      { label: 'Poids net', value: '340 kg' },
    ],
    warranty: 'Garantie 5 ans corps de chauffe',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'ofyr-wood-storage-corten-100-range-buches',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },

  'chariot-buches-le-marquier-fjord-noir': {
    unitPriceLabel: 'Fabrication Origine France Garantie — Capacité 60 kg',
    badgeText: '● En stock — Expédié sous 24h',
    delivery: {
      delay: 'Livré sous 48h à 72h',
      type: 'parcel',
      headline: 'Livraison rapide à domicile avec numéro de suivi',
      carrierNotice: 'Colis soigné remis contre signature.',
    },
    usageTips: [
      'Transportez jusqu’à 60 kg de bûches depuis votre abri extérieur jusqu’au salon sans effort et sans salir vos sols grâce aux roues bandage caoutchouc.',
      'Son design noir épuré sert également de range-bûches esthétique à côté de votre poêle ou insert.',
    ],
    storageAdvice: 'Structure acier traitée peinture époxy, utilisable aussi bien à l’intérieur qu’à l’extérieur.',
    detailedSpecs: [
      { label: 'Marque & Origine', value: 'Le Marquier — Fabriqué à Bayonne (Origine France Garantie)' },
      { label: 'Modèle', value: 'Chariot Fjord Noir' },
      { label: 'Capacité de charge', value: 'Jusqu’à 60 kg de bûches' },
      { label: 'Matériau', value: 'Acier électrozingué avec finition peinture époxy texturée noire' },
      { label: 'Roues', value: 'Grandes roues Ø 20 cm avec pneus caoutchouc tout-terrain silencieux' },
      { label: 'Dimensions', value: 'Largeur 45 cm × Profondeur 48 cm × Hauteur 103 cm' },
      { label: 'Poids net', value: '14 kg' },
    ],
    warranty: 'Garantie fabricant 2 ans',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'poele-bois-fonte-bronpi-karen-8-kw',
      'insert-bois-invicta-p947044-10-kw',
    ],
  },

  'chauffage-infrarouge-exterieur-frico-term-ip67-2000w': {
    unitPriceLabel: 'Qualité suédoise — 100% étanche IP67 toutes intempéries',
    badgeText: '● En stock — Expédié sous 24h',
    delivery: {
      delay: 'Livré sous 48h à 72h',
      type: 'parcel',
      headline: 'Colis sécurisé avec livraison rapide à domicile',
      carrierNotice: 'Tube quartz infrarouge emballé sous double mousse protectrice.',
    },
    usageTips: [
      'La technologie infrarouge à ondes courtes chauffe directement les personnes et les objets, sans être déviée par les courants d’air ou le vent.',
      'Allumage instantané en moins d’une seconde pour réchauffer terrasses, vérandas ou balcons en mi-saison.',
    ],
    storageAdvice: 'Grâce à son indice IP67, le radiateur peut rester fixé dehors en permanence sous la pluie et la neige.',
    detailedSpecs: [
      { label: 'Marque & Origine', value: 'FRICO (Suède — référence internationale du génie thermique)' },
      { label: 'Modèle', value: 'Term IP67 2000 W' },
      { label: 'Technologie', value: 'Infrarouge quartz à ondes courtes haute performance' },
      { label: 'Puissance', value: '2 000 Watts — Alimentation 230 V' },
      { label: 'Indice de protection', value: 'IP67 (étanche à l’eau, aux jets haute pression et à la poussière)' },
      { label: 'Surface rayonnée', value: 'Zone de confort de 12 à 16 m²' },
      { label: 'Fixation', value: 'Support mural orientable en acier inoxydable inclus' },
    ],
    warranty: 'Garantie 2 ans constructeur',
    relatedSlugs: [
      'chauffage-exterieur-gaz-planika-faro-8-kw',
      'brasero-plancha-le-bigorneau-acier-corten-100-cm',
      'radiateur-electrique-connecte-sauter-hekla-1500w',
    ],
  },

  'fendeur-buches-scheppach-compact-10t-3150w': {
    unitPriceLabel: 'Puissance 10 tonnes — Moteur 3 150 W sur secteur 230 V',
    badgeText: '● En stock — Expédié sous 48h',
    delivery: {
      delay: 'Livré sous 5 à 8 jours ouvrés sur rendez-vous',
      type: 'heavy_freight',
      headline: 'Livraison transporteur sur palette sécurisée avec hayon',
      carrierNotice:
        'Machine de 125 kg livrée sur palette sanglée. Le transporteur vous contacte pour convenir du rendez-vous de livraison.',
    },
    usageTips: [
      'Commande bimanuelle de sécurité : les deux mains sont obligatoirement sur les poignées pour actionner la descente du coin.',
      'Fend aisément tous les types de bois, même les nœuds et les essences denses (chêne sec, charme, orme).',
      'Plateau réglable permettant de fendre des bûches courtes (30 cm) comme des rondins jusqu’à 107 cm.',
    ],
    storageAdvice: 'Vérifier le niveau d’huile hydraulique une fois par an et stocker sous abri après nettoyage de la table.',
    detailedSpecs: [
      { label: 'Marque', value: 'Scheppach (Allemagne)' },
      { label: 'Modèle', value: 'Compact 10T Vertical' },
      { label: 'Force de fendage hydraulique', value: '10 Tonnes réelles' },
      { label: 'Moteur électrique', value: '3 150 Watts (4,3 CV) — 230 V standard domestique' },
      { label: 'Longueur max. de bûche', value: 'Jusqu’à 107 cm' },
      { label: 'Diamètre max. de bûche', value: 'Jusqu’à 35 cm' },
      { label: 'Sécurité', value: 'Double commande bimanuelle avec griffes de maintien' },
      { label: 'Poids net', value: '125 kg (sur 2 roues de transport tout-terrain)' },
    ],
    warranty: 'Garantie constructeur 5 ans Scheppach',
    relatedSlugs: [
      'bois-de-chauffage-premium-chene-charme-hetre-2-steres-33-cm',
      'abri-buches-timbela-m985-414m2',
      'chariot-buches-le-marquier-fjord-noir',
    ],
  },
}

export function getProductRichSpec(slug: string): RichProductSpec | undefined {
  return productRichSpecs[slug]
}
