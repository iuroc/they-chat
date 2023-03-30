(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ponconjs_1 = require("ponconjs");
var md5 = require("md5");
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
function getLoginRes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/login', false);
    xhr.send();
    var resData = JSON.parse(xhr.responseText);
    return resData;
}
/** 判断登录状态 */
function verLogin() {
    var target = location.hash.split('/')[1];
    if (target == 'login' && DATA.hasLogin)
        return location.hash = '';
    if (!DATA.hasVerLogin) {
        var resData = getLoginRes();
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
    // 设置退出登录
    var logoutBtn = document.querySelector('.poncon-user .logout');
    logoutBtn.addEventListener('click', function () {
        document.cookie = 'loginName=';
        document.cookie = 'password=';
        location.reload();
    });
    // 设置登录事件
    var loginPageEle = document.querySelector('.poncon-login');
    var loginBtn = loginPageEle.querySelector('.login-btn');
    var loginNameEleOfLogin = loginPageEle.querySelector('.input-username');
    var passwordEleOfLogin = loginPageEle.querySelector('.input-password');
    loginBtn.addEventListener('click', function () {
        var loginName = loginNameEleOfLogin.value;
        var password = passwordEleOfLogin.value;
        var passwordMd5 = md5(password);
        document.cookie = 'loginName=' + loginName;
        document.cookie = 'password=' + passwordMd5;
        // location.reload()
        var resData = getLoginRes();
        var code = resData.code;
        if (code == 200) {
            location.hash = '';
            DATA.hasVerLogin = true;
            DATA.hasLogin = true;
            return;
        }
        alert(resData.msg);
    });
}

},{"md5":5,"ponconjs":6}],2:[function(require,module,exports){
var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;

},{}],3:[function(require,module,exports){
(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();

},{}],4:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],5:[function(require,module,exports){
(function(){
  var crypt = require('crypt'),
      utf8 = require('charenc').utf8,
      isBuffer = require('is-buffer'),
      bin = require('charenc').bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();

},{"charenc":2,"crypt":3,"is-buffer":4}],6:[function(require,module,exports){
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
