# Journal

<!-- Dernière entrée en haut. Une entrée par session de travail ou par décision. Date au format AAAA-MM-JJ. -->

## 2026-11-03 : article M 2, accès aux normes, textes alignés, branche archivée

- Fiche `erp` : article M 2 lu sur Légifrance, version en vigueur depuis le 1er décembre 2017 (arrêté du 15 novembre 2017). Une personne pour 3 m² de surface de vente en sous-sol, au rez-de-chaussée et au 1er étage, 6 m² au 2e étage, 15 m² au-dessus ; 9 m² en faible densité ; 5 m² de mail et 6 m² en boutique de moins de 300 m² dans un centre commercial. Le badge "à vérifier" est levé et la référence corrigée : le cours citait à tort l'arrêté du 13 juin 2017.
- Fiche `clapet-coupe-feu` : l'annexe 2 de l'arrêté du 22 mars 2026, gratuite sur Légifrance, définit E, I, ve, ho et le sens du feu, et devient la source de ces lettres à la place de NF EN 13501-3. Elle apporte deux règles ajoutées au cours : en coupe-feu, un clapet n'est admis qu'avec le classement S, et sa pression de service ne dépasse pas celle de l'essai. Le S lui-même n'y est pas défini : son sens reste lu dans des documents de fabricants.
- Fiche `clapet-coupe-feu` : MS 53, MS 59, MS 60 et MS 69 lus en version en vigueur. Ils ne définissent ni la position de sécurité, ni la sécurité positive, ni l'émission et la rupture : ces points restent sourcés par des certificats NF, des procès-verbaux de DAS et une notice de CMSI.
- Fiche `locaux-techniques` : son piège sur les anciennes versions signale que l'arrêté du 22 mars 2026 vaut pour les demandes déposées depuis le 1er octobre 2026, et que l'arrêté du 19 février 2026 modifiera CO 28 et EL 5 pour les demandes déposées à partir du 1er juin 2027.
- Normes : aucune n'a pu être lue. Aucune copie sur le OneDrive, aucun accès gratuit indiqué sur la boutique AFNOR. La gratuité légale ne vise que les normes rendues obligatoires, et NF S 61-937-5 n'est qu'une présomption de conformité dans CH 32. L'extrait gratuit de NF S 61-937-5 ne s'est pas ouvert dans le navigateur intégré. Éditions en vigueur et prix relevés le 3 novembre 2026, offre proposée par défaut (numérique, 3 utilisateurs) :
  - NF EN 13501-3, août 2025, 30 pages : 281,74 € HT ;
  - NF S 61-937-1, décembre 2003, 10 pages : 156,40 € HT ;
  - NF S 61-937-5, mars 2012, 6 pages : 84,17 € HT ;
  - NF X 15-206, août 2023, 6 pages : 84,17 € HT ;
  - NF X 15-211, mai 2009, 13 pages : 196,99 € HT ;
  - NF EN 14175-3, mai 2019, 30 pages : 281,74 € HT, une partie sur six.
- Pistes d'accès, restées à confirmer : un abonnement COBAZ chez B27, ou une consultation sur rendez-vous dans une délégation AFNOR, vue seulement dans des programmes de 2017 à 2019. Rien n'a été acheté.
- Textes alignés sur la description du portail : phrase d'accueil dans `bible.js`, description dans `index.html`, `pitch`, `tags` et objectif dans `FICHE.md`, description du dépôt GitHub, déjà changée en ligne. Les tuiles de domaine de l'accueil gardent Plomberie et Thermique : ce sont des rubriques de classement, pas la description du site. La description de la skill garde aussi ces mots, qui servent à la déclencher.
- Branche `backup/avant-anonymisation` : 7 commits du 27 octobre 2026, jamais poussés, sans ancêtre commun avec `dev`. Elle est archivée dans `prive/backup-avant-anonymisation.bundle` (ignoré par git), restauration essayée (même commit, mêmes fichiers), puis supprimée : plus de risque de la pousser par erreur, et rien de perdu. La commande de relecture est dans `prive/traces.md`.
- Carte : deux questions ouvertes retirées, la troisième devient celle de l'abonnement COBAZ. Tuiles d1 et d2 mises à jour.
- Badges : 99 affirmations dont 13 à vérifier pour le clapet, 89 dont 4 pour les ERP, 118 dont 31 pour les locaux techniques.
- Reste à faire : publier sur accord de l'utilisateur ; savoir si B27 a un abonnement COBAZ.

