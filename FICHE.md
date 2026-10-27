---
id:                     # AAAA-MM-JJ-slug, écrit une fois, jamais modifié (même si le dossier bouge) : proposé 2026-10-27-bible-technique, à valider
nom: Bible technique
type: application
statut: actif
pitch: Aide-mémoire visuel CVC, plomberie, SSI et thermique, une fiche par notion, enrichi au fil des affaires.
cree: 2026-10-27
maj: 2026-10-27
tags: [cvc, plomberie, ssi, thermique, reglementation, web]
stack: HTML + CSS + JS vanilla, sans framework ni build, destiné à GitHub Pages (publié depuis main)
lancer: ouvrir index.html
site:
depot:
---

# Bible technique

## Objectif
Construire, au fil des affaires, une base de connaissance technique très visuelle (CVC, plomberie, SSI, thermique, réglementation) : une fiche par notion avec un schéma de principe interactif, les chiffres clés, un arbre de décision, ce qu'on vérifie en VISA, sur chantier et à la réception, les pièges, et la trace anonymisée des cas rencontrés. Destinée à être publique et accessible depuis le portail B27 (b27-hub) par une carte qui pointe vers son site.

## État actuel
Prototype du 27/10/2026 : accueil (tuiles par domaine, recherche, légende des badges de fiabilité, thème sombre par défaut et clair à un clic) et première fiche, "Clapet coupe-feu", avec un schéma animé (autocommandé à fusible, télécommandé à émission ou à rupture), un arbre de décision cliquable et des listes à cocher. Chaque affirmation porte un badge de source : texte réglementaire, norme, fabricant, dire d'expert, cas d'affaire ou à vérifier. Dépôt git local avec les branches `main` et `dev`, aucun dépôt distant créé.

## Prochaine étape
Format validé par l'utilisateur le 27/10/2026, retouches de forme de détail à venir. Ensuite : valider l'`id` proposé, créer la skill d'enrichissement, puis le dépôt GitHub public (accord explicite requis avant tout envoi en ligne).

## Utilisation
Ouvrir `index.html` dans un navigateur (fonctionne hors ligne). Une fiche = un fichier `donnees/fiches/<id>.js` plus une ligne dans `donnees/registre.js` ; un schéma interactif = un fichier `schemas/<nom>.js`. Le dossier `prive/` (ignoré par git) recevra la trace détaillée des affaires, qui ne doit jamais être publiée.
