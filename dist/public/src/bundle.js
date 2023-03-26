(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ponconjs_1 = require("ponconjs");
router();
setResizeDiv();
document.ondragstart = function () { return false; };
/** 配置路由 */
function router() {
    var poncon = new ponconjs_1.default();
    poncon.setPageList(['home', 'friend', 'about']);
    // 主页
    poncon.setPage('home', function () {
    });
    // 通讯录
    poncon.setPage('friend', function () {
    });
    // 关于
    poncon.setPage('about', function () {
    });
    poncon.start();
    autoMenuStats(poncon);
}
/** 自动切换导航菜单显示状态 */
function autoMenuStats(poncon) {
    changeMenuStats(poncon);
    window.addEventListener('hashchange', function (event) {
        changeMenuStats(poncon);
    });
}
/**
 * 切换导航菜单状态
 * @param target 页面标识
 */
function changeMenuStats(poncon) {
    var activeTarget = poncon.getTarget();
    var menuTabItemEles = document.querySelectorAll('.menu-tab-list .menu-item');
    var icons = {
        home: ['./img/chat-fill.svg', './img/chat.svg'],
        friend: ['./img/person-vcard-fill.svg', './img/person-vcard.svg'],
        about: ['./img/info-circle-fill.svg', './img/info-circle.svg'],
    };
    menuTabItemEles.forEach(function (menuTabItemEles) {
        var target = menuTabItemEles.getAttribute('data-target');
        var icon = icons[target];
        var imgEle = menuTabItemEles.querySelector('img');
        imgEle.src = target == activeTarget ? icon[0] : icon[1];
    });
}
/** 拖拽聊天输入框上边框，实现高度调整 */
function setResizeDiv() {
    var ele = document.querySelector('.chat-input-box .change-position');
    var inputBoxEle = document.querySelector('.chat-input-box');
    var isSelected = false;
    var startHeight = 0;
    var startY = 0;
    ele === null || ele === void 0 ? void 0 : ele.addEventListener('mousedown', function (event) {
        isSelected = true;
        startHeight = inputBoxEle.offsetHeight;
        startY = event.pageY;
        document.body.style.cursor = 'ns-resize';
    });
    document.body.addEventListener('mouseup', function (event) {
        isSelected = false;
        document.body.style.cursor = '';
    });
    document.body.addEventListener('mousemove', function (event) {
        if (!isSelected)
            return;
        var changeHeight = event.pageY - startY;
        var height = startHeight - changeHeight;
        if (height > 400)
            return;
        if (height < 150)
            return;
        inputBoxEle.style.height = height + 'px';
    });
}

},{"ponconjs":2}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
/**
 * @author 欧阳鹏
 * https://apee.top
 */
var Poncon = /** @class */ (function () {
    function Poncon() {
        this.pages = {};
        this.pageNames = []; // 页面列表
    }
    /**
     * 切换页面显示
     * @param target 页面标识
     */
    Poncon.prototype.changeView = function (target) {
        if (!target) {
            return;
        }
        document.querySelectorAll('.poncon-page').forEach(function (dom) {
            dom.style.display = 'none';
        });
        var dom = document.querySelector(".poncon-".concat(target));
        dom.style.display = '';
    };
    /**
     * 设置页面名称列表
     * @param pageNames 页面名称列表
     */
    Poncon.prototype.setPageList = function (pageNames) {
        var _this_1 = this;
        pageNames.forEach(function (target) {
            var dom = document.querySelector(".poncon-".concat(target));
            _this_1.pages[target] = {
                dom: dom,
                event: (function () { }),
                data: {}
            };
        });
        this.pageNames = pageNames;
    };
    /**
     * 配置页面
     * @param target 页面标识
     * @param func 页面载入事件
     */
    Poncon.prototype.setPage = function (target, func) {
        if (!target) {
            return;
        }
        this.pages[target]['event'] = func || (function () { });
    };
    /**
     * 开启路由系统
     */
    Poncon.prototype.start = function () {
        var _this = this;
        window.addEventListener('hashchange', function (event) {
            var hash = new URL(event.newURL).hash;
            _this.loadTarget(hash);
        });
        this.loadTarget();
    };
    /**
     * 切换页面并执行页面事件
     * @param hash 页面标识
     */
    Poncon.prototype.loadTarget = function (hash) {
        var target = this.getTarget(hash);
        var dom = this.getDom(target);
        var args = this.getArgs(hash);
        this.changeView(target);
        this.pages[target].event(dom, args, this.pages[target].data);
    };
    /**
     * 获取页面参数列表
     * @param hash 网址Hash
     * @returns 页面参数列表
     */
    Poncon.prototype.getArgs = function (hash) {
        var strs = (hash || location.hash).split('/');
        if (strs.length < 3) {
            return [];
        }
        return strs.slice(2);
    };
    /**
     * 获取当前页面标识, 支持自动矫正
     * @param hash 网址hash
     * @returns 页面标识
     */
    Poncon.prototype.getTarget = function (hash) {
        var strs = (hash || location.hash).split('/');
        var target = strs[1] || '';
        // target不合法或者不在白名单
        if (target.search(/^\w+$/) != 0 || this.pageNames.indexOf(target) == -1) {
            history.replaceState({}, '', "".concat(location.pathname));
            return 'home';
        }
        return target;
    };
    /**
     * 获取页面DOM
     * @param target 页面标识
     * @returns 页面DOM元素
     */
    Poncon.prototype.getDom = function (target) {
        return document.querySelector(".poncon-".concat(target));
    };
    return Poncon;
}());
exports["default"] = Poncon;

},{}]},{},[1]);
