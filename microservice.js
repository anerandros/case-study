/**
 * Import della libreria MySQL
 */
const { MySQLManager } = require("./mysql");

/**
 * Import dei modelli
 */
const { User } = require("./models/user.class");
const { BANKS } = require("./models/bank.class");
const { Prospect } = require("./models/prospect.class");
const { IntesaSanpaolo } = require("./models/intesasanpaolo.class");
const { CreditAgricole } = require("./models/creditagricole.class");
const { BNL } = require("./models/bnl.class");

/**
 * Configurazione microservizio writer per scrivere e leggere su database MySQL
 */
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send({
        status: "OK",
        message: "Microservice online",
    });
});

/*******************************************************
 * ********************** USERS ************************
 */

app.post("/user/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // Salviamo su DB
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.addToTable(MySQLManager.tables.USERS, parsedBody)
            .then(() => {
                res.send({
                    status: "OK",
                    message: "Row correctly added to table",
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "Error in input",
        });
    }
});

app.get("/user/:userId", function (req, res) {
    var userId = req.params.userId;
    if (userId) {
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.readTableWhere(MySQLManager.tables.USERS, "id_user", userId)
            .then((result) => {
                // Esempio di gestione del dato
                if (result && result[0]) {
                    const userModel = new User(result[0]);
                    console.log(userModel.getUser());
                }
                // ----------------------------
                res.send({
                    status: "OK",
                    result,
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "No userId added in API",
        });
    }
});

app.get("/user/:userId/prospect", function (req, res) {
    var userId = req.params.userId;
    if (userId) {
        // N.B.: MAI inviare dati senza parsarli. Si omette per semplicità.
        MySQLManager.prepareProspect(userId)
            .then((result) => {
                // Esempio di gestione del dato
                var prospectModel;
                switch (result.nome_bank) {
                    case BANKS.INTESA:
                        prospectModel = new IntesaSanpaolo(result);
                        break;
                    case BANKS.CREDIT:
                        prospectModel = new CreditAgricole(result);
                        break;
                    case BANKS.BNL:
                        prospectModel = new BNL(result);
                        break;
                    default:
                        prospectModel = new Prospect(result);
                        break;
                }
                console.log(prospectModel.getProspect());
                // ----------------------------
                res.send({
                    status: "OK",
                    result,
                });
            })
            .catch((err) => {
                res.end({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "No userId added in API",
        });
    }
});

app.get("/users", function (req, res) {
    MySQLManager.readTable(MySQLManager.tables.USERS)
        .then((result) => {
            res.send({
                status: "OK",
                result,
            });
        })
        .catch((err) => {
            res.send({
                status: "KO",
                message: err,
            });
        });
});

/*******************************************************
 * ********************** BANKS ************************
 */
app.post("/bank/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // Salviamo su DB
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.addToTable(MySQLManager.tables.BANK, parsedBody)
            .then(() => {
                res.send({
                    status: "OK",
                    message: "Row correctly added to table",
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "Error in input",
        });
    }
});

app.get("/bank/:bankId", function (req, res) {
    var bankId = req.params.bankId;
    if (bankId) {
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.readTableWhere(MySQLManager.tables.BANK, "id_bank", bankId)
            .then((result) => {
                res.send({
                    status: "OK",
                    result,
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "No bankId added in API",
        });
    }
});

app.get("/banks", function (req, res) {
    MySQLManager.readTable(MySQLManager.tables.BANK)
        .then((result) => {
            res.send({
                status: "OK",
                result,
            });
        })
        .catch((err) => {
            res.send({
                status: "KO",
                message: err,
            });
        });
});

/*******************************************************
 * ******************** PRODUCT ************************
 */
app.post("/product/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // Salviamo su DB
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.addToTable(MySQLManager.tables.PRODUCT, parsedBody)
            .then(() => {
                res.send({
                    status: "OK",
                    message: "Row correctly added to table",
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "Error in input",
        });
    }
});

app.get("/product/:productId", function (req, res) {
    var productId = req.params.productId;
    if (productId) {
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.readTableWhere(MySQLManager.tables.PRODUCT, "id_product", productId)
            .then((result) => {
                res.send({
                    status: "OK",
                    result,
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "No productId added in API",
        });
    }
});

app.get("/products", function (req, res) {
    MySQLManager.readTable(MySQLManager.tables.PRODUCT)
        .then((result) => {
            res.send({
                status: "OK",
                result,
            });
        })
        .catch((err) => {
            res.send({
                status: "KO",
                message: err,
            });
        });
});

/*******************************************************
 * ******************** PROSPECT ***********************
 */
app.post("/prospect/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // Salviamo su DB
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.addToTable(MySQLManager.tables.PROSPECT, parsedBody)
            .then(() => {
                res.send({
                    status: "OK",
                    message: "Row correctly added to table",
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "Error in input",
        });
    }
});

app.get("/prospect/:prospectId", function (req, res) {
    var prospectId = req.params.prospectId;
    if (prospectId) {
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        MySQLManager.readTableWhere(MySQLManager.tables.PROSPECT, "id_prospect", prospectId)
            .then((result) => {
                res.send({
                    status: "OK",
                    result,
                });
            })
            .catch((err) => {
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.end({
            status: "KO",
            message: "No prospectId added in API",
        });
    }
});

app.get("/prospects", function (req, res) {
    MySQLManager.readTable(MySQLManager.tables.PROSPECT)
        .then((result) => {
            res.send({
                status: "OK",
                result,
            });
        })
        .catch((err) => {
            res.send({
                status: "KO",
                message: err,
            });
        });
});

app.listen(port, () => {
    console.log(`[Log] [Microservice] Server started at localhost on port ${port}`);
    MySQLManager.connectToDatabase();
});
