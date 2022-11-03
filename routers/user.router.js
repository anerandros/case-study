/**
 * Import della libreria MySQL
 */
const { MySQLManager } = require("../mysql");

/**
 * Import dei modelli
 */
const { User } = require("../models/user.class");
const { BANKS } = require("../models/bank.class");
const { Prospect } = require("../models/prospect.class");
const { IntesaSanpaolo } = require("../models/intesasanpaolo.class");
const { CreditAgricole } = require("../models/creditagricole.class");
const { BNL } = require("../models/bnl.class");

/**
 * Import express
 */
var express = require("express");
var router = express.Router();

router.post("/save", (req, res) => {
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

router.get("/:userId", function (req, res) {
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

router.get("/:userId/prospect", function (req, res) {
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
                res.send({
                    status: "KO",
                    message: err,
                });
            });
    } else {
        res.send({
            status: "KO",
            message: "No userId added in API",
        });
    }
});

router.get("/", function (req, res) {
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

module.exports = router;
