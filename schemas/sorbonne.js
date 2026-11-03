/* Schéma interactif : sorbonne de laboratoire vue de profil.
   On règle la guillotine, la vitesse frontale se calcule ; trois cas (débit constant, débit variable, recirculation)
   et trois essais (passage devant la sorbonne, panne d'extraction). Dessiné pour la bible, d'après le principe
   décrit par le guide INRS ED 795 (aucun dessin de fabricant repris). */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};

  var ED795 = "INRS, guide ED 795";
  var HST = "INRS, Hygiène et sécurité du travail n° 284, septembre 2026";

  /* sorbonne d'exemple : 1,5 m de large, butée de travail à 500 mm */
  var LARGEUR = 1.5, BUTEE = 500, VSEUIL = 0.4;
  var QCONSTANT = VSEUIL * LARGEUR * (BUTEE / 1000) * 3600;  /* 1 080 m³/h */
  var VCONSIGNE = 0.45, QMIN = 300;

  var STYLE =
    ".sb-t{fill:var(--encre-2);font-size:14px;font-family:inherit}" +
    ".sb-tt{fill:var(--discret);font-size:13px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".sb-g{fill:var(--encre);font-size:30px;font-weight:800;font-family:inherit}" +
    ".sb-corps{fill:var(--s-gaine);stroke:var(--encre-2);stroke-width:3}" +
    ".sb-air{fill:none;stroke:var(--s-air);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:10 13;animation:sb-flux 1s linear infinite}" +
    "@keyframes sb-flux{to{stroke-dashoffset:-23}}" +
    ".sb-pollue{fill:none;stroke:var(--s-chaud);stroke-width:3.5;stroke-linecap:round;stroke-dasharray:6 9;animation:sb-flux 1s linear infinite}" +
    ".sb-fuite{fill:none;stroke:var(--danger);stroke-width:6;stroke-linecap:round;stroke-dasharray:9 9;animation:sb-flux .8s linear infinite;opacity:0;transition:opacity .5s}" +
    ".fuite .sb-fuite{opacity:1}" +
    ".fuite-faible .sb-fuite-1{opacity:.75}" +
    ".panne .sb-air,.panne .sb-pollue{animation-play-state:paused;opacity:.2}" +
    ".sb-alarme{fill:var(--ok);transition:fill .2s}" +
    ".alarme .sb-alarme{fill:var(--danger);animation:sb-clignote .6s steps(2) infinite}" +
    "@keyframes sb-clignote{50%{opacity:.25}}" +
    ".sb-pale{fill:none;stroke:var(--encre);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:sb-tourne .9s linear infinite}" +
    "@keyframes sb-tourne{to{transform:rotate(360deg)}}" +
    ".panne .sb-pale{animation-play-state:paused}" +
    ".sb-m{display:none}" +
    ".constant .m-duct,.variable .m-duct,.recirculation .m-recir{display:inline}" +
    ".sb-passant{opacity:0;transition:opacity .3s}" +
    ".passe .sb-passant{opacity:1}" +
    ".sb-sillage{opacity:0;transition:opacity .4s}" +
    ".passe .sb-sillage{opacity:1}";

  var REGLES =
    ".sb-reglages{display:grid;grid-template-columns:auto 1fr auto;gap:8px 12px;align-items:center;width:100%}" +
    ".sb-reglages label{font-weight:600;font-size:15px}" +
    ".sb-reglages input{width:100%;accent-color:var(--accent)}" +
    ".sb-reglages output{font-variant-numeric:tabular-nums;font-weight:700;min-width:5em;text-align:right}" +
    ".sb-boutons{display:flex;gap:10px;flex-wrap:wrap;align-items:center;width:100%}" +
    "@media (max-width:600px){.sb-reglages{grid-template-columns:1fr auto}.sb-reglages label{grid-column:1/-1;margin-bottom:-4px}}";

  /* la vitre : y haut fixe, y bas varie entre 268 (fermé) et 150 (grand ouvert) */
  var YPLAN = 300;

  var SVG =
    '<svg viewBox="0 0 900 400" role="img" aria-label="Sorbonne de laboratoire vue de profil, avec sa guillotine, son plenum et son conduit d\'extraction">' +
    "<style>" + STYLE + "</style>" +
    '<text class="sb-tt" x="130" y="30" text-anchor="middle">LE LABORATOIRE</text>' +
    '<text class="sb-tt" x="510" y="30" text-anchor="middle">LA SORBONNE</text>' +

    /* opérateur, de profil */
    '<g transform="translate(60 0)"><circle cx="120" cy="150" r="17" fill="var(--encre-2)"/><path d="M96 330v-120q0-30 24-30t24 30v120z" fill="var(--encre-2)"/>' +
    '<path d="M136 205l70 26" stroke="var(--encre-2)" stroke-width="11" stroke-linecap="round"/>' +
    '<path d="M106 330v50M134 330v50" stroke="var(--encre-2)" stroke-width="13" stroke-linecap="round"/></g>' +

    /* personne qui passe, côté laboratoire */
    '<g class="sb-passant"><circle cx="24" cy="150" r="15" fill="var(--discret)"/><path d="M4 330v-120q0-28 20-28t20 28v120z" fill="var(--discret)"/>' +
    '<text class="sb-t" id="sb-dist" x="24" y="124" text-anchor="middle" style="font-weight:700"></text></g>' +
    '<path class="sb-sillage" id="sb-sillage" fill="none" stroke="var(--discret)" stroke-width="2.5" stroke-dasharray="3 7" stroke-linecap="round"/>' +

    /* corps de la sorbonne : plan de travail, paroi arrière, plenum et fentes */
    '<path class="sb-corps" d="M300 130H660V340H300V300"/>' +
    '<rect x="296" y="296" width="370" height="10" fill="var(--s-gaine-bord)"/>' +
    '<rect x="620" y="130" width="40" height="166" fill="var(--s-paroi)"/>' +
    '<rect x="616" y="150" width="8" height="26" fill="var(--fond-2)"/><rect x="616" y="256" width="8" height="30" fill="var(--fond-2)"/>' +
    '<text class="sb-t" transform="translate(645 245) rotate(-90)">plenum</text>' +
    '<path d="M624 163H668M624 271H668" stroke="var(--discret)" stroke-width="1.2"/>' +
    '<text class="sb-t" x="672" y="168">fente haute</text>' +
    '<text class="sb-t" x="672" y="276">fente basse</text>' +

    /* source polluante */
    '<path d="M430 296l-10-34h40l-10 34z" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
    '<text class="sb-t" x="478" y="324" text-anchor="middle">source : à 15 ou 20 cm au moins de l\'ouverture</text>' +

    /* flux de l'air entrant et de l'air pollué vers les fentes */
    '<path class="sb-air" id="sb-air-1"/>' +
    '<path class="sb-air" id="sb-air-2"/>' +
    '<path class="sb-pollue" d="M440 258C450 220 520 226 612 268"/>' +
    '<path class="sb-pollue" d="M440 258C430 190 520 150 612 162"/>' +

    /* fuites vers l'opérateur */
    '<path class="sb-fuite sb-fuite-1" id="sb-fuite-1"/>' +
    '<path class="sb-fuite" id="sb-fuite-2"/>' +

    /* guillotine (translatée verticalement) */
    '<g id="sb-vitre"><rect x="296" y="0" width="10" height="170" fill="var(--s-air)" fill-opacity=".4" stroke="var(--encre)" stroke-width="2"/>' +
    '<path d="M286 168h30" stroke="var(--encre)" stroke-width="5" stroke-linecap="round"/></g>' +
    '<path id="sb-cote" stroke="var(--encre)" stroke-width="1.5" fill="none"/>' +
    '<text class="sb-t" id="sb-cote-t" x="262" y="280" text-anchor="end"></text>' +

    /* conduit, ventilateur, rejet */
    '<g class="sb-m m-duct">' +
    '<rect x="628" y="30" width="26" height="102" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
    '<path class="sb-pollue" d="M641 130V30"/>' +
    '<circle cx="641" cy="72" r="19" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/><path class="sb-pale" d="M641 60V84M629 72H653"/>' +
    '<text class="sb-t" x="668" y="60">ventilateur</text><text class="sb-t" x="668" y="78">vers le rejet</text><text class="sb-t" x="668" y="96">extérieur</text></g>' +

    /* recirculation : filtre en tête, air renvoyé au labo */
    '<g class="sb-m m-recir">' +
    '<rect x="520" y="86" width="140" height="44" rx="4" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/>' +
    '<path d="M534 92v32M548 92v32M562 92v32M576 92v32M590 92v32" stroke="var(--b-expert)" stroke-width="3"/>' +
    '<circle cx="628" cy="108" r="16" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/><path class="sb-pale" d="M628 98V118M618 108H638"/>' +
    '<text class="sb-t" x="590" y="78" text-anchor="middle">filtres</text>' +
    '<path class="sb-air" d="M520 108H340Q300 108 250 90"/>' +
    '<text class="sb-t" x="350" y="96">air filtré renvoyé au labo</text></g>' +

    /* lecture et alarme */
    '<text class="sb-g" id="sb-vit" x="822" y="130" text-anchor="middle"></text>' +
    '<text class="sb-t" x="822" y="152" text-anchor="middle">vitesse frontale</text>' +
    '<text class="sb-t" id="sb-deb" x="822" y="192" text-anchor="middle"></text>' +
    '<circle class="sb-alarme" cx="822" cy="234" r="14"/>' +
    '<text class="sb-t" id="sb-al" x="822" y="270" text-anchor="middle"></text>' +
    "</svg>";

  var MODES = {
    constant: { nom: "Débit constant", note: "Le ventilateur aspire toujours le même débit : plus la guillotine est basse, plus l'air entre vite. C'est pour cela qu'on règle la référence à 500 mm d'ouverture." },
    variable: { nom: "Débit variable", note: "Le débit suit l'ouverture, donc la vitesse reste stable et on rejette moins d'air chauffé. Mais la compensation doit être asservie à l'extraction, et le débit réduit ne doit pas faire dépasser 25 % de la LIE dans la sorbonne." },
    recirculation: { nom: "Recirculation", note: "Pas de conduit : l'air est filtré puis renvoyé dans le labo. Réservée à des opérations de même type et à des produits connus et bien retenus par le filtre, listés sur la sorbonne. À proscrire avec des CMR." }
  };

  window.BIBLE_SCHEMAS.sorbonne = function (cadre, ctx) {
    cadre.innerHTML =
      "<style>" + REGLES + "</style>" +
      '<div class="schema-onglets">' + Object.keys(MODES).map(function (k, i) {
        return '<button class="bouton' + (i === 0 ? " actif" : "") + '" type="button" data-mode="' + k + '">' + MODES[k].nom + "</button>";
      }).join("") + "</div>" +
      '<div class="schema-cadre">' + SVG + "</div>" +
      '<div class="schema-commandes"><div class="sb-reglages"><label for="sb-h">Ouverture de la guillotine</label>' +
      '<input id="sb-h" type="range" min="25" max="800" step="25" value="500"><output id="sb-h-v"></output></div>' +
      '<div class="sb-boutons">' +
      '<button class="bouton" type="button" data-a="p40">Quelqu\'un passe à 0,4 m</button>' +
      '<button class="bouton" type="button" data-a="p100">Quelqu\'un passe à 1 m</button>' +
      '<button class="bouton" type="button" data-a="panne">Panne d\'extraction</button>' +
      '<button class="bouton" type="button" data-a="repos">Revenir au repos</button>' +
      '<span class="schema-etat"></span></div></div><p class="schema-note"></p>';

    var svg = cadre.querySelector("svg");
    var note = cadre.querySelector(".schema-note");
    var etat = cadre.querySelector(".schema-etat");
    var champ = cadre.querySelector("#sb-h");
    var mode = "constant", panne = false, minuteurs = [];

    function dire(t, s, ref) { note.innerHTML = t + " " + ctx.badge(s, ref); }
    function nombre(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

    function calcul(h) {
      var s = LARGEUR * h / 1000;
      if (mode === "variable") {
        var q = Math.max(QMIN, VCONSIGNE * s * 3600);
        return { q: q, v: q / 3600 / s };
      }
      return { q: QCONSTANT, v: QCONSTANT / 3600 / s };
    }

    function maj(sansNote) {
      var h = +champ.value;
      cadre.querySelector("#sb-h-v").textContent = h + " mm";
      /* 1 mm d'ouverture = 0,2 unité de dessin : la vitre remonte depuis le plan de travail (y = 300) */
      var bas = YPLAN - h * 0.2;
      svg.querySelector("#sb-vitre").setAttribute("transform", "translate(0," + (bas - 170) + ")");
      svg.querySelector("#sb-cote").setAttribute("d", "M270 " + bas + "V" + YPLAN + "M264 " + bas + "h12M264 " + YPLAN + "h12");
      var t = svg.querySelector("#sb-cote-t"); t.textContent = h + " mm"; t.setAttribute("y", bas - 8); t.setAttribute("x", 282);
      /* l'air passe toujours sous la vitre, et les fuites aussi */
      var ouv = YPLAN - bas, y1 = bas + ouv * 0.34, y2 = bas + ouv * 0.72;
      svg.querySelector("#sb-air-1").setAttribute("d", "M232 " + y1 + "H326Q420 " + (y1 - 6) + " 612 272");
      svg.querySelector("#sb-air-2").setAttribute("d", "M232 " + y2 + "H340Q470 " + (y2 - 2) + " 612 280");
      svg.querySelector("#sb-fuite-1").setAttribute("d", "M372 " + (bas + ouv * 0.4) + "C330 " + (bas + ouv * 0.25) + " 290 " + (bas + 2) + " 240 " + (bas - 10));
      svg.querySelector("#sb-fuite-2").setAttribute("d", "M340 " + (bas + ouv * 0.18) + "C310 " + (bas - 4) + " 268 " + (bas - 28) + " 196 " + Math.min(bas - 34, 158));
      var c = calcul(h);
      var hors = h > BUTEE;
      var vit = svg.querySelector("#sb-vit");
      if (panne) {
        vit.textContent = "0 m/s"; vit.style.fill = "var(--danger)";
        svg.querySelector("#sb-deb").textContent = "plus de débit";
        svg.querySelector("#sb-al").textContent = "alarme de débit";
        return;
      }
      vit.textContent = c.v.toFixed(2).replace(".", ",") + " m/s";
      vit.style.fill = c.v >= VSEUIL ? "var(--ok)" : "var(--danger)";
      svg.querySelector("#sb-deb").textContent = nombre(c.q) + " m³/h";
      svg.querySelector("#sb-al").textContent = hors ? "butée dépassée" : "débit correct";
      svg.classList.toggle("alarme", hors);
      svg.classList.toggle("fuite", c.v < VSEUIL);
      etat.textContent = hors ? "Position de maintenance : pas de manipulation" : "Position de travail";
      if (sansNote) return;
      if (hors) {
        dire("Au-delà de la butée, c'est la position de maintenance : le confinement n'est plus suffisant et la protection contre les projections est plus faible. Le dépassement doit être délibéré et déclencher une alarme.", "expert", ED795 + ", paragraphes 1.1 et 3");
      } else if (mode === "constant" && h < 100) {
        dire("Guillotine presque fermée : l'air entre très vite. Elle ne doit jamais pouvoir se fermer totalement, pour garder une entrée d'air (de l'ordre de 25 mm au minimum).", "expert", ED795 + ", paragraphe 3");
      } else {
        dire(MODES[mode].note, "expert", ED795 + ", paragraphes 1.1, 1.2 et encadré 1");
      }
    }

    function nettoyer() {
      minuteurs.forEach(clearTimeout); minuteurs = [];
      panne = false;
      svg.setAttribute("class", mode);
    }

    function passage(loin) {
      nettoyer(); maj(true);
      var p = svg.querySelector(".sb-passant");
      var bas = YPLAN - (+champ.value) * 0.2;
      p.style.transition = "";
      p.style.transform = "translateX(" + (loin ? 4 : 84) + "px)";
      svg.querySelector("#sb-dist").textContent = loin ? "à 1 m" : "à 0,4 m";
      svg.querySelector("#sb-sillage").setAttribute("d", loin
        ? "M58 230C90 214 112 214 136 226"
        : "M138 212C190 180 250 " + (bas - 40) + " 296 " + (bas + 6));
      svg.classList.add("passe");
      minuteurs.push(setTimeout(function () { svg.classList.add(loin ? "fuite-faible" : "fuite"); }, 900));
      minuteurs.push(setTimeout(function () {
        svg.classList.remove("passe", "fuite", "fuite-faible"); maj(true);
      }, 3600));
      etat.textContent = "Passage devant la sorbonne";
      dire(loin
        ? "À 1 m de l'ouverture, le sillage atteint à peine la sorbonne : le risque est divisé par plus de 10 par rapport à un passage à 0,4 m. D'où la zone de passage à 1 m au moins."
        : "À 0,4 m, le sillage de la personne perturbe l'air entrant et des bouffées de polluant sortent vers l'opérateur. Dans le labo étudié par l'INRS, quelqu'un passait en moyenne toutes les deux minutes.", "expert", HST);
    }

    function pannee() {
      nettoyer();
      panne = true;
      svg.classList.add("panne", "alarme", "fuite");
      etat.textContent = "Panne d'extraction";
      maj(true);
      dire("Le ventilateur s'arrête : plus rien ne retient les vapeurs. Un dispositif d'avertissement automatique doit le signaler, à sécurité positive, avec une alarme visuelle et sonore. On ferme les récipients, on baisse la guillotine, on sort.", "texte", "code du travail, article R4222-13 ; " + ED795 + ", paragraphe 3");
    }

    cadre.querySelector(".schema-onglets").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      mode = b.getAttribute("data-mode");
      Array.prototype.forEach.call(cadre.querySelectorAll(".schema-onglets .bouton"), function (x) { x.classList.toggle("actif", x === b); });
      nettoyer(); maj();
    });
    cadre.querySelector(".sb-boutons").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      var a = b.getAttribute("data-a");
      if (a === "p40") passage(false);
      else if (a === "p100") passage(true);
      else if (a === "panne") pannee();
      else { nettoyer(); maj(); }
    });
    champ.addEventListener("input", function () { if (panne) { nettoyer(); } maj(); });

    nettoyer(); maj();
  };
  /* ---------- dessins du cours (donnees/fiches/sorbonne.js) ---------- */
  window.BIBLE_DESSINS = window.BIBLE_DESSINS || {};
  window.BIBLE_ICONES = window.BIBLE_ICONES || {};

  var STYLE_COURS =
    ".sbc-t{fill:var(--encre-2);font-size:15px;font-family:inherit}" +
    ".sbc-b{fill:var(--encre);font-size:16px;font-weight:700;font-family:inherit}" +
    ".sbc-p{fill:var(--discret);font-size:13.5px;font-family:inherit}" +
    ".sbc-tt{fill:var(--discret);font-size:12.5px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".sbc-g{fill:var(--encre);font-size:30px;font-weight:800;font-family:inherit}" +
    ".sbc-air,.sbc-vap{fill:none;stroke-width:4;stroke-linecap:round;stroke-dasharray:10 12;animation:sbc-flux 1s linear infinite}" +
    ".sbc-air{stroke:var(--s-air)}.sbc-vap{stroke:var(--s-chaud)}" +
    ".sbc-fin{stroke-width:2.5;stroke-dasharray:6 8}" +
    "@keyframes sbc-flux{to{stroke-dashoffset:-22}}" +
    ".sbc-corps{fill:var(--s-gaine);stroke:var(--encre-2);stroke-width:3}" +
    ".sbc-cadre{fill:var(--carte);stroke:var(--s-gaine-bord);stroke-width:2.5}" +
    ".sbc-gaine{fill:var(--s-gaine);stroke:var(--s-gaine-bord);stroke-width:2}" +
    ".sbc-vitre{fill:var(--s-air);fill-opacity:.25;stroke:var(--encre);stroke-width:2.5}" +
    ".sbc-pers{fill:var(--encre-2)}" +
    ".sbc-rep{stroke:var(--discret);stroke-width:1.3}" +
    ".sbc-fan{fill:var(--carte);stroke:var(--encre);stroke-width:2.5}" +
    ".sbc-pale{fill:none;stroke:var(--encre);stroke-width:3;stroke-linecap:round;transform-box:fill-box;transform-origin:center;animation:sbc-tourne 1s linear infinite}" +
    "@keyframes sbc-tourne{to{transform:rotate(360deg)}}" +
    ".sbc-boutons{display:flex;gap:8px;flex-wrap:wrap;align-items:center;width:100%}";

  function sbcStyle() {
    if (document.getElementById("sbc-style")) return;
    var s = document.createElement("style");
    s.id = "sbc-style"; s.textContent = STYLE_COURS;
    document.head.appendChild(s);
  }
  function dessinSvg(h, aria, c) { return '<svg viewBox="0 0 560 ' + h + '" role="img" aria-label="' + aria + '">' + c + "</svg>"; }
  function tx(x, y, s, cls, ancre, id) {
    return '<text class="' + (cls || "sbc-t") + '" x="' + x + '" y="' + y + '"' + (ancre ? ' text-anchor="' + ancre + '"' : "") + (id ? ' id="' + id + '"' : "") + ">" + s + "</text>";
  }
  function fl(cls, d, id) { return '<path class="' + cls + '" d="' + (d || "") + '"' + (id ? ' id="' + id + '"' : "") + "/>"; }
  function operateur(x, y) {
    return '<circle class="sbc-pers" cx="' + x + '" cy="' + (y - 110) + '" r="13"/><path class="sbc-pers" d="M' + (x - 16) + " " + y + "v-74a16 16 0 0 1 32 0v74z\"/>";
  }
  function pale(x, y, r) {
    return '<circle class="sbc-fan" cx="' + x + '" cy="' + y + '" r="' + r + '"/><path class="sbc-pale" d="M' + x + " " + (y - r + 4) + "V" + (y + r - 4) + "M" + (x - r + 4) + " " + y + "H" + (x + r - 4) + '"/>';
  }
  function monterCours(fn) {
    return function (el, ctx) {
      sbcStyle();
      el.innerHTML = '<div class="schema-cadre"></div><div class="schema-commandes"></div><p class="schema-note"></p>';
      var note = el.querySelector(".schema-note"), cmd = el.querySelector(".schema-commandes");
      fn(el.querySelector(".schema-cadre"), cmd, function (texte, s, ref) { note.innerHTML = texte + " " + ctx.badge(s, ref); });
      if (!cmd.children.length) cmd.parentNode.removeChild(cmd);
      if (!note.textContent) note.parentNode.removeChild(note);
    };
  }
  /* la coupe commune : enceinte de profil, plan de travail et ouverture à gauche */
  function coupe(bas) {
    return '<path class="sbc-corps" d="M190 100H470V300H190V290"/>' +
      '<rect x="176" y="288" width="310" height="12" fill="var(--s-gaine-bord)"/><rect x="200" y="300" width="270" height="48" fill="var(--s-paroi)"/>' +
      '<rect x="410" y="100" width="60" height="172" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
      '<rect class="sbc-vitre" x="184" y="' + (bas - 150) + '" width="10" height="150"/>';
  }

  window.BIBLE_DESSINS.sb_quoi = monterCours(function (cadre) {
    function rep(x1, y1, x2, y2, txt, ancre) { return '<path class="sbc-rep" d="M' + x1 + " " + y1 + "L" + x2 + " " + y2 + '"/>' + tx(x2 + (ancre === "end" ? -4 : 4), y2 + 5, txt, "sbc-p", ancre); }
    cadre.innerHTML = dessinSvg(360, "Sorbonne vue de profil, avec l'écran mobile, l'ouverture, le plan de travail, le plenum, les fentes et le conduit vers le ventilateur",
      coupe(240) + operateur(56, 348) + '<rect class="sbc-gaine" x="424" y="30" width="30" height="72"/>' + pale(439, 60, 15) +
      fl("sbc-air", "M78 262H300Q370 256 408 262") + fl("sbc-air", "M408 262C424 250 432 200 436 104") + fl("sbc-vap", "M436 104V10") +
      fl("sbc-vap sbc-fin", "M322 282C340 250 370 200 406 180") +
      '<path d="M300 288h44l-6-14h-32z" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
      rep(189, 170, 130, 150, "écran mobile", "end") + rep(186, 262, 150, 238, "ouverture", "end") +
      rep(260, 294, 230, 334, "plan de travail") + rep(320, 276, 356, 334, "source de vapeurs") +
      rep(410, 220, 490, 236, "plenum") + rep(410, 272, 490, 280, "fentes") + rep(454, 60, 486, 60, "ventilateur") +
      tx(300, 126, "VOLUME DE TRAVAIL", "sbc-tt", "middle") + tx(470, 20, "vers dehors", "sbc-p"));
  });

  window.BIBLE_ICONES.enceinte = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5" stroke-linejoin="round"><path d="M10 12h44v40H10z"/><path d="M6 52h52"/></svg>';
  window.BIBLE_ICONES.ecran = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5" stroke-linejoin="round"><path d="M10 8h44v48H10z"/><rect x="14" y="12" width="36" height="24" fill="var(--s-air)" fill-opacity=".3"/><path d="M26 42h12"/></svg>';
  window.BIBLE_ICONES.butee = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5" stroke-linecap="round"><path d="M20 8v48M8 40h24"/><path stroke="var(--danger)" stroke-width="4" d="M12 34h16"/><path d="M44 16v30M38 22l6-6 6 6M38 40l6 6 6-6"/></svg>';
  window.BIBLE_ICONES.plan = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M6 36h52v8H6z"/><path d="M6 30v6M58 30v6M16 44v12M48 44v12"/></svg>';
  window.BIBLE_ICONES.plenum = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M18 6h30v52H18z"/><path d="M18 18h8M18 44h8"/><path stroke="var(--s-air)" d="M4 18h24M4 44h24M36 50V10"/></svg>';
  window.BIBLE_ICONES.conduit = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M24 62V36h16v26M24 24V6M40 24V6"/><circle cx="32" cy="30" r="12"/><path stroke="var(--s-chaud)" d="M32 18V2"/></svg>';
  window.BIBLE_ICONES.alarme = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5" stroke-linejoin="round"><path d="M32 8a16 16 0 0 1 16 16v16l6 8H10l6-8V24A16 16 0 0 1 32 8z"/><path stroke="var(--danger)" d="M26 54a6 6 0 0 0 12 0"/></svg>';
  window.BIBLE_ICONES.constant = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M6 8v50h52"/><path stroke="var(--s-air)" stroke-width="4" d="M12 26h44"/></svg>';
  window.BIBLE_ICONES.variable = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M6 8v50h52"/><path stroke="var(--s-air)" stroke-width="4" d="M12 50L56 16"/></svg>';
  window.BIBLE_ICONES.deux = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M6 8v50h52"/><path stroke="var(--s-air)" stroke-width="4" d="M12 44h20V20h24"/></svg>';
  window.BIBLE_ICONES.recirculation = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><rect x="12" y="26" width="40" height="32"/><rect x="18" y="12" width="28" height="14"/><path d="M22 14v10M28 14v10M36 14v10M42 14v10"/><path stroke="var(--s-air)" d="M46 8H58V24"/></svg>';
  window.BIBLE_ICONES.rejet = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M6 44h52v14H6z"/><path d="M26 44V18h12v26"/><path stroke="var(--s-chaud)" stroke-width="3" d="M32 14V2"/></svg>';

  window.BIBLE_DESSINS.sb_duel = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(320, "À l'ouverture de la sorbonne, l'air qui rentre retient les vapeurs dans l'enceinte",
      tx(90, 40, "LE LABO", "sbc-tt", "middle") + tx(340, 40, "DANS LA SORBONNE", "sbc-tt", "middle") +
      '<rect x="190" y="56" width="340" height="224" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="3"/>' +
      '<rect fill="var(--fond-2)" x="186" y="150" width="10" height="128"/><rect class="sbc-vitre" x="184" y="40" width="10" height="110"/>' +
      '<rect x="176" y="278" width="360" height="12" fill="var(--s-gaine-bord)"/>' +
      fl("sbc-air", "M20 172H330") + fl("sbc-air", "M20 212H330") + fl("sbc-air", "M20 252H330") +
      '<path d="M300 278h60l-8-18h-44z" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
      fl("sbc-vap", "M322 258C300 220 250 196 230 190") + fl("sbc-vap sbc-fin", "M340 258C350 210 420 180 500 170") +
      tx(90, 150, "l'air rentre", "sbc-b", "middle") + tx(90, 300, "au moins 0,4 m/s", "sbc-t", "middle") +
      tx(362, 92, "les vapeurs veulent sortir", "sbc-p", "middle") + tx(362, 112, "le courant d'air les retient", "sbc-p", "middle"));
  });

  window.BIBLE_DESSINS.sb_ouverture = monterCours(function (cadre, commandes, dire) {
    var POS = { basse: { h: 250, nom: "Fermée au mieux : 250 mm" }, butee: { h: 500, nom: "Butée de travail : 500 mm" }, haute: { h: 800, nom: "Maintenance : 800 mm" } };
    cadre.innerHTML = dessinSvg(320, "Plus la guillotine est basse, plus l'air entre vite, à débit égal",
      '<path class="sbc-corps" d="M220 40H520V280H220V270"/><rect x="206" y="268" width="330" height="12" fill="var(--s-gaine-bord)"/>' +
      '<rect id="sbc-g" class="sbc-vitre" x="214" width="10" height="170"/>' +
      fl("sbc-air", "", "sbc-a1") + fl("sbc-air", "", "sbc-a2") +
      tx(110, 112, "", "sbc-g", "middle", "sbc-v") + tx(110, 140, "vitesse frontale", "sbc-p", "middle") +
      tx(110, 176, "", "sbc-b", "middle", "sbc-h") + tx(110, 198, "d'ouverture", "sbc-p", "middle") +
      tx(370, 30, "exemple : 1,5 m de large, 1 080 m³/h constants", "sbc-p", "middle"));
    commandes.innerHTML = '<div class="sbc-boutons">' + Object.keys(POS).map(function (k) {
      return '<button class="bouton" type="button" data-pos="' + k + '">' + POS[k].nom + "</button>";
    }).join("") + "</div>";
    function choisir(k) {
      var h = POS[k].h, v = 1080 / 3600 / (1.5 * h / 1000), ouv = h * 0.2, bas = 268 - ouv;
      cadre.querySelector("#sbc-g").setAttribute("y", bas - 170);
      cadre.querySelector("#sbc-a1").setAttribute("d", "M170 " + (bas + ouv * 0.3) + "H440");
      cadre.querySelector("#sbc-a2").setAttribute("d", "M170 " + (bas + ouv * 0.72) + "H440");
      ["#sbc-a1", "#sbc-a2"].forEach(function (s) { cadre.querySelector(s).style.animationDuration = Math.max(0.3, 0.55 / v) + "s"; });
      var tv = cadre.querySelector("#sbc-v");
      tv.textContent = v.toFixed(2).replace(".", ",") + " m/s";
      tv.style.fill = Math.round(v * 100) >= 40 ? "var(--ok)" : "var(--danger)";
      cadre.querySelector("#sbc-h").textContent = h + " mm";
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-pos]"), function (b) { b.classList.toggle("actif", b.getAttribute("data-pos") === k); });
      if (k === "basse") dire("La vitre basse protège mieux des projections, et l'air entre plus vite. On travaille aussi bas que les gestes le permettent, jamais fermé au point d'empêcher l'air d'entrer.", "expert", ED795 + ", paragraphe 1.1");
      else if (k === "butee") dire("C'est la position de référence. La vitesse frontale mesurée ici doit rester d'au moins 0,4 m/s en chaque point.", "expert", ED795 + ", tableaux 1 et 3");
      else dire("Sert à entretenir ou à installer du matériel, jamais à manipuler : le confinement n'est plus suffisant, et la protection contre les projections est plus faible.", "expert", ED795 + ", paragraphe 1.1");
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-pos]"); if (b) choisir(b.getAttribute("data-pos"));
    });
    choisir("butee");
  });

  window.BIBLE_DESSINS.sb_plan = monterCours(function (cadre) {
    function cote(x1, y1, x2, y2, t2, tx2, ty2, ancre) {
      return '<path d="M' + x1 + " " + y1 + "L" + x2 + " " + y2 + '" stroke="var(--danger)" stroke-width="2" stroke-dasharray="5 4"/>' + tx(tx2, ty2, t2, "sbc-b", ancre || "middle");
    }
    cadre.innerHTML = dessinSvg(340, "Labo vu en plan : distances à garder autour de l'ouverture d'une sorbonne",
      '<rect class="sbc-cadre" x="20" y="20" width="520" height="300"/>' +
      '<rect class="sbc-gaine" x="190" y="26" width="180" height="60"/>' + tx(280, 62, "sorbonne", "sbc-t", "middle") +
      '<path d="M190 88H370" stroke="var(--s-air)" stroke-width="5"/>' + tx(280, 108, "ouverture", "sbc-p", "middle") +
      /* passage */
      '<path d="M26 180H534" stroke="var(--discret)" stroke-width="16" stroke-opacity=".22"/>' + tx(100, 170, "zone de passage", "sbc-p", "middle") +
      cote(280, 92, 280, 172, "1 m", 300, 142, "start") +
      /* mur, paillasse en face */
      '<rect x="190" y="270" width="180" height="26" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' + tx(280, 288, "paillasse", "sbc-p", "middle") +
      cote(340, 92, 340, 268, "1,4 m", 360, 232, "start") +
      /* autre sorbonne */
      '<rect class="sbc-gaine" x="440" y="26" width="94" height="60"/>' + tx(487, 62, "autre", "sbc-p", "middle") +
      cote(372, 56, 438, 56, "3 m", 405, 46) +
      /* porte */
      '<path d="M20 110V160" stroke="var(--carte)" stroke-width="8"/><path d="M24 110l44 18" stroke="var(--encre)" stroke-width="3"/>' + tx(70, 104, "porte : 1 m", "sbc-b") +
      /* soufflage */
      '<rect x="76" y="238" width="60" height="40" fill="none" stroke="var(--s-air)" stroke-width="2.5"/><path d="M76 238l60 40M136 238l-60 40" stroke="var(--s-air)" stroke-width="2"/>' + tx(106, 298, "soufflage loin", "sbc-p", "middle"));
  });

  window.BIBLE_DESSINS.sb_labo = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(320, "Labo vu en coupe : la sorbonne extrait, l'air de compensation entre loin de son ouverture, et le labo reste en dépression",
      '<rect class="sbc-cadre" x="20" y="60" width="520" height="230"/>' +
      '<rect x="370" y="136" width="160" height="150" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2.5"/><rect class="sbc-vitre" x="366" y="96" width="8" height="110"/>' +
      '<rect class="sbc-gaine" x="470" y="6" width="30" height="132"/>' + fl("sbc-vap", "M485 136V4") + pale(485, 36, 14) +
      fl("sbc-air", "M60 8V90C60 160 160 190 240 200C300 208 400 226 470 170") +
      '<rect class="sbc-gaine" x="45" y="6" width="30" height="58"/><rect x="34" y="62" width="52" height="8" rx="2" fill="var(--encre-2)"/>' +
      '<circle cx="250" cy="110" r="30" fill="var(--fond-2)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' + tx(250, 121, "−", "sbc-g", "middle") +
      tx(250, 162, "10 à 20 Pa de moins", "sbc-p", "middle") + tx(250, 180, "que les voisins", "sbc-p", "middle") +
      tx(115, 30, "air de compensation", "sbc-b") + tx(370, 30, "extraction", "sbc-b", "end") + tx(115, 50, "autant que ce qui sort", "sbc-p") +
      tx(280, 310, "l'air neuf arrive doucement, loin de l'ouverture", "sbc-p", "middle"));
  });

  window.BIBLE_DESSINS.sb_points = monterCours(function (cadre) {
    var pts = "";
    [0, 1, 2].forEach(function (l) {
      [0, 1, 2, 3, 4].forEach(function (c) { pts += '<circle cx="' + (130 + c * 75) + '" cy="' + (112 + l * 62) + '" r="9" fill="var(--s-air)"/>'; });
    });
    cadre.innerHTML = dessinSvg(320, "Sorbonne vue de face, guillotine à 500 mm, avec 15 points de mesure de la vitesse d'air dans l'ouverture",
      '<rect class="sbc-corps" x="70" y="20" width="420" height="270"/>' +
      '<rect class="sbc-vitre" x="78" y="28" width="404" height="50"/>' +
      '<rect x="78" y="78" width="404" height="196" fill="var(--carte)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' + pts +
      '<rect x="60" y="274" width="440" height="16" fill="var(--s-gaine-bord)"/>' +
      '<path d="M516 78V274" stroke="var(--discret)" stroke-width="2"/><path d="M510 78h12M510 274h12" stroke="var(--discret)" stroke-width="2"/>' + tx(530, 170, "500", "sbc-p", "middle") + tx(530, 188, "mm", "sbc-p", "middle") +
      tx(280, 56, "guillotine", "sbc-p", "middle") + tx(280, 312, "15 points de mesure pour 1,41 à 1,81 m de large", "sbc-p", "middle"));
  });
})();
