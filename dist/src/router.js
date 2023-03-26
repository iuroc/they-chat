"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getMsgList_1 = require("./router/getMsgList");
exports.default = (function (app) {
    app.use(getMsgList_1.default);
});
