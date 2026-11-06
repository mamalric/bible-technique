/* Fiche : sorbonne de laboratoire.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   "comme" et "retenir" ne portent pas de badge : "comme" est une image sans chiffre ni règle, "retenir" redit une ligne badgée de l'étape.
   Sources principales : guide INRS ED 795 (2009) et note INRS de septembre 2026.
   NF EN 14175-2 (2003) et XP CEN/TS 14175-5 (2010) lues le 6 novembre 2026. NF X 15-206 et les autres parties de la NF EN 14175 non lues : leurs valeurs viennent de l'INRS.
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

window.BIBLE_FICHE = {
  id: "sorbonne",
  titre: "Sorbonne de laboratoire",
  soustitre: "Une enceinte ventilée qui aspire l'air du labo par une ouverture réglable : c'est ce courant d'air entrant, plus que la vitre, qui retient les vapeurs loin de la personne qui manipule.",
  schema: "sorbonne",

  cours: {
    intro: "Si les mots débit, dépression ou compensation restent flous, commencer par <a href=\"fiche.html?f=bases-ventilation\">le cours sur les bases de la ventilation</a>. Ici, on repart de zéro sur la sorbonne, en huit étapes.",
    parties: [
      { titre: "Comprendre", chapitres: [
        { id: "quoi", titre: "Une sorbonne, c'est quoi ?", dessin: "sb_quoi",
          lignes: [
            { t: "C'est une grande boîte, ouverte devant, posée sur un plan de travail. Un ventilateur en aspire l'air et le rejette dehors : l'intérieur est en <b>dépression</b>.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { t: "Elle protège la personne qui manipule contre le fait de respirer des produits chimiques dangereux, gaz ou particules. C'est une protection collective.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { t: "Elle ne protège ni contre les micro-organismes ni contre les particules radioactives.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { t: "C'est un <b>captage</b> : le polluant est aspiré à sa source. Voir l'étape <a href=\"fiche.html?f=bases-ventilation#capter\">Diluer ou capter</a> du cours sur les bases.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" }
          ],
          comme: "Une cabine avec une grande bouche ouverte : l'air de la pièce s'y engouffre en permanence, et ce qui est dedans ne ressort pas.",
          retenir: "Une boîte qui aspire : l'air entre par devant et repart dehors par derrière." },

        { id: "pieces-sorbonne", titre: "Ses pièces",
          intro: "Les mots qu'on retrouve dans une notice, un CCTP ou un procès-verbal d'essai.",
          tuiles: [
            { ico: "enceinte", titre: "Volume de travail", t: "L'intérieur de la boîte, entre les parois fixes et l'écran. On y manipule.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { ico: "ecran", titre: "Écran, ou guillotine", t: "La paroi mobile et transparente de la face avant. Elle règle la taille de l'ouverture.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { ico: "butee", titre: "Butée", t: "Elle arrête la guillotine à l'ouverture de travail maximale. La dépasser demande un geste voulu ; elle se réarme seule quand on redescend.", s: "norme", ref: "NF EN 14175-2, octobre 2003, § 7.3.2" },
            { ico: "plan", titre: "Plan de travail", t: "Il porte le matériel. Ses rebords retiennent ce qui se renverse.", s: "expert", ref: "INRS, guide ED 795, chapitre 3" },
            { ico: "plenum", titre: "Plenum et fentes", t: "Le double fond, au dos. Il répartit l'aspiration entre les fentes, en haut et en bas.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { ico: "conduit", titre: "Conduit et ventilateur", t: "Ils emportent l'air dehors. Le ventilateur va hors du bâtiment ou en toiture, pour garder le conduit en dépression.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
            { ico: "rejet", titre: "Rejet", t: "Vertical, à 15 à 20 m/s, à l'écart des prises d'air.", s: "expert", ref: "INRS, guide ED 795, chapitre 2 et paragraphe 5.2" },
            { ico: "alarme", titre: "Alarme de débit", t: "Elle prévient si l'aspiration faiblit, par un signal visuel et sonore.", s: "texte", ref: "code du travail, article R4222-13 ; INRS, guide ED 795, chapitre 3" }
          ],
          retenir: "Écran pour régler, plenum pour répartir, ventilateur pour aspirer, alarme pour prévenir." },

        { id: "protege", titre: "Ce qui protège : l'air qui entre", dessin: "sb_duel",
          lignes: [
            { t: "Ce n'est pas la vitre qui retient les vapeurs : c'est le courant d'air qui rentre par l'ouverture. Sa vitesse s'appelle la <b>vitesse frontale</b>. Retenir ainsi les vapeurs s'appelle le <b>confinement</b>.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { t: "Repère français : au moins 0,4 m/s en chaque point de l'ouverture, guillotine à 500 mm.", s: "expert", ref: "INRS, guide ED 795, tableaux 1 et 3" },
            { t: "C'est peu : une personne qui marche va à environ 1 m/s, plus vite que cet air. C'est pour cela qu'un simple passage peut le perturber.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" },
            { t: "L'air doit être intense, homogène et constant : il faut la bonne vitesse partout, et tout le temps.", s: "expert", ref: "INRS, guide ED 795, chapitre 5" }
          ],
          calcul: [
            { q: "Quelle surface d'ouverture ?", op: "1,5 m de large × 0,5 m de haut =", res: "0,75 m²", s: "expert", ref: "INRS, guide ED 695, paragraphe 3.2.2" },
            { q: "Quel débit pour 0,4 m/s ?", op: "0,4 m/s × 0,75 m² =", res: "0,30 m³/s", s: "expert", ref: "INRS, guide ED 695, paragraphe 3.2.2" },
            { q: "En m³/h ?", op: "0,30 × 3 600 =", res: "1 080 m³/h", t: "Pour comparer : c'est l'air neuf de 36 personnes en salle de réunion, à 30 m³/h chacune.", s: "texte", ref: "code du travail, article R4222-6, pour la comparaison" }
          ],
          comme: "Un rideau d'air à l'entrée d'un magasin, mais tourné vers l'intérieur : il ne bloque rien de solide, et pourtant il retient.",
          retenir: "Pas de courant d'air, pas de protection. La vitre seule ne suffit pas." },

        { id: "guillotine", titre: "La guillotine", dessin: "sb_ouverture",
          lignes: [
            { t: "À débit constant, la vitesse est inverse de la surface : ouverture divisée par deux, vitesse multipliée par deux.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { t: "Sur une sorbonne de paillasse, l'ouverture de travail est bornée : 500 mm de préférence, jamais plus de 600 mm. Cette hauteur est écrite sur la sorbonne.", s: "norme", ref: "NF EN 14175-2, octobre 2003, § 7.3.1" },
            { t: "La vitre est en verre feuilleté ou trempé, ou dans un plastique adapté. Elle tient à n'importe quelle hauteur, ne tombe pas si une suspension lâche, et se manœuvre avec 30 N au plus.", s: "norme", ref: "NF EN 14175-2, octobre 2003, § 6.3, § 7.3.3 et § 7.3.4" },
            { t: "On travaille <b>aussi bas que possible</b>, juste de quoi passer les bras. On baisse à la butée quand personne ne manipule.", s: "expert", ref: "INRS, guide ED 795, paragraphes 1.1 et 7.1" },
            { t: "La vitre sert aussi d'écran contre les projections. Jamais la tête dans l'enceinte.", s: "expert", ref: "INRS, guide ED 795, paragraphes 1.1 et 7.1" }
          ],
          comme: "Le pouce sur le tuyau d'arrosage : moins de passage, ça sort plus vite. Voir l'étape <a href=\"fiche.html?f=bases-ventilation#vitesse\">Débit, vitesse, section</a>.",
          retenir: "Basse pour manipuler, à la butée au repos. Grande ouverte seulement pour l'entretien." }
      ] },

      { titre: "Dans le labo", chapitres: [
        { id: "perturbe", titre: "Ce qui casse le confinement", dessin: "sb_plan",
          lignes: [
            { t: "Le passage de personnes est la perturbation la plus fréquente : dans le labo étudié par l'INRS, un passage toutes les deux minutes en moyenne.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" },
            { t: "Passer à 1 m plutôt qu'à 0,4 m divise le risque par plus de 10.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" },
            { t: "Sont aussi en cause : les portes, les bouches de soufflage, les mouvements rapides, et le manque d'air de compensation.", s: "expert", ref: "INRS, guide ED 795, paragraphes 5.1, 5.3 et 7.1" },
            { t: "Dedans aussi : la source reste à 15 ou 20 cm au moins de l'ouverture, le plus bas possible, et l'enceinte n'est pas encombrée.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.1" }
          ],
          comme: "La flamme d'une bougie : elle tient tant que personne ne passe trop près.",
          retenir: "Une sorbonne se place à l'écart du passage. Le plan du labo compte autant que l'appareil." },

        { id: "air-labo", titre: "L'air doit venir de quelque part", dessin: "sb_labo",
          lignes: [
            { t: "Une sorbonne extrait beaucoup d'air. Elle ne doit pas être installée sans que la compensation soit prévue. Voir l'étape <a href=\"fiche.html?f=bases-ventilation#compensation\">Tout ce qui sort doit rentrer</a>.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" },
            { t: "L'air de compensation doit être salubre : de l'air neuf, ou l'air de locaux voisins sans pollution spécifique.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" },
            { t: "Le labo est tenu en légère dépression, 10 à 20 Pa, par rapport aux locaux voisins sans pollution spécifique.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" },
            { t: "Ce débit se chauffe : 1 080 m³/h, de −7 à 19 °C, c'est 0,34 × 1 080 × 26 = 9,5 kW pour une seule sorbonne, sans récupération.", s: "verifier", ref: "calcul d'illustration ; voir l'étape L'air neuf, il faut le chauffer de la fiche des bases" }
          ],
          comme: "Une paille dans une bouteille fermée : elle se pince, et plus rien ne vient. Une sorbonne dans un labo sans entrée d'air, c'est pareil.",
          retenir: "On étudie ensemble l'extraction des sorbonnes et l'arrivée d'air du labo." }
      ] },

      { titre: "Choisir et contrôler", chapitres: [
        { id: "types", titre: "Quel type de sorbonne ?",
          intro: "Il s'agit toujours de tenir la vitesse à l'ouverture, en rejetant moins d'air chauffé quand c'est possible.",
          tuiles: [
            { ico: "constant", titre: "Débit constant", t: "Le ventilateur aspire toujours pareil. Simple, mais la vitesse change avec l'ouverture.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { ico: "deux", titre: "Deux vitesses", t: "Petite vitesse guillotine basse, grande vitesse à partir de 10 à 15 cm d'ouverture.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
            { ico: "variable", titre: "Débit variable", t: "Le débit suit l'ouverture pour garder la vitesse. Moins d'air à chauffer, mais une régulation délicate, avec une compensation asservie.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.2" },
            { ico: "recirculation", titre: "Recirculation", t: "L'air filtré revient dans le labo, sans conduit. Réservée à des produits connus, jamais de CMR, c'est-à-dire de produits cancérogènes, mutagènes ou toxiques pour la reproduction.", s: "expert", ref: "INRS, guide ED 795, encadré 1" },
            { titre: "Basse vitesse : non", t: "De 0,4 à 0,2 m/s, le risque est multiplié par environ 20. L'INRS préconise désormais de les proscrire.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" }
          ],
          retenir: "Par défaut, une sorbonne classique raccordée dehors. Variable si le chauffage de l'air pèse lourd. L'arbre plus bas aide à trancher." },

        { id: "controle", titre: "Comment on vérifie qu'elle protège", dessin: "sb_points",
          lignes: [
            { t: "<b>La vitesse</b> : on la mesure en plusieurs points de l'ouverture, guillotine à 500 mm, sorbonne vide, dans son local.", s: "expert", ref: "INRS, guide ED 795, chapitre 6 et annexe" },
            { t: "<b>Le confinement</b> : on émet un gaz traceur, le SF6, dans l'enceinte et on mesure ce qui en sort. Il doit rester sous 0,1 ppm.", s: "expert", ref: "INRS, guide ED 795, tableau 1 et encadré 2" },
            { t: "<b>Le fumigène</b> : il rend l'air visible, tous les six mois.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.2 et annexe" },
            { t: "Les vitesses de réception sont les <b>valeurs de référence</b>. Si elles baissent d'environ 30 % en un point, on refait une mesure de confinement.", s: "expert", ref: "INRS, guide ED 795, chapitre 6 et encadré 7" },
            { t: "Ensuite : débit chaque jour, alarmes chaque semaine, vitesses, débit et perte de charge chaque année.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.2 ; arrêté du 8 octobre 1987" }
          ],
          comme: "On n'attend pas qu'il pleuve pour tester l'étanchéité d'un toit : on envoie de l'eau et on regarde où elle passe.",
          retenir: "Vitesse et confinement à la réception, puis on compare à ces valeurs toute la vie de la sorbonne." }
      ] }
    ]
  },

  essentiel: [
    { t: "Une <b>sorbonne</b> est une enceinte en dépression : elle aspire l'air du local et le rejette dehors avec un ventilateur. C'est une protection collective contre les gaz et les particules chimiques, pas contre les micro-organismes ni les particules radioactives.", s: "expert", ref: "INRS, guide ED 795, paragraphe 1.1" },
    { t: "<b>Ce qui protège, c'est l'air qui entre</b> par l'ouverture : il doit être intense, homogène et constant. Tout courant d'air devant la sorbonne peut rompre ce confinement.", s: "expert", ref: "INRS, guide ED 795, chapitre 5 ; Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "<b>La guillotine se travaille au plus bas</b>, et baissée à la butée quand personne ne manipule. Jamais la tête dans l'enceinte.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.1 ; Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "<b>Une sorbonne ne marche jamais seule</b> : conduit, ventilateur, rejet, alarme de débit, et surtout une arrivée d'air de compensation dans le labo. Pour ces notions, voir la <a href=\"fiche.html?f=bases-ventilation\">fiche des bases de la ventilation</a>.", s: "expert", ref: "INRS, guide ED 795, paragraphes 5.1 et 5.2 ; code du travail, article R4222-13" }
  ],

  chiffres: [
    { valeur: "0,4 m/s", libelle: "Vitesse d'air minimale en chaque point de l'ouverture, guillotine à 500 mm, pour une sorbonne classique.", s: "expert", ref: "INRS, guide ED 795, tableaux 1 et 3" },
    { valeur: "0,1 ppm", libelle: "Seuil de l'essai de confinement au gaz traceur SF6. Il vient de la norme française, pas de la norme européenne.", s: "expert", ref: "INRS, guide ED 795, encadré 2 (ex-XP X 15-206) ; NF EN 14175-2, octobre 2003, § 8.1, qui laisse ce seuil aux normes nationales ; NF X 15-206 d'août 2023, non lue" },
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
      { t: "La norme d'installation donne des repères proches : 1 m d'une circulation, 1,4 m d'une paillasse en face, 1,4 m d'un mur en face (près de 2 m pour les gros débits), aucune porte fréquentée à moins de 1 m de la façade ni à moins de 0,3 m d'un côté.", s: "norme", ref: "XP CEN/TS 14175-5, août 2010, § 4.2.2 à § 4.2.4 et § 4.2.8" },
      { t: "Air du local calme devant la sorbonne : moins de 0,2 m/s à 400 mm de la façade. Hauteur sous plafond : 3 m conseillés, 2,7 m au moins.", s: "norme", ref: "XP CEN/TS 14175-5, août 2010, § 4.2.6" },
      { t: "Ventilateur centrifuge hors du bâtiment ou en toiture, pour garder le conduit en dépression dans le bâtiment. Vitesse dans le conduit : 10 m/s au plus. Réseau capable de 10 % de débit en plus.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Rejet vertical, 15 à 20 m/s, à l'écart des prises d'air, pas en façade à ouvrants.", s: "expert", ref: "INRS, guide ED 795, chapitre 2 et paragraphe 5.2" },
      { t: "Indicateur de débit intégré à la sorbonne, avec alarme visuelle et sonore, à sécurité positive, et un moyen simple de vérifier qu'il marche.", s: "texte", ref: "code du travail, article R4222-13 ; NF EN 14175-2, octobre 2003, § 8.2 ; INRS, guide ED 795, chapitre 3" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Matériaux du conduit résistant aux produits transportés, peu de gaine souple, peu de trajets horizontaux, récupération des condensats.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Trappes de visite et points de purge sur le conduit, le ventilateur et la cheminée.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Traversée d'une paroi coupe-feu : registre coupe-feu ou collier intumescent (voir la <a href=\"fiche.html?f=clapet-coupe-feu\">fiche clapet coupe-feu</a>).", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
      { t: "Butées de guillotine en place, plenum démontable avec des outils seulement, rebords de rétention au plan de travail.", s: "expert", ref: "INRS, guide ED 795, chapitre 3 ; NF EN 14175-2, octobre 2003, § 7.2.2 et § 7.3.2" },
      { t: "Commandes des fluides hors de l'enceinte, celles des gaz combustibles protégées contre une ouverture par mégarde. Prises dehors de préférence ; dedans, IP44 au moins et coupure depuis l'extérieur.", s: "norme", ref: "NF EN 14175-2, octobre 2003, § 9.1 et § 9.3" }
    ] },
    { titre: "À la réception", icone: "cle", points: [
      { t: "Essai sorbonne vide, dans son local : confinement au SF6 sous 0,1 ppm, vitesse d'au moins 0,4 m/s en chaque point, guillotine à 500 mm (15 points pour une largeur de 1,41 à 1,81 m).", s: "expert", ref: "INRS, guide ED 795, chapitre 6 et annexe ; méthodes NF EN 14175-3 et -4" },
      { t: "Vitesses consignées au procès-verbal : ce sont les valeurs de référence pour toute la vie de la sorbonne.", s: "expert", ref: "INRS, guide ED 795, chapitre 6" },
      { t: "Contrôles prévus : débit chaque jour, alarmes chaque semaine, fumigène tous les six mois, vitesses, débit et perte de charge chaque année.", s: "expert", ref: "INRS, guide ED 795, paragraphe 7.2 et annexe ; arrêté du 8 octobre 1987" },
      { t: "Baisse d'environ 30 % de la vitesse en un point par rapport à la référence : refaire une mesure de confinement.", s: "expert", ref: "INRS, guide ED 795, encadré 7" },
      { t: "Marquages en place : l'ouverture maximale, la consigne de garder la façade fermée chaque fois que possible, la plaque du type avec son année. Manuel remis, avec le rapport d'essai de type.", s: "norme", ref: "NF EN 14175-2, octobre 2003, § 7.3.1, § 10 et § 11" }
    ] }
  ],

  pieges: [
    { t: "Poser une sorbonne sans prévoir l'air de compensation : elle aspire dans un labo qui manque d'air, et ne confine plus.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1" },
    { t: "Une sorbonne dans un passage. C'est le passage de personnes, plus que tout autre facteur étudié, qui dégrade le confinement.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "Choisir une sorbonne basse vitesse pour économiser : de 0,4 à 0,2 m/s, le risque est multiplié par environ 20. L'INRS préconise désormais de les proscrire.", s: "expert", ref: "INRS, Hygiène et sécurité du travail n° 284, septembre 2026" },
    { t: "Croire qu'une sorbonne marquée EN 14175-2 est forcément bonne dans son labo : son essai de type se fait en salle d'essai, et la norme européenne laisse le seuil de confinement aux normes nationales, en France la NF X 15-206. Seul l'essai sur site juge la sorbonne en place.", s: "norme", ref: "NF EN 14175-2, octobre 2003, introduction, § 8.1 et annexe A ; XP CEN/TS 14175-5, août 2010, page de garde" },
    { t: "Arrêter net une sorbonne qui a servi : son conduit contaminé peut polluer le labo. Garder un petit débit d'extraction, ou la sceller après nettoyage.", s: "norme", ref: "XP CEN/TS 14175-5, août 2010, § 4.5" },
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
    { s: "norme", t: "NF EN 14175-2, octobre 2003 : exigences de sécurité et de performances (dimensions, guillotine, indicateur de débit, alimentations, marquage). XP CEN/TS 14175-5, août 2010 : recommandations d'installation et de maintenance. Lues le 6 novembre 2026. Parties 1 (vocabulaire), 3 (essais de type), 4 (essais sur site) et 6 (débit variable), non lues." },
    { s: "norme", t: "NF X 15-206, août 2023 : seuils pour les essais de confinement et de vitesse (non lue, valeur de confinement connue par l'INRS). NF X 15-211, mai 2009 : sorbonnes à recirculation, non lue. La NF EN 14175-2 ne traite pas ces sorbonnes." },
    { s: "texte", t: "Code du travail : R4222-13 (avertissement automatique de défaillance), R4222-20 et R4222-21 (entretien, consigne), R4212-7 (notice du maître d'ouvrage), R4227-42 et suivants (atmosphères explosives). Arrêté du 8 octobre 1987 (contrôles périodiques)." }
  ]
};
