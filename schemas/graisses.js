/* Schéma interactif : séparateur à graisses vu en coupe, entre la cuisine et le réseau.
   Deux cas d'effluent (eau tiède, eau très chaude chargée de détergents) ; on fait passer le temps
   jusqu'à ce que la couche de graisses atteigne le bas de la cloison, puis on vidange.
   Dessiné pour la bible, d'après le principe décrit par des documentations de fabricants
   (aucun dessin de fabricant repris). */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};

  var FAB = "documentation d'un fabricant de séparateurs à graisses";
  /* NF EN 1825-2 de novembre 2002, lue le 6 novembre 2026 : reformulée, jamais recopiée */
  function en(par) { return "NF EN 1825-2, novembre 2002, " + par; }

  var STYLE =
    ".sg-t{fill:var(--encre-2);font-size:14px;font-family:inherit}" +
    ".sg-p{fill:var(--discret);font-size:13px;font-family:inherit}" +
    ".sg-b{fill:var(--encre);font-size:15px;font-weight:700;font-family:inherit}" +
    ".sg-tt{fill:var(--discret);font-size:13px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".sg-tube{fill:none;stroke:var(--s-gaine-bord);stroke-width:14;stroke-linejoin:round}" +
    ".sg-tube-in{fill:none;stroke:var(--s-gaine);stroke-width:9;stroke-linejoin:round}" +
    ".sg-eau{fill:none;stroke:var(--s-air);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:9 12;animation:sg-flux 1s linear infinite}" +
    ".sg-gras{fill:none;stroke:var(--s-chaud);stroke-width:4;stroke-linecap:round;stroke-dasharray:3 18;animation:sg-flux 1s linear infinite}" +
    "@keyframes sg-flux{to{stroke-dashoffset:-21}}" +
    ".sg-corps{fill:var(--s-gaine);stroke:var(--encre-2);stroke-width:3}" +
    ".sg-cloison{fill:var(--s-paroi);stroke:var(--encre-2);stroke-width:1.5}" +
    ".sg-niveau{transition:transform 2.4s ease-in-out}" +
    ".vide .sg-niveau{transform:translateY(126px)}" +
    ".sg-couche{fill:var(--s-chaud);fill-opacity:.55;transition:height .8s,opacity .8s}" +
    ".vide .sg-couche{opacity:0}" +
    ".sg-boue{fill:var(--s-hachure);transition:d .8s}" +
    ".sg-monte{fill:var(--s-chaud);animation:sg-monte 2.6s ease-out infinite}" +
    "@keyframes sg-monte{from{transform:translateY(64px);opacity:0}25%{opacity:1}to{transform:translateY(0);opacity:0}}" +
    ".sg-tombe{fill:var(--s-hachure);animation:sg-tombe 2.2s ease-in infinite}" +
    "@keyframes sg-tombe{from{transform:translateY(-46px);opacity:0}30%{opacity:1}to{transform:translateY(0);opacity:0}}" +
    ".chaud .sg-monte{animation-duration:4.2s}" +
    ".vide .sg-monte,.vide .sg-tombe,.vide .sg-eau,.vide .sg-gras-in{visibility:hidden}" +
    ".vide .sg-boue{opacity:0;transition:opacity 2s}" +
    ".sg-fuite{fill:none;stroke:var(--danger);stroke-width:5;stroke-linecap:round;stroke-dasharray:4 12;animation:sg-flux .8s linear infinite;opacity:0;transition:opacity .5s}" +
    ".fuite .sg-fuite{opacity:1}" +
    ".fuite-faible .sg-fuite{opacity:.55}" +
    ".vide .sg-fuite{opacity:0}" +
    ".sg-camion{opacity:0;transition:opacity .4s}" +
    ".vidange .sg-camion{opacity:1}" +
    ".sg-aspi{fill:none;stroke:var(--s-chaud);stroke-width:4;stroke-linecap:round;stroke-dasharray:8 10;opacity:0;animation:sg-flux .7s linear infinite}" +
    ".vidange .sg-aspi{opacity:1}";

  var REGLES = ".sg-boutons{display:flex;gap:10px;flex-wrap:wrap;align-items:center;width:100%}";

  /* épaisseur de la couche de graisses (unités de dessin) et hauteur de boue, par état 0 à 3 */
  var COUCHE = [8, 28, 52, 80];
  var BOUE = [8, 14, 20, 28];
  var ETATS = ["Juste vidangé, rempli d'eau claire", "Couche de graisses mince", "Couche épaisse : vidange à prévoir", "Plein : les graisses partent à l'égout"];

  function tx(x, y, s, cls, ancre, id) {
    return '<text class="' + (cls || "sg-t") + '" x="' + x + '" y="' + y + '"' + (ancre ? ' text-anchor="' + ancre + '"' : "") + (id ? ' id="' + id + '"' : "") + ">" + s + "</text>";
  }
  function tube(d) { return '<path class="sg-tube" d="' + d + '"/><path class="sg-tube-in" d="' + d + '"/>'; }

  var SVG =
    '<svg viewBox="0 0 900 400" role="img" aria-label="Séparateur à graisses vu en coupe : la cuisine, la canalisation en pente, le débourbeur, le séparateur, la cloison, la sortie vers l\'égout, la ventilation et la conduite d\'aspiration">' +
    "<style>" + STYLE + "</style>" +
    tx(105, 30, "LA CUISINE", "sg-tt", "middle") + tx(520, 30, "LE SÉPARATEUR", "sg-tt", "middle") + tx(845, 180, "VERS L'ÉGOUT", "sg-tt", "middle") +

    /* plonge et lave-vaisselle */
    '<path d="M100 80V58h26v10" fill="none" stroke="var(--encre-2)" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M40 80h130v8q0 30-30 30H70q-30 0-30-30z" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
    tx(105, 104, "plonge", "sg-p", "middle") +
    '<rect x="40" y="142" width="130" height="96" rx="4" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
    '<path d="M50 160h110M60 150h20" stroke="var(--encre-2)" stroke-width="2"/>' +
    tx(105, 200, "lave-", "sg-p", "middle") + tx(105, 217, "vaisselle", "sg-p", "middle") +

    /* canalisation d'arrivée : descente puis collecteur en pente vers l'entrée */
    tube("M150 118V132H196M170 160H196M196 104V176L340 196") +
    '<path class="sg-eau sg-gras-in" d="M196 108V176L340 196"/><path class="sg-gras sg-gras-in" d="M196 108V176L340 196"/>' +
    '<path d="M232 214l70 10v-10z" fill="none" stroke="var(--discret)" stroke-width="1.5"/>' + tx(266, 240, "pente", "sg-p", "middle") +
    tx(258, 156, "eau tiède", "sg-b", "middle", "sg-temp") +

    /* cuve : corps, eau, graisses, boues */
    '<rect class="sg-corps" x="340" y="160" width="360" height="190" rx="10"/>' +
    '<rect x="376" y="150" width="50" height="12" rx="2" fill="var(--s-gaine-bord)"/><rect x="566" y="150" width="50" height="12" rx="2" fill="var(--s-gaine-bord)"/>' +
    '<g class="sg-niveau"><rect x="343" y="212" width="354" height="135" fill="var(--s-air)" fill-opacity=".22"/>' +
    '<path d="M343 212H697" stroke="var(--s-air)" stroke-width="2"/>' +
    '<rect class="sg-couche" id="sg-couche" x="476" y="206" width="164"/>' +
    '<rect class="sg-couche" x="345" y="206" width="120" height="6"/></g>' +
    '<path class="sg-boue" id="sg-boue"/>' +
    /* gouttes de graisses qui montent, particules qui tombent */
    '<circle class="sg-monte" cx="500" cy="236" r="5"/><circle class="sg-monte" cx="540" cy="242" r="4" style="animation-delay:.7s"/>' +
    '<circle class="sg-monte" cx="585" cy="238" r="5" style="animation-delay:1.4s"/><circle class="sg-monte" cx="620" cy="244" r="4" style="animation-delay:2s"/>' +
    '<circle class="sg-tombe" cx="400" cy="320" r="4"/><circle class="sg-tombe" cx="436" cy="324" r="3.5" style="animation-delay:1s"/>' +
    /* entrée avec son coude plongeant, cloisons, sortie */
    tube("M330 196H370V246") +
    '<path class="sg-eau" d="M372 248C392 272 440 300 474 292C520 282 600 300 660 296C676 290 684 250 690 222"/>' +
    '<rect class="sg-cloison" x="466" y="160" width="8" height="110"/><rect class="sg-cloison" x="466" y="316" width="8" height="34"/>' +
    '<rect class="sg-cloison" x="640" y="160" width="8" height="130"/>' +
    '<path class="sg-fuite" d="M612 290C632 304 660 300 670 240"/>' +
    tube("M690 218H790") + '<path class="sg-eau" d="M692 218H790"/>' +
    '<rect x="790" y="196" width="40" height="64" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
    tube("M830 222L892 230") + '<path class="sg-eau" d="M832 222L892 230"/>' +
    '<path class="sg-fuite" d="M692 218H790M832 222L892 230"/>' +
    tx(810, 282, "regard de", "sg-p", "middle") + tx(810, 298, "prélèvement", "sg-p", "middle") +

    /* ventilation */
    tube("M400 152V58") + tx(400, 50, "ventilation", "sg-p", "middle") +

    /* conduite d'aspiration fixe jusqu'au raccord, dans le mur */
    tube("M560 336V80H758") + '<path class="sg-aspi" d="M560 336V80H758"/>' +
    '<rect x="758" y="66" width="14" height="28" rx="2" fill="var(--encre-2)"/>' +
    '<rect x="776" y="34" width="12" height="112" fill="var(--s-paroi)" stroke="var(--s-gaine-bord)"/>' +
    tx(660, 66, "raccord pour le camion", "sg-p", "middle") + tx(574, 124, "conduite d'aspiration", "sg-p") +
    '<g class="sg-camion"><path d="M772 80H812" stroke="var(--encre-2)" stroke-width="6" stroke-linecap="round"/>' +
    '<rect x="806" y="50" width="70" height="48" rx="6" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
    '<path d="M876 66h14v32h-14" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
    '<circle cx="826" cy="104" r="8" fill="var(--encre-2)"/><circle cx="870" cy="104" r="8" fill="var(--encre-2)"/>' +
    tx(841, 80, "camion", "sg-p", "middle") + "</g>" +

    tx(405, 374, "débourbeur", "sg-b", "middle") + tx(405, 392, "les boues tombent", "sg-p", "middle") +
    tx(545, 374, "séparateur", "sg-b", "middle") + tx(545, 392, "les graisses montent", "sg-p", "middle") +
    tx(678, 374, "cloison", "sg-b", "middle") + tx(678, 392, "l'eau passe dessous", "sg-p", "middle") +
    "</svg>";

  var MODES = {
    tiede: { nom: "Eau tiède" },
    chaud: { nom: "Eau très chaude, avec détergents" }
  };

  window.BIBLE_SCHEMAS.graisses = function (cadre, ctx) {
    cadre.innerHTML =
      "<style>" + REGLES + "</style>" +
      '<div class="schema-onglets">' + Object.keys(MODES).map(function (k, i) {
        return '<button class="bouton' + (i === 0 ? " actif" : "") + '" type="button" data-mode="' + k + '">' + MODES[k].nom + "</button>";
      }).join("") + "</div>" +
      '<div class="schema-cadre">' + SVG + "</div>" +
      '<div class="schema-commandes"><div class="sg-boutons">' +
      '<button class="bouton" type="button" data-a="temps">Le temps passe</button>' +
      '<button class="bouton" type="button" data-a="vidange">Vidanger</button>' +
      '<span class="schema-etat"></span></div></div><p class="schema-note"></p>';

    var svg = cadre.querySelector("svg");
    var note = cadre.querySelector(".schema-note");
    var etat = cadre.querySelector(".schema-etat");
    var mode = "tiede", n = 0, minuteurs = [], enVidange = false;

    function dire(t, s, ref) { note.innerHTML = t + " " + ctx.badge(s, ref); }

    function dessiner() {
      svg.querySelector("#sg-couche").setAttribute("height", COUCHE[n]);
      var h = BOUE[n];
      svg.querySelector("#sg-boue").setAttribute("d", "M345 347Q405 " + (347 - 2 * h) + " 464 347Z");
      svg.querySelector("#sg-temp").textContent = mode === "chaud" ? "eau très chaude" : "eau tiède";
      svg.querySelector("#sg-temp").style.fill = mode === "chaud" ? "var(--danger)" : "";
      var cls = [mode];
      if (enVidange) cls.push("vidange", "vide");
      else if (n >= 3) cls.push("fuite");
      else if (mode === "chaud") cls.push("fuite-faible");
      svg.setAttribute("class", cls.join(" "));
      etat.textContent = enVidange ? "Vidange en cours" : ETATS[n];
      etat.className = "schema-etat" + (!enVidange && n >= 3 ? " ferme" : "");
    }

    function expliquer() {
      if (n >= 3) {
        dire("La couche de graisses a grandi jusqu'au bas de la cloison : les graisses passent dessous et partent à l'égout. La cuve ne stocke qu'environ 40 litres de graisses par unité de taille nominale : s'il en vient plus, on prend plus grand, on stocke ailleurs ou on vide plus souvent.", "norme", en("§ 6.1"));
      } else if (mode === "chaud") {
        dire("Une eau chaude réduit l'efficacité du séparateur, et les produits de lavage peuvent garder les graisses mêlées à l'eau : une partie passe. C'est pour cela que la taille calculée est multipliée par 1,3 au-dessus de 60 °C, et encore par 1,3 avec des détergents.", "norme", en("§ 6.2.2 et § 6.2.4"));
      } else if (n === 2) {
        dire("La couche s'épaissit : il faut vidanger avant qu'elle n'atteigne le bas de la cloison. Sauf autre prescription, la norme demande une vidange au moins une fois par mois, de préférence tous les quinze jours.", "norme", en("§ 8"));
      } else {
        dire("L'eau grasse arrive doucement. Les matières lourdes tombent dans le débourbeur. Les graisses, plus légères que l'eau, remontent et restent piégées derrière la cloison. L'eau débarrassée de ses graisses passe sous la cloison et repart vers l'égout.", "fabricant", FAB);
      }
    }

    function nettoyer() { minuteurs.forEach(clearTimeout); minuteurs = []; enVidange = false; }

    function vidanger() {
      nettoyer();
      enVidange = true;
      dessiner();
      dire("Le camion aspire graisses, eau et boues par la conduite fixe, jusqu'à un raccord qu'il peut atteindre. Puis la cuve est nettoyée et remplie d'eau claire, pour séparer dès la première vaisselle.", "norme", en("§ 7.2 et § 8"));
      minuteurs.push(setTimeout(function () { enVidange = false; n = 0; dessiner(); }, 3200));
    }

    cadre.querySelector(".schema-onglets").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      mode = b.getAttribute("data-mode");
      Array.prototype.forEach.call(cadre.querySelectorAll(".schema-onglets .bouton"), function (x) { x.classList.toggle("actif", x === b); });
      nettoyer(); dessiner(); expliquer();
    });
    cadre.querySelector(".sg-boutons").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.getAttribute("data-a") === "vidange") { vidanger(); return; }
      nettoyer();
      n = Math.min(3, n + 1);
      dessiner(); expliquer();
    });

    n = 1; dessiner(); expliquer();
  };

  /* ---------- dessins du cours (donnees/fiches/bac-a-graisses.js) ---------- */
  window.BIBLE_DESSINS = window.BIBLE_DESSINS || {};
  window.BIBLE_ICONES = window.BIBLE_ICONES || {};

  var STYLE_COURS =
    ".sgc-t{fill:var(--encre-2);font-size:15px;font-family:inherit}" +
    ".sgc-b{fill:var(--encre);font-size:16px;font-weight:700;font-family:inherit}" +
    ".sgc-p{fill:var(--discret);font-size:13.5px;font-family:inherit}" +
    ".sgc-tt{fill:var(--discret);font-size:12.5px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".sgc-g{fill:var(--encre);font-size:28px;font-weight:800;font-family:inherit}" +
    ".sgc-tube{fill:none;stroke:var(--s-gaine-bord);stroke-width:16;stroke-linecap:butt;stroke-linejoin:round}" +
    ".sgc-tube-in{fill:none;stroke:var(--s-gaine);stroke-width:10;stroke-linejoin:round}" +
    ".sgc-eau{fill:none;stroke:var(--s-air);stroke-width:4;stroke-linecap:round;stroke-dasharray:10 12;animation:sgc-flux 1s linear infinite}" +
    ".sgc-gras{fill:var(--s-chaud);fill-opacity:.7}" +
    "@keyframes sgc-flux{to{stroke-dashoffset:-22}}" +
    ".sgc-cadre{fill:var(--carte);stroke:var(--s-gaine-bord);stroke-width:2.5}" +
    ".sgc-paroi{fill:var(--s-paroi);stroke:var(--s-gaine-bord);stroke-width:1.5}" +
    ".sgc-rep{stroke:var(--discret);stroke-width:1.3}" +
    ".sgc-halo{paint-order:stroke;stroke:var(--fond-2);stroke-width:6px;stroke-linejoin:round}" +
    ".sgc-boutons{display:flex;gap:8px;flex-wrap:wrap;align-items:center;width:100%}";

  function sgcStyle() {
    if (document.getElementById("sgc-style")) return;
    var s = document.createElement("style");
    s.id = "sgc-style"; s.textContent = STYLE_COURS;
    document.head.appendChild(s);
  }
  function dessinSvg(h, aria, c) { return '<svg viewBox="0 0 560 ' + h + '" role="img" aria-label="' + aria + '">' + c + "</svg>"; }
  function t2(x, y, s, cls, ancre, id) {
    return '<text class="' + (cls || "sgc-t") + '" x="' + x + '" y="' + y + '"' + (ancre ? ' text-anchor="' + ancre + '"' : "") + (id ? ' id="' + id + '"' : "") + ">" + s + "</text>";
  }
  function tuyau(d) { return '<path class="sgc-tube" d="' + d + '"/><path class="sgc-tube-in" d="' + d + '"/>'; }
  function monterCours(fn) {
    return function (el, ctx) {
      sgcStyle();
      el.innerHTML = '<div class="schema-cadre"></div><div class="schema-commandes"></div><p class="schema-note"></p>';
      var note = el.querySelector(".schema-note"), cmd = el.querySelector(".schema-commandes");
      fn(el.querySelector(".schema-cadre"), cmd, function (texte, s, ref) { note.innerHTML = texte + " " + ctx.badge(s, ref); });
      if (!cmd.children.length) cmd.parentNode.removeChild(cmd);
      if (!note.textContent) note.parentNode.removeChild(note);
    };
  }

  /* pourquoi : la graisse chaude coule, refroidie elle colle, puis elle bouche */
  window.BIBLE_DESSINS.sg_bouchon = monterCours(function (cadre) {
    function troncon(x, depot, titre, sous) {
      var c = '<rect x="' + x + '" y="90" width="160" height="70" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="3"/>';
      if (depot) c += '<path class="sgc-gras" d="M' + x + " 92h160v" + depot + "q-80 " + depot * 0.4 + " -160 0z\"/>" +
        '<path class="sgc-gras" d="M' + x + " 158h160v-" + depot + "q-80 -" + depot * 0.4 + " -160 0z\"/>";
      return c + t2(x + 80, 70, titre, "sgc-b", "middle") + t2(x + 80, 186, sous, "sgc-p", "middle");
    }
    cadre.innerHTML = dessinSvg(260, "Trois tronçons de canalisation : la graisse chaude coule avec l'eau, puis colle aux parois en refroidissant, puis bouche le tuyau",
      troncon(20, 0, "chaude", "la graisse coule avec l'eau") + troncon(200, 10, "elle refroidit", "elle colle à la paroi") + troncon(380, 30, "des mois plus tard", "le passage se ferme") +
      '<path class="sgc-eau" d="M28 125H172"/><circle cx="70" cy="120" r="5" class="sgc-gras"/><circle cx="130" cy="130" r="4" class="sgc-gras"/>' +
      '<path class="sgc-eau" d="M208 125H352"/>' + '<path class="sgc-eau" d="M388 125H420" style="animation-duration:2.4s"/>' +
      t2(280, 232, "Dans les égouts, ces dépôts finissent en bouchons et en odeurs.", "sgc-t", "middle"));
  });

  /* le principe : comme une vinaigrette, l'huile flotte et le lourd tombe */
  window.BIBLE_DESSINS.sg_vinaigrette = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(300, "Un récipient au repos : les graisses flottent en haut, l'eau est au milieu, les matières lourdes sont au fond",
      '<path d="M150 30V260Q150 276 166 276H314Q330 276 330 260V30" fill="none" stroke="var(--encre-2)" stroke-width="3"/>' +
      '<rect x="153" y="110" width="174" height="163" fill="var(--s-air)" fill-opacity=".25"/>' +
      '<rect class="sgc-gras" x="153" y="76" width="174" height="34"/>' +
      '<path d="M156 273Q200 236 240 252T324 273z" fill="var(--s-hachure)"/>' +
      '<circle cx="200" cy="160" r="5" class="sgc-gras"/><path d="M200 150v-26" class="sgc-rep" stroke-dasharray="3 4"/>' +
      '<circle cx="280" cy="190" r="5" fill="var(--s-hachure)"/><path d="M280 200v26" class="sgc-rep" stroke-dasharray="3 4"/>' +
      '<path class="sgc-rep" d="M330 93H370M330 180H370M324 262H370"/>' +
      t2(376, 90, "graisses", "sgc-b") + t2(376, 108, "plus légères : elles montent", "sgc-p") +
      t2(376, 177, "eau", "sgc-b") + t2(376, 195, "elle traverse", "sgc-p") +
      t2(376, 259, "boues, sable", "sgc-b") + t2(376, 277, "plus lourds : ils tombent", "sgc-p") +
      t2(76, 150, "au repos,", "sgc-p", "middle") + t2(76, 168, "chacun", "sgc-p", "middle") + t2(76, 186, "trouve sa place", "sgc-p", "middle"));
  });

  /* la pente : combien on descend sur 10 m */
  window.BIBLE_DESSINS.sg_pente = monterCours(function (cadre, commandes, dire) {
    var PENTES = [0.5, 1, 1.5, 2, 3];
    cadre.innerHTML = dessinSvg(260, "Une canalisation de 10 m vue de profil : plus la pente est forte, plus son extrémité descend",
      '<path d="M40 70H520" stroke="var(--discret)" stroke-width="1.5" stroke-dasharray="6 6"/>' +
      tuyau("M40 70L520 70") + '<path id="sgc-p-eau" class="sgc-eau"/>' +
      '<path id="sgc-p-cote" stroke="var(--danger)" stroke-width="2" fill="none"/>' +
      '<path d="M40 222H520" class="sgc-rep"/><path d="M40 214v16M520 214v16" class="sgc-rep"/>' + t2(280, 246, "10 m de canalisation", "sgc-p", "middle") +
      t2(40, 40, "", "sgc-g", "start", "sgc-p-val"));
    commandes.innerHTML = '<div class="sgc-boutons">' + PENTES.map(function (p) {
      return '<button class="bouton" type="button" data-p="' + p + '">' + String(p).replace(".", ",") + " %</button>";
    }).join("") + "</div>";
    function choisir(p) {
      var chute = p * 10, y2 = 70 + chute * 6;
      cadre.querySelector(".sgc-tube").setAttribute("d", "M40 70L520 " + y2);
      cadre.querySelector(".sgc-tube-in").setAttribute("d", "M40 70L520 " + y2);
      cadre.querySelector("#sgc-p-eau").setAttribute("d", "M44 70L516 " + (y2 - 0.4));
      cadre.querySelector("#sgc-p-eau").style.animationDuration = (1.6 / Math.sqrt(p)) + "s";
      cadre.querySelector("#sgc-p-cote").setAttribute("d", "M532 70V" + y2 + "M526 70h12M526 " + y2 + "h12");
      var tv = cadre.querySelector("#sgc-p-val");
      tv.textContent = String(p).replace(".", ",") + " % : " + String(chute).replace(".", ",") + " cm sur 10 m";
      tv.style.fill = p < 1 ? "var(--danger)" : "var(--ok)";
      Array.prototype.forEach.call(commandes.querySelectorAll("button"), function (b) { b.classList.toggle("actif", +b.getAttribute("data-p") === p); });
      if (p < 1) dire("Sous 1 %, on passe sous la pente minimale qu'un fabricant de tubes recommande pour l'évacuation : 1 cm par mètre.", "fabricant", "guide de pose d'un fabricant de tubes PVC d'évacuation");
      else if (p < 2) dire("Assez pour une évacuation ordinaire, d'après un fabricant de tubes. Mais pas pour la canalisation qui arrive au séparateur : la norme du séparateur y demande 2 %.", "fabricant", "guide de pose d'un fabricant de tubes PVC d'évacuation ; " + en("§ 7.3"));
      else dire("2 % au moins, soit 1 cm tous les 50 cm : c'est la pente que demande la norme pour la canalisation qui arrive au séparateur, quand aucune règle locale ne dit autre chose. Elle évite que la graisse s'accumule en route.", "norme", en("§ 7.3"));
    }
    commandes.addEventListener("click", function (e) { var b = e.target.closest("button[data-p]"); if (b) choisir(+b.getAttribute("data-p")); });
    choisir(1);
  });

  /* raccorder : le té à 87°30 contre la culotte à 45° */
  window.BIBLE_DESSINS.sg_raccord = monterCours(function (cadre) {
    function panneau(x, titre, branche, bon) {
      return t2(x + 120, 30, titre, "sgc-b", "middle") +
        tuyau("M" + x + " 180H" + (x + 240)) + tuyau(branche) +
        '<path class="sgc-eau" d="M' + (x + 6) + " 180H" + (x + 234) + '"/>' +
        t2(x + 120, 230, bon ? "l'eau arrive dans le sens du courant" : "l'eau tape le courant de face", "sgc-p", "middle") +
        t2(x + 120, 250, bon ? "moins de remous, moins de dépôts" : "remous, dépôts, bouchons", "sgc-p", "middle");
    }
    cadre.innerHTML = dessinSvg(270, "Deux branchements sur un collecteur horizontal : un té à 87 degrés 30 et une culotte à 45 degrés",
      panneau(20, "Té à 87°30", "M140 60V172", false) + '<path class="sgc-eau" d="M140 66V170"/>' +
      panneau(300, "Culotte à 45°", "M350 70L420 172", true) + '<path class="sgc-eau" d="M354 76L416 166"/>' +
      '<path d="M120 196q20 18 40 0" fill="none" stroke="var(--danger)" stroke-width="2.5"/>');
  });
  /* qui impose quoi : trois étages */
  window.BIBLE_DESSINS.sg_rang = monterCours(function (cadre) {
    function etage(y, coul, titre, l1, l2) {
      return '<rect x="20" y="' + y + '" width="520" height="78" rx="8" fill="var(--carte)" stroke="' + coul + '" stroke-width="3"/>' +
        '<rect x="20" y="' + y + '" width="12" height="78" rx="4" fill="' + coul + '"/>' +
        t2(48, y + 24, titre, "sgc-tt") + t2(48, y + 48, l1, "sgc-b") + t2(48, y + 68, l2, "sgc-p");
    }
    function fleche(y) { return '<path d="M280 ' + y + 'v16m-7-8l7 8 7-8" fill="none" stroke="var(--discret)" stroke-width="2"/>'; }
    cadre.innerHTML = dessinSvg(310, "Trois étages de textes : la loi et le règlement d'assainissement s'imposent, la norme et le DTU s'imposent quand un texte ou le marché les cite, la notice du fabricant fixe les conditions d'emploi de son produit",
      etage(10, "var(--b-texte)", "S'IMPOSE À TOUS", "Code de la santé publique, règlement d'assainissement", "la collectivité impose le séparateur ; le règlement ERP, les traversées") + fleche(92) +
      etage(112, "var(--b-norme)", "S'IMPOSE QUAND UN TEXTE OU LE MARCHÉ LA CITE", "NF EN 1825, NF DTU 60.11 et 60.1", "la méthode : taille, pentes, ventilation, vidange") + fleche(194) +
      etage(214, "var(--b-fab)", "FIXE LES CONDITIONS D'EMPLOI DU PRODUIT", "Notice et fiche du fabricant, Avis Technique", "températures, joints, pose : hors de ce cadre, plus de garantie"));
  });

  /* la taille nominale : un restaurant ouvert 12 heures, d'après la méthode par nombre de repas */
  window.BIBLE_DESSINS.sg_ns = monterCours(function (cadre, commandes, dire) {
    var TAILLES = [1, 2, 4, 7, 10, 15, 20, 25];
    var etat = { repas: 200, chaud: false, deterg: true };
    cadre.innerHTML = dessinSvg(250, "Calcul de la taille nominale d'un séparateur : débit, facteurs de température, de densité et de détergents, puis la taille retenue",
      t2(20, 36, "RESTAURANT OUVERT 12 HEURES, 50 LITRES D'EAU PAR REPAS", "sgc-tt") +
      t2(20, 84, "", "sgc-b", "start", "sgc-ns-q") + t2(20, 106, "débit de pointe Qs", "sgc-p") +
      t2(200, 84, "× 1,0", "sgc-b", "start", "sgc-ns-ft") + t2(200, 106, "ft, température", "sgc-p") +
      t2(310, 84, "× 1,0", "sgc-b") + t2(310, 106, "fd, densité", "sgc-p") +
      t2(410, 84, "× 1,3", "sgc-b", "start", "sgc-ns-fr") + t2(410, 106, "fr, détergents", "sgc-p") +
      '<path d="M20 124H540" class="sgc-rep"/>' +
      t2(20, 166, "", "sgc-g", "start", "sgc-ns-calc") + t2(20, 190, "taille calculée", "sgc-p") +
      t2(300, 166, "", "sgc-g", "start", "sgc-ns-res") + t2(300, 190, "taille retenue : la suivante de la liste", "sgc-p") +
      t2(20, 232, "", "sgc-t", "start", "sgc-ns-deb"));
    commandes.innerHTML = '<div class="sgc-boutons">' + [100, 200, 400, 600].map(function (m) {
      return '<button class="bouton" type="button" data-r="' + m + '">' + m + " repas</button>";
    }).join("") + '<button class="bouton" type="button" data-f="chaud">Eau à plus de 60 °C</button>' +
      '<button class="bouton" type="button" data-f="deterg">Détergents</button></div>';
    function virgule(x, n) { return x.toFixed(n).replace(".", ","); }
    function milliers(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
    function maj() {
      var qs = etat.repas * 50 * 8.5 / (3600 * 12);
      var ft = etat.chaud ? 1.3 : 1, fr = etat.deterg ? 1.3 : 1, ns = qs * ft * fr;
      var res = TAILLES.filter(function (x) { return x >= ns - 1e-9; })[0];
      cadre.querySelector("#sgc-ns-q").textContent = virgule(qs, 2) + " l/s";
      cadre.querySelector("#sgc-ns-ft").textContent = "× " + virgule(ft, 1);
      cadre.querySelector("#sgc-ns-fr").textContent = "× " + virgule(fr, 1);
      cadre.querySelector("#sgc-ns-calc").textContent = "= " + virgule(ns, 2);
      cadre.querySelector("#sgc-ns-res").textContent = "NS " + res;
      cadre.querySelector("#sgc-ns-deb").textContent = "Débourbeur : " + milliers(res * 100) + " litres au moins. Graisses stockées : " + milliers(res * 40) + " litres.";
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-r]"), function (b) { b.classList.toggle("actif", +b.getAttribute("data-r") === etat.repas); });
      commandes.querySelector('[data-f="chaud"]').classList.toggle("actif", etat.chaud);
      commandes.querySelector('[data-f="deterg"]').classList.toggle("actif", etat.deterg);
      dire("Qs = repas × 50 litres × 8,5 ÷ (3 600 × 12 heures), pour un restaurant. On multiplie par les facteurs, puis on prend la taille suivante de la liste : 1, 2, 4, 7, 10, 15, 20, 25. Le débourbeur fait au moins 100 litres par unité de taille.", "norme", en("§ 6.1, § 6.2 et § 6.4") + " ; volume par repas et coefficient d'une note de veille du GRAIE, 2006");
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.getAttribute("data-r")) etat.repas = +b.getAttribute("data-r");
      else etat[b.getAttribute("data-f")] = !etat[b.getAttribute("data-f")];
      maj();
    });
    maj();
  });

  /* changer de taille : la NS 4 et la NS 7 d'une même gamme */
  window.BIBLE_DESSINS.sg_tailles = monterCours(function (cadre) {
    function cuve(x, l, h, dn, ep, titre, vol, masse) {
      var y = 250 - h;
      return '<rect x="' + x + '" y="' + y + '" width="' + l + '" height="' + h + '" rx="8" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="3"/>' +
        '<rect x="' + (x + 3) + '" y="' + (y + h * 0.3) + '" width="' + (l - 6) + '" height="' + (h * 0.7 - 3) + '" fill="var(--s-air)" fill-opacity=".25"/>' +
        '<path d="M' + (x - 40) + " " + (y + h * 0.22) + "H" + x + "M" + (x + l) + " " + (y + h * 0.3) + "H" + (x + l + 40) + '" stroke="var(--s-gaine-bord)" stroke-width="' + ep + '"/>' +
        t2(x + l / 2, y - 14, titre, "sgc-b", "middle") + t2(x - 22, y + h * 0.22 - ep - 2, dn, "sgc-p", "end") +
        t2(x + l / 2, 276, vol, "sgc-t", "middle") + t2(x + l / 2, 296, masse, "sgc-p", "middle");
    }
    cadre.innerHTML = dessinSvg(310, "Deux tailles d'une même gamme de séparateurs posés au sol : la plus grande a des raccordements plus gros et pèse presque deux fois plus lourd en eau",
      cuve(70, 150, 120, "DN 110", 9, "NS 4", "850 litres en eau", "près d'une tonne sur la dalle") +
      cuve(330, 190, 160, "DN 160", 13, "NS 7", "1 660 litres en eau", "près de 1,8 tonne sur la dalle") +
      '<path d="M40 250H540" stroke="var(--s-hachure)" stroke-width="4"/>');
  });

  /* les tubes face à la chaleur : ce que disent leurs fabricants */
  window.BIBLE_DESSINS.sg_thermo = monterCours(function (cadre) {
    var X0 = 210, K = 2.4;
    function x(t) { return X0 + t * K; }
    function barre(y, nom, cont, pointe, note) {
      return t2(X0 - 10, y + 15, nom, "sgc-t", "end") +
        '<rect x="' + X0 + '" y="' + y + '" width="' + cont * K + '" height="20" rx="3" fill="var(--s-air)"/>' +
        (pointe ? '<rect x="' + x(cont) + '" y="' + y + '" width="' + (pointe - cont) * K + '" height="20" rx="3" fill="var(--s-air)" fill-opacity=".35"/>' : "") +
        t2(x(pointe || cont) + 6, y + 15, note, "sgc-p sgc-halo");
    }
    var reg = "";
    [0, 20, 40, 60, 80, 100].forEach(function (t) { reg += '<path d="M' + x(t) + ' 26V250" stroke="var(--s-gaine-bord)" stroke-width="1" stroke-dasharray="2 5"/>' + t2(x(t), 270, t + " °C", "sgc-p", "middle"); });
    cadre.innerHTML = dessinSvg(320, "Températures admises en continu par des tubes, d'après leurs fabricants, comparées au seuil de 60 °C de la norme et au rinçage d'un lave-vaisselle",
      reg + '<path d="M' + x(60) + ' 26V250" stroke="var(--danger)" stroke-width="2.5"/>' +
      barre(36, "PVC pression (eau potable)", 40, 45, "40 °C, 45 en pression réduite") +
      barre(76, "PVC d'assainissement", 45, 60, "45 °C, 60 en pointe") +
      barre(116, "PE d'évacuation", 80, 0, "80 °C") +
      barre(156, "PP d'évacuation", 90, 0, "90 °C") +
      barre(196, "fonte, usage intensif", 95, 0, "essai 24 h à 95 °C") +
      t2(x(60), 18, "60 °C : facteur ft", "sgc-b", "middle") +
      '<path d="M' + x(84) + ' 226V250" stroke="var(--s-chaud)" stroke-width="5"/>' + t2(x(84), 300, "84 °C : rinçage d'un lave-vaisselle", "sgc-b", "middle"));
  });

  /* CO 31 : ce que demande la traversée selon le diamètre */
  window.BIBLE_DESSINS.sg_co31 = monterCours(function (cadre) {
    var X0 = 30, K = 1.4;
    function x(d) { return X0 + d * K; }
    function zone(d1, d2, coul, l1, l2) {
      return '<rect x="' + x(d1) + '" y="70" width="' + (d2 - d1) * K + '" height="44" fill="' + coul + '" fill-opacity=".25" stroke="' + coul + '" stroke-width="2"/>' +
        t2((x(d1) + x(d2)) / 2, 140, l1, "sgc-b", "middle") + t2((x(d1) + x(d2)) / 2, 160, l2, "sgc-p", "middle");
    }
    var marques = "";
    [75, 125, 315].forEach(function (d) { marques += '<path d="M' + x(d) + ' 62V122" stroke="var(--encre)" stroke-width="2.5"/>' + t2(x(d), 54, d + " mm", "sgc-b", "middle"); });
    cadre.innerHTML = dessinSvg(290, "Règle ERP des conduits qui traversent un plancher ou une paroi visée : rien jusqu'à 75 mm, pare-flammes 30 minutes jusqu'à 315 mm, gaine ou obturateur au-delà",
      t2(20, 24, "DIAMÈTRE NOMINAL DU CONDUIT, EN ERP (ARTICLE CO 31)", "sgc-tt") +
      zone(0, 75, "var(--ok)", "rien", "d'exigé") + zone(75, 315, "var(--s-chaud)", "pare-flammes de traversée 30 min", "ou coupe-feu de traversée 15 min s'il est horizontal") +
      zone(315, 360, "var(--danger)", "gaine", "ou clapet") + marques +
      '<rect x="' + x(75) + '" y="186" width="' + 50 * K + '" height="26" rx="4" fill="var(--b-texte)" fill-opacity=".3" stroke="var(--b-texte)" stroke-width="2"/>' +
      t2(x(75) + 25 * K, 204, "PVC NF Me", "sgc-p", "middle") +
      t2(x(125) + 12, 198, "PVC classé B-s3,d0 et marqué NF Me, 125 mm au plus :", "sgc-p") +
      t2(x(125) + 12, 216, "réputé satisfaire, avec un renfort parfois supprimable", "sgc-p") +
      t2(20, 254, "Fonte et métal fondant au-dessus de 850 °C : réputés satisfaire.", "sgc-t") +
      t2(20, 276, "PP, PE : il faut un collier ou un manchon dont le PV couvre ce tube.", "sgc-t"));
  });

  /* la vidange : diamètre de la conduite et raccord du camion */
  window.BIBLE_DESSINS.sg_aspiration = monterCours(function (cadre) {
    function rond(cx, d, nom) {
      var r = d * 0.55;
      return '<circle cx="' + cx + '" cy="120" r="' + (r + 6) + '" fill="var(--s-gaine-bord)"/><circle cx="' + cx + '" cy="120" r="' + r + '" fill="var(--s-chaud)" fill-opacity=".55"/>' +
        t2(cx, 120 + r + 34, nom, "sgc-b", "middle");
    }
    cadre.innerHTML = dessinSvg(300, "Deux conduites d'aspiration vues en coupe, de 75 et de 100 mm, et les deux sortes de raccords pompier",
      t2(160, 30, "LA CONDUITE, VUE EN COUPE", "sgc-tt", "middle") +
      rond(90, 75, "75 mm") + rond(230, 100, "100 mm") +
      t2(160, 236, "presque deux fois plus de passage", "sgc-p", "middle") + t2(160, 254, "en 100 mm qu'en 75 mm", "sgc-p", "middle") +
      t2(430, 30, "LE RACCORD DU CAMION", "sgc-tt", "middle") +
      '<rect x="340" y="56" width="180" height="70" rx="8" fill="var(--carte)" stroke="var(--danger)" stroke-width="2.5"/>' +
      t2(430, 84, "raccord DSP", "sgc-b", "middle") + t2(430, 106, "refoulement seulement", "sgc-p", "middle") +
      '<rect x="340" y="146" width="180" height="70" rx="8" fill="var(--carte)" stroke="var(--ok)" stroke-width="2.5"/>' +
      t2(430, 174, "raccord AR", "sgc-b", "middle") + t2(430, 196, "aspiration, en DN 100", "sgc-p", "middle") +
      t2(430, 246, "aspirer demande un raccord", "sgc-p", "middle") + t2(430, 264, "fait pour aspirer", "sgc-p", "middle"));
  });

  /* icônes des pièces */
  var I = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5" stroke-linejoin="round">';
  window.BIBLE_ICONES.sgDebourbeur = I + '<rect x="8" y="14" width="48" height="40" rx="4"/><path d="M12 54q12-16 24 0z" fill="var(--s-hachure)" stroke="none"/><path d="M40 14v28"/></svg>';
  window.BIBLE_ICONES.sgSeparateur = I + '<rect x="8" y="14" width="48" height="40" rx="4"/><rect x="11" y="24" width="42" height="9" fill="var(--s-chaud)" fill-opacity=".7" stroke="none"/><path d="M11 33h42" stroke="var(--s-air)"/></svg>';
  window.BIBLE_ICONES.sgCloison = I + '<rect x="8" y="14" width="48" height="40" rx="4"/><path d="M40 14v30" stroke-width="4"/><path d="M30 48c6 4 12 2 16-10" stroke="var(--s-air)" stroke-linecap="round"/></svg>';
  window.BIBLE_ICONES.sgEvent = I + '<path d="M28 60V12h8v48"/><path d="M24 14l8-10 8 10" stroke="var(--s-air)"/></svg>';
  window.BIBLE_ICONES.sgCouvercle = I + '<rect x="8" y="24" width="48" height="32" rx="4"/><rect x="14" y="16" width="16" height="8" rx="2" fill="var(--s-gaine-bord)"/><rect x="34" y="16" width="16" height="8" rx="2" fill="var(--s-gaine-bord)"/></svg>';
  window.BIBLE_ICONES.sgAspi = I + '<path d="M18 58V14h32"/><rect x="48" y="8" width="8" height="14" rx="2" fill="var(--encre-2)"/><path d="M18 52V20" stroke="var(--s-chaud)" stroke-dasharray="4 5"/></svg>';
  window.BIBLE_ICONES.sgPrelev = I + '<path d="M4 24h20M40 24h20"/><rect x="24" y="14" width="16" height="36" rx="2"/><path d="M28 34h8v12h-8z" fill="var(--s-air)" fill-opacity=".5"/></svg>';
  window.BIBLE_ICONES.sgAlarme = I + '<path d="M32 8a14 14 0 0 1 14 14v14l6 8H12l6-8V22A14 14 0 0 1 32 8z"/><path stroke="var(--s-chaud)" d="M26 52a6 6 0 0 0 12 0"/></svg>';
  window.BIBLE_ICONES.sgRelevage = I + '<rect x="10" y="22" width="30" height="34" rx="3"/><circle cx="25" cy="44" r="7"/><path d="M40 30h12V8" stroke="var(--s-air)"/><path d="M46 14l6-6 6 6" stroke="var(--s-air)"/></svg>';
})();
