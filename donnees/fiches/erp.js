/* Fiche : ERP, établissement recevant du public (type et catégorie).
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "erp",
  titre: "ERP : type et catégorie",
  soustitre: "Un bâtiment qui reçoit du public se classe par une lettre, son activité, et un chiffre, son effectif : ce couple dit quelles règles de sécurité incendie s'appliquent.",
  schema: "erp",

  essentiel: [
    { t: "Est un <b>ERP</b> tout bâtiment ou local où des personnes sont admises en plus du personnel, librement, en payant ou sur invitation.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants (ex-R123-1 et suivants)" },
    { t: "Le <b>type</b>, une lettre, dit l'activité : W bureaux, M commerces, N restaurants, R enseignement, U soins, O hôtels...", s: "texte", ref: "arrêté du 25 juin 1980 modifié, article GN 1" },
    { t: "La <b>catégorie</b>, de 1 à 5, dit l'effectif : la 1re est la plus grande et la plus exigeante, la 5e la plus petite.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants" },
    { t: "On lit d'abord le public seul : sous le seuil propre au type, c'est la 5e catégorie. Au-dessus, public et personnel s'additionnent pour placer l'ERP de la 4e à la 1re.", s: "verifier", ref: "règle de comptage du personnel à confirmer dans l'article GN 1" }
  ],

  chiffres: [
    { valeur: "1 500", libelle: "Au-delà de 1 500 personnes, 1re catégorie.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants" },
    { valeur: "300", libelle: "Jusqu'à 300 personnes, 4e catégorie, sauf si le public reste sous le seuil du type : alors 5e.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants" },
    { valeur: "200", libelle: "Seuil de la 5e catégorie le plus courant (bureaux, commerces, restaurants, enseignement). Plus bas pour les hôtels et les soins.", s: "verifier", ref: "à lire dans l'article 1 de chaque type" },
    { valeur: "2 groupes", libelle: "1er groupe : catégories 1 à 4, règlement de 1980. 2e groupe : la 5e, avec ses règles allégées (articles PE).", s: "texte", ref: "arrêté du 25 juin 1980 modifié ; arrêté du 22 juin 1990 (articles PE)" }
  ],

  decision: {
    titre: "Quelle catégorie ?",
    depart: "q1",
    noeuds: {
      q1: { q: "Des personnes autres que le personnel y entrent-elles : clients, usagers, visiteurs, même sur invitation ?", choix: [{ r: "Oui", vers: "q2" }, { r: "Non", vers: "v_non" }] },
      v_non: { verdict: "Pas un ERP", texte: "Un bâtiment où n'entre que le personnel est un lieu de travail, soumis au code du travail. Un logement relève des règles de l'habitation.", s: "verifier" },
      q2: { q: "Quel est son type ? Il donne le seuil de la 5e catégorie.", choix: [{ r: "Bureaux, commerce, restaurant, enseignement", vers: "q3_200" }, { r: "Hôtel, établissement de soins", vers: "q3_100" }, { r: "Un autre type", vers: "v_type" }] },
      v_type: { verdict: "Lire l'article 1 du type", texte: "Chaque type a son propre seuil de 5e catégorie, souvent assorti d'un seuil plus bas en sous-sol et en étage. Le lire avant de compter.", s: "verifier" },
      q3_200: { q: "Le public seul (sans le personnel) atteint-il 200 personnes ? Et 100 en sous-sol, 100 en étage, selon le type ?", choix: [{ r: "Non", vers: "v5" }, { r: "Oui", vers: "q4" }] },
      q3_100: { q: "Le public seul atteint-il le seuil du type : 100 personnes en général, 20 lits pour des soins avec hébergement ?", choix: [{ r: "Non", vers: "v5" }, { r: "Oui", vers: "q4" }] },
      v5: { verdict: "5e catégorie (2e groupe)", texte: "Petit établissement : règles allégées des articles PE. Le personnel ne compte pas pour ce classement.", s: "verifier", ref: "arrêté du 22 juin 1990 ; seuils de l'article 1 de chaque type" },
      q4: { q: "Quel effectif total, public et personnel ensemble ?", choix: [{ r: "300 ou moins", vers: "v4" }, { r: "301 à 700", vers: "v3" }, { r: "701 à 1 500", vers: "v2" }, { r: "Plus de 1 500", vers: "v1" }] },
      v4: { verdict: "4e catégorie (1er groupe)", texte: "Règlement de 1980 : dispositions générales et dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants" },
      v3: { verdict: "3e catégorie (1er groupe)", texte: "Règlement de 1980 : dispositions générales et dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants" },
      v2: { verdict: "2e catégorie (1er groupe)", texte: "Règlement de 1980 : dispositions générales et dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants" },
      v1: { verdict: "1re catégorie (1er groupe)", texte: "La plus exigeante : règlement de 1980, avec les dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, articles R143-1 et suivants" }
    }
  },

  verifications: [
    { titre: "En conception et au VISA", icone: "plan", points: [
      { t: "Type et catégorie écrits dans la notice de sécurité, avec le calcul de l'effectif : places assises, densité au m² ou déclaration, selon le type.", s: "verifier" },
      { t: "Effectif compté niveau par niveau : le sous-sol et les étages ont souvent leur propre seuil.", s: "verifier" },
      { t: "Activités de types différents dans le même bâtiment : effectifs cumulés pour la catégorie, règles de chaque type pour chaque activité.", s: "verifier" },
      { t: "Dégagements dimensionnés sur l'effectif, en unités de passage (1 UP = 0,60 m ; 1 UP seule = 0,90 m ; 2 UP = 1,40 m).", s: "texte", ref: "arrêté du 25 juin 1980 modifié, article CO 36" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Aménagement conforme à l'effectif déclaré : une salle qui gagne des places peut changer de catégorie.", s: "verifier" },
      { t: "Compartimentage, isolement entre activités et désenfumage posés comme le prévoit le type.", s: "verifier" }
    ] },
    { titre: "À l'ouverture", icone: "cle", points: [
      { t: "Visite de la commission de sécurité avant ouverture au public pour les catégories 1 à 4, et pour une 5e avec locaux à sommeil.", s: "verifier" },
      { t: "Rapports de vérification des installations techniques et registre de sécurité remis à l'exploitant.", s: "verifier" },
      { t: "Autorisation d'ouverture délivrée par le maire avant d'accueillir le public.", s: "verifier" }
    ] }
  ],

  pieges: [
    { t: "Classer d'après le public seul un établissement qui dépasse le seuil : pour les catégories 1 à 4, le personnel s'ajoute, et 280 + 40 font passer de la 4e à la 3e.", s: "verifier" },
    { t: "Oublier le seuil du sous-sol ou de l'étage : un ERP sous 200 personnes au total peut sortir de la 5e à cause d'une salle en sous-sol.", s: "verifier" },
    { t: "Additionner ou séparer les activités au jugé : deux types dans un même bâtiment se cumulent pour la catégorie, sauf isolement conforme au règlement.", s: "verifier" },
    { t: "Écrire la catégorie sans le calcul de l'effectif : le contrôleur technique et la commission le demanderont.", s: "verifier" }
  ],

  confondre: [
    { titre: "IGH, immeuble de grande hauteur", t: "Classé par la hauteur, pas par l'effectif : dernier plancher à plus de 50 m en habitation, à plus de 28 m pour les autres usages. Il a son propre règlement.", s: "verifier" },
    { titre: "Famille d'habitation", t: "Les logements se classent en familles (1re à 4e) selon la hauteur et la disposition, pas en catégories d'ERP.", s: "texte", ref: "arrêté du 31 janvier 1986 modifié" },
    { titre: "Lieu de travail", t: "Si seul le personnel y entre, c'est le code du travail qui s'applique, pas le règlement ERP.", s: "verifier" }
  ],

  references: [
    { s: "texte", t: "Code de la construction et de l'habitation, partie réglementaire, articles R143-1 et suivants (ex-R123-1 et suivants) : définition des ERP, types, catégories, commission de sécurité." },
    { s: "texte", t: "Règlement de sécurité contre les risques d'incendie et de panique dans les ERP, arrêté du 25 juin 1980 modifié : généralités (GN), dispositions communes (CO...) et dispositions propres à chaque type." },
    { s: "texte", t: "Arrêté du 22 juin 1990 modifié : dispositions applicables aux ERP de 5e catégorie (articles PE)." },
    { s: "texte", t: "Arrêté du 20 avril 2017 : accessibilité des ERP neufs aux personnes handicapées, un autre volet de la réglementation des ERP." }
  ]
};
