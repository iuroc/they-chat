"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_1 = require("./login");
/** 获取消息列表 */
exports.default = (0, express_1.Router)().get('/getMsgList', login_1.verLogin, function (req, res) {
    res.json({
        code: 200,
        msg: '获取成功',
        data: []
    });
});
