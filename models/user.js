function User(config) {
    if (config && Object.keys(config).length > 0) {
        this.userId = config.id_user || "";
        this.nomeUser = config.nome_user || "";
        this.cognomeUser = config.cognome_user || "";
        this.emailUser = config.email_user || "";
        this.cfUser = config.cf_user || "";
    }
}

User.prototype.getUser = function () {
    return {
        userId: this.userId,
        nome_user: this.nomeUser,
        cognome_user: this.cognomeUser,
        email_user: this.emailUser,
        cf_user: this.cfUser,
    };
};

exports.User = User;
