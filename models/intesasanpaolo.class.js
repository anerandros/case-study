const { Prospect } = require("./prospect.class");

class IntesaSanpaolo extends Prospect {
    constructor(config) {
        super(config);
    }

    getProspect() {
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
    }
}

exports.IntesaSanpaolo = IntesaSanpaolo;
