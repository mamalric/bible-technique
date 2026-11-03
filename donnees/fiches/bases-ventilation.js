/* Fiche : les bases de la ventilation. Elle part de zéro, et les autres fiches y renvoient.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   Guide INRS ED 695 lu dans son édition de 2015 (une édition de 2022 existe).
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "bases-ventilation",
  titre: "Les bases de la ventilation",
  soustitre: "Pourquoi on renouvelle l'air, comment l'air se déplace, et ce que veulent dire débit, dépression et perte de charge. À manipuler dans l'ordre, sans prérequis.",
  schema: "ventilation",

  essentiel: [
    { t: "<b>Ventiler</b>, c'est remplacer l'air d'un local : de l'air neuf entre, de l'air vicié sort. Le but est un air propre, sans chaleur excessive, sans odeurs, sans condensation.", s: "texte", ref: "code du travail, article R4222-1" },
    { t: "<b>L'air va de la pression haute vers la pression basse.</b> Le local est un volume fermé : tout l'air qui sort doit rentrer ailleurs, sinon le ventilateur tourne sans déplacer le débit prévu. C'est la compensation.", s: "expert", ref: "INRS, guide ED 695, paragraphe 7.1" },
    { t: "<b>Débit = vitesse × section.</b> Le débit, en m³/h, dit combien d'air passe. On le fixe d'abord, par personne ou selon les polluants, puis on choisit la gaine.", s: "expert", ref: "INRS, guide ED 695, paragraphe 4.1.1 ; code du travail, articles R4222-6 et R4222-11" },
    { t: "<b>La perte de charge</b> est la pression perdue en frottement dans les gaines, les coudes et les filtres. Le ventilateur doit la vaincre : si elle augmente, le débit baisse.", s: "expert", ref: "INRS, guide ED 695, paragraphes 4.1.3 et 5.2" }
  ],

  chiffres: [
    { valeur: "25 m³/h", libelle: "Air neuf minimal par occupant dans un bureau, en ventilation mécanique. 30 en réunion, vente, restauration ; 45 ou 60 en atelier.", s: "texte", ref: "code du travail, article R4222-6" },
    { valeur: "18 m³/h", libelle: "Air neuf par occupant d'un bureau selon le RSD : 5 l/s. Le texte compte en litres par seconde : 1 l/s = 3,6 m³/h.", s: "texte", ref: "règlement sanitaire départemental type, article 64 (lu dans un RSD départemental)" },
    { valeur: "1 000 ppm", libelle: "CO2 à ne pas dépasser dans un local occupé : 1 pour mille, avec une tolérance à 1,3 pour mille.", s: "texte", ref: "règlement sanitaire départemental type, article 64" },
    { valeur: "× 4", libelle: "Vitesse doublée, perte de charge quadruplée : les frottements suivent le carré de la vitesse.", s: "expert", ref: "INRS, guide ED 695, paragraphe 4.1.3" }
  ],

  decision: {
    titre: "Quel débit d'air neuf ?",
    depart: "q1",
    noeuds: {
      q1: { q: "Dans le local, y a-t-il d'autres pollutions que la présence humaine : produits, poussières, fumées, ou est-ce un sanitaire ?", choix: [{ r: "Oui", vers: "v_spec" }, { r: "Non", vers: "q2" }] },
      v_spec: { verdict: "Local à pollution spécifique", texte: "D'abord supprimer l'émission, sinon la capter au plus près, et finir par la ventilation générale. Le débit dépend de la nature et de la quantité des polluants et de la chaleur à évacuer, sans descendre sous les valeurs de l'article R4222-6.", s: "texte", ref: "code du travail, articles R4222-3, R4222-11 et R4222-12" },
      q2: { q: "Est-ce un logement ?", choix: [{ r: "Oui", vers: "v_log" }, { r: "Non", vers: "q3" }] },
      v_log: { verdict: "Débits extraits par logement", texte: "Air entrant par les pièces principales, sortant par les pièces de service. En cuisine, 75 à 135 m³/h selon le nombre de pièces ; salle de bains, 15 ou 30 m³/h. Débit total réductible à 35 à 135 m³/h de 1 à 7 pièces.", s: "texte", ref: "arrêté du 24 mars 1982, articles 1 à 4" },
      q3: { q: "Quel usage ?", choix: [{ r: "Bureau, sans travail physique", vers: "v25" }, { r: "Réunion, vente, restauration", vers: "v30" }, { r: "Atelier, travail physique léger", vers: "v45" }, { r: "Autre atelier", vers: "v60" }, { r: "Classe, chambre (public)", vers: "v_rsd" }] },
      v25: { verdict: "25 m³/h par occupant", texte: "Le RSD demande 18 m³/h (5 l/s) pour le même local : le débit du code du travail est plus exigeant. Avec des fenêtres seules et sans ventilation mécanique, il faut 15 m³ de volume par occupant.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6 ; RSD type, article 64" },
      v30: { verdict: "30 m³/h par occupant", texte: "Le RSD demande 18 m³/h (5 l/s) en réunion, 22 m³/h (6 l/s) en vente et en restauration. Avec des fenêtres seules, il faut 24 m³ de volume par occupant.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6 ; RSD type, article 64" },
      v45: { verdict: "45 m³/h par occupant", texte: "Valeur pour la ventilation mécanique. Avec des fenêtres seules, il faut 15 m³ de volume par occupant. Si le travail émet des polluants, revenir à la première question.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6" },
      v60: { verdict: "60 m³/h par occupant", texte: "Valeur pour la ventilation mécanique. Avec des fenêtres seules, il faut 24 m³ de volume par occupant. Si le travail émet des polluants, revenir à la première question.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6" },
      v_rsd: { verdict: "Règlement sanitaire départemental", texte: "Classes : 4 à 5 l/s par occupant, soit 15 à 18 m³/h. Chambres et dortoirs : 5 l/s, soit 18 m³/h. Vérifier le RSD du département, et le code du travail pour le personnel qui y travaille.", s: "texte", ref: "règlement sanitaire départemental type, article 64" }
    }
  },

  verifications: [
    { titre: "Au VISA", icone: "plan", points: [
      { t: "Débit d'air neuf calculé local par local : nombre d'occupants × valeur du texte applicable.", s: "texte", ref: "code du travail, article R4222-6 ; RSD type, article 64" },
      { t: "Locaux à pollution spécifique repérés, avec captage à la source avant la ventilation générale.", s: "texte", ref: "code du travail, articles R4222-3 et R4222-12" },
      { t: "Toute extraction a son entrée d'air correspondante, et la compensation est organisée, pas laissée aux fuites.", s: "expert", ref: "INRS, guide ED 695, paragraphe 7.1" },
      { t: "Rejets d'air éloignés des prises d'air neuf.", s: "expert", ref: "INRS, guide ED 695, principe IX et chapitre 6" },
      { t: "Note de calcul avec vitesses et pertes de charge, et ventilateur choisi pour le réseau réel.", s: "expert", ref: "INRS, guide ED 695, paragraphes 4.1.3 et 5.2" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Gaines souples limitées : à débit égal, 10 Pa/m contre 1,6 Pa/m en acier galvanisé (Ø 400, 1 m³/s).", s: "expert", ref: "INRS, guide ED 695, tableau VIII" },
      { t: "Pas de coude juste avant l'aspiration du ventilateur.", s: "expert", ref: "INRS, guide ED 695, paragraphe 5.3" },
      { t: "Manchettes souples et plots antivibratiles au ventilateur.", s: "expert", ref: "INRS, guide ED 695, lexique et paragraphe 5.3" },
      { t: "Filtres et trappes de visite accessibles pour l'entretien.", s: "verifier" }
    ] },
    { titre: "À la réception", icone: "cle", points: [
      { t: "Débits mesurés et comparés à l'étude : ce sont les valeurs de référence pour la suite.", s: "verifier" },
      { t: "Notice d'instructions remise par le maître d'ouvrage, consigne d'utilisation rédigée par l'employeur.", s: "texte", ref: "code du travail, articles R4212-7 et R4222-21" },
      { t: "Contrôle périodique au moins une fois par an, résultats au dossier de maintenance.", s: "texte", ref: "arrêté du 8 octobre 1987, d'après INRS, focus juridique de juillet 2025" }
    ] }
  ],

  pieges: [
    { t: "Extraire sans compenser : le ventilateur tourne, le local se met en dépression, les portes deviennent dures à ouvrir et le débit chute.", s: "expert", ref: "INRS, guide ED 695, paragraphe 7.1" },
    { t: "Réduire le diamètre pour gagner de la place. Pour 1 m³/s : Ø 400, 8 m/s et 1,8 Pa/m ; Ø 200, 32 m/s et 55 Pa/m. Trente fois plus de perte de charge.", s: "expert", ref: "INRS, guide ED 695, tableau VII" },
    { t: "Compter l'air recyclé comme de l'air neuf : il peut s'y ajouter, mais ne réduit jamais le débit minimal d'air neuf.", s: "texte", ref: "règlement sanitaire départemental type, article 64" },
    { t: "Recycler l'air d'un local à pollution spécifique sans épuration efficace, ou vers un local de pollution différente.", s: "texte", ref: "code du travail, article R4222-14" },
    { t: "Oublier le filtre : il s'encrasse, le débit baisse lentement, et rien ne le signale sans mesure.", s: "verifier" },
    { t: "Lire 5 comme 5 m³/h dans le RSD : son tableau est en litres par seconde. 5 l/s valent 18 m³/h.", s: "texte", ref: "règlement sanitaire départemental type, article 64" }
  ],

  confondre: [
    { titre: "Air neuf et air recyclé", t: "L'air neuf est pris dehors, loin des pollutions. L'air recyclé est repris dans le local ou le groupe de locaux, puis réintroduit.", s: "texte", ref: "code du travail, article R4222-3" },
    { titre: "Débit et vitesse", t: "Le débit (m³/h) est une quantité d'air. La vitesse (m/s) est son allure. Le même débit va vite dans une petite gaine, lentement dans une grosse.", s: "expert", ref: "INRS, guide ED 695, paragraphe 4.1.1" },
    { titre: "Pollution spécifique et non spécifique", t: "Non spécifique : due à la seule présence humaine. Spécifique : substances dangereuses ou gênantes, et sanitaires.", s: "texte", ref: "code du travail, article R4222-3" },
    { titre: "Ventilation locale et générale", t: "La locale capte le polluant à la source. La générale le dilue dans le local : elle ne suffit pas comme moyen principal contre des produits toxiques.", s: "expert", ref: "INRS, guide ED 695, chapitre 3" },
    { titre: "Pression statique et dynamique", t: "La statique pousse sur les parois, en plus ou en moins. La dynamique vient de la vitesse de l'air. La totale est leur somme.", s: "expert", ref: "INRS, guide ED 695, paragraphe 4.1.1" }
  ],

  references: [
    { s: "texte", t: "Code du travail, articles R4222-1 à R4222-26 (aération et assainissement, obligations de l'employeur) et R4212-1 à R4212-7 (obligations du maître d'ouvrage)." },
    { s: "texte", t: "Arrêté du 8 octobre 1987 : contrôle périodique des installations d'aération et d'assainissement. Arrêté du 20 décembre 2021 : méthodes de contrôle." },
    { s: "texte", t: "Règlement sanitaire départemental type, articles 63 et 64 : chaque département a le sien. Valeurs lues dans un RSD départemental." },
    { s: "texte", t: "Arrêté du 24 mars 1982 modifié : aération des logements." },
    { s: "expert", t: "INRS, guide pratique de ventilation n° 0, ED 695, Principes généraux de ventilation : lu dans l'édition de 2015, une édition de septembre 2022 existe. Les neuf principes, l'écoulement dans les gaines, les ventilateurs, la compensation." },
    { s: "expert", t: "INRS, focus juridique sur le contrôle des installations de ventilation, juillet 2025." }
  ]
};
