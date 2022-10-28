const { Bank, BANKS } = require("./bank");
const { Product } = require("./product");
const { User } = require("./user");

function Prospect(config) {
    if (config && Object.keys(config).length > 0) {
        this.user = new User(config);
        this.product = new Product(config);
        this.bank = new Bank(config);

        this.prospectId = config.id_prospect || "";
        this.rataProspect = config.rata_prospect || "";
        this.tanProspect = config.tan_prospect || "";
        this.taegProspect = config.taeg_prospect || "";
        // Si potrebbe gestire la data come Date per lavorarci meglio
        this.dataProspect = config.dataProspect || "";
        this.counterProspect = config.counter || "";
        this.ricezioneProspect = config.ricezione_prospect || config.ricezione_prospect === 0 ? config.ricezione_prospect : "";
    }
}

Prospect.prototype.getProspect = function () {
    var returnObj;
    // Si dovrebbero inserire setter e getter,
    // per semplicità omettiamo ed accediamo al valore rapidamente
    switch (this.bank.nomeBank) {
        case BANKS.INTESA:
            // Si dovrebbe fare un singleton per omettere funzioni private,
            // per semplicità procediamo così
            returnObj = this._getIntesaProspect();
            break;
        // case BANKS.CREDIT:
        //     returnObj = this._getCreditProspect();
        //     break;
        // case BANKS.BNL:
        //     returnObj = this._getBNLProspect();
        //     break;
        default:
            returnObj = this._getFullProspect();
            break;
    }
    return returnObj;
};

Prospect.prototype._getFullProspect = function () {
    return {
        user: this.user.getUser(),
        product: this.product.getProduct(),
        bank: this.bank.getBank(),
        id_prospect: this.prospectId,
        rata_prospect: this.rataProspect,
        tan_prospect: this.tanProspect,
        taeg_prospect: this.taegProspect,
        data_prospect: this.dataProspect,
        counter: this.counterProspect,
        ricezione_prospect: this.ricezioneProspect,
    };
};

Prospect.prototype._getIntesaProspect = function () {
    var user = this.user.getUser();
    var bank = this.bank.getBank();
    var product = this.product.getProduct();

    return {
        numeroIdentificazione: this.prospectId,
        nomeBanca: bank.nome_bank,
        nomeProdotto: product.nome_product,
        cfUtente: user.cf_user,
        rataMensile: this.rataProspect,
        tan: this.tanProspect,
        taeg: this.taegProspect,
        codiceFiliale: bank.codice_bank,
        ricezioniDati: this.ricezioneProspect,
    };
};

Prospect.prototype._getCreditProspect = function () {
    // Si veda _getIntesaProspect. Applicazione identica con dati differenti.
    // Per semplicità si ritorna il default
    return {};
};

Prospect.prototype._getBNLProspect = function () {
    // Si veda _getIntesaProspect. Applicazione identica con dati differenti.
    // Per semplicità si ritorna il default
    return {};
};

exports.Prospect = Prospect;
