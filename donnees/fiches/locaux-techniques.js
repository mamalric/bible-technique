/* Fiche : locaux techniques et sous-station.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   Textes lus en octobre 2026 : chapitre CH du règlement ERP dans sa version du 1er janvier 2026.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "locaux-techniques",
  titre: "Locaux techniques et sous-station",
  soustitre: "Chaufferie, sous-station, local électrique, local froid : chacun a sa définition, ses obligations et son isolement au feu. En sous-sol, l'eau, l'air et l'accès demandent encore plus de soin.",
  schema: "local-technique",

  essentiel: [
    { t: "Un <b>local technique</b> est fermé, réservé aux installations (chaleur, électricité, froid, eau) et au seul personnel d'exploitation. Le public n'y entre jamais.", s: "verifier" },
    { t: "Au-delà de 70 kW de puissance utile, la production de chaleur se loge dans une <b>chaufferie</b>, où l'on brûle un combustible, ou dans une <b>sous-station</b>, où un échangeur reçoit la chaleur d'un réseau primaire.", s: "texte", ref: "arrêté du 23 juin 1978, article 1 ; arrêté du 25 juin 1980, article CH 11" },
    { t: "En ERP, une chaufferie de plus de 70 kW est un <b>local à risques importants</b> : plancher haut et parois CF 2 h, communication CF 1 h avec ferme-porte, jamais directe avec les zones ouvertes au public.", s: "texte", ref: "arrêté du 25 juin 1980, articles CH 5 et CO 28" },
    { t: "Aucun texte ne fixe de degré coupe-feu à une <b>sous-station</b>. Au-delà de 110 °C ou en vapeur haute pression : accès direct par l'extérieur, coupures depuis l'extérieur, et un sas ventilé pour toute communication avec le public.", s: "texte", ref: "arrêté du 23 juin 1978, articles 22 et 29 ; arrêté du 25 juin 1980, article CH 11" }
  ],

  chiffres: [
    { valeur: "70 kW", libelle: "Puissance utile totale (environ 85 kW installés) au-delà de laquelle il faut une chaufferie ou une sous-station.", s: "texte", ref: "arrêté du 23 juin 1978, article 1" },
    { valeur: "110 °C", libelle: "Au-delà, le primaire est en eau surchauffée haute température : règles plus sévères, et une fuite se vaporise.", s: "texte", ref: "arrêté du 23 juin 1978, article 2 ; directive 2014/68/UE, article 4" },
    { valeur: "CF 2 h", libelle: "Parois et planchers d'une chaufferie (matériaux M0), et d'un local à risques importants en ERP. Soit EI 120, ou REI 120 pour un élément porteur.", s: "texte", ref: "arrêté du 23 juin 1978, article 4 ; arrêté du 25 juin 1980, article CO 28 ; arrêté du 22 mars 2026, annexe 2" },
    { valeur: "1 MW", libelle: "Combustion : au-delà, installation classée, en déclaration avec contrôle jusqu'à 20 MW (gaz naturel, GPL, fioul domestique, biomasse).", s: "texte", ref: "nomenclature des ICPE, rubrique 2910-A" }
  ],

  decision: {
    titre: "Quel local, quelles règles ?",
    depart: "q1",
    noeuds: {
      q1: { q: "Y a-t-il une combustion dans le local : chaudière gaz, fioul, bois ou granulés ?", choix: [{ r: "Oui", vers: "q2" }, { r: "Non", vers: "q4" }] },
      q2: { q: "Quelle est la puissance utile totale des générateurs ?", choix: [{ r: "70 kW ou moins", vers: "v_petit" }, { r: "Plus de 70 kW", vers: "q3" }] },
      v_petit: { verdict: "Pas une chaufferie au sens de l'arrêté de 1978", texte: "Les règles du combustible (gaz notamment) et du type de bâtiment s'appliquent. En ERP de 5e catégorie, de 30 à 70 kW : local non ouvert au public, plancher haut et parois CF 1 h.", s: "texte", ref: "arrêté du 22 juin 1990, article PE 21" },
      q3: { q: "Combien au total ?", choix: [{ r: "De 70 kW à 1 MW", vers: "v_chauff" }, { r: "De 1 à 2 MW", vers: "v_icpe" }, { r: "Plus de 2 MW", vers: "v_2000" }] },
      v_chauff: { verdict: "Chaufferie", texte: "Parois et planchers M0 et CF 2 h, portes ouvrant vers l'extérieur du local, ventilation basse et haute, coupures électriques et du combustible hors du local. En ERP, local à risques importants, et article GZ 9 au gaz.", s: "texte", ref: "arrêté du 23 juin 1978, articles 4, 5, 11, 12 et 14 ; arrêté du 25 juin 1980, article CH 5" },
      v_icpe: { verdict: "Chaufferie, et installation classée", texte: "Les mêmes règles, plus la rubrique 2910-A des installations classées : déclaration avec contrôle de 1 à 20 MW pour le gaz naturel, le GPL, le fioul domestique et la biomasse.", s: "texte", ref: "nomenclature des ICPE, rubrique 2910-A" },
      v_2000: { verdict: "Chaufferie hors des bâtiments occupés", texte: "Au-delà de 2 000 kW, la chaufferie n'est plus dans un bâtiment occupé ; une terrasse est admise jusqu'à 5 000 kW, sous conditions. Installation classée en plus.", s: "texte", ref: "arrêté du 23 juin 1978, article 3 ; nomenclature des ICPE, rubrique 2910-A" },
      q4: { q: "La chaleur arrive-t-elle d'un réseau, urbain ou d'une chaufferie centrale, par un échangeur ou par mélange ?", choix: [{ r: "Oui", vers: "q5" }, { r: "Non", vers: "q6" }] },
      q5: { q: "À quelle température est le primaire ?", choix: [{ r: "Eau chaude, 110 °C au plus", vers: "v_ss" }, { r: "Plus de 110 °C, ou vapeur", vers: "v_ss_hp" }] },
      v_ss: { verdict: "Sous-station en eau chaude", texte: "Au-delà de 70 kW : ventilation basse et haute (30 °C au plus dans le local tant qu'il fait moins de 15 °C dehors), rétention de 0,15 m ou 5 m³. Pas de degré coupe-feu imposé : le fixer avec le type d'ERP, la notice de sécurité et le réseau.", s: "texte", ref: "arrêté du 23 juin 1978, articles 27 et 28 ; arrêté du 25 juin 1980, article CH 11" },
      v_ss_hp: { verdict: "Sous-station haute température ou vapeur", texte: "En plus : accès direct par l'extérieur (deux au-delà de 2 000 kW), coupure du primaire et de l'électricité depuis l'extérieur. En ERP, aucune communication directe avec le public, sauf par un sas à portes pleines ventilé en haut vers l'extérieur (4 dm² au moins).", s: "texte", ref: "arrêté du 23 juin 1978, articles 22 et 29 ; arrêté du 25 juin 1980, article CH 11" },
      q6: { q: "Qu'abrite le local ?", choix: [{ r: "Groupe froid ou PAC", vers: "v_froid" }, { r: "Tableaux électriques", vers: "v_elec" }, { r: "Poste HT ou groupe électrogène", vers: "v_poste" }, { r: "Centrale de traitement d'air", vers: "v_cta" }] },
      v_froid: { verdict: "Salle des machines frigorifiques", texte: "En ERP, local à risques courants, avec deux orifices vers l'extérieur à des hauteurs différentes. Si une fuite peut atteindre la limite d'inflammabilité : ventilation mécanique et isolement en risques moyens (CF 1 h).", s: "texte", ref: "arrêté du 25 juin 1980, articles CH 35 et CO 28" },
      v_elec: { verdict: "Local de service électrique", texte: "En ERP, isolement selon les matériels : a) CF 2 h, franchissements CF 1 h ; b) CF 1 h, portes CF 1/2 h ; c) local ordinaire.", s: "texte", ref: "arrêté du 25 juin 1980, article EL 5" },
      v_poste: { verdict: "Local de service électrique, cas a)", texte: "Poste de livraison ou de transformation HT, matériel à diélectrique inflammable ou groupe électrogène : CF 2 h, franchissements CF 1 h, pas de communication directe avec le public, ventilation vers l'extérieur. Le poste suit la NF C 13-100.", s: "texte", ref: "arrêté du 25 juin 1980, articles EL 5, EL 6 et EL 7" },
      v_cta: { verdict: "Local de traitement d'air", texte: "En ERP, un local réservé à une centrale est un local à risques courants. Une centrale ne va pas dans un local à risques particuliers, sauf si elle ne dessert que lui.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 36" }
    }
  },

  verifications: [
    { titre: "Au VISA", icone: "plan", points: [
      { t: "Chaque local technique nommé et classé dans la notice de sécurité (risques importants, moyens ou courants), avec ses parois et portes coupe-feu sur les plans.", s: "verifier" },
      { t: "Chaufferie : portes ouvrant vers l'extérieur du local, accès par une circulation non publique ou par un sas, coupures électriques et du combustible hors du local.", s: "texte", ref: "arrêté du 23 juin 1978, articles 5 et 14 ; arrêté du 25 juin 1980, article CH 5" },
      { t: "Sous-station : rétention (0,15 m ou 5 m³), ventilation basse et haute ; au-delà de 110 °C, accès direct par l'extérieur et coupures depuis l'extérieur.", s: "texte", ref: "arrêté du 23 juin 1978, articles 22, 27, 28 et 29" },
      { t: "Sous-station : prescriptions du réseau reprises au CCTP. Points récurrents : accès permanent de l'exploitant, hauteur sous plafond, ventilation de l'ordre de 7 à 8 dm² par MW (16 dm² au moins), attente électrique, puisard et robinet de puisage, aucune canalisation étrangère dans le local.", s: "verifier", ref: "points récurrents de cahiers de prescriptions de réseaux de chaleur publiés : chaque réseau a les siens" },
      { t: "Limite de prestation écrite : le réseau fournit en général le branchement, les vannes, l'échangeur, le compteur et l'armoire primaire ; l'abonné, le local, ses équipements et le secondaire à partir des brides de l'échangeur.", s: "verifier", ref: "points récurrents de cahiers de prescriptions de réseaux de chaleur publiés" },
      { t: "Sous-sol : siphon ou puisard avec pompe de relevage, et passage (porte ou trémie) pour remplacer le plus gros équipement.", s: "verifier" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Traversées des parois coupe-feu calfeutrées, clapets coupe-feu sur les gaines (voir la <a href=\"fiche.html?f=clapet-coupe-feu\">fiche clapet coupe-feu</a>).", s: "verifier" },
      { t: "Air extrait d'un local à risques importants : jamais recyclé.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 33" },
      { t: "Bloc-porte coupe-feu posé selon son PV, ferme-porte réglé, sens d'ouverture conforme.", s: "verifier" },
      { t: "Sol en pente vers le siphon ou le puisard, bouches de ventilation dégagées, éclairage posé.", s: "verifier" },
      { t: "Aucun stockage étranger dans le local : un local technique n'est pas une réserve.", s: "verifier" }
    ] },
    { titre: "À la réception", icone: "cle", points: [
      { t: "Essai des coupures extérieures : combustible, électricité, primaire.", s: "verifier" },
      { t: "Essai du ferme-porte : la porte se referme seule et complètement.", s: "verifier" },
      { t: "Local froid : essai du détecteur, de l'alarme et de la ventilation de secours.", s: "verifier" },
      { t: "PV des parois et des portes, consignes d'exploitation affichées, schémas et plans au DOE.", s: "verifier" }
    ] }
  ],

  pieges: [
    { t: "Lire une ancienne version des textes : le chapitre CH du règlement ERP a été réécrit (version du 1er janvier 2026), le chapitre GZ aussi, et l'arrêté du 22 mars 2026 remplace celui de 2004 sur la résistance au feu. Prendre la version applicable à la date du dossier.", s: "texte", ref: "arrêté du 1er septembre 2025 (CH) ; arrêté du 23 février 2025 (GZ) ; arrêté du 22 mars 2026" },
    { t: "Chercher dans les textes le degré coupe-feu d'une sous-station : il n'y en a pas. Le fixer avec le type d'ERP, la notice de sécurité et le réseau (souvent CF 2 h au-delà de 110 °C), et l'écrire.", s: "verifier", ref: "constat sur l'arrêté de 1978 (titre II) et l'article CH 11 ; exigence relevée dans des prescriptions de réseaux" },
    { t: "Traiter une sous-station comme une chaufferie, ou l'inverse : on impose un air de combustion inutile, ou on oublie l'isolement CF 2 h d'une vraie chaufferie.", s: "verifier" },
    { t: "Chaufferie au gaz en sous-sol d'un immeuble d'habitation : les emplacements de production d'énergie au gaz y sont interdits.", s: "texte", ref: "arrêté du 23 février 2018, article 8.2.2.2" },
    { t: "Sous-station en sous-sol sans puisard : une fuite du primaire noie le local, les pompes et les armoires.", s: "verifier" },
    { t: "Primaire en eau surchauffée sous-estimé : la fuite se vaporise, brûle et sature le local de vapeur.", s: "verifier" },
    { t: "Aucun passage prévu pour sortir l'échangeur ou la chaudière : le remplacement oblige à démolir.", s: "verifier" },
    { t: "Fluide frigorigène en sous-sol sans détection en point bas : la fuite s'accumule au sol sans alerte.", s: "verifier" }
  ],

  confondre: [
    { titre: "Chaufferie et sous-station", t: "La chaufferie produit la chaleur en brûlant un combustible. La sous-station la reçoit d'un réseau primaire et la transfère au secondaire, par échange ou par mélange.", s: "texte", ref: "arrêté du 25 juin 1980, articles CH 5 et CH 11" },
    { titre: "Risques importants, moyens, courants", t: "Importants : CF 2 h, communication CF 1 h. Moyens : CF 1 h, porte CF 1/2 h. Courants : pas d'isolement particulier. Toujours avec ferme-porte pour les deux premiers.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 28" },
    { titre: "Poste de livraison et local TGBT", t: "Le poste reçoit la haute tension du distributeur et la transforme. Le TGBT distribue ensuite la basse tension dans le bâtiment.", s: "verifier" },
    { titre: "Local technique et gaine technique", t: "La gaine est un volume vertical qui traverse les étages pour les réseaux. Elle a ses propres règles d'isolement et de trappes de visite.", s: "verifier" }
  ],

  references: [
    { s: "texte", t: "Arrêté du 23 juin 1978 relatif aux installations fixes destinées au chauffage et à l'alimentation en eau chaude sanitaire : titre I (chaufferies, articles 3 à 20) et titre II (sous-stations, articles 21 à 30), au-delà de 70 kW." },
    { s: "texte", t: "Règlement de sécurité ERP, arrêté du 25 juin 1980 modifié : CO 27 et CO 28 (locaux à risques), CH 5 (chaufferies), CH 11 (sous-stations), CH 33 à CH 36 (ventilation, salles des machines, traitement d'air), EL 5 à EL 7 (électricité), GZ (gaz). Chapitre CH en version du 1er janvier 2026." },
    { s: "texte", t: "Arrêté du 22 juin 1990 (ERP de 5e catégorie), article PE 21 ; arrêté du 23 février 2018 (gaz en habitation), article 8.2.2." },
    { s: "texte", t: "Nomenclature des ICPE : rubrique 2910 (combustion) et rubrique 1185 (gaz à effet de serre fluorés). Directive 2014/68/UE sur les équipements sous pression." },
    { s: "texte", t: "Arrêté du 22 mars 2026 relatif à la résistance au feu des produits et éléments de construction, qui remplace l'arrêté du 22 mars 2004." },
    { s: "norme", t: "NF EN 378 (systèmes frigorifiques et pompes à chaleur, sécurité) ; NF C 15-100 (installations basse tension) ; NF C 13-100 (postes de livraison HTA, édition 2015) ; NF P 52-211, DTU 65.3 (sous-stations), cité par les réseaux de chaleur." },
    { s: "verifier", t: "Règlement de service et cahier des prescriptions du réseau de chaleur concerné : ils fixent le local de la sous-station et la limite de prestation." }
  ]
};
