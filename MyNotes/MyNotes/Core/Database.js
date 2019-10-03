var sqlDb = require("mssql");
var settings = require("../Settings");

exports.executeSql = function (sql, callback) {

    var conn = new sqlDb.ConnectionPool(settings.dbConfigs);

    conn.connect()
        .then(function () {
            var req = new sqlDb.Request(conn);
            req.query(sql)
                .then(function (recordset) {
                    callback(recordset);
                })
                .catch(function (err) {
                    Console.log(err);
                    callback(null, err);
                });
        })
        .catch(function (err) {
            Console.log(err);
            callback(null, err);
        });
};