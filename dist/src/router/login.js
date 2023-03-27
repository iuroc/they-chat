"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cookieParser = require("cookie-parser");
var express_validator_1 = require("express-validator");
exports.default = (0, express_1.Router)().get('/login', cookieParser(), (0, express_validator_1.cookie)('username').notEmpty().withMessage('用户名不能为空'), (0, express_validator_1.cookie)('username').isLength({ min: 4, max: 20 }).withMessage('用户名长度为4-20个字符'), function (req, res) {
    var errors = (0, express_validator_1.validationResult)(req);
    console.log(req.cookies);
    if (!errors.isEmpty())
        return res.json({ errors: errors.array() });
    res.json({
        code: 200,
        msg: '登录成功',
        data: null
    });
});
