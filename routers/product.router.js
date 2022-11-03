/**
 * Import della libreria MySQL
 */
const { MySQLManager } = require("../mysql");

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
        res.send({
            status: "KO",
            message: "Error in input",
        });
    }
});

router.get("/:productId", function (req, res) {
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
        res.send({
            status: "KO",
            message: "No productId added in API",
        });
    }
});

router.get("/", function (req, res) {
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

module.exports = router;
