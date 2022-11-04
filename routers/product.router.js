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
        await MySQLManager.addToTable(MySQLManager.tables.PRODUCT, parsedBody);
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

router.get("/:productId", async (req, res) => {
    var productId = req.params.productId;
    try {
        if (!productId) {
            throw new Error("No ID added in API");
        }
        // N.B.: MAI inviare dati in DB senza parsarli. Si omette per semplicità.
        const result = await MySQLManager.readTableWhere(MySQLManager.tables.PRODUCT, "id_product", productId);
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
        const results = await MySQLManager.readTable(MySQLManager.tables.PRODUCT);
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
