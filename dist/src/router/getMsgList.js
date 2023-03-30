"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var util_1 = require("../util");
var login_1 = require("./login");
/** 获取消息列表 */
exports.default = (0, express_1.Router)().get('/getMsgList', login_1.verLogin, function (req, res) {
    (0, util_1.printSuc)(res, null, '成功');
    (0, util_1.printSuc)(res, null, '成功');
    (0, util_1.printSuc)(res, null, '成功');
    (0, util_1.printSuc)(res, null, '成功');
});
