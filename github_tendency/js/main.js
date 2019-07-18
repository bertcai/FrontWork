let Helper = {
    isToBottom: function ($container, $content) {
        // console.log($container.height() + ' ' + $container.scrollTop() + ' ' + $content.height())
        return $container.height() + $container.scrollTop() + 30 > $content.height()
    }
}

let App = {
    init: function () {
        this.$tabs = $('footer div')
        this.$section = $('section')
        this.bind()
        TopRepos.init()
        TopUsers.init()
        Search.init()
    },
    bind: function () {
        let _this = this
        this.$tabs.on('click', function () {
            let index = $(this).index()
            console.log(index)
            _this.$section.hide().eq(index).fadeIn()
            $(this).addClass('active').siblings().removeClass('active')
        })
    }
}

let TopRepos = {
    init: function () {
        this.$container = $('.top-repos')
        this.$content = $('.top-repos .container')
        this.isLoading = false
        this.page = 0
        this.count = 30
        this.isFinished = false
        this.clock = null
        let _this = this
        this.bind()
        this.getData(function (result) {
            _this.render(result)
        })
    },
    bind: function () {
        let _this = this
        this.$container.on('scroll', function () {
            if (_this.clock) {
                clearTimeout(this.clock)
            }
            _this.clock = setTimeout(function () {
                if (Helper.isToBottom(_this.$container, _this.$content) && !_this.isFinished && !_this.isLoading) {
                    console.log('To Bottom ...')
                    _this.getData(function (res) {
                        _this.render(res)
                        if (_this.page * _this.count > res.total_count) {
                            _this.isFinished = true
                        }
                    })
                }
            }, 300)
        })
    },
    getData: function (callback) {
        let _this = this
        if (this.isLoading) return
        this.isLoading = true
        this.$container.find('.loading').show(400)
        $.ajax({
            url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
            type: 'get',
            data: {
                page: this.page
            }
        }).done(function (ret) {
            console.log(ret)
            _this.$container.find('.loading').hide(400)
            callback(ret)
            _this.page++
        }).fail(function () {
            console.log('fail...')
        }).always(function () {
            _this.isLoading = false
        })
    },
    render: function (res) {
        let _this = this
        res.items.forEach(function (repo, i) {
            console.log(repo)
            let $item = _this.createNode(repo, i, _this.page)
            _this.$content.append($item)
        })
    },
    createNode: function (obj, i, base) {
        let $item = $(` <div class="item">
                            <a href="#">
                                <div class="order"><span>1</span></div>
                                <div class="detail">
                                    <h2>node</h2>
                                    <div class="description">node description</div>
                                    <div class="extra">
                                        <span class="star-count">7777</span>
                                    star
                                    </div>
                                </div>
                            </a>
                        </div>`)
        $item.find('.order span').text(base * 30 + i + 1)
        $item.find('.detail h2').text(obj.name)
        $item.find('.detail .description').text(obj.description)
        $item.find('.detail .extra .star-count').text(obj.stargazers_count)
        $item.find('a').attr('href', obj.html_url)
        return $item
    }
}

