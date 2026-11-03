/* Fiche : locaux techniques et sous-station.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   Textes lus en octobre 2026 : chapitre CH du règlement ERP dans sa version du 1er janvier 2026.
   "comme" et "retenir" ne portent pas de badge : "comme" est une image sans chiffre ni règle, "retenir" redit une ligne badgée de l'étape.
   Cours : guides du Cerema pour le réseau de chaleur, les valeurs de cette fiche pour les textes.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "locaux-techniques",
  titre: "Locaux techniques et sous-station",
  soustitre: "Chaufferie, sous-station, local électrique, local froid : chacun a sa définition, ses obligations et son isolement au feu. En sous-sol, l'eau, l'air et l'accès demandent encore plus de soin.",
  schema: "local-technique",

  cours: {
    intro: "Aucun prérequis. On visite les locaux un par un, puis on voit les règles qui comptent : le feu, l'air, l'eau, le sous-sol. Onze étapes, et un exemple complet à la fin. Le clapet a <a href=\"fiche.html?f=clapet-coupe-feu\">sa fiche</a>, et l'ERP <a href=\"fiche.html?f=erp\">la sienne</a>.",
    parties: [
      { titre: "Les locaux", chapitres: [
        { id: "quoi", titre: "Un local technique, c'est quoi ?", dessin: "lt_quoi",
          lignes: [
            { t: "Un bâtiment a besoin de machines pour chauffer, rafraîchir, ventiler, alimenter en électricité et en eau. Un <b>local technique</b> est la pièce fermée qui leur est réservée, avec le seul personnel d'exploitation. Le public n'y entre jamais.", s: "verifier", ref: "définition de travail : aucun texte lu ne définit le local technique en général" },
            { t: "Il n'y a pas une règle unique : chaque famille de local a ses articles.", s: "texte", ref: "arrêté du 23 juin 1978 ; arrêté du 25 juin 1980, articles CH 5, CH 11, CH 35, CH 36, EL 5" }
          ],
          tuiles: [
            { ico: "chaudiere", titre: "Chaufferie", t: "On y brûle un combustible pour produire la chaleur.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 5" },
            { ico: "echange", titre: "Sous-station", t: "Elle reçoit la chaleur d'un réseau, sans rien brûler.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 11" },
            { ico: "eclair", titre: "Local électrique", t: "Poste, tableaux, groupe électrogène. Son isolement dépend des matériels.", s: "texte", ref: "arrêté du 25 juin 1980, article EL 5" },
            { ico: "froid", titre: "Salle des machines", t: "Groupe froid ou pompe à chaleur.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 35" },
            { ico: "cta", titre: "Local de traitement d'air", t: "Une centrale qui prépare et souffle l'air. Voir <a href=\"fiche.html?f=bases-ventilation#pieces\">les pièces du système</a>.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 36" }
          ],
          comme: "La salle des machines d'un navire : les passagers n'y vont jamais, et tout le bateau en dépend.",
          retenir: "Chaque famille de local a ses articles : on commence par nommer le local." },

        { id: "chaufferie", titre: "La chaufferie", dessin: "lt_chaufferie",
          lignes: [
            { t: "Une <b>chaufferie</b> produit la chaleur en brûlant un combustible : gaz, fioul, bois, granulés.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 5 ; arrêté du 23 juin 1978, titre I" },
            { t: "Le mot a un sens légal : au-delà de 70 kW de puissance utile totale, la production de chaleur se loge dans une chaufferie ou une sous-station. La <b>puissance utile</b> est celle que la chaudière donne vraiment à l'eau.", s: "texte", ref: "arrêté du 23 juin 1978, article 1 ; arrêté du 25 juin 1980, article CH 11" },
            { t: "Parois et planchers en matériaux qui ne brûlent pas (M0) et coupe-feu 2 heures, portes qui ouvrent vers l'extérieur du local, ventilation basse et haute, coupures de l'électricité et du combustible hors du local.", s: "texte", ref: "arrêté du 23 juin 1978, articles 4, 5, 11, 12 et 14" },
            { t: "En ERP, c'est un <b>local à risques importants</b> : jamais de communication directe avec les zones ouvertes au public.", s: "texte", ref: "arrêté du 25 juin 1980, articles CH 5 et CO 28" },
            { t: "À 1 MW, soit 1 000 kW, s'ajoutent les règles des <b>installations classées</b>, les ICPE. Au-delà de 2 000 kW, plus de chaufferie dans un bâtiment occupé ; une terrasse reste admise jusqu'à 5 000 kW, sous conditions.", s: "texte", ref: "nomenclature des ICPE, rubrique 2910-A ; arrêté du 23 juin 1978, article 3" }
          ],
          calcul: [
            { q: "70 kW, ça représente quoi ?", op: "70 kW ÷ 7 kW par logement =", res: "10 logements", t: "Repère pour le chauffage et l'eau chaude d'un logement, pris dans un exemple du Cerema.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, exemple sur les frais de raccordement" }
          ],
          comme: "Un four qui reste allumé : il lui faut de l'air, de la distance avec le public, et un moyen de couper le gaz sans entrer.",
          retenir: "On y brûle un combustible : au-delà de 70 kW, parois coupe-feu 2 heures, ventilation, coupures hors du local." },

        { id: "reseau", titre: "Le réseau de chaleur", dessin: "lt_reseau",
          lignes: [
            { t: "Un <b>réseau de chaleur</b> produit la chaleur à un seul endroit et la distribue à plusieurs bâtiments, par des canalisations.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1" },
            { t: "Le <b>primaire</b> est le réseau lui-même : un aller transporte le fluide chaud, un retour le ramène après qu'il a donné sa chaleur. Ce fluide s'appelle le <b>fluide caloporteur</b> : de l'eau chaude ou de la vapeur.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1.2" },
            { t: "Le <b>secondaire</b> est le réseau de l'immeuble, en aval de l'échangeur. Il ne fait pas partie du réseau de chaleur au sens juridique.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1.4" }
          ],
          tuiles: [
            { ico: "t1", titre: "Basse température", t: "De 60 à 90 °C. Pour les quartiers neufs.", s: "expert", ref: "Cerema, bases techniques des réseaux de chaleur, 2014" },
            { ico: "t2", titre: "Eau chaude", t: "De 90 à 110 °C. Immeubles, bureaux, hôpitaux.", s: "expert", ref: "Cerema, bases techniques des réseaux de chaleur, 2014" },
            { ico: "t3", titre: "Eau surchauffée", t: "De 110 à 180 °C. Grands réseaux, besoins très chauds.", s: "expert", ref: "Cerema, bases techniques des réseaux de chaleur, 2014" },
            { ico: "t4", titre: "Vapeur", t: "De 200 à 300 °C. De plus en plus rare, sauf dans l'industrie.", s: "expert", ref: "Cerema, bases techniques des réseaux de chaleur, 2014" }
          ],
          comme: "La grande route et la rue de la maison : la chaleur arrive par l'une, et se distribue par l'autre.",
          retenir: "Primaire : le réseau, jusqu'à la sous-station. Secondaire : l'immeuble, en aval de l'échangeur." },

        { id: "sous-station", titre: "La sous-station", dessin: "lt_echangeur",
          lignes: [
            { t: "Une <b>sous-station</b> fait passer la chaleur du primaire au secondaire. On la trouve en général en pied d'immeuble.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1.3" },
            { t: "Sa pièce maîtresse est l'<b>échangeur</b> : les deux eaux y échangent leur chaleur à travers une paroi, sans se mélanger. C'est une séparation physique.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1.3" },
            { t: "Il n'y a en général pas de combustible : c'est la grande différence avec une chaufferie.", s: "expert", ref: "Cerema, bases techniques des réseaux de chaleur, 2014" },
            { t: "L'arrêté de 1978 vise aussi le transfert par mélange, sans échangeur, au-delà de 70 kW.", s: "texte", ref: "arrêté du 23 juin 1978, titre II ; arrêté du 25 juin 1980, article CH 11" },
            { t: "On y trouve aussi un <b>compteur de chaleur</b>, qui sert à la facturation, un régulateur qui pilote les pompes selon la température dehors, et souvent une surveillance à distance.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1.3" },
            { t: "Taille : murale de 10 à 150 kW pour le chauffage, au sol de 50 à 6 000 kW. Au sol, il lui faut un vrai local.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1.3" },
            { t: "Selon les réseaux, elle appartient à l'exploitant ou au gestionnaire du bâtiment. La responsabilité de l'exploitant s'arrête avant ou après l'échangeur : cette limite s'écrit.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 2.1.3 ; Cerema, bases techniques des réseaux de chaleur, 2014" }
          ],
          comme: "Un bain-marie : l'eau chaude chauffe le plat à travers la paroi, sans jamais s'y mêler.",
          retenir: "Pas de flamme : un échangeur passe la chaleur du primaire au secondaire, sans mêler les deux eaux." },

        { id: "electrique", titre: "Le local électrique", dessin: "lt_elec",
          lignes: [
            { t: "Sur un gros bâtiment, l'électricité arrive en haute tension. Le <b>poste</b> la reçoit du distributeur et la transforme en basse tension.", s: "verifier", ref: "explication générale ; le poste suit la NF C 13-100" },
            { t: "Le <b>TGBT</b>, tableau général basse tension, distribue ensuite le courant dans tout le bâtiment.", s: "verifier", ref: "explication générale" }
          ],
          tuiles: [
            { ico: "a", titre: "Cas a)", t: "Poste de haute tension, matériel à liquide isolant inflammable ou groupe électrogène : coupe-feu 2 heures, franchissements coupe-feu 1 heure.", s: "texte", ref: "arrêté du 25 juin 1980, article EL 5" },
            { ico: "b", titre: "Cas b)", t: "Coupe-feu 1 heure, portes coupe-feu une demi-heure.", s: "texte", ref: "arrêté du 25 juin 1980, article EL 5" },
            { ico: "c", titre: "Cas c)", t: "Un local ordinaire.", s: "texte", ref: "arrêté du 25 juin 1980, article EL 5" }
          ],
          comme: "Un château d'eau et des robinets : une grosse arrivée, qu'on divise et redivise jusqu'à chaque pièce.",
          retenir: "L'isolement du local électrique dépend de ses matériels : du coupe-feu 2 heures au local ordinaire." },

        { id: "froid-air", titre: "Le froid et l'air", dessin: "lt_froid",
          lignes: [
            { t: "Un groupe froid ou une pompe à chaleur contient un <b>fluide frigorigène</b>, le liquide qui transporte le froid. Leur local s'appelle la <b>salle des machines</b>.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 35 ; NF EN 378 pour la sécurité de ces systèmes" },
            { t: "En ERP, c'est un local à risques courants, avec deux orifices vers l'extérieur à des hauteurs différentes.", s: "texte", ref: "arrêté du 25 juin 1980, articles CH 35 et CO 28" },
            { t: "Si une fuite peut atteindre la limite d'inflammabilité : ventilation mécanique, et isolement en risques moyens.", s: "texte", ref: "arrêté du 25 juin 1980, articles CH 35 et CO 28" },
            { t: "En sous-sol, une fuite peut s'accumuler au sol : la détection se place en point bas.", s: "verifier" },
            { t: "Un local réservé à une <b>centrale de traitement d'air</b>, ou CTA, est un local à risques courants. Une centrale ne va pas dans un local à risques particuliers, sauf si elle ne dessert que lui.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 36" }
          ],
          comme: "Une cave où l'eau monte par le bas : c'est au ras du sol qu'on s'en aperçoit d'abord.",
          retenir: "Salle des machines : deux orifices vers l'extérieur. Local de CTA : risques courants." }
      ] },

      { titre: "Les règles", chapitres: [
        { id: "risques", titre: "Risques courants, moyens, importants", dessin: "lt_risques",
          intro: "Le règlement ERP classe chaque local selon ce qu'il peut provoquer. Plus le risque est grand, plus le local est enfermé.",
          lignes: [
            { t: "<b>Risques importants</b> : plancher haut et parois coupe-feu 2 heures, communication coupe-feu 1 heure avec ferme-porte. Un <b>ferme-porte</b> referme la porte tout seul.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 28" },
            { t: "<b>Risques moyens</b> : coupe-feu 1 heure, porte coupe-feu une demi-heure avec ferme-porte.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 28" },
            { t: "<b>Risques courants</b> : pas d'isolement particulier.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 28" },
            { t: "Une chaufferie de plus de 70 kW est à risques importants. Une salle des machines ou un local de CTA, à risques courants.", s: "texte", ref: "arrêté du 25 juin 1980, articles CH 5, CH 35 et CH 36" },
            { t: "<b>Aucun texte lu ne fixe de degré coupe-feu à une sous-station.</b> Il se décide avec le type d'ERP, la notice de sécurité et le réseau, souvent coupe-feu 2 heures au-delà de 110 °C. Il faut l'écrire.", s: "verifier", ref: "constat sur l'arrêté de 1978 (titre II) et l'article CH 11 ; exigence relevée dans des prescriptions de réseaux" },
            { t: "En 5e catégorie, un générateur de 30 à 70 kW va dans un local non ouvert au public, plancher haut et parois coupe-feu 1 heure.", s: "texte", ref: "arrêté du 22 juin 1990, article PE 21" }
          ],
          comme: "Trois portes, de la plus simple à la plus blindée : on choisit d'après ce qu'il y a derrière.",
          retenir: "Importants : coupe-feu 2 heures. Moyens : coupe-feu 1 heure. Courants : rien de particulier." },

        { id: "parois", titre: "Parois, portes, traversées", dessin: "lt_traversees",
          lignes: [
            { t: "<b>CF</b> veut dire coupe-feu : c'est l'ancienne écriture. La nouvelle : <b>EI</b> pour une paroi, <b>REI</b> si elle porte aussi la structure. CF 2 h devient EI 120 ou REI 120.", s: "texte", ref: "arrêté du 22 mars 2026, annexe 2" },
            { t: "Dans les parois d'un local à risques importants, chaque conduit de ventilation a son <a href=\"fiche.html?f=clapet-coupe-feu\">clapet coupe-feu</a>, du même degré que la paroi.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
            { t: "Tout trou de passage se rebouche avec un matériau qui rétablit la résistance au feu.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 7" },
            { t: "L'air extrait d'un local à risques importants ne doit pas être recyclé dans d'autres locaux.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 33" },
            { t: "Sur le chantier : porte posée selon son procès-verbal d'essai, ferme-porte réglé, sens d'ouverture respecté. Et aucun stockage : un local technique n'est pas une réserve.", s: "verifier" }
          ],
          comme: "Un seau percé : ça ne sert à rien d'épaissir le seau tant que le trou reste.",
          retenir: "Une paroi coupe-feu ne vaut que si ses traversées sont traitées : clapets, rebouchage, porte qui se referme." },

        { id: "air-eau", titre: "L'air et l'eau", dessin: "lt_air_eau",
          intro: "Choisir un local. Chaque local technique doit respirer, et garder son eau.",
          lignes: [
            { t: "<b>Chaufferie</b> : une ventilation basse et haute, et l'air dont la flamme a besoin.", s: "texte", ref: "arrêté du 23 juin 1978, titre I" },
            { t: "<b>Sous-station</b> : ventilation basse et haute au-delà de 70 kW, avec 30 °C au plus dans le local tant qu'il fait moins de 15 °C dehors. Elle ne brûle rien : pas d'air de combustion à prévoir.", s: "texte", ref: "arrêté du 23 juin 1978, articles 27 et 28" },
            { t: "La <b>rétention</b> retient l'eau en cas de fuite : 0,15 m ou 5 m³.", s: "texte", ref: "arrêté du 23 juin 1978, articles 27 et 28" },
            { t: "Les réseaux demandent souvent plus : ventilation de l'ordre de 7 à 8 dm² par MW (16 dm² au moins), <b>puisard</b>, un petit creux au point bas pour pomper l'eau, et robinet de puisage.", s: "verifier", ref: "points récurrents de cahiers de prescriptions de réseaux de chaleur publiés : chaque réseau a les siens" }
          ],
          comme: "Une baignoire avec un rebord : si ça déborde, l'eau reste là où on peut la pomper.",
          retenir: "Chaque local a son air, en bas et en haut, et sa rétention d'eau." },

        { id: "sous-sol", titre: "Le cas du sous-sol", dessin: "lt_soussol",
          intro: "Le sous-sol cumule les difficultés. Comparer les deux réseaux.",
          lignes: [
            { t: "Au-delà de 110 °C ou en vapeur haute pression : accès direct par l'extérieur, deux au-delà de 2 000 kW, et coupures du primaire et de l'électricité depuis l'extérieur.", s: "texte", ref: "arrêté du 23 juin 1978, articles 22 et 29" },
            { t: "En ERP, dans ce cas, aucune communication directe avec le public, sauf par un sas à portes pleines ventilé en haut vers l'extérieur, de 4 dm² au moins.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 11" },
            { t: "Réseau basse température : l'accès peut se faire par l'intérieur.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 4.1.2" },
            { t: "Réseau haute température : le primaire passe dehors. S'il entre dans le bâtiment, il va dans un caniveau ventilé et résistant, hors de portée du public.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 4.1.2" },
            { t: "Une sous-station de moins de 5 MW peut se placer dans un immeuble d'habitation. Aucune autre canalisation que celles du chauffage et de l'eau chaude ne doit passer dans son local.", s: "expert", ref: "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 4.1.2" },
            { t: "Chaufferie au gaz : ces emplacements sont interdits en sous-sol d'un immeuble d'habitation.", s: "texte", ref: "arrêté du 23 février 2018, article 8.2.2.2" },
            { t: "À prévoir aussi : puisard avec pompe de relevage, et un passage, porte ou trémie, assez grand pour remplacer le plus gros appareil.", s: "verifier" }
          ],
          comme: "Le bas d'un bateau : c'est là que l'eau arrive en premier, et là qu'on sort le plus difficilement.",
          retenir: "Au-delà de 110 °C : accès direct par l'extérieur et coupures dehors." },

        { id: "exemple", titre: "Un exemple de A à Z", dessin: "lt_exemple",
          intro: "Des bureaux recevant du public, raccordés à un réseau de chaleur en eau chaude à 105 °C. Puissance de 400 kW, sous-station en sous-sol. Cas inventé pour l'exemple.",
          calcul: [
            { q: "Quel local ?", op: "pas de flamme, un échangeur :", res: "sous-station", s: "texte", ref: "arrêté du 25 juin 1980, article CH 11" },
            { q: "Les règles de 1978 s'appliquent-elles ?", op: "400 kW > 70 kW :", res: "oui, titre II", s: "texte", ref: "arrêté du 23 juin 1978, article 1 et titre II" },
            { q: "Accès par l'extérieur imposé ?", op: "105 °C ≤ 110 °C :", res: "non", t: "L'accès par l'intérieur reste possible.", s: "texte", ref: "arrêté du 23 juin 1978, articles 22 et 29" },
            { q: "Quelle ventilation demandée par le réseau ?", op: "0,4 MW × 8 dm² =", res: "3,2 dm²", t: "Sous le minimum de 16 dm² souvent demandé : on retient 16 dm². À lire dans les prescriptions du réseau.", s: "verifier", ref: "points récurrents de cahiers de prescriptions de réseaux de chaleur publiés : chaque réseau a les siens" },
            { q: "Quel degré coupe-feu ?", op: "aucun texte lu ne le fixe :", res: "à décider", t: "Avec le contrôleur technique et le réseau, puis à écrire dans la notice de sécurité.", s: "verifier" },
            { q: "Où s'arrête le réseau ?", op: "avant ou après l'échangeur, selon le réseau :", res: "à écrire", t: "Mettre la limite de prestation au CCTP, le document qui décrit les travaux.", s: "expert", ref: "Cerema, bases techniques des réseaux de chaleur, 2014" }
          ],
          retenir: "On nomme le local, on lit la puissance et la température, et le reste en découle." }
      ] }
    ]
  },

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
      { t: "Traversées des parois coupe-feu calfeutrées, clapets coupe-feu sur les gaines (voir la <a href=\"fiche.html?f=clapet-coupe-feu\">fiche clapet coupe-feu</a>).", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 §§ 5 et 7" },
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
    { t: "Lire une ancienne version des textes : le chapitre CH du règlement ERP a été réécrit (version du 1er janvier 2026), le chapitre GZ aussi, et l'arrêté du 22 mars 2026 remplace celui de 2004 sur la résistance au feu, pour les demandes déposées depuis le 1er octobre 2026. À venir : CO 28 et EL 5 changent pour les demandes déposées à partir du 1er juin 2027. Prendre la version applicable à la date du dossier.", s: "texte", ref: "arrêté du 1er septembre 2025 (CH) ; arrêté du 23 février 2025 (GZ) ; arrêté du 22 mars 2026 ; arrêté du 19 février 2026" },
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
    { s: "verifier", t: "Règlement de service et cahier des prescriptions du réseau de chaleur concerné : ils fixent le local de la sous-station et la limite de prestation." },
    { s: "expert", t: "Pour apprendre : Cerema, guide de raccordement des copropriétés aux réseaux de chaleur (juillet 2019) et bases techniques des réseaux de chaleur (2014)." }
  ]
};
