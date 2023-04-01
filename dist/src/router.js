"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getMsgList_1 = require("./router/getMsgList");
var login_1 = require("./router/login");
var register_1 = require("./router/register");
exports.default = (function (app) {
    app.use(getMsgList_1.default, login_1.default, login_1.postLogin, login_1.logout, register_1.default);
});
