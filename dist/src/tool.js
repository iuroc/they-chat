"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printErr = exports.printSuc = void 0;
/** 执行响应 */
function printOut(res, data, message, code) {
    var jsonData = {
        code: 200,
        msg: message,
        data: data
    };
    res.json(jsonData);
}
/** 执行成功响应 */
function printSuc(res, data, message) {
    printOut(res, data, message, 200);
}
exports.printSuc = printSuc;
/** 执行错误响应 */
function printErr(res, message) {
    printOut(res, null, message, 400);
}
exports.printErr = printErr;
