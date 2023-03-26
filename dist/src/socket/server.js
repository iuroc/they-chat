"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var server = new ws_1.Server({ port: 4000 });
server.on('connection', function (socket) {
    socket.on('message', function (data) {
        console.log(data);
    });
});
console.log('ws://127.0.0.1:4000');
