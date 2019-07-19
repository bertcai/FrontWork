## 瀑布流新闻站

## 预览地址


## 懒加载原理

页面初始化时不加载只加载展现在用户面前的内容，其他内容当用户通过操作遇到了再加载，减少初次加载时的加载量，提高效率。

1. 设置图片默认动画，一般设置成一个loading图。
2. 通过判断滚动容器视窗高度`height`，容器滚动高度`scrollTop`，图片相对于容器的高度`offsetHeight`三个值，`heigth+scrollTop>=offsetHeight`时表示图片出现在了用户视野中，此时加载图片。
3. 滚动事件可以使用函数节流的方式减少事件触发次数，提高效率，已加载图片可以设置标志，减少图拍链接修改次数，提高效率。

## 瀑布流原理

设置一个容器，设置待展示元素的基本宽度，根据容器宽度计算除瀑布流的列数，每次加载新元素时，通过绝对定位将元素拼接到高度最低的列，形成瀑布流。

1. 通过容器宽度和需要进行布局的元素宽度计算除瀑布列数
2. 设置一个数组，数组长度就是瀑布列数，值时对应列数的高度
3. 当一个新的待布局元素加载时，使用绝对定位，将其拼接到高度最低的列后面
4. 依次加载，就实现了一个瀑布流布局


## 实现原理

### 懒加载核心

判断滚动容器视窗高度`height`，容器滚动高度`scrollTop`，元素相对于容器的高度`offsetHeight`三个值，`heigth+scrollTop>=offsetHeight`时表示元素出现在了用户视野中，此时加载元素。

```javascript
$(window).on('scroll', function () {
    if (timer) {
        clearTimeout(timer)
    }
    if (!isDataArrive) {
        return
    }
    timer = setTimeout(function () {
        if (isLoadShow()) {
            start()
        }
    }, 100)
})

// 判断是否滚动到需要加载新内容的位置
function isLoadShow() {
    return $(window).height() + $(window).scrollTop() > $('#load').offset().top
}
```

### 瀑布流核心

设置一个列高数组`colHeightArray`,每次加载新元素时，查找数组高度最低的列数`minIndex`，将新元素拼接在该列后面，更新高度`colHeightArray[minIndex] += itemHeight`,依次加载拼接元素，实现瀑布流。

``` javascript
function waterFallPlace($node) {
    console.log($node)
    let minIndex = 0;
    let minHeight = colHeightArray[minIndex]
    for (let i = 0; i < colCount; i++) {
        if (colHeightArray[i] < minHeight) {
            minIndex = i;
            minHeight = colHeightArray[i];
        }
    }
    $node.css({
        left: minIndex * 300,
        top: minHeight,
        opacity: 1
    })
    colHeightArray[minIndex] += $node.outerHeight(true)
    $('.ct-news').height(colHeightArray[minIndex])
}
```
