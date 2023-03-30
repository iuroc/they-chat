"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ponconjs_1 = require("ponconjs");
var DATA = {
    /** 是否联网校验过 */
    hasVerLogin: false,
    /** 是否登录 */
    hasLogin: false
};
verLogin();
router();
setResizeDiv();
addClickEvent();
document.ondragstart = function () { return false; };
/** 判断登录状态 */
function verLogin() {
    var target = location.hash.split('/')[1];
    if (target == 'login' && DATA.hasLogin)
        return location.hash = '';
    if (!DATA.hasVerLogin) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/login', false);
        xhr.send();
        var resData = JSON.parse(xhr.responseText);
        var code = resData.code;
        if (code == 200) {
            DATA.hasLogin = true;
            if (target == 'login')
                location.hash = '';
        }
        else
            location.hash = '#/login';
        DATA.hasVerLogin = true;
    }
    else {
        if (!DATA.hasLogin)
            location.hash = '#/login';
    }
}
/** 配置路由 */
function router() {
    var poncon = new ponconjs_1.default();
    poncon.setPageList(['home', 'friend', 'about', 'login', 'user']);
    // 主页
    poncon.setPage('home', function () {
    });
    // 通讯录
    poncon.setPage('friend', function () {
    });
    // 关于
    poncon.setPage('about', function () {
    });
    // 个人信息
    poncon.setPage('login', function () {
    });
    // 登录注册
    poncon.setPage('login', function () {
    });
    window.addEventListener('hashchange', verLogin);
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
        user: ['./img/person-fill.svg', './img/person.svg'],
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
/** 为初始载入的元素添加单击事件 */
function addClickEvent() {
    /** 提示：已有账号？点击登录 */
    var loginMsg = document.querySelector('.poncon-login .login-msg');
    /** 提示：没有账号？点击注册 */
    var registerMsg = document.querySelector('.poncon-login .register-msg');
    /** 登录盒子 */
    var loginBoxEle = document.querySelector('.poncon-login .box.login');
    /** 注册盒子 */
    var registerBoxEle = document.querySelector('.poncon-login .box.register');
    loginMsg.addEventListener('click', function () {
        loginBoxEle.style.display = 'block';
        registerBoxEle.style.display = 'none';
    });
    registerMsg.addEventListener('click', function () {
        loginBoxEle.style.display = 'none';
        registerBoxEle.style.display = 'block';
    });
}
