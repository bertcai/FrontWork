// 事件中心，监听全局事件
const EventListener = {
    on: function (type, handler) {
        $(document).on(type, handler)
    },
    fire: function (type, data) {
        $(document).trigger(type, data)
    }
}

// EventListener.on('hello', function (e, data) {
//     console.log(e, data)
// })

// EventListener.fire('hello', 'ssss')

let Footer = {
    init: function () {
        this.$footer = $('footer')
        this.$box = $('footer .box')
        this.$ul = $('footer ul')
        this.$backBtn = $('.icon-back')
        this.$forwardBtn = $('.icon-forward')
        this.isToStart = true
        this.isToEnd = false
        this.isAnimate = false
        this.render()
        this.bind()
    },
    bind: function () {
        let _this = this
        this.$forwardBtn.on('click', function () {
            if (_this.isAnimate) {
                return
            }
            _this.forward()
        })
        this.$backBtn.on('click', function () {
            if (_this.isAnimate) {
                return
            }
            _this.back()
        })
        this.$footer.on('click', 'li', function () {
            $(this).addClass('active')
                .siblings()
                .removeClass('active')
            EventListener.fire('select-chanel', {
                channel_id: $(this).attr('data-channel-id'),
                channel_name: $(this).attr('data-channel-name')
            })
        })
    },
    render: function () {
        let _this = this
        $.getJSON('//jirenguapi.applinzi.com/fm/getChannels.php')
            .done(function (res) {
                _this.renderFooter(res.channels)
            })
    },
    renderFooter: function (data) {
        let _this = this
        // console.log(data)
        data.forEach(function (item) {
            let $item = $(`<li data-channel-id="${item.channel_id}" data-channel-name="${item.name}">
                            <div class="cover"
                                
                                style="background-image: url(https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=3c71bc94532c11dfded1b8255b1c05ed/bd3eb13533fa828bf8b6e694f91f4134970a5a2b.jpg);">
                            </div>
                            <h3>怀旧金曲</h3>
                        </li>`)
            $item.find('h3').text(item.name)
            $item.find('.cover').css({
                backgroundImage: `url(${item.cover_small})`
            })
            _this.$ul.append($item)
        })
        this.setStyle()
    },
    setStyle: function () {
        let itemWidth = this.$ul.find('li').outerWidth(true)
        let count = this.$ul.find('li').length
        // console.log(itemWidth, count)
        this.$ul.css({
            width: itemWidth * count
        })
    },
    back: function () {
        // console.log(this)
        let _this = this
        this.isToEnd = false
        let itemWidth = _this.$ul.find('li').outerWidth(true)
        let itemCount = Math.floor(_this.$box.width() / itemWidth)
        let ulLeft = parseFloat(_this.$ul.css('left'))
        console.log(itemCount, itemWidth, ulLeft)
        if ((ulLeft + itemCount * itemWidth) > -10) {
            console.log('over')
            _this.isToStart = true
            _this.isAnimate = true
            _this.$ul.animate({
                left: 0
            }, 400, function () {
                _this.isAnimate = false
            })
        }
        if (!_this.isToStart) {
            console.log('sss')
            _this.isAnimate = true
            _this.$ul.animate({
                left: '+=' + itemCount * itemWidth
            }, 400, function () {
                _this.isAnimate = false
            })
        }
        console.log(parseFloat(_this.$ul.css('left')))
    },
    forward: function () {
        // console.log(this)
        let _this = this
        _this.isToStart = false
        let itemWidth = _this.$ul.find('li').outerWidth(true)
        let itemCount = Math.floor(_this.$box.width() / itemWidth)
        // console.log(itemCount, itemWidth)
        let boxWidth = parseFloat(_this.$box.width())
        let ulLeft = parseFloat(_this.$ul.css('left'))
        if ((boxWidth - ulLeft >= _this.$ul.width())) {
            console.log('over')
            _this.isToEnd = true
        }
        if (!_this.isToEnd) {
            _this.isAnimate = true
            _this.$ul.animate({
                left: '-=' + itemCount * itemWidth

            }, 400, function () {
                _this.isAnimate = false
            })
        }
    }
}

