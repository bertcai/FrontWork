// 补全如下函数，判断用户的浏览器类型。
var nav = navigator.userAgent

function isAndroid() {
    if (/Android/.test(nav)) {
        return true
    } else {
        return false
    }
}

function isIphone() {}

function isIpad() {}

function isIOS() {}