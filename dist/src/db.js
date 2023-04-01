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
exports.initDatabase = void 0;
var mysql2_1 = require("mysql2");
var config_1 = require("./config");
var util_1 = require("./util");
/**
 * 中间件，初始化数据库
 * @param req 请求对象
 * @param res 响应对象
 * @param next 下一个函数
 */
var initDatabase = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var conn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                conn = (0, mysql2_1.createPool)({
                    host: config_1.DB_CONFIG.host,
                    port: config_1.DB_CONFIG.port,
                    user: config_1.DB_CONFIG.user,
                    password: config_1.DB_CONFIG.password
                });
                req.conn = conn;
                return [4 /*yield*/, new Promise(function (resolve) {
                        conn.query("CREATE DATABASE IF NOT EXISTS `".concat(config_1.DB_CONFIG.database, "`"), function (err, result) {
                            conn.query("USE `".concat(config_1.DB_CONFIG.database, "`"), function (err) {
                                if (err)
                                    (0, util_1.printErr)(res, err.message);
                                resolve(err);
                            });
                        });
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, initTables(res, conn)];
            case 2:
                _a.sent();
                next();
                return [2 /*return*/];
        }
    });
}); };
exports.initDatabase = initDatabase;
/**
 * 初始化数据表
 * @param res 响应对象
 * @param conn 数据库连接
 */
function initTables(res, conn) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        conn.query("CREATE TABLE IF NOT EXISTS `".concat(config_1.DB_CONFIG.table.user, "` (\n            `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '\u7528\u6237ID\uFF0C\u53EA\u7528\u4E8E\u7D22\u5F15',\n            `nick_name` VARCHAR(255) UNIQUE COMMENT '\u7528\u6237\u6635\u79F0',\n            `user_name` VARCHAR(255) UNIQUE COMMENT '\u7528\u6237\u540D\uFF0C\u53EF\u7528\u4E8E\u767B\u5F55',\n            `email` VARCHAR(255) UNIQUE COMMENT '\u90AE\u7BB1\uFF0C\u53EF\u7528\u4E8E\u767B\u5F55',\n            `password_md5` VARCHAR(255) COMMENT '\u5BC6\u7801\u7684md5\u5BC6\u6587',\n            `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '\u6CE8\u518C\u65F6\u95F4'\n        )"), function (err) {
                            if (err)
                                (0, util_1.printErr)(res, err.message);
                            resolve(err);
                        });
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) {
                            conn.query("CREATE TABLE IF NOT EXISTS `".concat(config_1.DB_CONFIG.table.msg, "` (\n            `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '\u6D88\u606FID\uFF0C\u53EA\u7528\u4E8E\u7D22\u5F15',\n            `from_user` INT COMMENT '\u53D1\u9001\u4EBAID',\n            `to_room` INT COMMENT '\u76EE\u6807\u623F\u95F4ID',\n            `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '\u53D1\u9001\u65F6\u95F4'\n        )"), function (err) {
                                if (err)
                                    (0, util_1.printErr)(res, err.message);
                                resolve(err);
                            });
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, new Promise(function (resolve) {
                            conn.query("CREATE TABLE IF NOT EXISTS `".concat(config_1.DB_CONFIG.table.room, "` (\n            `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '\u623F\u95F4ID\uFF0C\u53EA\u7528\u4E8E\u7D22\u5F15',\n            `limit_num` INT COMMENT '\u623F\u95F4\u9650\u5236\u4EBA\u6570',\n            `has_num` INT COMMENT '\u623F\u95F4\u5DF2\u6709\u4EBA\u6570',\n            `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '\u623F\u95F4\u521B\u5EFA\u65F6\u95F4'\n        )"), function (err) {
                                if (err)
                                    (0, util_1.printErr)(res, err.message);
                                resolve(err);
                            });
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
