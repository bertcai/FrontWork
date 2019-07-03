let musicList = []
const audio = new Audio()
audio.autoplay = true
let currentIndex = 0
let timeUpdate

getMusicList(function (list) {
    console.log(list)
    musicList = list
    loadMusic(musicList[currentIndex])
    generateList(musicList)
})

function $(query) {
    return document.querySelector(query)
}

function loadMusic(musicObj) {
    console.log(musicObj)
    audio.src = musicObj.src
    $('.info .title').innerText = musicObj.title
    $('.info .author').innerText = musicObj.author
    $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')'
}

console.log($('.control'))

$('.control .play i').onclick = function (e) {
    if (audio.paused === true) {
        audio.play()
    } else {
        audio.pause()
    }
}

$('.control .back i').onclick = function () {
    currentIndex = (musicList.length + --currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}

$('.control .next i').onclick = function () {
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}

$('.progress .bar').onclick = function (e) {
    let percent = e.offsetX / 400
    let now = Math.floor(audio.duration * percent)
    audio.currentTime = now
    $('.progress .bar .progress-now').style.width = percent * 100 + '%'
}

$('.music-box .list').onclick = function (e) {
    console.log(e.target.index)
    currentIndex = e.target.index
    loadMusic(musicList[currentIndex])
}


audio.onplaying = function () {
    let playBtn = $('.control .play i')
    if (playBtn.classList.contains('icon-play')) {
        playBtn.classList.remove('icon-play')
        playBtn.classList.add('icon-pause')
    }
    let listNode = $('.music-box .list')
    let itemList = listNode.getElementsByTagName('li')
    for (let i = 0; i < itemList.length; i++) {
        if (i === currentIndex) {
            itemList.item(i).classList.add('active')
        } else {
            itemList.item(i).classList.remove('active')
        }
    }
}

audio.onpause = function () {
    let playBtn = $('.control .play i')
    if (playBtn.classList.contains('icon-pause')) {
        playBtn.classList.add('icon-play')
        playBtn.classList.remove('icon-pause')
    }
}

audio.ontimeupdate = function () {
    let nowBar = $('.bar .progress-now')
    let width = audio.currentTime / audio.duration
    nowBar.style.width = width * 100 + '%'
    let timePayload = $('.progress .time')
    let min = Math.floor(audio.currentTime / 60)
    let sec = Math.floor(audio.currentTime % 60) + ''
    sec = sec.length === 2 ? sec : '0' + sec
    timePayload.innerText = min + ':' + sec
}

audio.onended = function () {
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}

function getMusicList(callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', './static/music.json')
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            const list = JSON.parse(xhr.responseText)
            callback(list)
        } else {
            console.log('Error: ' + xhr.status)
        }
    }
    xhr.send()
}

function generateList(list) {
    let listNode = $('.music-box .list')
    list.forEach((e, i) => {
        let li = document.createElement('li')
        let text = e.title + '-' + e.author
        li.innerText = text
        li.index = i
        listNode.appendChild(li)
    })
}