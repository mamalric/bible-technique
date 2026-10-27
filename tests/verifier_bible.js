/* Vérifie la bible avant un commit : node tests/verifier_bible.js
   - chaque fiche du registre a son fichier, ses rubriques et un id cohérent ;
   - chaque affirmation porte un type de source connu ;
   - aucun caractère banni (tirets cadratin et demi-cadratin, guillemets en chevrons, tilde pour "environ") ;
   - aucun nom de la liste privée prive/noms-interdits.txt (affaires, clients, entreprises, personnes) :
     le site est public. Sort en erreur (code 1) au premier défaut trouvé dans chaque fichier. */

"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RACINE = path.join(__dirname, "..");
let erreurs = 0, alertes = 0;
function erreur(m) { erreurs++; console.log("ERREUR  " + m); }
function alerte(m) { alertes++; console.log("ALERTE  " + m); }

function charger(fichier, ctx) {
  vm.runInNewContext(fs.readFileSync(fichier, "utf8"), ctx, { filename: fichier });
  return ctx;
}

const ctx = { window: {} };
charger(path.join(RACINE, "donnees", "registre.js"), ctx);
const B = ctx.window.BIBLE;
const SOURCES = Object.keys(B.sources);
const DOMAINES = B.domaines.map(d => d.cle);

/* textes publiés : caractères bannis et noms interdits */
const BANNIS = [[/—/, "tiret cadratin"], [/–/, "tiret demi-cadratin"], [/[«»]/, "guillemets en chevrons"], [/~\s?\d/, "tilde pour environ"]];
let noms = [];
const fNoms = path.join(RACINE, "prive", "noms-interdits.txt");
if (fs.existsSync(fNoms)) {
  noms = fs.readFileSync(fNoms, "utf8").split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith("#"));
} else {
  alerte("prive/noms-interdits.txt absent : la recherche de noms d'affaires n'est pas faite.");
}
function echapperRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
const reNoms = noms.map(n => [n, new RegExp("(^|[^\\p{L}\\p{N}])" + echapperRe(n) + "($|[^\\p{L}\\p{N}])", "iu")]);

function controlerTexte(fichier) {
  const nom = path.relative(RACINE, fichier);
  const lignes = fs.readFileSync(fichier, "utf8").split(/\r?\n/);
  lignes.forEach((l, i) => {
    BANNIS.forEach(([re, quoi]) => { if (re.test(l)) erreur(`${nom}:${i + 1} ${quoi}`); });
    reNoms.forEach(([n, re]) => { if (re.test(l)) erreur(`${nom}:${i + 1} nom interdit dans le site public : "${n}"`); });
  });
}

const publies = ["index.html", "fiche.html", "bible.js", "bible.css", "donnees/registre.js"];
fs.readdirSync(path.join(RACINE, "donnees", "fiches")).forEach(f => publies.push("donnees/fiches/" + f));
fs.readdirSync(path.join(RACINE, "schemas")).forEach(f => publies.push("schemas/" + f));
publies.forEach(f => controlerTexte(path.join(RACINE, f)));

/* registre et fiches */
const vus = new Set();
B.fiches.forEach(e => {
  if (vus.has(e.id)) erreur(`registre : id en double ${e.id}`);
  vus.add(e.id);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) erreur(`registre : id ${e.id} hors format (minuscules ASCII et tirets)`);
  ["titre", "resume", "domaines", "motscles", "maj"].forEach(k => { if (!e[k]) erreur(`registre ${e.id} : champ ${k} manquant`); });
  (e.domaines || []).forEach(d => { if (!DOMAINES.includes(d)) erreur(`registre ${e.id} : domaine inconnu ${d}`); });

  const fichier = path.join(RACINE, "donnees", "fiches", e.id + ".js");
  if (!fs.existsSync(fichier)) { erreur(`fiche ${e.id} : fichier donnees/fiches/${e.id}.js absent`); return; }
  const c = charger(fichier, { window: {} });
  const F = c.window.BIBLE_FICHE;
  if (!F) { erreur(`fiche ${e.id} : window.BIBLE_FICHE non défini`); return; }
  if (F.id !== e.id) erreur(`fiche ${e.id} : id du fichier "${F.id}" différent du registre`);
  ["titre", "soustitre", "essentiel", "chiffres", "verifications", "pieges", "references"].forEach(k => {
    if (!F[k] || (Array.isArray(F[k]) && !F[k].length)) erreur(`fiche ${e.id} : rubrique ${k} manquante ou vide`);
  });
  if (!F.schema) alerte(`fiche ${e.id} : pas de schéma, la fiche perd son image`);
  else if (!fs.existsSync(path.join(RACINE, "schemas", F.schema + ".js"))) erreur(`fiche ${e.id} : schemas/${F.schema}.js absent`);

  let total = 0, aVerifier = 0;
  function source(a, ou) {
    total++;
    if (!a.s) return erreur(`fiche ${e.id} : affirmation sans source (${ou})`);
    if (!SOURCES.includes(a.s)) return erreur(`fiche ${e.id} : source inconnue "${a.s}" (${ou})`);
    if (a.s === "verifier") aVerifier++;
  }
  (F.essentiel || []).forEach((a, i) => source(a, "essentiel " + (i + 1)));
  (F.chiffres || []).forEach((a, i) => source(a, "chiffre " + (i + 1)));
  (F.verifications || []).forEach(col => (col.points || []).forEach((a, i) => source(a, col.titre + " " + (i + 1))));
  (F.pieges || []).forEach((a, i) => source(a, "piège " + (i + 1)));
  (F.confondre || []).forEach((a, i) => source(a, "confondre " + (i + 1)));
  (F.references || []).forEach((a, i) => source(a, "référence " + (i + 1)));
  if (F.decision) {
    const nd = F.decision.noeuds || {};
    if (!nd[F.decision.depart]) erreur(`fiche ${e.id} : départ de l'arbre introuvable`);
    Object.keys(nd).forEach(k => {
      const n = nd[k];
      if (n.verdict) source(n, "verdict " + k);
      else (n.choix || []).forEach(ch => { if (!nd[ch.vers]) erreur(`fiche ${e.id} : l'arbre pointe vers ${ch.vers}, absent`); });
    });
  }
  console.log(`ok      ${e.id} : ${total} affirmations, dont ${aVerifier} à vérifier`);
});

console.log(`\n${B.fiches.length} fiche(s), ${erreurs} erreur(s), ${alertes} alerte(s)`);
process.exit(erreurs ? 1 : 0);
