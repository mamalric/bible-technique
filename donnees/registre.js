/* Registre de la bible : domaines, types de source et liste des fiches.
   Ajouter une fiche = créer donnees/fiches/<id>.js puis ajouter sa ligne dans "fiches".
   Couleurs de domaine : couleurs de lot B27, reprises du catalogue du portail b27-hub. */

window.BIBLE = {
  domaines: [
    { cle: "ventilation",  nom: "Ventilation",                 couleur: "#2f7f92", icone: "vent" },
    { cle: "chauffage",    nom: "Chauffage",                   couleur: "#3e8fb8", icone: "flamme" },
    { cle: "climatisation",nom: "Climatisation et froid",      couleur: "#4a6fb0", icone: "flocon" },
    { cle: "plomberie",    nom: "Plomberie et ECS",            couleur: "#1f7a6e", icone: "gouttes" },
    { cle: "securite",     nom: "Sécurité incendie",           couleur: "#c62828", icone: "bouclier" },
    { cle: "thermique",    nom: "Thermique et réglementation", couleur: "#c4562f", icone: "thermometre" },
    { cle: "electricite",  nom: "Électricité",                 couleur: "#b17e00", icone: "eclair" },
    { cle: "methode",      nom: "Missions et méthode",         couleur: "#6b5ba6", icone: "livre" }
  ],

  /* Chaque affirmation d'une fiche porte un de ces badges. */
  sources: {
    texte:     { nom: "Texte",       aide: "Texte réglementaire (code, arrêté, règlement) : la référence est citée." },
    norme:     { nom: "Norme",       aide: "Norme NF, EN ou DTU, citée par son numéro et reformulée, jamais recopiée." },
    fabricant: { nom: "Fabricant",   aide: "Documentation de fabricant, déclaration des performances ou procès-verbal d'essai." },
    expert:    { nom: "Expert",      aide: "Avis d'un spécialiste (coordinateur SSI, contrôleur technique...) recueilli sur une affaire, ou guide d'un organisme de référence comme l'INRS." },
    cas:       { nom: "Vu sur affaire", aide: "Constaté sur une affaire réelle, présentée de façon anonyme." },
    verifier:  { nom: "À vérifier",  aide: "Explication de principe, pas encore rattachée à un texte : à confirmer avant de s'en servir." }
  },

  fiches: [
    {
      id: "clapet-coupe-feu",
      titre: "Clapet coupe-feu",
      resume: "Ce qui ferme la gaine de ventilation quand elle traverse une paroi coupe-feu. Fusible ou télécommandé, émission ou rupture : comment choisir et quoi vérifier.",
      domaines: ["ventilation", "securite"],
      motscles: ["clapet", "CF", "coupe-feu", "fusible", "DAS", "émission", "rupture", "CMSI", "SSI", "compartimentage", "EI", "autocommandé", "télécommandé"],
      vignette: "clapet",
      maj: "2026-10-27"
    },
    {
      id: "erp",
      titre: "ERP : type et catégorie",
      resume: "Établissement recevant du public : la lettre dit l'activité, le chiffre dit l'effectif. Comment compter et classer de la 5e à la 1re catégorie.",
      domaines: ["securite", "methode"],
      motscles: ["ERP", "établissement recevant du public", "catégorie", "type", "effectif", "5e catégorie", "1er groupe", "2e groupe", "PE", "GN", "commission de sécurité", "notice de sécurité", "unité de passage", "IGH"],
      vignette: "erp",
      maj: "2026-10-27"
    },
    {
      id: "locaux-techniques",
      titre: "Locaux techniques et sous-station",
      resume: "Chaufferie, sous-station, local électrique, groupe froid : ce qui les distingue, ce que la réglementation impose, et la sécurité incendie d'un local technique, surtout en sous-sol.",
      domaines: ["chauffage", "securite"],
      motscles: ["local technique", "sous-station", "chaufferie", "réseau de chaleur", "échangeur", "primaire", "secondaire", "eau surchauffée", "sous-sol", "local à risques importants", "local à risques moyens", "CO 28", "arrêt d'urgence", "ventilation haute et basse", "puisard", "TGBT", "salle des machines", "NF EN 378", "70 kW", "ICPE 2910"],
      vignette: "local",
      maj: "2026-10-29"
    },
    {
      id: "bases-ventilation",
      titre: "Les bases de la ventilation",
      resume: "Un cours en 17 étapes pour débutant, chaque mot expliqué : pourquoi on change l'air, ce que veulent dire débit, pression et perte de charge, et comment tout ça se calcule.",
      domaines: ["ventilation", "methode"],
      motscles: ["ventilation", "VMC", "air neuf", "air vicié", "air recyclé", "débit", "vitesse", "section", "pression", "dépression", "surpression", "perte de charge", "simple flux", "double flux", "ventilateur", "point de fonctionnement", "compensation", "CO2", "R4222-6", "RSD", "article 64", "pollution spécifique", "bases", "débutant", "arrêté de 1982", "cours", "filtre", "batterie", "gaine", "bouche", "registre", "échangeur", "CTA", "hélicoïde", "centrifuge", "pascal", "ppm", "taux de renouvellement", "balayage", "captage", "dilution", "détalonnage", "dossier d'installation"],
      vignette: "ventilation",
      maj: "2026-11-03"
    },
    {
      id: "sorbonne",
      titre: "Sorbonne de laboratoire",
      resume: "Un cours en 8 étapes, puis la fiche : comment une sorbonne retient les vapeurs par l'air qui entre, ce qui la perturbe, comment la choisir, l'implanter et la contrôler.",
      domaines: ["ventilation", "securite"],
      motscles: ["sorbonne", "hotte", "laboratoire", "guillotine", "vitesse frontale", "confinement", "SF6", "plenum", "débit variable", "recirculation", "air de compensation", "NF EN 14175", "NF X 15-206", "NF X 15-211", "ED 795", "PSM", "boîte à gants", "ATEX", "CMR"],
      vignette: "sorbonne",
      maj: "2026-11-03"
    }
  ]
};
