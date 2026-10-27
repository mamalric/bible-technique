/* Schéma interactif : classement d'un ERP.
   On choisit le type, on règle le public et le personnel : le bâtiment se remplit et le curseur
   se place sur l'échelle des cinq catégories. Dessiné pour la bible. */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};

  /* seuil de la 5e catégorie, effectif total du public ; détail des seuils par niveau à confirmer dans chaque type */
  var TYPES = {
    W: { nom: "Bureaux", seuil: 200, detail: "100 en sous-sol, 100 en étage" },
    M: { nom: "Commerce", seuil: 200, detail: "100 en sous-sol, 100 en étage" },
    N: { nom: "Restaurant", seuil: 200, detail: "100 en sous-sol, 200 en étage" },
    R: { nom: "Enseignement", seuil: 200, detail: "plus bas pour la petite enfance et dès qu'il y a de l'hébergement" },
    O: { nom: "Hôtel", seuil: 100, detail: "le public compte les clients des chambres" },
    U: { nom: "Soins", seuil: 100, detail: "20 lits quand il y a de l'hébergement" }
  };

  /* échelle : cinq segments de même largeur, 5e à gauche, 1re à droite */
  var X0 = 380, L = 98;
  var CATS = [
    { nom: "5e", couleur: "var(--ok)" },
    { nom: "4e", couleur: "var(--accent)" },
    { nom: "3e", couleur: "var(--b-expert)" },
    { nom: "2e", couleur: "var(--s-chaud)" },
    { nom: "1re", couleur: "var(--danger)" }
  ];

  var STYLE =
    ".se-t{fill:var(--encre-2);font-size:14px;font-family:inherit}" +
    ".se-tt{fill:var(--discret);font-size:13px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".se-gros{fill:var(--encre);font-size:30px;font-weight:800;font-family:inherit}" +
    ".se-seg{stroke:var(--fond-2);stroke-width:3;opacity:.28;transition:opacity .3s}" +
    ".se-seg.actif{opacity:1}" +
    ".se-cat{fill:var(--encre-2);font-size:16px;font-weight:700;font-family:inherit;transition:fill .3s}" +
    ".se-cat.actif{fill:var(--encre)}" +
    ".se-curseur{transition:transform .35s cubic-bezier(.2,.7,.2,1)}" +
    ".se-pt{transition:fill .25s,opacity .25s}" +
    ".se-pt.public{fill:var(--s-air)}" +
    ".se-pt.perso{fill:var(--encre)}" +
    ".se-pt.vide{fill:var(--s-gaine-bord);opacity:.18}";

  var points = "";
  for (var i = 0; i < 120; i++) {
    var c = i % 12, r = Math.floor(i / 12);
    points += '<circle class="se-pt vide" r="5.5" cx="' + (78 + c * 18) + '" cy="' + (318 - r * 20) + '"/>';
  }

  var echelle = "";
  CATS.forEach(function (k, j) {
    var x = X0 + j * L;
    echelle += '<rect class="se-seg" data-j="' + j + '" x="' + x + '" y="196" width="' + L + '" height="26" rx="5" fill="' + k.couleur + '"/>' +
      '<text class="se-cat" data-j="' + j + '" x="' + (x + L / 2) + '" y="184" text-anchor="middle">' + k.nom + "</text>";
  });
  var bornes = "";
  ["seuil", "300", "700", "1 500"].forEach(function (b, j) {
    var x = X0 + (j + 1) * L;
    bornes += '<path d="M' + x + ' 222v10" stroke="var(--discret)" stroke-width="1.5"/>' +
      '<text class="se-t' + (j === 0 ? " se-borne-seuil" : "") + '" x="' + x + '" y="250" text-anchor="middle">' + b + "</text>";
  });

  var SVG =
    '<svg viewBox="0 0 900 400" role="img" aria-label="Bâtiment rempli de personnes et échelle des cinq catégories d\'ERP">' +
    "<style>" + STYLE + "</style>" +

    /* bâtiment */
    '<text class="se-tt" x="180" y="30" text-anchor="middle">L\'ÉTABLISSEMENT</text>' +
    '<path d="M50 96L180 46l130 50" fill="none" stroke="var(--s-gaine-bord)" stroke-width="3" stroke-linejoin="round"/>' +
    '<rect x="56" y="96" width="248" height="246" rx="4" fill="var(--carte)" stroke="var(--s-gaine-bord)" stroke-width="2.5"/>' +
    '<path d="M160 342v-14h40v14" fill="var(--fond-2)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
    points +
    '<circle r="6" cx="70" cy="368" fill="var(--s-air)"/><text class="se-t" x="82" y="373">public</text>' +
    '<circle r="6" cx="160" cy="368" fill="var(--encre)"/><text class="se-t" x="172" y="373">personnel</text>' +
    '<text class="se-t" x="70" y="394" style="fill:var(--discret)">1 point = 25 personnes</text>' +

    /* échelle des catégories */
    '<text class="se-tt" x="625" y="30" text-anchor="middle">LA CATÉGORIE</text>' +
    '<text class="se-gros" id="se-titre" x="625" y="92" text-anchor="middle"></text>' +
    '<text class="se-t" id="se-soustitre" x="625" y="120" text-anchor="middle"></text>' +
    echelle + bornes +
    '<g class="se-curseur"><path d="M0 194l-9-16h18z" fill="var(--encre)"/><path d="M0 194v34" stroke="var(--encre)" stroke-width="2.5"/></g>' +
    '<path d="M' + (X0 + 2) + ' 290h' + (L - 4) + '" stroke="var(--discret)" stroke-width="2"/>' +
    '<text class="se-t" x="' + (X0 + L / 2) + '" y="312" text-anchor="middle">2e groupe</text>' +
    '<text class="se-t" x="' + (X0 + L / 2) + '" y="330" text-anchor="middle" style="fill:var(--discret)">articles PE</text>' +
    '<path d="M' + (X0 + L + 2) + ' 290h' + (4 * L - 4) + '" stroke="var(--discret)" stroke-width="2"/>' +
    '<text class="se-t" x="' + (X0 + 3 * L) + '" y="312" text-anchor="middle">1er groupe</text>' +
    '<text class="se-t" x="' + (X0 + 3 * L) + '" y="330" text-anchor="middle" style="fill:var(--discret)">règlement de 1980</text>' +
    "</svg>";

  var REGLES =
    ".se-reglages{display:grid;grid-template-columns:auto 1fr auto;gap:8px 12px;align-items:center;width:100%}" +
    ".se-reglages label{font-weight:600;font-size:15px}" +
    ".se-reglages input{width:100%;accent-color:var(--accent)}" +
    ".se-reglages output{font-variant-numeric:tabular-nums;font-weight:700;min-width:4.5em;text-align:right}";

  function categorie(type, pub, perso) {
    var t = TYPES[type], total = pub + perso;
    if (pub < t.seuil) return { j: 0, pos: pub / t.seuil };
    if (total <= 300) return { j: 1, pos: (total - t.seuil) / (300 - t.seuil) };
    if (total <= 700) return { j: 2, pos: (total - 300) / 400 };
    if (total <= 1500) return { j: 3, pos: (total - 700) / 800 };
    return { j: 4, pos: Math.min(1, (total - 1500) / 1500) };
  }

  window.BIBLE_SCHEMAS.erp = function (cadre, ctx) {
    cadre.innerHTML =
      "<style>" + REGLES + "</style>" +
      '<div class="schema-onglets">' + Object.keys(TYPES).map(function (k, i) {
        return '<button class="bouton' + (i === 0 ? " actif" : "") + '" type="button" data-type="' + k + '">' + k + " : " + TYPES[k].nom + "</button>";
      }).join("") + "</div>" +
      '<div class="schema-cadre">' + SVG + "</div>" +
      '<div class="schema-commandes"><div class="se-reglages">' +
      '<label for="se-public">Public</label><input id="se-public" type="range" min="0" max="2500" step="10" value="150"><output id="se-public-v"></output>' +
      '<label for="se-perso">Personnel</label><input id="se-perso" type="range" min="0" max="500" step="5" value="30"><output id="se-perso-v"></output>' +
      '</div></div><p class="schema-note"></p>';

    var svg = cadre.querySelector("svg");
    var note = cadre.querySelector(".schema-note");
    var champPub = cadre.querySelector("#se-public"), champPerso = cadre.querySelector("#se-perso");
    var type = "W";

    function maj() {
      var t = TYPES[type], pub = +champPub.value, perso = +champPerso.value, total = pub + perso;
      var k = categorie(type, pub, perso);
      cadre.querySelector("#se-public-v").textContent = pub + " pers.";
      cadre.querySelector("#se-perso-v").textContent = perso + " pers.";

      var nPub = Math.min(120, Math.round(pub / 25)), nPerso = Math.min(120 - nPub, Math.round(perso / 25));
      Array.prototype.forEach.call(svg.querySelectorAll(".se-pt"), function (p, i) {
        p.setAttribute("class", "se-pt " + (i < nPub ? "public" : i < nPub + nPerso ? "perso" : "vide"));
      });

      Array.prototype.forEach.call(svg.querySelectorAll(".se-seg,.se-cat"), function (el) {
        el.classList.toggle("actif", +el.getAttribute("data-j") === k.j);
      });
      svg.querySelector(".se-borne-seuil").textContent = t.seuil;
      var x = X0 + k.j * L + 6 + k.pos * (L - 12);
      svg.querySelector(".se-curseur").style.transform = "translate(" + x + "px,0)";
      svg.querySelector("#se-titre").textContent = type + " · " + CATS[k.j].nom + " catégorie";

      if (k.j === 0) {
        svg.querySelector("#se-soustitre").textContent = "public " + pub + " < seuil " + t.seuil + " : le personnel ne compte pas";
        note.innerHTML = "Le public reste sous " + t.seuil + " personnes, seuil du type " + type + " : 5e catégorie, quel que soit le personnel. Seuils par niveau à vérifier aussi : " + t.detail + ". " + ctx.badge("verifier");
      } else {
        svg.querySelector("#se-soustitre").textContent = "public " + pub + " + personnel " + perso + " = " + total;
        note.innerHTML = "Le public atteint le seuil de " + t.seuil + " : on additionne public et personnel, " + total + " personnes, ce qui donne la " + CATS[k.j].nom + " catégorie. " + ctx.badge("texte", "Code de la construction et de l'habitation, articles R143-1 et suivants");
      }
    }

    cadre.querySelector(".schema-onglets").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      type = b.getAttribute("data-type");
      Array.prototype.forEach.call(cadre.querySelectorAll(".schema-onglets .bouton"), function (x) { x.classList.toggle("actif", x === b); });
      maj();
    });
    champPub.addEventListener("input", maj);
    champPerso.addEventListener("input", maj);
    maj();
  };
})();
