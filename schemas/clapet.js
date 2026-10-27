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
    emission: ["Au repos, aucun courant dans le câble. Pour fermer le clapet, la centrale envoie une impulsion.", "verifier"],
    rupture: ["Au repos, un courant permanent (les pointillés jaunes) tient la lame ouverte. Pour fermer le clapet, la centrale le coupe.", "verifier"]
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
    function dire(texte, source) { note.innerHTML = texte + " " + ctx.badge(source); }
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
      dire(NOTES[mode][0], NOTES[mode][1]);
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
        dire("La centrale envoie une impulsion de courant...", "verifier");
        impulsion(function () {
          plus("declenche"); fermer();
          dire("L'impulsion a libéré le déclencheur : la lame se ferme. Il a fallu du courant pour fermer.", "verifier");
        });
      } else {
        plus("sans-courant");
        dire("La centrale coupe le courant permanent...", "verifier");
        plusTard(function () {
          plus("declenche"); fermer();
          dire("Plus de courant, plus rien ne tient la lame : elle se ferme.", "verifier");
        }, 600);
      }
    }

    function cable() {
      if (ferme) return;
      plus("cable-coupe");
      if (mode === "emission") {
        dire("Câble coupé, et pourtant le clapet reste ouvert : à émission, une coupure ne ferme rien. Seule une surveillance de la ligne la signale.", "verifier");
      } else {
        plus("sans-courant");
        plusTard(function () {
          plus("declenche"); fermer();
          dire("Câble coupé : plus de courant, le clapet se ferme tout seul. C'est la sécurité positive de la rupture.", "verifier");
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
})();
