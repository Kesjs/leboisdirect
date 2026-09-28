# Braviko Design System

## 1. Positionnement

Braviko est une marketplace de produits utiles pour la maison, le chauffage et le terrain agricole. L'interface doit être immédiatement compréhensible, fiable et extensible : deux univers clairement séparés, une même exigence de sélection et de service.

La direction visuelle est éditoriale, premium et utilitaire. Elle associe la chaleur des matières naturelles à la précision des outils et des équipements. L'interface ne doit jamais devenir rustique, folklorique ou trop technologique.

**Dials de référence**

- Variance : 6/10, asymétrie maîtrisée
- Motion : 5/10 sur l'accueil, une séquence narrative forte et des interactions douces
- Densité : 4/10, respiration et lecture rapide

## 2. Palette

- **Ivoire** `#FAF9F6` : canvas principal
- **Blanc** `#FFFFFF` : surfaces et zones de lecture
- **Charbon** `#252823` : titres, navigation et CTA principal
- **Fumée** `#64685F` : texte secondaire
- **Ligne** `#DEDFD6` : séparateurs et contours discrets
- **Braise** `#995033` : accent unique, focus, liens actifs et détails chaleur
- **Surface** `#EEEEE7` : récit, panneaux et fonds de comparaison
- **Forêt** `#34483A` : surface éditoriale dédiée à l'univers Agriculture

L'accent Braise reste mesuré. Le vert Forêt est une couleur de surface et non un second accent de bouton. Aucun dégradé néon, violet IA ou ombre noire générique.

## 3. Typographie

- **Display et titres** : sans-serif moderne, dense et trackée serrée. Utiliser `clamp()` et `text-balance`.
- **Corps** : 16 à 18px, interligne 1.6, largeur maximale d'environ 65 caractères.
- **Labels** : 11 à 13px, capitales espacées uniquement pour les catégories et repères fonctionnels.
- **Règle** : les titres de hero ne dépassent jamais 3 lignes sur desktop.
- Éviter le serif décoratif, les titres entièrement en capitales et les textes marketing vagues.

## 4. Architecture des pages

Chaque page suit une structure claire : navigation Braviko, hero avec une idée principale, contenu organisé par intention, preuves ou détails pratiques, appel à l'action simple, puis footer utile.

La landing page utilise deux portes d'entrée principales : **Chauffage** et **Agriculture**. Elles ne doivent pas être mélangées dans une grille de produits indifférenciée.

## 5. Composants

### Navigation

Hauteur de 80px sur desktop, 72px sur mobile. Logo à gauche, univers principaux au centre, recherche, langue et panier à droite. Ne pas afficher d'accès compte sans parcours fonctionnel. Sur mobile, menu compact avec cibles tactiles d'au moins 44px. Drapeaux graphiques CSS, jamais les émojis dépendants du système.

### Boutons

- Primaire : charbon avec texte blanc, rayon 4px, translation de 1px à l'appui.
- Secondaire : transparent ou blanc avec bordure charbon.
- Tertiaire : lien texte avec flèche, sans encadré inutile.
- Un seul CTA primaire dominant par section.

### Cartes univers

Deux cartes de destination avec photographie, overlay lisible, titre, phrase courte et lien. La carte Chauffage privilégie les matières chaudes. La carte Agriculture privilégie le terrain, la précision et l'usage.

### Cartes produit

Photo 4:3, nom, catégorie, information essentielle, prix et livraison. Éviter l'empilement de badges. Les cartes ne doivent exister que lorsqu'elles facilitent réellement la comparaison.

### États

Les composants interactifs doivent prévoir focus clavier, hover, état actif, état vide, chargement squelette et erreur inline. Aucun bouton mort ou lien `#`.

## 6. Mise en page

- Container maximum : 1440px.
- Padding horizontal : 20px mobile, 32px tablette, 56px desktop.
- CSS Grid prioritaire ; pas de calculs de largeur complexes en Flexbox.
- Les grandes sections utilisent un rythme généreux : 80 à 120px verticalement.
- Produits : 3 colonnes, 2 sous 900px, 1 sous 480px. Les compositions éditoriales passent en une colonne sous 700px.
- Utiliser `min-h-[100dvh]` plutôt que `h-screen`.
- Aucun débordement horizontal dû aux animations.