## 2026-11-03 : cours clapet, ERP et locaux techniques publiés

- Sur accord de l'utilisateur, `main` avancé sur `dev` et poussé avec le compte `mamalric` (commit 7b68f6a) ; déploiement GitHub Pages réussi.
- Contrôlé sur le site en ligne, à 375 px : les 10, 9 et 11 étapes s'ouvrent sans défilement horizontal, le fusible et les seuils par type réagissent, console vide.
- Carte : les tuiles d1, d2 et d3 passent à "en ligne". Elles restent en cours, car des affirmations sont encore à vérifier.
- Reste à faire : lire M 2 en vigueur, NF EN 13501-3 et NF S 61-937 ; trancher les trois questions ouvertes de la carte.

## 2026-11-03 : cours pour débutant dans les fiches clapet, ERP et locaux techniques

- À la demande de l'utilisateur, les trois fiches qui n'en avaient pas reçoivent la rubrique `cours`, au même format que les bases et la sorbonne : une étape par écran, un dessin, des phrases courtes, chaque mot défini à son arrivée, une image de la vie courante, une phrase à retenir, un exemple chiffré à la fin. Le moule ne change pas.
- Fiche `clapet-coupe-feu` : cours de 10 étapes en trois parties (le problème, lire et choisir, sur le chantier). Dessins à manipuler : la gaine avec et sans clapet, le fusible au curseur, l'émission et la rupture avec le câble à couper.
- Fiche `erp` : cours de 9 étapes en deux parties (comprendre, compter et classer). Dessins à manipuler : les quatorze lettres, les seuils de la 5e catégorie par type. Exemple complet d'un restaurant, N 4 ou N 5 selon la surface.
- Fiche `locaux-techniques` : cours de 11 étapes en deux parties (les locaux, les règles). Dessins à manipuler : l'air et l'eau selon le local, l'accès au sous-sol selon la température du primaire. Exemple complet d'une sous-station de 400 kW.
- Textes lus sur Légifrance dans leur version en vigueur :
  - règlement ERP, arrêté du 25 juin 1980 : CH 32 et CH 33 (version du 1er août 2025), GN 1, GN 2, PE 1 à PE 4 (PE 2 en version du 1er janvier 2026), N 2 (version de février 2022), W 2, GE 4 ;
  - code de la construction et de l'habitation : R143-19, R143-34 à R143-44 ;
  - MS 53, CO 24 et CO 25 sont cités d'après des extraits de Légifrance, dans des versions dont la date n'a pas été confirmée.
- Autres sources ajoutées : deux supports de formation de la DREAL Normandie (classement et contrôle des ERP), un document de la préfecture de la Vienne, un guide de la préfecture de l'Aude (2016), une fiche de la préfecture de Tarn-et-Garonne, deux guides du Cerema sur les réseaux de chaleur (2014 et 2019), une fiche technique de fabricant de clapets.
- Ce que ces textes ont corrigé dans les fiches existantes :
  - clapet : quand les dispositions du type exigent un SSI de catégorie A ou B, seuls les télécommandés sont admis au droit des parois de compartimentage (CH 32 § 6). La fiche disait seulement que le coordinateur SSI choisit. Son avis d'octobre 2026 reste cité, pour les autres cas ;
  - clapet : le type H de l'arbre de décision n'existe pas dans GN 1, il est retiré ;
  - clapet : une fiche de fabricant lue annonce un fusible de 72 °C alors que CH 32 dit 70 °C. La fiche le signale, à regarder au VISA ;
  - ERP : seul s'ajoute au public le personnel qui n'a pas de dégagements indépendants (GN 1), et non tout le personnel. La fiche, son arbre et le schéma de tête sont corrigés ;
  - ERP : pour un restaurant assis, le principe est la déclaration contrôlée des places, limitée à une personne pour 2 m² ; une personne par m² ne vaut qu'à défaut (N 2) ;
  - ERP : la densité des magasins lue dans un document de préfecture est ancienne. M 2 a été réécrit en 2017 : le repère cité reste à vérifier, faute d'avoir lu l'article en vigueur.
