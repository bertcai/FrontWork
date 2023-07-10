const Genre = require('../models/genre');
const Book = require('../models/book');
const async = require('async');
const { body, validationResult } = require('express-validator');

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
exports.genre_detail = (req, res, next) => {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .then((genre) => {
                    callback(null, genre);
                });
        },
        genre_books: function (callback) {
            Book.find({ 'genre': req.params.id })
                .then((books) => {
                    callback(null, books);
                });
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.genre == null) {
            const err = new Error('未找到藏书类别');
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', { title: '藏书类别详情', genre: results.genre, genre_books: results.genre_books });
    }
    );
}

// 由 GET 显示创建藏书类别的表单
exports.genre_create_get = (req, res, next) => {
    res.render('genre_form', { title: '创建藏书类别' });
}

// 由 POST 处理藏书类别创建操作
exports.genre_create_post = [
    // 对 name 字段进行验证
    body('name', '藏书类别名不能为空').isLength({ min: 1 }).trim(),

    // 对 name 字段进行去除首尾空格及转义
    body('name').trim().escape(),

    // 处理请求
    (req, res, next) => {
        const errors = validationResult(req);

        // 创建 Genre 对象
        const genre = new Genre({ name: req.body.name });

        if (!errors.isEmpty()) {
            res.render('genre_form', { title: '创建藏书类别', genre: genre, errors: errors.array() });
            return;
        } else {
            Genre.findOne({ 'name': req.body.name })
                .then((found_genre) => {
                    if (found_genre) {
                        res.redirect(found_genre.url);
                    } else {
                        genre.save()
                            .then(() => {
                                res.redirect(genre.url);
                            });
                    }
                })
        }
    }
]

// 由 GET 显示删除藏书类别的表单
exports.genre_delete_get = (req, res, next) => { 
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .then((genre) => {
                    callback(null, genre);
                });
        },
        genre_books: function (callback) {
            Book.find({ 'genre': req.params.id })
                .then((books) => {
                    callback(null, books);
                });
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.genre == null) {
            res.redirect('/catalog/genres');
        }
        res.render('genre_delete', { title: '删除藏书类别', genre: results.genre, genre_books: results.genre_books });
    }
    );
}

// 由 POST 处理藏书类别删除操作
exports.genre_delete_post = (req, res, next) => { 
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.body.genreid)
                .then((genre) => {
                    callback(null, genre);
                });
        },
        genre_books: function (callback) {
            Book.find({ 'genre': req.body.genreid })
                .then((books) => {
                    callback(null, books);
                });
        }
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.genre_books.length > 0) {
            res.render('genre_delete', { title: '删除藏书类别', genre: results.genre, genre_books: results.genre_books });
            return;
        } else {
            Genre.findByIdAndRemove(req.body.genreid)
                .then(() => {
                    res.redirect('/catalog/genres');
                });
        }
    });
}

// 由 GET 显示更新藏书类别的表单
exports.genre_update_get = (req, res, next) => { res.send('未实现：藏书类别更新表单的 GET'); }

// 由 POST 处理藏书类别更新操作
exports.genre_update_post = (req, res, next) => { res.send('未实现：更新藏书类别的 POST'); }
