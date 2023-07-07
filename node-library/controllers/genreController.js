const Genre = require('../models/genre');

// 显示完整的藏书类别列表
exports.genre_list = (req, res, next) => { 
    Genre.find()
        .sort([['name', 'ascending']])
        .then((list_genres) => {
            res.render('genre_list', { title: '藏书类别列表', genre_list: list_genres });
        }
    );
 }

// 为每一类藏书显示详细信息的页面
exports.genre_detail = (req, res, next) => { res.send('未实现：藏书类别详细信息：' + req.params.id); }

// 由 GET 显示创建藏书类别的表单
exports.genre_create_get = (req, res, next) => { res.send('未实现：藏书类别创建表单的 GET'); }

// 由 POST 处理藏书类别创建操作
exports.genre_create_post = (req, res, next) => { res.send('未实现：创建藏书类别的 POST'); }

// 由 GET 显示删除藏书类别的表单
exports.genre_delete_get = (req, res, next) => { res.send('未实现：藏书类别删除表单的 GET'); }

// 由 POST 处理藏书类别删除操作
exports.genre_delete_post = (req, res, next) => { res.send('未实现：删除藏书类别的 POST'); }

// 由 GET 显示更新藏书类别的表单
exports.genre_update_get = (req, res, next) => { res.send('未实现：藏书类别更新表单的 GET'); }

// 由 POST 处理藏书类别更新操作
exports.genre_update_post = (req, res, next) => { res.send('未实现：更新藏书类别的 POST'); }
