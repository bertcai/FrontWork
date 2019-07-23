// 事件中心，监听全局事件
const EventListener = {
    on: function (type, handler) {
        $(document).on(type, handler)
    },
    fire: function (type, data) {
        $(document).trigger(type, data)
    }
}

EventListener.on('hello', function (e, data) {
    console.log(e, data)
})

EventListener.fire('hello', 'ssss')

let Footer = {
    init: function () {
        this.$footer = $('footer')
        this.$box = $('footer .box')
        this.$ul = $('footer ul')
        this.$backBtn = $('.icon-back')
        this.$forwardBtn = $('.icon-forward')
        this.isToStart = true
        this.isToEnd = false
        this.timer = null
        this.render()
        this.bind()
    },
    bind: function () {
        let _this = this
        this.$forwardBtn.on('click', function () {
            if (_this.timer) {
                console.log(_this.timer)
                clearTimeout(_this.timer)
            }
            _this.timer = setTimeout(function () {
                _this.forward()
            }, 300)
        })
        this.$backBtn.on('click', function () {
            if (_this.timer) {
                clearTimeout(_this.timer)
            }
            _this.timer = setTimeout(function () {
                _this.back()
            }, 300)
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
        $.getJSON('http://jirenguapi.applinzi.com/fm/getChannels.php')
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
        console.log(this)
        let _this = this
        this.isToEnd = false
        let itemWidth = _this.$ul.find('li').outerWidth(true)
        let itemCount = Math.floor(_this.$box.width() / itemWidth)
        let ulLeft = parseFloat(_this.$ul.css('left'))
        console.log(itemCount, itemWidth, ulLeft)
        if ((ulLeft + itemCount * itemWidth) > 0) {
            console.log('over')
            _this.isToStart = true
            _this.$ul.animate({
                left: 0
            }, 300)
        }
        if (!_this.isToStart) {
            _this.$ul.animate({
                left: '+=' + itemCount * itemWidth
            }, 300)
        }
    },
    forward: function () {
        console.log(this)
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
            _this.$ul.animate({
                left: '-=' + itemCount * itemWidth
            }, 300)
        }
    }
}



const App = {
    init: function () {
        EventListener.on('select-chanel', function (e, data) {
            console.log(data)
        })
        Footer.init()
    }
}

App.init()