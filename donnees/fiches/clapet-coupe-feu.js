/* Fiche : clapet coupe-feu.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   "comme" et "retenir" ne portent pas de badge : "comme" est une image sans chiffre ni règle, "retenir" redit une ligne badgée de l'étape.
   Texte lu en novembre 2026 : article CH 32 du règlement ERP, version en vigueur depuis le 1er août 2025.
   NF EN 13501-3 d'août 2025, NF S 61-937-1 de décembre 2003 et NF S 61-937-5 de mars 2012 lues le 6 novembre 2026 sous la licence du bureau d'études, reformulées, jamais recopiées.
   NF S 61-932 de décembre 2024, avec son amendement A1 de mai 2026, lue le 6 novembre 2026. NF EN 15650 et NF EN 1366-2 n'ont pas été lues.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "clapet-coupe-feu",
  titre: "Clapet coupe-feu",
  soustitre: "Il ferme la gaine de ventilation quand le feu arrive, pour que la paroi traversée garde son degré coupe-feu.",
  schema: "clapet",

  cours: {
    intro: "Aucun prérequis. On part du feu et de la gaine, et on arrive au choix d'un clapet sur un cas concret, en dix étapes. Si le mot gaine reste flou, voir d'abord <a href=\"fiche.html?f=bases-ventilation#pieces\">les pièces du système</a> dans le cours sur les bases de la ventilation.",
    parties: [
      { titre: "Le problème", chapitres: [
        { id: "boites", titre: "Le feu et les boîtes", dessin: "cf_boites",
          lignes: [
            { t: "Le règlement des ERP cherche à limiter la propagation du feu et des fumées à travers le bâtiment. Pour cela, il le découpe en volumes fermés.", s: "texte", ref: "arrêté du 25 juin 1980, articles CO 23 à CO 26" },
            { t: "Ces volumes sont notamment : les niveaux, les secteurs, les compartiments, les locaux à risques importants, les locaux à sommeil.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
            { t: "Leurs parois sont dites <b>coupe-feu</b> : elles retiennent le feu un temps donné, compté en minutes ou en heures. Ce temps s'appelle leur <b>degré</b>.", s: "texte", ref: "arrêté du 25 juin 1980, articles CO 24 et CO 25" },
            { t: "Découper ainsi s'appelle le <b>compartimentage</b>. Dans le règlement, un <b>compartiment</b> est un de ces volumes précis, avec ses propres règles.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 25" }
          ],
          comme: "Un navire et ses cloisons étanches : une voie d'eau remplit une cale, pas tout le bateau. Ici, c'est le feu qu'on enferme.",
          retenir: "Le bâtiment est découpé en boîtes, et les parois de chaque boîte retiennent le feu un temps donné." },

        { id: "trou", titre: "Le trou que fait la gaine", dessin: "cf_trou",
          lignes: [
            { t: "La ventilation transporte l'air dans des <b>gaines</b> : des conduits, faits d'un matériau qui ne brûle pas, qui passent d'une pièce à l'autre.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 1" },
            { t: "Quand une gaine traverse une paroi coupe-feu, elle y fait un passage. Le clapet sert à arrêter le feu à cet endroit.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { t: "Le règlement l'impose <b>quelle que soit la section</b> de la gaine : une petite gaine n'y échappe pas. Le degré du clapet est égal à celui de la paroi franchie.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
            { t: "Exception : le clapet n'est pas exigé si le conduit ne dessert pas le volume qu'il traverse et si, avec sa gaine éventuelle, il a lui-même le degré voulu.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" }
          ],
          comme: "Une chatière découpée dans une porte blindée : tant qu'elle reste ouverte, le blindage ne sert à rien.",
          retenir: "Une gaine qui traverse une paroi coupe-feu y fait un passage : il faut un clapet du même degré que la paroi." },

        { id: "quoi", titre: "Un clapet, c'est quoi ?", dessin: "cf_anatomie",
          intro: "Les mots qu'on retrouve dans une fiche technique et dans un CCTP, le document qui décrit les travaux à faire.",
          tuiles: [
            { ico: "tunnel", titre: "Tunnel", t: "Le corps du clapet, en acier. Il se loge dans la paroi et se raccorde à la gaine des deux côtés.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { ico: "lame", titre: "Lame", t: "La porte du tunnel. Ouverte quand la ventilation marche, c'est sa position d'attente. Fermée, elle vient sur sa butée.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { ico: "meca", titre: "Mécanisme", t: "Il tient la lame et la libère. Le règlement veut qu'il reste accessible.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { ico: "fusible", titre: "Déclencheur thermique", t: "La pièce qui réagit à la chaleur et lance la fermeture. On dit aussi fusible.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { ico: "joints", titre: "Joints", t: "Un joint en caoutchouc pour l'étanchéité à froid, un joint intumescent, qui gonfle à la chaleur.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { ico: "contact", titre: "Contact de position", t: "En option : il signale à distance si la lame est ouverte ou fermée.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" }
          ],
          comme: "Une porte coupe-feu à l'échelle d'un tuyau : ouverte tous les jours, fermée le jour du feu.",
          retenir: "Une lame dans un tunnel : en attente, ouverte ; en cas de feu, fermée." }
      ] },

      { titre: "Lire et choisir", chapitres: [
        { id: "lire-ei", titre: "Lire EI 120 (ve ho i↔o) S", dessin: "cf_ei",
          lignes: [
            { t: "<b>E</b>, étanchéité : les flammes et les gaz chauds ne passent pas.", s: "texte", ref: "arrêté du 22 mars 2026, annexe 2" },
            { t: "<b>I</b>, isolation thermique : la chaleur ne passe pas assez pour mettre le feu de l'autre côté.", s: "texte", ref: "arrêté du 22 mars 2026, annexe 2" },
            { t: "<b>120</b> : la tenue, en minutes. On trouve aussi 30, 60 ou 90.", s: "texte", ref: "arrêté du 22 mars 2026, article 4" },
            { t: "<b>ve</b> : essayé dans une paroi verticale, un mur. <b>ho</b> : essayé dans une paroi horizontale, une dalle. <b>i↔o</b> : le feu peut venir d'un côté comme de l'autre.", s: "texte", ref: "arrêté du 22 mars 2026, annexe 2 ; le texte écrit (i o) pour le sens du feu ; NF EN 13501-3, août 2025, annexe B, garde i↔o pour un clapet essayé des deux côtés" },
            { t: "<b>S</b> : la fuite de fumée reste limitée, à 200 m³ par heure et par m² de clapet au plus, avant le feu et après ses cinq premières minutes.", s: "norme", ref: "NF EN 13501-3, août 2025, § 5.1.4 et § 7.2.3.3.3 ; l'arrêté du 22 mars 2026 cite le S sans le définir" },
            { t: "En coupe-feu, le règlement n'admet pour un clapet que le classement avec S : EI 60-S, EI 120-S. Et sa pression de service ne doit pas dépasser celle de l'essai.", s: "texte", ref: "arrêté du 22 mars 2026, annexe 2" },
            { t: "Un clapet n'a pas un seul classement : il change selon la paroi (béton, plaque de plâtre) et le rebouchage. Les vrais chiffres sont dans sa <b>déclaration des performances</b>, le document que le fabricant doit fournir.", s: "fabricant", ref: "déclarations des performances de fabricants ; NF EN 15650" }
          ],
          calcul: [
            { q: "Paroi coupe-feu de 2 heures : quel clapet ?", op: "2 h × 60 min =", res: "EI 120", t: "Le degré du clapet est égal à celui de la paroi franchie.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5 ; arrêté du 22 mars 2026, annexe 2" }
          ],
          comme: "Une fiche d'identité : chaque lettre dit une qualité, et le nombre dit combien de temps elle tient.",
          retenir: "EI 120 : ni les flammes ni trop de chaleur ne passent pendant 120 minutes." },

        { id: "fusible", titre: "Le fusible à 70 °C", dessin: "cf_fusible",
          intro: "Faire monter la température de l'air avec le curseur, et regarder ce qui se passe.",
          lignes: [
            { t: "En ERP, le clapet a un déclencheur thermique taré à 70 °C : il réagit à cette température-là.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { t: "Quand l'air de la gaine la dépasse, le fusible lâche et un ressort ferme la lame.", s: "fabricant", ref: "documentations de fabricants de clapets" },
            { t: "Ce clapet est dit <b>autocommandé</b> : il se ferme seul, sans courant et sans câble.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { t: "Après avoir fonctionné, le fusible se remplace.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { t: "Fusible déclenché ou ordre reçu, la lame doit être fermée en moins de 30 secondes.", s: "norme", ref: "NF S 61-937-5, mars 2012, § 9.2" },
            { t: "Une fiche de fabricant lue annonce 72 °C, pas 70 °C : au VISA, regarder la fiche et les certificats du clapet, sans s'arrêter au nombre.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets ; la norme NF S 61-937-5 de mars 2012 vaut présomption de conformité selon arrêté du 25 juin 1980, article CH 32 § 6" },
            { t: "Sa limite : il attend que la chaleur arrive jusqu'à lui. Des fumées encore froides passent.", s: "verifier" }
          ],
          comme: "Un bouchon de cire qui retient une porte à ressort : la cire fond, la porte claque.",
          retenir: "Le fusible lâche à la chaleur et la lame se ferme, sans courant ni câble." },

        { id: "ssi", titre: "Le télécommandé : SSI, CMSI, DAS", dessin: "cf_chaine",
          intro: "Trois sigles qui font peur, et une idée simple : quelqu'un détecte, quelqu'un décide, quelqu'un obéit.",
          tuiles: [
            { ico: "ssi", titre: "SSI", t: "Système de sécurité incendie : tous les matériels qui recueillent les informations sur le feu et mettent le bâtiment en sécurité.", s: "texte", ref: "arrêté du 25 juin 1980, article MS 53" },
            { ico: "cats", titre: "Catégories A à E", t: "Cinq niveaux de SSI, du plus sévère, A, au moins sévère, E. Les dispositions de chaque type d'ERP disent lequel il faut.", s: "texte", ref: "arrêté du 25 juin 1980, article MS 53" },
            { ico: "cmsi", titre: "CMSI", t: "Centralisateur de mise en sécurité incendie : il donne les ordres. Compartimenter, désenfumer, arrêter les installations techniques.", s: "fabricant", ref: "notice d'un CMSI de fabricant ; arrêté du 25 juin 1980, article MS 59" },
            { ico: "das", titre: "DAS", t: "Dispositif actionné de sécurité : l'appareil qui obéit, comme un clapet ou une porte à ventouse. Il ne donne aucun ordre.", s: "norme", ref: "NF S 61-937-1, décembre 2003, § 3.1 et § 4.3 ; arrêté du 25 juin 1980, article MS 59" }
          ],
          lignes: [
            { t: "Un clapet <b>télécommandé</b> reçoit l'ordre de fermer depuis le CMSI : il n'attend pas que la chaleur arrive.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { t: "<b>La règle en ERP</b> : si les dispositions du type exigent un SSI de catégorie A ou B, seuls les clapets télécommandés depuis le CMSI sont admis au droit des parois de compartimentage.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { t: "Le déclencheur thermique reste exigé : un télécommandé garde son fusible.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { t: "Hors de ce cas, le <b>coordinateur SSI</b>, qui organise ce système sur le projet, tranche. Sur un bâtiment à une seule zone de compartimentage, il a retenu le fusible seul.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" }
          ],
          comme: "Un chef d'orchestre : le détecteur lève la main, le chef donne le signal, et chaque musicien joue sa partie.",
          retenir: "SSI de catégorie A ou B exigé : au droit des parois de compartimentage, clapet télécommandé depuis le CMSI." },

        { id: "emission", titre: "Émission ou rupture", dessin: "cf_emission",
          intro: "Deux façons de donner l'ordre. Choisir un type, puis couper le câble : c'est là que la différence se voit.",
          lignes: [
            { t: "<b>À émission</b> : au repos, aucun courant. Le CMSI envoie une impulsion pour fermer.", s: "fabricant", ref: "notice d'un CMSI de fabricant" },
            { t: "<b>À rupture</b> : un courant permanent tient le clapet ouvert. Le CMSI le coupe pour fermer.", s: "fabricant", ref: "notice d'un CMSI de fabricant" },
            { t: "<b>Sécurité positive</b> : à la coupure de courant, l'appareil passe de lui-même en position de sécurité. C'est le cas de la rupture : quand la tension tombe sous 10 % de sa valeur nominale, plus rien ne retient le clapet, et son ressort le ferme.", s: "norme", ref: "NF S 61-937-5, mars 2012, § 7 et § 10.3 ; le mot vient d'une notice de CMSI de fabricant" },
            { t: "L'émission demande une alimentation électrique de sécurité, suivant la NF S 61-940.", s: "fabricant", ref: "notice d'un CMSI de fabricant" },
            { t: "Un câble coupé ne ferme pas un clapet à émission : il faut du courant pour donner l'ordre. C'est pourquoi la surveillance de sa ligne est obligatoire ; sans elle, la panne passerait inaperçue.", s: "norme", ref: "NF S 61-937-1, décembre 2003, § 6.2.3 ; NF S 61-932, décembre 2024, § 7.1" },
            { t: "La rupture n'est permise que pour un DAS dont un déclenchement intempestif ne peut pas compromettre la mise en sécurité du bâtiment.", s: "norme", ref: "NF S 61-932, décembre 2024, § 9.3.1" }
          ],
          comme: "La sonnette et le frein de train. La sonnette ne sonne que si on appuie. Le frein de secours serre dès que le câble lâche.",
          retenir: "Émission : une impulsion ferme. Rupture : une coupure ferme, et un câble coupé aussi." }
      ] },

      { titre: "Sur le chantier", chapitres: [
        { id: "pose", titre: "Bien le poser", dessin: "cf_pose",
          lignes: [
            { t: "Le clapet se place <b>au droit</b> de la paroi : à l'endroit même où la gaine la traverse.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
            { t: "Le tour de la gaine se rebouche avec un matériau qui rétablit la résistance au feu de la paroi. Ce rebouchage s'appelle le <b>calfeutrement</b>.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 7" },
            { t: "La <b>réservation</b>, le trou laissé dans la paroi, dépend du type de paroi : plaque de plâtre, carreaux de plâtre, paroi massive.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { t: "Le <b>procès-verbal</b> (PV), le rapport d'essai du laboratoire, et la notice de pose disent ce qui a été essayé : parois, produit, épaisseur. La pose reste dans ce cadre.", s: "fabricant", ref: "notice de pose du fabricant ; NF EN 1366-2" },
            { t: "La gaine se porte de chaque côté de la paroi : aucun effort sur le clapet.", s: "fabricant", ref: "notice de pose du fabricant" },
            { t: "Le mécanisme doit rester accessible : dans un faux plafond, il faut une trappe en face.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { t: "Le mécanisme dépasse du mur, et la lame ouverte peut dépasser du tunnel sur les grands diamètres : prévoir la place.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" }
          ],
          comme: "Un hublot de bateau : il n'est bon que si le joint autour est bon aussi.",
          retenir: "Posé au droit de la paroi, rebouché autour, mécanisme accessible." },

        { id: "essais", titre: "Essayer, réarmer, suivre",
          intro: "Un clapet ne sert presque jamais : il faut donc pouvoir vérifier qu'il marche.",
          tuiles: [
            { ico: "essai", titre: "Déclenchement manuel", t: "Il permet de faire fermer la lame sans feu.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { ico: "rearme", titre: "Réarmement", t: "Remettre la lame en attente après une fermeture. Manuel en général, motorisé en option.", s: "fabricant", ref: "fiche technique d'un fabricant de clapets" },
            { ico: "position", titre: "Position contrôlée", t: "Un DAS a de quoi contrôler ses positions, et il signale sa position de sécurité quand elle est vraiment atteinte. Pour un clapet, c'est la position fermée.", s: "norme", ref: "NF S 61-937-1, décembre 2003, § 3.3 et § 5.1 ; NF S 61-937-5, mars 2012, § 5" },
            { ico: "registre", titre: "Registre de sécurité", t: "L'exploitant y note les travaux et les dates des contrôles.", s: "texte", ref: "code de la construction et de l'habitation, article R143-44" },
            { ico: "liste", titre: "Liste et repérage", t: "Chaque clapet numéroté sur les plans, avec sa fiche et son PV au DOE, le dossier des ouvrages exécutés remis en fin de chantier.", s: "verifier" }
          ],
          lignes: [
            { t: "À la réception, faire fermer et réarmer chaque clapet. Pour un télécommandé, vérifier que la centrale voit sa position.", s: "verifier" }
          ],
          comme: "Un extincteur : il ne sert presque jamais, et c'est justement pour ça qu'on vérifie qu'il marche.",
          retenir: "Faire fermer et réarmer chaque clapet à la réception, et noter les contrôles au registre." },

        { id: "exemple", titre: "Un exemple de A à Z", dessin: "cf_exemple",
          intro: "Des bureaux recevant du public. Une gaine d'extraction sort d'un local à risques importants, à travers un mur en béton coupe-feu de 2 heures. Cas inventé pour l'exemple.",
          calcul: [
            { q: "La paroi est-elle concernée ?", op: "local à risques importants : dans la liste", res: "clapet exigé", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
            { q: "Quel degré ?", op: "2 h × 60 min =", res: "EI 120", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5 ; arrêté du 22 mars 2026, annexe 2" },
            { q: "Quelle position ?", op: "un mur, le feu peut venir des deux côtés :", res: "ve i↔o", s: "texte", ref: "arrêté du 22 mars 2026, annexe 2" },
            { q: "Quelle commande ?", op: "pas de SSI A ou B exigé, pas une paroi de compartimentage :", res: "fusible", t: "À confirmer avec le coordinateur SSI. Rien à raccorder par le lot électricité.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { q: "Et si un SSI de catégorie A était exigé, sur une paroi de compartimentage ?", op: "seul admis :", res: "télécommandé", t: "On choisit alors émission ou rupture d'après le CMSI.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
            { q: "Au VISA de la fiche technique ?", op: "paroi en béton dans le PV, réservation, calfeutrement, trappe :", res: "à vérifier", s: "fabricant", ref: "notice de pose du fabricant ; déclaration des performances" }
          ],
          retenir: "Paroi concernée, degré égal, commande selon le SSI, pose selon le PV." }
      ] }
    ]
  },

  essentiel: [
    { t: "Un clapet coupe-feu se ferme dans la gaine, au droit de la paroi coupe-feu qu'elle traverse : le feu ne passe pas d'un local à l'autre par la ventilation.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5 ; NF EN 15650 pour le produit" },
    { t: "<b>Autocommandé</b> : un fusible thermique, taré à 70 °C en ERP, libère un ressort qui ferme la lame. Aucun câble.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6 ; documentations des fabricants de clapets" },
    { t: "<b>Télécommandé</b> (un DAS) : la centrale incendie le ferme à distance, par émission ou par rupture de courant. Le fusible reste là en secours.", s: "fabricant", ref: "documentations des fabricants ; NF S 61-937-5, mars 2012, § 7 ; arrêté du 25 juin 1980, article CH 32 § 6" },
    { t: "Si le type d'ERP exige un SSI de catégorie A ou B, seuls les télécommandés sont admis au droit des parois de compartimentage. Sinon, le coordinateur SSI tranche : sans asservissement demandé, le fusible suffit.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6 ; avis d'un coordinateur SSI, octobre 2026" }
  ],

  chiffres: [
    { valeur: "70 °C", libelle: "Tarage du déclencheur thermique en ERP : au-delà, le clapet se ferme seul. Une fiche de fabricant lue annonce 72 °C.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6 ; fiche technique d'un fabricant" },
    { valeur: "EI 60", libelle: "60 minutes d'étanchéité aux flammes (E) et d'isolation thermique (I). Même lecture pour EI 30, 90, 120.", s: "texte", ref: "arrêté du 22 mars 2026, annexe 2" },
    { valeur: "1 zone", libelle: "Une seule zone de compartimentage : pas d'asservissement au SSI, le fusible suffit.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" },
    { valeur: "0 câble", libelle: "Pour un autocommandé : rien à raccorder par le lot électricité.", s: "fabricant", ref: "documentations des fabricants" }
  ],

  decision: {
    titre: "Quel clapet poser ?",
    depart: "q1",
    noeuds: {
      q1: { q: "La gaine traverse-t-elle une paroi ou un plancher coupe-feu : entre niveaux, compartiment ou secteur, local à risques importants, local à sommeil ?", choix: [{ r: "Oui", vers: "q2" }, { r: "Non", vers: "v_non" }] },
      v_non: { verdict: "Pas de clapet coupe-feu à cet endroit", texte: "Le règlement liste les parois où il l'exige : zones de mise en sécurité, isolements entre niveaux, secteurs et compartiments, locaux à risques importants, locaux à sommeil, espaces d'attente sécurisés. Vérifier le classement réel de la paroi sur les plans de l'architecte.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
      q2: { q: "Le conduit traverse-t-il ce volume sans le desservir, en ayant lui-même, ou avec sa gaine, le degré voulu ?", choix: [{ r: "Oui", vers: "v_gaine" }, { r: "Non", vers: "q3" }] },
      v_gaine: { verdict: "Pas de clapet, si le procès-verbal le couvre", texte: "Le clapet n'est alors pas exigé. Le PV du conduit doit couvrir le cas, à faire valider par le contrôleur technique.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
      q3: { q: "Le type d'ERP exige-t-il un SSI de catégorie A ou B, sur une paroi de compartimentage ? Ou le coordinateur SSI demande-t-il un asservissement ?", choix: [{ r: "Non", vers: "v_fusible" }, { r: "Oui", vers: "q4" }] },
      v_fusible: { verdict: "Clapet autocommandé à fusible", texte: "Le fusible ferme le clapet tout seul quand l'air dépasse sa température. Rien à raccorder au SSI.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" },
      q4: { q: "Que sait commander la centrale incendie (le CMSI) ?", choix: [{ r: "Une impulsion de courant", vers: "v_emission" }, { r: "La coupure d'un courant permanent", vers: "v_rupture" }, { r: "Je ne sais pas", vers: "v_cssi" }] },
      v_emission: { verdict: "Clapet télécommandé à émission", texte: "Au repos, aucun courant. La centrale envoie une impulsion pour le fermer. Un câble coupé ne le ferme pas : la surveillance de la ligne est obligatoire.", s: "norme", ref: "NF S 61-937-1, décembre 2003, § 6.2.3 ; NF S 61-932, décembre 2024, § 7.1" },
      v_rupture: { verdict: "Clapet télécommandé à rupture", texte: "Un courant permanent le tient ouvert. La centrale le coupe pour le fermer, et un câble coupé ou une panne le ferment aussi : c'est la sécurité positive.", s: "norme", ref: "NF S 61-937-5, mars 2012, § 10.3 ; notice d'un CMSI de fabricant" },
      v_cssi: { verdict: "Poser la question au coordinateur SSI", texte: "Le type de commande se cale sur la centrale existante ou prévue. C'est lui qui le fixe, avant le VISA des fiches techniques.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" }
    }
  },

  verifications: [
    { titre: "Au VISA", icone: "plan", points: [
      { t: "Degré EI du clapet égal à celui de la paroi traversée.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 5" },
      { t: "Déclaration des performances et PV qui couvrent le type de paroi (béton, cloison plâtre, plancher) et le mode de pose.", s: "fabricant", ref: "déclarations des performances et notices de pose de fabricants ; NF EN 15650 et NF EN 1366-2, non lues" },
      { t: "Mode de commande conforme à l'avis du coordinateur SSI : fusible ou télécommandé.", s: "expert", ref: "avis d'un coordinateur SSI, octobre 2026" },
      { t: "Lignes de télécommande à émission en câble CR1, ou C2 dans un cheminement protégé ; à rupture, C2 au moins. Ces lignes ne passent jamais dans une gaine de ventilation.", s: "norme", ref: "NF S 61-932, décembre 2024, § 4.5 et § 7.1" },
      { t: "Chaque clapet repéré et numéroté sur les plans, avec sa trappe de visite.", s: "verifier" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Clapet posé dans l'épaisseur de la paroi, ou déporté seulement si le PV le permet.", s: "fabricant", ref: "notice de pose du fabricant" },
      { t: "Calfeutrement avec le produit et l'épaisseur prévus par le PV : il doit rétablir la résistance au feu de la paroi.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 7 ; notice de pose du fabricant" },
      { t: "Gaine supportée de part et d'autre : aucun effort sur le clapet.", s: "fabricant", ref: "notice de pose du fabricant" },
      { t: "Mécanisme et fusible accessibles depuis la trappe.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" }
    ] },
    { titre: "À la réception", icone: "cle", points: [
      { t: "Essai de fermeture et de réarmement de chaque clapet.", s: "verifier" },
      { t: "Étiquette et numéro sur chaque clapet, liste dans le DOE avec les fiches et les PV.", s: "verifier" },
      { t: "Pour un télécommandé : retour de position vu sur la centrale. Il est obligatoire quand le clapet est commun à plusieurs zones de mise en sécurité.", s: "norme", ref: "NF S 61-932, décembre 2024, § 9.3.2.1" }
    ] }
  ],

  pieges: [
    { t: "Le CCTP prévoit des clapets asservis au SSI alors que le coordinateur SSI ne le demande pas : télécommande et câblage payés pour rien, sur deux lots.", s: "cas" },
    { t: "Un plafond coupe-feu qui protège la charpente est décrit \"sans aucune traversée\", alors que les gaines doivent le traverser : à trancher avant la pose.", s: "cas" },
    { t: "Clapet enfermé dans un faux plafond sans trappe : impossible à réarmer et à vérifier, alors que le mécanisme doit rester accessible.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 32 § 6" },
    { t: "Citer l'ancien CH 32 : l'article a été réécrit par l'arrêté du 29 juillet 2025, en vigueur depuis le 1er août 2025. Prendre la version applicable à la date du dossier.", s: "texte", ref: "arrêté du 29 juillet 2025 modifiant le règlement ERP" },
    { t: "Un clapet à émission ne se ferme pas si son câble est coupé : sans la surveillance de ligne, pourtant obligatoire, la panne passerait inaperçue.", s: "norme", ref: "NF S 61-937-1, décembre 2003, § 6.2.3 ; NF S 61-932, décembre 2024, § 7.1" },
    { t: "Passer le câble de commande du clapet dans la gaine : aucune ligne du système de mise en sécurité ne doit emprunter un conduit aéraulique.", s: "norme", ref: "NF S 61-932, décembre 2024, § 4.5" }
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
    { s: "texte", t: "Règlement de sécurité contre les risques d'incendie et de panique dans les ERP, arrêté du 25 juin 1980 modifié : dispositions générales (CO, CH, MS) et dispositions propres à chaque type. Article CH 32 en vigueur depuis le 1er août 2025 (arrêté du 29 juillet 2025), article MS 53 pour les catégories de SSI." },
    { s: "norme", t: "NF EN 15650 : clapets coupe-feu pour réseaux aérauliques (norme produit, marquage CE). Non lue : absente de l'abonnement de normes du bureau d'études." },
    { s: "texte", t: "Arrêté du 22 mars 2026 relatif aux performances de résistance au feu, qui remplace celui de 2004 : annexe 2 pour les lettres et le classement des clapets. Il vaut pour les demandes déposées depuis le 1er octobre 2026." },
    { s: "norme", t: "NF EN 13501-3, août 2025 : classement des clapets (EI, ve, ho, i↔o, S), lue le 6 novembre 2026. NF EN 1366-2 : leurs essais de résistance au feu, non lue." },
    { s: "norme", t: "NF S 61-937-1, décembre 2003 : règles communes des dispositifs actionnés de sécurité (DAS) ; NF S 61-937-5, mars 2012 : les clapets, qui vaut présomption de conformité à l'article CH 32 ; NF S 61-934, mars 1991 : CMSI ; NF S 61-940, juin 2000 : alimentations électriques de sécurité ; NF S 61-932, décembre 2024, avec son amendement A1 de mai 2026 : règles d'installation du système de mise en sécurité. Lues le 6 novembre 2026." },
    { s: "fabricant", t: "Notice de pose et déclaration des performances du clapet retenu : elles fixent les parois admises, le calfeutrement et les distances." }
  ]
};
