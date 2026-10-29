/* Bible technique : thème, pictogrammes, badges, accueil et rendu des fiches.
   Tout se construit dans le navigateur à partir de donnees/ : aucun build, la page marche hors ligne. */

(function () {
  "use strict";

  /* ---------- thème : sombre par défaut, clair mémorisé par navigateur ---------- */
  function lireTheme() { try { return localStorage.getItem("bible-theme"); } catch (e) { return null; } }
  function ecrireTheme(t) { try { localStorage.setItem("bible-theme", t); } catch (e) { /* navigation privée */ } }
  function appliquerTheme(t) {
    if (t === "clair") document.documentElement.setAttribute("data-theme", "clair");
    else document.documentElement.removeAttribute("data-theme");
  }
  appliquerTheme(lireTheme());

  /* ---------- pictogrammes (traits 24 x 24) ---------- */
  var ICONES = {
    vent: '<path d="M3 8h11a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h8"/>',
    flamme: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.6 1 2.5 2 3 0-3 .5-5.5.5-8z"/>',
    flocon: '<path d="M12 2v20M4 7l16 10M20 7L4 17M9 4l3 3 3-3M9 20l3-3 3 3"/>',
    gouttes: '<path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11z"/>',
    bouclier: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    thermometre: '<path d="M14 14.5V5a2 2 0 0 0-4 0v9.5a4 4 0 1 0 4 0z"/><path d="M12 9v7"/>',
    eclair: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    livre: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',
    loupe: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    soleil: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    lune: '<path d="M20 14a8 8 0 1 1-10-10 7 7 0 0 0 10 10z"/>',
    plan: '<path d="M4 4h16v16H4z"/><path d="M4 10h16M10 10v10"/>',
    casque: '<path d="M4 16a8 8 0 0 1 16 0"/><path d="M2 16h20v3H2zM12 8V5"/>',
    cle: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
    alerte: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
    retour: '<path d="M15 18l-6-6 6-6"/>'
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
      '<rect x="4" y="50" width="8" height="8" rx="2" fill="var(--danger)"/></svg>'
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
      '<a class="marque" href="index.html">' + (retour ? icone("retour", 18) : "") + '<span class="pastille">B</span>Bible technique</a>' +
      '<span class="vide"></span>' +
      '<button class="bouton" id="bascule-theme" type="button" aria-label="Changer de thème"></button></div>';
    document.body.prepend(b);
    var bt = b.querySelector("#bascule-theme");
    function maj() {
      var clair = document.documentElement.getAttribute("data-theme") === "clair";
      bt.innerHTML = icone(clair ? "lune" : "soleil", 16);
      bt.title = clair ? "Passer en sombre" : "Passer en clair";
    }
    bt.addEventListener("click", function () {
      var clair = document.documentElement.getAttribute("data-theme") === "clair";
      appliquerTheme(clair ? "sombre" : "clair"); ecrireTheme(clair ? "sombre" : "clair"); maj();
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
      "<p>CVC, plomberie, sécurité incendie, thermique : une fiche par notion, un schéma pour comprendre, une liste pour vérifier.</p>" +
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
  function charger(src) {
    return new Promise(function (ok, ko) {
      var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s);
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
      });
      pied();
    }, function () {
      page.innerHTML = '<p class="fil">Impossible de charger la fiche. <a href="index.html">Retour à l\'accueil</a></p>';
    });
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
  window.Bible = { accueil: accueil, fiche: fiche, icone: icone };
})();