## 7. Motion

Le mouvement sert la compréhension : apparition douce avec opacité et translation courte, scale image de 1 à 1.03 au hover, parallax léger dans le hero uniquement, transitions de 200 à 500ms, et réduction avec `prefers-reduced-motion`.

Exception signature : le récit matière → équipement → quotidien est épinglé par GSAP ScrollTrigger sur desktop (largeur ≥1024px, hauteur ≥650px). Trois scènes se fondent au défilement, sans remplacer le scroll natif. Mobile, petits écrans et mouvement réduit : les trois scènes restent empilées et lisibles. Un seul pin sur la page. Les effets d'entrée peuvent durer 800ms, une seule fois.

GSAP gère le défilement, Framer Motion les menus, onglets et le panier. Ne pas ajouter Lenis ou une troisième bibliothèque. Nettoyer chaque contexte, respecter le changement de préférence à chaud et conserver un HTML visible sans JavaScript.

Ne jamais animer `top`, `left`, `width` ou `height`. Ne pas utiliser de boucle permanente, de curseur custom, de scroll hijacking ou d'effet spectaculaire sans fonction.

## 8. Univers de contenu

### Chauffage

Bûches, bois compressé, granulés, allumage et conseils de stockage. Ton chaleureux, précis et rassurant.

### Agriculture

Machines, outils, équipements et consommables agricoles. Ton concret, fiable et orienté usage. Les futurs produits agricoles devront disposer de leurs propres visuels et attributs techniques.

## 9. Règles anti-génériques

- Pas de trois cartes identiques pour chaque section.
- Pas de dégradé violet ou bleu de type IA.
- Pas de texte creux comme « révolutionnaire », « seamless » ou « game changer ».
- Pas de faux chiffres, témoignages ou logos inventés.
- Pas d'emojis dans l'interface.
- Pas de shadow systématique sur les cartes.
- Pas de sur-animation.
- Pas de mélange arbitraire des univers Chauffage et Agriculture.
- Pas d'image stock sans fonction éditoriale claire.
- Pas de titre de section en majuscules partout.

## 10. Checklist avant livraison

- Braviko est visible et cohérent partout.
- Les deux univers sont compréhensibles en moins de cinq secondes.
- Le hero ne dépasse pas trois lignes.
- Chaque CTA a une destination réelle.
- La navigation fonctionne sur desktop et mobile.
- Les états de focus sont visibles.
- Les images ont un alt pertinent.
- Le layout ne déborde pas sur mobile.
- Les animations restent calmes et respectent les préférences de mouvement.
- Chaque nouvelle page reprend ces tokens, cette palette et cette hiérarchie.

## 11. Contrat d'implémentation

- Source des tokens et composants visuels : `app/braviko.css`, importé après les styles historiques dans le layout.
- Texte de l'accueil et de la coque : `data/braviko-copy.ts`. Chaque clé existe en français, allemand et italien ; ne pas insérer de texte visible directement dans les composants.
- Noms des produits : `data/product-labels.ts`. Prix, variantes et références viennent exclusivement de `data/products.ts`.
- Réutiliser `Header`, `Footer`, `ProductCard`, `CartDrawer` et les classes `bk-container`, `bk-title`, `bk-button`, `bk-text-link` pour les futures pages.
- Univers : `/boutique?universe=heating` et `/boutique?universe=agriculture`. L'agriculture affiche un état explicite de préparation tant qu'aucun véritable produit agricole n'est fourni. Ne pas inventer de références, caractéristiques, prix ou témoignages.
- La sélection garde ses boutons d'ajout utilisables au clavier ; les onglets se parcourent avec les flèches. Le panier modal doit contenir le focus, se fermer avec Échap et restituer le focus.
- Les pages historiques ne sont pas toutes migrées vers ce système : les mettre à niveau progressivement, sans annoncer leur traduction complète avant vérification.
