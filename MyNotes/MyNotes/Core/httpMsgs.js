var settings = require("../Settings");

// Display 500 Internal Server Error 
exports.show500Error = function (req, resp, err) {
    if (settings.httpMsgsFormat == "HTML") {
        resp.writeHead(500, "Internal Error Occured!", { "Content-Type": "text/Html" });
        resp.write("<html><head><title>500</title></head><body>500: Internal Error details - " + err + "</body></html>");
    }
    else {
        resp.writeHead(500, "Internal Error Occured!", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Error Occured!" + err }));
    }
    resp.end();
}

//Displays 200 Status code 
exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    if (data) {
        resp.write(JSON.stringify(data));
    }
    resp.end();
}

// Display Method not supported error
exports.show405Error = function (req, resp) {
    if (settings.httpMsgsFormat == "HTML") {
        resp.writeHead(405, "Method not supported!", { "Content-Type": "text/Html" });
        resp.write("<html><head><title>405</title></head><body>405: Method not supported - " + err + "</body></html>");
    }
    else {
        resp.writeHead(405, "Method not supported!", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported!" }));
    }
    resp.end();
}

// Display 404 Resource not found error
exports.show404Error = function (req, resp) {
    if (settings.httpMsgsFormat == "HTML") {
        resp.writeHead(404, "Resource Not Found!", { "Content-Type": "text/Html" });
        resp.write("<html><head><title>404</title></head><body>404: Resource Not Found - " + err + "</body></html>");
    }
    else {
        resp.writeHead(404, "Resource Not Found!", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource Not Found!" }));
    }
    resp.end();
}

// Display request too large to process error
exports.show413Error = function (req, resp) {
    if (settings.httpMsgsFormat == "HTML") {
        resp.writeHead(413, "Request to large to Process!", { "Content-Type": "text/Html" });
        resp.write("<html><head><title>413</title></head><body>413: Request to large to Process- " + err + "</body></html>");
    }
    else {
        resp.writeHead(413, "Request to large to Process!", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Request to large to Process!"}));
    }
    resp.end();
}

// Display 200 status code and message
exports.show200 = function (req, resp) {
    resp.writeHead(200, "Record has been inserted successfully!", { "Content-Type": "application/json" });
    resp.write(JSON.stringify({ data: "Record has been inserted successfully!" }));
    resp.end(); 
}

// Place holder to display Home page information
exports.showHomePage = function (req, resp) {
    if (settings.httpMsgsFormat == "HTML") {
        resp.writeHead(200, { "Content-Type": "text/Html" });
        resp.write("<html><head><title>Home</title></head><body>Valid Endpoints</body></html>");
    }
    else {
        resp.writeHead(200, { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ url: "/notes", operation: "GET", description: "Get list of all notes from database"}));
    }
    resp.end();
}