/* Fiche : bac à graisses (séparateur à graisses).
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   "comme" et "retenir" ne portent pas de badge : "comme" est une image sans chiffre ni règle, "retenir" redit une ligne badgée de l'étape.
   Textes lus le 6 novembre 2026 : NF EN 1825-2 de novembre 2002, NF DTU 60.11 P2, NF DTU 60.1 P1-1-2 et P1-2, NF DTU 60.33 P1-2 et un Avis Technique,
   sous la licence du bureau d'études, reformulés et jamais recopiés ; articles CO 31 et CO 32 du règlement ERP et code de la santé publique sur Légifrance.
   NF EN 1825-1 n'a pas été lue : la liste des tailles vient d'une note de veille du GRAIE.
   Site public : aucun nom d'affaire, de client, d'entreprise, de fabricant ni de personne. */

window.BIBLE_FICHE = {
  id: "bac-a-graisses",
  titre: "Bac à graisses",
  soustitre: "Une cuve où les graisses de la cuisine flottent et restent piégées, pour que seule l'eau parte à l'égout.",
  schema: "graisses",

  cours: {
    intro: "Aucun prérequis. On part de l'évier d'une cuisine et on arrive au séparateur, à la canalisation qui y mène et à sa vidange, en treize étapes. Pour l'idée de paroi coupe-feu, voir <a href=\"fiche.html?f=clapet-coupe-feu#boites\">le feu et les boîtes</a> ; pour le mot ERP, voir <a href=\"fiche.html?f=erp#quoi\">la fiche ERP</a>.",
    parties: [
      { titre: "Comprendre", chapitres: [
        { id: "pourquoi", titre: "Pourquoi retenir les graisses", dessin: "sg_bouchon",
          lignes: [
            { t: "Dans une cuisine, l'eau de la plonge et du lave-vaisselle emporte des graisses. Chaudes, elles coulent avec l'eau.", s: "expert", ref: "fiche de principe du service d'assainissement d'une grande ville" },
            { t: "En refroidissant, elles figent : elles collent aux parois des tuyaux, puis les bouchent, dans le bâtiment comme dans l'égout.", s: "expert", ref: "aide-mémoire d'une association suisse de professionnels de l'eau, juin 2019" },
            { t: "Laissées trop longtemps, elles se décomposent en acides gras : odeurs, corrosion, et un gaz dangereux pour les égoutiers.", s: "expert", ref: "aide-mémoire d'une association suisse de professionnels de l'eau, juin 2019 ; document d'information d'une communauté d'agglomération" },
            { t: "C'est pourquoi la collectivité peut fixer aux restaurants des prescriptions avant de les raccorder au réseau public : en pratique, un <b>séparateur à graisses</b>, qu'on appelle aussi bac à graisses ou BAG.", s: "texte", ref: "code de la santé publique, article L1331-7-1" }
          ],
          comme: "Un évier où l'on vide la poêle chaque soir : au bout de quelques semaines, il ne s'écoule plus.",
          retenir: "Les graisses figent en refroidissant et bouchent les réseaux : on les retient avant l'égout." },

        { id: "principe", titre: "Comment il sépare", dessin: "sg_vinaigrette",
          lignes: [
            { t: "Le séparateur est une cuve où l'eau ralentit. Au repos, les graisses, plus légères que l'eau, montent et restent en surface.", s: "fabricant", ref: "documentation d'un fabricant de séparateurs à graisses" },
            { t: "Les matières lourdes, comme le sable et les restes, tombent au fond d'un premier compartiment : le <b>débourbeur</b>.", s: "fabricant", ref: "documentation d'un fabricant de séparateurs à graisses" },
            { t: "Une cloison retient la couche de graisses. L'eau passe dessous et ressort vers le réseau.", s: "fabricant", ref: "documentation d'un fabricant de séparateurs à graisses" },
            { t: "Tout se fait sans moteur : l'eau doit arriver au séparateur par simple pente.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
            { t: "Il ne traite pas tout : ni les huiles minérales, comme l'huile de moteur, ni les mélanges stables d'huile et d'eau.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 1" }
          ],
          comme: "Une vinaigrette laissée sur la table : l'huile remonte, et ce qui est lourd tombe au fond.",
          retenir: "Le lourd tombe dans le débourbeur, le gras flotte derrière la cloison, l'eau passe dessous." },

        { id: "pieces", titre: "Ses pièces",
          intro: "Les mots qu'on retrouve dans une fiche technique, un CCTP ou un plan. Le schéma en haut de page les montre en place.",
          tuiles: [
            { ico: "sgDebourbeur", titre: "Débourbeur", t: "Le premier compartiment, où le lourd se dépose. Au moins 100 litres par unité de taille nominale.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.4" },
            { ico: "sgSeparateur", titre: "Séparateur", t: "Le compartiment où les graisses montent et s'accumulent. Il en garde environ 40 litres par unité de taille.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.1" },
            { ico: "sgCloison", titre: "Cloison", t: "Elle plonge dans l'eau et retient la couche de graisses. L'eau sort en passant dessous.", s: "fabricant", ref: "documentation d'un fabricant de séparateurs à graisses" },
            { ico: "sgCouvercle", titre: "Couvercles", t: "Étanches et verrouillés, contre les odeurs. On les ouvre pour vider et entretenir.", s: "fabricant", ref: "fiche d'un séparateur à poser au sol" },
            { ico: "sgEvent", titre: "Ventilation", t: "La canalisation d'arrivée se prolonge en ventilation, jusqu'à l'air libre.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.4" },
            { ico: "sgAspi", titre: "Conduite d'aspiration", t: "Un tuyau fixe, du fond de la cuve jusqu'à un raccord que le camion de vidange peut atteindre.", s: "fabricant", ref: "documentations de fabricants de séparateurs à graisses" },
            { ico: "sgPrelev", titre: "Regard de prélèvement", t: "En sortie, pour prélever l'eau qui part au réseau et contrôler le rejet.", s: "fabricant", ref: "fiche d'un séparateur à poser au sol" },
            { ico: "sgAlarme", titre: "Alarme de graisses", t: "En option : une sonde prévient quand la couche devient épaisse.", s: "fabricant", ref: "fiche d'un séparateur à poser au sol" },
            { ico: "sgRelevage", titre: "Poste de relevage", t: "Si l'eau du séparateur est plus bas que le niveau de refoulement du réseau, une pompe la relève, après le séparateur.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" }
          ],
          retenir: "Débourbeur, séparateur et cloison font la cuve. Ventilation, aspiration et prélèvement l'entourent." },

        { id: "textes", titre: "Qui impose quoi", dessin: "sg_rang",
          lignes: [
            { t: "Un restaurant rejette des eaux dites <b>assimilées domestiques</b> : la restauration figure dans la liste officielle de ces activités.", s: "texte", ref: "arrêté du 21 décembre 2007, annexe I" },
            { t: "Il a droit au raccordement, mais la collectivité peut fixer des prescriptions techniques selon les risques de l'activité, en annexe de son règlement d'assainissement.", s: "texte", ref: "code de la santé publique, article L1331-7-1" },
            { t: "Les règlements d'assainissement lus imposent tous un séparateur aux restaurants et renvoient aux normes, sans en donner le numéro. Leurs exigences de vidange diffèrent : trois fois par an pour l'un, une fois par mois pour un autre.", s: "texte", ref: "règlements d'assainissement de trois grandes collectivités, éditions de 2013 à 2025" },
            { t: "Le règlement sanitaire départemental interdit, en termes généraux, de jeter dans le réseau ce qui gêne son fonctionnement. Il ne parle pas de graisses.", s: "texte", ref: "règlement sanitaire départemental, article 29" },
            { t: "Le règlement de sécurité des ERP ne dit rien du séparateur. Il compte pour les tuyaux qui traversent un plancher : voir l'étape Traverser un plancher.", s: "texte", ref: "arrêté du 25 juin 1980, articles CO 31 et CO 32 ; les articles GC n'en parlent pas" },
            { t: "Les normes sont d'application volontaire, sauf si un arrêté les rend obligatoires. Elles s'imposent quand un règlement ou le marché les cite.", s: "texte", ref: "décret n° 2009-697 du 16 juin 2009, article 17" },
            { t: "Un NF DTU est fait pour être incorporé au marché. S'il n'y est pas cité, la Cour de cassation a jugé qu'il ne permettait pas d'exiger une mise en conformité, en l'absence de désordre.", s: "texte", ref: "Cour de cassation, 3e chambre civile, 10 juin 2021, n° 20-15.277" },
            { t: "La notice du fabricant fixe le cadre d'emploi de son produit : températures, joints, pose. Hors de ce cadre, il ne le garantit plus.", s: "verifier" }
          ],
          comme: "Le code de la route, le règlement du parking et la notice de la voiture : chacun a son rang, et le plus haut l'emporte.",
          retenir: "La collectivité impose le séparateur ; la norme et le DTU donnent la méthode quand on les cite ; la notice fixe l'emploi du produit." }
      ] },

      { titre: "Le choisir", chapitres: [
        { id: "taille", titre: "La taille nominale", dessin: "sg_ns",
          intro: "Choisir le nombre de repas et les conditions, et regarder la taille changer.",
          lignes: [
            { t: "La taille d'un séparateur s'appelle sa <b>taille nominale</b>, NS. Sauf si l'autorité locale impose sa propre méthode, elle se calcule : NS = Qs × ft × fd × fr.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.1" },
            { t: "<b>Qs</b>, le débit de pointe en litres par seconde, se trouve par mesure, par les appareils raccordés, ou par le type d'établissement. Avec deux méthodes, on garde le plus fort.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.2.1" },
            { t: "<b>ft</b>, la température : 1,3 si l'eau dépasse 60 °C, toujours ou de temps en temps ; 1 sinon.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.2.2" },
            { t: "<b>fd</b>, la densité : 1 pour une cuisine ; 1,5 pour des graisses plus denses que 0,94.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.2.3" },
            { t: "<b>fr</b>, les produits de lavage : 1,3 dès qu'on utilise des détergents ou des produits de rinçage, même de temps en temps ; 1 s'il n'y en a jamais.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.2.4" },
            { t: "On retient ensuite la taille de la liste juste au-dessus : 1, 2, 4, 7, 10, 15, 20 ou 25.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.1 ; liste de la NF EN 1825-1, non lue, d'après une note de veille du GRAIE, 2006" }
          ],
          calcul: [
            { q: "Restaurant de 200 repas par jour, ouvert de 11 h à 23 h : quel débit de pointe ?", op: "200 × 50 l × 8,5 ÷ (3 600 × 12) =", res: "1,97 l/s", t: "50 litres d'eau par repas et un coefficient de pointe de 8,5 pour un restaurant.", s: "expert", ref: "note de veille du GRAIE sur le dimensionnement des séparateurs à graisses, 2006, d'après un guide du CNIDEP" },
            { q: "Quelle taille calculée ?", op: "1,97 × 1 × 1 × 1,3 =", res: "2,56", t: "Pas d'eau au-dessus de 60 °C, une cuisine, des détergents.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.1 et 6.2" },
            { q: "Quelle taille retenue ?", op: "la suivante après 2,56 :", res: "NS 4", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.1" },
            { q: "Et le débourbeur ?", op: "100 × 4 =", res: "400 litres", t: "Au moins.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.4" }
          ],
          comme: "Une taille de pneu : on calcule, puis on prend la taille du commerce juste au-dessus.",
          retenir: "NS = Qs × ft × fd × fr, puis la taille de la liste juste au-dessus." },

        { id: "gamme", titre: "Changer de taille, ce que ça change", dessin: "sg_tailles",
          lignes: [
            { t: "D'une taille à l'autre, tout grossit : la cuve, ses volumes et le diamètre de ses raccordements.", s: "fabricant", ref: "fiche d'une gamme de séparateurs à poser au sol" },
            { t: "Dans une gamme posée au sol, la NS 2 et la NS 4 ont des entrées en DN 110, la NS 7 et la NS 10 en DN 160, la NS 15 en DN 200.", s: "fabricant", ref: "fiche d'une gamme de séparateurs à poser au sol" },
            { t: "Une note de veille donne les diamètres minimaux de la canalisation : 100 mm jusqu'à NS 4, 125 mm jusqu'à NS 7, 150 mm jusqu'à NS 10.", s: "expert", ref: "note de veille du GRAIE sur le dimensionnement des séparateurs à graisses, 2006" },
            { t: "Dans cette gamme, une NS 4 contient 850 litres en service, une NS 7 en contient 1 660.", s: "fabricant", ref: "fiche d'une gamme de séparateurs à poser au sol" },
            { t: "Passer d'une NS 4 à une NS 7 change donc les raccordements, la place au sol et la charge sur le plancher : on reprend le plan et on fait vérifier la dalle.", s: "verifier" }
          ],
          calcul: [
            { q: "Quelle charge sur la dalle pour une NS 7 de cette gamme ?", op: "1 660 l d'eau, soit 1 660 kg, + 157 kg de cuve =", res: "environ 1,8 t", t: "Le poids de la cuve est celui du colis : c'est une borne haute.", s: "verifier", ref: "calcul d'illustration, volumes et poids d'une fiche de fabricant" }
          ],
          comme: "Changer de chaudière : la nouvelle ne se branche pas forcément sur les anciens tuyaux, ni ne tient forcément dans la même niche.",
          retenir: "Une autre taille, ce sont d'autres DN, une autre place et une autre charge sur la dalle." },

        { id: "place", titre: "Où le poser",
          lignes: [
            { t: "Près des appareils qui rejettent les graisses, pour que la canalisation reste courte.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.2" },
            { t: "Si possible, ni dans un local non ventilé, ni dans une zone de passage ou de stationnement de véhicules, ni dans une zone de stockage. Loin des fenêtres et des prises d'air, à cause des odeurs et des mouches.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.2" },
            { t: "Facile d'accès pour le camion de vidange : là, la norme ne conseille pas, elle exige.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.2" },
            { t: "À l'abri du gel, avec toutes les pièces à entretenir accessibles à tout moment.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.2" },
            { t: "Seulement les eaux chargées de graisses alimentaires : ni les eaux des WC, ni la pluie, ni les huiles minérales.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.1" },
            { t: "L'eau de l'éplucheuse, chargée de fécule, va à un séparateur à fécules, jamais au séparateur à graisses.", s: "texte", ref: "règlement d'assainissement d'une métropole, article 16.01" },
            { t: "Les huiles de friture usagées ne vont jamais au séparateur : elles sont collectées à part.", s: "texte", ref: "règlements d'assainissement de trois grandes collectivités" }
          ],
          comme: "Les poubelles d'un restaurant : près de la cuisine pour le service, mais là où le camion passe, et loin des fenêtres.",
          retenir: "Près des sources, ventilé, hors gel, accessible au camion, et seulement les eaux grasses." }
      ] },

      { titre: "Le réseau qui y mène", chapitres: [
        { id: "pente", titre: "La pente", dessin: "sg_pente",
          intro: "Choisir une pente et regarder de combien le tuyau descend sur 10 m.",
          lignes: [
            { t: "La <b>pente</b> se donne en pour cent : 1 % veut dire 1 cm de descente par mètre de tuyau.", s: "fabricant", ref: "guide de pose d'un fabricant de tubes PVC d'évacuation" },
            { t: "Les DTU de plomberie fixent 1 % au moins pour les conduites de raccordement, les collecteurs et les parties horizontales.", s: "norme", ref: "NF DTU 60.11 P2, § 6.1 et § 6.3 ; NF DTU 60.1 P1-1-2, § 5.4" },
            { t: "La norme du séparateur demande plus pour la canalisation qui y arrive : <b>2 % au moins</b>, pour que la graisse ne s'accumule pas en route. Si c'est impossible, il faut des mesures contre les dépôts, décrites dans son annexe D.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
            { t: "Ces règles de la norme valent quand aucune règle locale ne dit autre chose. Le marché, lui, peut fixer sa propre valeur : à comparer avant le chantier.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
            { t: "Après le séparateur, c'est une évacuation ordinaire : la norme du séparateur n'y fixe pas de pente, les DTU donnent 1 %.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3 ; NF DTU 60.11 P2, § 6.3" },
            { t: "En local technique, une canalisation horizontale reste à 15 cm au moins du sol.", s: "norme", ref: "NF DTU 60.1 P1-1-2, § 5.4" }
          ],
          calcul: [
            { q: "Canalisation de 12 m jusqu'au séparateur : de combien descend-elle ?", op: "12 m × 2 cm par m =", res: "24 cm", t: "À 1 %, on n'aurait que 12 cm : vérifier sur la coupe que la hauteur existe.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" }
          ],
          comme: "Une gouttière trop plate : l'eau stagne, les feuilles se posent et tout se bouche.",
          retenir: "1 % pour une évacuation ordinaire, 2 % pour la canalisation qui arrive au séparateur." },

        { id: "raccords", titre: "Raccorder et ventiler", dessin: "sg_raccord",
          lignes: [
            { t: "Sur un collecteur horizontal, un fabricant de tubes conseille de brancher par des culottes à 45°, pas par des tés à 87°30 : moins de remous, moins de bouchons.", s: "fabricant", ref: "guide de pose d'un fabricant de tubes PVC d'évacuation" },
            { t: "Il conseille aussi deux coudes à 45° plutôt qu'un coude à 87°30, et un regard de visite en aval.", s: "fabricant", ref: "guide de pose d'un fabricant de tubes PVC d'évacuation" },
            { t: "Avant le séparateur, on passe de la verticale à l'horizontale par deux coudes à 45° séparés d'au moins 250 mm. Puis vient une longueur droite d'au moins 10 fois le diamètre, où l'eau se calme avant d'entrer.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
            { t: "Les siphons de sol de la cuisine ont un siphon, et un panier amovible si besoin. Un débourbeur ne reçoit jamais l'eau par une grille sur le dessus.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
            { t: "La canalisation d'arrivée se prolonge en ventilation primaire, et toute branche de plus de 5 m a sa ventilation secondaire.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.4" },
            { t: "Si la ventilation la plus proche est à plus de 10 m en amont, on en ajoute une, au plus près du séparateur.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.4" }
          ],
          calcul: [
            { q: "Arrivée en DN 110 : quelle longueur droite avant l'entrée ?", op: "10 × 110 mm =", res: "1,10 m", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" }
          ],
          comme: "Une bretelle d'autoroute : on s'insère dans le sens du trafic, pas à angle droit.",
          retenir: "Culottes à 45°, une longueur droite avant l'entrée, une ventilation de plus au-delà de 10 m." },

        { id: "materiaux", titre: "Quel tube pour des eaux grasses chaudes", dessin: "sg_thermo",
          lignes: [
            { t: "Un lave-vaisselle professionnel lave entre 55 et 65 °C et rince à 84 °C au moins, d'après la fiche d'un fabricant.", s: "fabricant", ref: "fiche d'un lave-vaisselle à capot" },
            { t: "Le DTU de plomberie décrit l'évacuation en fonte, en cuivre ou en PVC. Pour le PVC, les tubes suivent la NF EN 1329-1 ou la NF EN 1453-1.", s: "norme", ref: "NF DTU 60.1 P1-2, § 4.1 ; NF DTU 60.33 P1-2, § 3.1" },
            { t: "Un tube en PP ou en PE sort de cette liste : son emploi se lit dans son Avis Technique et dans la notice de son fabricant.", s: "norme", ref: "NF DTU 60.1 P1-2, § 4.1, qui ne cite que la fonte, le cuivre et le PVC" },
            { t: "Le <b>PVC pression</b> est un tube d'eau potable : son fabricant l'annonce pour l'adduction d'eau, à 40 °C en continu, et jusqu'à 45 °C en baissant la pression. Le DTU du PVC d'évacuation ne le cite pas comme tube.", s: "fabricant", ref: "fiche et page produit d'un fabricant de tubes PVC pression ; NF DTU 60.33 P1-2, § 3.1" },
            { t: "<b>PVC d'assainissement</b> : 45 °C en continu, 60 °C en pointe pendant 30 minutes une fois par jour, d'après un fabricant.", s: "fabricant", ref: "fiche d'un tube PVC d'assainissement gravitaire" },
            { t: "<b>PE d'évacuation</b> : jusqu'à 80 °C en continu, d'après son fabricant, qui l'assemble par soudure.", s: "fabricant", ref: "page produit d'un fabricant de tubes PE d'évacuation" },
            { t: "<b>PP d'évacuation insonorisé</b> : jusqu'à 90 °C en continu. Son fabricant l'admet pour les eaux grasses de restauration, si l'on remplace ses joints d'usine par des joints en NBR. Mais son Avis Technique ne vise pas les cuisines industrielles.", s: "fabricant", ref: "page produit d'un fabricant de tubes PP, lue le 6 novembre 2026 ; Avis Technique du même système, § 1.2.1 et § 2.3.1" },
            { t: "<b>Fonte</b> : un fabricant annonce une gamme à revêtement intérieur époxy pour les eaux grasses et les effluents chauds des cuisines collectives. Ses gammes ordinaires sont réservées à l'usage domestique.", s: "fabricant", ref: "catalogue 2025 d'un fabricant de tubes en fonte" }
          ],
          comme: "Une casserole en plastique sur le feu : le matériau compte autant que la forme.",
          retenir: "Lire l'usage et la température écrits par le fabricant, et l'Avis Technique pour le PP et le PE." },

        { id: "traversee", titre: "Traverser un plancher", dessin: "sg_co31",
          intro: "Le séparateur est souvent au sous-sol, sous la cuisine : la canalisation traverse alors un plancher. En ERP, le règlement dit ce que cette traversée doit tenir au feu.",
          lignes: [
            { t: "Entre deux niveaux, la règle vaut à toutes les traversées de plancher. Sur un même niveau, seulement pour certaines parois : recoupement des circulations, secteurs, compartiments, locaux à sommeil.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 5" },
            { t: "Jusqu'à 75 mm de diamètre nominal, rien n'est exigé.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 2" },
            { t: "De 75 à 315 mm, le conduit doit être <b>pare-flammes de traversée 30 minutes</b> : pendant ce temps, les flammes ne passent pas par lui. S'il est horizontal, <b>coupe-feu de traversée 15 minutes</b> suffit.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3" },
            { t: "C'est réputé acquis pour un conduit métallique qui fond au-dessus de 850 °C, comme la fonte, et pour un PVC classé B-s3,d0 et marqué NF Me jusqu'à 125 mm, avec un renfort.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3 ; fonte fondant au-dessus de 1 000 °C selon un fabricant" },
            { t: "Ce renfort peut être supprimé dans trois cas, dont les parois des locaux non réservés au sommeil.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3 et § 8" },
            { t: "Pour le PP ou le PE, rien n'est réputé acquis : il faut un collier ou un manchon intumescent dont le procès-verbal ou l'évaluation technique couvre ce matériau, ce diamètre et cette épaisseur de paroi.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3 et § 4 ; déclarations des performances de colliers coupe-feu" },
            { t: "Si la paroi sépare l'ERP d'un tiers, la traversée doit tenir aussi longtemps que la paroi.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 6" },
            { t: "Un fourreau coupe-feu pour câbles n'est pas un calfeutrement de tube : l'évaluation technique d'un tel fourreau ne vise que des câbles et des gaines électriques.", s: "fabricant", ref: "évaluation technique européenne d'un fourreau coupe-feu pour câbles, 2024, annexe C" }
          ],
          calcul: [
            { q: "Un tube PP de 110 mm descend de la cuisine au sous-sol : que faut-il ?", op: "plancher, 75 < 110 ≤ 315 mm, en PP :", res: "collier sous PV", t: "Un collier dont le PV couvre ce tube, ce diamètre et ce plancher.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3 à § 5" }
          ],
          comme: "Un trou dans un plafond de cave : si on le rebouche avec n'importe quoi, il sert de cheminée au feu.",
          retenir: "Au-dessus de 75 mm, une traversée de plancher en ERP doit tenir au feu : la fonte et le PVC NF Me sont réputés le faire, le PP et le PE demandent un collier sous PV." }
      ] },

      { titre: "L'entretenir", chapitres: [
        { id: "vidange", titre: "Vidanger", dessin: "sg_aspiration",
          lignes: [
            { t: "Sauf autre prescription, la norme demande de vider, nettoyer et remplir d'eau claire au moins une fois par mois, de préférence tous les quinze jours.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 8" },
            { t: "Les règlements d'assainissement fixent souvent leur propre rythme, et demandent de garder les justificatifs : factures, bordereaux, contrat d'entretien.", s: "texte", ref: "règlements d'assainissement de trois grandes collectivités" },
            { t: "Les graisses retirées sont un déchet : celui qui les produit tient un registre de ses déchets.", s: "texte", ref: "code de l'environnement, articles L541-1-1 et R541-43" },
            { t: "On vide tout, puis on remet en eau : une cuve en plastique laissée vide peut se déformer.", s: "fabricant", ref: "notice d'un séparateur en polyéthylène" },
            { t: "La vidange passe par une conduite fixe, du fond de la cuve à un raccord que le camion atteint. Les fabricants la prévoient en DN 65 à 80, plus grosse si elle est longue, la plus courte possible et sans coude de plus de 45°.", s: "fabricant", ref: "documentations de fabricants de séparateurs à graisses" },
            { t: "Plus le tuyau est petit, plus il freine l'aspiration : c'est la perte de charge, expliquée pour l'air dans <a href=\"fiche.html?f=bases-ventilation#charge\">la perte de charge</a>, et c'est la même idée pour l'eau.", s: "verifier" },
            { t: "Côté raccord pompier : un raccord DSP ne sert qu'au refoulement. Pour aspirer, il faut un raccord AR, qui n'existe qu'en DN 100 chez un fabricant.", s: "fabricant", ref: "fiche d'un fabricant de raccords symétriques" }
          ],
          calcul: [
            { q: "Combien de passage en plus en 100 mm qu'en 75 mm ?", op: "(100 ÷ 75)² =", res: "1,78", t: "Presque deux fois plus de section.", s: "verifier", ref: "calcul d'illustration" }
          ],
          comme: "Une paille fine et une grosse paille pour un milk-shake : avec la fine, il faut aspirer bien plus fort.",
          retenir: "Vidange au moins mensuelle puis remise en eau, par une conduite fixe et un raccord fait pour aspirer." },

        { id: "exemple", titre: "Un exemple de A à Z",
          intro: "Un restaurant en ERP sert 200 repas par jour, de 11 h à 23 h. Sa cuisine est au rez-de-chaussée, le séparateur au sous-sol. Cas inventé pour l'exemple.",
          calcul: [
            { q: "Quelle taille ?", op: "1,97 l/s × 1,3 pour les détergents = 2,56 :", res: "NS 4", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.1 ; débit par la méthode de la note de veille du GRAIE, 2006" },
            { q: "Le lave-vaisselle rince à 84 °C : et si l'eau arrive au séparateur à plus de 60 °C ?", op: "2,56 × 1,3 = 3,33 :", res: "toujours NS 4", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.2.2" },
            { q: "Quel diamètre d'arrivée ?", op: "NS 4 :", res: "DN 110", t: "Celui des entrées de la NS 4 dans une gamme posée au sol.", s: "fabricant", ref: "fiche d'une gamme de séparateurs à poser au sol" },
            { q: "Quelle pente ?", op: "canalisation qui arrive au séparateur :", res: "2 %", t: "Sauf règle locale, ou marché qui fixe autre chose : à trancher avant le chantier.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
            { q: "Quel tube ?", op: "eau chaude et grasse :", res: "fonte, ou plastique validé", t: "Fonte ou PVC d'évacuation du DTU, ou tube dont la notice et l'Avis Technique couvrent les eaux grasses et chaudes.", s: "norme", ref: "NF DTU 60.1 P1-2, § 4.1 ; notices des fabricants" },
            { q: "La traversée du plancher ?", op: "DN 110 en ERP, entre niveaux :", res: "pare-flammes 30 min", t: "Réputé acquis en fonte. Collier sous PV pour un plastique autre que le PVC NF Me.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31" },
            { q: "La vidange ?", op: "au moins une fois par mois :", res: "conduite fixe", t: "Jusqu'à un raccord d'aspiration accessible au camion.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.2 et § 8" }
          ],
          retenir: "Taille, diamètre, pente, tube, traversée, vidange : six questions, dans cet ordre." }
      ] }
    ]
  },

  essentiel: [
    { t: "Un <b>séparateur à graisses</b>, ou bac à graisses, retient les graisses des eaux de cuisine avant le réseau : le lourd tombe dans le débourbeur, les graisses flottent derrière une cloison, l'eau passe dessous.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 4 ; documentation d'un fabricant de séparateurs" },
    { t: "<b>C'est la collectivité qui l'impose</b>, par son règlement d'assainissement. La NF EN 1825-2 donne la méthode : NS = Qs × ft × fd × fr, puis la taille de la liste juste au-dessus.", s: "texte", ref: "code de la santé publique, article L1331-7-1 ; NF EN 1825-2, novembre 2002, § 6.1" },
    { t: "<b>La canalisation d'arrivée</b> : 2 % de pente au moins, une longueur droite avant l'entrée, une ventilation, et un tube dont le fabricant valide la chaleur et les graisses.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3 et § 7.4 ; notices des fabricants de tubes" },
    { t: "<b>L'entretien</b> : sauf autre prescription, vidange au moins une fois par mois, par une conduite fixe jusqu'à un raccord accessible au camion.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.2 et § 8" }
  ],

  chiffres: [
    { valeur: "2 %", libelle: "Pente minimale de la canalisation qui arrive au séparateur, contre 1 % pour une évacuation ordinaire.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3 ; NF DTU 60.11 P2, § 6.3" },
    { valeur: "× 1,3", libelle: "Majoration de la taille pour une eau au-dessus de 60 °C, et encore pour les détergents.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.2.2 et § 6.2.4" },
    { valeur: "75 mm", libelle: "Au-dessus, en ERP, une traversée de plancher doit être pare-flammes 30 minutes.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 2 et § 3" },
    { valeur: "1 mois", libelle: "Vidange, nettoyage et remise en eau au moins une fois par mois, de préférence tous les quinze jours.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 8" }
  ],

  decision: {
    titre: "En ERP, cette traversée doit-elle tenir au feu ?",
    depart: "q1",
    noeuds: {
      q1: { q: "Le conduit traverse-t-il une paroi qui sépare l'ERP d'un tiers ?", choix: [{ r: "Oui", vers: "v_tiers" }, { r: "Non", vers: "q2" }] },
      v_tiers: { verdict: "Coupe-feu de traversée égal au degré de la paroi", texte: "C'est la règle pour toute paroi entre l'ERP et un tiers : dispositif sous PV, ou gaine.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 6" },
      q2: { q: "Traverse-t-il un plancher, ou, sur un même niveau, une paroi de recoupement de circulation, de secteur, de compartiment ou de local à sommeil ?", choix: [{ r: "Oui", vers: "q3" }, { r: "Non", vers: "v_libre" }] },
      v_libre: { verdict: "CO 31 n'impose rien à cette traversée", texte: "Vérifier quand même le classement de la paroi sur les plans, et l'article CO 32 si le conduit fait plus de 125 mm et traverse un local à risques importants sans le desservir.", s: "texte", ref: "arrêté du 25 juin 1980, articles CO 31 § 5 et CO 32" },
      q3: { q: "Quel est son diamètre nominal ?", choix: [{ r: "75 mm ou moins", vers: "v_75" }, { r: "De 76 à 315 mm", vers: "q4" }, { r: "Plus de 315 mm", vers: "v_315" }] },
      v_75: { verdict: "Rien d'exigé", texte: "Aucun degré de résistance au feu n'est demandé jusqu'à 75 mm.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 2" },
      v_315: { verdict: "Gaine ou dispositif d'obturation", texte: "Une gaine incombustible dont le coupe-feu de traversée égale le degré de la paroi, 60 minutes au plus, ou un dispositif d'obturation automatique.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 4" },
      q4: { q: "En quoi est le conduit ?", choix: [{ r: "Fonte, ou autre métal fondant au-dessus de 850 °C", vers: "v_metal" }, { r: "PVC classé B-s3,d0, marqué NF Me, 125 mm au plus", vers: "q5" }, { r: "PP, PE, ou PVC hors de ces conditions", vers: "v_collier" }] },
      v_metal: { verdict: "Réputé pare-flammes 30 minutes", texte: "Le conduit satisfait l'exigence par lui-même. La fonte fond au-dessus de 1 000 °C, d'après un fabricant.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3 ; catalogue d'un fabricant de tubes en fonte" },
      q5: { q: "Est-on dans un des cas où le renfort peut être supprimé : bâtiment à simple rez-de-chaussée, bâtiment où l'encloisonnement des escaliers n'est pas exigé, paroi d'un local non réservé au sommeil ?", choix: [{ r: "Oui", vers: "v_pvc" }, { r: "Non", vers: "v_renfort" }] },
      v_pvc: { verdict: "Réputé pare-flammes 30 minutes, sans renfort", texte: "Le tube PVC NF Me suffit tel quel dans ces parois.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3" },
      v_renfort: { verdict: "Réputé pare-flammes 30 minutes, avec un renfort", texte: "Le renfort est en PVC du même classement, au moins aussi épais que le conduit, long comme la paroi plus un diamètre, placé sous un plancher, ou de part et d'autre d'un mur.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 8" },
      v_collier: { verdict: "Collier ou manchon intumescent sous PV", texte: "Rien n'est réputé acquis : il faut un dispositif dont le PV ou l'évaluation technique couvre ce matériau, ce diamètre et cette épaisseur de paroi. Pour un conduit horizontal, le texte admet un coupe-feu de traversée 15 minutes.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31 § 3 et § 4 ; déclarations des performances de colliers coupe-feu" }
    }
  },

  verifications: [
    { titre: "Au VISA", icone: "plan", points: [
      { t: "Note de calcul de la taille : Qs, ft, fd, fr, taille retenue, débourbeur d'au moins 100 litres par unité de taille.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.1 à § 6.4" },
      { t: "Fiche de chaque tube et raccord d'eaux grasses : usage et température écrits par le fabricant, Avis Technique pour le PP et le PE, joints adaptés aux graisses.", s: "fabricant", ref: "notices des fabricants ; NF DTU 60.1 P1-2, § 4.1" },
      { t: "Pente de la canalisation d'arrivée : 2 % selon la norme, ou ce que fixent le règlement local et le marché, tranché avant le chantier.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
      { t: "Ventilation primaire de l'arrivée, ventilation secondaire des branches de plus de 5 m, ventilation ajoutée si la plus proche est à plus de 10 m.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.4" },
      { t: "Traversées de plancher : dispositif dont le PV couvre le matériau et le diamètre prévus.", s: "texte", ref: "arrêté du 25 juin 1980, article CO 31" },
      { t: "Séparateur accessible au camion, hors gel, en local ventilé ; conduite d'aspiration et raccord adaptés au camion du vidangeur.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.2 ; documentations de fabricants" }
    ] },
    { titre: "Sur le chantier", icone: "casque", points: [
      { t: "Matériel posé identique au matériel visé.", s: "cas" },
      { t: "Pentes et fils d'eau relevés, et cotés sur le plan.", s: "cas" },
      { t: "En pied de chute, deux coudes à 45° séparés d'au moins 250 mm, puis 10 fois le diamètre en ligne droite avant l'entrée.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3" },
      { t: "Culottes à 45° sur les collecteurs, regards ou tampons de visite.", s: "fabricant", ref: "guide de pose d'un fabricant de tubes PVC d'évacuation" },
      { t: "Ni WC ni eaux de pluie raccordés ; siphons de sol avec siphon et panier.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.1 et § 7.3" },
      { t: "En local technique, canalisation horizontale à 15 cm au moins du sol.", s: "norme", ref: "NF DTU 60.1 P1-1-2, § 5.4" }
    ] },
    { titre: "À la réception", icone: "cle", points: [
      { t: "Cuve remplie d'eau claire, couvercles étanches et verrouillés.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 8 ; fiche d'un séparateur à poser au sol" },
      { t: "Raccordement du camion au raccord d'aspiration essayé.", s: "verifier" },
      { t: "DOE : plan coté avec fils d'eau et pentes, fiches et PV des produits réellement posés.", s: "cas" },
      { t: "Contrat de vidange et registre des enlèvements remis à l'exploitant.", s: "texte", ref: "code de l'environnement, article R541-43 ; règlements d'assainissement" }
    ] }
  ],

  pieges: [
    { t: "Le CCTP demande 1 % de pente vers le séparateur, la norme 2 % : à trancher avant le chantier, pas à la réception.", s: "cas" },
    { t: "Un tube PVC pression, fait pour l'eau potable, posé en évacuation d'eaux grasses : il n'est pas cité comme tube par le DTU du PVC d'évacuation, et son fabricant le limite à 40 °C en continu.", s: "cas" },
    { t: "Le fabricant d'un tube PP admet les eaux grasses avec des joints en NBR, mais l'Avis Technique de ce tube ne vise pas les cuisines industrielles : faire trancher l'écart par le contrôleur technique.", s: "fabricant", ref: "page produit d'un fabricant de tubes PP ; Avis Technique du même système, § 2.3.1" },
    { t: "Garder les joints d'usine sur un réseau d'eaux grasses, alors que le fabricant en demande d'autres pour cet usage.", s: "fabricant", ref: "page produit d'un fabricant de tubes PP" },
    { t: "Prévoir un fourreau coupe-feu de câbles pour un tube d'évacuation : son évaluation technique ne vise que des câbles et des gaines électriques.", s: "fabricant", ref: "évaluation technique européenne d'un fourreau coupe-feu pour câbles, 2024" },
    { t: "Des fiches techniques remises après la pose, avec une attestation de l'entreprise à la place de l'avis du fabricant.", s: "cas" },
    { t: "Changer la taille du séparateur sans reprendre les raccordements, la place au sol et la charge sur la dalle.", s: "fabricant", ref: "fiche d'une gamme de séparateurs à poser au sol" },
    { t: "Une conduite d'aspiration réduite à 75 mm, avec un raccord qui ne sert qu'au refoulement.", s: "cas" },
    { t: "Verser des bactéries ou des enzymes pour espacer les vidanges : la norme ne couvre pas ces additifs.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 1" }
  ],

  confondre: [
    { titre: "Séparateur à hydrocarbures", t: "Il retient les huiles minérales, d'un garage ou d'un parking. Le séparateur à graisses ne les traite pas.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 1 et § 7.1" },
    { titre: "Séparateur à fécules", t: "Il traite l'eau de l'éplucheuse, chargée d'amidon. Elle ne va jamais au séparateur à graisses.", s: "texte", ref: "règlement d'assainissement d'une métropole, article 16.01" },
    { titre: "Débourbeur", t: "Le premier compartiment, pour le lourd. Seul, il ne retient pas les graisses.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 6.4" },
    { titre: "Huiles de friture usagées", t: "Elles ne passent pas par le séparateur : elles sont collectées à part.", s: "texte", ref: "règlements d'assainissement de trois grandes collectivités" },
    { titre: "Poste de relevage", t: "Une pompe qui remonte l'eau vers le réseau. Il se place après le séparateur, assez loin pour ne pas mélanger de nouveau les graisses à l'eau.", s: "norme", ref: "NF EN 1825-2, novembre 2002, § 7.3 ; règlement d'assainissement d'une grande ville, article 17" }
  ],

  vu_sur: [
    { date: "Novembre 2026", contexte: "Restaurant en ERP dans un centre commercial, séparateur posé au sol en sous-sol", fait: "Le réseau d'eaux grasses posé n'était pas celui des fiches : un tube PP d'évacuation et un tube PVC pression, dont les fiches sont arrivées après la pose, avec une attestation de l'entreprise. Le plan n'avait ni cotes ni pentes. Le CCTP demandait 1 % de pente, la norme 2 %. L'aspiration était proposée en 75 mm au lieu de 100." }
  ],

  references: [
    { s: "texte", t: "Code de la santé publique : L1331-7-1 (eaux usées assimilées domestiques et prescriptions techniques de la collectivité), L1331-10 (eaux usées autres que domestiques), L1331-15. Arrêté du 21 décembre 2007, annexe I : la restauration parmi les activités assimilées domestiques." },
    { s: "texte", t: "Règlements d'assainissement des collectivités : ils imposent le séparateur aux restaurants et fixent la vidange et ses justificatifs. Trois règlements lus, éditions de 2013 à 2025. Règlement sanitaire départemental, article 29." },
    { s: "texte", t: "Règlement de sécurité ERP, arrêté du 25 juin 1980 : article CO 31, version du 8 octobre 2008, et article CO 32, pour les traversées. Les articles GC ne parlent pas des séparateurs." },
    { s: "texte", t: "Code de l'environnement : L541-1-1 (définition du déchet) et R541-43 (registre des déchets). Décret n° 2009-697 du 16 juin 2009, article 17 : les normes sont d'application volontaire. Cour de cassation, 3e chambre civile, 10 juin 2021, n° 20-15.277." },
    { s: "norme", t: "NF EN 1825-2, novembre 2002 : choix de la taille nominale, installation, service et entretien. Lue le 6 novembre 2026, reformulée ici. NF EN 1825-1, décembre 2004 : conception et tailles nominales, non lue." },
    { s: "norme", t: "NF DTU 60.11 P2 (pentes, § 6.1 et § 6.3), NF DTU 60.1 P1-1-2 (§ 5.4) et P1-2 (§ 4.1, matériaux), NF DTU 60.33 P1-2 (§ 3.1, tubes PVC) : lus le 6 novembre 2026." },
    { s: "expert", t: "GRAIE, note de veille normative sur le dimensionnement des séparateurs à graisses, 2006, d'après un guide du CNIDEP : méthode par nombre de repas et exemples chiffrés." },
    { s: "fabricant", t: "Notices et fiches du séparateur, des tubes et des colliers coupe-feu retenus, et Avis Technique des tubes hors DTU : ce sont eux qui fixent l'emploi réel du produit." }
  ]
};
