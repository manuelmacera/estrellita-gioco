window.GEO = {
  "ui": {
    "ok": ["Giusto!", "Bravissima!", "Perfetto!", "Esatto!", "Sì, brava!"],
    "retry": ["Riprova!", "Quasi! Prova ancora.", "Non è qui. Riprova!"],
    "done": ["Fantastico! Hai finito!", "Che brava! Gioco completato!"],
    "pairDone": "Bene! Ora la coppia successiva."
  },
  "intro": {
    "home": "Ciao! Sono Rondì, la rondine. Volo sopra il mare, la montagna e la pianura. Scegli un gioco!",
    "coppie": "Trascina la parola e la definizione sotto la figura giusta.",
    "completa": "Quale parola manca nella definizione? Trascinala nello spazio vuoto.",
    "montagna": "Metti i cartellini al posto giusto sulla montagna.",
    "mare": "Metti i cartellini al posto giusto sulla cartina del mare.",
    "italia": "Dove sono le Alpi, gli Appennini e la Pianura Padana?",
    "profilo": "Viaggiamo dal nord al sud: cosa incontriamo?",
    "citta": "Questa frase parla della città o della campagna? Trascinala nella figura giusta.",
    "righe": "In quale paesaggio li trovi? Trascina ogni carta nella colonna giusta.",
    "tabella": "Ora completa la tabella, come nel compito!"
  },
  "pairs": [
    { "tip": "Il golfo è grande, la baia è piccola. Tutti e due sono insenature del mare.",
      "a": { "w": "Golfo", "art": "golfo", "d": "GRANDE INSENATURA DEL MARE", "q": "___ INSENATURA DEL MARE", "ans": "GRANDE", "opts": ["GRANDE", "PICCOLA", "ALTA"] },
      "b": { "w": "Baia", "art": "baia", "d": "PICCOLA INSENATURA DEL MARE", "q": "___ INSENATURA DEL MARE", "ans": "PICCOLA", "opts": ["PICCOLA", "GRANDE", "ALTA"] } },
    { "tip": "L'isola ha il mare tutto intorno. La penisola ha il mare su tre lati: l'Italia è una penisola!",
      "a": { "w": "Isola", "art": "isola", "d": "PORZIONE DI TERRA CIRCONDATA DAL MARE SU TUTTI I LATI", "q": "PORZIONE DI TERRA CIRCONDATA DAL MARE SU ___ LATI", "ans": "TUTTI I", "opts": ["TUTTI I", "3", "2"] },
      "b": { "w": "Penisola", "art": "penisola", "d": "TERRA CIRCONDATA DAL MARE SU 3 LATI", "q": "TERRA CIRCONDATA DAL MARE SU ___ LATI", "ans": "3", "opts": ["3", "TUTTI I", "2"] } },
    { "tip": "La spiaggia è bassa, con sabbia o sassolini. La scogliera è alta e fatta di roccia.",
      "a": { "w": "Spiaggia", "art": "spiaggia", "d": "PARTE DI COSTA CON SABBIA O CIOTTOLI", "q": "PARTE DI COSTA CON ___", "ans": "SABBIA O CIOTTOLI", "opts": ["SABBIA O CIOTTOLI", "ROCCE ALTE", "GHIACCIO"] },
      "b": { "w": "Scogliera", "art": "scogliera", "d": "COSTA ALTA E ROCCIOSA", "q": "COSTA ___", "ans": "ALTA E ROCCIOSA", "opts": ["ALTA E ROCCIOSA", "BASSA E SABBIOSA", "PIATTA E VERDE"] } },
    { "tip": "La costa corre lungo il mare. Il promontorio è un pezzo di terra che entra nel mare.",
      "a": { "w": "Costa", "art": "costa", "d": "PARTE DI TERRA CHE SI TROVA LUNGO IL MARE", "q": "PARTE DI TERRA CHE SI TROVA ___ MARE", "ans": "LUNGO IL", "opts": ["LUNGO IL", "IN MEZZO AL", "SOTTO IL"] },
      "b": { "w": "Promontorio", "art": "promontorio", "d": "PARTE DI TERRA CHE AVANZA NEL MARE", "q": "PARTE DI TERRA CHE ___ NEL MARE", "ans": "AVANZA", "opts": ["AVANZA", "GALLEGGIA", "SI SCIOGLIE"] } },
    { "tip": "La cima, o vetta, è il punto più alto. Il piede è il punto più basso della montagna.",
      "a": { "w": "Cima", "art": "cima", "d": "IL PUNTO PIÙ ALTO DELLA MONTAGNA", "q": "IL PUNTO PIÙ ___ DELLA MONTAGNA", "ans": "ALTO", "opts": ["ALTO", "BASSO", "LARGO"] },
      "b": { "w": "Piede", "art": "piede", "d": "IL PUNTO PIÙ BASSO DELLA MONTAGNA", "q": "IL PUNTO PIÙ ___ DELLA MONTAGNA", "ans": "BASSO", "opts": ["BASSO", "ALTO", "LARGO"] } },
    { "tip": "Il versante, o pendio, è il fianco della montagna. Il passo, o valico, è il punto basso tra le montagne dove si può passare.",
      "a": { "w": "Versante", "art": "versante", "d": "IL FIANCO DELLA MONTAGNA", "q": "IL ___ DELLA MONTAGNA", "ans": "FIANCO", "opts": ["FIANCO", "PIEDE", "CAPPELLO"] },
      "b": { "w": "Passo", "art": "passo", "d": "IL PUNTO PIÙ BASSO DI UNA CATENA, DOVE SI PUÒ PASSARE", "q": "IL PUNTO PIÙ BASSO DI UNA CATENA, DOVE SI PUÒ ___", "ans": "PASSARE", "opts": ["PASSARE", "NUOTARE", "PESCARE"] } },
    { "tip": "Il mare è una distesa di acqua salata. Il ghiacciaio è una distesa di ghiaccio in alta montagna.",
      "a": { "w": "Mare", "art": "mare", "d": "GRANDE DISTESA DI ACQUA SALATA", "q": "GRANDE DISTESA DI ___", "ans": "ACQUA SALATA", "opts": ["ACQUA SALATA", "GHIACCIO", "TERRA PIATTA"] },
      "b": { "w": "Ghiacciaio", "art": "ghiacciaio", "d": "DISTESA DI GHIACCIO DOVE LA NEVE NON SI SCIOGLIE", "q": "DISTESA DI ___ DOVE LA NEVE NON SI SCIOGLIE", "ans": "GHIACCIO", "opts": ["GHIACCIO", "ACQUA SALATA", "TERRA PIATTA"] } },
    { "tip": "La pianura è una grande distesa di terra piatta. Anche la valle è piatta, ma sta tra due montagne.",
      "a": { "w": "Pianura", "art": "pianura", "d": "GRANDE DISTESA DI TERRA PIATTA", "q": "GRANDE DISTESA DI ___", "ans": "TERRA PIATTA", "opts": ["TERRA PIATTA", "ACQUA SALATA", "GHIACCIO"] },
      "b": { "w": "Valle", "art": "valle", "d": "ZONA PIANEGGIANTE TRA DUE MONTAGNE", "q": "ZONA PIANEGGIANTE ___", "ans": "TRA DUE MONTAGNE", "opts": ["TRA DUE MONTAGNE", "IN MEZZO AL MARE", "IN CIMA AL MONTE"] } }
  ],
  "scenes": {
    "montagna": { "art": "MONT", "w": 800, "h": 500, "title": "La montagna",
      "levels": ["Come nel compito", "Con il piede"],
      "slots": [
        { "ans": ["CIMA"], "a": [420, 62], "l": [545, 34] },
        { "ans": ["GHIACCIAIO"], "a": [478, 172], "l": [665, 66] },
        { "ans": ["VERSANTE"], "a": [362, 236], "l": [262, 186] },
        { "ans": ["PASSO", "VALICO"], "a": [290, 312], "l": [100, 296] },
        { "ans": ["PASSO", "VALICO"], "a": [567, 306], "l": [700, 334] },
        { "ans": ["VALLE"], "a": [330, 462], "l": [580, 476] },
        { "ans": ["PIEDE"], "a": [238, 420], "l": [110, 400], "level": 2 }
      ],
      "note": "Passo e valico vogliono dire la stessa cosa: il punto più basso tra due montagne, dove si può passare." },
    "mare": { "art": "MARE", "w": 800, "h": 500, "title": "Il mare",
      "levels": ["Golfo, baia, isola, penisola", "Tutte le parole"],
      "slots": [
        { "ans": ["GOLFO"], "a": [250, 222], "l": [440, 215] },
        { "ans": ["BAIA"], "a": [448, 446], "l": [300, 472] },
        { "ans": ["ISOLA"], "a": [650, 150], "l": [700, 76] },
        { "ans": ["PENISOLA"], "a": [530, 348], "l": [660, 280] },
        { "ans": ["PROMONTORIO"], "a": [420, 84], "l": [590, 36], "level": 2 },
        { "ans": ["SCOGLIERA"], "a": [330, 47], "l": [150, 30], "level": 2 },
        { "ans": ["SPIAGGIA"], "a": [196, 262], "l": [86, 340], "level": 2 },
        { "ans": ["COSTA"], "a": [640, 440], "l": [700, 400], "level": 2 }
      ] },
    "italia": { "art": "ITALIA", "w": 570, "h": 660, "title": "L'Italia",
      "levels": ["Montagne e pianura", "Anche i mari"],
      "slots": [
        { "ans": ["ALPI"], "a": [126, 70], "l": [80, 28] },
        { "ans": ["APPENNINI"], "a": [340, 322], "l": [250, 415] },
        { "ans": ["PIANURA PADANA"], "a": [182, 140], "l": [445, 150] },
        { "ans": ["DOLOMITI"], "a": [258, 56], "l": [430, 30] },
        { "ans": ["MAR LIGURE"], "a": [95, 250], "l": [95, 250], "level": 2 },
        { "ans": ["MAR TIRRENO"], "a": [250, 485], "l": [250, 485], "level": 2 },
        { "ans": ["MAR ADRIATICO"], "a": [420, 268], "l": [420, 268], "level": 2 },
        { "ans": ["MAR IONIO"], "a": [505, 545], "l": [505, 545], "level": 2 }
      ],
      "note": "La Pianura Padana sta in mezzo: le Alpi a nord, gli Appennini a sud. È la pianura più grande d'Italia." },
    "profilo": { "art": "PROFILO", "w": 800, "h": 400, "title": "Dal nord al sud",
      "slots": [
        { "ans": ["ALPI"], "a": [150, 170], "l": [150, 40] },
        { "ans": ["PIANURA PADANA"], "a": [400, 330], "l": [400, 245] },
        { "ans": ["APPENNINI"], "a": [610, 215], "l": [590, 120] },
        { "ans": ["MARE"], "a": [760, 360], "l": [735, 270] }
      ],
      "note": "Prima le Alpi, alte e con la neve. Poi la Pianura Padana, piatta. Poi gli Appennini, più bassi. E infine il mare!" }
  },
  "citta": {
    "bins": [
      { "id": "citta", "t": "La città", "s": "vita urbana" },
      { "id": "campagna", "t": "La campagna", "s": "vita rurale" }
    ],
    "cards": [
      { "t": "Manca il verde", "c": "citta" },
      { "t": "Traffico intenso e caotico", "c": "citta" },
      { "t": "Rischi di inquinamento", "c": "citta" },
      { "t": "Centri di divertimento", "c": "citta" },
      { "t": "Opportunità di lavoro", "c": "citta" },
      { "t": "Offre tanti servizi ai suoi abitanti", "c": "citta" },
      { "t": "Grandi vie di comunicazione e centri industriali", "c": "citta" },
      { "t": "Vi sono sviluppati allevamento e agricoltura", "c": "campagna" },
      { "t": "Riforniscono di materie prime i centri abitati", "c": "campagna" },
      { "t": "Paesini circondati da campi agricoli", "c": "campagna" },
      { "t": "Tanto verde e aria più pulita", "c": "campagna" },
      { "t": "Vita tranquilla, poco traffico", "c": "campagna" },
      { "t": "Meno servizi e meno negozi", "c": "campagna" }
    ],
    "tip": "In città ci sono lavoro, servizi e divertimento, ma anche traffico e inquinamento. In campagna ci sono agricoltura e allevamento, che danno le materie prime alle città."
  },
  "landscapes": [
    { "id": "montagna", "t": "Montagna", "art": "cima" },
    { "id": "pianura", "t": "Pianura", "art": "pianura" },
    { "id": "mare", "t": "Mare", "art": "mare" }
  ],
  "rows": [
    { "id": "animale", "t": "Animali", "cell": "Animale", "say": "Animali: dove vivono?", "items": [
      { "t": "Volpe", "e": "🦊", "c": "montagna" }, { "t": "Cervo", "e": "🦌", "c": "montagna" }, { "t": "Aquila reale", "e": "🦅", "c": "montagna" },
      { "t": "Stambecco", "e": "🐐", "c": "montagna" }, { "t": "Marmotta", "c": "montagna" }, { "t": "Camoscio", "c": "montagna" },
      { "t": "Lepre", "e": "🐇", "c": "pianura" }, { "t": "Rana di Lataste", "e": "🐸", "c": "pianura" }, { "t": "Zanzara", "e": "🦟", "c": "pianura" },
      { "t": "Biacco (serpente)", "e": "🐍", "c": "pianura" }, { "t": "Airone", "c": "pianura" },
      { "t": "Calamaro", "e": "🦑", "c": "mare" }, { "t": "Delfino", "e": "🐬", "c": "mare" }, { "t": "Polpo", "e": "🐙", "c": "mare" },
      { "t": "Medusa", "c": "mare" }, { "t": "Tartaruga marina", "e": "🐢", "c": "mare" }, { "t": "Pesci: sardine, tonni, orate", "e": "🐟", "c": "mare" }
    ] },
    { "id": "pianta", "t": "Piante", "cell": "Pianta", "say": "Piante: dove crescono?", "items": [
      { "t": "Genziana", "e": "🪻", "c": "montagna" }, { "t": "Stella alpina", "c": "montagna" }, { "t": "Rododendro", "e": "🌺", "c": "montagna" },
      { "t": "Abete", "e": "🌲", "c": "montagna" }, { "t": "Larice", "c": "montagna" },
      { "t": "Olmo", "e": "🌳", "c": "pianura" }, { "t": "Riso", "e": "🍚", "c": "pianura" }, { "t": "Grano", "e": "🌾", "c": "pianura" },
      { "t": "Cipresso", "c": "pianura" }, { "t": "Salice piangente", "c": "pianura" },
      { "t": "Alghe", "e": "🌿", "c": "mare" }, { "t": "Posidonia", "c": "mare" }, { "t": "Coralli", "e": "🪸", "c": "mare" }
    ] },
    { "id": "piatto", "t": "Piatti tipici", "cell": "Piatto tipico", "say": "Piatti tipici: dove si mangiano?", "items": [
      { "t": "Canederli", "e": "🥣", "c": "montagna" }, { "t": "Casunziei", "e": "🥟", "c": "montagna" }, { "t": "Spätzle", "c": "montagna" },
      { "t": "Strudel di mele", "e": "🍎", "c": "montagna" }, { "t": "Torta di mele", "e": "🥧", "c": "montagna" },
      { "t": "Polenta con salame", "c": "pianura" }, { "t": "Risotto alla milanese", "c": "pianura" }, { "t": "Cotoletta alla milanese", "c": "pianura" },
      { "t": "Torta sbrisolona", "e": "🍪", "c": "pianura" },
      { "t": "Calamari fritti", "e": "🦑", "c": "mare" }, { "t": "Spaghetti alle vongole", "e": "🍝", "c": "mare" }, { "t": "Pesce alla griglia", "e": "🐟", "c": "mare" },
      { "t": "Zuppa di pesce", "e": "🍲", "c": "mare" }, { "t": "Risotto ai frutti di mare", "e": "🦐", "c": "mare" }, { "t": "Cozze e fagioli", "e": "🦪", "c": "mare" }
    ] },
    { "id": "attivita", "t": "Attività", "cell": "Attività", "say": "Attività: dove si fanno?", "items": [
      { "t": "Sci", "e": "⛷️", "c": "montagna" }, { "t": "Arrampicata", "e": "🧗", "c": "montagna" }, { "t": "Camminata", "e": "🥾", "c": "montagna" },
      { "t": "Campeggio", "e": "⛺", "c": "montagna" }, { "t": "Guida alpina", "e": "🧭", "c": "montagna" }, { "t": "Maestro di sci", "e": "🎿", "c": "montagna" },
      { "t": "Agricoltura: mais, grano, riso", "e": "🚜", "c": "pianura" }, { "t": "Allevamento di mucche, maiali, polli", "e": "🐄", "c": "pianura" },
      { "t": "Industrie e commercio", "e": "🏭", "c": "pianura" }, { "t": "Bonifica e canali", "c": "pianura" },
      { "t": "Nuoto", "e": "🏊", "c": "mare" }, { "t": "Vela", "e": "⛵", "c": "mare" }, { "t": "Snorkeling e immersioni", "e": "🤿", "c": "mare" },
      { "t": "Relax in spiaggia", "e": "🏖️", "c": "mare" }, { "t": "Trasporto marittimo", "e": "🚢", "c": "mare" }, { "t": "Acquacoltura", "c": "mare" }
    ] }
  ]
};
