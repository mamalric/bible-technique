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
    expert:    { nom: "Expert",      aide: "Avis d'un spécialiste (coordinateur SSI, contrôleur technique...) recueilli sur une affaire." },
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
    }
  ]
};
