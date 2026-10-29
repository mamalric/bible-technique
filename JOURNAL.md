# Journal

<!-- Dernière entrée en haut. Une entrée par session de travail ou par décision. Date au format AAAA-MM-JJ. -->

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
- Commité sur `dev`, non publié : la mise en ligne attend l'accord de l'utilisateur.
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
