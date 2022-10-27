var Utils = (function () {
    function _addToTable(table, body) {
        MySQLManager.addToTable(table, body)
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
    }

    function _readTableWhere(table, column, value) {
        MySQLManager.readTableWhere(table, column, value)
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
    }

    function _readTable(table) {
        MySQLManager.readTable(table)
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
    }

    return {
        // DB
        addToTable: _addToTable,
        readTableWhere: _readTableWhere,
        readTable: _readTable,
    };
})();

exports.Utils = Utils;
