"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ponconjs_1 = require("ponconjs");
router();
document.ondragstart = function () { return false; };
/** 配置路由 */
function router() {
    var poncon = new ponconjs_1.default();
    poncon.setPageList(['home', 'friend', 'about']);
    poncon.setPage('home', function () {
    });
    poncon.setPage('friend', function () {
    });
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
