# 原生JS实现音乐播放器

## 简介

这是一个原生JS实现的音乐播放器，音乐源使用了网上的音乐外链，音乐的播放使用了HTML的AUDIO实现，AJAX请求使用原生的XMLHttpRequest进行。

## 核心功能

### 播放相关操作

```javascript
// 播放/暂停
$('.control .play i').onclick = function (e) {
    if (audio.paused === true) {
        audio.play()
    } else {
        audio.pause()
    }
}

// 上一曲
$('.control .back i').onclick = function () {
    currentIndex = (musicList.length + --currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}

// 下一曲
$('.control .next i').onclick = function () {
    currentIndex = (++currentIndex) % musicList.length
    loadMusic(musicList[currentIndex])
}
```

### 进度条

```javascript
// 点击进度条跳转到对应块区播放歌曲
$('.progress .bar').onclick = function (e) {
    let percent = e.offsetX / 400
    let now = Math.floor(audio.duration * percent)
    audio.currentTime = now
    $('.progress .bar .progress-now').style.width = percent * 100 + '%'
}

// 根据播放时间变动进度条
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
```

### 列表

```javascript
// 生成播放列表，给列表对应li赋index
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

// 监听播放事件，高亮对应歌曲
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
```
