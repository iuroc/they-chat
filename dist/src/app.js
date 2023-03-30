"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router_1 = require("./router");
var app = express();
// 前端 JS 文件
app.use('/dist', express.static('dist/public/src'));
// 前端静态资源
app.use(express.static('public'));
(0, router_1.default)(app);
app.listen(3000);
console.log('http://127.0.0.1:3000');
