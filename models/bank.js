const BANKS = {
    INTESA: "Intesa Sanpaolo",
    CREDIT: "Credit Agricole",
    BNL: "BNL",
};

function Bank(config) {
    if (config && Object.keys(config).length > 0) {
        this.bankId = config.id_bank || "";
        this.nomeBank = config.nome_bank || "";
        this.codiceBank = config.codice_bank || "";
    }
}

Bank.prototype.getBank = function () {
    return {
        id_bank: this.bankId,
        nome_bank: this.nomeBank,
        codice_bank: this.codiceBank,
    };
};

exports.BANKS = BANKS;
exports.Bank = Bank;
