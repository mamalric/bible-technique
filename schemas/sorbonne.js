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
})();
