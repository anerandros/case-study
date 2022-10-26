/**
 * Configurazione server MySQL
 * N.B.: si potrebbe creare un file YAML con la configurazione, ma per semplicità
 * si lascia schiantata in codice
 */
const mysql = require("mysql");
const MYSQL_DEBUG = true;
var con = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword",
});

function connectToDatabase() {
    return new Promise(function (resolve, reject) {
        con.connect(function (err) {
            if (err) {
                MYSQL_DEBUG && console.log("[Log] [MySQL] Error while connecting to MySQL");
                reject(err);
            }
            MYSQL_DEBUG && console.log("[Log] [MySQL] Correctly connected to MySQL");
            resolve(con);
        });
    });
}

function addToTable(tableName, data) {
    // Identifico le colonne della tabella che serviranno nella query
    var columnsToAdd = Object.keys(data)
        .map((key, index) => {
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
            if (index !== data.length - 1) {
                return value + ", ";
            }
            return value;
        })
        .join("");
    var values = "(" + valuesToAdd + ")";

    return new Promise(function (resolve, reject) {
        var sql = "INSERT INTO " + tableName + " " + columns + " VALUES " + values;
        con.query(sql, function (err) {
            if (err) {
                MYSQL_DEBUG && console.log("[Log] [MySQL] Error while adding data to table");
                reject(err);
            }
            MYSQL_DEBUG && console.log("[Log] [MySQL] Correctly added data to table");
            resolve(con);
        });
    });
}

function readTable(tableName) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM " + tableName;
        con.query(sql, function (err, result) {
            if (err) {
                MYSQL_DEBUG && console.log("[Log] [MySQL] Error while reading table");
                reject(err);
            }
            MYSQL_DEBUG && console.log("[Log] [MySQL] Table correctly read");
            resolve(result);
        });
    });
}

function readTableWhere(tableName, column, value) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT * FROM " + tableName + " WHERE " + column + "=" + value;
        con.query(sql, function (err, result) {
            if (err) {
                MYSQL_DEBUG && console.log("[Log] [MySQL] Error while reading table with condition");
                reject(err);
            }
            MYSQL_DEBUG && console.log("[Log] [MySQL] Table with condition correctly read");
            resolve(result);
        });
    });
}
