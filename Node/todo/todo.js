const fs = require('fs')
const path = require('path')
const dbPath = path.join(__dirname, 'db.json')

function save(list) {
    fs.writeFileSync(dbPath, JSON.stringify(list))
}

function fetch() {
    let tasks = fs.readFileSync(dbPath)
    try {
        tasks = JSON.parse(tasks) || []
    } catch {
        tasks = []
    }
    return tasks
}

console.log('欢迎使用 cc-todo')
const operations = {
    add: function (content) {
        const task = {
            content: content,
            type: false
        }
        tasks.push(task)
    },
    delete: function (index) {
        tasks.splice(index - 1, 1)
    },
    clear: function () {
        tasks = []
    },
    list: function () {},
    done: function (index) {
        tasks[index - 1].type = true
    },
    edit: function (index, content = '') {
        tasks[index - 1].content = content
    }
}

function exec(verb, content, content2) {
    if (operations[verb]) {
        console.log('你执行的操作是：' + verb)
        if (content !== undefined) {
            console.log('操作的内容是：' + content)
        }
        operations[verb](content, content2)
    } else {
        console.log(verb + ' is not found')
    }
}

function display(tasks) {
    for (let e of tasks) {
        let flag = e.type ? '[x]' : '[ ]'
        console.log(flag + ' 任务：' + e.content)
    }
}

try {
    fs.statSync(dbPath)
} catch (error) {
    fs.writeFileSync(dbPath)
}
let tasks = fetch()
const verb = process.argv[2]
const content = process.argv[3]
const content2 = process.argv[4]
exec(verb, content, content2)
save(tasks)
display(tasks)