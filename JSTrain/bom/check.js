// 补全如下函数，判断用户的浏览器类型。
var nav = navigator.userAgent

function isAndroid() {
    if (/Android/.test(nav)) {
        return true
    } else {
        return false
    }
}

function isIphone() {
    if (/iPhone/.test(nav)) {
        return true
    } else {
        return false
    }
}

function isIpad() {
    if (/iPad/.test(nav)) {
        return true
    } else {
        return false
    }
}

function isIOS() {
    if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(nav)) {
        return true
    } else {
        return false
    }
}