- Badges, cours compris : 97 affirmations dont 13 à vérifier pour le clapet (14 sur 37 avant), 89 dont 5 pour les ERP (19 sur 35 avant), 118 dont 31 pour les locaux techniques (22 sur 52 avant).
  - Clapet : 5 anciens "à vérifier" levés. NF EN 13501-3 et NF S 61-937 ne sont pas lues directement : ce qui en est dit vient de documents de fabricants.
  - ERP : 15 anciens "à vérifier" levés.
  - Locaux techniques : 1 ancien "à vérifier" levé, 10 ajoutés par le cours. Ce sont surtout des explications générales et des prescriptions de réseaux. Aucun texte lu ne définit le local technique en général ni le degré coupe-feu d'une sous-station.
- Contrôles :
  - `node tests/verifier_bible.js` : 5 fiches, 0 erreur, 0 alerte ;
  - dans le navigateur : toutes les étapes des trois cours, leurs dessins et commandes, thèmes clair et sombre, 375 px sans défilement horizontal sur chaque étape, recherche à l'accueil ("calfeutrement", "dégagement", "échangeur", "sous-station", "clapet"), console vide.
- Carte : tuiles d1, d2 et d3 mises à jour, tuile c2 "dans les 5 fiches", question sur les cours retirée et questions renumérotées. La version validée reste la version 1.
- Reste à faire : publier sur accord de l'utilisateur ; lire M 2 en vigueur, NF EN 13501-3 et NF S 61-937 ; trancher les trois questions ouvertes de la carte.

## 2026-11-03 : carte du parcours

- Demande de l'utilisateur : remplir la carte, restée au modèle vierge depuis la création du projet. `CARTE.json` passe en version 1. `CARTE.pdf`, `CARTE.dxf` et `CARTE.png` sont générés : "CONTRÔLES : aucune alerte", rendu regardé.
- Quatre étapes : une notion entre dans la bible ; le lecteur arrive ; lire une fiche ; les fiches disponibles. Plus les zones "mis de côté" et "questions ouvertes".
- États :
  - en vert, ce qui a été vu dans le site qui tourne, y compris les cases à cocher, la bascule de thème et la rubrique "vu sur les affaires", revues sur le site public avant de les marquer ;
  - en ocre, les cinq fiches en ligne : chacune garde des affirmations "à vérifier", dont le nombre est sur sa tuile ;
  - en blanc pointillé, ce qui est hors du site : sources, Claude Code, `prive/`, publication, GitHub Pages, portail b27-hub ;
  - en bordeaux, les fiches à venir ;
  - en gris, la carte du hub à passer de bêta à en ligne, et les retouches de forme annoncées à la création.
- Questions ouvertes portées sur la carte : un cours pour les trois autres fiches ; l'alignement du texte qui cite encore les métiers ; la suppression de `backup/avant-anonymisation` ; l'accès aux normes non lues.
- Validée par l'utilisateur le 2026-11-03 : la carte fait foi désormais, et ses questions ouvertes restent à trancher.
- Commité sur `dev` seulement, pas poussé : le site en ligne ne change pas.

## 2026-11-03 : cours pour débutant dans les fiches bases de la ventilation et sorbonne

