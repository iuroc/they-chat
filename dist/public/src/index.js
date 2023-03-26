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
        if (height > 500)
            return;
        if (height < 150)
            return;
        inputBoxEle.style.height = height + 'px';
    });
}
