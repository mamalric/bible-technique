/* Schéma interactif : classement d'un ERP.
   On choisit le type, on règle le public et le personnel : le bâtiment se remplit et le curseur
   se place sur l'échelle des cinq catégories. Dessiné pour la bible. */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};

  /* seuil de la 5e catégorie, effectif total du public ; détail des seuils par niveau : article PE 2 */
  var TYPES = {
    W: { nom: "Bureaux", seuil: 200, detail: "100 en sous-sol, 100 en étage" },
    M: { nom: "Commerce", seuil: 200, detail: "100 en sous-sol, 100 en étage" },
    N: { nom: "Restaurant", seuil: 200, detail: "100 en sous-sol, 200 en étage" },
    R: { nom: "Enseignement", seuil: 200, detail: "plus bas pour la petite enfance et dès qu'il y a de l'hébergement" },
    O: { nom: "Hôtel", seuil: 100, detail: "le public compte les clients des chambres" },
    U: { nom: "Soins", seuil: 100, detail: "20 quand il y a de l'hébergement" }
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
        note.innerHTML = "Le public reste sous " + t.seuil + " personnes, seuil du type " + type + " : 5e catégorie, quel que soit le personnel. Seuils par niveau à respecter aussi : " + t.detail + ". " + ctx.badge("texte", "arrêté du 25 juin 1980, articles PE 2 et PE 3");
      } else {
        svg.querySelector("#se-soustitre").textContent = "public " + pub + " + personnel " + perso + " = " + total;
        note.innerHTML = "Le public atteint le seuil de " + t.seuil + " : on additionne le public et le personnel sans dégagements indépendants, " + total + " personnes, ce qui donne la " + CATS[k.j].nom + " catégorie. " + ctx.badge("texte", "arrêté du 25 juin 1980, article GN 1 ; code de la construction et de l'habitation, article R143-19");
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
  /* ---------- dessins du cours (donnees/fiches/erp.js) ---------- */
  window.BIBLE_DESSINS = window.BIBLE_DESSINS || {};

  var STYLE_COURS =
    ".erc-t{fill:var(--encre-2);font-size:16px;font-family:inherit}" +
    ".erc-b{fill:var(--encre);font-size:17px;font-weight:700;font-family:inherit}" +
    ".erc-p{fill:var(--discret);font-size:15px;font-family:inherit}" +
    ".erc-tt{fill:var(--discret);font-size:12.5px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".erc-g{fill:var(--encre);font-size:30px;font-weight:800;font-family:inherit}" +
    ".erc-x{fill:var(--encre);font-size:96px;font-weight:800;font-family:inherit}" +
    ".erc-bat{fill:var(--carte);stroke:var(--encre-2);stroke-width:2}" +
    ".erc-rep{stroke:var(--discret);stroke-width:1.3}" +
    ".erc-pers{fill:var(--s-air)}" +
    ".erc-boutons{display:flex;gap:8px;flex-wrap:wrap;align-items:center;width:100%}" +
    ".erc-lettres{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;width:100%}" +
    ".erc-lettres .bouton{padding:8px 0;min-width:0;width:100%;justify-content:center;font-weight:700}";

  function ercStyle() {
    if (document.getElementById("erc-style")) return;
    var s = document.createElement("style");
    s.id = "erc-style"; s.textContent = STYLE_COURS;
    document.head.appendChild(s);
  }
  function dessinSvg(h, aria, c) { return '<svg viewBox="0 0 560 ' + h + '" role="img" aria-label="' + aria + '">' + c + "</svg>"; }
  function tx(x, y, s, cls, ancre, id) {
    return '<text class="' + (cls || "erc-t") + '" x="' + x + '" y="' + y + '"' + (ancre ? ' text-anchor="' + ancre + '"' : "") + (id ? ' id="' + id + '"' : "") + ">" + s + "</text>";
  }
  function monterCours(fn) {
    return function (el, ctx) {
      ercStyle();
      el.innerHTML = '<div class="schema-cadre"></div><div class="schema-commandes"></div><p class="schema-note"></p>';
      var note = el.querySelector(".schema-note"), cmd = el.querySelector(".schema-commandes");
      fn(el.querySelector(".schema-cadre"), cmd, function (texte, s, ref) { note.innerHTML = texte + " " + ctx.badge(s, ref); });
      if (!cmd.children.length) cmd.parentNode.removeChild(cmd);
      if (!note.textContent) note.parentNode.removeChild(note);
    };
  }
  var GN1 = "arrêté du 25 juin 1980, article GN 1", PE2 = "arrêté du 25 juin 1980, article PE 2";

  window.BIBLE_DESSINS.er_quoi = monterCours(function (cadre) {
    function bat(x, y, nom, pub) {
      var pers = pub ? '<circle class="erc-pers" cx="' + (x - 12) + '" cy="' + (y + 40) + '" r="5"/><path class="erc-pers" d="M' + (x - 18) + " " + (y + 66) + "v-14a6 6 0 0 1 12 0v14z\"/>" : "";
      return '<path class="erc-bat" d="M' + x + " " + (y + 20) + "l40-20 40 20v46H" + x + 'z"/><rect x="' + (x + 30) + '" y="' + (y + 42) + '" width="20" height="24" fill="var(--s-gaine-bord)"/>' + pers + tx(x + 40, y + 88, nom, "erc-p", "middle");
    }
    cadre.innerHTML = dessinSvg(300, "En haut, des établissements où du public entre : des ERP. En bas, un logement et un atelier : pas des ERP",
      tx(20, 22, "DU PUBLIC ENTRE : DES ERP", "erc-tt") +
      bat(30, 34, "école", 1) + bat(160, 34, "magasin", 1) + bat(290, 34, "restaurant", 1) + bat(420, 34, "mairie", 1) +
      '<path class="erc-rep" d="M20 142H540"/>' +
      tx(20, 166, "PAS DE PUBLIC : PAS DES ERP", "erc-tt") +
      bat(160, 178, "logement", 0) + bat(290, 178, "atelier", 0));
  });

  window.BIBLE_DESSINS.er_code = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(260, "Le code W 3 : la lettre dit l'activité, le chiffre dit le nombre de personnes",
      tx(190, 104, "W", "erc-x", "middle") + tx(370, 104, "3", "erc-x", "middle") +
      '<path class="erc-rep" d="M190 118V144M370 118V144"/>' +
      tx(150, 168, "le type", "erc-b", "middle") + tx(150, 192, "l'activité :", "erc-p", "middle") + tx(150, 212, "ici des bureaux", "erc-p", "middle") +
      tx(410, 168, "la catégorie", "erc-b", "middle") + tx(410, 192, "le nombre de personnes :", "erc-p", "middle") + tx(410, 212, "ici de 301 à 700", "erc-p", "middle") +
      tx(280, 248, "ensemble : les règles de sécurité à lire", "erc-t", "middle"));
  });

  window.BIBLE_DESSINS.er_types = monterCours(function (cadre, commandes, dire) {
    var T = { J: "structures d'accueil pour personnes âgées et personnes handicapées", L: "salles d'auditions, de conférences, de réunions, de spectacles ou à usage multiple", M: "magasins de vente et centres commerciaux", N: "restaurants et débits de boissons", O: "hôtels et pensions de famille", P: "salles de danse et salles de jeux", R: "établissements d'éveil, d'enseignement, de formation, centres de vacances et de loisirs sans hébergement", S: "bibliothèques et centres de documentation", T: "salles d'expositions", U: "établissements de soins", V: "établissements de culte", W: "administrations, banques et bureaux", X: "établissements sportifs couverts", Y: "musées" };
    cadre.innerHTML = dessinSvg(120, "La lettre du type choisi", tx(280, 100, "W", "erc-x", "middle", "er-l"));
    commandes.innerHTML = '<div class="erc-lettres">' + Object.keys(T).map(function (k) { return '<button class="bouton" type="button" data-l="' + k + '">' + k + "</button>"; }).join("") + "</div>";
    function choisir(k) {
      cadre.querySelector("#er-l").textContent = k;
      Array.prototype.forEach.call(commandes.querySelectorAll("button"), function (b) { b.classList.toggle("actif", b.getAttribute("data-l") === k); });
      dire("<b>" + k + "</b> : " + T[k] + ".", "texte", GN1);
    }
    commandes.addEventListener("click", function (e) { var b = e.target.closest("button[data-l]"); if (b) choisir(b.getAttribute("data-l")); });
    choisir("W");
  });

  window.BIBLE_DESSINS.er_echelle = monterCours(function (cadre) {
    var B = [["5e", 40, "sous le seuil"], ["4e", 74, "300 et moins"], ["3e", 112, "301 à 700"], ["2e", 160, "701 à 1 500"], ["1re", 214, "plus de 1 500"]], c = "";
    B.forEach(function (b, i) {
      var x = 16 + i * 108;
      c += '<rect x="' + x + '" y="' + (262 - b[1]) + '" width="96" height="' + b[1] + '" rx="4" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="2"/>' +
        tx(x + 48, 262 - b[1] / 2 + 10, b[0], "erc-g", "middle") + tx(x + 48, 286, b[2], "erc-p", "middle");
    });
    cadre.innerHTML = dessinSvg(300, "Les cinq catégories d'ERP, de la plus petite, la 5e, à la plus grande, la 1re",
      tx(280, 22, "PLUS LE CHIFFRE EST PETIT, PLUS IL Y A DE MONDE", "erc-tt", "middle") + c);
  });

  window.BIBLE_DESSINS.er_compter = monterCours(function (cadre) {
    function points(x, y, l, h, pas) {
      var c = "";
      for (var i = x + pas / 2; i < x + l; i += pas) for (var j = y + pas / 2; j < y + h; j += pas) c += '<circle class="erc-pers" cx="' + i + '" cy="' + j + '" r="3.5"/>';
      return c;
    }
    cadre.innerHTML = dessinSvg(310, "Plan d'un restaurant : une salle assise, un bar debout et une file d'attente, de plus en plus denses",
      '<rect class="erc-bat" x="16" y="16" width="318" height="240"/><rect class="erc-bat" x="344" y="16" width="200" height="118"/><rect class="erc-bat" x="344" y="144" width="200" height="112"/>' +
      points(16, 76, 318, 180, 36) + points(344, 72, 200, 62, 20) + points(344, 192, 200, 64, 15) +
      tx(30, 44, "salle assise, 120 m²", "erc-b") + tx(30, 66, "1 personne par m²", "erc-p") +
      tx(354, 42, "bar debout, 20 m²", "erc-b") + tx(354, 64, "2 par m²", "erc-p") +
      tx(354, 168, "file d'attente, 5 m²", "erc-b") + tx(354, 188, "3 par m²", "erc-p") +
      tx(280, 292, "public = 120 + 40 + 15 = 175 personnes", "erc-b", "middle"));
  });

  window.BIBLE_DESSINS.er_seuils = monterCours(function (cadre, commandes, dire) {
    var S = {
      "Bureaux W": [100, 100, 200, "Mêmes nombres pour les magasins M, les bibliothèques S, les expositions T, le sport couvert X, les musées Y et l'enseignement R hors petite enfance."],
      "Restaurant N": [100, 200, 200, "On peut monter à 200 en étage, mais pas plus au total."],
      "Réunion L": [100, null, 200, "Salles d'auditions, de conférences, de réunions, salles polyvalentes."],
      "Spectacle L": [20, null, 50, "Salles de spectacles et cabarets : les seuils les plus bas."],
      "Danse P": [20, 100, 120, "Salles de danse et salles de jeux."],
      "Culte V": [100, 200, 300, "Le seuil total le plus haut parmi les établissements en bâtiment."],
      "Hôtel O": [null, null, 100, "Un seul nombre, pour l'ensemble des niveaux."],
      "Soins U": [null, null, 100, "100 sans hébergement. Avec hébergement, le seuil tombe à 20."]
    };
    function niveau(y, h, nom, id, fond) {
      return '<rect x="30" y="' + y + '" width="230" height="' + h + '" fill="' + fond + '" stroke="var(--encre-2)" stroke-width="2"/>' + tx(145, y + h / 2 + 6, nom, "erc-t", "middle") +
        (id ? '<path class="erc-rep" d="M260 ' + (y + h / 2) + 'H296"/>' + tx(304, y + h / 2 + 10, "", "erc-g", null, id) : "");
    }
    cadre.innerHTML = dessinSvg(280, "Un bâtiment en coupe et les seuils de la 5e catégorie du type choisi : étages, sous-sol, ensemble des niveaux",
      niveau(16, 66, "étages", "er-s-e", "var(--carte)") + niveau(82, 66, "rez-de-chaussée", null, "var(--carte)") +
      '<path d="M8 148H552" stroke="var(--encre-2)" stroke-width="4"/>' +
      niveau(148, 66, "sous-sol", "er-s-s", "var(--fond-2)") +
      '<rect x="20" y="226" width="520" height="44" rx="8" fill="var(--carte)" stroke="var(--accent)" stroke-width="3"/>' +
      tx(36, 254, "ensemble des niveaux", "erc-t") + tx(524, 260, "", "erc-g", "end", "er-s-t"));
    commandes.innerHTML = '<div class="erc-boutons">' + Object.keys(S).map(function (k) { return '<button class="bouton" type="button" data-k="' + k + '">' + k + "</button>"; }).join("") + "</div>";
    function val(n) { return n === null ? "pas de seuil propre" : n; }
    function choisir(k) {
      var v = S[k], ss = cadre.querySelector("#er-s-s"), et = cadre.querySelector("#er-s-e");
      ss.textContent = val(v[0]); et.textContent = val(v[1]);
      [ss, et].forEach(function (e, i) { e.setAttribute("class", v[i === 0 ? 0 : 1] === null ? "erc-p" : "erc-g"); });
      cadre.querySelector("#er-s-t").textContent = v[2];
      Array.prototype.forEach.call(commandes.querySelectorAll("button"), function (b) { b.classList.toggle("actif", b.getAttribute("data-k") === k); });
      dire(v[3], "texte", PE2);
    }
    commandes.addEventListener("click", function (e) { var b = e.target.closest("button[data-k]"); if (b) choisir(b.getAttribute("data-k")); });
    choisir("Bureaux W");
  });

  window.BIBLE_DESSINS.er_livres = monterCours(function (cadre) {
    function livre(x, nom, l1, l2, pour, accent) {
      return '<rect x="' + x + '" y="94" width="122" height="176" rx="4" fill="var(--carte)" stroke="' + (accent ? "var(--accent)" : "var(--encre-2)") + '" stroke-width="' + (accent ? 3 : 2) + '"/>' +
        tx(x + 61, 124, nom, "erc-b", "middle") + tx(x + 61, 166, l1, "erc-p", "middle") + tx(x + 61, 188, l2, "erc-p", "middle") + tx(x + 61, 252, pour, "erc-t", "middle");
    }
    cadre.innerHTML = dessinSvg(280, "Le règlement de sécurité rangé en quatre livres : le livre II sert au 1er groupe, le livre III au 2e groupe",
      tx(203, 28, "catégories 1 à 4", "erc-b", "middle") + tx(350, 28, "5e catégorie", "erc-b", "middle") +
      '<path d="M203 40V86M196 78l7 10 7-10M350 40V86M343 78l7 10 7-10" fill="none" stroke="var(--accent)" stroke-width="3"/>' +
      livre(10, "Livre I", "GN", "généralités", "pour tous") + livre(148, "Livre II", "GE, CO, CH...", "W, N, R...", "1er groupe", 1) +
      livre(286, "Livre III", "PE", "PO, PU, PX", "2e groupe", 1) + livre(424, "Livre IV", "CTS, SG, PA", "GA, EF, OA...", "spéciaux"));
  });

  window.BIBLE_DESSINS.er_parcours = monterCours(function (cadre) {
    var E = [["Dossier de sécurité en mairie", "au moins 6 mois avant les travaux"], ["Avis de la commission, décision du maire", "autorisation de travaux"], ["Travaux", "vérifications par des organismes agréés"], ["Visite de réception", "avant toute ouverture au public"], ["Arrêté d'ouverture du maire", "demande au moins un mois avant"], ["Visites périodiques", "tous les 3 ou 5 ans, et inopinées"]], c = "";
    E.forEach(function (e, i) {
      var y = 30 + i * 66;
      if (i < E.length - 1) c += '<path d="M34 ' + (y + 16) + "V" + (y + 50) + '" stroke="var(--s-gaine-bord)" stroke-width="3"/>';
      c += '<circle cx="34" cy="' + y + '" r="16" fill="var(--carte)" stroke="var(--accent)" stroke-width="3"/>' + tx(34, y + 6, i + 1, "erc-b", "middle") + tx(64, y, e[0], "erc-b") + tx(64, y + 22, e[1], "erc-p");
    });
    cadre.innerHTML = dessinSvg(400, "Le parcours d'un ERP, du dossier de sécurité aux visites périodiques", c);
  });

  window.BIBLE_DESSINS.er_exemple = monterCours(function (cadre) {
    function X(n) { return 30 + n * 1.25; }
    function barre(y, pub, perso) {
      return '<rect x="30" y="' + y + '" width="' + (X(pub) - 30) + '" height="34" fill="var(--s-air)"/>' +
        (perso ? '<rect x="' + X(pub) + '" y="' + y + '" width="' + perso * 1.25 + '" height="34" fill="var(--encre-2)"/>' : "");
    }
    cadre.innerHTML = dessinSvg(270, "Deux restaurants sur une échelle : public de 250 plus 10 de personnel, classé N 4 ; public de 170, classé N 5",
      '<path d="M' + X(200) + " 30V226M" + X(300) + ' 30V226" stroke="var(--danger)" stroke-width="2" stroke-dasharray="6 5"/>' +
      tx(X(200), 22, "seuil : 200", "erc-p", "middle") + tx(X(300), 22, "4e / 3e : 300", "erc-p", "middle") +
      tx(30, 58, "le restaurant de l'exemple", "erc-t") + barre(66, 250, 10) + tx(X(300) + 10, 95, "N 4", "erc-g") +
      tx(30, 148, "avec une salle de 100 m²", "erc-t") + barre(156, 170, 0) + tx(X(200) + 10, 185, "N 5", "erc-g") +
      '<rect x="30" y="238" width="16" height="14" fill="var(--s-air)"/>' + tx(52, 251, "public", "erc-p") +
      '<rect x="120" y="238" width="16" height="14" fill="var(--encre-2)"/>' + tx(142, 251, "personnel qui s'ajoute", "erc-p"));
  });
})();
