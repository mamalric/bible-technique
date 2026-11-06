---
id: 2026-10-27-bible-technique    # AAAA-MM-JJ-slug, écrit une fois, jamais modifié (même si le dossier bouge)
nom: Bible technique
type: application
statut: actif
pitch: Aide-mémoire visuel, une fiche par notion, enrichi au fil des affaires.
cree: 2026-10-27
maj: 2026-11-06
tags: [aide-memoire, reglementation, web]
stack: HTML + CSS + JS vanilla, sans framework ni build, destiné à GitHub Pages (publié depuis main)
lancer: ouvrir index.html
site: https://mamalric.github.io/bible-technique/
depot: https://github.com/mamalric/bible-technique
---

# Bible technique

## Objectif
Construire, au fil des affaires, une base de connaissance technique très visuelle : une fiche par notion avec un schéma de principe interactif, les chiffres clés, un arbre de décision, ce qu'on vérifie en VISA, sur chantier et à la réception, les pièges, et la trace anonymisée des cas rencontrés. Destinée à être publique et accessible depuis le portail B27 (b27-hub) par une carte qui pointe vers son site.

## État actuel
En ligne depuis le 27/10/2026 sur https://mamalric.github.io/bible-technique/ (dépôt public `mamalric/bible-technique`, GitHub Pages publié depuis `main`) et accessible depuis le portail b27-hub par une carte bêta, rangée dans Ressources et référentiels. Contenu en ligne : accueil (tuiles par domaine, recherche, légende des badges de fiabilité, thème sombre par défaut et clair à un clic) et deux fiches : "Clapet coupe-feu", avec un schéma animé (autocommandé à fusible, télécommandé à émission ou à rupture), un arbre de décision cliquable et des listes à cocher ; "ERP : type et catégorie", publiée le 27/10/2026, dont le schéma classe un établissement selon son type et son effectif. Publiée le 29/10/2026 : la fiche "Locaux techniques et sous-station", dont le schéma montre en coupe un local en sous-sol dans quatre cas (sous-station, chaufferie, local électrique, groupe froid) avec une pastille par obligation. Publiées le 3 novembre 2026 : "Les bases de la ventilation", un cours de 17 étapes pour débutant, et "Sorbonne de laboratoire", un cours de 8 étapes avec une coupe de profil à guillotine réglable. Publié aussi le 3 novembre 2026 : un cours pour débutant dans les fiches clapet (10 étapes), ERP (9 étapes) et locaux techniques (11 étapes). Publiée le 6 novembre 2026 : la fiche "Bac à graisses", un cours de 13 étapes avec une coupe animée du séparateur (eau tiède ou très chaude, couche de graisses qui grossit, vidange). Publiées le même jour : les normes citées par les fiches clapet, locaux techniques, sorbonne et bac à graisses ont été lues sous la licence CSTB du bureau d'études, et les badges levés. Chaque affirmation porte un badge de source : 103 dont 9 à vérifier pour le clapet, 89 dont 4 pour les ERP, 121 dont 29 pour les locaux techniques, 150 dont 8 pour les bases de la ventilation, 97 dont 1 pour la sorbonne, 152 dont 5 pour le bac à graisses. Skill `bible-technique` et vérificateur `tests/verifier_bible.js` en place.

## Prochaine étape
En attente, à la demande de l'utilisateur : douze fiches tirées de sa liste de mots clés du 6 novembre 2026, mises de côté dans la version 2 de la carte du parcours (brouillon non validé, trois questions ouvertes). Il proposera d'autres sujets, et le développement reprendra quand il le demandera. Ajouter les fiches au fil des affaires et lever les badges "à vérifier" restants. L'accès CSTB du bureau d'études sert aux normes, avec l'accord de l'utilisateur du 6 novembre 2026 ; restent non lues celles absentes de l'abonnement (NF EN 15650, NF EN 1366-2, NF X 15-206, NF X 15-211). Des normes pour les fiches à venir sont déjà rangées dans `prive/sources/pour-plus-tard`. Chaque ajout se commite sur `dev` ; la publication, sur accord de l'utilisateur, consiste à avancer `main` sur `dev` et à pousser avec le compte GitHub `mamalric`.

## Utilisation
Ouvrir `index.html` dans un navigateur (fonctionne hors ligne). Une fiche = un fichier `donnees/fiches/<id>.js` plus une ligne dans `donnees/registre.js` ; un schéma interactif = un fichier `schemas/<nom>.js`. Une fiche peut porter une rubrique facultative `cours`, un parcours par étapes pour un débutant ; ses dessins vont dans le fichier du schéma. Le dossier `prive/` (ignoré par git) recevra la trace détaillée des affaires, qui ne doit jamais être publiée.
