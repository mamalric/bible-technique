/* Schéma et dessins du cours : les bases de la ventilation.
   Le schéma du haut de fiche suit l'air de dehors à dehors, pièce par pièce.
   Les dessins (BIBLE_DESSINS) illustrent les étapes du cours, dans donnees/fiches/bases-ventilation.js.
   Dessiné pour la bible. Les courbes de perte de charge et d'entretien sont des illustrations, pas des valeurs de calcul. */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};
  window.BIBLE_DESSINS = window.BIBLE_DESSINS || {};
  window.BIBLE_ICONES = window.BIBLE_ICONES || {};

  var ED695 = "INRS, guide ED 695";
  var ED795 = "INRS, guide ED 795";
  var NT92 = "INRS, Hygiène et sécurité du travail n° 264, septembre 2021";
  var QAI = "INRS, page Qualité de l'air intérieur, mars 2024";
  var CEREMA = "Cerema Occitanie, colloque Bâtiment santé et rénovation, juin 2026";
  var RSD = "règlement sanitaire départemental type, article 64";

  var STYLE =
    ".vc-t{fill:var(--encre-2);font-size:15px;font-family:inherit}" +
    ".vc-b{fill:var(--encre);font-size:16px;font-weight:700;font-family:inherit}" +
    ".vc-p{fill:var(--discret);font-size:13.5px;font-family:inherit}" +
    ".vc-tt{fill:var(--discret);font-size:12.5px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".vc-g{fill:var(--encre);font-size:30px;font-weight:800;font-family:inherit}" +
    ".vc-bleu{fill:var(--s-air)}.vc-orange{fill:var(--s-chaud)}" +
    ".vc-neuf,.vc-vicie{fill:none;stroke-width:4;stroke-linecap:round;stroke-dasharray:10 12;animation:vc-flux 1s linear infinite}" +
    ".vc-neuf{stroke:var(--s-air)}.vc-vicie{stroke:var(--s-chaud)}" +
    ".vc-fin{stroke-width:2.5;stroke-dasharray:6 8}" +
    "@keyframes vc-flux{to{stroke-dashoffset:-22}}" +
    ".vc-arret{animation-play-state:paused;opacity:.2}" +
    ".vc-mur{fill:var(--s-paroi)}" +
    ".vc-cadre{fill:var(--carte);stroke:var(--s-gaine-bord);stroke-width:2.5}" +
    ".vc-gaine{fill:var(--s-gaine);stroke:var(--s-gaine-bord);stroke-width:2}" +
    ".vc-pers{fill:var(--encre-2)}" +
    ".vc-fan{fill:var(--carte);stroke:var(--encre);stroke-width:2.5}" +
    ".vc-pale{fill:none;stroke:var(--encre);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:vc-tourne 1s linear infinite}" +
    "@keyframes vc-tourne{to{transform:rotate(360deg)}}" +
    ".vc-courbe{fill:none;stroke-width:3.5;stroke-linecap:round}" +
    ".vc-m{display:none}" +
    ".vc-pt{cursor:pointer}.vc-pt:focus{outline:none}" +
    ".vc-pt circle{fill:var(--accent);stroke:var(--fond-2);stroke-width:2.5;transition:fill .2s}" +
    ".vc-pt text{fill:var(--accent-encre);font-size:13px;font-weight:800;font-family:inherit;text-anchor:middle;dominant-baseline:central;pointer-events:none}" +
    ".vc-pt:hover circle,.vc-pt:focus circle{fill:var(--lien)}" +
    ".vc-pt.choisi circle{fill:var(--encre)}.vc-pt.choisi text{fill:var(--fond)}" +
    ".vc-reglages{display:grid;grid-template-columns:auto 1fr auto;gap:8px 12px;align-items:center;width:100%}" +
    ".vc-reglages label{font-weight:600;font-size:15px}" +
    ".vc-reglages input{width:100%;accent-color:var(--accent)}" +
    ".vc-reglages output{font-variant-numeric:tabular-nums;font-weight:700;min-width:5.5em;text-align:right}" +
    ".vc-boutons{display:flex;gap:8px;flex-wrap:wrap;align-items:center;width:100%}" +
    "@media (max-width:600px){.vc-pt circle{r:21px}.vc-pt text{font-size:22px}" +
    ".vc-reglages{grid-template-columns:1fr auto}.vc-reglages label{grid-column:1/-1;margin-bottom:-4px}}";

  function injecter() {
    if (document.getElementById("vc-style")) return;
    var s = document.createElement("style");
    s.id = "vc-style"; s.textContent = STYLE;
    document.head.appendChild(s);
  }
  function svg(h, aria, c, l) {
    return '<svg viewBox="0 0 ' + (l || 560) + " " + h + '" role="img" aria-label="' + aria + '">' + c + "</svg>";
  }
  function t(x, y, s, cls, ancre, id) {
    return '<text class="' + (cls || "vc-t") + '" x="' + x + '" y="' + y + '"' + (ancre ? ' text-anchor="' + ancre + '"' : "") + (id ? ' id="' + id + '"' : "") + ">" + s + "</text>";
  }
  function flux(cls, d, id) {
    return '<path class="' + cls + '" d="' + (d || "") + '"' + (id ? ' id="' + id + '"' : "") + "/>";
  }
  function personne(x, y) {
    return '<circle class="vc-pers" cx="' + x + '" cy="' + (y - 46) + '" r="10"/><path class="vc-pers" d="M' + (x - 14) + " " + y + "v-18a14 14 0 0 1 28 0v18z\"/>";
  }
  function ventilo(x, y, r) {
    r = r || 16;
    return '<circle class="vc-fan" cx="' + x + '" cy="' + y + '" r="' + r + '"/>' +
      '<path class="vc-pale" d="M' + x + " " + (y - r + 4) + "V" + (y + r - 4) + "M" + (x - r + 4) + " " + y + "H" + (x + r - 4) + '"/>';
  }
  function champ(id, nom, min, max, pas, val) {
    return '<label for="' + id + '">' + nom + '</label><input id="' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + pas + '" value="' + val + '"><output id="' + id + '-v"></output>';
  }
  function nombre(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function virgule(n, d) { return n.toFixed(d).replace(".", ","); }
  function afficher(racine, cls, cle) {
    Array.prototype.forEach.call(racine.querySelectorAll("." + cls), function (g) { g.style.display = g.classList.contains(cls + "-" + cle) ? "inline" : "none"; });
  }

  /* un dessin : un cadre, des commandes si besoin, une note si besoin */
  function monter(fn) {
    return function (el, ctx) {
      injecter();
      el.innerHTML = '<div class="schema-cadre"></div><div class="schema-commandes"></div><p class="schema-note"></p>';
      var note = el.querySelector(".schema-note"), cmd = el.querySelector(".schema-commandes");
      fn(el.querySelector(".schema-cadre"), cmd, function (texte, s, ref) { note.innerHTML = texte + " " + ctx.badge(s, ref); });
      if (!cmd.children.length) cmd.parentNode.removeChild(cmd);
      if (!note.textContent) note.parentNode.removeChild(note);
    };
  }

  /* ---------- schéma de tête : le trajet de l'air ---------- */
  var ETAPES = [
    { x: 22, y: 92, nom: "Prise d'air neuf", t: "L'air est pris dehors, par une prise à lames inclinées qui arrête la pluie. Elle reste loin des rejets d'air.", s: "expert", ref: ED695 + ", lexique et chapitre 6" },
    { x: 177, y: 92, nom: "Filtre", t: "Il arrête les particules : l'air qui entre est plus propre. Il s'encrasse avec le temps et se change.", s: "expert", ref: ED695 + ", lexique et paragraphe 4.1.3" },
    { x: 360, y: 24, nom: "Échangeur", t: "L'air qui part, encore chaud, cède une partie de sa chaleur à l'air neuf qui arrive. Les deux se croisent sans se mélanger.", s: "expert", ref: ED695 + ", lexique et chapitre 6" },
    { x: 440, y: 85, nom: "Batterie", t: "Elle réchauffe ou refroidit l'air, avec des tubes à ailettes parcourus par de l'eau, ou des résistances électriques.", s: "expert", ref: ED695 + ", lexique" },
    { x: 490, y: 85, nom: "Ventilateur de soufflage", t: "C'est lui qui donne à l'air l'énergie de circuler. Il pousse l'air dans le réseau jusqu'au local.", s: "expert", ref: ED695 + ", paragraphe 5.1" },
    { x: 556, y: 172, nom: "Gaine", t: "L'air voyage dans un conduit, souvent en tôle. Il y frotte, et cela lui coûte de la pression : c'est la perte de charge.", s: "expert", ref: ED695 + ", lexique et paragraphe 4.1.3" },
    { x: 556, y: 224, nom: "Bouche de soufflage", t: "L'air entre dans le local par une bouche, qui l'oriente et parfois règle son débit.", s: "expert", ref: ED695 + ", lexique" },
    { x: 360, y: 226, nom: "Le local", t: "L'air neuf se mélange à celui du local. Il se charge de ce qu'y rejettent les occupants et les matériaux : CO2, vapeur d'eau, odeurs.", s: "expert", ref: ED695 + ", paragraphe 8.1 ; " + QAI },
    { x: 150, y: 212, nom: "Bouche de reprise", t: "Une autre bouche reprend l'air du local. Il doit en sortir autant qu'il en entre.", s: "expert", ref: ED695 + ", lexique et paragraphe 7.1" },
    { x: 560, y: 96, nom: "Ventilateur d'extraction", t: "Il aspire cet air à travers le réseau de reprise, puis à travers l'échangeur.", s: "expert", ref: ED695 + ", paragraphe 5.1" },
    { x: 684, y: 92, nom: "Rejet", t: "L'air part dehors, loin de la prise d'air neuf, pour ne pas être réaspiré.", s: "expert", ref: ED695 + ", chapitre 6" }
  ];

  window.BIBLE_SCHEMAS.ventilation = function (racine, ctx) {
    injecter();
    var pts = ETAPES.map(function (e, i) {
      return '<g class="vc-pt" data-i="' + i + '" tabindex="0" role="button" aria-label="' + e.nom + '"><circle cx="' + e.x + '" cy="' + e.y + '" r="12"/><text x="' + e.x + '" y="' + e.y + '">' + (i + 1) + "</text></g>";
    }).join("");
    racine.innerHTML =
      '<div class="schema-cadre">' + svg(400, "Trajet de l'air : prise d'air, filtre, échangeur, batterie, ventilateur, gaine, bouche, local, reprise, extraction et rejet",
        t(6, 20, "DEHORS", "vc-tt") + t(714, 20, "DEHORS", "vc-tt", "end") +
        '<rect x="42" y="168" width="636" height="204" fill="var(--carte)"/>' +
        '<rect class="vc-mur" x="30" y="156" width="660" height="12"/><rect class="vc-mur" x="30" y="372" width="660" height="12"/>' +
        '<rect class="vc-mur" x="30" y="156" width="12" height="228"/><rect class="vc-mur" x="678" y="156" width="12" height="228"/>' +
        '<rect class="vc-gaine" x="110" y="26" width="500" height="118" rx="6"/>' + t(120, 136, "CAISSON", "vc-tt") +
        '<rect class="vc-gaine" x="0" y="44" width="112" height="24"/><rect class="vc-gaine" x="608" y="44" width="112" height="24"/>' +
        '<rect class="vc-gaine" x="190" y="142" width="20" height="58"/><rect class="vc-gaine" x="510" y="142" width="20" height="58"/>' +
        '<rect x="176" y="198" width="48" height="10" rx="2" fill="var(--encre-2)"/><rect x="496" y="198" width="48" height="10" rx="2" fill="var(--encre-2)"/>' +
        '<rect x="320" y="34" width="80" height="102" rx="4" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
        '<path d="M14 46l10 6M14 54l10 6M14 62l10 6" stroke="var(--encre)" stroke-width="2.5"/>' +
        '<rect x="170" y="42" width="14" height="28" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/><path d="M172 47h10M172 53h10M172 59h10M172 65h10" stroke="var(--encre-2)" stroke-width="1.5"/>' +
        flux("vc-neuf", "M4 56H320L400 114H520V204") +
        flux("vc-vicie", "M200 204V114H320L400 56H716") +
        flux("vc-neuf", "M520 214C504 276 430 292 360 292") +
        flux("vc-vicie", "M360 292C290 292 216 276 200 214") +
        '<rect x="432" y="99" width="16" height="30" fill="var(--carte)" stroke="var(--s-chaud)" stroke-width="2"/><path d="M436 103l8 5-8 5 8 5-8 5" fill="none" stroke="var(--s-chaud)" stroke-width="2"/>' +
        ventilo(490, 114, 15) + ventilo(560, 56, 15) +
        personne(290, 372) + personne(360, 372) + personne(430, 372) +
        t(56, 36, "air neuf", "vc-b vc-bleu", "middle") + t(650, 36, "air rejeté", "vc-b vc-orange", "middle") +
        t(62, 360, "le local", "vc-p") +
        pts, 720) + "</div>" +
      '<div class="schema-commandes"><button class="bouton actif" type="button" id="vc-suivre">Suivre l\'air</button><span class="schema-etat"></span></div>' +
      '<p class="schema-note"></p>';
    var note = racine.querySelector(".schema-note"), etat = racine.querySelector(".schema-etat");
    var pastilles = racine.querySelectorAll(".vc-pt"), courant = 0;
    function montrer(i) {
      courant = i;
      Array.prototype.forEach.call(pastilles, function (p, k) { p.classList.toggle("choisi", k === i); });
      etat.textContent = (i + 1) + " sur " + ETAPES.length + " : " + ETAPES[i].nom;
      note.innerHTML = ETAPES[i].t + " " + ctx.badge(ETAPES[i].s, ETAPES[i].ref);
    }
    racine.querySelector(".schema-cadre").addEventListener("click", function (e) {
      var p = e.target.closest(".vc-pt"); if (p) montrer(+p.getAttribute("data-i"));
    });
    racine.querySelector(".schema-cadre").addEventListener("keydown", function (e) {
      var p = e.target.closest(".vc-pt");
      if (p && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); montrer(+p.getAttribute("data-i")); }
    });
    racine.querySelector("#vc-suivre").addEventListener("click", function () { montrer((courant + 1) % ETAPES.length); });
    montrer(0);
  };

  /* ---------- 1. ventiler ---------- */
  window.BIBLE_DESSINS.air = monter(function (cadre) {
    cadre.innerHTML = svg(280, "Un local : l'air neuf entre d'un côté, l'air vicié sort de l'autre",
      t(62, 24, "DEHORS", "vc-tt", "middle") + t(498, 24, "DEHORS", "vc-tt", "middle") +
      '<rect class="vc-cadre" x="110" y="46" width="340" height="210"/>' + t(280, 72, "LE LOCAL", "vc-tt", "middle") +
      personne(225, 256) + personne(280, 256) + personne(335, 256) +
      '<rect class="vc-gaine" x="10" y="92" width="104" height="26"/><rect class="vc-gaine" x="446" y="92" width="104" height="26"/>' +
      flux("vc-neuf", "M14 105H236") + flux("vc-vicie", "M324 105H546") +
      t(62, 84, "air neuf", "vc-b vc-bleu", "middle") + t(498, 84, "air vicié", "vc-b vc-orange", "middle") +
      t(280, 148, "il s'y mélange et se charge", "vc-p", "middle"));
  });

  /* ---------- 2. d'où vient la saleté ---------- */
  window.BIBLE_DESSINS.sources = monter(function (cadre) {
    function monte(x, y) { return flux("vc-vicie vc-fin", "M" + x + " " + y + "q-12 -14 0 -28q12 -14 0 -28"); }
    function etiquette(x, nom, detail) { return t(x, 92, nom, "vc-b", "middle") + t(x, 110, detail, "vc-p", "middle"); }
    cadre.innerHTML = svg(340, "Ce qui salit l'air : occupants, bureautique, mobilier, produits d'entretien, air extérieur et sol",
      t(280, 22, "dehors : trafic, pollens", "vc-t", "middle") + flux("vc-vicie vc-fin", "M280 32V64") +
      '<rect class="vc-cadre" x="20" y="66" width="520" height="224"/><rect class="vc-mur" x="20" y="290" width="520" height="12"/>' +
      etiquette(92, "occupants", "CO2, vapeur d'eau") + etiquette(216, "bureautique", "appareils") + etiquette(340, "mobilier", "matériaux") + etiquette(464, "entretien", "produits") +
      personne(92, 290) + monte(92, 228) +
      '<rect x="186" y="246" width="60" height="7" fill="var(--encre-2)"/><path d="M192 253v37M240 253v37" stroke="var(--encre-2)" stroke-width="4"/><rect x="198" y="222" width="36" height="24" rx="3" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2"/>' + monte(216, 216) +
      '<rect x="314" y="196" width="52" height="94" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2"/><path d="M340 196v94" stroke="var(--encre-2)" stroke-width="2"/>' + monte(340, 190) +
      '<path d="M452 290v-46q0-8 8-12v-12h10v12q8 4 8 12v46z" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2"/>' + monte(465, 214) +
      flux("vc-vicie vc-fin", "M200 332V304") + t(214, 328, "sol : radon, surtout en sous-sol et au rez-de-chaussée", "vc-p"));
  });

  /* ---------- 3. le CO2 ---------- */
  function yCo2(c) { return 276 - (c - 400) * 80 / 600; }
  window.BIBLE_DESSINS.co2 = monter(function (cadre, commandes, dire) {
    var marque = "";
    [[800, "800"], [1000, "1 000"], [1300, "1 300"]].forEach(function (m) {
      var y = yCo2(m[0]);
      marque += '<path d="M410 ' + y + 'h60" stroke="' + (m[0] === 1300 ? "var(--danger)" : "var(--encre)") + '" stroke-width="2"/>' + t(404, y + 5, m[1], "vc-t", "end");
    });
    cadre.innerHTML = svg(320, "Local occupé, avec une jauge de CO2 qui dépend du débit d'air neuf par personne",
      t(160, 26, "LE LOCAL", "vc-tt", "middle") +
      '<rect class="vc-cadre" x="30" y="60" width="260" height="216"/><rect id="vc-brume" x="32" y="62" width="256" height="212" fill="var(--s-chaud)" opacity="0"/>' +
      personne(95, 276) + personne(160, 276) + personne(225, 276) +
      '<rect class="vc-gaine" x="0" y="84" width="56" height="22"/><rect class="vc-gaine" x="264" y="84" width="56" height="22"/>' +
      flux("vc-neuf vc-f", "M2 95H100") + flux("vc-vicie vc-f", "M220 95H318") +
      t(108, 100, "air neuf", "vc-p") + t(212, 100, "air vicié", "vc-p", "end") +
      t(440, 38, "", "vc-g", "middle", "vc-co2") +
      '<rect x="415" y="60" width="50" height="240" rx="6" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
      '<rect id="vc-niveau" x="417" y="298" width="46" height="0" fill="var(--ok)"/>' + marque +
      '<path d="M410 276h60" stroke="var(--discret)" stroke-width="2" stroke-dasharray="5 4"/>' + t(404, 281, "dehors 400", "vc-t", "end") +
      t(440, 316, "CO2 en ppm", "vc-p", "middle"));
    commandes.innerHTML = '<div class="vc-reglages">' + champ("vc-q", "Air neuf par personne", 0, 70, 1, 25) + "</div>" +
      '<div class="vc-boutons"><button class="bouton" type="button" data-q="0">Tout fermé</button>' +
      '<button class="bouton" type="button" data-q="18">18 : RSD, bureau</button>' +
      '<button class="bouton" type="button" data-q="25">25 : minimum légal</button>' +
      '<button class="bouton" type="button" data-q="34">34 : tient 1 000 ppm</button>' +
      '<button class="bouton" type="button" data-q="50">50 : conseil INRS</button></div>';
    var champQ = commandes.querySelector("#vc-q");
    function maj() {
      var q = +champQ.value, co2 = q > 0 ? 400 + 20200 / q : 9999;
      commandes.querySelector("#vc-q-v").textContent = q + " m³/h";
      cadre.querySelector("#vc-co2").textContent = co2 > 2000 ? "plus de 2 000" : nombre(co2) + " ppm";
      var haut = Math.max(62, yCo2(Math.min(co2, 2000)));
      var n = cadre.querySelector("#vc-niveau");
      n.setAttribute("y", haut); n.setAttribute("height", 298 - haut);
      n.setAttribute("fill", co2 <= 1000 ? "var(--ok)" : co2 <= 1300 ? "var(--b-expert)" : "var(--danger)");
      cadre.querySelector("#vc-brume").setAttribute("opacity", Math.min(0.32, Math.max(0, (co2 - 800) / 6000)));
      Array.prototype.forEach.call(cadre.querySelectorAll(".vc-f"), function (f) {
        f.classList.toggle("vc-arret", q === 0);
        f.style.animationDuration = q > 0 ? Math.max(0.35, 1.6 - q / 45) + "s" : "";
      });
      if (q === 0) dire("Sans air neuf, le CO2 rejeté par les occupants s'accumule, avec l'humidité et les odeurs.", "expert", QAI);
      else if (co2 > 1300) dire("Trop peu d'air neuf : on dépasse 1 300 ppm, la tolérance du règlement sanitaire. Calcul à l'équilibre : 400 ppm dehors, 20,2 l/h de CO2 par personne assise.", "expert", NT92 + " ; " + RSD);
      else if (co2 > 1000) dire("Entre 1 000 et 1 300 ppm : c'est dans la tolérance du règlement sanitaire, mais au-dessus de son objectif. Le minimum légal de 25 m³/h arrive ici avec les chiffres d'aujourd'hui.", "expert", NT92 + " ; " + RSD);
      else if (co2 > 805) dire("Sous 1 000 ppm : l'objectif du règlement sanitaire est tenu.", "texte", RSD);
      else dire("Autour de 800 ppm ou moins : c'est ce que vise l'INRS, avec au moins 50 m³/h d'air neuf par occupant.", "expert", QAI);
    }
    champQ.addEventListener("input", maj);
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-q]"); if (!b) return;
      champQ.value = b.getAttribute("data-q"); maj();
    });
    maj();
  });

  /* ---------- 4. le débit ---------- */
  window.BIBLE_DESSINS.debit = monter(function (cadre, commandes, dire) {
    var carres = "";
    for (var i = 0; i < 100; i++) {
      carres += '<rect class="vc-carre" x="' + (24 + (i % 10) * 26) + '" y="' + (236 - Math.floor(i / 10) * 24) + '" width="22" height="20" rx="3"/>';
    }
    cadre.innerHTML = svg(300, "Le débit en carrés : chaque carré représente 10 mètres cubes d'air par heure",
      carres + t(24, 282, "1 carré = 10 m³ d'air par heure", "vc-p") +
      t(310, 46, "", "vc-b", "", "vc-op") + t(310, 88, "", "vc-g", "", "vc-res") +
      t(310, 118, "", "vc-t", "", "vc-minute") + t(310, 142, "", "vc-t", "", "vc-ls") +
      t(310, 196, "", "vc-t", "", "vc-vol") + t(310, 234, "", "vc-g", "", "vc-taux") + t(310, 260, "", "vc-p", "", "vc-taux-c"));
    commandes.innerHTML = '<div class="vc-reglages">' + champ("vc-n", "Occupants", 1, 20, 1, 12) + champ("vc-v", "Volume du local", 20, 300, 5, 75) + "</div>" +
      '<div class="vc-boutons"><button class="bouton" type="button" data-u="25">25 m³/h : bureau</button><button class="bouton actif" type="button" data-u="30">30 m³/h : réunion</button><button class="bouton" type="button" data-u="50">50 m³/h : conseil INRS</button></div>';
    var u = 30, cn = commandes.querySelector("#vc-n"), cv = commandes.querySelector("#vc-v");
    function maj() {
      var n = +cn.value, v = +cv.value, q = n * u, plein = Math.ceil(q / 10);
      commandes.querySelector("#vc-n-v").textContent = n;
      commandes.querySelector("#vc-v-v").textContent = v + " m³";
      Array.prototype.forEach.call(cadre.querySelectorAll(".vc-carre"), function (c, k) {
        c.setAttribute("fill", k < plein ? "var(--s-air)" : "none");
        c.setAttribute("stroke", k < plein ? "none" : "var(--ligne-forte)");
      });
      cadre.querySelector("#vc-op").textContent = n + " × " + u + " m³/h";
      cadre.querySelector("#vc-res").textContent = nombre(q) + " m³/h";
      cadre.querySelector("#vc-minute").textContent = "soit " + virgule(q / 60, 1) + " m³ chaque minute";
      cadre.querySelector("#vc-ls").textContent = "soit " + nombre(q / 3.6) + " l/s";
      cadre.querySelector("#vc-vol").textContent = "dans " + v + " m³ de local :";
      cadre.querySelector("#vc-taux").textContent = virgule(q / v, 1) + " vol/h";
      cadre.querySelector("#vc-taux-c").textContent = "soit " + virgule(q / v, 1) + " fois son volume par heure";
    }
    cn.addEventListener("input", maj); cv.addEventListener("input", maj);
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-u]"); if (!b) return;
      u = +b.getAttribute("data-u");
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-u]"), function (x) { x.classList.toggle("actif", x === b); });
      maj();
    });
    maj();
    dire("Occupants × débit par occupant donne le débit du local. Le taux de renouvellement n'est que ce débit divisé par le volume : changer le volume ne change pas le débit.", "expert", NT92);
  });

  /* ---------- 5. les pièces ---------- */
  function ico(c) { return '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' + c + "</svg>"; }
  var AIR = 'stroke="var(--s-air)"', CHAUD = 'stroke="var(--s-chaud)"';
  window.BIBLE_ICONES.prise = ico('<rect x="14" y="10" width="36" height="44" rx="2"/><path d="M14 20l36 8M14 31l36 8M14 42l36 8"/>');
  window.BIBLE_ICONES.filtre = ico('<rect x="14" y="10" width="36" height="44" rx="2"/><path d="M14 16h36l-36 8h36l-36 8h36l-36 8h36l-36 8h36"/>');
  window.BIBLE_ICONES.batterie = ico('<rect x="12" y="10" width="40" height="44" rx="2"/><path ' + CHAUD + ' d="M20 18h24a4 4 0 0 1 0 9H20a4 4 0 0 0 0 9h24a4 4 0 0 1 0 9H20"/>');
  window.BIBLE_ICONES.ventilateur = ico('<circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="4"/><path d="M32 28c-2-12 10-14 12-8s-6 8-12 8zM36 32c12-2 14 10 8 12s-8-6-8-12zM32 36c2 12-10 14-12 8s6-8 12-8zM28 32c-12 2-14-10-8-12s8 6 8 12z"/>');
  window.BIBLE_ICONES.gaine = ico('<rect x="6" y="20" width="44" height="24"/><ellipse cx="50" cy="32" rx="6" ry="12"/><path ' + AIR + ' d="M12 32h26"/>');
  window.BIBLE_ICONES.piquage = ico('<path d="M4 22h56M4 44h20M40 44h20M24 44v14M40 44v14"/><path ' + AIR + ' d="M8 33h30l-6 0M32 36v18"/>');
  window.BIBLE_ICONES.registre = ico('<path d="M6 18h52M6 46h52"/><path stroke-width="4" d="M22 42l20-20"/><circle cx="32" cy="32" r="3"/>');
  window.BIBLE_ICONES.clapet = ico('<path d="M4 20h56M4 44h56"/><rect x="26" y="8" width="12" height="48" fill="var(--s-paroi)" stroke="none"/><path stroke="var(--danger)" stroke-width="4" d="M32 22v20"/>');
  window.BIBLE_ICONES.silencieux = ico('<path d="M4 18h56M4 46h56"/><rect x="16" y="18" width="8" height="11"/><rect x="28" y="35" width="8" height="11"/><rect x="40" y="18" width="8" height="11"/>');
  window.BIBLE_ICONES.bouche = ico('<rect x="8" y="14" width="48" height="16" rx="2"/><path d="M16 14v16M24 14v16M32 14v16M40 14v16M48 14v16"/><path ' + AIR + ' d="M16 38l-6 14M32 38v16M48 38l6 14"/>');
  window.BIBLE_ICONES.echangeur = ico('<rect x="10" y="10" width="44" height="44" rx="2"/><path ' + AIR + ' d="M10 18l44 28"/><path ' + CHAUD + ' d="M10 46l44-28"/>');
  window.BIBLE_ICONES.caisson = ico('<rect x="4" y="16" width="56" height="32" rx="3"/><path d="M18 16v32M32 16v32M46 16v32"/><circle cx="53" cy="32" r="4"/><path d="M8 24l6 8-6 8"/>');
  window.BIBLE_ICONES.travail = ico('<rect x="14" y="12" width="36" height="42"/><path d="M22 20h6M36 20h6M22 30h6M36 30h6M28 54V42h8v12"/>');
  window.BIBLE_ICONES.public = ico('<path d="M8 26L32 10l24 16M12 26v28h40V26M26 54V38h12v16"/>');
  window.BIBLE_ICONES.logement = ico('<path d="M8 32L32 12l24 20M16 26v28h32V26"/><rect x="27" y="38" width="10" height="16"/>');
  window.BIBLE_ICONES.polluant = ico('<rect x="20" y="36" width="24" height="18"/><path ' + CHAUD + ' d="M26 30q-5-6 0-12q5-6 0-12M38 30q-5-6 0-12q5-6 0-12"/>');
  window.BIBLE_ICONES.conseil = ico('<circle cx="32" cy="26" r="16"/><path d="M26 42v10h12V42M28 58h8"/>');

  /* ---------- 6. la pression ---------- */
  window.BIBLE_DESSINS.pression = monter(function (cadre, commandes, dire) {
    cadre.innerHTML = svg(290, "Local et couloir séparés par une porte : l'air passe sous la porte selon l'écart de pression",
      '<rect x="0" y="40" width="560" height="220" fill="var(--carte)"/>' +
      '<rect class="vc-mur" x="0" y="28" width="560" height="12"/><rect class="vc-mur" x="0" y="260" width="560" height="12"/>' +
      '<rect class="vc-mur" x="240" y="40" width="14" height="184"/>' +
      t(120, 70, "COULOIR", "vc-tt", "middle") + t(407, 70, "LE LOCAL", "vc-tt", "middle") +
      '<circle cx="120" cy="140" r="42" fill="var(--fond-2)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' + t(120, 150, "0 Pa", "vc-b", "middle") +
      '<circle cx="407" cy="140" r="42" id="vc-rond" fill="var(--fond-2)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' + t(407, 150, "", "vc-b", "middle", "vc-pv") +
      t(407, 206, "", "vc-p", "middle", "vc-pt2") +
      flux("vc-neuf", "", "vc-sous") +
      t(247, 284, "porte", "vc-p", "middle"));
    commandes.innerHTML = '<div class="vc-reglages">' + champ("vc-p", "Pression du local", -30, 30, 5, -10) + "</div>" +
      '<div class="vc-boutons"><button class="bouton" type="button" data-p="-10">Dépression</button><button class="bouton" type="button" data-p="0">Équilibre</button><button class="bouton" type="button" data-p="10">Surpression</button><span class="schema-etat"></span></div>';
    var cp = commandes.querySelector("#vc-p"), sous = cadre.querySelector("#vc-sous"), etat = commandes.querySelector(".schema-etat");
    function maj() {
      var p = +cp.value, signe = p > 0 ? "+" : p < 0 ? "−" : "";
      commandes.querySelector("#vc-p-v").textContent = signe + Math.abs(p) + " Pa";
      cadre.querySelector("#vc-pv").textContent = signe + Math.abs(p) + " Pa";
      cadre.querySelector("#vc-pt2").textContent = p < 0 ? "dépression" : p > 0 ? "surpression" : "équilibre";
      sous.setAttribute("class", p > 0 ? "vc-vicie" : "vc-neuf");
      sous.setAttribute("d", p > 0 ? "M370 242H120" : "M130 242H380");
      sous.classList.toggle("vc-arret", p === 0);
      sous.style.animationDuration = p === 0 ? "" : Math.max(0.3, 1.5 - Math.abs(p) / 25) + "s";
      etat.textContent = p < 0 ? "L'air rentre dans le local" : p > 0 ? "L'air sort du local" : "Pas de passage d'air";
      if (p < 0) dire("Le local est sous la pression du couloir : l'air rentre par la porte. Son air sale ne part pas vers le couloir. C'est pour cela qu'un local qui dégage des produits toxiques est tenu en légère dépression.", "expert", ED695 + ", chapitre 7");
      else if (p > 0) dire("Le local est au-dessus de la pression du couloir : l'air sort par la porte. L'air des voisins n'y rentre pas. C'est le principe d'un sas maintenu en surpression d'air neuf.", "expert", ED695 + ", chapitre 7");
      else dire("Pas d'écart de pression, pas de mouvement d'air.", "verifier");
    }
    cp.addEventListener("input", maj);
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-p]"); if (!b) return;
      cp.value = b.getAttribute("data-p"); maj();
    });
    maj();
  });

  /* ---------- 7. la compensation ---------- */
  window.BIBLE_DESSINS.compensation = monter(function (cadre, commandes, dire) {
    cadre.innerHTML = svg(300, "Local avec un ventilateur d'extraction : selon que l'entrée d'air est ouverte ou bouchée, l'air circule ou non",
      '<rect class="vc-cadre" x="70" y="76" width="420" height="200"/>' +
      '<rect class="vc-gaine" x="262" y="10" width="36" height="68"/>' +
      flux("vc-vicie vc-c", "M280 128V8") + ventilo(280, 44, 16) +
      flux("vc-neuf vc-c", "M4 192H180C240 192 280 180 280 136") +
      '<rect id="vc-volet" x="64" y="172" width="12" height="40" fill="var(--danger)"/>' +
      t(36, 170, "entrée", "vc-p", "middle") + t(36, 186, "d'air", "vc-p", "middle") +
      personne(380, 276) + personne(430, 276) +
      '<g id="vc-fuite">' + flux("vc-neuf vc-fin", "M556 262H470") + t(526, 244, "fuites", "vc-p", "middle") + "</g>" +
      t(150, 110, "", "vc-g", "middle", "vc-signe") + t(150, 136, "", "vc-t", "middle", "vc-signe-t"));
    commandes.innerHTML = '<div class="vc-boutons"><button class="bouton" type="button" data-e="1">Entrée d\'air ouverte</button><button class="bouton" type="button" data-e="0">Entrée d\'air bouchée</button><span class="schema-etat"></span></div>';
    function choisir(ouvert) {
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-e]"), function (b) { b.classList.toggle("actif", +b.getAttribute("data-e") === (ouvert ? 1 : 0)); });
      Array.prototype.forEach.call(cadre.querySelectorAll(".vc-c"), function (f) { f.classList.toggle("vc-arret", !ouvert); });
      cadre.querySelector("#vc-volet").style.display = ouvert ? "none" : "";
      cadre.querySelector("#vc-fuite").style.display = ouvert ? "none" : "";
      cadre.querySelector("#vc-signe").textContent = ouvert ? "=" : "−";
      cadre.querySelector("#vc-signe-t").textContent = ouvert ? "équilibre" : "dépression";
      commandes.querySelector(".schema-etat").textContent = ouvert ? "Le débit prévu passe" : "Le débit chute";
      if (ouvert) dire("L'air extrait est remplacé par de l'air qui entre : le ventilateur déplace bien le débit prévu, et les polluants partent.", "expert", ED695 + ", paragraphe 7.1, figure 23");
      else dire("Le ventilateur tourne, mais le local se met en dépression et il aspire dans le vide : le débit baisse et les polluants restent. Le peu d'air qui passe arrive par les fuites.", "expert", ED695 + ", paragraphe 7.1, figure 23");
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-e]"); if (b) choisir(b.getAttribute("data-e") === "1");
    });
    choisir(false);
  });

  /* ---------- 8. les quatre systèmes ---------- */
  var SYSTEMES = {
    naturelle: { nom: "Naturelle", etat: "Pression variable : vent et température",
      note: "Pas de ventilateur. Le vent et l'écart de température font bouger l'air, donc le débit change avec la météo. L'air entre en bas et sort en haut.", s: "texte", ref: "code du travail, article R4222-3 ; " + CEREMA },
    extraction: { nom: "Simple flux : on aspire", etat: "Dépression : l'air rentre",
      note: "Un ventilateur aspire l'air vicié ; l'air neuf rentre seul par les entrées d'air. C'est le principe de la VMC. L'air du local ne part pas vers le couloir.", s: "expert", ref: CEREMA },
    insufflation: { nom: "Simple flux : on souffle", etat: "Surpression : l'air sort",
      note: "Un ventilateur souffle l'air neuf, qu'on peut filtrer et préchauffer ; l'air sort seul par des grilles. Il faut un bâtiment assez étanche pour maîtriser les débits.", s: "expert", ref: CEREMA },
    double: { nom: "Double flux", etat: "Équilibre : autant d'entrée que de sortie",
      note: "Un ventilateur souffle, l'autre extrait. Les deux flux se croisent dans un échangeur sans se mélanger : l'air qui part réchauffe celui qui arrive.", s: "expert", ref: CEREMA + " ; " + NT92 }
  };
  window.BIBLE_DESSINS.systemes = monter(function (cadre, commandes, dire) {
    function ouverture(y, h) { return '<rect fill="var(--fond-2)" x="500" y="' + y + '" width="14" height="' + h + '"/>'; }
    cadre.innerHTML = svg(310, "Local en coupe avec ses entrées et sorties d'air, selon quatre systèmes de ventilation",
      t(55, 24, "COULOIR", "vc-tt", "middle") + t(538, 24, "DEHORS", "vc-tt", "middle") +
      '<rect x="0" y="84" width="500" height="196" fill="var(--carte)"/>' +
      '<rect class="vc-mur" x="0" y="70" width="514" height="14"/><rect class="vc-mur" x="0" y="280" width="514" height="14"/><rect class="vc-mur" x="500" y="70" width="14" height="224"/>' +
      '<rect class="vc-mur" x="104" y="84" width="14" height="156"/>' +
      personne(280, 280) + personne(340, 280) + personne(400, 280) +
      flux("vc-neuf vc-m vc-m-extraction", "M36 262H170") + flux("vc-vicie vc-m vc-m-insufflation", "M170 262H36") +
      '<circle cx="190" cy="150" r="28" fill="var(--fond-2)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
      t(190, 161, "", "vc-g", "middle", "vc-signe") + t(190, 198, "", "vc-t", "middle", "vc-signe-t") +
      t(165, 106, "LE LOCAL", "vc-tt", "middle") +
      '<g class="vc-m vc-m-naturelle">' + ouverture(226, 32) + flux("vc-neuf", "M556 242H400") + ouverture(100, 26) + flux("vc-vicie", "M400 113H556") + t(452, 104, "sortie haute", "vc-p", "middle") + t(452, 228, "entrée basse", "vc-p", "middle") + "</g>" +
      '<g class="vc-m vc-m-extraction">' + ouverture(128, 26) + flux("vc-neuf", "M556 141H420") + t(452, 124, "entrée d'air", "vc-p", "middle") + '<rect class="vc-gaine" x="296" y="4" width="28" height="68"/>' + flux("vc-vicie", "M310 134V2") + ventilo(310, 38) + "</g>" +
      '<g class="vc-m vc-m-insufflation">' + ouverture(128, 26) + flux("vc-vicie", "M420 141H556") + t(452, 124, "sortie d'air", "vc-p", "middle") + '<rect class="vc-gaine" x="296" y="4" width="28" height="68"/>' + flux("vc-neuf", "M310 2V134") + ventilo(310, 38) + "</g>" +
      '<g class="vc-m vc-m-double">' + '<rect class="vc-gaine" x="226" y="4" width="28" height="68"/><rect class="vc-gaine" x="366" y="4" width="28" height="68"/>' +
      '<path d="M254 26H280M340 26H366" stroke="var(--s-gaine-bord)" stroke-width="3"/><rect x="280" y="6" width="60" height="42" rx="4" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/><path d="M286 12l48 30M286 42l48-30" stroke="var(--encre-2)" stroke-width="2"/>' +
      t(310, 62, "échangeur", "vc-p", "middle") + flux("vc-neuf", "M240 2V134") + flux("vc-vicie", "M380 134V2") + ventilo(240, 38) + ventilo(380, 38) + "</g>");
    commandes.innerHTML = '<div class="vc-boutons">' + Object.keys(SYSTEMES).map(function (k) {
      return '<button class="bouton" type="button" data-s="' + k + '">' + SYSTEMES[k].nom + "</button>";
    }).join("") + '<span class="schema-etat"></span></div>';
    function choisir(k) {
      var s = SYSTEMES[k];
      afficher(cadre, "vc-m", k);
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-s]"), function (b) { b.classList.toggle("actif", b.getAttribute("data-s") === k); });
      cadre.querySelector("#vc-signe").textContent = { naturelle: "?", extraction: "−", insufflation: "+", double: "=" }[k];
      cadre.querySelector("#vc-signe-t").textContent = { naturelle: "variable", extraction: "dépression", insufflation: "surpression", double: "équilibre" }[k];
      commandes.querySelector(".schema-etat").textContent = s.etat;
      dire(s.note, s.s, s.ref);
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-s]"); if (b) choisir(b.getAttribute("data-s"));
    });
    choisir("extraction");
  });

  /* ---------- 9. diluer ou capter ---------- */
  window.BIBLE_DESSINS.capter = monter(function (cadre) {
    cadre.innerHTML = svg(320, "À gauche, le polluant se mélange à tout le local. À droite, une hotte l'aspire dès sa source.",
      t(140, 26, "DILUER", "vc-b", "middle") + t(420, 26, "CAPTER", "vc-b", "middle") +
      '<rect class="vc-cadre" x="12" y="42" width="256" height="228"/><rect class="vc-cadre" x="292" y="42" width="256" height="228"/>' +
      /* diluer */
      '<circle cx="150" cy="150" r="96" fill="var(--s-chaud)" opacity=".16"/><circle cx="130" cy="190" r="70" fill="var(--s-chaud)" opacity=".14"/>' +
      personne(60, 270) +
      '<rect x="140" y="240" width="50" height="30" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2"/>' +
      flux("vc-vicie vc-fin", "M165 236C150 190 80 180 60 130") + flux("vc-vicie vc-fin", "M165 236C170 170 150 120 110 90") + flux("vc-vicie vc-fin", "M165 236C190 180 220 140 236 80") +
      ventilo(238, 62, 13) +
      /* capter */
      personne(350, 270) +
      '<rect x="450" y="240" width="50" height="30" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2"/>' +
      '<path d="M430 176h90l-30-52h-30z" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/><rect class="vc-gaine" x="460" y="42" width="30" height="84"/>' +
      flux("vc-vicie vc-fin", "M470 236V180") + flux("vc-vicie vc-fin", "M480 236V180") + flux("vc-vicie", "M475 170V46") +
      flux("vc-neuf vc-fin", "M372 200C400 190 420 186 448 180") + flux("vc-neuf vc-fin", "M372 232C410 226 430 214 446 192") +
      t(140, 296, "le polluant se mélange à tout l'air", "vc-p", "middle") + t(140, 314, "et atteint la personne", "vc-p", "middle") +
      t(420, 296, "le polluant part dès sa source", "vc-p", "middle") + t(420, 314, "et l'air propre vient de la personne", "vc-p", "middle"));
  });

  /* ---------- 10. l'air dans le local ---------- */
  var MODES = {
    plan: { nom: "La flèche du plan", etat: "Ce qu'on dessine",
      note: "Sur un plan, une belle flèche va de l'entrée à la sortie. Ce n'est pas ce qui se passe : ces flèches sont très souvent sans fondement réel.", s: "expert", ref: ED695 + ", paragraphe 8.1, figure 25" },
    reel: { nom: "La réalité", etat: "Ce qui se passe",
      note: "L'air neuf se mélange à tout le local, puis une part de ce mélange est évacuée. La ventilation générale marche par dilution, pas par un trajet net.", s: "expert", ref: ED695 + ", paragraphe 8.1, figure 25" },
    court: { nom: "Le court-circuit", etat: "L'air neuf ne sert pas",
      note: "Entrée et sortie trop proches : l'air neuf repart presque aussitôt, et le reste du local stagne.", s: "verifier" },
    transfert: { nom: "D'un local à l'autre", etat: "Vu en plan",
      note: "L'air peut passer d'un local à un autre, sans recyclage : c'est le balayage. Les couloirs et les locaux peu occupés peuvent être ventilés ainsi, si la pollution n'est pas spécifique.", s: "texte", ref: "code du travail, article R4222-7, d'après INRS, aide-mémoire TJ 5" }
  };
  window.BIBLE_DESSINS.balayage = monter(function (cadre, commandes, dire) {
    function bouches(xe, xs) {
      return '<rect class="vc-gaine" x="' + (xe - 14) + '" y="6" width="28" height="50"/><rect x="' + (xe - 24) + '" y="54" width="48" height="8" rx="2" fill="var(--encre-2)"/>' +
        '<rect class="vc-gaine" x="' + (xs - 14) + '" y="6" width="28" height="50"/><rect x="' + (xs - 24) + '" y="54" width="48" height="8" rx="2" fill="var(--encre-2)"/>';
    }
    cadre.innerHTML = svg(300, "L'air dans un local : la flèche du plan, le mélange réel, le court-circuit et le passage d'un local à l'autre",
      '<g class="vc-z vc-z-plan vc-z-reel vc-z-court"><rect class="vc-cadre" x="30" y="56" width="500" height="224"/></g>' +
      '<g class="vc-z vc-z-plan">' + bouches(100, 460) + flux("vc-neuf", "M100 8V70C110 210 240 220 280 220") + flux("vc-vicie", "M280 220C330 220 450 210 460 70V8") + personne(250, 280) + personne(310, 280) + "</g>" +
      '<g class="vc-z vc-z-reel"><rect x="32" y="58" width="496" height="220" fill="var(--s-air)" opacity=".12"/>' + bouches(100, 460) +
      flux("vc-neuf", "M100 8V70C60 150 150 210 220 170C280 130 170 90 140 140") + flux("vc-neuf vc-fin", "M210 240C280 270 360 240 330 180C310 140 250 170 280 210") + flux("vc-neuf vc-fin", "M360 100C430 70 500 130 450 190C420 230 370 190 400 150") +
      flux("vc-vicie", "M430 110C440 90 455 80 460 66V8") + personne(250, 280) + personne(310, 280) + "</g>" +
      '<g class="vc-z vc-z-court"><rect x="32" y="130" width="496" height="148" fill="var(--discret)" opacity=".14"/>' + bouches(240, 320) +
      flux("vc-neuf", "M240 8V68C244 104 262 110 280 110") + flux("vc-vicie", "M280 110C298 110 316 104 320 68V8") + t(280, 164, "air qui stagne", "vc-p", "middle") + personne(120, 280) + personne(440, 280) + "</g>" +
      '<g class="vc-z vc-z-transfert">' +
      '<rect class="vc-cadre" x="24" y="40" width="210" height="220"/><rect class="vc-cadre" x="234" y="40" width="130" height="220"/><rect class="vc-cadre" x="364" y="40" width="170" height="220"/>' +
      t(129, 66, "BUREAU", "vc-tt", "middle") + t(299, 66, "COULOIR", "vc-tt", "middle") + t(449, 66, "SANITAIRES", "vc-tt", "middle") +
      '<rect x="228" y="170" width="12" height="40" fill="var(--fond-2)"/><rect x="358" y="130" width="12" height="40" fill="var(--fond-2)"/>' +
      flux("vc-neuf", "M6 190H234") + flux("vc-neuf", "M234 190C280 190 290 150 366 150") + flux("vc-vicie", "M366 150H450V24") +
      t(46, 180, "air neuf", "vc-p") + t(470, 100, "extraction", "vc-p") + t(299, 240, "air de passage", "vc-p", "middle") + "</g>");
    commandes.innerHTML = '<div class="vc-boutons">' + Object.keys(MODES).map(function (k) {
      return '<button class="bouton" type="button" data-m="' + k + '">' + MODES[k].nom + "</button>";
    }).join("") + '<span class="schema-etat"></span></div>';
    function choisir(k) {
      Array.prototype.forEach.call(cadre.querySelectorAll(".vc-z"), function (g) { g.style.display = g.classList.contains("vc-z-" + k) ? "inline" : "none"; });
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-m]"), function (b) { b.classList.toggle("actif", b.getAttribute("data-m") === k); });
      commandes.querySelector(".schema-etat").textContent = MODES[k].etat;
      dire(MODES[k].note, MODES[k].s, MODES[k].ref);
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-m]"); if (b) choisir(b.getAttribute("data-m"));
    });
    choisir("plan");
  });

  /* ---------- 11. débit et vitesse ---------- */
  /* vitesses limites conseillées pour éviter le bruit, INRS ED 695, tableau IX (locaux industriels, air non chargé) */
  var LIMITES = [[144, 4], [288, 4.5], [540, 5], [1800, 6], [2700, 6.5], [4700, 7], [7200, 7.5], [9000, 8], [12600, 8.5], [18000, 9]];
  function limite(q) {
    if (q <= LIMITES[0][0]) return LIMITES[0][1];
    for (var i = 1; i < LIMITES.length; i++) {
      if (q <= LIMITES[i][0]) {
        var a = LIMITES[i - 1], b = LIMITES[i];
        return a[1] + (b[1] - a[1]) * (q - a[0]) / (b[0] - a[0]);
      }
    }
    return 9;
  }
  window.BIBLE_DESSINS.vitesse = monter(function (cadre, commandes, dire) {
    cadre.innerHTML = svg(280, "Gaine de ventilation dont le diamètre et le débit changent la vitesse de l'air",
      t(280, 26, "vitesse = débit ÷ section", "vc-b", "middle") +
      '<rect id="vc-gaine" class="vc-gaine" x="20" y="60" width="520" height="100"/>' +
      flux("vc-neuf", "M28 90H532", "vc-f-a") + flux("vc-neuf", "M28 110H532", "vc-f-b") + flux("vc-neuf", "M28 130H532", "vc-f-c") +
      t(280, 212, "", "vc-g", "middle", "vc-vit") +
      t(280, 240, "", "vc-t", "middle", "vc-calc") + t(280, 264, "", "vc-p", "middle", "vc-lim"));
    commandes.innerHTML = '<div class="vc-reglages">' + champ("vc-debit", "Débit", 100, 6000, 20, 360) + champ("vc-d", "Diamètre", 100, 800, 25, 200) + "</div>";
    var cd = commandes.querySelector("#vc-debit"), cg = commandes.querySelector("#vc-d");
    function maj() {
      var q = +cd.value, d = +cg.value, s = Math.PI * d * d / 4 / 1e6, v = q / 3600 / s, lim = limite(q);
      commandes.querySelector("#vc-debit-v").textContent = nombre(q) + " m³/h";
      commandes.querySelector("#vc-d-v").textContent = "Ø " + d + " mm";
      var h = Math.max(14, d / 800 * 110), y = 110 - h / 2;
      var g = cadre.querySelector("#vc-gaine"); g.setAttribute("y", y); g.setAttribute("height", h);
      cadre.querySelector("#vc-f-a").setAttribute("d", "M28 " + (110 - h / 4) + "H532");
      cadre.querySelector("#vc-f-c").setAttribute("d", "M28 " + (110 + h / 4) + "H532");
      var duree = Math.max(0.12, Math.min(3, 6 / v)) + "s";
      ["a", "b", "c"].forEach(function (n) { cadre.querySelector("#vc-f-" + n).style.animationDuration = duree; });
      var depasse = v > lim, titre = cadre.querySelector("#vc-vit");
      titre.textContent = virgule(v, 1) + " m/s";
      titre.style.fill = depasse ? "var(--danger)" : "var(--ok)";
      cadre.querySelector("#vc-calc").textContent = virgule(q / 3600, 3) + " m³/s ÷ " + virgule(s, 3) + " m²";
      cadre.querySelector("#vc-lim").textContent = "repère à ce débit : " + virgule(lim, 1) + " m/s au plus, pour limiter le bruit";
      if (depasse) dire("Trop vite pour ce débit : ça siffle, et la perte de charge grimpe avec le carré de la vitesse. Il faut une gaine plus grosse.", "expert", ED695 + ", paragraphe 4.1.3 et tableau IX (locaux industriels, air non chargé)");
      else dire("Le débit dit combien d'air passe, la vitesse à quelle allure. Réduire le diamètre fait monter la vitesse très vite, car la section suit le carré du diamètre.", "expert", ED695 + ", paragraphe 4.1.1 et tableau IX");
    }
    cd.addEventListener("input", maj); cg.addEventListener("input", maj);
    maj();
  });

  /* ---------- 12. perte de charge ---------- */
  window.BIBLE_DESSINS.charge = monter(function (cadre, commandes, dire) {
    var G = { x0: 60, y0: 400, l: 460, h: 220 }, QM = 2, PM = 800, K0 = 90;  /* courbes d'illustration */
    function px(q) { return G.x0 + q / QM * G.l; }
    function py(p) { return G.y0 - p / PM * G.h; }
    var ventil = "";
    for (var q = 0; q <= QM; q += 0.05) ventil += (q === 0 ? "M" : "L") + px(q).toFixed(1) + " " + py(PM * (1 - Math.pow(q / QM, 2))).toFixed(1);
    var coudes = "";
    [0, 1, 2, 3, 4, 5].forEach(function (i) {
      coudes += '<path class="vc-coude" data-i="' + i + '" d="M' + (120 + i * 56) + ' 46v28h28" fill="none" stroke="var(--danger)" stroke-width="5" stroke-linecap="round"/>';
    });
    cadre.innerHTML = svg(430, "Réseau de ventilation et courbes du ventilateur et du réseau, qui se croisent au point de fonctionnement",
      t(20, 24, "LE RÉSEAU", "vc-tt") +
      '<rect class="vc-gaine" x="20" y="40" width="520" height="44"/>' + flux("vc-neuf", "M28 62H530", "vc-f4") + ventilo(490, 62, 18) + coudes +
      '<rect id="vc-filtre" x="52" y="42" width="20" height="40" fill="var(--ok)" stroke="var(--encre-2)" stroke-width="1.5"/>' + t(62, 104, "filtre", "vc-p", "middle") + t(490, 104, "ventilateur", "vc-p", "middle") +
      t(280, 118, "", "vc-g", "middle", "vc-pct") + t(280, 142, "du débit d'origine", "vc-t", "middle") + t(280, 164, "", "vc-p", "middle", "vc-dp") +
      '<path d="M' + G.x0 + " " + (G.y0 - G.h - 6) + "V" + G.y0 + "H" + (G.x0 + G.l + 6) + '" fill="none" stroke="var(--discret)" stroke-width="2"/>' +
      t(G.x0 - 6, G.y0 - G.h - 10, "pression", "vc-p") + t(G.x0 + G.l, G.y0 + 20, "débit", "vc-p", "end") +
      '<path class="vc-courbe" d="' + ventil + '" stroke="var(--s-air)"/>' +
      '<path id="vc-reseau" class="vc-courbe" stroke="var(--s-chaud)"/>' +
      t(px(1.28), py(640), "ce que donne le ventilateur", "vc-p vc-bleu") +
      t(0, 0, "ce que demande le réseau", "vc-p vc-orange", "end", "vc-lab") +
      '<path id="vc-rappel" stroke="var(--discret)" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<circle id="vc-point" r="9" fill="var(--encre)" stroke="var(--carte)" stroke-width="3"/>');
    commandes.innerHTML = '<div class="vc-reglages">' + champ("vc-nc", "Coudes en plus", 0, 6, 1, 0) + champ("vc-enc", "Encrassement du filtre", 0, 100, 5, 0) + "</div>";
    var cc = commandes.querySelector("#vc-nc"), ce = commandes.querySelector("#vc-enc");
    function debit(k) { return Math.sqrt(PM / (k + PM / (QM * QM))); }
    var q0 = debit(K0);
    function maj() {
      var nc = +cc.value, enc = +ce.value, k = K0 * (1 + 0.18 * nc) + 4.2 * enc, q = debit(k), p = k * q * q;
      commandes.querySelector("#vc-nc-v").textContent = nc;
      commandes.querySelector("#vc-enc-v").textContent = enc + " %";
      Array.prototype.forEach.call(cadre.querySelectorAll(".vc-coude"), function (c) { c.style.display = +c.getAttribute("data-i") < nc ? "" : "none"; });
      cadre.querySelector("#vc-filtre").setAttribute("fill", enc < 35 ? "var(--ok)" : enc < 70 ? "var(--b-expert)" : "var(--danger)");
      var d = "";
      for (var x = 0; x <= QM + 0.001; x += 0.05) {
        var pr = k * x * x;
        if (pr > PM) break;
        d += (x === 0 ? "M" : "L") + px(x).toFixed(1) + " " + py(pr).toFixed(1);
      }
      cadre.querySelector("#vc-reseau").setAttribute("d", d);
      var lab = cadre.querySelector("#vc-lab");
      lab.setAttribute("x", px(0.72)); lab.setAttribute("y", py(k * 0.52) - 8);
      var pt = cadre.querySelector("#vc-point"); pt.setAttribute("cx", px(q)); pt.setAttribute("cy", py(p));
      cadre.querySelector("#vc-rappel").setAttribute("d", "M" + px(q).toFixed(1) + " " + py(p).toFixed(1) + "V" + G.y0);
      var pct = q / q0 * 100, cp = cadre.querySelector("#vc-pct");
      cp.textContent = Math.round(pct) + " %";
      cp.style.fill = pct >= 90 ? "var(--ok)" : pct >= 70 ? "var(--b-expert)" : "var(--danger)";
      cadre.querySelector("#vc-dp").textContent = "perte de charge : " + nombre(p) + " Pa (valeurs d'illustration)";
      cadre.querySelector("#vc-f4").style.animationDuration = Math.max(0.5, 1.4 * q0 / q - 0.4) + "s";
      if (pct < 90) dire("Chaque coude et chaque filtre encrassé freine l'air. Le ventilateur ne fournit pas plus de pression pour autant : le gros point glisse vers la gauche, le débit baisse, et rien ne le signale sans mesure.", "expert", ED695 + ", paragraphes 4.1.3 et 5.2");
      else dire("Le gros point est le point de fonctionnement : là où ce que donne le ventilateur égale ce que demande le réseau. Le débit réel se lit juste en dessous. Ajouter des coudes ou encrasser le filtre pour le voir bouger.", "expert", ED695 + ", paragraphes 4.1.3 et 5.2");
    }
    cc.addEventListener("input", maj); ce.addEventListener("input", maj);
    maj();
  });

  /* ---------- 13. le ventilateur ---------- */
  window.BIBLE_DESSINS.ventilateur = monter(function (cadre) {
    cadre.innerHTML = svg(310, "Ventilateur hélicoïde, où l'air passe tout droit, et ventilateur centrifuge, où l'air entre au centre et sort sur le côté",
      t(140, 26, "HÉLICOÏDE", "vc-b", "middle") + t(420, 26, "CENTRIFUGE", "vc-b", "middle") +
      '<path d="M280 40V270" stroke="var(--ligne-forte)" stroke-width="1.5"/>' +
      /* hélicoïde, vu de côté */
      '<rect class="vc-gaine" x="110" y="66" width="60" height="150"/>' +
      '<ellipse cx="140" cy="141" rx="10" ry="62" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/><circle cx="140" cy="141" r="8" fill="var(--encre)"/>' +
      flux("vc-neuf", "M20 110H260") + flux("vc-neuf", "M20 141H260") + flux("vc-neuf", "M20 172H260") +
      t(140, 248, "gros débit, faible pression", "vc-t", "middle") + t(140, 270, "en général moins de 250 Pa", "vc-p", "middle") +
      /* centrifuge, vu de face */
      '<path d="M420 62a80 80 0 1 1 -74 110v-8" fill="none" stroke="none"/>' +
      '<path d="M500 62H420a82 82 0 1 0 82 82V112h28V62z" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2.5"/>' +
      '<circle cx="420" cy="144" r="52" fill="var(--carte)" stroke="var(--encre)" stroke-width="2"/>' +
      '<g class="vc-pale"><path d="M420 96v22M420 170v22M372 144h22M446 144h22M386 110l16 16M438 162l16 16M454 110l-16 16M402 162l-16 16"/></g>' +
      '<circle cx="420" cy="144" r="10" fill="var(--s-air)"/>' +
      flux("vc-neuf vc-fin", "M420 144C470 130 476 90 512 82") + flux("vc-neuf", "M516 86V36") +
      t(420, 248, "plus de pression, réseaux longs", "vc-t", "middle") + t(420, 270, "l'air entre au centre, sort sur le côté", "vc-p", "middle"));
  });

  /* ---------- 14. l'énergie ---------- */
  window.BIBLE_DESSINS.energie = monter(function (cadre, commandes, dire) {
    cadre.innerHTML = svg(310, "L'air neuf froid traverse l'échangeur puis la batterie avant d'entrer dans le local, avec la puissance de chauffage à fournir",
      '<rect class="vc-gaine" x="10" y="92" width="400" height="34"/><rect class="vc-cadre" x="410" y="50" width="140" height="120"/>' + t(480, 76, "LE LOCAL", "vc-tt", "middle") + t(480, 122, "19 °C", "vc-b", "middle") +
      '<g id="vc-rec"><rect class="vc-gaine" x="10" y="44" width="400" height="26"/><rect x="150" y="38" width="80" height="94" rx="4" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/><path d="M150 44l80 82M150 126l80-82" stroke="var(--encre-2)" stroke-width="2"/>' +
      flux("vc-vicie", "M408 57H14") + t(190, 30, "échangeur", "vc-p", "middle") + "</g>" +
      flux("vc-neuf", "M14 109H440") +
      '<rect x="320" y="94" width="26" height="30" fill="var(--carte)" stroke="var(--s-chaud)" stroke-width="2"/><path d="M326 98l14 5-14 5 14 5-14 5" fill="none" stroke="var(--s-chaud)" stroke-width="2"/>' + t(333, 148, "batterie", "vc-p", "middle") +
      t(60, 152, "", "vc-b", "middle", "vc-t0") + t(60, 172, "dehors", "vc-p", "middle") +
      t(272, 152, "", "vc-b", "middle", "vc-t1") +
      t(10, 210, "Chauffage à fournir", "vc-t") + '<rect x="10" y="220" width="400" height="26" rx="5" fill="var(--fond)" stroke="var(--ligne-forte)"/><rect id="vc-barre" x="11" y="221" width="0" height="24" rx="4" fill="var(--s-chaud)"/>' +
      t(420, 242, "", "vc-g", "", "vc-kw") + t(10, 278, "", "vc-p", "", "vc-formule") + t(10, 298, "", "vc-p", "", "vc-gain"));
    commandes.innerHTML = '<div class="vc-boutons"><button class="bouton actif" type="button" data-r="0">Simple flux</button><button class="bouton" type="button" data-r="70">Double flux, échangeur à 70 %</button></div>' +
      '<div class="vc-reglages">' + champ("vc-ext", "Température dehors", -10, 15, 1, -7) + champ("vc-qe", "Débit d'air neuf", 100, 3000, 20, 1000) + "</div>";
    var r = 0, ct = commandes.querySelector("#vc-ext"), cq = commandes.querySelector("#vc-qe");
    function maj() {
      var te = +ct.value, q = +cq.value, t1 = te + r / 100 * (19 - te), p = 0.34 * q * (19 - t1) / 1000, p0 = 0.34 * q * (19 - te) / 1000;
      commandes.querySelector("#vc-ext-v").textContent = String(te).replace("-", "−") + " °C";
      commandes.querySelector("#vc-qe-v").textContent = nombre(q) + " m³/h";
      cadre.querySelector("#vc-rec").style.display = r ? "inline" : "none";
      cadre.querySelector("#vc-t0").textContent = String(te).replace("-", "−") + " °C";
      var a = cadre.querySelector("#vc-t1");
      a.textContent = virgule(t1, 0).replace("-", "−") + " °C";
      a.style.display = r ? "" : "none";
      cadre.querySelector("#vc-barre").setAttribute("width", Math.min(398, p / 30 * 398));
      cadre.querySelector("#vc-kw").textContent = virgule(p, 1) + " kW";
      cadre.querySelector("#vc-formule").textContent = "0,34 × " + nombre(q) + " m³/h × " + virgule(19 - t1, 1).replace(",0", "") + " °C d'écart";
      cadre.querySelector("#vc-gain").textContent = r ? "sans échangeur : " + virgule(p0, 1) + " kW" : "";
    }
    ct.addEventListener("input", maj); cq.addEventListener("input", maj);
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-r]"); if (!b) return;
      r = +b.getAttribute("data-r");
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-r]"), function (x) { x.classList.toggle("actif", x === b); });
      maj();
    });
    maj();
    dire("Air à 19 °C et échangeur à 70 % : ce sont des hypothèses pour le calcul. L'efficacité réelle dépend de l'appareil et de sa pose.", "verifier");
  });

  /* ---------- 16. l'exemple ---------- */
  window.BIBLE_DESSINS.salle = monter(function (cadre) {
    var gens = "";
    [130, 190, 250, 310, 370, 430].forEach(function (x) {
      gens += '<circle class="vc-pers" cx="' + x + '" cy="146" r="9"/><circle class="vc-pers" cx="' + x + '" cy="232" r="9"/>';
    });
    cadre.innerHTML = svg(310, "Salle de réunion vue de dessus, avec 12 personnes, une gaine de soufflage et une gaine de reprise",
      '<rect class="vc-cadre" x="40" y="60" width="480" height="210"/>' +
      '<rect x="110" y="164" width="340" height="50" rx="6" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' + gens + t(280, 195, "12 personnes", "vc-t", "middle") +
      '<rect class="vc-gaine" x="0" y="82" width="160" height="16"/><rect x="146" y="78" width="36" height="24" rx="2" fill="var(--encre-2)"/>' + flux("vc-neuf", "M4 90H176") +
      '<rect class="vc-gaine" x="400" y="82" width="160" height="16"/><rect x="378" y="78" width="36" height="24" rx="2" fill="var(--encre-2)"/>' + flux("vc-vicie", "M384 90H556") +
      t(24, 50, "soufflage : 360 m³/h, Ø 200", "vc-b vc-bleu") + t(536, 50, "reprise : 360 m³/h, Ø 200", "vc-b vc-orange", "end") +
      t(280, 292, "75 m³ : 4,8 vol/h ; 3,2 m/s dans les gaines", "vc-p", "middle"));
  });

  /* ---------- 17. l'entretien ---------- */
  window.BIBLE_DESSINS.entretien = monter(function (cadre) {
    var x0 = 50, y100 = 70, y75 = 190;
    function y(p) { return y100 + (100 - p) / 25 * (y75 - y100); }
    var d = "M" + x0 + " " + y(100), x = x0;
    [130, 130, 130].forEach(function (l) { d += "L" + (x + l) + " " + y(80) + "V" + y(100); x += l; });
    cadre.innerHTML = svg(290, "Débit réel au fil du temps : il baisse à mesure que le filtre s'encrasse et remonte quand on le change",
      t(x0, 28, "DÉBIT DE L'INSTALLATION, AU FIL DU TEMPS", "vc-tt") +
      '<path d="M' + x0 + " 44V230H530" + '" fill="none" stroke="var(--discret)" stroke-width="2"/>' +
      '<path d="M' + x0 + " " + y100 + 'H530" stroke="var(--ok)" stroke-width="2" stroke-dasharray="6 5"/>' + t(530, y100 - 8, "valeur de référence", "vc-p", "end") +
      '<path d="M' + x0 + " " + y75 + 'H530" stroke="var(--danger)" stroke-width="2" stroke-dasharray="6 5"/>' + t(530, y75 + 20, "seuil d'intervention", "vc-p", "end") +
      '<path class="vc-courbe" d="' + d + '" stroke="var(--s-air)"/>' +
      t(180, y(100) - 8, "filtre changé", "vc-p", "middle") +
      '<path d="M80 224v12M180 224v12M310 224v12M440 224v12" stroke="var(--encre)" stroke-width="2.5"/>' +
      t(80, 256, "mise en", "vc-p", "middle") + t(80, 274, "service", "vc-p", "middle") + t(180, 256, "contrôle", "vc-p", "middle") + t(310, 256, "contrôle", "vc-p", "middle") + t(440, 256, "contrôle", "vc-p", "middle") +
      t(375, 274, "au moins une fois par an", "vc-p", "middle"));
  });
})();
