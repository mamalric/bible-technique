/* Schéma interactif : clapet coupe-feu dans une gaine qui traverse une paroi coupe-feu.
   Trois modes : autocommandé (fusible), télécommandé à émission, télécommandé à rupture.
   Dessiné pour la bible, d'après le principe général des clapets (aucun dessin de fabricant repris). */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};

  var STYLE =
    ".sc-t{fill:var(--encre-2);font-size:14px;font-family:inherit}" +
    ".sc-tt{fill:var(--discret);font-size:13px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".sc-air{fill:none;stroke:var(--s-air);stroke-width:3;stroke-linecap:round;stroke-dasharray:14 18;animation:sc-flux 1s linear infinite}" +
    ".arret .sc-air{animation-play-state:paused;opacity:.2}" +
    "@keyframes sc-flux{to{stroke-dashoffset:-32}}" +
    ".sc-lame{transform-box:view-box;transform-origin:450px 190px;transition:transform .5s cubic-bezier(.45,1.7,.5,1)}" +
    ".ferme .sc-lame{transform:rotate(90deg)}" +
    ".sc-lame rect{fill:var(--encre);transition:fill .3s}" +
    ".ferme .sc-lame rect{fill:var(--danger)}" +
    ".sc-chaud{transform-box:view-box;transform-origin:30px 190px;transform:scaleX(0);transition:transform 1.6s ease-in}" +
    ".incendie .sc-chaud{transform:scaleX(1)}" +
    ".sc-feu{opacity:0;transition:opacity .4s}" +
    ".incendie .sc-feu{opacity:1}" +
    ".sc-feu path{transform-box:fill-box;transform-origin:50% 100%;animation:sc-flamme .55s ease-in-out infinite alternate}" +
    ".sc-feu path:nth-child(2){animation-delay:.2s}.sc-feu path:nth-child(3){animation-delay:.35s}" +
    "@keyframes sc-flamme{to{transform:scaleY(1.18) skewX(-5deg)}}" +
    ".sc-fus{fill:#e3dcb6;stroke:var(--s-gaine-bord);stroke-width:1.5;transform-box:fill-box;transform-origin:center;transition:fill .5s,transform .4s,opacity .4s}" +
    ".chauffe .sc-fus{fill:var(--s-chaud)}" +
    ".fondu .sc-fus-g{transform:translate(-6px,9px) rotate(-30deg);opacity:0}" +
    ".fondu .sc-fus-d{transform:translate(6px,9px) rotate(30deg);opacity:0}" +
    ".sc-ressort{fill:none;stroke:var(--encre-2);stroke-width:2.5;stroke-linejoin:round;transform-box:fill-box;transform-origin:0 50%;transition:transform .4s}" +
    ".fondu .sc-ressort,.declenche .sc-ressort{transform:scaleX(1.3)}" +
    ".sc-boite{fill:var(--carte);stroke:var(--s-gaine-bord);stroke-width:1.5}" +
    ".sc-fil{fill:none;stroke:var(--s-gaine-bord);stroke-width:3}" +
    ".sc-courant{fill:none;stroke:#e8c468;stroke-width:3.5;stroke-dasharray:6 10;animation:sc-flux2 .6s linear infinite;opacity:0;transition:opacity .3s}" +
    ".rupture .sc-courant{opacity:1}" +
    ".rupture.sans-courant .sc-courant{opacity:0}" +
    "@keyframes sc-flux2{to{stroke-dashoffset:16}}" +
    ".auto .sc-tele{display:none}" +
    ".sc-coupure{opacity:0;transition:opacity .2s}" +
    ".cable-coupe .sc-coupure{opacity:1}" +
    ".sc-impulsion{fill:#ffe066;opacity:0}" +
    ".sc-eclair{opacity:0;transition:opacity .2s}.declenche .sc-eclair{opacity:1}";

  var SVG =
    '<svg viewBox="0 0 900 400" role="img" aria-label="Coupe d\'une gaine de ventilation traversant une paroi coupe-feu, avec son clapet">' +
    "<style>" + STYLE + "</style>" +
    "<defs>" +
    '<pattern id="sc-hach" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" stroke="var(--s-hachure)" stroke-width="2"/></pattern>' +
    '<linearGradient id="sc-grad" x1="0" x2="1"><stop offset="0" stop-color="var(--s-chaud)" stop-opacity=".9"/><stop offset="1" stop-color="var(--s-chaud)" stop-opacity=".25"/></linearGradient>' +
    "</defs>" +

    '<text class="sc-tt" x="215" y="62" text-anchor="middle">CÔTÉ FEU</text>' +
    '<text class="sc-tt" x="685" y="62" text-anchor="middle">CÔTÉ PROTÉGÉ</text>' +
    '<text class="sc-tt" x="450" y="22" text-anchor="middle">PAROI COUPE-FEU</text>' +

    /* paroi */
    '<rect x="400" y="30" width="100" height="110" fill="var(--s-paroi)"/><rect x="400" y="30" width="100" height="110" fill="url(#sc-hach)"/>' +
    '<rect x="400" y="240" width="100" height="140" fill="var(--s-paroi)"/><rect x="400" y="240" width="100" height="140" fill="url(#sc-hach)"/>' +

    /* gaine, air, gaz chauds */
    '<rect x="30" y="140" width="840" height="100" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
    '<rect class="sc-chaud" x="30" y="141" width="372" height="98" fill="url(#sc-grad)"/>' +
    '<g class="sc-flux"><path class="sc-air" d="M44 165H858"/><path class="sc-air" d="M44 190H858"/><path class="sc-air" d="M44 215H858"/></g>' +
    '<text class="sc-t" x="215" y="130" text-anchor="middle">gaine de ventilation</text>' +
    '<path d="M846 178l14 12-14 12" fill="none" stroke="var(--s-air)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +

    /* carter du clapet et lame */
    '<rect x="403" y="136" width="94" height="108" rx="4" fill="none" stroke="var(--encre-2)" stroke-width="3"/>' +
    '<g class="sc-lame"><rect x="404" y="186" width="92" height="8" rx="3"/></g>' +
    '<circle cx="450" cy="190" r="6" fill="var(--fond-2)" stroke="var(--encre)" stroke-width="2.5"/>' +
    '<path d="M330 300L438 202" stroke="var(--discret)" stroke-width="1.2"/><text class="sc-t" x="322" y="316" text-anchor="middle">lame</text>' +

    /* mécanisme : ressort et fusible */
    '<path d="M497 238L512 262" stroke="var(--encre-2)" stroke-width="3" stroke-linecap="round"/>' +
    '<rect class="sc-boite" x="506" y="250" width="132" height="48" rx="9"/>' +
    '<polyline class="sc-ressort" points="516,274 522,264 530,284 538,264 546,284 554,264 560,274"/>' +
    '<rect class="sc-fus sc-fus-g" x="570" y="266" width="27" height="16" rx="8"/>' +
    '<rect class="sc-fus sc-fus-d" x="597" y="266" width="27" height="16" rx="8"/>' +
    '<path class="sc-eclair" d="M600 252l-8 12h7l-5 10" fill="none" stroke="#ffe066" stroke-width="2.5" stroke-linecap="round"/>' +
    '<text class="sc-t" x="552" y="318" text-anchor="end">ressort</text>' +
    '<text class="sc-t" x="570" y="318">fusible 70 °C</text>' +

    /* télécommande : câble et centrale */
    '<g class="sc-tele">' +
    '<path id="sc-fil" class="sc-fil sc-fil-b" d="M638 274C668 274 662 334 690 334"/>' +
    '<path class="sc-courant" d="M638 274C668 274 662 334 690 334"/>' +
    '<g class="sc-coupure"><path d="M656 292l14 14M670 292l-14 14" stroke="var(--danger)" stroke-width="3.5" stroke-linecap="round"/></g>' +
    '<circle class="sc-impulsion" r="7" cx="690" cy="334"/>' +
    '<rect class="sc-boite" x="690" y="306" width="180" height="58" rx="10"/>' +
    '<text class="sc-t" x="780" y="331" text-anchor="middle" style="font-weight:700;fill:var(--encre)">Centrale incendie</text>' +
    '<text class="sc-t" x="780" y="351" text-anchor="middle">(CMSI)</text>' +
    "</g>" +

    /* incendie */
    '<g class="sc-feu">' +
    '<path d="M90 380c-12-30 10-44 8-70 18 20 30 34 22 70z" fill="#ff7a3d"/>' +
    '<path d="M128 380c-14-36 14-52 12-86 22 26 36 48 26 86z" fill="#ff5a1f"/>' +
    '<path d="M176 380c-10-26 8-38 6-60 16 18 26 32 20 60z" fill="#ffb03d"/>' +
    '<text class="sc-t" x="140" y="300" text-anchor="middle" style="fill:var(--s-chaud);font-weight:700">incendie</text>' +
    "</g>" +
    "</svg>";

  var NOTES = {
    auto: ["Au repos, la lame est dans le sens de l'air : le débit passe. Lancez un incendie pour voir le fusible jouer.", "fabricant"],
    emission: ["Au repos, aucun courant dans le câble. Pour fermer le clapet, la centrale envoie une impulsion.", "norme", "NF S 61-937-1, décembre 2003, § 6.2.3 et § 6.2.4"],
    rupture: ["Au repos, un courant permanent (les pointillés jaunes) tient la lame ouverte. Pour fermer le clapet, la centrale le coupe.", "norme", "NF S 61-937-1, décembre 2003, § 6.2.3 ; NF S 61-937-5, mars 2012, § 10.3"]
  };

  window.BIBLE_SCHEMAS.clapet = function (cadre, ctx) {
    cadre.innerHTML =
      '<div class="schema-onglets">' +
      '<button class="bouton actif" type="button" data-mode="auto">Autocommandé (fusible)</button>' +
      '<button class="bouton" type="button" data-mode="emission">Télécommandé à émission</button>' +
      '<button class="bouton" type="button" data-mode="rupture">Télécommandé à rupture</button></div>' +
      '<div class="schema-cadre">' + SVG + "</div>" +
      '<div class="schema-commandes"></div><p class="schema-note"></p>';

    var svg = cadre.querySelector("svg");
    var commandes = cadre.querySelector(".schema-commandes");
    var note = cadre.querySelector(".schema-note");
    var mode = "auto", ferme = false, minuteurs = [];

    function plus(c) { svg.classList.add(c); }
    function dire(texte, source, ref) { note.innerHTML = texte + " " + ctx.badge(source, ref); }
    function plusTard(f, ms) { minuteurs.push(setTimeout(f, ms)); }
    function etat() {
      var e = commandes.querySelector(".schema-etat");
      e.className = "schema-etat " + (ferme ? "ferme" : "ouvert");
      e.textContent = ferme ? "Fermé : l'air ne passe plus" : "Ouvert : l'air passe";
    }
    function fermer() { ferme = true; plus("ferme"); plus("arret"); etat(); }

    function reinitialiser() {
      minuteurs.forEach(clearTimeout); minuteurs = []; ferme = false;
      svg.setAttribute("class", mode === "auto" ? "auto" : mode);
      var p = svg.querySelector(".sc-impulsion"); p.style.opacity = 0;
      dire(NOTES[mode][0], NOTES[mode][1], NOTES[mode][2]);
      boutons();
    }

    function incendie() {
      if (ferme) return;
      plus("incendie");
      dire("Le feu chauffe l'air qui arrive dans la gaine...", "verifier");
      plusTard(function () { plus("chauffe"); dire("L'air dépasse 70 °C : le fusible chauffe...", "fabricant"); }, 1500);
      plusTard(function () {
        plus("fondu"); fermer();
        dire("Le fusible a fondu : le ressort a refermé la lame. Le clapet reste fermé jusqu'au réarmement, à la main." +
          (mode === "auto" ? "" : " Le fusible joue aussi sur un clapet télécommandé, en secours."), "fabricant");
      }, 2300);
    }

    function impulsion(fin) {
      var chemin = svg.querySelector("#sc-fil"), point = svg.querySelector(".sc-impulsion");
      var long = chemin.getTotalLength(), debut = null;
      point.style.opacity = 1;
      function pas(t) {
        if (debut === null) debut = t;
        var k = Math.min(1, (t - debut) / 900);
        var p = chemin.getPointAtLength(long * (1 - k));
        point.setAttribute("cx", p.x); point.setAttribute("cy", p.y);
        if (k < 1) requestAnimationFrame(pas); else { point.style.opacity = 0; fin(); }
      }
      requestAnimationFrame(pas);
    }

    function ordre() {
      if (ferme) return;
      if (mode === "emission") {
        dire("La centrale envoie une impulsion de courant...", "norme", "NF S 61-937-1, décembre 2003, § 6.2.3 et § 6.2.4");
        impulsion(function () {
          plus("declenche"); fermer();
          dire("L'impulsion a libéré le déclencheur : la lame se ferme. Il a fallu du courant pour fermer.", "norme", "NF S 61-937-1, décembre 2003, § 6.2.3");
        });
      } else {
        plus("sans-courant");
        dire("La centrale coupe le courant permanent...", "norme", "NF S 61-937-1, décembre 2003, § 6.2.3");
        plusTard(function () {
          plus("declenche"); fermer();
          dire("Plus de courant, plus rien ne tient la lame : elle se ferme.", "norme", "NF S 61-937-5, mars 2012, § 10.3");
        }, 600);
      }
    }

    function cable() {
      if (ferme) return;
      plus("cable-coupe");
      if (mode === "emission") {
        dire("Câble coupé, et pourtant le clapet reste ouvert : à émission, une coupure ne ferme rien. Seule la surveillance de la ligne, obligatoire, la signale.", "norme", "NF S 61-937-1, décembre 2003, § 6.2.3 ; NF S 61-932, décembre 2024, § 7.1");
      } else {
        plus("sans-courant");
        plusTard(function () {
          plus("declenche"); fermer();
          dire("Câble coupé : plus de courant, le clapet se ferme tout seul. C'est la sécurité positive de la rupture.", "norme", "NF S 61-937-5, mars 2012, § 7 et § 10.3");
        }, 600);
      }
    }

    function boutons() {
      var liste = [["Déclencher un incendie", incendie]];
      if (mode !== "auto") liste.push(["Ordre de la centrale", ordre], ["Couper le câble", cable]);
      liste.push(["Réarmer", reinitialiser]);
      commandes.innerHTML = "";
      liste.forEach(function (b, i) {
        var el = document.createElement("button");
        el.type = "button"; el.className = "bouton" + (i === 0 ? " actif" : ""); el.textContent = b[0];
        el.addEventListener("click", b[1]);
        commandes.appendChild(el);
      });
      var e = document.createElement("span"); commandes.appendChild(e); e.className = "schema-etat"; etat();
    }

    cadre.querySelector(".schema-onglets").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      mode = b.getAttribute("data-mode");
      Array.prototype.forEach.call(cadre.querySelectorAll(".schema-onglets .bouton"), function (x) { x.classList.toggle("actif", x === b); });
      reinitialiser();
    });

    reinitialiser();
  };
  /* ---------- dessins du cours (donnees/fiches/clapet-coupe-feu.js) ---------- */
  window.BIBLE_DESSINS = window.BIBLE_DESSINS || {};
  window.BIBLE_ICONES = window.BIBLE_ICONES || {};

  var STYLE_COURS =
    ".cfc-t{fill:var(--encre-2);font-size:16px;font-family:inherit}" +
    ".cfc-b{fill:var(--encre);font-size:17px;font-weight:700;font-family:inherit}" +
    ".cfc-p{fill:var(--discret);font-size:15px;font-family:inherit}" +
    ".cfc-tt{fill:var(--discret);font-size:12.5px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".cfc-g{fill:var(--encre);font-size:30px;font-weight:800;font-family:inherit}" +
    ".cfc-code{fill:var(--encre);font-size:32px;font-weight:800;font-family:inherit}" +
    ".cfc-air,.cfc-feu,.cfc-cour{fill:none;stroke-width:4;stroke-linecap:round;stroke-dasharray:10 12;animation:cfc-flux 1s linear infinite}" +
    ".cfc-air{stroke:var(--s-air)}.cfc-feu{stroke:var(--danger)}.cfc-cour{stroke:var(--accent);stroke-width:3;stroke-dasharray:6 8}" +
    "@keyframes cfc-flux{to{stroke-dashoffset:-22}}" +
    ".cfc-paroi{fill:var(--s-paroi);stroke:var(--encre-2);stroke-width:1.5}" +
    ".cfc-gaine{fill:var(--s-gaine);stroke:var(--s-gaine-bord);stroke-width:2}" +
    ".cfc-cadre{fill:var(--carte);stroke:var(--s-gaine-bord);stroke-width:2.5}" +
    ".cfc-boite{fill:var(--carte);stroke:var(--encre-2);stroke-width:2}" +
    ".cfc-lame{stroke:var(--encre);stroke-width:6;stroke-linecap:round;transform-box:view-box;transition:transform .45s cubic-bezier(.45,1.7,.5,1)}" +
    ".ferme .cfc-lame{transform:rotate(90deg);stroke:var(--danger)}" +
    ".cfc-fil{fill:none;stroke:var(--s-gaine-bord);stroke-width:3}" +
    ".cfc-rep{stroke:var(--discret);stroke-width:1.3}" +
    ".cfc-boutons{display:flex;gap:8px;flex-wrap:wrap;align-items:center;width:100%}" +
    ".cfc-reglage{display:grid;grid-template-columns:auto 1fr auto;gap:8px 12px;align-items:center;width:100%}" +
    ".cfc-reglage label{font-weight:600;font-size:15px}.cfc-reglage input{width:100%;accent-color:var(--accent)}" +
    "@media (max-width:600px){.cfc-reglage{grid-template-columns:1fr}}";

  function cfcStyle() {
    if (document.getElementById("cfc-style")) return;
    var s = document.createElement("style");
    s.id = "cfc-style"; s.textContent = STYLE_COURS;
    document.head.appendChild(s);
  }
  function dessinSvg(h, aria, c) { return '<svg viewBox="0 0 560 ' + h + '" role="img" aria-label="' + aria + '">' + c + "</svg>"; }
  function tx(x, y, s, cls, ancre, id) {
    return '<text class="' + (cls || "cfc-t") + '" x="' + x + '" y="' + y + '"' + (ancre ? ' text-anchor="' + ancre + '"' : "") + (id ? ' id="' + id + '"' : "") + ">" + s + "</text>";
  }
  function fl(cls, d, id) { return '<path class="' + cls + '" d="' + (d || "") + '"' + (id ? ' id="' + id + '"' : "") + "/>"; }
  function rep(x1, y1, x2, y2, txt, ancre) { return '<path class="cfc-rep" d="M' + x1 + " " + y1 + "L" + x2 + " " + y2 + '"/>' + tx(x2 + (ancre === "end" ? -4 : 4), y2 + 5, txt, "cfc-p", ancre); }
  function flamme(x, y, e) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + (e || 1) + ')"><path fill="var(--danger)" d="M0 0C-16 0-20-16-12-28C-10-20-6-18-4-20C-8-32-2-44 6-50C4-38 14-32 16-20C18-8 12 0 0 0z"/><path fill="var(--s-chaud)" d="M0 0C-8 0-10-8-6-14C-4-10 0-10 0-14C4-10 8-6 6-2C5 0 3 0 0 0z"/></g>';
  }
  function lame(x, y, l) { return '<path class="cfc-lame" style="transform-origin:' + x + "px " + y + 'px" d="M' + (x - l) + " " + y + "H" + (x + l) + '"/>'; }
  function monterCours(fn) {
    return function (el, ctx) {
      cfcStyle();
      el.innerHTML = '<div class="schema-cadre"></div><div class="schema-commandes"></div><p class="schema-note"></p>';
      var note = el.querySelector(".schema-note"), cmd = el.querySelector(".schema-commandes");
      fn(el.querySelector(".schema-cadre"), cmd, function (texte, s, ref) { note.innerHTML = texte + " " + ctx.badge(s, ref); });
      if (!cmd.children.length) cmd.parentNode.removeChild(cmd);
      if (!note.textContent) note.parentNode.removeChild(note);
    };
  }

  var C32 = "arrêté du 25 juin 1980, article CH 32";
  var CFAB = "fiche technique d'un fabricant de clapets";
  var CCM = "notice d'un CMSI de fabricant";

  window.BIBLE_DESSINS.cf_boites = monterCours(function (cadre) {
    function abri(x, y) { return tx(x, y, "à l'abri", "cfc-p", "middle"); }
    cadre.innerHTML = dessinSvg(320, "Bâtiment en coupe sur trois niveaux : le feu reste enfermé dans un seul volume, retenu par les parois et les planchers coupe-feu",
      '<rect class="cfc-cadre" x="40" y="24" width="480" height="276"/>' +
      '<rect x="48" y="216" width="227" height="80" fill="var(--danger)" fill-opacity=".14"/>' +
      '<rect class="cfc-paroi" x="40" y="112" width="480" height="10"/><rect class="cfc-paroi" x="40" y="206" width="480" height="10"/>' +
      '<rect class="cfc-paroi" x="275" y="24" width="10" height="276"/>' +
      flamme(160, 294, 0.8) +
      tx(160, 238, "le feu reste ici", "cfc-b", "middle") +
      abri(158, 72) + abri(402, 72) + abri(158, 168) + abri(402, 168) +
      rep(285, 260, 322, 260, "paroi coupe-feu") + tx(402, 288, "à l'abri", "cfc-p", "middle") +
      rep(100, 206, 100, 188, "plancher coupe-feu") +
      tx(280, 16, "UN FEU, UNE BOÎTE", "cfc-tt", "middle"));
  });

  window.BIBLE_DESSINS.cf_trou = monterCours(function (cadre, commandes, dire) {
    cadre.innerHTML = dessinSvg(300, "Une gaine traverse une paroi coupe-feu. Sans clapet, le feu passe par la gaine ; avec un clapet, il s'arrête à la lame",
      '<rect class="cfc-gaine" x="20" y="74" width="520" height="56"/>' +
      '<rect class="cfc-gaine" x="80" y="130" width="50" height="36"/><rect class="cfc-gaine" x="430" y="130" width="50" height="36"/>' +
      '<rect class="cfc-paroi" x="270" y="16" width="20" height="58"/><rect class="cfc-paroi" x="270" y="130" width="20" height="150"/>' +
      '<path d="M0 280H560" stroke="var(--encre-2)" stroke-width="3"/>' +
      flamme(105, 278, 1.5) +
      fl("cfc-feu", "", "cf-t-feu") +
      '<g id="cf-t-cl">' + lame(280, 102, 25) + "</g>" +
      tx(130, 42, "local en feu", "cfc-b", "middle") + tx(420, 42, "local voisin", "cfc-b", "middle") +
      tx(280, 12, "paroi", "cfc-p", "middle") + tx(405, 70, "gaine", "cfc-p") +
      tx(420, 230, "", "cfc-b", "middle", "cf-t-m"));
    commandes.innerHTML = '<div class="cfc-boutons"><button class="bouton" type="button" data-m="sans">Sans clapet</button><button class="bouton" type="button" data-m="avec">Avec clapet</button></div>';
    var svg = cadre.querySelector("svg");
    function choisir(m) {
      var avec = m === "avec";
      svg.classList.toggle("ferme", avec);
      cadre.querySelector("#cf-t-cl").style.display = avec ? "" : "none";
      cadre.querySelector("#cf-t-feu").setAttribute("d", avec ? "M105 216V102H262" : "M105 216V102H455V190");
      var msg = cadre.querySelector("#cf-t-m");
      msg.textContent = avec ? "à l'abri" : "le feu passe";
      msg.style.fill = avec ? "var(--ok)" : "var(--danger)";
      Array.prototype.forEach.call(commandes.querySelectorAll("button"), function (b) { b.classList.toggle("actif", b.getAttribute("data-m") === m); });
      if (avec) dire("La lame s'est fermée au droit de la paroi : le passage est bouché, avec le même degré que la paroi.", "texte", C32 + " § 5");
      else dire("Sans clapet, la gaine est un passage tout prêt à travers la paroi.", "fabricant", CFAB);
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-m]"); if (b) choisir(b.getAttribute("data-m"));
    });
    choisir("sans");
  });

  window.BIBLE_DESSINS.cf_anatomie = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(320, "Clapet vu en coupe : un tunnel dans la paroi, une lame ouverte dans l'axe, un mécanisme avec son fusible sur le côté",
      '<rect class="cfc-gaine" x="20" y="136" width="520" height="70"/>' +
      '<rect class="cfc-paroi" x="280" y="20" width="44" height="104"/><rect class="cfc-paroi" x="280" y="218" width="44" height="82"/>' +
      '<rect x="218" y="124" width="166" height="94" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="3"/>' +
      '<rect x="280" y="118" width="44" height="6" fill="var(--s-chaud)"/><rect x="280" y="218" width="44" height="6" fill="var(--s-chaud)"/>' +
      fl("cfc-air", "M28 150H530") + fl("cfc-air", "M28 192H530") +
      lame(302, 171, 40) + '<circle cx="302" cy="171" r="6" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/>' +
      '<rect class="cfc-boite" x="186" y="60" width="86" height="64"/>' +
      '<path fill="none" stroke="var(--encre-2)" stroke-width="2.5" d="M198 88l7-10 9 20 9-20 9 20 9-20 9 10"/>' +
      '<rect x="202" y="104" width="50" height="12" rx="2" fill="var(--s-chaud)"/>' +
      rep(302, 30, 360, 30, "paroi coupe-feu") + rep(186, 84, 130, 66, "mécanisme", "end") + rep(204, 110, 130, 106, "fusible", "end") +
      rep(340, 171, 430, 104, "lame") + rep(240, 218, 190, 262, "tunnel", "end") + rep(302, 224, 380, 262, "joint intumescent") +
      tx(70, 128, "gaine", "cfc-p") + tx(490, 128, "gaine", "cfc-p", "middle"));
  });

  window.BIBLE_DESSINS.cf_ei = monterCours(function (cadre) {
    function morceau(x, s, y2, texte, droite) {
      return tx(x, 54, s, "cfc-code", "middle") + '<path class="cfc-rep" d="M' + x + " 64V" + y2 + '"/>' +
        tx(droite ? x - 7 : x + 7, y2, texte, "cfc-t", droite ? "end" : "start");
    }
    cadre.innerHTML = dessinSvg(240, "Le code EI 120 (ve ho i↔o) S, avec la signification de chaque morceau",
      morceau(46, "E", 188, "E : étanche aux flammes") + morceau(78, "I", 150, "I : isole de la chaleur") + morceau(155, "120", 112, "120 minutes") +
      morceau(276, "(ve", 112, "ve : mur") + morceau(345, "ho", 150, "ho : dalle", true) + morceau(432, "i↔o)", 188, "i↔o : feu des deux côtés", true) + morceau(518, "S", 226, "S : la fumée fuit peu", true));
  });

  window.BIBLE_DESSINS.cf_fusible = monterCours(function (cadre, commandes, dire) {
    cadre.innerHTML = dessinSvg(280, "Gaine et clapet vus en coupe : au-delà de la température de tarage, le fusible lâche et la lame se ferme",
      '<rect class="cfc-gaine" x="20" y="126" width="520" height="70"/>' +
      '<rect class="cfc-paroi" x="285" y="16" width="30" height="98"/><rect class="cfc-paroi" x="285" y="208" width="30" height="62"/>' +
      '<rect x="270" y="114" width="60" height="94" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
      fl("cfc-air", "M30 161H262", "cf-f-av") + fl("cfc-air", "M340 161H532", "cf-f-ap") +
      lame(300, 161, 31) + '<circle cx="300" cy="161" r="5" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/>' +
      '<rect class="cfc-boite" x="186" y="62" width="84" height="52"/>' +
      '<path id="cf-f-res" fill="none" stroke="var(--encre-2)" stroke-width="2.5" d="M196 80l6-8 8 16 8-16 8 16 8-16 8 8"/>' +
      '<rect id="cf-f-fus" x="200" y="96" width="50" height="10" rx="2" fill="var(--s-chaud)"/>' +
      tx(228, 54, "fusible", "cfc-p", "middle") +
      tx(100, 62, "20 °C", "cfc-g", "middle", "cf-f-t") + tx(100, 84, "air dans la gaine", "cfc-p", "middle") +
      tx(448, 62, "OUVERT", "cfc-b", "middle", "cf-f-e") + tx(448, 84, "l'air passe", "cfc-p", "middle", "cf-f-e2"));
    commandes.innerHTML = '<div class="cfc-reglage"><label for="cf-f-r">Température</label><input id="cf-f-r" type="range" min="20" max="120" step="5" value="20"><button class="bouton" type="button" id="cf-f-b">Changer le fusible et réarmer</button></div>';
    var svg = cadre.querySelector("svg"), r = commandes.querySelector("#cf-f-r"), rompu = false, dernier = "";
    function parler(cas) {
      if (cas === dernier) return;
      dernier = cas;
      if (cas === "froid") dire("En dessous de la température de tarage, rien ne bouge : la lame reste ouverte et l'air passe.", "texte", C32 + " § 6");
      else if (cas === "chaud") dire("Le fusible a lâché et le ressort a fermé la lame. Aucun courant, aucun câble n'a servi.", "fabricant", CFAB);
      else dire("Le clapet reste fermé même après refroidissement : il faut remplacer le fusible et réarmer à la main.", "fabricant", CFAB);
    }
    function maj() {
      var t = +r.value;
      if (t >= 70) rompu = true;
      svg.classList.toggle("ferme", rompu);
      cadre.querySelector("#cf-f-t").textContent = t + " °C";
      cadre.querySelector("#cf-f-t").style.fill = t >= 70 ? "var(--danger)" : "";
      cadre.querySelector("#cf-f-fus").style.display = rompu ? "none" : "";
      cadre.querySelector("#cf-f-res").setAttribute("transform", rompu ? "translate(0 8)" : "");
      cadre.querySelector("#cf-f-av").setAttribute("class", t >= 70 ? "cfc-feu" : "cfc-air");
      cadre.querySelector("#cf-f-ap").style.display = rompu ? "none" : "";
      cadre.querySelector("#cf-f-e").textContent = rompu ? "FERMÉ" : "OUVERT";
      cadre.querySelector("#cf-f-e").style.fill = rompu ? "var(--danger)" : "var(--ok)";
      cadre.querySelector("#cf-f-e2").textContent = rompu ? "plus rien ne passe" : "l'air passe";
      parler(!rompu ? "froid" : t >= 70 ? "chaud" : "refroidi");
    }
    r.addEventListener("input", maj);
    commandes.querySelector("#cf-f-b").addEventListener("click", function () { r.value = 20; rompu = false; maj(); });
    maj();
  });

  window.BIBLE_DESSINS.cf_chaine = monterCours(function (cadre) {
    function das(y, s) { return '<rect class="cfc-boite" x="394" y="' + y + '" width="136" height="44" rx="6"/>' + tx(462, y + 28, s, "cfc-t", "middle") + fl("cfc-cour", "M310 150C350 150 350 " + (y + 22) + " 390 " + (y + 22)); }
    cadre.innerHTML = dessinSvg(320, "Chaîne du système de sécurité incendie : le détecteur informe le CMSI, le CMSI commande les dispositifs actionnés de sécurité",
      '<rect x="12" y="44" width="536" height="228" rx="10" fill="none" stroke="var(--discret)" stroke-width="1.5" stroke-dasharray="6 6"/>' +
      tx(280, 30, "LE SSI : TOUT CET ENSEMBLE", "cfc-tt", "middle") +
      '<rect class="cfc-boite" x="32" y="118" width="110" height="64" rx="6"/>' + tx(87, 146, "détecteur", "cfc-b", "middle") + tx(87, 168, "de fumée", "cfc-p", "middle") +
      '<rect x="196" y="110" width="114" height="80" rx="6" fill="var(--carte)" stroke="var(--accent)" stroke-width="3"/>' + tx(253, 146, "CMSI", "cfc-g", "middle") + tx(253, 174, "la centrale", "cfc-p", "middle") +
      fl("cfc-cour", "M144 150H192") +
      das(66, "clapet") + das(128, "porte à ventouse") + das(190, "volet") +
      tx(87, 214, "1. il détecte", "cfc-b", "middle") + tx(253, 214, "2. il décide", "cfc-b", "middle") + tx(462, 262, "3. ils obéissent", "cfc-b", "middle") +
      tx(280, 304, "les appareils qui obéissent sont les DAS", "cfc-p", "middle"));
  });

  window.BIBLE_DESSINS.cf_emission = monterCours(function (cadre, commandes, dire) {
    cadre.innerHTML = dessinSvg(290, "Le CMSI relié au clapet par un câble : selon le type de commande, couper le câble ferme le clapet ou ne change rien",
      '<rect class="cfc-gaine" x="20" y="156" width="520" height="66"/>' +
      '<rect class="cfc-paroi" x="400" y="30" width="26" height="114"/><rect class="cfc-paroi" x="400" y="234" width="26" height="46"/>' +
      '<rect x="390" y="144" width="46" height="90" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
      fl("cfc-air", "M30 189H378", "cf-e-av") + fl("cfc-air", "M446 189H532", "cf-e-ap") +
      lame(413, 189, 28) + '<circle cx="413" cy="189" r="5" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/>' +
      '<rect x="24" y="30" width="112" height="60" rx="6" fill="var(--carte)" stroke="var(--accent)" stroke-width="3"/>' + tx(80, 68, "CMSI", "cfc-b", "middle") +
      '<rect class="cfc-boite" x="330" y="96" width="60" height="48"/>' + tx(360, 125, "bobine", "cfc-p", "middle") +
      fl("cfc-fil", "M136 60H360V96") + fl("cfc-cour", "", "cf-e-c") +
      '<g id="cf-e-x" stroke="var(--danger)" stroke-width="5" stroke-linecap="round"><path d="M236 46l20 28M256 46l-20 28"/></g>' +
      tx(120, 136, "", "cfc-b", "middle", "cf-e-m") + tx(120, 262, "", "cfc-b", "middle", "cf-e-e") + tx(250, 262, "", "cfc-p", null, "cf-e-e2"));
    commandes.innerHTML = '<div class="cfc-boutons"><button class="bouton" type="button" data-t="emission">À émission</button><button class="bouton" type="button" data-t="rupture">À rupture</button></div>' +
      '<div class="cfc-boutons"><button class="bouton" type="button" data-a="ordre">Envoyer l\'ordre</button><button class="bouton" type="button" data-a="coupe">Couper le câble</button><button class="bouton" type="button" data-a="zero">Remettre en état</button></div>';
    var svg = cadre.querySelector("svg"), mode = "emission", ordre = false, coupe = false;
    function maj() {
      var ferme = mode === "rupture" ? (ordre || coupe) : (ordre && !coupe);
      var courant = mode === "rupture" ? !(ordre || coupe) : (ordre && !coupe);
      svg.classList.toggle("ferme", ferme);
      var c = cadre.querySelector("#cf-e-c");
      c.setAttribute("d", courant ? (coupe ? "M136 60H236" : "M136 60H360V96") : "");
      cadre.querySelector("#cf-e-x").style.display = coupe ? "" : "none";
      cadre.querySelector("#cf-e-m").textContent = mode === "rupture" ? (ordre || coupe ? "courant coupé" : "courant permanent") : (ordre && !coupe ? "impulsion envoyée" : "aucun courant");
      cadre.querySelector("#cf-e-av").setAttribute("class", "cfc-air");
      cadre.querySelector("#cf-e-ap").style.display = ferme ? "none" : "";
      var e = cadre.querySelector("#cf-e-e");
      e.textContent = ferme ? "FERMÉ" : "OUVERT";
      e.style.fill = ferme ? "var(--danger)" : "var(--ok)";
      cadre.querySelector("#cf-e-e2").textContent = ferme ? "le clapet est en sécurité" : "l'air passe";
      Array.prototype.forEach.call(commandes.querySelectorAll("button[data-t]"), function (b) { b.classList.toggle("actif", b.getAttribute("data-t") === mode); });
      if (mode === "emission") {
        if (coupe) dire("Le câble est coupé : le clapet reste ouvert, et l'ordre n'arrivera pas. Seule la surveillance de la ligne, obligatoire, signale le défaut ; en attendant, il ne reste que son fusible.", "norme", "NF S 61-937-1, décembre 2003, § 6.2.3 ; NF S 61-932, décembre 2024, § 7.1 ; NF S 61-937-5, mars 2012, § 9.2");
        else if (ordre) dire("L'impulsion du CMSI a fermé le clapet.", "fabricant", CCM);
        else dire("Au repos, aucun courant : le clapet attend une impulsion du CMSI.", "fabricant", CCM);
      } else if (coupe) dire("Câble coupé, courant coupé : le clapet se ferme. C'est la sécurité positive.", "norme", "NF S 61-937-5, mars 2012, § 10.3 : sous 10 % de la tension nominale, plus rien ne retient le clapet");
      else if (ordre) dire("Le CMSI a coupé le courant : le clapet s'est fermé.", "fabricant", CCM);
      else dire("Un courant permanent tient le clapet ouvert.", "fabricant", CCM);
    }
    commandes.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.getAttribute("data-t")) { mode = b.getAttribute("data-t"); ordre = false; coupe = false; }
      var a = b.getAttribute("data-a");
      if (a === "ordre") ordre = true;
      if (a === "coupe") coupe = true;
      if (a === "zero") { ordre = false; coupe = false; }
      maj();
    });
    maj();
  });

  window.BIBLE_DESSINS.cf_pose = monterCours(function (cadre) {
    function suspente(x) { return '<path d="M' + x + " 34V100M" + (x - 16) + " 100H" + (x + 16) + '" stroke="var(--encre-2)" stroke-width="3" fill="none"/>'; }
    cadre.innerHTML = dessinSvg(340, "Pose d'un clapet vue en coupe : tunnel au droit de la paroi, calfeutrement autour, gaine suspendue de chaque côté, trappe dans le faux plafond en face du mécanisme",
      '<rect class="cfc-paroi" x="16" y="18" width="528" height="16"/>' +
      '<rect class="cfc-paroi" x="274" y="34" width="44" height="66"/><rect class="cfc-paroi" x="274" y="182" width="44" height="130"/>' +
      '<rect x="274" y="100" width="44" height="82" fill="var(--s-chaud)" fill-opacity=".7"/>' +
      '<rect class="cfc-gaine" x="30" y="108" width="500" height="66"/>' +
      '<rect x="256" y="108" width="84" height="66" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="3"/>' +
      lame(296, 141, 30) +
      suspente(120) + suspente(450) +
      '<rect class="cfc-boite" x="194" y="174" width="62" height="42"/>' + tx(225, 200, "méca.", "cfc-p", "middle") +
      '<path d="M16 262H172M252 262H274M318 262H544" stroke="var(--encre-2)" stroke-width="5"/>' +
      '<path d="M172 262L190 302" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M225 322V232M214 244l11-12 11 12" stroke="var(--accent)" stroke-width="3" fill="none"/>' +
      rep(296, 104, 350, 66, "calfeutrement") + rep(450, 72, 480, 58, "suspente") + rep(120, 72, 92, 58, "suspente", "end") +
      rep(330, 174, 380, 214, "tunnel au droit de la paroi") +
      rep(100, 262, 100, 288, "faux plafond", "end") + rep(182, 284, 160, 316, "trappe", "end") + tx(240, 330, "accès", "cfc-p"));
  });

  window.BIBLE_ICONES.tunnel = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M8 20h48v24H8z"/><path d="M24 8v12M24 44v12M40 8v12M40 44v12" stroke-width="4"/></svg>';
  window.BIBLE_ICONES.lame = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M6 18h52M6 46h52"/><path stroke="var(--danger)" stroke-width="5" d="M32 18v28"/><circle cx="32" cy="32" r="4" fill="var(--carte)"/></svg>';
  window.BIBLE_ICONES.meca = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><rect x="10" y="14" width="44" height="36"/><path d="M16 32l5-8 7 16 7-16 7 16 6-8"/></svg>';
  window.BIBLE_ICONES.fusible = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><rect x="10" y="24" width="20" height="16" fill="var(--s-chaud)"/><rect x="34" y="24" width="20" height="16" fill="var(--s-chaud)"/><path stroke="var(--danger)" d="M32 12v8M32 44v8"/></svg>';
  window.BIBLE_ICONES.joints = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="16" stroke="var(--s-chaud)" stroke-width="5"/></svg>';
  window.BIBLE_ICONES.contact = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M8 40h16l20-14M44 40h12"/><circle cx="24" cy="40" r="3" fill="var(--encre-2)"/><circle cx="44" cy="40" r="3" fill="var(--encre-2)"/></svg>';
  window.BIBLE_ICONES.ssi = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z"/><path stroke="var(--ok)" stroke-width="4" d="M22 32l8 8 13-16"/></svg>';
  window.BIBLE_ICONES.cats = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M8 54V38h10v16zM20 54V30h10v24zM32 54V22h10v32zM44 54V10h10v44z"/></svg>';
  window.BIBLE_ICONES.cmsi = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><rect x="10" y="10" width="44" height="44" rx="4"/><path d="M18 22h28"/><circle cx="20" cy="36" r="3" fill="var(--ok)"/><circle cx="32" cy="36" r="3" fill="var(--danger)"/><circle cx="44" cy="36" r="3" fill="var(--ok)"/></svg>';
  window.BIBLE_ICONES.das = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><rect x="14" y="8" width="36" height="48"/><circle cx="42" cy="32" r="3" fill="var(--encre-2)"/><path stroke="var(--danger)" d="M4 32h8"/></svg>';
  window.BIBLE_ICONES.essai = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><circle cx="32" cy="32" r="22"/><path stroke="var(--danger)" stroke-width="4" d="M32 16v20"/><path d="M24 44h16"/></svg>';
  window.BIBLE_ICONES.rearme = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="3" stroke-linecap="round"><path d="M48 32a16 16 0 1 1-5-11.6"/><path d="M44 8v13H31"/></svg>';
  window.BIBLE_ICONES.position = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M6 20h52M6 44h52"/><path stroke="var(--ok)" stroke-width="5" d="M18 32h28"/><path stroke="var(--discret)" stroke-dasharray="4 4" d="M32 20v24"/></svg>';
  window.BIBLE_ICONES.registre = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M14 6h36v52H14z"/><path d="M22 20h20M22 30h20M22 40h12"/></svg>';
  window.BIBLE_ICONES.liste = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M24 16h30M24 32h30M24 48h30"/><circle cx="12" cy="16" r="4"/><circle cx="12" cy="32" r="4"/><circle cx="12" cy="48" r="4"/></svg>';

  window.BIBLE_DESSINS.cf_exemple = monterCours(function (cadre) {
    function ligne(n, y, q, r) {
      return '<circle cx="34" cy="' + y + '" r="16" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' + tx(34, y + 5, n, "cfc-b", "middle") +
        tx(62, y + 5, q, "cfc-t") + tx(530, y + 5, r, "cfc-b", "end") +
        (n < 4 ? '<path class="cfc-rep" d="M34 ' + (y + 16) + "V" + (y + 42) + '"/>' : "");
    }
    cadre.innerHTML = dessinSvg(300, "Les quatre questions de l'exemple, et le clapet qui en sort",
      ligne(1, 34, "Paroi dans la liste du règlement ?", "oui") + ligne(2, 92, "Quel degré de paroi ?", "EI 120") +
      ligne(3, 150, "Un mur, feu des deux côtés ?", "ve i↔o") + ligne(4, 208, "SSI A ou B exigé ?", "non : fusible") +
      '<rect x="20" y="244" width="520" height="46" rx="8" fill="var(--carte)" stroke="var(--accent)" stroke-width="3"/>' +
      tx(280, 274, "EI 120 (ve i↔o) S, autocommandé", "cfc-b", "middle"));
  });
})();