- Retour de l'utilisateur sur les deux fiches du jour : trop légères, il faut le considérer comme débutant et tout réexpliquer. La fiche des bases devient un vrai cours, et la fiche sorbonne reçoit le sien.
- Moule : nouvelle rubrique facultative `cours` dans `bible.js`, `bible.css` et `tests/verifier_bible.js`.
  - Une étape à la fois, avec des numéros cliquables, un sommaire, un bouton vers l'étape suivante. Le lien `fiche.html?f=<fiche>#<étape>` ouvre une étape précise, et le navigateur retient la dernière étape vue.
  - Une étape peut avoir une introduction, un dessin (`BIBLE_DESSINS`, dans le fichier du schéma), des lignes, des tuiles avec icône (`BIBLE_ICONES`), un calcul pas à pas, une image pour se représenter la notion, et une phrase à retenir.
  - Le vérificateur contrôle chaque étape et compte ses affirmations. "comme" et "retenir" ne portent pas de badge : le premier est une image sans chiffre ni règle, le second redit une ligne badgée de l'étape.
  - Les fiches clapet, ERP et locaux techniques n'ont pas de cours et ne changent pas : contrôlé dans le navigateur.
- Fiche `bases-ventilation` : cours de 17 étapes en quatre parties (pourquoi ventiler, comment ça marche, dimensionner, en pratique), et un exemple complet sur une salle de réunion de 12 personnes.
  - `schemas/ventilation.js` est réécrit. Le schéma de tête suit l'air de dehors à dehors, pièce par pièce, en 11 pastilles. Les quatre anciennes leçons deviennent des dessins d'étape, redessinés pour rester lisibles sur téléphone, avec dix autres dessins et un dictionnaire de pièces en icônes.
  - La jauge de CO2 utilise maintenant les chiffres de l'INRS (20,2 l/h, 400 ppm dehors), au lieu de l'hypothèse de 16 l/h du premier jet : le minimum légal de 25 m³/h y donne environ 1 200 ppm.
- Sources ajoutées pour ce cours :
  - INRS, note NT 92 (Hygiène et sécurité du travail n° 264, septembre 2021) : l'origine du 25 m³/h (circulaire de 1985 : 16,2 l/h, 300 ppm dehors, soit 23 m³/h) et son actualisation à 34 m³/h ;
  - INRS, page Qualité de l'air intérieur (mars 2024) : l'origine des polluants, le conseil d'au moins 50 m³/h par occupant dans le tertiaire ;
  - INRS, page Ventilation et sobriété énergétique (avril 2023) ; INRS, guides ED 657 (2022) et ED 6008 ; aide-mémoire juridique TJ 5 ;
  - Cerema Occitanie, présentation sur les systèmes de ventilation (juin 2026) ;
  - le lexique et les tableaux de l'ED 695 (édition de 2015, toujours à relire dans l'édition de 2022), dont son annexe qui compare deux réseaux.
