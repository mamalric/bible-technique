/* Schéma interactif : local technique en sous-sol, vu en coupe.
   Quatre cas de figure (sous-station, chaufferie, local électrique, groupe froid), des pastilles numérotées
   qui disent chacune une obligation, et des essais : feu dans le local, fuite. Dessiné pour la bible. */

(function () {
  "use strict";
  window.BIBLE_SCHEMAS = window.BIBLE_SCHEMAS || {};

  var STYLE =
    ".sl-t{fill:var(--encre-2);font-size:14px;font-family:inherit}" +
    ".sl-tt{fill:var(--discret);font-size:13px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".sl-m{display:none}" +
    ".sousstation .m-ss,.chaufferie .m-ch,.electrique .m-el,.froid .m-fr{display:inline}" +
    ".sl-air{fill:none;stroke:var(--s-air);stroke-width:3;stroke-linecap:round;stroke-dasharray:10 12;animation:sl-flux 1.1s linear infinite}" +
    ".feu .sl-air{animation-play-state:paused;opacity:.25}" +
    "@keyframes sl-flux{to{stroke-dashoffset:-22}}" +
    ".sl-cadre{fill:none;stroke:transparent;stroke-width:5;transition:stroke .4s}" +
    ".feu .sl-cadre{stroke:var(--danger)}" +
    ".sl-fumee{fill:var(--encre-2);opacity:0;transition:opacity 1.2s}" +
    ".feu .sl-fumee{opacity:.3}" +
    ".sl-feu{opacity:0;transition:opacity .4s}" +
    ".feu .sl-feu{opacity:1}" +
    ".sl-feu path{transform-box:fill-box;transform-origin:50% 100%;animation:sl-flamme .55s ease-in-out infinite alternate}" +
    ".sl-feu path:nth-child(2){animation-delay:.2s}.sl-feu path:nth-child(3){animation-delay:.35s}" +
    "@keyframes sl-flamme{to{transform:scaleY(1.18) skewX(-5deg)}}" +
    ".sl-au{fill:var(--danger);stroke:var(--fond-2);stroke-width:2}" +
    ".coupe .sl-au{stroke:#ffe066;stroke-width:4}" +
    ".coupe .sl-energie{opacity:.25;transition:opacity .4s}" +
    ".sl-eau{fill:var(--s-air);opacity:.55;transform-box:view-box;transform-origin:0 372px;transform:scaleY(0);transition:transform 1.4s ease-out}" +
    ".fuite-eau .sl-eau{transform:scaleY(1)}" +
    ".sl-pompe{fill:var(--discret);transition:fill .3s}" +
    ".fuite-eau .sl-pompe{fill:var(--ok)}" +
    ".sl-nuage{fill:var(--b-fab);opacity:0;transition:opacity 1.2s}" +
    ".fuite-fr .sl-nuage{opacity:.5}" +
    ".sl-detect{fill:var(--b-expert);transition:fill .3s}" +
    ".fuite-fr .sl-detect{fill:var(--danger)}" +
    ".sl-pt{cursor:pointer}" +
    ".sl-pt circle{fill:var(--accent);stroke:var(--fond-2);stroke-width:2.5;transition:fill .2s}" +
    ".sl-pt text{fill:var(--accent-encre);font-size:13px;font-weight:800;font-family:inherit;pointer-events:none}" +
    ".sl-pt:hover circle,.sl-pt:focus circle{fill:var(--lien)}" +
    ".sl-pt.choisi circle{fill:var(--encre)}.sl-pt.choisi text{fill:var(--fond)}" +
    ".sl-pt:focus{outline:none}" +
    "@media (max-width:600px){.sl-pt circle{r:22px}.sl-pt text{font-size:21px}}";

  function escalier() {
    var d = "M40 128";
    for (var i = 0; i < 10; i++) d += "h12v24.4";
    return '<path d="' + d + 'H40z" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>';
  }
  function vanne(x, y) {
    return '<path d="M' + (x - 8) + " " + (y - 7) + "v14l16-14v14z\" fill=\"var(--carte)\" stroke=\"var(--encre)\" stroke-width=\"2\" stroke-linejoin=\"round\"/>";
  }
  function plaques() {
    var s = "";
    for (var x = 478; x < 540; x += 8) s += '<path d="M' + x + ' 208v144" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>';
    return s;
  }
  function flammes(x) {
    return '<g class="sl-feu">' +
      '<path d="M' + x + ' 372c-12-30 10-44 8-70 18 20 30 34 22 70z" fill="#ff7a3d"/>' +
      '<path d="M' + (x + 38) + ' 372c-14-36 14-52 12-86 22 26 36 48 26 86z" fill="#ff5a1f"/>' +
      '<path d="M' + (x + 86) + ' 372c-10-26 8-38 6-60 16 18 26 32 20 60z" fill="#ffb03d"/></g>';
  }

  var SVG =
    '<svg viewBox="0 0 900 400" role="img" aria-label="Coupe d\'un local technique en sous-sol, avec ses obligations repérées par des pastilles">' +
    "<style>" + STYLE + "</style>" +
    "<defs>" +
    '<pattern id="sl-hach" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="9" stroke="var(--s-hachure)" stroke-width="2"/></pattern>' +
    '<pattern id="sl-terre" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="3" cy="4" r="1.6" fill="var(--s-hachure)"/><circle cx="10" cy="11" r="1.2" fill="var(--s-hachure)"/></pattern>' +
    "</defs>" +

    '<text class="sl-tt" x="125" y="24" text-anchor="middle">REZ-DE-CHAUSSÉE</text>' +
    '<text class="sl-tt" x="850" y="24" text-anchor="middle">EXTÉRIEUR</text>' +
    '<text class="sl-tt" x="450" y="399" text-anchor="middle">LOCAL TECHNIQUE EN SOUS-SOL</text>' +

    /* terre, plancher haut, radier, mur extérieur, puisard */
    '<rect x="820" y="112" width="80" height="274" fill="url(#sl-terre)"/>' +
    '<path d="M800 112H900" stroke="var(--discret)" stroke-width="2"/>' +
    '<rect x="172" y="112" width="648" height="16" fill="var(--s-paroi)"/><rect x="172" y="112" width="648" height="16" fill="url(#sl-hach)"/>' +
    '<rect x="20" y="372" width="880" height="14" fill="var(--s-paroi)"/><rect x="20" y="372" width="880" height="14" fill="url(#sl-hach)"/>' +
    '<rect x="800" y="112" width="20" height="260" fill="var(--s-paroi)"/><rect x="800" y="112" width="20" height="260" fill="url(#sl-hach)"/>' +
    '<rect x="700" y="370" width="44" height="24" fill="var(--fond-2)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
    '<rect class="sl-pompe" x="712" y="377" width="20" height="12" rx="3"/>' +
    '<path d="M560 366l130 4" stroke="var(--discret)" stroke-width="1.2" stroke-dasharray="4 4"/>' +

    /* dégagement et escalier, côté gauche */
    escalier() +
    '<text class="sl-t" x="150" y="166" text-anchor="middle">dégagement</text>' +

    /* paroi du local, porte et ferme-porte, arrêt d'urgence */
    '<rect x="230" y="128" width="20" height="152" fill="var(--s-paroi)"/><rect x="230" y="128" width="20" height="152" fill="url(#sl-hach)"/>' +
    '<rect class="sl-cadre" x="250" y="128" width="550" height="244"/>' +
    '<rect x="233" y="282" width="14" height="90" rx="2" fill="var(--encre-2)"/>' +
    '<path d="M236 290l-20-9-14 6" fill="none" stroke="var(--encre)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<rect class="sl-au" x="196" y="228" width="26" height="26" rx="5"/><circle cx="209" cy="241" r="6" fill="#fff"/>' +

    /* ventilation haute (extraction) et basse (amenée d'air) */
    '<rect x="290" y="20" width="24" height="110" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
    '<path class="sl-air" d="M302 132V28"/>' +
    '<text class="sl-t" x="282" y="56" text-anchor="end">ventilation haute</text>' +
    '<rect x="835" y="62" width="24" height="292" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
    '<rect x="770" y="330" width="89" height="24" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
    '<path d="M829 62h36" stroke="var(--s-gaine-bord)" stroke-width="4" stroke-linecap="round"/>' +
    '<path class="sl-air" d="M847 70V342H778"/>' +
    '<text class="sl-t" x="762" y="322" text-anchor="end">ventilation basse</text>' +

    /* fumée et eau, sous les équipements */
    '<rect class="sl-fumee" x="250" y="128" width="550" height="110"/>' +
    '<rect class="sl-eau" x="250" y="354" width="550" height="18"/>' +
    '<ellipse class="sl-nuage" cx="520" cy="360" rx="260" ry="16"/>' +

    /* sous-station : échangeur, primaire et secondaire */
    '<g class="sl-m m-ss">' +
    '<g class="sl-energie"><path d="M900 170H600V232H540" fill="none" stroke="var(--danger)" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M540 330H620V190H900" fill="none" stroke="var(--danger)" stroke-width="5" stroke-opacity=".5" stroke-linejoin="round"/>' +
    '<path d="M470 232H400V20" fill="none" stroke="var(--s-chaud)" stroke-width="5" stroke-linejoin="round"/>' +
    '<path d="M470 330H378V20" fill="none" stroke="var(--s-air)" stroke-width="5" stroke-linejoin="round"/></g>' +
    vanne(770, 170) + vanne(770, 190) +
    '<circle cx="690" cy="190" r="11" fill="var(--carte)" stroke="var(--encre)" stroke-width="2"/><path d="M684 190h12M690 184v12" stroke="var(--encre)" stroke-width="1.5"/>' +
    '<circle cx="430" cy="232" r="11" fill="var(--carte)" stroke="var(--encre)" stroke-width="2"/><path d="M425 226l11 6-11 6z" fill="var(--encre)"/>' +
    '<rect x="470" y="200" width="70" height="160" rx="4" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' + plaques() +
    '<text class="sl-t" x="505" y="190" text-anchor="middle">échangeur</text>' +
    '<text class="sl-t" x="700" y="256" text-anchor="middle">primaire</text>' +
    '<text class="sl-t" x="408" y="56">secondaire, vers le bâtiment</text>' +
    flammes(470) + "</g>" +

    /* chaufferie : chaudière, conduit de fumée, gaz */
    '<g class="sl-m m-ch">' +
    '<rect x="530" y="20" width="18" height="202" fill="var(--discret)"/>' +
    '<text class="sl-t" x="556" y="56">conduit de fumée</text>' +
    '<path class="sl-energie" d="M900 190H600V250H562" fill="none" stroke="#e8c468" stroke-width="4" stroke-linejoin="round"/>' +
    vanne(868, 190) +
    '<text class="sl-t" x="700" y="182" text-anchor="middle">gaz</text>' +
    '<rect x="430" y="222" width="132" height="150" rx="6" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
    '<rect class="sl-energie" x="458" y="300" width="44" height="26" rx="3" fill="var(--s-chaud)"/>' +
    '<text class="sl-t" x="496" y="254" text-anchor="middle">chaudière</text>' +
    flammes(440) + "</g>" +

    /* local électrique : TGBT et câbles */
    '<g class="sl-m m-el">' +
    '<g class="sl-energie"><path d="M478 200V20M490 200V20M502 200V20" stroke="#e8c468" stroke-width="3"/>' +
    '<path d="M900 250H592" stroke="#e8c468" stroke-width="4"/></g>' +
    '<text class="sl-t" x="514" y="56">câbles vers les étages</text>' +
    '<text class="sl-t" x="700" y="242" text-anchor="middle">arrivée du réseau</text>' +
    '<rect x="410" y="200" width="60" height="172" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
    '<rect x="470" y="200" width="60" height="172" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
    '<rect x="530" y="200" width="60" height="172" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' +
    '<path d="M460 280v18M520 280v18M580 280v18" stroke="var(--encre)" stroke-width="3" stroke-linecap="round"/>' +
    '<text class="sl-t" x="440" y="190" text-anchor="middle">TGBT</text>' +
    flammes(440) + "</g>" +

    /* groupe froid ou PAC : machine, détecteur en point bas, extraction basse */
    '<g class="sl-m m-fr">' +
    '<rect x="266" y="128" width="22" height="214" fill="var(--s-gaine)" stroke="var(--s-gaine-bord)" stroke-width="1.5"/>' +
    '<path class="sl-air" d="M277 336V132"/>' +
    '<path class="sl-energie" d="M592 250V20M602 250V20" stroke="var(--s-air)" stroke-width="4"/>' +
    '<rect x="410" y="250" width="200" height="122" rx="6" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' +
    '<circle cx="462" cy="310" r="30" fill="none" stroke="var(--encre-2)" stroke-width="2"/>' +
    '<path d="M462 310l0-24M462 310l21 12M462 310l-21 12" stroke="var(--encre-2)" stroke-width="3" stroke-linecap="round"/>' +
    '<rect x="520" y="300" width="64" height="50" rx="8" fill="var(--fond-2)" stroke="var(--encre-2)" stroke-width="2"/>' +
    '<text class="sl-t" x="490" y="240" text-anchor="middle">groupe froid ou PAC</text>' +
    '<rect class="sl-detect" x="650" y="352" width="18" height="14" rx="3"/>' +
    flammes(440) + "</g>" +

    '<g class="sl-pastilles"></g>' +
    "</svg>";

  /* pastilles : [x, y, titre, texte, source, référence], cas par cas.
     Les sept premières sont aux mêmes places dans les quatre cas : parois, porte, arrêt d'urgence,
     ventilation haute, ventilation basse, puisard, accès. */
  var P = { paroi: [240, 170], porte: [240, 326], au: [209, 206], vh: [302, 90], vb: [847, 250], puisard: [722, 346], acces: [100, 214] };
  function pt(ou, titre, texte, s, ref) { return [ou[0], ou[1], titre, texte, s, ref]; }
  var A78 = "arrêté du 23 juin 1978";
  var RESEAUX = "points récurrents de cahiers de prescriptions de réseaux de chaleur publiés";
  var MODES = {
    sousstation: {
      nom: "Sous-station", repos: "Sous-station : la chaleur d'un réseau primaire passe au réseau du bâtiment par l'échangeur, sans combustion.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 11",
      pastilles: [
        pt(P.paroi, "Parois", "Ni le titre II de l'arrêté de 1978 ni l'article CH 11 ne fixent de degré coupe-feu à une sous-station. Le degré vient du type d'ERP, de la notice de sécurité ou des prescriptions du réseau : à écrire noir sur blanc.", "texte", A78 + ", titre II ; arrêté du 25 juin 1980, article CH 11"),
        pt(P.porte, "Communication avec le public", "En eau surchauffée haute température (plus de 110 °C) ou en vapeur haute pression : aucune communication directe avec les locaux et dégagements ouverts au public, sauf par un sas à portes pleines, ventilé en partie haute vers l'extérieur (4 dm² au moins).", "texte", "arrêté du 25 juin 1980, article CH 11"),
        pt(P.au, "Coupures depuis l'extérieur", "Au-delà de 110 °C ou en vapeur haute pression, la coupure du primaire et la coupure électrique doivent pouvoir se faire de l'extérieur du local.", "texte", A78 + ", article 29"),
        pt(P.vh, "Ventilation haute", "Ventilation en partie basse et en partie haute : l'ambiance ne dépasse pas 30 °C tant qu'il fait moins de 15 °C dehors.", "texte", A78 + ", article 28"),
        pt(P.vb, "Ventilation basse", "Pas d'air de combustion à fournir : l'air neuf entre en bas pour évacuer la chaleur perdue par les tuyauteries et l'échangeur.", "texte", A78 + ", article 28"),
        pt(P.puisard, "Rétention", "Cuvette de rétention de 0,15 m de haut ou de 5 m³ (10 m³ au-delà de 2 000 kW), sauf pour un primaire en vapeur.", "texte", A78 + ", article 27"),
        pt(P.acces, "Accès", "En haute pression ou haute température, accès direct par l'extérieur, et deux accès au-delà de 2 000 kW.", "texte", A78 + ", article 22"),
        [505, 290, "Échangeur", "Il transfère la chaleur du réseau primaire au réseau secondaire, par échange ou par mélange. Au-delà de 70 kW, le titre II de l'arrêté de 1978 s'applique.", "texte", "arrêté du 25 juin 1980, article CH 11"],
        [770, 146, "Vannes du primaire", "Elles appartiennent en général au réseau, comme l'échangeur et le compteur. L'abonné prend le secondaire à partir des brides de l'échangeur. La limite exacte est écrite dans le règlement de service du réseau.", "verifier", RESEAUX],
        [690, 216, "Compteur d'énergie", "Sur le primaire, fourni par le réseau : il mesure la chaleur livrée et facturée.", "verifier", RESEAUX]
      ]
    },
    chaufferie: {
      nom: "Chaufferie", repos: "Chaufferie : des générateurs de plus de 70 kW au total brûlent un combustible dans le local.", s: "texte", ref: A78 + ", article 1",
      pastilles: [
        pt(P.paroi, "Parois et planchers", "Matériaux M0, coupe-feu 2 h au moins. En ERP, le local est en plus un local à risques importants : plancher haut et parois CF 2 h.", "texte", A78 + ", article 4 ; arrêté du 25 juin 1980, articles CH 5 et CO 28"),
        pt(P.porte, "Portes", "Elles s'ouvrent vers l'extérieur de la chaufferie. Depuis l'intérieur du bâtiment : sas à deux portes pare-flammes 1/2 h, ou porte coupe-feu 1 h avec ferme-porte. En ERP, jamais de communication directe avec les zones publiques.", "texte", A78 + ", article 5 ; arrêté du 25 juin 1980, article CO 28"),
        pt(P.au, "Coupures hors du local", "Deux commandes électriques extérieures (éclairage, autres circuits) et la coupure rapide du combustible liquide. Pour le gaz, les règles du gaz s'appliquent.", "texte", A78 + ", article 14"),
        pt(P.vh, "Ventilation haute", "Évacuation de l'air en partie haute.", "texte", A78 + ", articles 11 et 12"),
        pt(P.vb, "Ventilation basse", "Amenée d'air frais en partie basse : c'est aussi l'air de la combustion.", "texte", A78 + ", articles 11 et 12"),
        pt(P.puisard, "Évacuation des eaux", "En sous-sol, l'eau d'une vidange ou d'une fuite n'a pas d'issue naturelle : siphon de sol ou puisard avec pompe de relevage.", "verifier"),
        pt(P.acces, "Accès en ERP", "Un accès unique passe par une circulation non publique qui débouche dehors, sur un hall au niveau d'évacuation ou sur une terrasse accessible aux secours. Un second accès peut traverser une zone publique par un sas (deux portes pare-flammes 1/2 h avec ferme-porte, ouvrant vers la sortie).", "texte", "arrêté du 25 juin 1980, article CH 5"),
        [496, 290, "Chaudières", "Au-delà de 70 kW de puissance utile au total (environ 85 kW installés), chaufferie obligatoire. Au-delà de 2 000 kW, elle sort des bâtiments occupés (terrasse admise jusqu'à 5 000 kW, sous conditions).", "texte", A78 + ", articles 1 et 3"],
        [868, 160, "Gaz", "Au gaz, en ERP, le local suit en plus l'article GZ 9. En habitation, les emplacements de production d'énergie au gaz sont interdits en sous-sol.", "texte", "arrêté du 25 juin 1980, article CH 5 ; arrêté du 23 février 2018, article 8.2.2.2"],
        [539, 100, "Conduit de fumée", "Il traverse les étages : sa gaine garde le degré coupe-feu des planchers traversés.", "verifier"]
      ]
    },
    electrique: {
      nom: "Local électrique", repos: "Local électrique : le tableau général basse tension (TGBT) distribue le courant au bâtiment. En ERP, son isolement dépend des matériels.", s: "texte", ref: "arrêté du 25 juin 1980, article EL 5",
      pastilles: [
        pt(P.paroi, "Parois", "Trois cas selon les matériels : a) parois et plancher haut CF 2 h ; b) CF 1 h ; c) local ordinaire.", "texte", "arrêté du 25 juin 1980, article EL 5"),
        pt(P.porte, "Portes", "Cas a) : franchissements CF 1 h et aucune communication directe avec le public. Cas b) : portes CF 1/2 h.", "texte", "arrêté du 25 juin 1980, article EL 5"),
        pt(P.au, "Coupure générale", "Commande de coupure accessible hors du local, près de son accès, pour les secours.", "verifier"),
        pt(P.vh, "Ventilation", "Un poste de transformation, ou un matériel à diélectrique inflammable, est ventilé directement vers l'extérieur.", "texte", "arrêté du 25 juin 1980, article EL 6"),
        pt(P.vb, "Air neuf", "L'air neuf évacue la chaleur dégagée par les tableaux et les transformateurs.", "verifier"),
        pt(P.puisard, "Eau", "Aucune canalisation d'eau au-dessus des tableaux. En sous-sol, évacuer une inondation avant qu'elle n'atteigne les armoires.", "verifier"),
        pt(P.acces, "Accès", "Local fermé à clé, réservé au personnel habilité.", "verifier"),
        [500, 290, "TGBT", "Le cas a, b ou c se choisit d'après les matériels installés : à écrire dans la notice de sécurité.", "texte", "arrêté du 25 juin 1980, article EL 5"],
        [650, 274, "Poste haute tension", "Poste de livraison ou de transformation HT : local de service électrique isolé selon le cas a), ventilé vers l'extérieur ; le poste suit la NF C 13-100. Un groupe électrogène relève aussi du cas a).", "texte", "arrêté du 25 juin 1980, articles EL 6 et EL 7"]
      ]
    },
    froid: {
      nom: "Groupe froid ou PAC", repos: "Groupe froid ou pompe à chaleur : le fluide frigorigène circule dans la machine. En ERP, la salle des machines est un local à risques courants.", s: "texte", ref: "arrêté du 25 juin 1980, article CH 35",
      pastilles: [
        pt(P.paroi, "Parois", "Local à risques courants. Si une fuite peut atteindre la limite inférieure d'inflammabilité du fluide, il est isolé comme un local à risques moyens : CF 1 h.", "texte", "arrêté du 25 juin 1980, articles CH 35 et CO 28"),
        pt(P.porte, "Porte", "Isolé en risques moyens, le local a un bloc-porte CF 1/2 h avec ferme-porte. La salle des machines est distincte d'une chaufferie.", "texte", "arrêté du 25 juin 1980, articles CH 35 et CO 28"),
        pt(P.au, "Arrêt d'urgence", "Arrêt de la machine et commande de la ventilation de secours hors du local.", "verifier"),
        pt(P.vh, "Orifices vers l'extérieur", "Deux orifices donnent sur l'extérieur, à des hauteurs différentes.", "texte", "arrêté du 25 juin 1980, article CH 35"),
        pt(P.vb, "Ventilation mécanique", "Exigée si une fuite peut atteindre la limite d'inflammabilité. Respecter la NF EN 378 vaut présomption de conformité pour les débits.", "texte", "arrêté du 25 juin 1980, article CH 35"),
        pt(P.puisard, "Point bas", "La plupart des fluides sont plus lourds que l'air : en sous-sol, une fuite s'accumule au sol.", "verifier"),
        pt(P.acces, "Accès", "Réservé au personnel d'exploitation.", "verifier"),
        [470, 270, "Machine frigorifique", "Selon le fluide, sa charge et l'emplacement, la NF EN 378 impose ou non une salle des machines. Au-delà de 300 kg de gaz fluorés au total (équipements de plus de 2 kg), c'est une installation classée.", "verifier", "NF EN 378 ; nomenclature des ICPE, rubrique 1185"],
        [630, 340, "Détecteur de fluide", "Au-delà de la limite pratique du fluide, il déclenche l'alarme et la ventilation de secours.", "verifier", "NF EN 378-3, d'après une source secondaire"],
        [277, 230, "Extraction basse", "Pour un fluide plus lourd que l'air. Exigée par l'ancienne NF E 35-400 ; à confirmer avec la NF EN 378.", "verifier"]
      ]
    }
  };

  window.BIBLE_SCHEMAS["local-technique"] = function (cadre, ctx) {
    cadre.innerHTML =
      '<div class="schema-onglets">' + Object.keys(MODES).map(function (k, i) {
        return '<button class="bouton' + (i === 0 ? " actif" : "") + '" type="button" data-mode="' + k + '">' + MODES[k].nom + "</button>";
      }).join("") + "</div>" +
      '<div class="schema-cadre">' + SVG + "</div>" +
      '<div class="schema-commandes"></div><p class="schema-note"></p>';

    var svg = cadre.querySelector("svg");
    var groupe = svg.querySelector(".sl-pastilles");
    var commandes = cadre.querySelector(".schema-commandes");
    var note = cadre.querySelector(".schema-note");
    var mode = "sousstation", minuteurs = [], liste = [];

    function plus(c) { svg.classList.add(c); }
    function dire(texte, source, ref) { note.innerHTML = texte + " " + ctx.badge(source, ref); }
    function plusTard(f, ms) { minuteurs.push(setTimeout(f, ms)); }
    function etat(t) { commandes.querySelector(".schema-etat").textContent = t; }

    function pastilles() {
      liste = MODES[mode].pastilles;
      groupe.innerHTML = liste.map(function (p, i) {
        return '<g class="sl-pt" tabindex="0" role="button" data-i="' + i + '" aria-label="' + (i + 1) + ". " + p[2] + '">' +
          '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="13"/>' +
          '<text x="' + p[0] + '" y="' + p[1] + '" text-anchor="middle" dominant-baseline="central">' + (i + 1) + "</text></g>";
      }).join("");
    }
    function choisir(i) {
      var p = liste[i];
      Array.prototype.forEach.call(groupe.querySelectorAll(".sl-pt"), function (g) { g.classList.toggle("choisi", +g.getAttribute("data-i") === i); });
      dire("<b>" + (i + 1) + ". " + p[2] + "</b> : " + p[3], p[4], p[5]);
    }
    groupe.addEventListener("click", function (e) {
      var g = e.target.closest(".sl-pt"); if (g) choisir(+g.getAttribute("data-i"));
    });
    groupe.addEventListener("keydown", function (e) {
      var g = e.target.closest(".sl-pt");
      if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); choisir(+g.getAttribute("data-i")); }
    });

    function reinitialiser() {
      minuteurs.forEach(clearTimeout); minuteurs = [];
      svg.setAttribute("class", mode);
      pastilles();
      dire(MODES[mode].repos + " Cliquez sur une pastille pour lire l'obligation qu'elle repère.", MODES[mode].s, MODES[mode].ref);
      boutons();
    }

    function feu() {
      plus("feu");
      etat("Feu dans le local");
      dire("Le feu prend dans le local. Les fumées restent sous le plancher haut, la porte est fermée par son ferme-porte : les parois coupe-feu le contiennent le temps de l'intervention.", "verifier");
      plusTard(function () {
        plus("coupe");
        etat("Énergie coupée");
        dire("On appuie sur l'arrêt d'urgence, dehors : énergie et combustible sont coupés sans entrer dans le local en feu.", "verifier");
      }, 2200);
    }
    function fuite() {
      if (mode === "froid") {
        plus("fuite-fr");
        etat("Fuite de fluide");
        dire("Le fluide fuit et descend au sol. Le détecteur en point bas déclenche l'alarme et l'extraction basse.", "verifier");
      } else {
        plus("fuite-eau");
        etat("Fuite d'eau");
        dire("Une fuite noie le sol du sous-sol. La pente l'amène au puisard, et la pompe de relevage la remonte vers le réseau d'évacuation." +
          (mode === "sousstation" ? " Sur un primaire à plus de 110 °C, l'eau qui fuit se vaporise : danger de brûlure." : ""), "verifier");
      }
    }

    function boutons() {
      var l = [["Feu dans le local", feu]];
      if (mode !== "electrique") l.push([mode === "froid" ? "Fuite de fluide" : "Fuite d'eau", fuite]);
      l.push(["Revenir au repos", reinitialiser]);
      commandes.innerHTML = "";
      l.forEach(function (b, i) {
        var el = document.createElement("button");
        el.type = "button"; el.className = "bouton" + (i === 0 ? " actif" : ""); el.textContent = b[0];
        el.addEventListener("click", b[1]);
        commandes.appendChild(el);
      });
      var e = document.createElement("span"); e.className = "schema-etat"; commandes.appendChild(e);
      etat("Au repos");
    }

    cadre.querySelector(".schema-onglets").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      mode = b.getAttribute("data-mode");
      Array.prototype.forEach.call(cadre.querySelectorAll(".schema-onglets .bouton"), function (x) { x.classList.toggle("actif", x === b); });
      reinitialiser();
    });

    reinitialiser();
  };
  /* ---------- dessins du cours (donnees/fiches/locaux-techniques.js) ---------- */
  window.BIBLE_DESSINS = window.BIBLE_DESSINS || {};
  window.BIBLE_ICONES = window.BIBLE_ICONES || {};

  var STYLE_COURS =
    ".ltc-t{fill:var(--encre-2);font-size:16px;font-family:inherit}" +
    ".ltc-b{fill:var(--encre);font-size:17px;font-weight:700;font-family:inherit}" +
    ".ltc-p{fill:var(--discret);font-size:15px;font-family:inherit}" +
    ".ltc-tt{fill:var(--discret);font-size:12.5px;font-weight:700;letter-spacing:1.5px;font-family:inherit}" +
    ".ltc-g{fill:var(--encre);font-size:26px;font-weight:800;font-family:inherit}" +
    ".ltc-air,.ltc-ch,.ltc-fr{fill:none;stroke-width:5;stroke-linecap:round;stroke-dasharray:10 12;animation:ltc-flux 1.1s linear infinite}" +
    ".ltc-air{stroke:var(--s-air)}.ltc-ch{stroke:var(--danger)}.ltc-fr{stroke:var(--s-air)}" +
    "@keyframes ltc-flux{to{stroke-dashoffset:-22}}" +
    ".ltc-tube{fill:none;stroke:var(--s-gaine-bord);stroke-width:9;stroke-linecap:round}" +
    ".ltc-paroi{fill:var(--s-paroi);stroke:var(--encre-2);stroke-width:1.5}" +
    ".ltc-cadre{fill:var(--carte);stroke:var(--s-gaine-bord);stroke-width:2.5}" +
    ".ltc-boite{fill:var(--carte);stroke:var(--encre-2);stroke-width:2}" +
    ".ltc-gaine{fill:var(--s-gaine);stroke:var(--s-gaine-bord);stroke-width:2}" +
    ".ltc-rep{stroke:var(--discret);stroke-width:1.3}" +
    ".ltc-boutons{display:flex;gap:8px;flex-wrap:wrap;align-items:center;width:100%}";

  function ltcStyle() {
    if (document.getElementById("ltc-style")) return;
    var s = document.createElement("style");
    s.id = "ltc-style"; s.textContent = STYLE_COURS;
    document.head.appendChild(s);
  }
  function dessinSvg(h, aria, c) { return '<svg viewBox="0 0 560 ' + h + '" role="img" aria-label="' + aria + '">' + c + "</svg>"; }
  function tx(x, y, s, cls, ancre, id) {
    return '<text class="' + (cls || "ltc-t") + '" x="' + x + '" y="' + y + '"' + (ancre ? ' text-anchor="' + ancre + '"' : "") + (id ? ' id="' + id + '"' : "") + ">" + s + "</text>";
  }
  function fl(cls, d, id) { return '<path class="' + cls + '" d="' + (d || "") + '"' + (id ? ' id="' + id + '"' : "") + "/>"; }
  function rep(x1, y1, x2, y2, txt, ancre) { return '<path class="ltc-rep" d="M' + x1 + " " + y1 + "L" + x2 + " " + y2 + '"/>' + tx(x2 + (ancre === "end" ? -4 : 4), y2 + 5, txt, "ltc-p", ancre); }
  function flamme1(x, y, e) {
    return '<g transform="translate(' + x + " " + y + ") scale(" + (e || 1) + ')"><path fill="var(--danger)" d="M0 0C-16 0-20-16-12-28C-10-20-6-18-4-20C-8-32-2-44 6-50C4-38 14-32 16-20C18-8 12 0 0 0z"/><path fill="var(--s-chaud)" d="M0 0C-8 0-10-8-6-14C-4-10 0-10 0-14C4-10 8-6 6-2C5 0 3 0 0 0z"/></g>';
  }
  function plaques2(x, y, l, h) {
    var c = '<rect class="ltc-boite" x="' + x + '" y="' + y + '" width="' + l + '" height="' + h + '"/>';
    for (var i = 1; i < 6; i++) c += '<path d="M' + (x + i * l / 6) + " " + (y + 4) + "V" + (y + h - 4) + '" stroke="var(--encre-2)" stroke-width="2.5"/>';
    return c;
  }
  function monterCours(fn) {
    return function (el, ctx) {
      ltcStyle();
      el.innerHTML = '<div class="schema-cadre"></div><div class="schema-commandes"></div><p class="schema-note"></p>';
      var note = el.querySelector(".schema-note"), cmd = el.querySelector(".schema-commandes");
      fn(el.querySelector(".schema-cadre"), cmd, function (texte, s, ref) { note.innerHTML = texte + " " + ctx.badge(s, ref); });
      if (!cmd.children.length) cmd.parentNode.removeChild(cmd);
      if (!note.textContent) note.parentNode.removeChild(note);
    };
  }

  window.BIBLE_DESSINS.lt_quoi = monterCours(function (cadre) {
    function loc(x, y, l, h, nom, nom2) { return '<rect class="ltc-gaine" x="' + x + '" y="' + y + '" width="' + l + '" height="' + h + '"/>' + tx(x + l / 2, y + h / 2 + (nom2 ? -2 : 5), nom, "ltc-t", "middle") + (nom2 ? tx(x + l / 2, y + h / 2 + 18, nom2, "ltc-t", "middle") : ""); }
    cadre.innerHTML = dessinSvg(320, "Bâtiment en coupe : en toiture le traitement d'air et le groupe froid, en sous-sol la production de chaleur et le local électrique",
      '<rect class="ltc-cadre" x="60" y="70" width="440" height="160"/><path class="ltc-rep" d="M60 124H500M60 178H500"/>' +
      tx(280, 104, "bureaux, salles, circulations", "ltc-p", "middle") + tx(280, 158, "le public est ici", "ltc-p", "middle") + tx(280, 210, "et ici", "ltc-p", "middle") +
      loc(90, 16, 150, 54, "traitement d'air") + loc(320, 16, 150, 54, "groupe froid") +
      '<path d="M0 230H560" stroke="var(--encre-2)" stroke-width="4"/>' +
      '<rect class="ltc-paroi" x="60" y="230" width="440" height="80"/>' +
      loc(78, 240, 190, 60, "chaufferie ou", "sous-station") + loc(292, 240, 190, 60, "local électrique"));
  });

  window.BIBLE_ICONES.chaudiere = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><rect x="14" y="10" width="36" height="46"/><path fill="var(--s-chaud)" stroke="none" d="M32 48c-8 0-10-8-5-14 1 3 3 3 3 1-1-5 2-9 5-11-1 5 5 8 6 14 1 6-3 10-9 10z"/></svg>';
  window.BIBLE_ICONES.echange = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke-width="3"><rect x="20" y="10" width="24" height="44" stroke="var(--encre-2)"/><path d="M28 10v44M36 10v44" stroke="var(--encre-2)"/><path d="M4 20h16M20 44H4" stroke="var(--danger)"/><path d="M44 20h16M60 44H44" stroke="var(--s-air)"/></svg>';
  window.BIBLE_ICONES.eclair = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="var(--s-chaud)" stroke="var(--encre-2)" stroke-width="2"><path d="M36 6L14 36h14l-4 22 24-32H32z"/></svg>';
  window.BIBLE_ICONES.froid = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--s-air)" stroke-width="3" stroke-linecap="round"><path d="M32 8v48M11 20l42 24M53 20L11 44"/><path d="M26 12l6 6 6-6M26 52l6-6 6 6"/></svg>';
  window.BIBLE_ICONES.cta = '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><rect x="6" y="18" width="52" height="28"/><path d="M20 18v28M40 18v28"/><circle cx="30" cy="32" r="7"/><path stroke="var(--s-air)" d="M46 32h8"/></svg>';
  function ico_t(n) {
    return '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true" fill="none" stroke="var(--encre-2)" stroke-width="2.5"><path d="M26 10a6 6 0 0 1 12 0v28a12 12 0 1 1-12 0z"/><circle cx="32" cy="48" r="7" fill="var(--danger)" stroke="none"/><rect x="29.5" y="' + (40 - n * 7) + '" width="5" height="' + (n * 7 + 4) + '" fill="var(--danger)" stroke="none"/></svg>';
  }
  window.BIBLE_ICONES.t1 = ico_t(1);
  window.BIBLE_ICONES.t2 = ico_t(2);
  window.BIBLE_ICONES.t3 = ico_t(3);
  window.BIBLE_ICONES.t4 = ico_t(4);
  function ico_l(s) { return '<svg viewBox="0 0 64 64" width="56" height="56" aria-hidden="true"><rect x="8" y="8" width="48" height="48" rx="6" fill="none" stroke="var(--encre-2)" stroke-width="2.5"/><text x="32" y="44" text-anchor="middle" font-size="34" font-weight="800" fill="var(--encre)">' + s + "</text></svg>"; }
  window.BIBLE_ICONES.a = ico_l("a");
  window.BIBLE_ICONES.b = ico_l("b");
  window.BIBLE_ICONES.c = ico_l("c");

  window.BIBLE_DESSINS.lt_chaufferie = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(340, "Chaufferie en coupe : chaudière et flamme, fumées vers le haut, air entrant en bas et sortant en haut, coupures hors du local, parois coupe-feu 2 heures",
      '<rect class="ltc-paroi" x="60" y="30" width="400" height="14"/><rect class="ltc-paroi" x="60" y="290" width="400" height="14"/>' +
      '<rect class="ltc-paroi" x="60" y="44" width="14" height="246"/><rect class="ltc-paroi" x="446" y="44" width="14" height="136"/><rect class="ltc-paroi" x="446" y="250" width="14" height="40"/>' +
      '<rect class="ltc-boite" x="230" y="130" width="120" height="160"/>' + flamme1(290, 276, 1.1) +
      '<rect class="ltc-gaine" x="278" y="10" width="24" height="120"/>' + fl("ltc-ch", "M290 124V6") +
      fl("ltc-air", "M4 260H200") + fl("ltc-air", "M340 70H410V10") + '<rect x="60" y="248" width="14" height="24" fill="var(--carte)"/>' +
      '<path d="M446 180V250" stroke="var(--encre)" stroke-width="5"/><path d="M446 250l50-22" stroke="var(--encre)" stroke-width="4"/>' +
      '<rect x="490" y="50" width="56" height="44" rx="4" fill="var(--danger)"/>' + tx(518, 78, "OFF", "ltc-b", "middle") +
      tx(518, 114, "coupures", "ltc-p", "middle") + tx(518, 134, "dehors", "ltc-p", "middle") + tx(510, 272, "porte", "ltc-p", "middle") +
      tx(80, 248, "air", "ltc-p") + tx(350, 60, "air", "ltc-p") + tx(308, 24, "fumées", "ltc-p") +
      tx(80, 110, "parois et", "ltc-t") + tx(80, 130, "plancher", "ltc-t") + tx(80, 150, "coupe-feu 2 h", "ltc-b") + tx(290, 326, "chaudière", "ltc-p", "middle"));
  });

  window.BIBLE_DESSINS.lt_reseau = monterCours(function (cadre) {
    function immeuble(x) {
      return '<rect class="ltc-cadre" x="' + x + '" y="30" width="96" height="110"/><rect class="ltc-boite" x="' + (x + 28) + '" y="146" width="40" height="30"/>' +
        fl("ltc-ch", "M" + (x + 40) + " 146V60") + fl("ltc-fr", "M" + (x + 56) + " 60V146") + tx(x + 48, 24, "immeuble", "ltc-p", "middle");
    }
    cadre.innerHTML = dessinSvg(310, "Réseau de chaleur : une production, un primaire aller et retour, des sous-stations, et le secondaire dans chaque immeuble",
      '<path d="M0 142H560" stroke="var(--encre-2)" stroke-width="3"/>' +
      immeuble(240) + immeuble(420) +
      '<rect class="ltc-boite" x="20" y="60" width="120" height="82"/>' + flamme1(80, 134, 0.8) + tx(80, 54, "production", "ltc-b", "middle") +
      fl("ltc-ch", "M80 142V210H448V178") + fl("ltc-ch", "M268 210V178") + fl("ltc-fr", "M464 178V240H100V142") + fl("ltc-fr", "M284 178V240") +
      tx(280, 268, "primaire : aller chaud, retour refroidi", "ltc-t", "middle") +
      rep(266, 160, 206, 164, "sous-station", "end") + rep(296, 100, 346, 88, "secondaire") + tx(280, 298, "l'échangeur sépare les deux", "ltc-p", "middle"));
  });

  window.BIBLE_DESSINS.lt_echangeur = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(310, "Échangeur de sous-station : à gauche le primaire chaud entre et ressort refroidi, à droite le secondaire froid entre et ressort chaud, sans se mélanger",
      tx(90, 28, "PRIMAIRE", "ltc-tt", "middle") + tx(470, 28, "SECONDAIRE", "ltc-tt", "middle") + tx(280, 28, "ÉCHANGEUR", "ltc-tt", "middle") +
      '<path class="ltc-tube" d="M20 80H210M20 200H210M350 80H540M350 200H540"/>' +
      plaques2(210, 46, 140, 188) +
      fl("ltc-ch", "M24 80H204") + fl("ltc-fr", "M204 200H24") + fl("ltc-ch", "M356 80H536") + fl("ltc-fr", "M536 200H356") +
      tx(100, 66, "arrive chaud", "ltc-p", "middle") + tx(100, 232, "repart refroidi", "ltc-p", "middle") + tx(450, 66, "repart chaud", "ltc-p", "middle") + tx(450, 232, "arrive refroidi", "ltc-p", "middle") +
      '<circle cx="130" cy="150" r="22" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2.5"/>' + tx(130, 156, "kWh", "ltc-p", "middle") + '<path class="ltc-rep" d="M130 172V192"/>' +
      tx(40, 120, "compteur", "ltc-p") +
      tx(280, 270, "les eaux ne se touchent jamais", "ltc-b", "middle") + tx(280, 296, "la chaleur passe à travers les plaques", "ltc-p", "middle"));
  });

  window.BIBLE_DESSINS.lt_elec = monterCours(function (cadre) {
    function bloc(x, l, a, b, acc) { return '<rect x="' + x + '" y="88" width="' + l + '" height="84" rx="6" fill="var(--carte)" stroke="' + (acc ? "var(--accent)" : "var(--encre-2)") + '" stroke-width="' + (acc ? 3 : 2) + '"/>' + tx(x + l / 2, 124, a, "ltc-b", "middle") + tx(x + l / 2, 150, b, "ltc-p", "middle"); }
    cadre.innerHTML = dessinSvg(250, "Chemin de l'électricité : réseau du distributeur, poste de transformation, TGBT, tableaux des étages",
      bloc(16, 110, "Réseau", "haute tension") + bloc(158, 110, "Poste", "il transforme") + bloc(300, 110, "TGBT", "il distribue", 1) + bloc(442, 106, "Tableaux", "des étages") +
      fl("ltc-ch", "M126 130H156") + fl("ltc-ch", "M268 130H298") + fl("ltc-ch", "M410 130H440") +
      tx(213, 60, "haute tension en entrée", "ltc-p", "middle") + tx(355, 60, "basse tension", "ltc-p", "middle") +
      '<path class="ltc-rep" d="M213 66V86M355 66V86"/>' + tx(280, 214, "chaque local a son isolement selon ses matériels", "ltc-t", "middle"));
  });

  window.BIBLE_DESSINS.lt_froid = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(330, "Salle des machines en coupe : groupe froid, fuite qui s'étale au sol, détecteur en point bas, deux orifices vers l'extérieur à des hauteurs différentes",
      '<rect class="ltc-paroi" x="40" y="26" width="440" height="14"/><rect class="ltc-paroi" x="40" y="280" width="440" height="14"/><rect class="ltc-paroi" x="40" y="40" width="14" height="240"/>' +
      '<rect class="ltc-paroi" x="466" y="40" width="14" height="40"/><rect class="ltc-paroi" x="466" y="108" width="14" height="110"/><rect class="ltc-paroi" x="466" y="246" width="14" height="34"/>' +
      '<rect class="ltc-boite" x="130" y="130" width="170" height="130"/><rect x="178" y="260" width="22" height="20" fill="var(--s-gaine-bord)"/>' + tx(215, 194, "groupe froid", "ltc-t", "middle") +
      '<path d="M180 276H440" stroke="var(--s-chaud)" stroke-width="8" stroke-linecap="round" stroke-dasharray="4 10"/>' +
      '<circle cx="430" cy="258" r="12" fill="var(--carte)" stroke="var(--danger)" stroke-width="3"/><path d="M430 250v8" stroke="var(--danger)" stroke-width="3"/>' +
      fl("ltc-air", "M380 94H540") + fl("ltc-air", "M540 232H390") +
      rep(466, 80, 432, 62, "orifice haut", "end") + rep(466, 220, 432, 170, "orifice bas", "end") +
      rep(420, 258, 380, 200, "détecteur", "end") + tx(310, 314, "une fuite peut s'étaler au ras du sol", "ltc-p", "middle"));
  });

  window.BIBLE_DESSINS.lt_risques = monterCours(function (cadre) {
    function col(x, nom, ep, p1, p2, p3) {
      return tx(x + 80, 30, nom, "ltc-b", "middle") + '<rect class="ltc-gaine" x="' + (x + 30) + '" y="50" width="100" height="100"/>' +
        (ep ? '<rect x="' + (x + 30) + '" y="50" width="100" height="100" fill="none" stroke="var(--danger)" stroke-width="' + ep + '"/>' : "") +
        tx(x + 80, 186, p1, "ltc-t", "middle") + tx(x + 80, 212, p2, "ltc-p", "middle") + tx(x + 80, 234, p3, "ltc-p", "middle");
    }
    cadre.innerHTML = dessinSvg(250, "Trois niveaux de risque : importants avec une paroi très épaisse, moyens avec une paroi plus fine, courants sans isolement particulier",
      col(10, "Importants", 14, "coupe-feu 2 h", "communication 1 h", "avec ferme-porte") +
      col(195, "Moyens", 7, "coupe-feu 1 h", "porte 1/2 h", "avec ferme-porte") +
      col(380, "Courants", 0, "rien de particulier", "", ""));
  });

  window.BIBLE_DESSINS.lt_traversees = monterCours(function (cadre) {
    cadre.innerHTML = dessinSvg(320, "Paroi coupe-feu vue en coupe, traversée par une gaine avec clapet, et un tuyau avec rebouchage ; une porte avec ferme-porte",
      '<rect class="ltc-paroi" x="256" y="20" width="44" height="280"/>' +
      tx(120, 36, "local à risques", "ltc-b", "middle") + tx(440, 36, "le reste du bâtiment", "ltc-b", "middle") +
      '<rect class="ltc-gaine" x="60" y="66" width="440" height="52"/><rect x="240" y="62" width="76" height="60" fill="var(--s-gaine)" stroke="var(--encre-2)" stroke-width="3"/>' +
      '<path d="M278 66V118" stroke="var(--danger)" stroke-width="6"/>' + rep(316, 92, 356, 142, "clapet") +
      '<path class="ltc-tube" d="M60 186H500"/><rect x="256" y="172" width="44" height="28" fill="var(--s-chaud)" fill-opacity=".8"/>' + rep(290, 200, 356, 222, "rebouchage") + tx(100, 174, "tuyau", "ltc-p") +
      '<rect x="256" y="240" width="44" height="60" fill="var(--carte)" stroke="var(--encre)" stroke-width="2.5"/>' + '<path d="M278 240l-56-26" stroke="var(--encre-2)" stroke-width="3"/>' +
      tx(214, 236, "ferme-porte", "ltc-p", "end") + rep(256, 280, 190, 280, "porte coupe-feu", "end") +
      '<path d="M0 300H560" stroke="var(--encre-2)" stroke-width="3"/>');
  });

  window.BIBLE_DESSINS.lt_air_eau = monterCours(function (cadre, commandes, dire) {
    cadre.innerHTML = dessinSvg(320, "Local technique en coupe : l'air entre en bas et sort en haut, un seuil et un puisard retiennent l'eau",
      '<rect class="ltc-paroi" x="50" y="20" width="460" height="14"/><rect class="ltc-paroi" x="50" y="34" width="14" height="30"/><rect class="ltc-paroi" x="50" y="100" width="14" height="110"/><rect class="ltc-paroi" x="50" y="246" width="14" height="30"/>' +
      '<rect class="ltc-paroi" x="496" y="34" width="14" height="242"/><rect class="ltc-paroi" x="50" y="276" width="460" height="14"/>' +
      '<g id="lt-a-ch">' + '<rect class="ltc-boite" x="210" y="130" width="130" height="146"/>' + flamme1(275, 268, 1) + '<rect class="ltc-gaine" x="264" y="34" width="22" height="96"/>' + tx(275, 118, "chaudière", "ltc-p", "middle") + "</g>" +
      '<g id="lt-a-ss">' + plaques2(210, 146, 130, 110) + '<path d="M210 256H340" stroke="none"/>' + tx(275, 134, "échangeur", "ltc-p", "middle") + "</g>" +
      fl("ltc-air", "M0 228H180") + fl("ltc-air", "M170 82H0") + tx(80, 218, "air qui entre", "ltc-p") + tx(80, 72, "air qui sort", "ltc-p") +
      '<rect x="64" y="262" width="432" height="14" fill="var(--s-air)" fill-opacity=".5"/>' + '<path d="M410 276v-24" stroke="var(--encre-2)" stroke-width="5"/>' +
      '<rect x="424" y="276" width="52" height="36" fill="var(--s-air)" fill-opacity=".55" stroke="var(--encre-2)" stroke-width="2"/>' +
      rep(410, 252, 424, 206, "seuil") + tx(428, 230, "0,15 m", "ltc-p") + rep(424, 296, 396, 308, "puisard", "end"));
    commandes.innerHTML = '<div class="ltc-boutons"><button class="bouton" type="button" data-m="ch">Chaufferie</button><button class="bouton" type="button" data-m="ss">Sous-station</button></div>';
    function choisir(m) {
      cadre.querySelector("#lt-a-ch").style.display = m === "ch" ? "" : "none";
      cadre.querySelector("#lt-a-ss").style.display = m === "ss" ? "" : "none";
      Array.prototype.forEach.call(commandes.querySelectorAll("button"), function (b) { b.classList.toggle("actif", b.getAttribute("data-m") === m); });
      if (m === "ch") dire("Une chaufferie consomme de l'air pour brûler : ventilation basse et haute.", "texte", "arrêté du 23 juin 1978, titre I");
      else dire("Une sous-station ne brûle rien : sa ventilation sert à limiter la température du local.", "texte", "arrêté du 23 juin 1978, articles 27 et 28");
    }
    commandes.addEventListener("click", function (e) { var b = e.target.closest("button[data-m]"); if (b) choisir(b.getAttribute("data-m")); });
    choisir("ss");
  });

  window.BIBLE_DESSINS.lt_soussol = monterCours(function (cadre, commandes, dire) {
    cadre.innerHTML = dessinSvg(320, "Sous-station en sous-sol : selon la température du primaire, l'accès se fait par l'intérieur ou directement par l'extérieur",
      '<path d="M0 110H560" stroke="var(--encre-2)" stroke-width="4"/><rect class="ltc-cadre" x="180" y="20" width="340" height="90"/>' + tx(350, 72, "le bâtiment", "ltc-p", "middle") +
      '<rect class="ltc-paroi" x="170" y="110" width="360" height="14"/><rect class="ltc-paroi" x="170" y="290" width="360" height="14"/><rect class="ltc-paroi" x="170" y="124" width="14" height="166"/><rect class="ltc-paroi" x="516" y="124" width="14" height="166"/>' +
      plaques2(330, 180, 120, 110) + tx(390, 168, "échangeur", "ltc-p", "middle") +
      '<g id="lt-s-ext"><path d="M70 110L170 240H184" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/><path d="M58 110h26M92 142h26M122 180h26" stroke="var(--encre-2)" stroke-width="3"/>' + tx(70, 96, "accès direct", "ltc-b", "middle") +
      '<rect x="20" y="30" width="44" height="44" rx="4" fill="var(--danger)"/>' + tx(42, 58, "OFF", "ltc-b", "middle") + tx(72, 58, "coupures", "ltc-p") + "</g>" +
      '<g id="lt-s-int"><path d="M240 110V200" stroke="var(--accent)" stroke-width="5" stroke-linecap="round"/><path d="M224 136h32M224 160h32M224 184h32" stroke="var(--encre-2)" stroke-width="3"/>' + tx(240, 94, "accès par l'intérieur", "ltc-b", "middle") + "</g>" +
      fl("ltc-tube", "M0 200H184") + fl("ltc-ch", "", "lt-s-p") + '<path d="M184 200H330" fill="none" stroke="var(--s-gaine-bord)" stroke-width="9"/>' + fl("ltc-ch", "M190 200H326") +
      tx(70, 226, "primaire", "ltc-p", "middle"));
    commandes.innerHTML = '<div class="ltc-boutons"><button class="bouton" type="button" data-m="bas">Eau chaude, 110 °C au plus</button><button class="bouton" type="button" data-m="haut">Plus de 110 °C, ou vapeur</button></div>';
    function choisir(m) {
      var haut = m === "haut";
      cadre.querySelector("#lt-s-ext").style.display = haut ? "" : "none";
      cadre.querySelector("#lt-s-int").style.display = haut ? "none" : "";
      cadre.querySelector("#lt-s-p").setAttribute("d", "M6 200H178");
      Array.prototype.forEach.call(commandes.querySelectorAll("button"), function (b) { b.classList.toggle("actif", b.getAttribute("data-m") === m); });
      if (haut) dire("Accès direct par l'extérieur, et coupures du primaire et de l'électricité depuis dehors.", "texte", "arrêté du 23 juin 1978, articles 22 et 29");
      else dire("L'accès par l'intérieur reste possible : il n'est pas imposé par l'extérieur à cette température.", "expert", "Cerema, guide de raccordement des copropriétés aux réseaux de chaleur, juillet 2019, paragraphe 4.1.2");
    }
    commandes.addEventListener("click", function (e) { var b = e.target.closest("button[data-m]"); if (b) choisir(b.getAttribute("data-m")); });
    choisir("bas");
  });

  window.BIBLE_DESSINS.lt_exemple = monterCours(function (cadre) {
    function ligne(n, y, q, r, dernier) {
      return '<circle cx="34" cy="' + y + '" r="16" fill="var(--carte)" stroke="var(--encre-2)" stroke-width="2"/>' + tx(34, y + 5, n, "ltc-b", "middle") +
        tx(62, y + 5, q, "ltc-t") + tx(530, y + 5, r, "ltc-b", "end") + (dernier ? "" : '<path class="ltc-rep" d="M34 ' + (y + 16) + "V" + (y + 34) + '"/>');
    }
    cadre.innerHTML = dessinSvg(300, "Les questions de l'exemple : nom du local, puissance, température, ventilation, degré coupe-feu",
      ligne(1, 30, "Une flamme ?", "non : sous-station") + ligne(2, 80, "Plus de 70 kW ?", "oui : titre II") + ligne(3, 130, "Plus de 110 °C ?", "non") +
      ligne(4, 180, "Degré coupe-feu ?", "à décider, à écrire") + ligne(5, 230, "Limite du réseau ?", "à écrire", 1) +
      tx(280, 286, "dans le CCTP et la notice de sécurité", "ltc-p", "middle"));
  });
})();
