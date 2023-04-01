"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var util_1 = require("../util");
var db_1 = require("../db");
var express_validator_1 = require("express-validator");
var config_1 = require("../config");
/** 用户注册 */
exports.default = (0, express_1.Router)().post('/register', (0, express_validator_1.body)('userName').custom(function (input) { return input.match(/^\w{4,20}$/); }).withMessage('用户名长度为4-20个字符'), (0, express_validator_1.body)('email').isEmail().withMessage('邮箱格式错误'), (0, express_validator_1.body)('password').custom(function (input) { return input.match(/^\w{32}$/); }).withMessage('密码格式错误'), (0, express_validator_1.body)('nickName').notEmpty().withMessage('昵称不能为空'), db_1.initDatabase, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, userName, email, passwordMd5, nickName;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty())
                    return [2 /*return*/, (0, util_1.printErr)(res, errors.array()[0].msg)];
                userName = req.body.userName;
                email = req.body.email;
                passwordMd5 = req.body.password;
                nickName = req.body.nickName;
                return [4 /*yield*/, isExists(res, req)];
            case 1:
                _b.sent();
                (_a = req.conn) === null || _a === void 0 ? void 0 : _a.query("INSERT INTO `".concat(config_1.DB_CONFIG.table.user, "`\n        (`user_name`, `email`, `password_md5`, `nick_name`)\n        VALUES ('").concat(userName, "', '").concat(email, "', '").concat(passwordMd5, "', '").concat(nickName, "')"), function (err) {
                    if (err)
                        return (0, util_1.printErr)(res, "\u6CE8\u518C\u5931\u8D25\uFF1A".concat(err.message));
                    var sixMonthsInMs = 1000 * 60 * 60 * 24 * 30 * 6;
                    var options = {
                        maxAge: sixMonthsInMs,
                        httpOnly: true,
                    };
                    res.cookie('loginName', userName, options);
                    res.cookie('password', passwordMd5, options);
                    (0, util_1.printSuc)(res, null, '注册成功');
                });
                return [2 /*return*/];
        }
    });
}); });
/** 判断命名是否已经存在 */
function isExists(res, req) {
    return __awaiter(this, void 0, void 0, function () {
        var sql;
        return __generator(this, function (_a) {
            sql = "SELECT COUNT(*) FROM `".concat(config_1.DB_CONFIG.table.user, "`\n    WHERE `user_name` = '").concat(req.body.userName, "' OR `email` = '").concat(req.body.email, "'");
            return [2 /*return*/, new Promise(function (resolve) {
                    var _a;
                    (_a = req.conn) === null || _a === void 0 ? void 0 : _a.query(sql, function (err, result) {
                        if (err)
                            return (0, util_1.printErr)(res, err.message);
                        if (result[0]['COUNT(*)'] > 0)
                            return (0, util_1.printErr)(res, '用户名或邮箱已存在');
                        resolve(null);
                    });
                })];
        });
    });
}
