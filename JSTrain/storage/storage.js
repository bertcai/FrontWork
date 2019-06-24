// 使用 localStorage封装一个 Storage 对象，达到如下效果：

Storage.set('name', '饥人谷')
Storage.set('age', 2, 30); //设置 name 字段存储的值为'饥人谷'
Storage.set('teachers', ['ruoyu', 'fangfang', 'tom'], 60)

Storage.get('name') // ‘饥人谷’
Storage.get('age') //  如果不超过30秒，返回数字类型的2；如果超过30秒，返回 undefined，并且 localStorage 里清除 age 字段
Storage.get('teachers') //如果不超过60秒，返回数组； 如果超过60秒，返回undefined

var Storage = (function () {
    return {
        set: function (key, value, exTime) {
            localStorage[key] = JSON.stringify({
                value: value,
                expired: exTime === undefined ? undefined : Date.now() + 1000 * exTime
            })
        },
        get: function (key) {
            if (localStorage[key] === undefined) return
            let res = JSON.parse(localStorage[key])
            if (res.expired && res.expired > Date.now()) {
                return res.value
            } else {
                return
            }
        }
    }
})()