- Fiche `sorbonne` : cours de 8 étapes (ce que c'est, ses pièces, l'air qui protège, la guillotine, ce qui casse le confinement, l'air du labo, les types, les contrôles), avec des liens vers les étapes du cours sur les bases.
- Badges : 150 affirmations dont 8 à vérifier pour les bases, 90 dont 1 pour la sorbonne.
  - Bases, restent à vérifier : ventiler ne chauffe pas ; le sens de l'air selon la pression ; le détalonnage ; la notation des gaines sur un plan ; le coefficient de 0,34 Wh/m³.K, vu dans une source pédagogique non relue ; le cumul de plusieurs textes ; deux lignes de l'exemple qui reposent sur des valeurs d'illustration.
  - Trois anciens "à vérifier" des bases sont levés par l'ED 695 : accès aux filtres et trappes, valeurs de référence, encrassement du filtre.
  - Sorbonne : seul le calcul de 9,5 kW reste à vérifier. Les normes NF X 15-206, NF X 15-211 et NF EN 14175 ne sont toujours pas lues : ce que la fiche en dit vient de l'INRS.
- Contrôles :
  - `node tests/verifier_bible.js` : 5 fiches, 0 erreur, 0 alerte ;
  - dans le navigateur : toutes les étapes des deux cours, leurs dessins et commandes, les boutons précédent et suivant, le sommaire, un lien direct vers une étape, l'arbre, la recherche à l'accueil ("échangeur", "hélicoïde", "CTA", "guillotine"), les thèmes clair et sombre, 375 px sans défilement horizontal sur chaque étape, console vide.
- Publication : les deux fiches et leurs cours sont mis en ligne le 2026-11-03, sur accord de l'utilisateur : `main` avancé sur `dev`, poussé avec le compte `mamalric`.
- Reste à faire : remplir `CARTE.json`, restée au modèle vierge ; relire l'ED 695 dans son édition de 2022.

## 2026-11-03 : fiches sorbonne et bases de la ventilation

- Demande de l'utilisateur : une fiche sur le fonctionnement des sorbonnes, puis une fiche sur les bases de la ventilation, parce qu'il lui manque des bases pour comprendre. La fiche des bases part donc de zéro et la fiche sorbonne y renvoie. Elles ne viennent pas d'une affaire : pas de rubrique "vu sur les affaires".
- Sources lues :
  - code du travail, articles R4222-1 à R4222-21 (Légifrance) ;
  - règlement sanitaire départemental, article 64, lu dans le document d'un département : chaque département a le sien, et le tableau est en l/s ;
  - arrêté du 24 mars 1982 (Légifrance) ;
  - INRS, guide ED 795 sur les sorbonnes (mars 2009) ;
  - INRS, note sur le passage de personnes devant une sorbonne (Hygiène et sécurité du travail n° 284, septembre 2026) : elle a apporté les chiffres sur la distance de passage et sur les sorbonnes basse vitesse ;
  - INRS, guide ED 695, lu dans l'édition de 2015 alors qu'une édition de septembre 2022 existe : à relire ;
  - INRS, focus juridique de juillet 2025, pour le contrôle annuel.
- Normes non lues : NF X 15-206 (version d'août 2023 en vigueur, celle de décembre 2022 annulée), NF X 15-211 et NF EN 14175. Ce que les fiches en disent vient de l'INRS, et la fiche sorbonne le signale.
- Fiche `bases-ventilation` (domaines ventilation et méthode) :
  - schéma `schemas/ventilation.js` à quatre leçons : pourquoi ventiler (CO2 selon le débit par personne), les quatre systèmes (signe de pression et sens de l'air sous la porte), débit et vitesse (V = Q/S, repère du tableau de l'ED 695), perte de charge (coudes, encrassement, point de fonctionnement, valeurs d'illustration) ;
  - arbre "Quel débit d'air neuf ?" à sept verdicts ;
  - vignette `ventilation` dans `bible.js`.
- Fiche `sorbonne` (domaines ventilation et sécurité incendie) :
  - schéma `schemas/sorbonne.js` : coupe de profil, débit constant, débit variable ou recirculation, curseur d'ouverture de la guillotine, essais de passage à 0,4 m et à 1 m, panne d'extraction ;
  - arbre "Sorbonne, ou autre chose ?" à neuf verdicts ;
  - vignette `sorbonne` dans `bible.js`.
- Changement commun : l'aide du badge "Expert" dans `donnees/registre.js` couvre aussi les guides d'un organisme de référence comme l'INRS, puisque ces deux fiches s'appuient sur eux. Les fiches existantes n'en sont pas changées.
- Badges : 44 affirmations dont 3 à vérifier pour les bases, 50 dont 0 à vérifier pour la sorbonne. Ce zéro ne veut pas dire que les normes ont été lues : leurs valeurs portent le badge "Expert" parce qu'elles viennent de l'INRS.
- Contrôles :
  - `node tests/verifier_bible.js` : 5 fiches, 0 erreur, 0 alerte ;
  - dans le navigateur : les quatre leçons, les modes et essais de la sorbonne, tous les verdicts des deux arbres, la recherche à l'accueil ("sorbonne", "débit", "perte de charge", "R4222-6", "hotte"), les vignettes, le thème clair et 375 px sans défilement horizontal, console vide.
- Reste à faire : publier les deux fiches sur accord de l'utilisateur ; remplir `CARTE.json`, restée au modèle vierge ; relire l'ED 695 dans son édition de 2022.

## 2026-10-29 : fiche locaux techniques et sous-station

- Demande de l'utilisateur : une fiche très complète sur les locaux techniques et la sous-station, en sous-sol notamment, avec les définitions, les obligations et la sécurité incendie. Elle ne vient pas d'une affaire : pas de rubrique "vu sur les affaires".
- Vérification documentaire faite par un agent, surtout sur Légifrance, puis CH 5 et CH 11 relus directement. Ce qu'elle a changé dans la fiche :
  - l'arrêté du 23 juin 1978 couvre les chaufferies (titre I) et aussi les sous-stations (titre II), au-delà de 70 kW ;
  - en ERP, une chaufferie de plus de 70 kW est un local à risques importants (CH 5 §1, version du 1er janvier 2026, renvoi à CO 28 §1) ;
  - aucun texte ne fixe de degré coupe-feu à une sous-station ; au-delà de 110 °C, il faut un accès direct par l'extérieur, des coupures depuis l'extérieur et un sas ventilé vers le public (art. 22 et 29 de 1978, CH 11) ;
  - la salle des machines frigorifiques et le local de CTA sont des locaux à risques courants (CH 35, CH 36) ;
  - le local électrique suit les trois cas a, b et c de EL 5 ; les postes HT et les groupes électrogènes relèvent du cas a) (EL 6, EL 7) ;
  - le seuil ICPE 2910-A est de 1 MW (déclaration avec contrôle) ;
  - en habitation, les emplacements de production d'énergie au gaz sont interdits en sous-sol (arrêté du 23 février 2018) ;
  - l'interdiction du GPL en sous-sol en ERP n'a pas été retrouvée dans la version actuelle de GZ : elle n'est pas dans la fiche.
- Textes récents à garder en tête :
  - chapitres CH et GZ réécrits au 1er janvier 2026 ;
  - arrêté du 22 mars 2026 sur la résistance au feu, qui remplace celui de 2004 ;
  - rubrique 2910 remaniée en juin 2026.
- Deux cahiers de prescriptions de réseaux de chaleur publiés ont servi pour les points récurrents d'une sous-station (accès de l'exploitant, limite de prestation, ventilation, puisard). Ils restent anonymes dans le site ; leurs liens sont dans `prive/traces.md`.
- Fiche `locaux-techniques` (domaines chauffage et sécurité incendie) :
  - schéma `schemas/local-technique.js` : coupe d'un local en sous-sol, quatre cas, dix pastilles par cas qui disent chacune une obligation avec son badge, essais "feu dans le local" et "fuite" (eau, ou fluide pour le froid) ;
  - pastilles agrandies sous 600 px de large pour le doigt ;
  - arbre "Quel local, quelles règles ?" à treize verdicts, de la petite chaudière au poste HT ;
  - vignette `local` dans `bible.js`.
- Badges : 52 affirmations dans la fiche, dont 22 à vérifier ; le schéma porte ses propres badges, la plupart sur un texte. Restent à vérifier notamment les exigences de la NF EN 378, lue seulement par des sources secondaires, et les pratiques de chantier (puisard, trémie, stockage).
- Contrôles :
  - `node tests/verifier_bible.js` : 3 fiches, 0 erreur ;
  - dans le navigateur : les quatre cas et leurs pastilles, les essais feu et fuite, l'arbre, la recherche "sous-station" à l'accueil, le thème clair et 375 px sans défilement horizontal, console vide.
- Commité sur `dev`, puis publié le jour même avec l'accord de l'utilisateur (`main` avancé sur `dev`, les deux branches poussées). Vérifié en ligne : la fiche charge, les quatre cas et leurs pastilles répondent, console vide.
- Reste à faire : `CARTE.json` est toujours au modèle vierge.

## 2026-10-27 (fiche ERP) : type et catégorie

- Demande de l'utilisateur : une fiche sur les ERP, en priorité. Elle ne vient pas d'une affaire : pas de rubrique "vu sur les affaires", rien à ajouter dans `prive/`.
- Fiche `erp` (domaines sécurité incendie et missions et méthode) :
  - définition, type et catégorie ;
  - seuils de 300, 700 et 1 500 personnes, et seuil de 5e catégorie propre à chaque type ;
  - 1er et 2e groupes ;
  - arbre de décision qui mène à la catégorie ;
  - vérifications en conception, sur le chantier et à l'ouverture ;
  - pièges et notions à ne pas confondre (IGH, famille d'habitation, lieu de travail).
- Schéma `schemas/erp.js` :
  - six types au choix (W, M, N, R, O, U) et deux curseurs, public et personnel ;
  - le bâtiment se remplit (1 point pour 25 personnes) et un curseur se place sur l'échelle des cinq catégories ;
  - la règle appliquée : le public seul sous le seuil du type donne la 5e, sinon public et personnel s'additionnent.
- Vignette `erp` ajoutée dans `bible.js`.
- Badges : 35 affirmations, dont 19 à vérifier. Restent notamment à vérifier :
  - les seuils de 5e catégorie de chaque type et leurs seuils par niveau ;
  - la règle de comptage du personnel ;
  - les conditions de la visite de la commission de sécurité.

  Les articles du CCH sont cités par leur plage (R143-1 et suivants, ex-R123) plutôt que par un numéro dont on n'est pas sûr.
- Contrôles :
  - `node tests/verifier_bible.js` : 2 fiches, 0 erreur ;
  - dans le navigateur : le schéma sur huit cas (5e à 1re, seuils à 100 et 200), les trois branches de l'arbre, le thème clair, 375 px sans défilement horizontal, console vide.
- Commité sur `dev`, puis publié le jour même avec l'accord de l'utilisateur (`main` avancé sur `dev`, les deux branches poussées). Vérifié en ligne : la fiche charge, le schéma répond, la console est vide.

## 2026-10-27 (mise en ligne) : dépôt public, GitHub Pages et carte du hub

- Constat en début de session : le site n'était pas en ligne (404), aucun dépôt distant n'existait et le catalogue du hub n'avait pas de carte Bible. La mise en ligne attendait l'accord de l'utilisateur, qui l'a donné : la direction est d'accord.
- Avant de pousser, l'historique local a été nettoyé, car il n'avait jamais été publié :
  - `JOURNAL.md` citait en clair le nom de l'affaire d'origine et celui du directeur, dans tous les commits depuis la création ; ces mentions sont anonymisées dans tout l'historique (`git filter-branch`) ;
  - l'adresse des commits devient l'adresse noreply de GitHub, comme pour le hub ;
  - l'ancien historique reste sur la branche locale `backup/avant-anonymisation`, qui ne doit jamais être poussée ; elle peut être supprimée une fois la publication jugée satisfaisante ;
  - un scan de `main` et `dev` avec la liste `prive/noms-interdits.txt` ne relève plus que le prénom de l'utilisateur, dans les chemins de `CLAUDE.md`, que publient aussi les autres dépôts.
- Dépôt public `mamalric/bible-technique` créé, `main` avancé sur `dev`, les deux branches poussées. GitHub Pages activé depuis `main` (racine).
- Le compte GitHub actif de la machine n'a pas le droit d'écrire dans les dépôts `mamalric` : les envois passent par le jeton du compte `mamalric`, connu de `gh`, sans changer le compte actif.
- Vérifié en ligne : accueil et fiche clapet (schéma, arbre de décision), aucune erreur en console.
- Hub : carte `bible-technique` ajoutée à `catalogue.js` (type outil, catégorie ressources, statut bêta, icône livre), contrôlée par `tests/verifier_catalogue.py`, vue en local, puis publiée sur `dev` et `main` du hub. Vérifiée en ligne sur https://mamalric.github.io/b27-hub/.
- Reste à faire :
  - remplir `CARTE.json`, toujours au modèle vierge, et la faire valider ;
  - lever les 14 badges "à vérifier" de la fiche clapet ;
  - passer la carte du hub de bêta à en ligne quand le contenu sera jugé mûr ;
  - supprimer `backup/avant-anonymisation` avec l'accord de l'utilisateur.

## 2026-10-27 (suite) : id, skill et vérificateur

- `id` validé par l'utilisateur : `2026-10-27-bible-technique`.
- Skill `bible-technique` créée dans `C:\Users\mamalric\.claude\skills\bible-technique\SKILL.md`. Elle couvre :
  - quand l'utiliser ou la proposer ;
  - le moule de fiche (`clapet-coupe-feu.js`) ;
  - les badges de source ;
  - le schéma interactif ;
  - l'anonymisation ;
  - le contrôle ;
  - les commits sur `dev`, sans mise en ligne sans accord.
- `tests/verifier_bible.js` (node) vérifie :
  - le registre et les fichiers de fiche ;
  - les rubriques obligatoires ;
  - les sources de chaque affirmation et l'arbre de décision ;
  - les caractères bannis ;
  - les noms interdits listés dans `prive/noms-interdits.txt`.

  Essayé sur un fichier piégé, il a relevé le tiret cadratin, le tilde et le nom d'affaire, sans faux positif sur "accès". La fiche clapet passe : 37 affirmations, dont 14 à vérifier.
- `prive/` amorcé, non suivi par git : la liste des noms de l'affaire d'origine, et `traces.md` avec le cas des clapets en clair.

## 2026-10-27 : création et prototype

- Idée née sur une affaire (clapets coupe-feu passés à fusible sur avis du coordinateur SSI) : garder une trace visuelle et réutilisable de chaque notion technique tranchée sur une affaire.
- Décisions avec l'utilisateur :
  - le format est un site HTML très visuel plutôt que des fiches Markdown ;
  - la bible est publique, dans son propre dépôt GitHub Pages, et le portail b27-hub y pointe par une carte, puisqu'il n'héberge rien ;
  - les ajouts sont commités sur `dev` ; la fusion dans `main`, donc la mise en ligne, se fait seulement sur l'accord de l'utilisateur.
- Règles de publication :
  - aucun nom d'affaire, de client, d'entreprise ou de collègue dans le site public, dont les cas sont anonymisés ; la trace détaillée ira dans `prive/` (ignoré par git) ;
  - chaque affirmation porte un badge de source ;
  - les normes NF et DTU sont citées par leur numéro, jamais recopiées ;
  - les schémas sont dessinés par nous.
- Prototype : accueil et fiche "Clapet coupe-feu" (schéma animé autocommandé, émission, rupture ; arbre de décision ; listes à cocher ; pièges ; cas anonymisé).
- Vérifié dans le navigateur, servi en local par `python -m http.server` (configuration "bible-technique" ajoutée au `.claude/launch.json` du dossier de l'affaire, d'où la session a été lancée) :
  - accueil et fiche ;
  - schéma dans les trois modes (incendie, coupure de câble en rupture) ;
  - arbre de décision ;
  - thème clair et largeur mobile, sans défilement horizontal ;
  - aucune erreur en console.
- Git : `main` contient le squelette du projet ; `dev` contient en plus le prototype. Rien n'est poussé, aucun dépôt distant.
- Format validé par l'utilisateur le 27/10 : "c'est exactement ça que je veux". Des retouches de forme de détail viendront plus tard. Le moule de la fiche fait donc référence pour les suivantes : schéma interactif, en 30 secondes, chiffres, arbre de décision, vérifications, pièges, à ne pas confondre, vu sur les affaires, pour aller plus loin.
- À faire :
  - remplir `CARTE.json`, resté au modèle vierge ;
  - recueillir les retouches de forme ;
  - valider l'`id` ;
  - créer la skill d'enrichissement ;
  - créer le dépôt distant (sur accord) ;
  - ajouter la carte dans le catalogue du hub ;
  - avant de rendre le site visible depuis le hub, en parler à la direction.
