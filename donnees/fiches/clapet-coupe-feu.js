/* Fiche : clapet coupe-feu.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "clapet-coupe-feu",
  titre: "Clapet coupe-feu",
  soustitre: "Il ferme la gaine de ventilation quand le feu arrive, pour que la paroi traversée garde son degré coupe-feu.",
  schema: "clapet",

  essentiel: [
    { t: "Un clapet coupe-feu se ferme dans la gaine, au droit de la paroi coupe-feu qu'elle traverse : le feu ne passe pas d'un local à l'autre par la ventilation.", s: "norme", ref: "NF EN 15650, norme produit des clapets coupe-feu" },
    { t: "<b>Autocommandé</b> : un fusible thermique, en général à 70 °C, libère un ressort qui ferme la lame. Aucun câble.", s: "fabricant", ref: "documentations des fabricants de clapets" },
    { t: "<b>Télécommandé</b> (un DAS) : la centrale incendie le ferme à distance, par émission ou par rupture de courant. Le fusible reste là en secours.", s: "fabricant", ref: "documentations des fabricants ; NF S 61-937 pour les DAS" },
    { t: "Le choix revient au coordinateur SSI : sans asservissement demandé, le fusible suffit.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" }
  ],

  chiffres: [
    { valeur: "70 °C", libelle: "Température de fusion courante du fusible : au-delà, le clapet se ferme seul.", s: "fabricant", ref: "documentations des fabricants" },
    { valeur: "EI 60", libelle: "60 minutes d'étanchéité aux flammes (E) et d'isolation thermique (I). Même lecture pour EI 30, 90, 120.", s: "norme", ref: "NF EN 13501-3, classement des clapets" },
    { valeur: "1 zone", libelle: "Une seule zone de compartimentage : pas d'asservissement au SSI, le fusible suffit.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" },
    { valeur: "0 câble", libelle: "Pour un autocommandé : rien à raccorder par le lot électricité.", s: "fabricant", ref: "documentations des fabricants" }
  ],

  decision: {
    titre: "Quel clapet poser ?",
    depart: "q1",
    noeuds: {
      q1: { q: "La gaine traverse-t-elle une paroi ou un plancher qui a un degré coupe-feu ?", choix: [{ r: "Oui", vers: "q2" }, { r: "Non", vers: "v_non" }] },
      v_non: { verdict: "Pas de clapet coupe-feu à cet endroit", texte: "Le clapet ne sert qu'à rétablir le degré d'une paroi traversée. Vérifier tout de même le classement réel de la paroi sur les plans de l'architecte.", s: "verifier" },
      q2: { q: "Le degré est-il déjà assuré autrement, par un conduit ou une gaine technique eux-mêmes coupe-feu ?", choix: [{ r: "Oui", vers: "v_gaine" }, { r: "Non", vers: "q3" }] },
      v_gaine: { verdict: "Pas de clapet, si le procès-verbal le couvre", texte: "Un conduit ou une gaine coupe-feu peut tenir lieu de clapet quand son PV couvre le cas. À faire valider par le contrôleur technique.", s: "verifier" },
      q3: { q: "Le coordinateur SSI demande-t-il un asservissement ? C'est le cas courant en ERP de type J, U, O ou H, ou quand il y a plusieurs zones de compartimentage.", choix: [{ r: "Non", vers: "v_fusible" }, { r: "Oui", vers: "q4" }] },
      v_fusible: { verdict: "Clapet autocommandé à fusible", texte: "Le fusible ferme le clapet tout seul quand l'air dépasse sa température. Rien à raccorder au SSI.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" },
      q4: { q: "Que sait commander la centrale incendie (le CMSI) ?", choix: [{ r: "Une impulsion de courant", vers: "v_emission" }, { r: "La coupure d'un courant permanent", vers: "v_rupture" }, { r: "Je ne sais pas", vers: "v_cssi" }] },
      v_emission: { verdict: "Clapet télécommandé à émission", texte: "Au repos, aucun courant. La centrale envoie une impulsion pour le fermer. Un câble coupé ne le ferme pas : la ligne doit être surveillée.", s: "verifier" },
      v_rupture: { verdict: "Clapet télécommandé à rupture", texte: "Un courant permanent le tient ouvert. La centrale le coupe pour le fermer, et un câble coupé ou une panne le ferment aussi : c'est la sécurité positive.", s: "verifier" },
      v_cssi: { verdict: "Poser la question au coordinateur SSI", texte: "Le type de commande se cale sur la centrale existante ou prévue. C'est lui qui le fixe, avant le VISA des fiches techniques.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" }
    }
  },

  verifications: [
    { titre: "Au VISA", icone: "plan", points: [
      { t: "Classement EI du clapet au moins égal à celui de la paroi traversée.", s: "verifier" },
      { t: "Déclaration des performances et PV qui couvrent le type de paroi (béton, cloison plâtre, plancher) et le mode de pose.", s: "norme", ref: "NF EN 15650 et NF EN 1366-2" },
      { t: "Mode de commande conforme à l'avis du coordinateur SSI : fusible ou télécommandé.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" },
      { t: "Chaque clapet repéré et numéroté sur les plans, avec sa trappe de visite.", s: "verifier" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Clapet posé dans l'épaisseur de la paroi, ou déporté seulement si le PV le permet.", s: "fabricant", ref: "notice de pose du fabricant" },
      { t: "Calfeutrement avec le produit et l'épaisseur prévus par le PV.", s: "fabricant", ref: "notice de pose du fabricant" },
      { t: "Gaine supportée de part et d'autre : aucun effort sur le clapet.", s: "fabricant", ref: "notice de pose du fabricant" },
      { t: "Mécanisme et fusible accessibles depuis la trappe.", s: "fabricant", ref: "notice de pose du fabricant" }
    ] },
    { titre: "À la réception", icone: "cle", points: [
      { t: "Essai de fermeture et de réarmement de chaque clapet.", s: "verifier" },
      { t: "Étiquette et numéro sur chaque clapet, liste dans le DOE avec les fiches et les PV.", s: "verifier" },
      { t: "Pour un télécommandé : retour de position vu sur la centrale.", s: "verifier" }
    ] }
  ],

  pieges: [
    { t: "Le CCTP prévoit des clapets asservis au SSI alors que le coordinateur SSI ne le demande pas : télécommande et câblage payés pour rien, sur deux lots.", s: "cas" },
    { t: "Un plafond coupe-feu qui protège la charpente est décrit \"sans aucune traversée\", alors que les gaines doivent le traverser : à trancher avant la pose.", s: "cas" },
    { t: "Clapet enfermé dans un faux plafond sans trappe : impossible à réarmer et à vérifier.", s: "verifier" },
    { t: "Un clapet à émission ne se ferme pas si son câble est coupé : sans surveillance de la ligne, la panne passe inaperçue.", s: "verifier" }
  ],

  confondre: [
    { titre: "Clapet de désenfumage", t: "Il s'ouvre en cas d'incendie pour évacuer les fumées et il est toujours commandé. Le clapet coupe-feu, lui, se ferme pour isoler.", s: "verifier" },
    { titre: "Clapet anti-retour", t: "Il empêche l'air de repartir à l'envers dans la gaine. Il n'a aucune résistance au feu.", s: "verifier" },
    { titre: "Porte coupe-feu à ventouse", t: "Un autre DAS, souvent à rupture de courant : la ventouse tient la porte ouverte, la coupure la libère.", s: "verifier" }
  ],

  vu_sur: [
    { date: "Octobre 2026", contexte: "Réhabilitation d'un ERP d'enseignement (type R, 3e catégorie)", fait: "Les CCTP prévoyaient des clapets commandés par la centrale incendie et raccordés au SSI par le lot électricité. Le coordinateur SSI les a passés en autocommandés à fusible, le bâtiment ne comptant qu'une zone de compartimentage." }
  ],

  references: [
    { s: "texte", t: "Règlement de sécurité contre les risques d'incendie et de panique dans les ERP, arrêté du 25 juin 1980 modifié : dispositions générales (CO, CH, MS) et dispositions propres à chaque type." },
    { s: "norme", t: "NF EN 15650 : clapets coupe-feu pour réseaux aérauliques (norme produit, marquage CE)." },
    { s: "norme", t: "NF EN 1366-2 : essais de résistance au feu des clapets ; NF EN 13501-3 : leur classement (EI, ve, ho, i↔o, S)." },
    { s: "norme", t: "NF S 61-937 : dispositifs actionnés de sécurité (DAS) ; NF S 61-932 : règles d'installation du SSI." },
    { s: "fabricant", t: "Notice de pose et déclaration des performances du clapet retenu : elles fixent les parois admises, le calfeutrement et les distances." }
  ]
};
