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

        this.render()
    },
    bind: function () {

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
            let $item = $(`<li>
                            <div class="cover"
                                style="background-image: url(https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=3c71bc94532c11dfded1b8255b1c05ed/bd3eb13533fa828bf8b6e694f91f4134970a5a2b.jpg);">
                            </div>
                            <h3>怀旧金曲</h3>
                        </li>`)
            $item.find('li').attr('data-channel-id', item.channel_id)
            $item.find('li').attr('data-channel-name', item.name)
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
        console.log(itemWidth, count)
        this.$ul.css({
            width: itemWidth * count
        })
    }
}

Footer.init()