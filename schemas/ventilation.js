/* Schéma interactif : les bases de la ventilation, en quatre leçons à manipuler.
   1. pourquoi ventiler (le CO2 selon le débit par personne) ; 2. les quatre systèmes ;
   3. débit = vitesse x section ; 4. perte de charge et point de fonctionnement du ventilateur.
   Dessiné pour la bible. Les courbes de la leçon 4 sont des illustrations, pas des valeurs de calcul. */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};

  var ED695 = "INRS, guide ED 695";

  var STYLE =
    ".sv-t{fill:var(--encre-2);font-size:14px;font-family:inherit}" +
    ".sv-p{fill:var(--discret);font-size:12.5px;font-family:inherit}" +
    ".sv-tt{fill:var(--discret);font-size:13px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".sv-g{fill:var(--encre);font-size:26px;font-weight:800;font-family:inherit}" +
    ".sv-b{fill:var(--encre);font-size:15px;font-weight:700;font-family:inherit}" +
    ".sv-neuf{fill:none;stroke:var(--s-air);stroke-width:4;stroke-linecap:round;stroke-dasharray:12 14;animation:sv-flux 1s linear infinite}" +
    ".sv-vicie{fill:none;stroke:var(--s-chaud);stroke-width:4;stroke-linecap:round;stroke-dasharray:12 14;animation:sv-flux 1s linear infinite}" +
    "@keyframes sv-flux{to{stroke-dashoffset:-26}}" +
    ".sv-arret{animation-play-state:paused;opacity:.25}" +
    ".sv-mur{fill:var(--s-paroi)}" +
    ".sv-cadre{fill:var(--carte);stroke:var(--s-gaine-bord);stroke-width:2.5}" +
    ".sv-gaine{fill:var(--s-gaine);stroke:var(--s-gaine-bord);stroke-width:2}" +
    ".sv-pers{fill:var(--encre-2)}" +
    ".sv-fan{fill:var(--carte);stroke:var(--encre);stroke-width:2.5}" +
    ".sv-pale{fill:none;stroke:var(--encre);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:sv-tourne 1s linear infinite}" +
    "@keyframes sv-tourne{to{transform:rotate(360deg)}}" +
    ".sv-courbe{fill:none;stroke-width:3.5;stroke-linecap:round}";

  var REGLES =
    ".sv-reglages{display:grid;grid-template-columns:auto 1fr auto;gap:8px 12px;align-items:center;width:100%}" +
    ".sv-reglages label{font-weight:600;font-size:15px}" +
    ".sv-reglages input{width:100%;accent-color:var(--accent)}" +
    ".sv-reglages output{font-variant-numeric:tabular-nums;font-weight:700;min-width:6em;text-align:right}" +
    ".sv-boutons{display:flex;gap:10px;flex-wrap:wrap;align-items:center;width:100%}" +
    "@media (max-width:600px){.sv-reglages{grid-template-columns:1fr auto}.sv-reglages label{grid-column:1/-1;margin-bottom:-4px}}";

  function ouvrir(aria) {
    return '<svg viewBox="0 0 900 400" role="img" aria-label="' + aria + '"><style>' + STYLE + "</style>";
  }
  function ventilo(x, y, id) {
    return '<circle class="sv-fan" cx="' + x + '" cy="' + y + '" r="20"/>' +
      '<path class="sv-pale' + (id ? " " + id : "") + '" d="M' + x + " " + (y - 13) + "V" + (y + 13) + "M" + (x - 13) + " " + y + "H" + (x + 13) + '"/>';
  }
  function personne(x, y) {
    return '<circle class="sv-pers" cx="' + x + '" cy="' + (y - 34) + '" r="8"/><path class="sv-pers" d="M' + (x - 11) + " " + y + "v-14a11 11 0 0 1 22 0v14z\"/>";
  }
  function champ(id, nom, min, max, pas, val) {
    return '<label for="' + id + '">' + nom + '</label><input id="' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + pas + '" value="' + val + '"><output id="' + id + '-v"></output>';
  }
  function nombre(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function virgule(n, d) { return n.toFixed(d).replace(".", ","); }

  /* ---------- leçon 1 : pourquoi ventiler ---------- */
  function lecon1(cadre, commandes, dire) {
    var pers = "";
    [180, 250, 320, 390].forEach(function (x) { pers += personne(x, 322); });
    cadre.innerHTML = ouvrir("Local occupé, avec une jauge de CO2 qui dépend du débit d'air neuf par personne") +
      '<text class="sv-tt" x="285" y="30" text-anchor="middle">LE LOCAL</text>' +
      '<rect class="sv-cadre" x="90" y="90" width="390" height="232"/>' +
      '<rect id="sv-brume" x="92" y="92" width="386" height="228" fill="var(--s-chaud)" opacity="0"/>' +
      pers +
      '<rect class="sv-gaine" x="24" y="118" width="70" height="26"/><path class="sv-neuf sv-flux1" d="M28 131H120"/>' +
      '<text class="sv-t" x="24" y="108">air neuf</text>' +
      '<rect class="sv-gaine" x="476" y="118" width="70" height="26"/><path class="sv-vicie sv-flux1" d="M450 131H542"/>' +
      '<text class="sv-t" x="548" y="136">air vicié</text>' +
      /* jauge */
      '<text class="sv-tt" x="760" y="30" text-anchor="middle">LE CO2 DANS L\'AIR</text>' +
      '<text class="sv-g" id="sv-co2" x="760" y="74" text-anchor="middle"></text>' +
      '<rect x="735" y="96" width="50" height="270" rx="6" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
      '<rect id="sv-niveau" x="737" y="364" width="46" height="0" fill="var(--ok)"/>' +
      '<path d="M725 262h70" stroke="var(--encre)" stroke-width="2"/><text class="sv-t" x="720" y="267" text-anchor="end">1 000 ppm</text>' +
      '<path d="M725 222h70" stroke="var(--danger)" stroke-width="2"/><text class="sv-t" x="720" y="227" text-anchor="end">1 300 ppm</text>' +
      '<path d="M725 342h70" stroke="var(--discret)" stroke-width="2" stroke-dasharray="5 4"/><text class="sv-t" x="720" y="347" text-anchor="end">dehors : 400 ppm</text>' +
      "</svg>";
    commandes.innerHTML = '<div class="sv-reglages">' + champ("sv-q", "Air neuf par personne", 0, 60, 1, 18) + "</div>" +
      '<div class="sv-boutons"><button class="bouton" type="button" data-q="0">Tout fermé</button>' +
      '<button class="bouton" type="button" data-q="18">18 : bureau, RSD</button>' +
      '<button class="bouton" type="button" data-q="25">25 : bureau, code du travail</button>' +
      '<button class="bouton" type="button" data-q="30">30 : salle de réunion</button></div>';
    var champQ = commandes.querySelector("#sv-q");
    function maj() {
      var q = +champQ.value;
      var co2 = q > 0 ? 400 + 16000 / q : 3000;
      co2 = Math.min(co2, 3000);
      commandes.querySelector("#sv-q-v").textContent = q + " m³/h";
      cadre.querySelector("#sv-co2").textContent = (q > 0 && co2 < 3000 ? nombre(co2) : "plus de 3 000") + " ppm";
      /* même échelle que les repères de la jauge : 400 ppm à y = 342, 1 000 à 262, 1 300 à 222 */
      var haut = Math.max(98, 342 - (co2 - 400) * 80 / 600);
      var n = cadre.querySelector("#sv-niveau");
      n.setAttribute("y", haut); n.setAttribute("height", 364 - haut);
      n.setAttribute("fill", co2 <= 1000 ? "var(--ok)" : co2 <= 1300 ? "var(--b-expert)" : "var(--danger)");
      cadre.querySelector("#sv-brume").setAttribute("opacity", Math.min(0.32, Math.max(0, (co2 - 800) / 7000)));
      Array.prototype.forEach.call(cadre.querySelectorAll(".sv-flux1"), function (f) {
        f.classList.toggle("sv-arret", q === 0);
        f.style.animationDuration = q > 0 ? Math.max(0.35, 1.6 - q / 40) + "s" : "";
      });
      if (q === 0) {
        dire("Sans air neuf, le CO2 rejeté par les occupants s'accumule sans fin, avec l'humidité et les odeurs. Le CO2 n'est pas le danger à ces teneurs : c'est le témoin que l'air n'est pas renouvelé.", "verifier");
      } else if (co2 > 1300) {
        dire("Trop peu d'air neuf : le CO2 dépasse 1,3 pour mille, la tolérance du règlement sanitaire. Calcul d'illustration : 400 ppm dehors et 16 l/h de CO2 par personne assise, à l'équilibre.", "verifier");
      } else {
        dire("Le RSD demande de rester sous 1 pour mille de CO2, avec une tolérance à 1,3 pour mille. Plus on donne d'air neuf par personne, plus le CO2 descend, mais jamais sous celui de dehors.", "texte", "règlement sanitaire départemental type, article 64");
      }
    }
    champQ.addEventListener("input", maj);
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-q]"); if (!b) return;
      champQ.value = b.getAttribute("data-q"); maj();
    });
    maj();
  }

  /* ---------- leçon 2 : les quatre systèmes ---------- */
  var SYSTEMES = {
    naturelle: { nom: "Naturelle", etat: "Pression : dépend du vent et de la température",
      note: "Le vent et l'écart de température font bouger l'air, sans ventilateur. Le débit change donc avec la météo. Avec des fenêtres seules, le code du travail exige 15 m³ par occupant dans un bureau, 24 m³ ailleurs.", s: "texte", ref: "code du travail, articles R4222-3 et R4222-5" },
    extraction: { nom: "Simple flux : on aspire", etat: "Local en dépression : l'air rentre par la porte",
      note: "Un ventilateur aspire l'air vicié ; l'air neuf rentre seul par les entrées d'air. Le local est en dépression, donc ses odeurs et ses polluants ne sortent pas vers le couloir. C'est le principe de la VMC : en logement, l'air entre par les pièces principales et sort par les pièces de service.", s: "texte", ref: "arrêté du 24 mars 1982, articles 1 et 2" },
    insufflation: { nom: "Simple flux : on souffle", etat: "Local en surpression : l'air sort par la porte",
      note: "Un ventilateur souffle l'air neuf, filtré et chauffé si besoin ; l'air sort seul par les ouvertures. Le local est en surpression : l'air de l'extérieur et des locaux voisins n'y rentre pas par les fuites.", s: "verifier" },
    double: { nom: "Double flux", etat: "Local équilibré : autant d'air entre que d'air sort",
      note: "Deux ventilateurs : l'un souffle, l'autre aspire. Les deux flux se croisent dans un échangeur, sans se mélanger : l'air sortant réchauffe l'air entrant, ce qui économise le chauffage de l'air neuf.", s: "expert", ref: ED695 + ", chapitre 6" }
  };
  function lecon2(cadre, commandes, dire) {
    cadre.innerHTML = ouvrir("Local en coupe avec ses entrées et sorties d'air, selon quatre systèmes de ventilation") +
      '<text class="sv-tt" x="130" y="30" text-anchor="middle">COULOIR</text><text class="sv-tt" x="600" y="30" text-anchor="middle">LE LOCAL</text><text class="sv-tt" x="845" y="30" text-anchor="middle">DEHORS</text>' +
      '<rect class="sv-mur" x="30" y="70" width="770" height="14"/><rect class="sv-mur" x="30" y="350" width="770" height="14"/><rect class="sv-mur" x="790" y="70" width="14" height="294"/>' +
      '<rect class="sv-mur" x="230" y="84" width="14" height="168"/>' +
      '<rect x="233" y="252" width="8" height="84" rx="2" fill="var(--encre-2)"/>' +
      '<text class="sv-t" x="170" y="290" text-anchor="end">détalonnage</text><text class="sv-t" x="170" y="306" text-anchor="end">de la porte</text>' +
      personne(420, 350) + personne(500, 350) + personne(580, 350) +
      /* sous la porte */
      '<path class="sv-neuf sv-m sv-m-extraction" d="M186 343H282"/>' +
      '<path class="sv-vicie sv-m sv-m-insufflation" d="M282 343H186"/>' +
      /* signe de pression */
      '<circle cx="330" cy="180" r="30" fill="var(--carte)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
      '<text class="sv-g" id="sv-signe" x="330" y="190" text-anchor="middle"></text>' +
      '<text class="sv-t" id="sv-signe-t" x="330" y="232" text-anchor="middle"></text>' +
      /* naturelle : fenêtre basse et grille haute */
      '<g class="sv-m sv-m-naturelle">' +
      '<rect fill="var(--fond-2)" x="790" y="250" width="14" height="60"/><path class="sv-neuf" d="M850 280H620"/><text class="sv-t" x="702" y="268" text-anchor="middle">ouvrant</text>' +
      '<rect fill="var(--fond-2)" x="790" y="110" width="14" height="30"/><path class="sv-vicie" d="M620 125H860"/></g>' +
      /* extraction */
      '<g class="sv-m sv-m-extraction">' +
      '<rect fill="var(--fond-2)" x="790" y="150" width="14" height="24"/><path class="sv-neuf" d="M860 162H640"/><text class="sv-t" x="716" y="148" text-anchor="middle">entrée d\'air</text>' +
      '<rect class="sv-gaine" x="430" y="20" width="30" height="64"/><path class="sv-vicie" d="M445 150V24"/>' + ventilo(445, 52) + "</g>" +
      /* insufflation */
      '<g class="sv-m sv-m-insufflation">' +
      '<rect class="sv-gaine" x="430" y="20" width="30" height="64"/><path class="sv-neuf" d="M445 22V160"/>' + ventilo(445, 52) +
      '<rect fill="var(--fond-2)" x="790" y="150" width="14" height="24"/><path class="sv-vicie" d="M640 162H860"/><text class="sv-t" x="716" y="148" text-anchor="middle">sortie d\'air</text></g>' +
      /* double flux */
      '<g class="sv-m sv-m-double">' +
      '<rect class="sv-gaine" x="360" y="20" width="26" height="64"/><path class="sv-neuf" d="M373 18V160"/>' +
      '<rect class="sv-gaine" x="640" y="20" width="26" height="64"/><path class="sv-vicie" d="M653 160V18"/>' +
      '<rect x="470" y="24" width="90" height="44" rx="6" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/><path d="M482 36l66 22M482 58l66-22" stroke="var(--encre-2)" stroke-width="2"/>' +
      '<text class="sv-t" x="515" y="16" text-anchor="middle">échangeur</text><path d="M386 46H470M560 46H640" stroke="var(--s-gaine-bord)" stroke-width="3"/>' +
      ventilo(373, 52) + ventilo(653, 52) + "</g>" +
      "</svg>";
    commandes.innerHTML = '<div class="sv-boutons">' + Object.keys(SYSTEMES).map(function (k) {
      return '<button class="bouton" type="button" data-s="' + k + '">' + SYSTEMES[k].nom + "</button>";
    }).join("") + '<span class="schema-etat"></span></div>';
    function choisir(k) {
      var s = SYSTEMES[k];
      Array.prototype.forEach.call(cadre.querySelectorAll(".sv-m"), function (g) { g.style.display = g.classList.contains("sv-m-" + k) ? "" : "none"; });
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-s]"), function (b) { b.classList.toggle("actif", b.getAttribute("data-s") === k); });
      cadre.querySelector("#sv-signe").textContent = { naturelle: "?", extraction: "−", insufflation: "+", double: "=" }[k];
      cadre.querySelector("#sv-signe-t").textContent = { naturelle: "variable", extraction: "dépression", insufflation: "surpression", double: "équilibre" }[k];
      commandes.querySelector(".schema-etat").textContent = s.etat;
      dire(s.note, s.s, s.ref);
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-s]"); if (b) choisir(b.getAttribute("data-s"));
    });
    choisir("extraction");
  }

  /* ---------- leçon 3 : débit et vitesse ---------- */
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
  function lecon3(cadre, commandes, dire) {
    cadre.innerHTML = ouvrir("Gaine de ventilation dont le diamètre et le débit changent la vitesse de l'air") +
      '<text class="sv-tt" x="450" y="30" text-anchor="middle">LA GAINE VUE EN COUPE</text>' +
      '<rect id="sv-gaine" class="sv-gaine" x="60" y="130" width="780" height="100"/>' +
      '<path id="sv-flux-a" class="sv-neuf" d="M70 165H830"/><path id="sv-flux-b" class="sv-neuf" d="M70 180H830"/><path id="sv-flux-c" class="sv-neuf" d="M70 195H830"/>' +
      '<text class="sv-g" id="sv-v" x="450" y="310" text-anchor="middle"></text>' +
      '<text class="sv-t" id="sv-calcul" x="450" y="338" text-anchor="middle"></text>' +
      '<text class="sv-t" id="sv-lim" x="450" y="362" text-anchor="middle"></text>' +
      '<text class="sv-b" x="60" y="72">débit = vitesse × section</text>' +
      '<text class="sv-p" x="60" y="94">même débit dans une gaine plus petite : l\'air doit aller plus vite</text>' +
      "</svg>";
    commandes.innerHTML = '<div class="sv-reglages">' + champ("sv-debit", "Débit", 100, 10000, 100, 1800) + champ("sv-d", "Diamètre", 100, 1000, 25, 350) + "</div>";
    var cd = commandes.querySelector("#sv-debit"), cg = commandes.querySelector("#sv-d");
    function maj() {
      var q = +cd.value, d = +cg.value;
      var s = Math.PI * d * d / 4 / 1e6, v = q / 3600 / s, lim = limite(q);
      commandes.querySelector("#sv-debit-v").textContent = nombre(q) + " m³/h";
      commandes.querySelector("#sv-d-v").textContent = d + " mm";
      var h = Math.max(14, d / 1000 * 170), y = 180 - h / 2;
      var g = cadre.querySelector("#sv-gaine"); g.setAttribute("y", y); g.setAttribute("height", h);
      cadre.querySelector("#sv-flux-a").setAttribute("d", "M70 " + (180 - h / 4) + "H830");
      cadre.querySelector("#sv-flux-b").setAttribute("d", "M70 180H830");
      cadre.querySelector("#sv-flux-c").setAttribute("d", "M70 " + (180 + h / 4) + "H830");
      var duree = Math.max(0.12, Math.min(3, 6 / v)) + "s";
      ["a", "b", "c"].forEach(function (n) { cadre.querySelector("#sv-flux-" + n).style.animationDuration = duree; });
      var depasse = v > lim;
      var titre = cadre.querySelector("#sv-v");
      titre.textContent = virgule(v, 1) + " m/s";
      titre.style.fill = depasse ? "var(--danger)" : "var(--ok)";
      cadre.querySelector("#sv-calcul").textContent = nombre(q) + " m³/h ÷ 3 600 = " + virgule(q / 3600, 2) + " m³/s ; section " + virgule(s, 3) + " m²";
      cadre.querySelector("#sv-lim").textContent = "vitesse conseillée à ce débit : " + virgule(lim, 1) + " m/s au plus, pour limiter le bruit";
      if (depasse) {
        dire("Trop vite pour ce débit : ça siffle, et la perte de charge grimpe avec le carré de la vitesse. Il faut une gaine plus grosse.", "expert", ED695 + ", tableau IX (locaux industriels, air non chargé)");
      } else {
        dire("Le débit (m³/h) dit combien d'air passe, la vitesse (m/s) à quelle allure. Vitesse = débit ÷ section. Le repère affiché vient du tableau de l'INRS pour une installation basse vitesse.", "expert", ED695 + ", paragraphe 4.1.1 et tableau IX");
      }
    }
    cd.addEventListener("input", maj); cg.addEventListener("input", maj);
    maj();
  }

  /* ---------- leçon 4 : perte de charge ---------- */
  function lecon4(cadre, commandes, dire) {
    var G = { x0: 520, y0: 340, l: 340, h: 270 };
    var QM = 2, PM = 800, K0 = 90;  /* courbes d'illustration */
    function px(q) { return G.x0 + q / QM * G.l; }
    function py(p) { return G.y0 - p / PM * G.h; }
    var ventil = "";
    for (var q = 0; q <= QM; q += 0.05) { ventil += (q === 0 ? "M" : "L") + px(q).toFixed(1) + " " + py(PM * (1 - Math.pow(q / QM, 2))).toFixed(1); }
    var coudes = "";
    [0, 1, 2, 3, 4, 5].forEach(function (i) {
      coudes += '<path class="sv-coude" data-i="' + i + '" d="M' + (150 + i * 50) + ' 150v22h24" fill="none" stroke="var(--danger)" stroke-width="5" stroke-linecap="round"/>';
    });
    cadre.innerHTML = ouvrir("Réseau de ventilation et courbes du ventilateur et du réseau, qui se croisent au point de fonctionnement") +
      '<text class="sv-tt" x="250" y="30" text-anchor="middle">LE RÉSEAU</text>' +
      '<rect class="sv-gaine" x="60" y="130" width="400" height="44"/>' +
      '<path id="sv-flux4" class="sv-neuf" d="M70 152H450"/>' +
      ventilo(415, 152) + coudes +
      '<rect id="sv-filtre" x="96" y="132" width="20" height="40" fill="var(--ok)" stroke="var(--encre-2)" stroke-width="1.5"/>' +
      '<text class="sv-t" x="106" y="124" text-anchor="middle">filtre</text>' +
      '<text class="sv-t" x="415" y="205" text-anchor="middle">ventilateur</text>' +
      '<text class="sv-g" id="sv-pct" x="250" y="272" text-anchor="middle"></text>' +
      '<text class="sv-t" x="250" y="298" text-anchor="middle">du débit d\'origine</text>' +
      '<text class="sv-t" id="sv-dp" x="250" y="326" text-anchor="middle"></text>' +
      /* graphe */
      '<text class="sv-tt" x="690" y="30" text-anchor="middle">LE POINT DE FONCTIONNEMENT</text>' +
      '<path d="M' + G.x0 + " " + (G.y0 - G.h - 10) + "V" + G.y0 + "H" + (G.x0 + G.l + 10) + '" fill="none" stroke="var(--discret)" stroke-width="2"/>' +
      '<text class="sv-p" x="' + (G.x0 + 8) + '" y="' + (G.y0 - G.h - 2) + '">pression</text>' +
      '<text class="sv-p" x="' + (G.x0 + G.l + 8) + '" y="' + (G.y0 + 20) + '" text-anchor="end">débit</text>' +
      '<path class="sv-courbe" d="' + ventil + '" stroke="var(--s-air)"/>' +
      '<path id="sv-reseau" class="sv-courbe" stroke="var(--s-chaud)"/>' +
      '<text class="sv-p" x="' + px(0.7) + '" y="66" style="fill:var(--s-air);font-weight:700">courbe du ventilateur</text>' +
      '<text id="sv-lab-res" class="sv-p" style="fill:var(--s-chaud);font-weight:700">courbe du réseau</text>' +
      '<path id="sv-rappel" stroke="var(--discret)" stroke-width="1.5" stroke-dasharray="4 4"/>' +
      '<circle id="sv-point" r="9" fill="var(--encre)" stroke="var(--carte)" stroke-width="3"/>' +
      "</svg>";
    commandes.innerHTML = '<div class="sv-reglages">' + champ("sv-nc", "Coudes en plus", 0, 6, 1, 0) + champ("sv-enc", "Encrassement du filtre", 0, 100, 5, 0) + "</div>";
    var cc = commandes.querySelector("#sv-nc"), ce = commandes.querySelector("#sv-enc");
    function debit(k) { return Math.sqrt(PM / (k + PM / (QM * QM))); }
    var q0 = debit(K0);
    function maj() {
      var nc = +cc.value, enc = +ce.value;
      var k = K0 * (1 + 0.18 * nc) + 4.2 * enc;
      var q = debit(k), p = k * q * q;
      commandes.querySelector("#sv-nc-v").textContent = nc;
      commandes.querySelector("#sv-enc-v").textContent = enc + " %";
      Array.prototype.forEach.call(cadre.querySelectorAll(".sv-coude"), function (c) { c.style.display = +c.getAttribute("data-i") < nc ? "" : "none"; });
      cadre.querySelector("#sv-filtre").setAttribute("fill", enc < 35 ? "var(--ok)" : enc < 70 ? "var(--b-expert)" : "var(--danger)");
      var d = "";
      for (var x = 0; x <= QM + 0.001; x += 0.05) {
        var pr = k * x * x;
        if (pr > PM) break;
        d += (x === 0 ? "M" : "L") + px(x).toFixed(1) + " " + py(pr).toFixed(1);
      }
      cadre.querySelector("#sv-reseau").setAttribute("d", d);
      var lab = cadre.querySelector("#sv-lab-res");
      lab.setAttribute("x", px(0.7)); lab.setAttribute("y", py(k * 0.49) - 12); lab.setAttribute("text-anchor", "end");
      var pt = cadre.querySelector("#sv-point"); pt.setAttribute("cx", px(q)); pt.setAttribute("cy", py(p));
      cadre.querySelector("#sv-rappel").setAttribute("d", "M" + px(q).toFixed(1) + " " + py(p).toFixed(1) + "V" + G.y0);
      var pct = q / q0 * 100;
      cadre.querySelector("#sv-pct").textContent = Math.round(pct) + " %";
      cadre.querySelector("#sv-pct").style.fill = pct >= 90 ? "var(--ok)" : pct >= 70 ? "var(--b-expert)" : "var(--danger)";
      cadre.querySelector("#sv-dp").textContent = "perte de charge du réseau : " + nombre(p) + " Pa";
      cadre.querySelector("#sv-flux4").style.animationDuration = Math.max(0.5, 1.4 * q0 / q - 0.4) + "s";
      if (pct < 90) {
        dire("Chaque coude et chaque filtre encrassé freine l'air. Le ventilateur ne fournit pas plus de pression : le point de fonctionnement glisse vers la gauche, le débit baisse, et rien ne le signale sans mesure. Valeurs d'illustration.", "expert", ED695 + ", paragraphes 4.1.3 et 5.2");
      } else {
        dire("La perte de charge est la pression perdue en frottement dans le réseau. Le débit réel se lit au croisement des deux courbes : là où ce que donne le ventilateur égale ce que perd le réseau. Ajoutez des coudes ou encrassez le filtre.", "expert", ED695 + ", paragraphes 4.1.3 et 5.2");
      }
    }
    cc.addEventListener("input", maj); ce.addEventListener("input", maj);
    maj();
  }

  var LECONS = [
    ["1. Pourquoi ventiler", lecon1],
    ["2. Les quatre systèmes", lecon2],
    ["3. Débit et vitesse", lecon3],
    ["4. Perte de charge", lecon4]
  ];

  window.BIBLE_SCHEMAS.ventilation = function (racine, ctx) {
    racine.innerHTML =
      "<style>" + REGLES + "</style>" +
      '<div class="schema-onglets">' + LECONS.map(function (l, i) {
        return '<button class="bouton' + (i === 0 ? " actif" : "") + '" type="button" data-l="' + i + '">' + l[0] + "</button>";
      }).join("") + "</div>" +
      '<div class="schema-cadre"></div><div class="schema-commandes"></div><p class="schema-note"></p>';
    var cadre = racine.querySelector(".schema-cadre");
    var note = racine.querySelector(".schema-note");
    function dire(t, s, ref) { note.innerHTML = t + " " + ctx.badge(s, ref); }
    function montrer(i) {
      /* les commandes sont recréées à chaque leçon : leurs écouteurs partent avec l'ancien élément */
      var ancien = racine.querySelector(".schema-commandes");
      var commandes = ancien.cloneNode(false);
      ancien.parentNode.replaceChild(commandes, ancien);
      LECONS[i][1](cadre, commandes, dire);
    }
    racine.querySelector(".schema-onglets").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      Array.prototype.forEach.call(racine.querySelectorAll(".schema-onglets .bouton"), function (x) { x.classList.toggle("actif", x === b); });
      montrer(+b.getAttribute("data-l"));
    });
    montrer(0);
  };
})();
