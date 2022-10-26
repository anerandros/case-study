/**
 * Import della libreria MySQL
 */
const { MySQLManager } = require("./mysql");

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
        message: "MySQL writer online",
    });
});

app.post("/user/save", (req, res) => {
    const parsedBody = req.body;
    if (parsedBody) {
        // Salviamo l'utente su DB
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

app.listen(port, () => {
    console.log(`[Log] [MySQLMicroservice] Server started at localhost on port ${port}`);
    MySQLManager.connectToDatabase();
});
