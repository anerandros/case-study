/**
 * Import della libreria MySQL
 */
const { MySQLManager } = require("../mysql");

/**
 * Import express
 */
var express = require("express");
var router = express.Router();

router.post("/save", async (req, res) => {
    const parsedBody = req.body;
    try {
        if (!parsedBody) {
            throw new Error("Error in input");
        }
        // Salviamo su DB
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        await MySQLManager.addToTable(MySQLManager.tables.PROSPECT, parsedBody);
        res.send({
            status: "OK",
            message: "Row correctly added to table",
        });
    } catch (err) {
        res.send({
            status: "KO",
            message: err,
        });
    }
});

router.get("/:prospectId", async (req, res) => {
    var prospectId = req.params.prospectId;
    try {
        if (!prospectId) {
            throw new Error("No ID added in API");
        }
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        const result = await MySQLManager.readTableWhere(MySQLManager.tables.PROSPECT, "id_prospect", prospectId);
        res.send({
            status: "OK",
            result,
        });
    } catch (err) {
        res.send({
            status: "KO",
            message: err,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        const results = await MySQLManager.readTable(MySQLManager.tables.PROSPECT);
        res.send({
            status: "OK",
            results,
        });
    } catch (err) {
        res.send({
            status: "KO",
            message: err,
        });
    }
});

module.exports = router;
