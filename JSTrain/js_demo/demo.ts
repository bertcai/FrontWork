let div1: HTMLDivElement = document.createElement('div')
div1.className = 'demo'
document.getElementsByTagName('body')[0].appendChild(div1)
let moveFlag: boolean = false
let lastX: number = 0
let lastY: number = 0
div1.onmousedown = function (e) {
    lastX = e.clientX
    lastY = e.clientY
    moveFlag = true
}
document.body.onmousemove = function (e) {
    if (moveFlag === true) {
        let deltaX: number = e.clientX - lastX
        let deltaY: number = e.clientY - lastY
        console.log(lastX)
        console.log(lastY)
        let y = parseInt(div1.style.top!) || 0
        let x = parseInt(div1.style.left!) || 0
        div1.style.left = x + deltaX + 'px'
        div1.style.top = y + deltaY + 'px'
        lastX = e.clientX
        lastY = e.clientY
    }
}
document.onmouseup = function () {
    moveFlag = false
}