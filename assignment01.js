var http = require("http").createServer(handler);
var fs = require("fs"); // variable for file system
var firmata = require("firmata");
const WebSocket = require('ws'); // for permanent connection between server and client

const wss = new WebSocket.Server({port: 8888}); // websocket port is 8888

var board = new firmata.Board("/dev/ttyACM0", function(){ // ACM Abstract Control Model for serial communication with Arduino (could be USB)
    console.log("Connecting to Arduino");
    console.log("Activation of Pin 13");
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output.
});

function handler(req, res) {
    fs.readFile(__dirname + "/assignment01.html",
    function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Error loading html page.");
        }
    res.writeHead(200);
    res.end(data);
    });
}

http.listen(8080); // server will listen on port 8080, html page will be served to client

wss.on('connection', function (ws) { // start of wss code
    ws.on("message", function (value) {
       switch (value) {
    case "1":
        board.digitalWrite(13, board.HIGH); // write high on pin 13
    break;
    case "0":
        board.digitalWrite(13, board.LOW); // write low on pin 13
    break;
    case "3":
        board.digitalWrite(8, board.HIGH); // write high on pin 8
    break;
    case "2":
        board.digitalWrite(8, board.LOW); // write low on pin 8
    break;
    case "5":
        board.digitalWrite(12, board.HIGH); // write high on pin 13
    break;
    case "4":
        board.digitalWrite(12, board.LOW); // write low on pin 13
    break;
    case "7":
        board.digitalWrite(9, board.HIGH); // write high on pin 8
    break;
    case "6":
        board.digitalWrite(9, board.LOW); // write low on pin 8
    break;      
    case "9":
       { board.digitalWrite(8, board.HIGH);
        board.digitalWrite(13, board.HIGH);
        board.digitalWrite(12, board.HIGH);
        board.digitalWrite(9, board.HIGH);}// write high on pin 8
    break;
    case "8":
       { board.digitalWrite(8, board.LOW);
        board.digitalWrite(13, board.LOW);
        board.digitalWrite(12, board.LOW);
        board.digitalWrite(9, board.LOW); }// write low on pin 8
    break;    
}
    });
}); // end of wss code