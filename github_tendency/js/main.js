$('footer div').on('click', function () {
    let index = $(this).index()
    console.log(index)
    $('section').hide().eq(index).fadeIn()
    $(this).addClass('active').siblings().removeClass('active')
})

let index = 0

getData()

function getData() {
    $.ajax({
        url: 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc',
        type: 'get',
        data: {
            page: index
        }
    }).done(function (ret) {
        console.log(ret)
        create(ret)
        index++
    }).fail(function () {
        console.log('fail...')
    })
}

function create(res) {
    res.items.forEach(function (repo, i) {
        //    console.log(repo)
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
        $item.find('.order span').text(index*30+i+1)
        $item.find('.detail h2').text(repo.name)
        $item.find('.detail .description').text(repo.description)
        $item.find('.detail .extra .star-count').text(repo.stargazers_count)
        $item.find('a').attr('href',repo.html_url)
        $('.top-repos .container').append($item)
    })
}

$('main').on('scroll',function(){
    if($(this).height()+$(this).scrollTop()+30>$('.container').height()){
        getData()
    }
})