class Contenitore {
    constructor(codice, descrizione) {
        this.codice = codice;
        this.descrizione = descrizione;
    }
}

class ContenitoreLiquido extends Contenitore {
    constructor(codice, descrizione, capacitaLitri, tipoSigillo) {
        super(codice, descrizione);
        this.capacitaLitri = capacitaLitri;
        this.tipoSigillo = tipoSigillo;
    }
}

class ContenitoreSolido extends Contenitore {
    constructor(codice, descrizione, capacitaMassimaKg) {
        super(codice, descrizione);
        this.capacitaMassimaKg = capacitaMassimaKg;
    }
}

class ContenitoreRifiutiSpeciali extends Contenitore {
    constructor(codice, descrizione, capacita, livelloRadioattivita) {
        super(codice, descrizione);
        this.capacita = capacita;
        this.livelloRadioattivita = livelloRadioattivita;
    }
}

class Piazzola {
    constructor(numero) {
        this.numero = numero;
        this.contenitori = [];
    }

    aggiungiContenitore(contenitore) {
        this.contenitori.push(contenitore);
    }

    rimuoviContenitore(codiceContenitore) {
        for (let i = 0; i < this.contenitori.length; i++) {
          if (this.contenitori[i].codice === codiceContenitore) {
            this.contenitori.splice(i, 1); // Rimuovo l'opposito contenitore
            break;
          }
        }
    }
      

    haSpazioPerContenitore() {
        return this.contenitori.length < 5;
    }

    haContenitore(codiceContenitore) {
        for (let i = 0; i < this.contenitori.length; i++) {
            if (this.contenitori[i].codice === codiceContenitore) {
                return true;
            }
        }
        return false;
    }
}

class Deposito {
    constructor() {
        this.piazzole = [];
    }

    aggiungiPiazzola(piazzola) {
        this.piazzole.push(piazzola);
    }

    trovaPiazzolaDisponibile() {
        for (let piazzola of this.piazzole) {
            if (piazzola.haSpazioPerContenitore()) {
                return piazzola.numero;
            }
        }
        return -1; // Nessuna piazzola disponibile
    }

    trovaPiazzolaDaCodiceContenitore(codiceContenitore) {
        for (let piazzola of this.piazzole) {
            if (piazzola.haContenitore(codiceContenitore)) {
                return piazzola.numero;
            }
        }
        return -1; // Contenitore non trovato in nessuna piazzola
    }
}


const contenitore1 = new ContenitoreLiquido(1, "Contenitore per liquidi", 1000, "Ermertico");
const contenitore2 = new ContenitoreSolido(2, "Contenitore per solidi", 500);
const contenitore3 = new ContenitoreRifiutiSpeciali(3, "Contenitore per rifiuti speciali", 200, "Alto");

const deposito = new Deposito();
const piazzola1 = new Piazzola(1);
const piazzola2 = new Piazzola(2);
deposito.aggiungiPiazzola(piazzola1);
deposito.aggiungiPiazzola(piazzola2);

piazzola1.aggiungiContenitore(contenitore1);
piazzola1.aggiungiContenitore(contenitore2);
piazzola2.aggiungiContenitore(contenitore3);

const piazzolaDisponibile = deposito.trovaPiazzolaDisponibile();
document.getElementById("piazzola-disponibile").innerHTML = "Piazzola disponibile: " + piazzolaDisponibile;

const codiceContenitoreDaCercare = 2;
const piazzolaConContenitore = deposito.trovaPiazzolaDaCodiceContenitore(codiceContenitoreDaCercare);
document.getElementById("piazzola-con-contenitore").innerHTML = "Piazzola contenente il contenitore con codice " + codiceContenitoreDaCercare + ": " + piazzolaConContenitore;

