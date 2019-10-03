var http = require("http");
var mynotes = require("../Controllers/Notes");
var settings = require("../Settings");
var httpMsgs = require("./httpMsgs");

http.createServer(function (req, resp) {
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                httpMsgs.showHomePage(req, resp);
            }
            else if (req.url === "/notes") {
                mynotes.GetNotesList(req, resp);
            }
            else{
                var userAliasPattern = "[0-9]+";
                var pattern = new RegExp("/notes/" + userAliasPattern);

                if (pattern.test(req.url)) {
                    pattern = new RegExp(userAliasPattern);
                    var userAlias = pattern.exec(req.url);                    
                    mynotes.GetNotesForUser(req, resp, userAlias);
                }
                else {
                    httpMsgs.show404Error(req, resp);
                }
            }
            break;
        case "POST":
            if (req.url === "/notes/Add") {
                var reqBody = '';
                req.on("data", function (data) {
                    reqBody += data;

                    if (reqBody.length > 1e7) {
                        httpMsgs.show413Error(req, resp);
                    }
                });
               
                req.on("end", function () {
                    mynotes.Insert(req, resp, reqBody);                      
                });
            }
            else {
                httpMsgs.show404Error(req, resp);
            }
            break;
        default:
            httpMsgs.show405(req, resp);
            break;
    }
}).listen(settings.webPort, function () {
    console.log("Started listening at: " + settings.webPort);
});