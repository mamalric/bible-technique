/* Fiche : ERP, établissement recevant du public (type et catégorie).
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   "comme" et "retenir" ne portent pas de badge : "comme" est une image sans chiffre ni règle, "retenir" redit une ligne badgée de l'étape.
   Textes lus en novembre 2026 sur Légifrance : GN 1, GN 2, PE 1 à PE 4, M 2, N 2, W 2, GE 4 et CCH R143-34 à R143-44.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "erp",
  titre: "ERP : type et catégorie",
  soustitre: "Un bâtiment qui reçoit du public se classe par une lettre, son activité, et un chiffre, son effectif : ce couple dit quelles règles de sécurité incendie s'appliquent.",
  schema: "erp",

  cours: {
    intro: "Aucun prérequis. On part de la question la plus simple, est-ce que du public entre ?, et on arrive au classement complet d'un restaurant, en neuf étapes. Le mot ERP veut dire établissement recevant du public.",
    parties: [
      { titre: "Comprendre", chapitres: [
        { id: "quoi", titre: "Un ERP, c'est quoi ?", dessin: "er_quoi",
          lignes: [
            { t: "Tout bâtiment, local ou enceinte où des personnes sont admises, librement, en payant, ou invitées à une réunion, même gratuite.", s: "texte", ref: "code de la construction et de l'habitation, article R143-2 (ex-R123-2)" },
            { t: "Le <b>public</b>, ce sont toutes les personnes admises en plus du personnel.", s: "texte", ref: "code de la construction et de l'habitation, article R143-2 (ex-R123-2)" },
            { t: "Des exemples très différents : une église, une école, une discothèque, un gymnase.", s: "expert", ref: "préfecture de la Vienne, document sur les types d'ERP" },
            { t: "Si seul le personnel entre, c'est un lieu de travail, soumis au code du travail. Un logement relève des règles de l'habitation.", s: "expert", ref: "DREAL Normandie, support de formation sur le classement des établissements" }
          ],
          comme: "Une porte que n'importe qui peut pousser : dès qu'un inconnu peut entrer, il faut savoir le faire sortir vite, sans qu'il connaisse les lieux.",
          retenir: "Du public entre, même sur invitation : c'est un ERP." },

        { id: "code", titre: "Une lettre et un chiffre", dessin: "er_code",
          lignes: [
            { t: "Une crèche et une discothèque ne reçoivent pas le même public : elles n'ont pas les mêmes exigences.", s: "expert", ref: "préfecture de la Vienne, document sur les types d'ERP" },
            { t: "On classe donc chaque établissement selon deux critères : le <b>type</b>, d'après son activité, et la <b>catégorie</b>, d'après le nombre de personnes.", s: "texte", ref: "code de la construction et de l'habitation, article R143-19 ; arrêté du 25 juin 1980, article GN 1" },
            { t: "Il s'écrit avec une lettre et un chiffre : W 3, N 5, R 2.", s: "expert", ref: "DREAL Normandie, support de formation sur les différents bâtiments" },
            { t: "Ce code dit quelles pages lire dans le <b>règlement de sécurité</b>, le texte qui fixe les règles contre l'incendie et la panique : l'arrêté du 25 juin 1980.", s: "expert", ref: "DREAL Normandie, support de formation sur le classement des établissements" }
          ],
          comme: "L'adresse d'un rayon dans une bibliothèque : une lettre, un chiffre, et on sait où chercher.",
          retenir: "Une lettre pour l'activité, un chiffre pour le nombre de personnes." },

        { id: "type", titre: "Le type : la lettre", dessin: "er_types",
          intro: "Toucher une lettre pour voir ce qu'elle veut dire.",
          lignes: [
            { t: "Le type dit la nature de l'exploitation. Quatorze lettres pour les établissements installés dans un bâtiment.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1" },
            { t: "Les établissements spéciaux ont leurs propres sigles : PA plein air, CTS chapiteaux et tentes, SG structures gonflables, PS parcs de stationnement couverts, GA gares, OA hôtels-restaurants d'altitude, EF établissements flottants, REF refuges de montagne.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1" }
          ],
          comme: "Le métier sur une carte de visite : il dit ce qu'on fait, pas la taille de l'entreprise.",
          retenir: "La lettre dit la nature de l'exploitation : W bureaux, N restaurant, R enseignement, M magasin." },

        { id: "categorie", titre: "La catégorie : le chiffre", dessin: "er_echelle",
          lignes: [
            { t: "La catégorie se lit sur une même échelle, quel que soit le type : <b>1re</b>, plus de 1 500 personnes ; <b>2e</b>, de 701 à 1 500 ; <b>3e</b>, de 301 à 700 ; <b>4e</b>, 300 et moins.", s: "texte", ref: "code de la construction et de l'habitation, article R143-19" },
            { t: "<b>5e</b> : le public n'atteint pas le seuil fixé pour ce type. On y revient à l'étape d'après.", s: "texte", ref: "code de la construction et de l'habitation, article R143-14 et R143-19" },
            { t: "Attention, c'est à l'envers : le 1 est le plus gros, le 5 le plus petit.", s: "texte", ref: "code de la construction et de l'habitation, article R143-19" }
          ],
          comme: "Les divisions d'un championnat : la première accueille les plus gros clubs, la dernière les plus petits.",
          retenir: "1 = plus de 1 500 personnes. 4 = 300 et moins. Le chiffre baisse quand le bâtiment grossit." }
      ] },

      { titre: "Compter et classer", chapitres: [
        { id: "effectif", titre: "Compter l'effectif", dessin: "er_compter",
          lignes: [
            { t: "L'<b>effectif</b> est le nombre maximal de personnes qui peuvent être là en même temps.", s: "expert", ref: "préfecture de la Vienne, document sur les types d'ERP" },
            { t: "C'est un calcul théorique, imposé par le règlement : on ne compte pas les gens à la porte.", s: "expert", ref: "préfecture de l'Aude, guide de l'exploitant d'ERP, 2016" },
            { t: "Le public se détermine, selon le type, par les places assises, la surface réservée au public, la déclaration contrôlée de l'exploitant, ou plusieurs de ces moyens.", s: "texte", ref: "code de la construction et de l'habitation, article R143-19" },
            { t: "<b>Restaurant</b> : 2 personnes par m² debout, 3 par m² en file d'attente. Assis : le nombre de places déclaré, limité à une personne pour 2 m² ; sans déclaration, une personne par m².", s: "texte", ref: "arrêté du 25 juin 1980, article N 2, version de février 2022" },
            { t: "<b>Bureaux</b> : la déclaration du maître d'ouvrage. À défaut, une personne pour 10 m² de locaux aménagés pour recevoir du public, ou une pour 100 m² de plancher si ces aménagements ne sont pas prévus.", s: "texte", ref: "arrêté du 25 juin 1980, article W 2" },
            { t: "<b>Enseignement, bibliothèque, sport couvert, plein air</b> : déclaration du chef d'établissement ou du maître d'ouvrage.", s: "expert", ref: "préfecture de la Vienne, document sur les types d'ERP" },
            { t: "<b>Magasin</b> : une personne pour 3 m² de surface de vente en sous-sol, au rez-de-chaussée et au 1er étage, pour 6 m² au 2e étage, pour 15 m² au-dessus. Faible densité de public : une pour 9 m², à tous les niveaux. Centre commercial : une pour 5 m² de mail, une pour 6 m² dans une boutique de moins de 300 m².", s: "texte", ref: "arrêté du 25 juin 1980, article M 2, version de décembre 2017" },
            { t: "Le <b>personnel</b> compte à part : seul s'ajoute celui qui n'a pas de <b>dégagements</b>, c'est-à-dire de passages pour sortir, indépendants de ceux du public.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1" }
          ],
          calcul: [
            { q: "Salle assise de 120 m², sans déclaration", op: "120 × 1 =", res: "120", s: "texte", ref: "arrêté du 25 juin 1980, article N 2" },
            { q: "Bar debout de 20 m²", op: "20 × 2 =", res: "40", s: "texte", ref: "arrêté du 25 juin 1980, article N 2" },
            { q: "File d'attente de 5 m²", op: "5 × 3 =", res: "15", s: "texte", ref: "arrêté du 25 juin 1980, article N 2" },
            { q: "Public de ce restaurant", op: "120 + 40 + 15 =", res: "175 personnes", s: "texte", ref: "arrêté du 25 juin 1980, article N 2" }
          ],
          comme: "Le nombre de places d'un ascenseur : écrit à l'avance d'après la taille de la cabine, pas d'après ceux qui montent.",
          retenir: "L'effectif se calcule d'après les places, la surface ou une déclaration, pas d'après la fréquentation réelle." },

        { id: "cinquieme", titre: "La 5e catégorie et ses seuils", dessin: "er_seuils",
          intro: "Choisir un type : les seuils changent. Ils sont fixés niveau par niveau.",
          lignes: [
            { t: "Un établissement est en 5e catégorie si son public reste <b>en dessous de chacun</b> des nombres de son type : sous-sol, étages, ensemble des niveaux.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2, version de janvier 2026" },
            { t: "Ici, seul le public compte : le personnel n'entre pas dans le calcul.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 3 § 2 et GN 1" },
            { t: "Un seul seuil atteint, et on sort de la 5e : on additionne alors le personnel concerné pour trouver la catégorie, 4e au moins.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2 et GN 1 ; code de la construction et de l'habitation, article R143-19" },
            { t: "Les plus courants, débits de boissons, restaurants, commerces de proximité, sont le plus souvent en 5e.", s: "expert", ref: "préfecture de l'Aude, guide de l'exploitant d'ERP, 2016" }
          ],
          calcul: [
            { q: "Magasin : 60 personnes au rez-de-chaussée, 120 en sous-sol", op: "60 + 120 =", res: "180", t: "Sous les 200 de l'ensemble des niveaux.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2" },
            { q: "Et le sous-sol ?", op: "120 ≥ 100 :", res: "pas en 5e", t: "Le seuil du sous-sol est atteint : c'est lui qui fait basculer.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2" }
          ],
          comme: "Un portique à trois barres : il suffit d'en toucher une pour que ça sonne.",
          retenir: "5e catégorie : le public reste sous chacun des seuils du type. Le personnel ne compte pas." },

        { id: "groupes", titre: "Deux groupes, plusieurs livres", dessin: "er_livres",
          lignes: [
            { t: "<b>1er groupe</b> : les catégories 1 à 4. <b>2e groupe</b> : la 5e.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1" },
            { t: "Le règlement est rangé en livres. Le livre II sert au 1er groupe : des dispositions générales communes (CO construction, CH chauffage et ventilation, EL électricité, MS moyens de secours...), puis celles du type (W, N, R...).", s: "expert", ref: "DREAL Normandie, support de formation sur le classement des établissements" },
            { t: "Le livre III fixe les règles du 2e groupe : les articles PE, et PO, PU, PX pour certains types.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 1 ; préfecture de Tarn-et-Garonne, fiche technique sur la 5e catégorie" },
            { t: "Le livre IV regroupe les établissements spéciaux.", s: "expert", ref: "DREAL Normandie, support de formation sur le classement des établissements" },
            { t: "Plusieurs exploitations dans un même bâtiment, sans l'isolement prévu par le règlement, forment un seul ERP : la catégorie se calcule sur le total de leurs effectifs.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 2" },
            { t: "Si elles sont de types différents, le passage de la 5e à la 4e se fait à 50 en sous-sol, 100 en étage, 200 au total. Le groupement reste au moins en 4e si l'une d'elles y est déjà.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 2" }
          ],
          comme: "Le même immeuble, deux modes d'emploi : un gros pour les grands établissements, un plus mince pour les petits.",
          retenir: "1er groupe : catégories 1 à 4, livre II. 2e groupe : la 5e, articles PE." },

        { id: "commission", titre: "La commission et l'ouverture", dessin: "er_parcours",
          lignes: [
            { t: "La <b>commission de sécurité</b> rend un avis, favorable ou défavorable. C'est le maire qui décide.", s: "expert", ref: "DREAL Normandie, support de formation sur le contrôle des ERP" },
            { t: "Avant les travaux : un dossier de sécurité déposé en mairie, avec le formulaire Cerfa, les plans et la <b>notice de sécurité</b>, le texte qui décrit les dispositions prises. Repère : au moins 6 mois avant le début des travaux.", s: "expert", ref: "DREAL Normandie, support de formation sur le contrôle des ERP" },
            { t: "Une <b>visite de réception</b> a lieu avant toute ouverture au public, et avant de rouvrir après plus de dix mois de fermeture.", s: "texte", ref: "code de la construction et de l'habitation, article R143-38" },
            { t: "L'exploitant demande l'autorisation d'ouverture au maire, qui la donne par arrêté après avis de la commission. Certains établissements sans hébergement de 5e catégorie en sont dispensés.", s: "texte", ref: "code de la construction et de l'habitation, article R143-38 et R143-39" },
            { t: "Repère pour cette demande : au moins un mois avant la date souhaitée.", s: "expert", ref: "DREAL Normandie, support de formation sur le contrôle des ERP" },
            { t: "Ensuite, en catégories 1 à 4, des visites périodiques tous les 3 ou 5 ans selon le type et la catégorie, et des visites inopinées.", s: "texte", ref: "arrêté du 25 juin 1980, article GE 4 ; code de la construction et de l'habitation, article R143-41" },
            { t: "En 5e catégorie sans sommeil, en général, pas de visite. L'établissement doit tout de même être conforme.", s: "expert", ref: "préfecture de l'Aude, guide de l'exploitant d'ERP, 2016" },
            { t: "Le contrôle ne décharge personne : constructeurs, installateurs et exploitants restent responsables, chacun pour sa part.", s: "texte", ref: "code de la construction et de l'habitation, article R143-34" },
            { t: "L'exploitant tient un <b>registre de sécurité</b> : travaux, consignes, dates des contrôles et des exercices. Si l'effectif change assez pour jouer sur la sécurité, il prévient le maire.", s: "texte", ref: "code de la construction et de l'habitation, article R143-44 ; arrêté du 25 juin 1980, article GN 1" }
          ],
          comme: "Le contrôle technique d'une voiture : un passage avant de rouler, puis à intervalles réguliers. Entre deux, le conducteur reste responsable.",
          retenir: "La commission donne un avis, le maire décide. Visite de réception avant toute ouverture." },

        { id: "exemple", titre: "Un exemple de A à Z", dessin: "er_exemple",
          intro: "Un restaurant de plain-pied, sans déclaration de places : une salle assise de 180 m², un bar debout de 20 m², une file d'attente de 10 m². Dix personnes y travaillent, sans sortie propre. Cas inventé pour l'exemple.",
          calcul: [
            { q: "Quel type ?", op: "un restaurant :", res: "N", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1" },
            { q: "Quel public ?", op: "180 × 1 + 20 × 2 + 10 × 3 =", res: "250", s: "texte", ref: "arrêté du 25 juin 1980, article N 2" },
            { q: "En 5e catégorie ?", op: "250 ≥ 200 :", res: "non", t: "Le seuil de l'ensemble des niveaux est atteint.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2" },
            { q: "Quel effectif pour la catégorie ?", op: "250 + 10 =", res: "260", t: "Le personnel s'ajoute, car il n'a pas de dégagements indépendants.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1" },
            { q: "Quelle catégorie ?", op: "260 ≤ 300 :", res: "N 4", t: "1er groupe : livre II du règlement, dispositions générales et type N.", s: "texte", ref: "code de la construction et de l'habitation, article R143-19 ; arrêté du 25 juin 1980, article GN 1" },
            { q: "Si la salle ne faisait que 100 m² ?", op: "100 + 40 + 30 =", res: "170 : N 5", t: "Sous le seuil, et le personnel ne compte plus. Le classement change de livre.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2 et PE 3" }
          ],
          retenir: "On compare d'abord le public au seuil du type. Au-dessus, on ajoute le personnel sans sortie propre." }
      ] }
    ]
  },

  essentiel: [
    { t: "Est un <b>ERP</b> tout bâtiment ou local où des personnes sont admises en plus du personnel, librement, en payant ou sur invitation.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-2 (ex-R123-2)" },
    { t: "Le <b>type</b>, une lettre, dit l'activité : W bureaux, M commerces, N restaurants, R enseignement, U soins, O hôtels...", s: "texte", ref: "arrêté du 25 juin 1980 modifié, article GN 1" },
    { t: "La <b>catégorie</b>, de 1 à 5, dit l'effectif : la 1re est la plus grande et la plus exigeante, la 5e la plus petite.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-19" },
    { t: "On lit d'abord le public seul : sous le seuil propre au type, c'est la 5e catégorie. Au-dessus, on ajoute le personnel qui n'a pas de dégagements indépendants de ceux du public, pour placer l'ERP de la 4e à la 1re.", s: "texte", ref: "arrêté du 25 juin 1980, articles GN 1, PE 2 et PE 3" }
  ],

  chiffres: [
    { valeur: "1 500", libelle: "Au-delà de 1 500 personnes, 1re catégorie.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-19" },
    { valeur: "300", libelle: "Jusqu'à 300 personnes, 4e catégorie, sauf si le public reste sous le seuil du type : alors 5e.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-19" },
    { valeur: "200", libelle: "Seuil de la 5e catégorie le plus courant (bureaux, commerces, restaurants, enseignement). Plus bas pour les hôtels et les soins.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2" },
    { valeur: "2 groupes", libelle: "1er groupe : catégories 1 à 4, règlement de 1980. 2e groupe : la 5e, avec ses règles allégées (articles PE).", s: "texte", ref: "arrêté du 25 juin 1980 modifié ; arrêté du 22 juin 1990 (articles PE)" }
  ],

  decision: {
    titre: "Quelle catégorie ?",
    depart: "q1",
    noeuds: {
      q1: { q: "Des personnes autres que le personnel y entrent-elles : clients, usagers, visiteurs, même sur invitation ?", choix: [{ r: "Oui", vers: "q2" }, { r: "Non", vers: "v_non" }] },
      v_non: { verdict: "Pas un ERP", texte: "Un bâtiment où n'entre que le personnel est un lieu de travail, soumis au code du travail. Un logement relève des règles de l'habitation.", s: "expert", ref: "DREAL Normandie, support de formation sur le classement des établissements" },
      q2: { q: "Quel est son type ? Il donne le seuil de la 5e catégorie.", choix: [{ r: "Bureaux, commerce, restaurant, enseignement", vers: "q3_200" }, { r: "Hôtel, établissement de soins", vers: "q3_100" }, { r: "Un autre type", vers: "v_type" }] },
      v_type: { verdict: "Lire le tableau de l'article PE 2", texte: "Chaque type a ses propres seuils de 5e catégorie, souvent avec un nombre plus bas en sous-sol et en étage. Les lire avant de compter.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2" },
      q3_200: { q: "Le public seul (sans le personnel) atteint-il 200 personnes ? Ou 100 en sous-sol, ou 100 en étage (200 pour un restaurant) ?", choix: [{ r: "Non", vers: "v5" }, { r: "Oui", vers: "q4" }] },
      q3_100: { q: "Le public seul atteint-il le seuil du type : 100 personnes en général, 20 pour des soins avec hébergement ?", choix: [{ r: "Non", vers: "v5" }, { r: "Oui", vers: "q4" }] },
      v5: { verdict: "5e catégorie (2e groupe)", texte: "Petit établissement : règles allégées des articles PE. Le personnel ne compte pas pour ce classement.", s: "texte", ref: "arrêté du 25 juin 1980, articles PE 2 et PE 3" },
      q4: { q: "Quel effectif total, avec le public et le personnel sans dégagements indépendants ?", choix: [{ r: "300 ou moins", vers: "v4" }, { r: "301 à 700", vers: "v3" }, { r: "701 à 1 500", vers: "v2" }, { r: "Plus de 1 500", vers: "v1" }] },
      v4: { verdict: "4e catégorie (1er groupe)", texte: "Règlement de 1980 : dispositions générales et dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-19" },
      v3: { verdict: "3e catégorie (1er groupe)", texte: "Règlement de 1980 : dispositions générales et dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-19" },
      v2: { verdict: "2e catégorie (1er groupe)", texte: "Règlement de 1980 : dispositions générales et dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-19" },
      v1: { verdict: "1re catégorie (1er groupe)", texte: "La plus grande : règlement de 1980, avec les dispositions propres au type.", s: "texte", ref: "Code de la construction et de l'habitation, article R143-19" }
    }
  },

  verifications: [
    { titre: "En conception et au VISA", icone: "plan", points: [
      { t: "Type et catégorie écrits dans la notice de sécurité, avec le calcul de l'effectif : places assises, densité au m² ou déclaration, selon le type.", s: "verifier" },
      { t: "Effectif compté niveau par niveau : le sous-sol et les étages ont souvent leur propre seuil.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2" },
      { t: "Activités de types différents dans le même bâtiment, sans l'isolement prévu : effectifs cumulés pour la catégorie, règles de chaque type pour chaque activité.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 2" },
      { t: "Dégagements dimensionnés sur l'effectif, en unités de passage (1 UP = 0,60 m ; 1 UP seule = 0,90 m ; 2 UP = 1,40 m).", s: "texte", ref: "arrêté du 25 juin 1980 modifié, article CO 36" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Aménagement conforme à l'effectif déclaré : une salle qui gagne des places peut changer de catégorie.", s: "verifier" },
      { t: "Compartimentage, isolement entre activités et désenfumage posés comme le prévoit le type.", s: "verifier" }
    ] },
    { titre: "À l'ouverture", icone: "cle", points: [
      { t: "Visite de réception de la commission de sécurité avant ouverture au public pour les catégories 1 à 4, et pour une 5e avec locaux à sommeil.", s: "texte", ref: "code de la construction et de l'habitation, article R143-38 ; DREAL Normandie, support de formation sur le contrôle des ERP" },
      { t: "Rapports de vérification des installations techniques et registre de sécurité remis à l'exploitant.", s: "texte", ref: "code de la construction et de l'habitation, articles R143-37 et R143-44" },
      { t: "Autorisation d'ouverture délivrée par le maire, par arrêté, avant d'accueillir le public.", s: "texte", ref: "code de la construction et de l'habitation, articles R143-38 et R143-39" }
    ] }
  ],

  pieges: [
    { t: "Classer d'après le public seul un établissement qui dépasse le seuil : pour les catégories 1 à 4, le personnel sans dégagements indépendants s'ajoute, et 280 + 40 font passer de la 4e à la 3e.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1 ; code de la construction et de l'habitation, article R143-19" },
    { t: "Ajouter tout le personnel sans regarder : celui qui a ses propres dégagements ne compte pas.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 1" },
    { t: "Oublier le seuil du sous-sol ou de l'étage : un ERP sous 200 personnes au total peut sortir de la 5e à cause d'une salle en sous-sol.", s: "texte", ref: "arrêté du 25 juin 1980, article PE 2" },
    { t: "Additionner ou séparer les activités au jugé : deux types dans un même bâtiment se cumulent pour la catégorie, sauf isolement conforme au règlement.", s: "texte", ref: "arrêté du 25 juin 1980, article GN 2" },
    { t: "Écrire la catégorie sans le calcul de l'effectif : le contrôleur technique et la commission le demanderont.", s: "verifier" }
  ],

  confondre: [
    { titre: "IGH, immeuble de grande hauteur", t: "Classé par la hauteur, pas par l'effectif : dernier plancher à 50 m en habitation, à 28 m pour les autres usages, mesuré depuis le niveau d'accès des pompiers. Il a son propre règlement.", s: "expert", ref: "DREAL Normandie, support de formation sur le classement des établissements" },
    { titre: "Famille d'habitation", t: "Les logements se classent en familles (1re à 4e) selon la hauteur et la disposition, pas en catégories d'ERP.", s: "texte", ref: "arrêté du 31 janvier 1986 modifié" },
    { titre: "Lieu de travail", t: "Si seul le personnel y entre, c'est le code du travail qui s'applique, pas le règlement ERP.", s: "expert", ref: "DREAL Normandie, support de formation sur le classement des établissements" }
  ],

  references: [
    { s: "texte", t: "Code de la construction et de l'habitation, partie réglementaire, articles R143-1 à R143-47 (ex-R123-1 et suivants) : R143-2 pour la définition, R143-19 pour les catégories, R143-34 à R143-44 pour le contrôle et l'ouverture." },
    { s: "texte", t: "Règlement de sécurité contre les risques d'incendie et de panique dans les ERP, arrêté du 25 juin 1980 modifié : généralités (GN 1, GN 2), contrôle (GE 4), dispositions communes (CO...) et dispositions propres à chaque type (M 2, N 2, W 2...)." },
    { s: "texte", t: "Arrêté du 22 juin 1990 modifié : dispositions applicables aux ERP de 5e catégorie (articles PE). Tableau des seuils à l'article PE 2, version en vigueur depuis le 1er janvier 2026 (arrêté du 1er décembre 2025)." },
    { s: "expert", t: "Pour apprendre : supports de formation de la DREAL Normandie sur le classement et le contrôle des ERP ; document de la préfecture de la Vienne sur les types d'ERP et le calcul de l'effectif ; guide de l'exploitant de la préfecture de l'Aude (2016)." },
    { s: "texte", t: "Arrêté du 20 avril 2017 : accessibilité des ERP neufs aux personnes handicapées, un autre volet de la réglementation des ERP." }
  ]
};
