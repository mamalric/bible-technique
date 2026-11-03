/* Fiche : les bases de la ventilation, sous forme de cours pour un débutant. Les autres fiches y renvoient.
   Chaque affirmation : { t: texte, s: type de source (voir registre.js), ref: référence }.
   "comme" et "retenir" ne portent pas de badge : "comme" est une image sans chiffre ni règle, "retenir" redit une ligne badgée de l'étape.
   Guide INRS ED 695 lu dans son édition de 2015 (une édition de 2022 existe).
   Site public : aucun nom d'affaire, de client, d'entreprise ni de personne. */

(function () {
  var ED695 = "INRS, guide ED 695";
  var NT92 = "INRS, Hygiène et sécurité du travail n° 264, septembre 2021";
  var QAI = "INRS, page Qualité de l'air intérieur, mars 2024";
  var CEREMA = "Cerema Occitanie, colloque Bâtiment santé et rénovation, juin 2026";
  var RSD = "règlement sanitaire départemental type, article 64";

  window.BIBLE_FICHE = {
    id: "bases-ventilation",
    titre: "Les bases de la ventilation",
    soustitre: "Un cours en 17 étapes, sans aucun prérequis : pourquoi on change l'air, ce que veulent dire débit, pression et perte de charge, comment tout ça se calcule. Chaque mot est expliqué quand il arrive.",
    schema: "ventilation",

    cours: {
      intro: "Une étape à la fois, dans l'ordre : chacune s'appuie sur la précédente. Compter une à deux minutes par étape. Le schéma ci-dessus montre le trajet complet, le cours explique le pourquoi.",
      parties: [
        { titre: "Pourquoi ventiler", chapitres: [
          { id: "ventiler", titre: "Ventiler, c'est quoi ?", dessin: "air",
            lignes: [
              { t: "<b>Ventiler</b>, c'est changer l'air d'un local : de l'air propre entre, de l'air sale sort.", s: "texte", ref: "code du travail, article R4222-1" },
              { t: "L'<b>air neuf</b> est pris dehors, loin des pollutions. L'<b>air vicié</b> est celui qui s'est chargé dans le local. Une fois rejeté dehors, on l'appelle <b>air extrait</b>.", s: "expert", ref: ED695 + ", lexique ; " + CEREMA },
              { t: "Le but est fixé par le code du travail : garder un air sain, éviter la chaleur excessive, les mauvaises odeurs et la condensation.", s: "texte", ref: "code du travail, article R4222-1" },
              { t: "Ouvrir une fenêtre renouvelle aussi l'air, mais le débit dépend alors du vent et de la température : c'est la <b>ventilation naturelle</b>.", s: "texte", ref: "code du travail, article R4222-3" },
              { t: "Ventiler ne chauffe pas et ne refroidit pas. Il faut pour cela un appareil en plus, ou de l'air déjà traité.", s: "verifier" }
            ],
            comme: "Une baignoire avec le robinet ouvert et la bonde ouverte : l'eau se renouvelle sans cesse, sans que le niveau change.",
            retenir: "Ventiler, c'est changer l'air. Pas le chauffer." },

          { id: "air-sale", titre: "Pourquoi l'air se salit ?", dessin: "sources",
            lignes: [
              { t: "Rien qu'en respirant, les occupants rejettent du <b>dioxyde de carbone</b> (CO2) et de la <b>vapeur d'eau</b>.", s: "expert", ref: QAI },
              { t: "Le bâtiment émet aussi : matériaux, mobilier, produits d'entretien, chauffage, climatisation, appareils de bureau.", s: "expert", ref: QAI },
              { t: "L'extérieur et le sol en apportent : trafic, pollens, et radon par le sol, surtout en sous-sol et au rez-de-chaussée.", s: "expert", ref: QAI },
              { t: "Sans renouvellement, tout cela s'accumule. L'air neuf <b>dilue</b> : il fait baisser la concentration.", s: "expert", ref: NT92 },
              { t: "Le code du travail distingue deux familles. <b>Pollution non spécifique</b> : due à la seule présence humaine, comme un bureau. <b>Pollution spécifique</b> : gaz, vapeurs, poussières, fumées, ainsi que tous les sanitaires.", s: "texte", ref: "code du travail, article R4222-3" }
            ],
            comme: "Une goutte de sirop dans un verre d'eau : plus on rajoute d'eau, moins ça a de goût. Le sirop est toujours là, mais dilué.",
            retenir: "L'air se salit dès qu'il y a du monde. La ventilation dilue." },

          { id: "co2", titre: "Le CO2, témoin de l'air", dessin: "co2",
            lignes: [
              { t: "<b>ppm</b> veut dire parties par million. 1 000 ppm, c'est 1 litre de CO2 dans 1 000 litres d'air, soit 1 pour mille.", s: "expert", ref: NT92 },
              { t: "Dehors, il y a environ 400 ppm. Une personne assise au bureau rejette environ 20 litres de CO2 par heure.", s: "expert", ref: NT92 },
              { t: "On suit le CO2 parce qu'il est un bon <b>témoin</b> : sa teneur dans un local occupé dit si l'air est assez renouvelé.", s: "expert", ref: QAI },
              { t: "Le règlement sanitaire demande de rester sous 1 000 ppm, avec une tolérance à 1 300 ppm.", s: "texte", ref: RSD }
            ],
            calcul: [
              { q: "D'où vient le chiffre de 25 m³/h par personne ?", op: "16,2 l/h ÷ (1 000 − 300 ppm) =", res: "23 m³/h", t: "C'est le calcul de 1985 : ce qu'une personne rejette, divisé par la hausse de CO2 admise. Il a été arrondi à 25.", s: "expert", ref: NT92 },
              { q: "Et avec les chiffres d'aujourd'hui ?", op: "20,2 l/h ÷ (1 000 − 400 ppm) =", res: "34 m³/h", t: "Il y a plus de CO2 dehors qu'en 1985, et le rejet d'une personne avait été sous-estimé.", s: "expert", ref: NT92 },
              { q: "Que recommande l'INRS ?", op: "dans le tertiaire, au moins", res: "50 m³/h par occupant", t: "Pour ne pas dépasser de plus de 400 ppm le niveau de dehors. Le minimum légal reste 25 m³/h dans un bureau.", s: "expert", ref: QAI + " ; code du travail, article R4222-6" }
            ],
            comme: "Le CO2 est un voyant sur le tableau de bord : ce n'est pas la panne, c'est le signe qu'il faut regarder.",
            retenir: "Le 25 m³/h par personne vient d'un calcul sur le CO2. C'est un minimum, pas un objectif." },

          { id: "debit", titre: "Un débit, c'est quoi ?", dessin: "debit",
            lignes: [
              { t: "Le <b>débit</b> est le volume d'air qui passe en un temps donné, le plus souvent en mètres cubes par heure (m³/h). 1 m³, c'est un cube de 1 m de côté : 30 m³/h, c'est 30 de ces cubes chaque heure.", s: "expert", ref: ED695 + ", paragraphe 4.1.1" },
              { t: "Pour un local : nombre d'occupants × débit par occupant. 12 personnes × 30 m³/h = 360 m³/h.", s: "texte", ref: "code du travail, article R4222-6" },
              { t: "Trois unités reviennent : m³/h, l/s et m³/s. 1 l/s = 3,6 m³/h. 1 m³/s = 3 600 m³/h. Le règlement sanitaire compte en l/s : 5 l/s valent 18 m³/h.", s: "texte", ref: RSD },
              { t: "Le <b>taux de renouvellement</b> (vol/h) est le débit divisé par le volume du local. 360 m³/h dans 75 m³ : 4,8 vol/h.", s: "expert", ref: NT92 },
              { t: "Ce taux ne suffit pas pour juger. Pour une même source de pollution, c'est le débit qui fixe la teneur atteinte à terme, pas le volume du local.", s: "expert", ref: ED695 + ", paragraphe 8.2" }
            ],
            comme: "Un robinet : le débit, c'est le nombre de litres qui coulent par minute. Une baignoire plus grande se remplit moins vite, mais le robinet n'a pas changé.",
            retenir: "Le débit dit combien d'air passe. On le calcule en premier : tout le reste en découle." }
        ] },

        { titre: "Comment ça marche", chapitres: [
          { id: "pieces", titre: "Les pièces du système",
            intro: "Sur le trajet du schéma du haut, on retrouve toujours les mêmes pièces. Voici leur nom et leur rôle, pour pouvoir lire un plan ou un CCTP.",
            tuiles: [
              { ico: "prise", titre: "Prise d'air", t: "Ouverture à lames inclinées, qui prend l'air neuf et arrête la pluie.", s: "expert", ref: ED695 + ", lexique (louvre)" },
              { ico: "filtre", titre: "Filtre", t: "Arrête les particules contenues dans l'air. Il s'encrasse et se change.", s: "expert", ref: ED695 + ", lexique et paragraphe 4.1.3" },
              { ico: "batterie", titre: "Batterie", t: "Tubes à ailettes parcourus par un fluide, ou résistances. Elle change la température de l'air.", s: "expert", ref: ED695 + ", lexique" },
              { ico: "ventilateur", titre: "Ventilateur", t: "Machine qui donne à l'air l'énergie de circuler dans le réseau.", s: "expert", ref: ED695 + ", paragraphe 5.1" },
              { ico: "gaine", titre: "Gaine", t: "Conduit qui transporte l'air, souvent en tôle ou en plastique, parfois maçonné.", s: "expert", ref: ED695 + ", lexique" },
              { ico: "piquage", titre: "Piquage", t: "Branchement d'une petite gaine sur une gaine principale.", s: "expert", ref: ED695 + ", lexique" },
              { ico: "registre", titre: "Registre, ou volet", t: "Pièce mobile qui ferme une gaine en partie ou en entier. Il sert à régler la répartition de l'air.", s: "expert", ref: ED695 + ", lexique (clapet, volet)" },
              { ico: "clapet", titre: "Clapet coupe-feu", t: "Ferme la gaine en cas d'incendie, là où elle traverse une paroi coupe-feu. Voir la <a href=\"fiche.html?f=clapet-coupe-feu\">fiche clapet coupe-feu</a>.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.2" },
              { ico: "silencieux", titre: "Silencieux", t: "Placé dans le flux d'air, il réduit le bruit qui voyage dans les gaines.", s: "expert", ref: ED695 + ", lexique" },
              { ico: "bouche", titre: "Bouche, ou grille", t: "Par où l'air est soufflé, repris ou extrait. Elle l'oriente et parfois règle son débit.", s: "expert", ref: ED695 + ", lexique" },
              { ico: "echangeur", titre: "Échangeur", t: "Fait passer la chaleur d'un air à un autre, sans contact entre les deux.", s: "expert", ref: ED695 + ", lexique" },
              { ico: "caisson", titre: "Caisson, CTA", t: "Boîte qui assemble ces pièces. La <b>centrale de traitement d'air</b> (CTA) en est la version complète.", s: "expert", ref: ED695 + ", lexique ; " + CEREMA }
            ],
            comme: "Une chaîne de montage pour l'air : il entre brut, on le nettoie, on le met à température, on le pousse, on le livre.",
            retenir: "Prise d'air, filtre, batterie, ventilateur, gaine, bouche : c'est presque toujours le même chemin." },

          { id: "pression", titre: "Pourquoi l'air bouge : la pression", dessin: "pression",
            lignes: [
              { t: "L'air va de l'endroit où la pression est haute vers l'endroit où elle est basse. Le ventilateur sert à créer cet écart.", s: "verifier" },
              { t: "La pression se compte en <b>pascals</b> (Pa). En ventilation, on la compare à celle de l'endroit d'à côté : on parle de pression relative.", s: "expert", ref: ED695 + ", paragraphe 4.1.1" },
              { t: "Un pascal, c'est très peu : 1 Pa vaut environ 0,1 mm d'eau, et l'atmosphère pèse environ 101 300 Pa.", s: "expert", ref: ED695 + ", paragraphe 4.1.1 et annexe 2" },
              { t: "<b>Dépression</b> : moins de pression que les voisins, l'air rentre. <b>Surpression</b> : plus de pression, l'air sort.", s: "expert", ref: ED695 + ", chapitre 7 ; " + CEREMA },
              { t: "Ordres de grandeur : 10 à 20 Pa entre un labo et ses voisins ; moins de 250 Pa pour un ventilateur hélicoïde simple ; davantage pour un centrifuge.", s: "expert", ref: "INRS, guide ED 795, paragraphe 5.1 ; " + ED695 + ", paragraphe 5.3" }
            ],
            comme: "Une paille : en aspirant, on baisse la pression dans la bouche, et la boisson monte vers cette pression plus basse.",
            retenir: "Pas d'écart de pression, pas de mouvement d'air. Dépression : l'air rentre. Surpression : l'air sort." },

          { id: "compensation", titre: "Tout ce qui sort doit rentrer", dessin: "compensation",
            lignes: [
              { t: "Un local est un volume fermé : il y entre forcément autant d'air qu'il en sort.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
              { t: "Si rien n'est prévu, l'air passe où il peut : portes, défauts d'étanchéité. C'est la compensation <b>sauvage</b>.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
              { t: "S'il manque trop d'air, le local se met en dépression, le ventilateur peine et le débit baisse.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
              { t: "On organise donc une entrée d'air : une grille, ou un ventilateur de soufflage. C'est l'<b>air de compensation</b>.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
              { t: "Un manque d'air crée aussi des courants d'air, des portes dures à ouvrir, et peut gêner les appareils à combustion.", s: "expert", ref: ED695 + ", paragraphe 7.1" }
            ],
            comme: "Aspirer dans une bouteille vide et fermée : elle se pince, et plus rien ne vient. Un petit trou, et ça repart.",
            retenir: "Toute extraction a son entrée d'air, prévue et dessinée." },

          { id: "systemes", titre: "Les quatre façons de ventiler", dessin: "systemes",
            lignes: [
              { t: "<b>Naturelle</b> : pas de ventilateur. Le vent et l'écart de température font le travail. Grille basse pour entrer, grille haute ou conduit pour sortir.", s: "texte", ref: "code du travail, article R4222-3 ; " + CEREMA },
              { t: "<b>Simple flux par extraction</b> : un ventilateur aspire, l'air neuf rentre seul par les entrées d'air. Le bâtiment est en dépression. C'est la <b>VMC</b>, ventilation mécanique contrôlée.", s: "expert", ref: CEREMA },
              { t: "En logement, l'air entre par les pièces principales et sort par les pièces de service : cuisine, salle de bains, WC.", s: "texte", ref: "arrêté du 24 mars 1982, article 1" },
              { t: "<b>Simple flux par insufflation</b> : un ventilateur souffle de l'air neuf, qu'on peut filtrer et préchauffer. Le bâtiment est en surpression.", s: "expert", ref: CEREMA },
              { t: "<b>Double flux</b> : un ventilateur souffle, un autre extrait, et un échangeur récupère de la chaleur. Plus cher, plus lourd à entretenir, et il demande un bâtiment étanche.", s: "expert", ref: CEREMA }
            ],
            comme: "Naturelle : un courant d'air. Extraction : une paille qui aspire. Insufflation : un ballon qu'on gonfle. Double flux : les deux à la fois.",
            retenir: "On aspire, on souffle, ou les deux. Le signe de la pression suit." },

          { id: "capter", titre: "Diluer ou capter", dessin: "capter",
            lignes: [
              { t: "<b>Ventilation générale</b> : elle renouvelle l'air de tout le local. Le polluant se mélange à l'air, puis il est évacué.", s: "expert", ref: "INRS, guide ED 657, paragraphe 1.1 ; " + ED695 + ", paragraphe 8.1" },
              { t: "<b>Ventilation locale</b>, ou <b>captage</b> : le polluant est aspiré dès son émission, avant de se disperser. Une hotte ou une sorbonne en sont des exemples.", s: "expert", ref: "INRS, guide ED 657, paragraphe 1.1 ; " + ED695 + ", lexique" },
              { t: "L'ordre est imposé : supprimer l'émission si on peut, sinon la capter au plus près, et finir par la ventilation générale.", s: "texte", ref: "code du travail, article R4222-12" },
              { t: "La ventilation générale seule ne convient qu'à une pollution non spécifique. Avec des produits, on cherche toujours le captage.", s: "expert", ref: ED695 + ", paragraphe 8.1" },
              { t: "L'air doit aller de la personne vers la source, puis vers l'aspiration : la personne ne se place jamais entre les deux.", s: "expert", ref: ED695 + ", principe III" }
            ],
            comme: "Griller du poisson la fenêtre ouverte, c'est diluer. Le griller sous une hotte qui marche, c'est capter.",
            retenir: "Capter à la source d'abord, diluer ensuite. C'est ce que fait une <a href=\"fiche.html?f=sorbonne\">sorbonne</a>." },

          { id: "local", titre: "Où va l'air dans le local ?", dessin: "balayage",
            lignes: [
              { t: "On cherche un passage des zones propres vers les zones polluées, et on évite les coins où l'air ne bouge pas.", s: "expert", ref: ED695 + ", paragraphe 8.1" },
              { t: "Là où vivent les gens, l'air doit rester lent : sous 0,2 m/s environ pour rester confortable.", s: "expert", ref: NT92 },
              { t: "Pour passer d'un local à l'autre, l'air a besoin d'un chemin : le plus souvent un jour sous la porte, le <b>détalonnage</b>, ou une grille de transfert.", s: "verifier" },
              { t: "Dehors aussi : le rejet reste loin de la prise d'air neuf, sinon on réaspire ce qu'on vient de jeter.", s: "expert", ref: ED695 + ", chapitre 6" }
            ],
            comme: "Une goutte de colorant dans un bac d'eau qu'on brasse : elle ne fait pas un trajet net, elle se répand partout.",
            retenir: "L'air se mélange. On place les bouches pour qu'il traverse la zone occupée, sans court-circuit." }
        ] },

        { titre: "Dimensionner", chapitres: [
          { id: "vitesse", titre: "Débit, vitesse, section", dessin: "vitesse",
            lignes: [
              { t: "<b>Vitesse = débit ÷ section.</b> La vitesse est en mètres par seconde (m/s), le débit en m³/s, la section en m².", s: "expert", ref: ED695 + ", paragraphe 4.1.1" },
              { t: "Gaine ronde : section = π × diamètre² ÷ 4. Gaine rectangulaire : largeur × hauteur. Sur un plan, 400 × 200 veut dire 400 mm sur 200 mm.", s: "verifier" },
              { t: "Trop vite, ça fait du bruit et ça coûte de la pression. Repères de l'INRS, en locaux industriels et air non chargé : 5 m/s à 540 m³/h, 6 m/s à 1 800 m³/h.", s: "expert", ref: ED695 + ", tableau IX" },
              { t: "C'est toujours un compromis : une grosse gaine coûte de la place et de l'argent, une petite coûte du bruit et de l'énergie.", s: "expert", ref: ED695 + ", chapitre 4" }
            ],
            calcul: [
              { q: "Passer le débit en m³/s", op: "360 m³/h ÷ 3 600 =", res: "0,10 m³/s", s: "expert", ref: ED695 + ", paragraphe 4.1.1" },
              { q: "Calculer la section d'une gaine de 200 mm", op: "π × 0,20² ÷ 4 =", res: "0,031 m²", s: "expert", ref: ED695 + ", paragraphe 4.1.1" },
              { q: "En déduire la vitesse", op: "0,10 ÷ 0,031 =", res: "3,2 m/s", s: "expert", ref: ED695 + ", paragraphe 4.1.1" }
            ],
            comme: "Le pouce sur le tuyau d'arrosage : même eau, moins de passage, donc ça sort plus vite.",
            retenir: "Même débit, diamètre divisé par 2 : section divisée par 4, vitesse multipliée par 4." },

          { id: "charge", titre: "La perte de charge : ce qui freine l'air", dessin: "charge",
            lignes: [
              { t: "L'air frotte sur les parois et se heurte aux obstacles. Cela lui coûte de la pression : c'est la <b>perte de charge</b>, en pascals.", s: "expert", ref: ED695 + ", paragraphe 4.1.3" },
              { t: "Deux familles : le frottement le long des gaines, en Pa par mètre, et les obstacles, dits <b>singuliers</b> : coudes, raccords, grilles, filtres, batteries, silencieux.", s: "expert", ref: ED695 + ", paragraphe 4.1.3" },
              { t: "Le frottement suit le carré de la vitesse : vitesse doublée, perte de charge multipliée par 4.", s: "expert", ref: ED695 + ", paragraphe 4.1.3" },
              { t: "Exemple pour 1 m³/s : en Ø 400, 8 m/s et 1,8 Pa/m ; en Ø 200, 32 m/s et 55 Pa/m.", s: "expert", ref: ED695 + ", tableau VII" },
              { t: "Le matériau compte : en Ø 400 et à 1 m³/s, 1,6 Pa/m en acier galvanisé, 10 Pa/m en gaine souple annelée.", s: "expert", ref: ED695 + ", tableau VIII" },
              { t: "Le débit réel se lit au croisement de deux courbes : ce que donne le ventilateur et ce que demande le réseau. C'est le <b>point de fonctionnement</b>.", s: "expert", ref: ED695 + ", paragraphe 5.2" }
            ],
            comme: "Souffler dans une paille : plus elle est fine, longue et pliée, plus il faut forcer pour le même souffle.",
            retenir: "Un coude ou un filtre sale en plus, et le débit baisse, sans aucune alarme." },

          { id: "ventilateur", titre: "Le ventilateur", dessin: "ventilateur",
            lignes: [
              { t: "On le choisit pour donner un certain débit sous une certaine pression, celle que demande le réseau.", s: "expert", ref: ED695 + ", paragraphe 5.1" },
              { t: "<b>Hélicoïde</b>, ou axial : l'air le traverse tout droit. Gros débit, faible pression. En général plus bruyant, mais moins encombrant et moins cher.", s: "expert", ref: ED695 + ", paragraphe 5.3" },
              { t: "<b>Centrifuge</b> : l'air entre au centre et ressort sur le côté. Bien adapté aux réseaux longs ou ramifiés.", s: "expert", ref: ED695 + ", paragraphe 5.3" },
              { t: "S'il tourne moins vite, le débit suit la vitesse, la pression son carré, la puissance son cube : à mi-vitesse, 8 fois moins de puissance.", s: "expert", ref: ED695 + ", paragraphe 5.1" },
              { t: "Un réseau mal étudié coûte cher : pour un même captage, l'INRS compare deux réseaux, et le moins étudié consomme 3,35 fois plus par an.", s: "expert", ref: ED695 + ", annexe 1" },
              { t: "À la pose : pas de coude juste à l'aspiration, des raccords souples et des supports antivibratiles.", s: "expert", ref: ED695 + ", paragraphe 5.3" }
            ],
            calcul: [
              { q: "Quelle puissance ?", op: "débit (m³/s) × pression (Pa) ÷ rendement", res: "en watts", t: "Exemple de l'INRS : 0,67 m³/s × 652 Pa ÷ 0,5 = 874 W sur l'arbre du ventilateur.", s: "expert", ref: ED695 + ", annexe 1" }
            ],
            comme: "Le ventilateur de table brasse beaucoup d'air, mais il cale si on lui ajoute un tuyau. La turbine d'un aspirateur force l'air dans un long tuyau.",
            retenir: "Hélicoïde pour beaucoup d'air sans réseau. Centrifuge dès qu'il y a de la gaine." },

          { id: "energie", titre: "L'air neuf, il faut le chauffer", dessin: "energie",
            lignes: [
              { t: "En hiver, l'air neuf arrive froid. Il faut le chauffer, sinon il crée des courants d'air inconfortables.", s: "expert", ref: ED695 + ", paragraphes 7.1 et 7.2" },
              { t: "Puissance en watts = 0,34 × débit en m³/h × écart de température en °C. 1 000 m³/h, de −7 à 19 °C : 0,34 × 1 000 × 26 = 8,8 kW.", s: "verifier", ref: "0,34 Wh/m³.K : valeur d'usage, cohérente avec 1,20 kg/m³ (ED 695) ; source non relue" },
              { t: "Le double flux récupère une partie de cette chaleur dans l'air qui part, grâce à un échangeur.", s: "expert", ref: NT92 + " ; " + ED695 + ", chapitre 6" },
              { t: "Pour économiser, on ne baisse pas l'air neuf sous le minimum réglementaire.", s: "expert", ref: "INRS, page Ventilation et sobriété énergétique, avril 2023" },
              { t: "La ventilation mécanique peut être arrêtée quand le local est vide, à condition de repartir avant l'arrivée des occupants.", s: "expert", ref: "INRS, aide-mémoire juridique TJ 5, articles R4222-6 et R4222-8" },
              { t: "L'air <b>recyclé</b>, repris dans le local et réintroduit, peut s'ajouter à l'air neuf, jamais le remplacer.", s: "texte", ref: "code du travail, article R4222-3 ; " + RSD }
            ],
            comme: "Laisser une fenêtre ouverte en hiver, c'est chauffer dehors. L'échangeur, c'est passer la chaleur de l'air qui part à l'air qui arrive, comme deux tuyaux collés l'un à l'autre.",
            retenir: "Chaque m³ d'air neuf se paie en chauffage. Mais il reste obligatoire." }
        ] },

        { titre: "En pratique", chapitres: [
          { id: "regles", titre: "Qui impose quoi ?",
            intro: "Le bon texte dépend de qui occupe le local et de ce qu'on y fait. L'<a href=\"#arbre\">arbre de décision plus bas</a> donne le chiffre.",
            tuiles: [
              { ico: "travail", titre: "Lieu de travail", t: "Code du travail. Air neuf par occupant : 25 m³/h en bureau, 30 en réunion, vente ou restauration, 45 ou 60 en atelier.", s: "texte", ref: "code du travail, article R4222-6" },
              { ico: "public", titre: "Locaux hors habitation, comme une classe", t: "Règlement sanitaire départemental. Un texte par département, avec un tableau en l/s.", s: "texte", ref: RSD },
              { ico: "logement", titre: "Logement", t: "Arrêté du 24 mars 1982. Débits extraits par logement, selon le nombre de pièces.", s: "texte", ref: "arrêté du 24 mars 1982, articles 1 à 4" },
              { ico: "polluant", titre: "Local avec des polluants", t: "Code du travail : supprimer, capter, puis ventiler. Le débit dépend des polluants, jamais sous les minimums.", s: "texte", ref: "code du travail, articles R4222-11 et R4222-12" },
              { ico: "conseil", titre: "Conseil, pas obligation", t: "L'INRS recommande au moins 50 m³/h par occupant dans le tertiaire, avec une ventilation mécanique centralisée de préférence.", s: "expert", ref: QAI },
              { titre: "Plusieurs textes à la fois", t: "Un même local peut relever de plusieurs textes : une classe a aussi du personnel. On retient alors le plus exigeant.", s: "verifier" }
            ],
            retenir: "D'abord : qui occupe le local et qu'y fait-on ? Le texte et le chiffre en découlent." },

          { id: "exemple", titre: "Un exemple de A à Z", dessin: "salle",
            intro: "Une salle de réunion de 12 personnes, 30 m² et 2,5 m sous plafond, soit 75 m³. Pas de produit : pollution non spécifique.",
            calcul: [
              { q: "Quel texte ?", op: "lieu de travail, salle de réunion :", res: "30 m³/h par occupant", s: "texte", ref: "code du travail, article R4222-6" },
              { q: "Quel débit ?", op: "12 × 30 =", res: "360 m³/h", t: "Avec le conseil de l'INRS, 12 × 50 = 600 m³/h.", s: "texte", ref: "code du travail, article R4222-6 ; " + QAI },
              { q: "Comment faire entrer et sortir l'air ?", op: "double flux :", res: "360 m³/h soufflés, 360 repris", t: "Il doit sortir autant d'air qu'il en entre.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
              { q: "Quelle gaine ?", op: "0,10 m³/s, repère de 4,6 m/s environ :", res: "Ø 200, soit 3,2 m/s", t: "En Ø 160, on serait à 5 m/s, au-dessus du repère. Il s'agit d'un repère pour locaux industriels : dans une salle de réunion, on vise plutôt large.", s: "expert", ref: ED695 + ", tableau IX" },
              { q: "Quel ventilateur ?", op: "0,10 m³/s × 150 Pa ÷ 0,5 =", res: "30 W", t: "Les 150 Pa sont une valeur d'illustration : en vrai, on additionne gaines, coudes, filtre et bouches.", s: "verifier" },
              { q: "Combien pour chauffer l'air ?", op: "0,34 × 360 × 26 =", res: "3,2 kW", t: "Avec un échangeur à 70 %, il reste environ 1 kW. Hypothèses : −7 °C dehors, 19 °C soufflés.", s: "verifier" },
              { q: "Comment vérifier ?", op: "à la mise en service :", res: "mesurer les débits", t: "Ces mesures servent ensuite de valeurs de référence pour les contrôles.", s: "expert", ref: ED695 + ", tableau XI" }
            ],
            retenir: "Qui ? Combien ? Par où ? Quelle gaine ? Quel ventilateur ? Quelle énergie ? Toujours dans cet ordre." },

          { id: "entretien", titre: "Entretenir et contrôler", dessin: "entretien",
            lignes: [
              { t: "Une ventilation dérive sans prévenir : usure ou colmatage du ventilateur, dépôts dans les gaines, registres déplacés, filtres encrassés.", s: "expert", ref: ED695 + ", paragraphes 4.1.3 et 10.8" },
              { t: "Après la mise en service, on mesure des <b>valeurs de référence</b>, débits et pressions. Elles servent de point de comparaison à chaque contrôle.", s: "expert", ref: ED695 + ", tableau XI" },
              { t: "Tout est consigné dans le <b>dossier d'installation</b> : plans, calculs, valeurs de référence, résultats des contrôles.", s: "expert", ref: ED695 + ", paragraphe 10.7 ; INRS, guide ED 6008" },
              { t: "Le maître d'ouvrage remet une notice, l'employeur rédige une consigne d'utilisation.", s: "texte", ref: "code du travail, articles R4212-7 et R4222-21" },
              { t: "Le contrôle a lieu au moins une fois par an.", s: "texte", ref: "arrêté du 8 octobre 1987, d'après INRS, focus juridique de juillet 2025" }
            ],
            comme: "Le contrôle technique d'une voiture : elle roule toujours, mais seule la mesure dit si c'est encore bon.",
            retenir: "Sans mesure, on ne sait pas. Une référence à la mise en service, un contrôle chaque année." }
        ] }
      ]
    },

    essentiel: [
      { t: "<b>Ventiler</b>, c'est remplacer l'air d'un local : de l'air neuf entre, de l'air vicié sort. Le but est un air propre, sans chaleur excessive, sans odeurs, sans condensation.", s: "texte", ref: "code du travail, article R4222-1" },
      { t: "<b>Tout ce qui sort doit rentrer.</b> Le local est un volume fermé : sans entrée d'air, le ventilateur tourne sans déplacer le débit prévu. C'est la compensation.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
      { t: "<b>Débit = vitesse × section.</b> Le débit, en m³/h, dit combien d'air passe. On le fixe d'abord, par personne ou selon les polluants, puis on choisit la gaine.", s: "expert", ref: ED695 + ", paragraphe 4.1.1 ; code du travail, articles R4222-6 et R4222-11" },
      { t: "<b>La perte de charge</b> est la pression perdue en frottement dans les gaines, les coudes et les filtres. Le ventilateur doit la vaincre : si elle augmente, le débit baisse.", s: "expert", ref: ED695 + ", paragraphes 4.1.3 et 5.2" }
    ],

    chiffres: [
      { valeur: "25 m³/h", libelle: "Air neuf minimal par occupant dans un bureau, en ventilation mécanique. 30 en réunion, vente, restauration ; 45 ou 60 en atelier.", s: "texte", ref: "code du travail, article R4222-6" },
      { valeur: "18 m³/h", libelle: "Air neuf par occupant d'un bureau selon le RSD : 5 l/s. Le texte compte en litres par seconde : 1 l/s = 3,6 m³/h.", s: "texte", ref: RSD + " (lu dans un RSD départemental)" },
      { valeur: "1 000 ppm", libelle: "CO2 à ne pas dépasser dans un local occupé : 1 pour mille, avec une tolérance à 1,3 pour mille.", s: "texte", ref: RSD },
      { valeur: "× 4", libelle: "Vitesse doublée, perte de charge quadruplée : les frottements suivent le carré de la vitesse.", s: "expert", ref: ED695 + ", paragraphe 4.1.3" }
    ],

    decision: {
      titre: "Quel débit d'air neuf ?",
      depart: "q1",
      noeuds: {
        q1: { q: "Dans le local, y a-t-il d'autres pollutions que la présence humaine : produits, poussières, fumées, ou est-ce un sanitaire ?", choix: [{ r: "Oui", vers: "v_spec" }, { r: "Non", vers: "q2" }] },
        v_spec: { verdict: "Local à pollution spécifique", texte: "D'abord supprimer l'émission, sinon la capter au plus près, et finir par la ventilation générale. Le débit dépend de la nature et de la quantité des polluants et de la chaleur à évacuer, sans descendre sous les valeurs de l'article R4222-6.", s: "texte", ref: "code du travail, articles R4222-3, R4222-11 et R4222-12" },
        q2: { q: "Est-ce un logement ?", choix: [{ r: "Oui", vers: "v_log" }, { r: "Non", vers: "q3" }] },
        v_log: { verdict: "Débits extraits par logement", texte: "Air entrant par les pièces principales, sortant par les pièces de service. En cuisine, 75 à 135 m³/h selon le nombre de pièces ; salle de bains, 15 ou 30 m³/h. Débit total réductible à 35 à 135 m³/h de 1 à 7 pièces.", s: "texte", ref: "arrêté du 24 mars 1982, articles 1 à 4" },
        q3: { q: "Quel usage ?", choix: [{ r: "Bureau, sans travail physique", vers: "v25" }, { r: "Réunion, vente, restauration", vers: "v30" }, { r: "Atelier, travail physique léger", vers: "v45" }, { r: "Autre atelier", vers: "v60" }, { r: "Classe, chambre (public)", vers: "v_rsd" }] },
        v25: { verdict: "25 m³/h par occupant", texte: "Le RSD demande 18 m³/h (5 l/s) pour le même local : le débit du code du travail est plus exigeant. L'INRS conseille au moins 50 m³/h dans le tertiaire. Avec des fenêtres seules et sans ventilation mécanique, il faut 15 m³ de volume par occupant.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6 ; " + RSD + " ; " + QAI },
        v30: { verdict: "30 m³/h par occupant", texte: "Le RSD demande 18 m³/h (5 l/s) en réunion, 22 m³/h (6 l/s) en vente et en restauration. Avec des fenêtres seules, il faut 24 m³ de volume par occupant.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6 ; " + RSD },
        v45: { verdict: "45 m³/h par occupant", texte: "Valeur pour la ventilation mécanique. Avec des fenêtres seules, il faut 15 m³ de volume par occupant. Si le travail émet des polluants, revenir à la première question.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6" },
        v60: { verdict: "60 m³/h par occupant", texte: "Valeur pour la ventilation mécanique. Avec des fenêtres seules, il faut 24 m³ de volume par occupant. Si le travail émet des polluants, revenir à la première question.", s: "texte", ref: "code du travail, articles R4222-5 et R4222-6" },
        v_rsd: { verdict: "Règlement sanitaire départemental", texte: "Classes : 4 à 5 l/s par occupant, soit 15 à 18 m³/h. Chambres et dortoirs : 5 l/s, soit 18 m³/h. Vérifier le RSD du département, et le code du travail pour le personnel qui y travaille.", s: "texte", ref: RSD }
      }
    },

    verifications: [
      { titre: "Au VISA", icone: "plan", points: [
        { t: "Débit d'air neuf calculé local par local : nombre d'occupants × valeur du texte applicable.", s: "texte", ref: "code du travail, article R4222-6 ; " + RSD },
        { t: "Locaux à pollution spécifique repérés, avec captage à la source avant la ventilation générale.", s: "texte", ref: "code du travail, articles R4222-3 et R4222-12" },
        { t: "Toute extraction a son entrée d'air correspondante, et la compensation est organisée, pas laissée aux fuites.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
        { t: "Rejets d'air éloignés des prises d'air neuf.", s: "expert", ref: ED695 + ", principe IX et chapitre 6" },
        { t: "Note de calcul avec vitesses et pertes de charge, et ventilateur choisi pour le réseau réel.", s: "expert", ref: ED695 + ", paragraphes 4.1.3 et 5.2" }
      ] },
      { titre: "Sur le chantier", icone: "casque", points: [
        { t: "Gaines souples limitées : à débit égal, 10 Pa/m contre 1,6 Pa/m en acier galvanisé (Ø 400, 1 m³/s).", s: "expert", ref: ED695 + ", tableau VIII" },
        { t: "Pas de coude juste avant l'aspiration du ventilateur.", s: "expert", ref: ED695 + ", paragraphe 5.3" },
        { t: "Manchettes souples et plots antivibratiles au ventilateur.", s: "expert", ref: ED695 + ", lexique et paragraphe 5.3" },
        { t: "Filtres et trappes de visite accessibles pour l'entretien.", s: "expert", ref: ED695 + ", démarche d'étude et chapitre 9" }
      ] },
      { titre: "À la réception", icone: "cle", points: [
        { t: "Débits mesurés et consignés : ce sont les valeurs de référence pour la suite.", s: "expert", ref: ED695 + ", tableau XI" },
        { t: "Notice d'instructions remise par le maître d'ouvrage, consigne d'utilisation rédigée par l'employeur.", s: "texte", ref: "code du travail, articles R4212-7 et R4222-21" },
        { t: "Contrôle périodique au moins une fois par an, résultats au dossier de maintenance.", s: "texte", ref: "arrêté du 8 octobre 1987, d'après INRS, focus juridique de juillet 2025" }
      ] }
    ],

    pieges: [
      { t: "Extraire sans compenser : le ventilateur tourne, le local se met en dépression, les portes deviennent dures à ouvrir et le débit chute.", s: "expert", ref: ED695 + ", paragraphe 7.1" },
      { t: "Réduire le diamètre pour gagner de la place. Pour 1 m³/s : Ø 400, 8 m/s et 1,8 Pa/m ; Ø 200, 32 m/s et 55 Pa/m. Trente fois plus de perte de charge.", s: "expert", ref: ED695 + ", tableau VII" },
      { t: "Compter l'air recyclé comme de l'air neuf : il peut s'y ajouter, mais ne réduit jamais le débit minimal d'air neuf.", s: "texte", ref: RSD },
      { t: "Recycler l'air d'un local à pollution spécifique sans épuration efficace, ou vers un local de pollution différente.", s: "texte", ref: "code du travail, article R4222-14" },
      { t: "Juger une ventilation à son seul taux de renouvellement : l'INRS le dit sans justification, et parfois dangereux, car le volume du local ne change pas la teneur atteinte à terme.", s: "expert", ref: ED695 + ", paragraphe 8.2" },
      { t: "Oublier le filtre : il s'encrasse, la perte de charge monte, le débit baisse lentement, et rien ne le signale sans mesure.", s: "expert", ref: ED695 + ", paragraphes 4.1.3 et 5.2" },
      { t: "Lire 5 comme 5 m³/h dans le RSD : son tableau est en litres par seconde. 5 l/s valent 18 m³/h.", s: "texte", ref: RSD }
    ],

    confondre: [
      { titre: "Air neuf et air recyclé", t: "L'air neuf est pris dehors, loin des pollutions. L'air recyclé est repris dans le local ou le groupe de locaux, puis réintroduit.", s: "texte", ref: "code du travail, article R4222-3" },
      { titre: "Débit et vitesse", t: "Le débit (m³/h) est une quantité d'air. La vitesse (m/s) est son allure. Le même débit va vite dans une petite gaine, lentement dans une grosse.", s: "expert", ref: ED695 + ", paragraphe 4.1.1" },
      { titre: "Pollution spécifique et non spécifique", t: "Non spécifique : due à la seule présence humaine. Spécifique : substances dangereuses ou gênantes, et sanitaires.", s: "texte", ref: "code du travail, article R4222-3" },
      { titre: "Ventilation locale et générale", t: "La locale capte le polluant à la source. La générale le dilue dans le local : elle ne suffit pas comme moyen principal contre des produits toxiques.", s: "expert", ref: ED695 + ", chapitre 3 et paragraphe 8.1" },
      { titre: "Pression statique et dynamique", t: "La statique pousse sur les parois, en plus ou en moins. La dynamique vient de la vitesse de l'air : 15 Pa à 5 m/s, 60 Pa à 10 m/s. La totale est leur somme.", s: "expert", ref: ED695 + ", paragraphe 4.1.1 et tableau V" }
    ],

    references: [
      { s: "texte", t: "Code du travail, articles R4222-1 à R4222-26 (aération et assainissement, obligations de l'employeur) et R4212-1 à R4212-7 (obligations du maître d'ouvrage)." },
      { s: "texte", t: "Arrêté du 8 octobre 1987 : contrôle périodique des installations d'aération et d'assainissement. Arrêté du 20 décembre 2021 : méthodes de contrôle." },
      { s: "texte", t: "Règlement sanitaire départemental type, articles 63 et 64 : chaque département a le sien. Valeurs lues dans un RSD départemental." },
      { s: "texte", t: "Arrêté du 24 mars 1982 modifié : aération des logements." },
      { s: "expert", t: "INRS, guide pratique de ventilation n° 0, ED 695, Principes généraux de ventilation : lu dans l'édition de 2015, une édition de septembre 2022 existe. Lexique, écoulement dans les gaines, ventilateurs, compensation, ventilation générale." },
      { s: "expert", t: "INRS, guide pratique de ventilation n° 1, ED 657, L'assainissement de l'air des locaux de travail, édition 2022. INRS, ED 6008, Le dossier d'installation de ventilation. INRS, aide-mémoire juridique TJ 5, Aération et assainissement." },
      { s: "expert", t: "INRS, Hygiène et sécurité du travail n° 264, septembre 2021, note NT 92 : améliorer la ventilation des locaux de travail du tertiaire. L'origine du 25 m³/h et la méthode de mesure par le CO2." },
      { s: "expert", t: "INRS, pages Qualité de l'air intérieur (mars 2024) et Ventilation et sobriété énergétique (avril 2023). INRS, focus juridique sur le contrôle des installations de ventilation, juillet 2025." },
      { s: "expert", t: "Cerema Occitanie, présentation Les systèmes de ventilation, colloque Bâtiment santé et rénovation, juin 2026." }
    ]
  };
})();
