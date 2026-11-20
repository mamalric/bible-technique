/* Bible technique : thème, pictogrammes, badges, accueil et rendu des fiches.
   Tout se construit dans le navigateur à partir de donnees/ : aucun build, la page marche hors ligne. */

(function () {
  "use strict";

  /* ---------- thème : clair par défaut, comme les autres outils B27 ; sombre mémorisé par navigateur.
     Les pages le posent déjà dans leur en-tête, avant le premier rendu, pour éviter un éclair sombre. ---------- */
  function lireTheme() { try { return localStorage.getItem("bible-theme"); } catch (e) { return null; } }
  function ecrireTheme(t) { try { localStorage.setItem("bible-theme", t); } catch (e) { /* navigation privée */ } }
  function appliquerTheme(t) {
    if (t === "clair") document.documentElement.setAttribute("data-theme", "clair");
    else document.documentElement.removeAttribute("data-theme");
  }
  appliquerTheme(lireTheme() || "clair");

  /* ---------- jauges : la part remplie des curseurs (input range), dessinée par bible.css ----------
     Tenue à jour quand on fait glisser, et après tout clic ou tout ajout dans la page : les schémas
     posent parfois une valeur eux-mêmes (bouton de réarmement, débit type) sans prévenir. */
  function remplir(el) {
    var min = el.min === "" ? 0 : +el.min, max = el.max === "" ? 100 : +el.max;
    el.style.setProperty("--rempli", (max > min ? (+el.value - min) / (max - min) * 100 : 0) + "%");
  }
  var jaugesPrevues = false;
  function remplirTout() {
    if (jaugesPrevues) return;
    jaugesPrevues = true;
    (window.requestAnimationFrame || setTimeout)(function () {
      jaugesPrevues = false;
      Array.prototype.forEach.call(document.querySelectorAll('input[type="range"]'), remplir);
    });
  }
  document.addEventListener("input", function (e) { if (e.target.type === "range") remplir(e.target); }, true);
  ["change", "click", "keyup"].forEach(function (t) { document.addEventListener(t, remplirTout, true); });
  if (window.MutationObserver) new MutationObserver(remplirTout).observe(document.documentElement, { childList: true, subtree: true });

  /* ---------- pictogrammes (traits 24 x 24) ----------
     Tous copiés tels quels de Lucide (https://lucide.dev/icons/), jamais dessinés à la main :
     le nom de l'icône Lucide suit chaque tracé. Vérifiés le 20 novembre 2026 sur Lucide 1.68. */
  var ICONES = {
    vent: '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>',   // Lucide wind
    flamme: '<path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"/>',   // Lucide flame
    flocon: '<path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/>',   // Lucide snowflake
    gouttes: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',   // Lucide droplet
    bouclier: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',   // Lucide shield-check
    thermometre: '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',   // Lucide thermometer
    eclair: '<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>',   // Lucide zap
    livre: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><path d="M8 11h8"/><path d="M8 7h6"/>',   // Lucide book-text
    loupe: '<path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>',   // Lucide search
    soleil: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',   // Lucide sun
    lune: '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',   // Lucide moon
    plan: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m9 15 2 2 4-4"/>',   // Lucide file-check
    casque: '<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>',   // Lucide hard-hat
    cle: '<path d="m2 21 9.6-9.6"/><path d="m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19"/><circle cx="15.5" cy="7.5" r="5.5"/>',   // Lucide key
    alerte: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',   // Lucide triangle-exclamation-point
    retour: '<path d="m15 18-6-6 6-6"/>',   // Lucide chevron-left
    // L'emblème de la bible : book-open de Lucide (https://lucide.dev/icons/book-open), copié tel quel.
    // Le même tracé fait l'icône d'onglet (favicon.svg) et l'image d'aperçu des liens (apercu.jpg).
    embleme: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>'
  };
  function icone(nom, taille) {
    var t = taille || 22;
    return '<svg width="' + t + '" height="' + t + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONES[nom] || "") + "</svg>";
  }

  /* vignettes des cartes de fiche */
  var VIGNETTES = {
    clapet:
      '<svg viewBox="0 0 86 86" width="86" height="86" aria-hidden="true">' +
      '<rect x="36" y="6" width="14" height="74" fill="var(--s-paroi)"/>' +
      '<rect x="4" y="30" width="78" height="26" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
      '<rect x="40" y="31" width="6" height="24" rx="2" fill="var(--danger)"/>' +
      '<path d="M8 43h22" stroke="var(--s-chaud)" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="43" cy="22" r="5" fill="var(--s-chaud)"/></svg>',
    erp:
      '<svg viewBox="0 0 86 86" width="86" height="86" aria-hidden="true">' +
      '<path d="M8 30L43 10l35 20" fill="none" stroke="var(--s-gaine-bord)" stroke-width="3" stroke-linejoin="round"/>' +
      '<rect x="13" y="30" width="60" height="38" rx="2" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
      '<circle cx="26" cy="44" r="4" fill="var(--s-air)"/><circle cx="38" cy="44" r="4" fill="var(--s-air)"/><circle cx="50" cy="44" r="4" fill="var(--s-air)"/>' +
      '<circle cx="62" cy="44" r="4" fill="var(--discret)"/><circle cx="26" cy="57" r="4" fill="var(--s-air)"/><circle cx="38" cy="57" r="4" fill="var(--s-air)"/>' +
      '<rect x="8" y="74" width="14" height="6" rx="2" fill="var(--ok)"/><rect x="24" y="74" width="14" height="6" rx="2" fill="var(--accent)"/>' +
      '<rect x="40" y="74" width="14" height="6" rx="2" fill="var(--b-expert)"/><rect x="56" y="74" width="10" height="6" rx="2" fill="var(--s-chaud)"/>' +
      '<rect x="68" y="74" width="10" height="6" rx="2" fill="var(--danger)"/></svg>',
    local:
      '<svg viewBox="0 0 86 86" width="86" height="86" aria-hidden="true">' +
      '<rect x="4" y="20" width="78" height="6" fill="var(--s-paroi)"/><rect x="4" y="74" width="78" height="6" fill="var(--s-paroi)"/>' +
      '<rect x="14" y="26" width="6" height="30" fill="var(--s-paroi)"/><rect x="15" y="57" width="4" height="17" fill="var(--encre-2)"/>' +
      '<rect x="40" y="38" width="16" height="36" rx="2" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
      '<path d="M82 34H64v12h-8M56 66h12V40h14" fill="none" stroke="var(--danger)" stroke-width="2.5"/>' +
      '<path d="M40 46H30V6M40 66H26V6" fill="none" stroke="var(--s-chaud)" stroke-width="2.5"/>' +
      '<rect x="4" y="50" width="8" height="8" rx="2" fill="var(--danger)"/></svg>',
    ventilation:
      '<svg viewBox="0 0 86 86" width="86" height="86" aria-hidden="true">' +
      '<rect x="14" y="24" width="58" height="48" rx="2" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
      '<path d="M2 36h24" stroke="var(--s-air)" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 5"/>' +
      '<path d="M60 36h24" stroke="var(--s-chaud)" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 5"/>' +
      '<circle cx="34" cy="50" r="4" fill="var(--encre-2)"/><path d="M28 66v-4a6 6 0 0 1 12 0v4z" fill="var(--encre-2)"/>' +
      '<circle cx="52" cy="50" r="4" fill="var(--encre-2)"/><path d="M46 66v-4a6 6 0 0 1 12 0v4z" fill="var(--encre-2)"/>' +
      '<circle cx="43" cy="11" r="9" fill="none" stroke="var(--encre-2)" stroke-width="2"/><path d="M43 5v12M37 11h12" stroke="var(--encre-2)" stroke-width="2.5" stroke-linecap="round"/></svg>',
    sorbonne:
      '<svg viewBox="0 0 86 86" width="86" height="86" aria-hidden="true">' +
      '<path d="M18 22H70V72H18V60" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
      '<rect x="60" y="22" width="10" height="38" fill="var(--s-paroi)"/><rect x="14" y="58" width="60" height="4" fill="var(--s-gaine-bord)"/>' +
      '<rect x="16" y="8" width="4" height="38" fill="var(--s-air)" stroke="var(--encre)" stroke-width="1"/>' +
      '<path d="M2 54H14Q36 50 58 54" fill="none" stroke="var(--s-air)" stroke-width="3" stroke-linecap="round" stroke-dasharray="5 5"/>' +
      '<path d="M38 56C40 42 50 40 58 42" fill="none" stroke="var(--s-chaud)" stroke-width="3" stroke-linecap="round"/>' +
      '<rect x="62" y="4" width="6" height="18" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)"/></svg>',
    graisses:
      '<svg viewBox="0 0 86 86" width="86" height="86" aria-hidden="true">' +
      '<rect x="14" y="26" width="58" height="46" rx="4" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
      '<rect x="16" y="40" width="54" height="30" fill="var(--s-air)" fill-opacity=".3"/>' +
      '<rect x="32" y="36" width="24" height="9" fill="var(--s-chaud)" fill-opacity=".7"/>' +
      '<path d="M30 26v30M56 26v34" stroke="var(--encre-2)" stroke-width="2.5"/>' +
      '<path d="M2 32H22V48" fill="none" stroke="var(--s-gaine-bord)" stroke-width="5"/>' +
      '<path d="M66 40H84" stroke="var(--s-gaine-bord)" stroke-width="5"/>' +
      '<circle cx="40" cy="54" r="2.5" fill="var(--s-chaud)"/><circle cx="47" cy="60" r="2" fill="var(--s-chaud)"/>' +
      '<path d="M20 70Q25 63 29 70z" fill="var(--s-hachure)"/></svg>'
  };

  function echapper(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function badge(type, ref) {
    var src = window.BIBLE.sources[type] || window.BIBLE.sources.verifier;
    var aide = src.aide + (ref ? " Source : " + ref : "");
    return '<span class="badge ' + type + '" title="' + echapper(aide) + '">' + echapper(src.nom) + "</span>";
  }
  /* une affirmation : { t: texte (HTML autorisé), s: type de source, ref: référence } */
  function affirmation(a) { return a.t + (a.s ? " " + badge(a.s, a.ref) : ""); }

  function domaine(cle) {
    var d = window.BIBLE.domaines.filter(function (x) { return x.cle === cle; })[0];
    return d || { cle: cle, nom: cle, couleur: "#6b6f76", icone: "livre" };
  }
  function puces(domaines) {
    return '<div class="puces-domaines">' + domaines.map(function (c) {
      var d = domaine(c); return '<span class="puce" style="--c:' + d.couleur + '">' + echapper(d.nom) + "</span>";
    }).join("") + "</div>";
  }

  /* ---------- barre du haut, commune ---------- */
  function barre(retour) {
    var b = document.createElement("header");
    b.className = "barre";
    b.innerHTML = '<div class="dedans">' +
      '<a class="marque" href="index.html">' + (retour ? icone("retour", 18) : "") + '<span class="pastille">' + icone("embleme", 18) + '</span>Bible technique</a>' +
      '<span class="vide"></span>' +
      '<button class="bascule-theme" id="bascule-theme" type="button">' +
        '<span class="bt-soleil">' + icone("soleil", 18) + '</span><span class="bt-lune">' + icone("lune", 18) + "</span></button></div>";
    document.body.prepend(b);
    var bt = b.querySelector("#bascule-theme");
    // Le bouton montre le thème où il mène : la lune en clair, le soleil en sombre. Les deux
    // pictogrammes sont posés l'un sur l'autre, la feuille de style fait tourner l'un dehors, l'autre dedans.
    function maj() {
      var clair = document.documentElement.getAttribute("data-theme") === "clair";
      bt.title = clair ? "Passer en thème sombre" : "Passer en thème clair";
      bt.setAttribute("aria-label", bt.title);
    }
    bt.addEventListener("click", function () {
      var suivant = document.documentElement.getAttribute("data-theme") === "clair" ? "sombre" : "clair";
      function basculer() { appliquerTheme(suivant); ecrireTheme(suivant); maj(); }
      // Le nouveau thème s'ouvre en cercle depuis le bouton, là où le navigateur sait le faire
      // et si le poste ne demande pas moins d'animations ; sinon il se pose d'un coup.
      var calme = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || calme) { basculer(); return; }
      var r = bt.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      var rayon = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      document.startViewTransition(basculer).ready.then(function () {
        document.documentElement.animate(
          { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + rayon + "px at " + x + "px " + y + "px)"] },
          { duration: 520, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" });
      }).catch(function () { /* transition refusée : le thème est posé quand même */ });
    });
    maj();
  }

  function pied() {
    var p = document.createElement("footer");
    p.className = "pied";
    p.innerHTML = "Aide-mémoire tenu au fil des affaires : il ne remplace ni les textes ni les normes. Chaque information porte un badge qui dit d'où elle vient.";
    document.querySelector(".page").appendChild(p);
  }

  /* ---------- accueil ---------- */
  function accueil() {
    barre(false);
    var B = window.BIBLE, filtre = null, texte = "";
    var page = document.querySelector(".page");
    page.innerHTML =
      '<section class="entree"><h1>La <span>bible</span> technique</h1>' +
      "<p>Une fiche par notion, un schéma pour comprendre, une liste pour vérifier.</p>" +
      '<div class="recherche">' + icone("loupe", 20) + '<input id="cherche" type="search" placeholder="Chercher une notion : clapet, fusible, DAS..." autocomplete="off"></div></section>' +
      '<div class="section-titre"><h2>Domaines</h2><small>cliquer pour filtrer</small></div><div class="domaines" id="domaines"></div>' +
      '<div class="section-titre"><h2 id="titre-fiches">Fiches</h2><small id="compte"></small></div><div class="fiches" id="fiches"></div>' +
      '<div class="section-titre"><h2>Lire les badges</h2><small>d\'où vient chaque information</small></div><div class="legende" id="legende"></div>';

    document.getElementById("domaines").innerHTML = B.domaines.map(function (d) {
      var n = B.fiches.filter(function (f) { return f.domaines.indexOf(d.cle) >= 0; }).length;
      return '<button class="domaine" type="button" data-cle="' + d.cle + '" style="--c:' + d.couleur + '">' +
        '<span class="ico">' + icone(d.icone, 22) + "</span><b>" + echapper(d.nom) + "</b><small>" + (n ? n + " fiche" + (n > 1 ? "s" : "") : "bientôt") + "</small></button>";
    }).join("");

    document.getElementById("legende").innerHTML = Object.keys(B.sources).map(function (k) {
      return '<div class="item">' + badge(k) + "<span>" + echapper(B.sources[k].aide) + "</span></div>";
    }).join("");

    function rendre() {
      var q = texte.trim().toLowerCase();
      var liste = B.fiches.filter(function (f) {
        if (filtre && f.domaines.indexOf(filtre) < 0) return false;
        if (!q) return true;
        return (f.titre + " " + f.resume + " " + f.motscles.join(" ")).toLowerCase().indexOf(q) >= 0;
      });
      document.getElementById("titre-fiches").textContent = filtre ? domaine(filtre).nom : "Fiches";
      document.getElementById("compte").textContent = liste.length + " fiche" + (liste.length > 1 ? "s" : "");
      document.getElementById("fiches").innerHTML = liste.length ? liste.map(function (f) {
        return '<a class="carte-fiche" href="fiche.html?f=' + encodeURIComponent(f.id) + '">' +
          '<div class="vignette">' + (VIGNETTES[f.vignette] || icone("livre", 34)) + "</div>" +
          "<div><h3>" + echapper(f.titre) + "</h3><p>" + echapper(f.resume) + "</p>" + puces(f.domaines) + "</div></a>";
      }).join("") : '<div class="carte-vide">Pas encore de fiche ici. Elles arrivent au fil des affaires.</div>';
      Array.prototype.forEach.call(document.querySelectorAll(".domaine"), function (el) {
        el.classList.toggle("choisi", el.getAttribute("data-cle") === filtre);
      });
    }
    document.getElementById("domaines").addEventListener("click", function (e) {
      var el = e.target.closest(".domaine"); if (!el) return;
      var c = el.getAttribute("data-cle"); filtre = filtre === c ? null : c; rendre();
    });
    var champ = document.getElementById("cherche");
    champ.addEventListener("input", function () { texte = champ.value; rendre(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== champ) { e.preventDefault(); champ.focus(); }
    });
    rendre();
    pied();
  }

  /* ---------- fiche ---------- */
  // Les fiches et les schémas se chargent avec la version que la page a donnée à bible.js (?v=...),
  // pour qu'une page neuve ne tourne jamais avec des fichiers restés dans le cache du navigateur.
  var VERSION = (/[?&]v=([0-9a-f]+)/.exec((document.currentScript || {}).src || "") || [])[1];
  function charger(src) {
    return new Promise(function (ok, ko) {
      var s = document.createElement("script"); s.src = src + (VERSION ? "?v=" + VERSION : ""); s.onload = ok; s.onerror = ko; document.head.appendChild(s);
    });
  }

  function fiche() {
    barre(true);
    var page = document.querySelector(".page");
    var id = new URLSearchParams(location.search).get("f") || "";
    var entree = window.BIBLE.fiches.filter(function (f) { return f.id === id; })[0];
    if (!entree) { page.innerHTML = '<p class="fil">Fiche introuvable. <a href="index.html">Retour à l\'accueil</a></p>'; return; }
    charger("donnees/fiches/" + id + ".js").then(function () {
      var F = window.BIBLE_FICHE;
      document.title = F.titre + " - Bible technique";
      var html = "";
      var n = 0;
      function bloc(titre, contenu) { n++; return '<section class="bloc"><h2><span class="num">' + n + "</span>" + titre + "</h2>" + contenu + "</section>"; }

      html += '<p class="fil"><a href="index.html">Accueil</a> / ' + entree.domaines.map(function (c) { return echapper(domaine(c).nom); }).join(", ") + "</p>";
      html += '<div class="tete-fiche"><h1>' + echapper(F.titre) + '</h1><p class="soustitre">' + F.soustitre + "</p>" + puces(entree.domaines) + "</div>";

      if (F.schema) html += bloc("Le principe en image", '<div id="schema"></div>');
      if (F.cours) html += bloc("Le cours, pas à pas", '<div id="cours"></div>');
      html += bloc("En 30 secondes", '<ul class="essentiel">' + F.essentiel.map(function (a) { return "<li>" + affirmation(a) + "</li>"; }).join("") + "</ul>");
      html += bloc("Les chiffres à retenir", '<div class="tuiles">' + F.chiffres.map(function (c) {
        return '<div class="tuile"><div class="valeur">' + c.valeur + '</div><div class="libelle">' + c.libelle + "</div>" + badge(c.s, c.ref) + "</div>";
      }).join("") + "</div>");
      if (F.decision) html += bloc(F.decision.titre, '<div class="arbre" id="arbre"></div>');
      html += bloc("Ce que je vérifie", '<div class="colonnes">' + F.verifications.map(function (col) {
        return '<div class="colonne"><h3><span class="ico">' + icone(col.icone, 18) + "</span>" + echapper(col.titre) + "</h3>" +
          col.points.map(function (p) { return '<label class="coche"><input type="checkbox"><span>' + affirmation(p) + "</span></label>"; }).join("") + "</div>";
      }).join("") + "</div>");
      html += bloc("Les pièges", '<div class="pieges">' + F.pieges.map(function (p) {
        return '<div class="piege"><span class="ico">' + icone("alerte", 18) + "</span><p>" + affirmation(p) + "</p></div>";
      }).join("") + "</div>");
      if (F.confondre) html += bloc("À ne pas confondre", '<div class="confondre">' + F.confondre.map(function (c) {
        return "<div><b>" + c.titre + "</b>" + affirmation(c) + "</div>";
      }).join("") + "</div>");
      if (F.vu_sur) html += bloc("Vu sur les affaires", '<div class="frise">' + F.vu_sur.map(function (v) {
        return '<div class="evenement"><div class="date">' + echapper(v.date) + " · " + echapper(v.contexte) + "</div><p>" + v.fait + " " + badge("cas") + "</p></div>";
      }).join("") + "</div>");
      html += bloc("Pour aller plus loin", '<ul class="sources">' + F.references.map(function (r) {
        return "<li>" + badge(r.s) + "<span>" + r.t + "</span></li>";
      }).join("") + "</ul>");

      page.innerHTML = html;
      if (F.decision) arbre(document.getElementById("arbre"), F.decision);
      if (F.schema) charger("schemas/" + F.schema + ".js").then(function () {
        window.BIBLE_SCHEMAS[F.schema](document.getElementById("schema"), { badge: badge });
        if (F.cours) cours(document.getElementById("cours"), F.cours, id);
      });
      pied();
    }, function () {
      page.innerHTML = '<p class="fil">Impossible de charger la fiche. <a href="index.html">Retour à l\'accueil</a></p>';
    });
  }

  /* cours pas à pas, facultatif : { intro, parties: [{ titre, chapitres: [{ id, titre, intro, dessin, lignes, tuiles, calcul, comme, retenir }] }] }.
     Une étape à la fois. fiche.html?f=<fiche>#<id d'étape> ouvre directement une étape. */
  function cours(cadre, def, ficheId) {
    var liste = [], cle = "bible-cours-" + ficheId;
    def.parties.forEach(function (p) { p.chapitres.forEach(function (c) { liste.push({ c: c, partie: p.titre }); }); });
    function chapitre(e, i) {
      var c = e.c, suivant = liste[i + 1];
      return '<article class="chapitre" data-c="' + c.id + '" hidden>' +
        '<p class="chapitre-partie">' + echapper(e.partie) + " · étape " + (i + 1) + " sur " + liste.length + "</p>" +
        "<h3>" + c.titre + "</h3>" +
        (c.intro ? '<p class="chapitre-intro">' + c.intro + "</p>" : "") +
        (c.dessin ? '<div class="chapitre-dessin" data-dessin="' + c.dessin + '"></div>' : "") +
        (c.lignes ? '<ul class="chapitre-lignes">' + c.lignes.map(function (a) { return "<li>" + affirmation(a) + "</li>"; }).join("") + "</ul>" : "") +
        (c.tuiles ? '<div class="chapitre-tuiles">' + c.tuiles.map(function (a) {
          return '<div class="chapitre-tuile"><span class="ico" data-ico="' + (a.ico || "") + '"></span><div><b>' + a.titre + "</b><span>" + affirmation(a) + "</span></div></div>";
        }).join("") + "</div>" : "") +
        (c.calcul ? '<ol class="chapitre-calcul">' + c.calcul.map(function (a) {
          return '<li><div class="question">' + a.q + '</div><div class="operation">' + a.op + ' <b>' + a.res + "</b></div>" + (a.t ? "<p>" + a.t + " " + badge(a.s, a.ref) + "</p>" : "<p>" + badge(a.s, a.ref) + "</p>") + "</li>";
        }).join("") + "</ol>" : "") +
        (c.comme ? '<p class="chapitre-comme"><b>Pour se le représenter.</b> ' + c.comme + "</p>" : "") +
        '<p class="chapitre-retenir"><b>À retenir.</b> ' + c.retenir + "</p>" +
        '<div class="chapitre-nav">' +
        (i > 0 ? '<button class="bouton" type="button" data-aller="' + (i - 1) + '">Étape précédente</button>' : "<span></span>") +
        (suivant ? '<button class="bouton actif" type="button" data-aller="' + (i + 1) + '">Suivant : ' + suivant.c.titre + "</button>" : "") +
        "</div></article>";
    }
    var n = 0;
    cadre.innerHTML =
      (def.intro ? '<p class="cours-intro">' + def.intro + "</p>" : "") +
      '<div class="cours-points">' + liste.map(function (e, i) {
        return '<button class="cours-point" type="button" data-aller="' + i + '" title="' + echapper(e.c.titre.replace(/<[^>]+>/g, "")) + '">' + (i + 1) + "</button>";
      }).join("") + "</div>" +
      '<details class="cours-sommaire"><summary>Voir le sommaire</summary><div class="cours-sommaire-grille">' + def.parties.map(function (p) {
        return "<div><h4>" + echapper(p.titre) + "</h4>" + p.chapitres.map(function (c) {
          n++;
          return '<button type="button" data-aller="' + (n - 1) + '">' + n + ". " + c.titre + "</button>";
        }).join("") + "</div>";
      }).join("") + "</div></details>" +
      '<div class="cours-etapes">' + liste.map(chapitre).join("") + "</div>";
    Array.prototype.forEach.call(cadre.querySelectorAll(".chapitre-tuile .ico"), function (el) {
      el.innerHTML = window.BIBLE_ICONES[el.getAttribute("data-ico")] || "";
    });
    var articles = cadre.querySelectorAll(".chapitre"), points = cadre.querySelectorAll(".cours-point");
    function montrer(i, defiler) {
      Array.prototype.forEach.call(articles, function (a, k) { a.hidden = k !== i; });
      Array.prototype.forEach.call(points, function (p, k) { p.classList.toggle("actif", k === i); p.classList.toggle("vu", k < i); });
      var d = articles[i].querySelector(".chapitre-dessin");
      if (d && !d.firstChild && window.BIBLE_DESSINS[d.getAttribute("data-dessin")]) {
        window.BIBLE_DESSINS[d.getAttribute("data-dessin")](d, { badge: badge });
      }
      try { history.replaceState(null, "", "#" + liste[i].c.id); localStorage.setItem(cle, liste[i].c.id); } catch (e) { /* facultatif */ }
      if (defiler) cadre.scrollIntoView({ block: "start" });
    }
    function indice(id) {
      for (var i = 0; i < liste.length; i++) if (liste[i].c.id === id) return i;
      return -1;
    }
    cadre.addEventListener("click", function (e) {
      var b = e.target.closest("[data-aller]"); if (!b) return;
      var s = cadre.querySelector(".cours-sommaire");
      if (s.contains(b)) s.open = false;
      montrer(+b.getAttribute("data-aller"), true);
    });
    window.addEventListener("hashchange", function () {
      var i = indice(location.hash.slice(1));
      if (i >= 0) montrer(i, true);
    });
    var depart = indice(location.hash.slice(1));
    if (depart >= 0) { montrer(depart, false); cadre.scrollIntoView({ block: "start" }); return; }
    var memoire = -1;
    try { memoire = indice(localStorage.getItem(cle)); } catch (e) { /* facultatif */ }
    montrer(memoire >= 0 ? memoire : 0, false);
    try { if (memoire < 0) history.replaceState(null, "", location.pathname + location.search); } catch (e) { /* facultatif */ }
  }

  /* arbre de décision : { depart, noeuds: { id: { q, choix: [{ r, vers }] } | { verdict, texte, s, ref } } } */
  function arbre(cadre, def) {
    function poser(id, profondeur) {
      while (cadre.children.length > profondeur) cadre.removeChild(cadre.lastChild);
      var nd = def.noeuds[id];
      var el = document.createElement("div");
      if (nd.verdict) {
        el.className = "verdict";
        el.innerHTML = "<b>" + nd.verdict + "</b><p>" + affirmation({ t: nd.texte, s: nd.s, ref: nd.ref }) + "</p>";
        cadre.appendChild(el);
        return;
      }
      el.className = "etape";
      el.innerHTML = '<div class="question">' + nd.q + '</div><div class="choix">' +
        nd.choix.map(function (c, i) { return '<button class="bouton" type="button" data-i="' + i + '">' + c.r + "</button>"; }).join("") + "</div>";
      el.addEventListener("click", function (e) {
        var b = e.target.closest("button"); if (!b) return;
        Array.prototype.forEach.call(el.querySelectorAll("button"), function (x) { x.classList.toggle("actif", x === b); });
        el.classList.add("repondue");
        poser(nd.choix[+b.getAttribute("data-i")].vers, profondeur + 1);
      });
      cadre.appendChild(el);
    }
    poser(def.depart, 0);
  }

  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};
  window.BIBLE_DESSINS = window.BIBLE_DESSINS || {};
  window.BIBLE_ICONES = window.BIBLE_ICONES || {};
  window.Bible = { accueil: accueil, fiche: fiche, icone: icone };
})();