let Fm = {
    init: function () {
        this.$container = $('#page-music')
        this.audio = new Audio()
        this.audio.autoplay = true
        this.statusInterval = null
        this.bind()
    },
    bind: function () {
        let _this = this
        EventListener.on('select-chanel', function (e, data) {
            console.log(data)
            _this.channel_id = data.channel_id
            _this.channel_name = data.channel_name
            _this.loadMusic()
        })
        this.$container.find('.btn-play').on('click', function () {
            if ($(this).hasClass('icon-play')) {
                $(this).removeClass('icon-play').addClass('icon-pause')
                _this.audio.play()
            } else {
                $(this).removeClass('icon-pause').addClass('icon-play')
                _this.audio.pause()
            }
        })
        this.$container.find('.btn-next').on('click', function () {
            _this.loadMusic()
        })
        this.$container.find('.progress-bar').on('click', function (e) {
            let currentX = e.offsetX
            let width = parseFloat($(this).css('width'))
            let percent = Math.floor(currentX / width * 100)
            // console.log(percent)
            $(this).find('.current-bar').css('width', percent + '%')
            _this.audio.currentTime = _this.audio.duration * percent / 100
        })
        this.audio.addEventListener('play', function () {
            if (_this.statusInterval) {
                clearInterval(_this.statusInterval)
            }
            _this.statusInterval = setInterval(function () {
                _this.updateStatus()
            }, 500)
        })
        this.audio.addEventListener('pause', function () {
            if (_this.statusInterval) {
                clearInterval(_this.statusInterval)
            }
            clearInterval(_this.statusInterval)
        })
        this.audio.addEventListener('ended', function () {
            _this.loadMusic()
        })
    },
    loadMusic() {
        let _this = this
        $.getJSON('//api.jirengu.com/fm/getSong.php', {
            channel: _this.channel_id
        }).done(function (res) {
            // console.log(res)
            _this.song = res.song[0]
            console.log(_this.song)
            _this.setMusic()
            _this.loadLyric()
        }).fail(function () {
            console.log('song fail...')
        })
    },
    setMusic() {
        this.audio.src = this.song.url
        this.$container.find('.tag').text(this.channel_name)
        this.$container.find('.detail h1').text(this.song.title)
        this.$container.find('.author').text(this.song.artist)
        this.$container.find('figure').css('background-image', `url(${this.song.picture})`)
        $('.bg').css('background-image', `url(${this.song.picture})`)
        this.$container.find('.btn-play').removeClass('icon-play').addClass('icon-pause')
    },
    loadLyric() {
        let _this = this
        $.getJSON('//api.jirengu.com/fm/getLyric.php', {
            sid: _this.song.sid
        }).done(function (res) {
            // console.log(res)
            _this.lyric = res.lyric
            // console.log(_this.lyric)
            _this.setLyricObj()
        }).fail(function () {
            console.log('lyric fail...')
            _this.lyricObj = {
                '00:00': '该歌曲暂无歌词'
            }
        })
    },
    setLyricObj() {
        let lyric = this.lyric.split('\n')
        let lyricObj = {}
        lyric.forEach(function (line) {
            // [01:22][02:22]
            // console.log(line)
            let times = line.match(/\d{2}:\d{2}/g)
            let str = line.replace(/\[.+?\]/g, '')
            // console.log(str)
            if (Array.isArray(times)) {
                lyricObj[times] = str
            }
            // console.log(times)
        })
        this.lyricObj = lyricObj
    },
    updateStatus() {
        let min = Math.floor(this.audio.currentTime / 60)
        let seconds = Math.floor(this.audio.currentTime % 60)
        seconds = seconds.toString().length === 2 ? seconds.toString() : '0' + seconds.toString()
        let timeStr = min + ':' + seconds
        // console.log(timeStr)
        this.$container.find('.current-time').text(timeStr)

        let percent = Math.floor((this.audio.currentTime / this.audio.duration) * 100)
        this.$container.find('.current-bar').css({
            width: percent + '%'
        })


        let lyric = this.lyricObj['0' + timeStr] || 'undefined'
        if (lyric !== 'undefined') {
            console.log(this.lyricObj['0' + timeStr])
            this.$container.find('.lyric').text(lyric).boomText()
        }
    }
}



const App = {
    init: function () {
        Fm.init()
        Footer.init()
    }
}

App.init()

$.fn.boomText = function (type = 'rotateInDownLeft') {
    $(this).html(function () {
        let arr = $(this).text().split('').map(function (e) {
            return `<span class="boomText">${e}</span>`
        })
        return arr.join('')
    })
    let index = 0
    let $boomText = $(this).find('span')
    let clock = setInterval(function () {
        $boomText.eq(index).addClass('animated ' + type)
        index++
        if (index > $boomText.length) {
            clearInterval(clock)
        }
    }, 300)
}