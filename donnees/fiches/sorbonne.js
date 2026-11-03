/* Fiche : sorbonne de laboratoire.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   Sources principales : guide INRS ED 795 (2009) et note INRS de septembre 2026.
   NF EN 14175 et NF X 15-206 n'ont pas été lues directement : leurs valeurs viennent de l'INRS.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "sorbonne",
  titre: "Sorbonne de laboratoire",
  soustitre: "Une enceinte ventilée qui aspire l'air du labo par une ouverture réglable : c'est ce courant d'air entrant, plus que la vitre, qui retient les vapeurs loin de la personne qui manipule.",
  schema: "sorbonne",

  essentiel: [
    { t: "Une <b>sorbonne</b> est une enceinte en dépression : elle aspire l'air du local et le rejette dehors avec un ventilateur. C'est une protection collective contre les gaz et les particules chimiques, pas contre les micro-organismes ni les particules radioactives.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
    { t: "<b>Ce qui protège, c'est l'air qui entre</b> par l'ouverture : il doit être intense, homogène et constant. Tout courant d'air devant la sorbonne peut rompre ce confinement.", s: "expert", ref: "INRS, guide ED 795, chapitre 5 ; Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "<b>La guillotine se travaille au plus bas</b>, et baissée à la butée quand personne ne manipule. Jamais la tête dans l'enceinte.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.1 ; Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "<b>Une sorbonne ne marche jamais seule</b> : conduit, ventilateur, rejet, alarme de débit, et surtout une arrivée d'air de compensation dans le labo. Pour ces notions, voir la <a href=\"fiche.html?f=bases-ventilation\">fiche des bases de la ventilation</a>.", s: "expert", ref: "INRS, guide ED 795, paragraphes 5.1 et 5.2 ; code du travail, article R4222-13" }
  ],

  chiffres: [
    { valeur: "0,4 m/s", libelle: "Vitesse d'air minimale en chaque point de l'ouverture, guillotine à 500 mm, pour une sorbonne classique.", s: "expert", ref: "INRS, guide ED 795, tableaux 1 et 3" },
    { valeur: "0,1 ppm", libelle: "Seuil de l'essai de confinement au gaz traceur SF6. Il vient de la norme française, pas de la norme européenne.", s: "expert", ref: "INRS, guide ED 795, encadré 2 (ex-XP X 15-206) ; à relire dans NF X 15-206 d'août 2023, non lue" },
    { valeur: "1 m", libelle: "Distance entre l'ouverture et un passage habituel. Passer à 1 m plutôt qu'à 0,4 m divise le risque par plus de 10.", s: "expert", ref: "INRS, guide ED 795, tableau 2 ; Hygiène et sécurité du travail n° 284, septembre 2026" },
    { valeur: "10 à 20 Pa", libelle: "Dépression conseillée du labo par rapport aux locaux voisins sans pollution spécifique.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" }
  ],

  decision: {
    titre: "Sorbonne, ou autre chose ?",
    depart: "q1",
    noeuds: {
      q1: { q: "Manipule-t-on des micro-organismes ?", choix: [{ r: "Oui", vers: "v_psm" }, { r: "Non", vers: "q2" }] },
      v_psm: { verdict: "Poste de sécurité microbiologique", texte: "La sorbonne n'est pas faite pour cela : son air vient du labo sans filtration, et elle ne protège ni l'opérateur contre les micro-organismes ni le produit contre l'air ambiant.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
      q2: { q: "Les produits sont-ils si toxiques que la protection d'une sorbonne risque de ne pas suffire, ou faut-il une atmosphère contrôlée ?", choix: [{ r: "Oui", vers: "v_iso" }, { r: "Non", vers: "q3" }] },
      v_iso: { verdict: "Isolateur ou boîte à gants", texte: "Enceinte étanche, air filtré, accès par des gants : le recours quand une sorbonne, de niveau élevé mais non total, ne suffit pas.", s: "expert", ref: "INRS, guide ED 795, encadré 1 et paragraphe 4.1" },
      q3: { q: "S'agit-il seulement de recueillir l'air chaud d'un four ?", choix: [{ r: "Oui", vers: "v_hotte" }, { r: "Non", vers: "q4" }] },
      v_hotte: { verdict: "Hotte de laboratoire", texte: "C'est son domaine d'emploi recommandé : le recueil et l'évacuation de l'air chaud issu des fours.", s: "expert", ref: "INRS, guide ED 795, paragraphe 4.1" },
      q4: { q: "Est-ce un seul composé peu toxique, en petite quantité, manipulé de façon répétitive avec du petit matériel ?", choix: [{ r: "Oui", vers: "v_capt" }, { r: "Non", vers: "q5" }] },
      v_capt: { verdict: "Captage simple", texte: "Paillasse aspirante, buse mobile ou enceinte aspirante simplifiée peuvent suffire.", s: "expert", ref: "INRS, guide ED 795, paragraphe 4.1" },
      q5: { q: "Utilise-t-on de l'acide perchlorique ?", choix: [{ r: "Oui", vers: "v_perchl" }, { r: "Non", vers: "q6" }] },
      v_perchl: { verdict: "Sorbonne dédiée à l'acide perchlorique", texte: "Exclusivement réservée à cet usage et signalée. Matériaux choisis et nettoyage facile : les produits de réaction avec des composés organiques peuvent être explosifs. Pas de collecteur commun.", s: "expert", ref: "INRS, guide ED 795, chapitre 3 et paragraphe 5.2" },
      q6: { q: "Peut-on rejeter l'air dehors par un conduit ?", choix: [{ r: "Oui", vers: "q7" }, { r: "Non", vers: "q8" }] },
      q8: { q: "Les produits sont-ils tous connus, bien retenus par le filtre, sans aucun CMR ?", choix: [{ r: "Oui", vers: "v_recir" }, { r: "Non", vers: "v_non" }] },
      v_recir: { verdict: "Sorbonne à recirculation", texte: "Pour des opérations de même type, avec la liste des produits affichée, un signal d'insuffisance de filtration et un suivi rigoureux des filtres. Norme de référence : NF X 15-211.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
      v_non: { verdict: "Il faut créer un rejet", texte: "L'usage d'une sorbonne à recirculation est à proscrire dès que des CMR peuvent se dégager, et elle ne convient pas à des produits variés. Trouver un trajet de conduit vers l'extérieur.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
      q7: { q: "Le chauffage de l'air extrait pèse-t-il lourd, avec plusieurs sorbonnes ?", choix: [{ r: "Non", vers: "v_cst" }, { r: "Oui", vers: "v_var" }] },
      v_cst: { verdict: "Sorbonne classique à débit constant", texte: "Ou à deux vitesses, qui passe en grande vitesse à partir de 10 à 15 cm d'ouverture. Solution simple, à limiter en largeur pour limiter le débit.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
      v_var: { verdict: "Sorbonne à débit variable", texte: "Moins d'air chauffé à rejeter, mais une régulation délicate : compensation asservie à l'extraction, installateur expérimenté, et 25 % de la LIE à ne pas dépasser à débit réduit. Essais selon NF EN 14175-6.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.2 et encadré 2" }
    }
  },

  verifications: [
    { titre: "Au VISA", icone: "plan", points: [
      { t: "Cahier des charges avec les produits, l'ouverture maximale et les seuils : confinement inférieur à 0,1 ppm, vitesse d'au moins 0,4 m/s, bruit sous 55 dB(A).", s: "expert", ref: "INRS, guide ED 795, paragraphe 4.2, tableau 1" },
      { t: "Air de compensation étudié en même temps que l'extraction, et dépression du labo contrôlée.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" },
      { t: "Soufflage loin de l'ouverture. Grille murale en face : jet à moins de la moitié de la vitesse frontale. Diffuseur plafonnier : décalé, partie côté sorbonne occultée. Mieux en batterie : conduits textiles, 3 m sous plafond au moins.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" },
      { t: "Implantation : 1 m d'un passage, 1,4 m d'une paillasse d'en face, 2 m d'un mur opposé, 3 m d'une autre sorbonne, 1 m d'une porte dans un mur perpendiculaire. Jamais sur un trajet de sortie d'urgence.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.3, tableau 2" },
      { t: "Ventilateur centrifuge hors du bâtiment ou en toiture, pour garder le conduit en dépression dans le bâtiment. Vitesse dans le conduit : 10 m/s au plus. Réseau capable de 10 % de débit en plus.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Rejet vertical, 15 à 20 m/s, à l'écart des prises d'air, pas en façade à ouvrants.", s: "expert", ref: "INRS, guide ED 795, chapitre 2 et paragraphe 5.2" },
      { t: "Alarme de débit visuelle et sonore, à sécurité positive.", s: "texte", ref: "code du travail, article R4222-13 ; INRS, guide ED 795, chapitre 3" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Matériaux du conduit résistant aux produits transportés, peu de gaine souple, peu de trajets horizontaux, récupération des condensats.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Trappes de visite et points de purge sur le conduit, le ventilateur et la cheminée.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Traversée d'une paroi coupe-feu : registre coupe-feu ou collier intumescent (voir la <a href=\"fiche.html?f=clapet-coupe-feu\">fiche clapet coupe-feu</a>).", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Butées de guillotine en place, plenum démontable avec des outils seulement, rebords de rétention au plan de travail.", s: "expert", ref: "INRS, guide ED 795, chapitre 3" }
    ] },
    { titre: "À la réception", icone: "cle", points: [
      { t: "Essai sorbonne vide, dans son local : confinement au SF6 sous 0,1 ppm, vitesse d'au moins 0,4 m/s en chaque point, guillotine à 500 mm (15 points pour une largeur de 1,41 à 1,81 m).", s: "expert", ref: "INRS, guide ED 795, chapitre 6 et annexe ; méthodes NF EN 14175-3 et -4" },
      { t: "Vitesses consignées au procès-verbal : ce sont les valeurs de référence pour toute la vie de la sorbonne.", s: "expert", ref: "INRS, guide ED 795, chapitre 6" },
      { t: "Contrôles prévus : débit chaque jour, alarmes chaque semaine, fumigène tous les six mois, vitesses, débit et perte de charge chaque année.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.2 et annexe ; arrêté du 8 octobre 1987" },
      { t: "Baisse d'environ 30 % de la vitesse en un point par rapport à la référence : refaire une mesure de confinement.", s: "expert", ref: "INRS, guide ED 795, encadré 7" }
    ] }
  ],

  pieges: [
    { t: "Poser une sorbonne sans prévoir l'air de compensation : elle aspire dans un labo qui manque d'air, et ne confine plus.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" },
    { t: "Une sorbonne dans un passage. C'est le passage de personnes, plus que tout autre facteur étudié, qui dégrade le confinement.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "Choisir une sorbonne basse vitesse pour économiser : de 0,4 à 0,2 m/s, le risque est multiplié par environ 20. L'INRS préconise désormais de les proscrire.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "Croire qu'une sorbonne annoncée conforme à la NF EN 14175 est forcément performante : cette norme donne les méthodes d'essai, sans seuil. Les seuils français sont à part.", s: "expert", ref: "INRS, guide ED 795, encadré 2" },
    { t: "Sorbonne à recirculation avec des produits variés ou des CMR : à proscrire.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
    { t: "Plusieurs sorbonnes sur un collecteur commun, sans étude : refoulement vers celles à l'arrêt si elles n'ont pas de clapet anti-retour, mélanges toxiques ou explosifs.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
    { t: "Oublier le risque d'explosion : réduire le débit fait monter la concentration. Une sorbonne en zone ATEX 0 ou 1 est à proscrire ; en zone 2, matériel de catégorie 3.", s: "expert", ref: "INRS, guide ED 795, chapitre 3 et encadré 6" },
    { t: "Sorbonne encombrée, source trop près de l'ouverture, gestes brusques, deux personnes en même temps : la vitesse mesurée à vide ne protège plus.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.1" }
  ],

  confondre: [
    { titre: "Poste de sécurité microbiologique (PSM)", t: "Protège contre les micro-organismes, avec un air rejeté filtré. Une sorbonne ne le fait pas.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
    { titre: "Isolateur ou boîte à gants", t: "Enceinte étanche avec gants : protection totale, pour les produits les plus dangereux. La sorbonne reste ouverte.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
    { titre: "Hotte de laboratoire", t: "Recueille par le dessus l'air chaud des fours. Elle n'enveloppe pas le polluant.", s: "expert", ref: "INRS, guide ED 795, paragraphe 4.1" },
    { titre: "Sorbonne à recirculation", t: "Renvoie l'air filtré dans le labo, sans conduit. Bien moins polyvalente qu'une sorbonne classique.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
    { titre: "Position de travail et de maintenance", t: "La première, sous la butée, sert à manipuler. La seconde, plus ouverte, sert à entretenir ou à installer du matériel, jamais à manipuler.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" }
  ],

  references: [
    { s: "expert", t: "INRS, guide pratique de ventilation n° 18, ED 795, Sorbonnes de laboratoire, 2e édition, mars 2009 : la référence, encore citée par l'INRS en 2026." },
    { s: "expert", t: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026, Passage de personnes devant une sorbonne de laboratoire : quel impact sur son efficacité ?" },
    { s: "norme", t: "NF EN 14175 : parties 1 (vocabulaire), 2 (exigences), 3 (essais de type), 4 (essais sur site), 6 (débit variable), et TS 14175-5 (installation). Méthodes d'essai, sans seuil de performance." },
    { s: "norme", t: "NF X 15-206, août 2023 : seuils pour les essais de confinement et de vitesse (non lue, valeur de confinement connue par l'INRS). NF X 15-211, mai 2009 : sorbonnes à recirculation." },
    { s: "texte", t: "Code du travail : R4222-13 (avertissement automatique de défaillance), R4222-20 et R4222-21 (entretien, consigne), R4212-7 (notice du maître d'ouvrage), R4227-42 et suivants (atmosphères explosives). Arrêté du 8 octobre 1987 (contrôles périodiques)." }
  ]
};
