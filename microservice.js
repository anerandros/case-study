/**
 * Import della libreria MySQL
 */
const { MySQLManager } = require("./mysql");

/**
 * Import dello Utils
 */
const { Utils } = require("./utils");

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
        Utils.addToTable(MySQLManager.tables.USERS, parsedBody);
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
        Utils.readTableWhere(MySQLManager.tables.USERS, "id_user", userId);
    } else {
        res.end({
            status: "KO",
            message: "No userId added in API",
        });
    }
});

app.get("/users", function (req, res) {
    // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
    Utils.readTable(MySQLManager.tables.USERS);
});

/*******************************************************
 * ********************** BANKS ************************
 */
app.post("/bank/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // Salviamo su DB
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        Utils.addToTable(MySQLManager.tables.BANK, parsedBody);
    } else {
        res.end({
            status: "KO",
            message: "Error in input",
        });
    }
});

/*******************************************************
 * ********************** PRODUCT ************************
 */
app.post("/product/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // Salviamo su DB
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        Utils.addToTable(MySQLManager.tables.PRODUCT, parsedBody);
    } else {
        res.end({
            status: "KO",
            message: "Error in input",
        });
    }
});

app.listen(port, () => {
    console.log(`[Log] [Microservice] Server started at localhost on port ${port}`);
    MySQLManager.connectToDatabase();
});
