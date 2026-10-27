# Consignes pour Claude Code

Modèle : application. Ce projet suit la convention commune de `_modele/` : une fiche `FICHE.md`, un journal `JOURNAL.md`, une carte du parcours `CARTE.json` (dessinée en `CARTE.pdf` et `CARTE.dxf`), et c'est toi qui les tiens à jour.

## Au début de chaque session
1. Lire `FICHE.md` (fiche d'identité) puis `JOURNAL.md` (historique, dernière entrée en haut).
2. Si des champs de `FICHE.md` sont vides ou valent `AAAA-MM-JJ`, les renseigner : déduire ce qui peut l'être, demander le reste. Pour `id`, proposer une valeur au format `AAAA-MM-JJ-slug` et attendre validation avant de l'écrire.
3. Lire `CARTE.json` : c'est la direction validée du projet et l'état de chaque étape. Si elle est encore en version 0 (le modèle vierge), la remplir avant tout le reste (voir "La carte du parcours"). Si le projet n'a encore qu'une ancienne `CARTE.drawio`, la convertir d'abord (voir "Ancienne carte draw.io").

## En fin de session
1. Ajouter une entrée datée en haut de `JOURNAL.md` : ce qui a été fait, les décisions prises, ce qui reste à faire.
2. Mettre `maj` à jour dans `FICHE.md` avec la date du jour.
3. Si l'état ou la prochaine étape a changé, mettre à jour les sections `État actuel` et `Prochaine étape`. Si le statut a changé, mettre à jour `statut`.
4. Si une étape a changé d'état, ou si un lien a été ajouté ou retiré, mettre à jour `CARTE.json` puis régénérer la carte.

## La carte du parcours
La carte dessine le chemin de l'utilisateur dans l'application : une tuile par étape, des flèches entre les étapes, une couleur par état. L'utilisateur la lit d'un coup d'œil dans `CARTE.pdf` pour savoir où en est le projet, plutôt que de longs fichiers Markdown.
- Trois fichiers : `CARTE.json` contient tout le contenu (titre, zones, tuiles, états, liens, textes) et c'est le seul qu'on modifie ; `CARTE.pdf` (A3, à lire) et `CARTE.dxf` (dessin CADCraft) en sont tirés par `python "C:\Users\Marius\OneDrive\_code\_modele\_outils\carte\generer_carte.py" CARTE.json`. Ne jamais retoucher le PDF ou le DXF à la main : ils seraient écrasés à la génération suivante.
- Si le rendu d'une carte paraît différent de d'habitude (police, couleurs, traits), lancer d'abord `python "C:\Users\Marius\OneDrive\_code\_modele\_outils\carte\verifier_temoin.py"` : il dit si le générateur ou un logiciel a changé de comportement.
- Le dessin suit la charte commune `_modele/_outils/carte/charte.json`, identique pour tous les projets. Ne pas la modifier pour un projet particulier : la changer, c'est changer toutes les cartes, et seulement à la demande de l'utilisateur. Le format de `CARTE.json` est décrit dans `_modele/_outils/carte/LISEZMOI.md`.
- Après chaque modification, régénérer : le générateur contrôle lui-même la mise en page (chevauchements, texte qui déborde, flèche qui traverse une tuile, bout de flèche trop court) et entoure chaque défaut dans `CARTE-alertes.png`. Ne jamais livrer une carte avec des alertes : corriger dans `CARTE.json` (taille ou position d'une tuile, points de passage d'un lien) et régénérer jusqu'à "CONTRÔLES : aucune alerte", puis regarder `CARTE.png` avant de répondre.
- Garder les tuiles existantes à leur place d'une version à l'autre, pour que l'utilisateur s'y retrouve ; placer une nouvelle tuile dans sa zone, sur la grille de 10 px, sans chevauchement.
- Démarrage : avant la première ligne de code, remplir la carte à partir des notes de l'utilisateur, avec les questions ouvertes en bas, et la faire valider.
- Une fois validée, elle fait foi. Si une demande la contredit, le signaler avant de coder.
- Chaque demande qui touche une étape fait bouger la carte dans la même session (état, lien, tuile ajoutée ou retirée), et la réponse le dit.
- États, ceux de la légende, identiques pour tous les projets : `fait` (vert) = fait et vérifié dans l'app ; `en_cours` (ocre) = en cours, à vérifier ou à adapter ; `a_faire` (bordeaux) = à faire ; `hors_app` (blanc en pointillé) = hors de l'app ; `de_cote` (gris en pointillé) = mis de côté.
- Une tuile ne passe à `fait` que si l'étape a été vérifiée dans l'application qui tourne. Codée ou testée ne suffit pas : elle reste `en_cours`.
- Le sous-titre porte la version et sa date : "Version 2, validée le AAAA-MM-JJ". Une version reste un brouillon tant que l'utilisateur ne l'a pas validée.

## Ancienne carte draw.io
Si le projet a encore une `CARTE.drawio` (projets créés avant le 2026-10-18), la convertir avec `python "C:\Users\Marius\OneDrive\_code\_modele\_outils\carte\drawio_vers_carte.py" CARTE.drawio CARTE.json`, générer la carte, la comparer avec l'ancien aperçu (PNG ou PDF de la carte, s'il existe ; draw.io n'est plus installé) et corriger `CARTE.json` si besoin. Garder `CARTE.drawio` jusqu'à ce que l'utilisateur valide la nouvelle carte, puis la supprimer avec son accord.

## Règles
- `id` ne se modifie jamais, même si le dossier est renommé, déplacé ou archivé.
- L'en-tête YAML de `FICHE.md` reste simple : une valeur par ligne, listes entre crochets, pas de bloc multi-lignes. Les noms de champs et les valeurs d'énumération restent en ASCII sans accent.
- Pas d'autre fichier de métadonnées (pas de NOTES.md, pas de README parallèle) : tout passe par `FICHE.md`, `JOURNAL.md` et `CARTE.json` (avec `CARTE.pdf`, `CARTE.dxf` et `CARTE.png` générés). Si un `README.md` est nécessaire (dépôt publié), il reste court et ne remplace pas `FICHE.md`.
- Dans les fichiers Markdown, écrire en français accentué. Une phrase ou un paragraphe tient sur une seule ligne, sans retour à la ligne intermédiaire.
- Dossiers : `src/` pour le code, `tests/` pour les tests, `docs/` pour la documentation. Aucun dossier protégé.
