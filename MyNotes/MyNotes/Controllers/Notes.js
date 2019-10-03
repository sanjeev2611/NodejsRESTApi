var db = require("../Core/Database");
var httpMsgs = require("../Core/httpMsgs");
var util = require("util");

// Function to get the list of all notes present in the database
exports.GetNotesList = function (req, resp) {
    db.executeSql("Select * from dbo.UserNotes", function (data, err) {
        if (err) {
            httpMsgs.show500Error(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }        
    });
};

// Function to return list of all notes by user id
exports.GetNotesForUser = function (req, resp, userAlias) {
    db.executeSql("Select * from dbo.UserNotes where UserID =" + userAlias + "", function (data, err) {
        if (err) {
            httpMsgs.show500Error(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

// Function to insert a note in the SQL database
exports.Insert = function (req, resp, reqBody) {
    try {
        if (!reqBody) {
            throw new Error("Input is invalid!");
        }

        var data = JSON.parse(reqBody);
        if (data) {
            var sql = "Insert into dbo.UserNotes(UserID, Title, Content) Values ";
            sql += util.format("(%d,'%s','%s')", data.UserID, data.Title, data.Content);

            db.executeSql(sql, function (data, err) {
                if (err) {
                    httpMsgs.show500Error(req, resp, err);
                } else {
                    httpMsgs.show200(req, resp);
                }
            });
        } else {
            throw new Error("Input is invalid!");
        }

    } catch (ex) {
        httpMsgs.show500Error(req, resp, ex);
    }
};
