---
id: 2026-10-27-bible-technique    # AAAA-MM-JJ-slug, écrit une fois, jamais modifié (même si le dossier bouge)
nom: Bible technique
type: application
statut: actif
pitch: Aide-mémoire visuel CVC, plomberie, SSI et thermique, une fiche par notion, enrichi au fil des affaires.
cree: 2026-10-27
maj: 2026-10-29
tags: [cvc, plomberie, ssi, thermique, reglementation, web]
stack: HTML + CSS + JS vanilla, sans framework ni build, destiné à GitHub Pages (publié depuis main)
lancer: ouvrir index.html
site: https://mamalric.github.io/bible-technique/
depot: https://github.com/mamalric/bible-technique
---

# Bible technique

## Objectif
Construire, au fil des affaires, une base de connaissance technique très visuelle (CVC, plomberie, SSI, thermique, réglementation) : une fiche par notion avec un schéma de principe interactif, les chiffres clés, un arbre de décision, ce qu'on vérifie en VISA, sur chantier et à la réception, les pièges, et la trace anonymisée des cas rencontrés. Destinée à être publique et accessible depuis le portail B27 (b27-hub) par une carte qui pointe vers son site.

## État actuel
En ligne depuis le 27/10/2026 sur https://mamalric.github.io/bible-technique/ (dépôt public `mamalric/bible-technique`, GitHub Pages publié depuis `main`) et accessible depuis le portail b27-hub par une carte bêta, rangée dans Ressources et référentiels. Contenu en ligne : accueil (tuiles par domaine, recherche, légende des badges de fiabilité, thème sombre par défaut et clair à un clic) et deux fiches : "Clapet coupe-feu", avec un schéma animé (autocommandé à fusible, télécommandé à émission ou à rupture), un arbre de décision cliquable et des listes à cocher ; "ERP : type et catégorie", publiée le 27/10/2026, dont le schéma classe un établissement selon son type et son effectif. Publiée le 29/10/2026 : la fiche "Locaux techniques et sous-station", dont le schéma montre en coupe un local en sous-sol dans quatre cas (sous-station, chaufferie, local électrique, groupe froid) avec une pastille par obligation. Chaque affirmation porte un badge de source : 37 dont 14 à vérifier pour le clapet, 35 dont 19 pour les ERP, 52 dont 22 pour les locaux techniques. Skill `bible-technique` et vérificateur `tests/verifier_bible.js` en place.

## Prochaine étape
Remplir `CARTE.json`, restée au modèle vierge, et la faire valider. Ajouter les fiches au fil des affaires et lever les badges "à vérifier" de la fiche clapet. Chaque ajout se commite sur `dev` ; la publication, sur accord de l'utilisateur, consiste à avancer `main` sur `dev` et à pousser avec le compte GitHub `mamalric`.

## Utilisation
Ouvrir `index.html` dans un navigateur (fonctionne hors ligne). Une fiche = un fichier `donnees/fiches/<id>.js` plus une ligne dans `donnees/registre.js` ; un schéma interactif = un fichier `schemas/<nom>.js`. Le dossier `prive/` (ignoré par git) recevra la trace détaillée des affaires, qui ne doit jamais être publiée.
