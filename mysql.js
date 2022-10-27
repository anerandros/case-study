/**
 * Configurazione server MySQL
 * N.B.: si potrebbe creare un file YAML con la configurazione, ma per semplicità
 * si lascia schiantata in codice
 */
const mysql = require("mysql");

var MySQLManager = (function () {
    var MYSQL_DEBUG = true;

    const _tables = {
        USERS: "user",
        PROSPECT: "prospect",
        PRODUCT: "product",
        BANK: "bank",
    };

    var _con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "mutuiamo",
    });

    function _setDebug(valueToSet) {
        MYSQL_DEBUG = valueToSet;
    }

    function _connectToDatabase() {
        return new Promise(function (resolve, reject) {
            _con.connect(function (err) {
                if (err) {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Error while connecting to MySQL");
                    reject(err);
                } else {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Correctly connected to MySQL");
                    resolve();
                }
            });
        });
    }

    function _addToTable(tableName, data) {
        // Identifico le colonne della tabella che serviranno nella query
        var columnsToAdd = Object.keys(data)
            .map((key, index, data) => {
                if (index !== data.length - 1) {
                    return key + ", ";
                }
                return key;
            })
            .join("");
        var columns = "(" + columnsToAdd + ")";

        // Indentifico i valori da inserire nella row
        var valuesToAdd = Object.keys(data)
            .map((key, index) => {
                var value = data[key];
                if (index !== Object.keys(data).length - 1) {
                    return "'" + value + "', ";
                }
                return "'" + value + "'";
            })
            .join("");
        var values = "(" + valuesToAdd + ")";

        return new Promise(function (resolve, reject) {
            var sql = "INSERT INTO " + tableName + " " + columns + " VALUES " + values;
            _con.query(sql, function (err) {
                if (err) {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Error while adding data to table");
                    reject(err);
                } else {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Correctly added data to table");
                    resolve();
                }
            });
        });
    }

    function _readTable(tableName) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM " + tableName;
            _con.query(sql, function (err, result) {
                if (err) {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Error while reading table");
                    reject(err);
                } else {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Table correctly read");
                    resolve(result);
                }
            });
        });
    }

    function _readTableWhere(tableName, column, value) {
        return new Promise(function (resolve, reject) {
            var sql = "SELECT * FROM " + tableName + " WHERE " + column + "=" + value;
            _con.query(sql, function (err, result) {
                if (err) {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Error while reading table with condition");
                    reject(err);
                } else {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Table with condition correctly read");
                    resolve(result);
                }
            });
        });
    }

    function _prepareProspect(userId) {
        return new Promise(function (resolve, reject) {
            var sql =
                "SELECT * FROM " +
                _tables.PROSPECT +
                " INNER JOIN " +
                _tables.USERS +
                " ON prospect.id_user = user.id_user" +
                " INNER JOIN " +
                _tables.PRODUCT +
                " ON prospect.id_product = product.id_product" +
                " INNER JOIN " +
                _tables.BANK +
                " ON prospect.id_bank = bank.id_bank" +
                " WHERE prospect.id_user=" +
                userId +
                " ORDER BY prospect.data_prospect DESC LIMIT 1";
            _con.query(sql, function (err, result) {
                if (err) {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Error in _prepareProspect");
                    reject(err);
                } else {
                    MYSQL_DEBUG && console.log("[Log] [MySQL] Prospect correctly read");
                    resolve(result);
                }
            });
        });
    }

    return {
        setDebug: _setDebug,

        connectToDatabase: _connectToDatabase,
        addToTable: _addToTable,
        readTable: _readTable,
        readTableWhere: _readTableWhere,

        tables: _tables,

        // Funzione ad hoc, sbagliata, ma utile al fine del progetto.
        prepareProspect: _prepareProspect,
    };
})();

exports.MySQLManager = MySQLManager;
