# Journal

<!-- Dernière entrée en haut. Une entrée par session de travail ou par décision. Date au format AAAA-MM-JJ. -->

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
