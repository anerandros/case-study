const { Bank } = require("./bank.class");
const { Product } = require("./product.class");
const { User } = require("./user.class");

class Prospect {
    constructor(config) {
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

    getProspect() {
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
    }
}

exports.Prospect = Prospect;