let TopUsers = {
    init: function () {
        this.$container = $('.top-users')
        this.$content = $('.top-users .container')
        this.isLoading = false
        this.page = 1
        this.count = 30
        this.isFinished = false
        this.clock = null
        let _this = this
        this.bind()
        this.getData(function (result) {
            _this.render(result)
        })
    },
    bind: function () {
        let _this = this
        this.$container.on('scroll', function () {
            if (_this.clock) {
                clearTimeout(this.clock)
            }
            _this.clock = setTimeout(function () {
                if (Helper.isToBottom(_this.$container, _this.$content) && !_this.isFinished && !_this.isLoading) {
                    console.log('To Bottom ...')
                    _this.getData(function (res) {
                        _this.render(res)
                        if (_this.page * _this.count > res.total_count) {
                            _this.isFinished = true
                        }
                    })
                }
            }, 300)
        })
    },
    getData: function (callback) {
        let _this = this
        if (this.isLoading) return
        this.isLoading = true
        this.$container.find('.loading').show(400)
        $.ajax({
            url: 'https://api.github.com/search/users?q=followers:%3E1000+language:javascript',
            type: 'get',
            data: {
                page: this.page
            }
        }).done(function (ret) {
            console.log(ret)
            _this.$container.find('.loading').hide(400)
            callback(ret)
            _this.page++
        }).fail(function () {
            console.log('fail...')
        }).always(function () {
            _this.isLoading = false
        })
    },
    render: function (res) {
        let _this = this
        res.items.forEach(function (repo, i) {
            console.log(repo)
            let $item = _this.createNode(repo)
            _this.$content.append($item)
        })
    },
    createNode: function (obj) {
        let $item = $(` <div class="item">
                            <a href="#">
                                <img src="https://avatars0.githubusercontent.com/u/905434?v=4" class="avatar">
                                <div class="detail">
                                    <h2></h2>
                                </div>
                            </a>
                        </div>`)
        $item.find('.avatar').attr('src', obj.avatar_url)
        $item.find('.detail h2').text(obj.login)
        $item.find('a').attr('href', obj.html_url)
        return $item
    }
}


let Search = {
    init: function () {
        this.$container = $('.search')
        this.$content = $('.search .container')
        this.$btn = $('.search .btn')
        this.$input = $('.search .keyword')
        this.isLoading = false
        this.page = 0
        this.count = 30
        this.isFinished = false
        this.clock = null
        this.keyword = null
        this.bind()
    },
    bind: function () {
        let _this = this
        this.$btn.on('click', function () {
            console.log('aaaa')
            _this.keyword = _this.$input.val()
            _this.getData(function (result) {
                _this.render(result)
            })
        })
        this.$container.on('scroll', function () {
            if (_this.clock) {
                clearTimeout(this.clock)
            }
            _this.clock = setTimeout(function () {
                if (Helper.isToBottom(_this.$container, _this.$content) && !_this.isFinished && !_this.isLoading) {
                    console.log('To Bottom ...')
                    _this.getData(function (res) {
                        _this.render(res)
                        if (_this.page * _this.count > res.total_count) {
                            _this.isFinished = true
                        }
                    })
                }
            }, 300)
        })
    },
    getData: function (callback) {
        let _this = this
        if (this.isLoading) return
        this.isLoading = true
        this.$container.find('.loading').show(400)
        $.ajax({
            url: 'https://api.github.com/search/repositories?sort=stars&order=desc',
            type: 'get',
            data: {
                page: this.page,
                q: this.keyword + '+language:javascript'
            }
        }).done(function (ret) {
            console.log(ret)
            _this.$container.find('.loading').hide(400)
            callback(ret)
            _this.page++
        }).fail(function () {
            console.log('fail...')
        }).always(function () {
            _this.isLoading = false
        })
    },
    render: function (res) {
        let _this = this
        res.items.forEach(function (repo, i) {
            console.log(repo)
            let $item = _this.createNode(repo, i, _this.page)
            _this.$content.append($item)
        })
    },
    createNode: function (obj, i, base) {
        let $item = $(` <div class="item">
                            <a href="#">
                                <div class="order"><span>1</span></div>
                                <div class="detail">
                                    <h2>node</h2>
                                    <div class="description">node description</div>
                                    <div class="extra">
                                        <span class="star-count">7777</span>
                                    star
                                    </div>
                                </div>
                            </a>
                        </div>`)
        $item.find('.order span').text(base * 30 + i + 1)
        $item.find('.detail h2').text(obj.name)
        $item.find('.detail .description').text(obj.description)
        $item.find('.detail .extra .star-count').text(obj.stargazers_count)
        $item.find('a').attr('href', obj.html_url)
        return $item
    }
}

App.init()