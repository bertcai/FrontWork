const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');

const async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = function (req, res) {
    async.parallel({
        book_count: function (callback) {
            Book.countDocuments({}).then((count) => {
                callback(null, count);
            });
        },
        book_instance_count: function (callback) {
            BookInstance.countDocuments({}).then((count) => {
                callback(null, count);
            });
        },
        book_instance_available_count: function (callback) {
            BookInstance.countDocuments({ status: 'Available' }).then((count) => {
                callback(null, count);
            });
        },
        author_count: function (callback) {
            Author.countDocuments({}).then((count) => {
                callback(null, count);
            });
        },
        genre_count: function (callback) {
            Genre.countDocuments({}).then((count) => {
                callback(null, count);
            });
        },
    }, function (err, results) {
        console.log(results);
        res.render('index', { title: '本地图书馆', error: err, data: results });
    });
};


// 显示完整的藏书列表
exports.book_list = (req, res, next) => {
    Book.find({}, { title: 1, author: 1 })
        .populate('author')
        .then((list_books) => {
            res.render('book_list', { title: '藏书列表', book_list: list_books });
        }
        );
};

// 为每本藏书显示详细信息的页面
exports.book_detail = (req, res, next) => {
    async.parallel({
        book: function (callback) {
            Book.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .then((book) => {
                    callback(null, book);
                }
                );
        },
        book_instance: function (callback) {
            BookInstance.find({ 'book': req.params.id })
                .then((bookinstances) => {
                    callback(null, bookinstances);
                }
                );
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.book == null) {
            const err = new Error('未找到该藏书');
            err.status = 404;
            return next(err);
        }
        res.render('book_detail', { title: results.book.title, book: results.book, book_instances: results.book_instance });
    });
};

// 由 GET 显示创建藏书的表单
exports.book_create_get = (req, res, next) => {
    // 获取所有的作者和类型，以便我们可以向他们提供藏书创建表单中的选项。
    async.parallel({
        authors: function (callback) {
            Author.find().then((authors) => {
                callback(null, authors);
            });
        },
        genres: function (callback) {
            Genre.find().then((genres) => {
                callback(null, genres);
            });
        },
    }, function (err, results) {
        if (err) { return next(err); }
        res.render('book_form', { title: '创建藏书', authors: results.authors, genres: results.genres });
    });
};

// 由 POST 处理藏书创建操作
exports.book_create_post = [
    // 将类型转换为数组
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined') req.body.genre = [];
            else req.body.genre = new Array(req.body.genre);
        }
        next();
    },

    // 校验和处理字段
    body('title', '标题必须填写。').trim().isLength({ min: 1 }).escape(),
    body('author', '作者必须填写。').trim().isLength({ min: 1 }).escape(),
    body('summary', '摘要必须填写。').trim().isLength({ min: 1 }).escape(),
    body('isbn', 'ISBN 必须填写').trim().isLength({ min: 1 }).escape(),
    body('genre.*').escape(),

    // 处理请求
    (req, res, next) => {
        const errors = validationResult(req);

        // 创建一个 Book 
        const book = new Book(
            {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                isbn: req.body.isbn,
                genre: req.body.genre,
            }
        );
        if (errors.isEmpty()) {
            // 数据有效，保存藏书
            book.save().then(() => {
                // 保存成功，重定向到新藏书的 URL
                res.redirect(book.url);
            });
        } else {
            // 有错误，重新渲染表单，用以显示错误
            // 获取所有的作者和类型，以便我们可以向他们提供藏书创建表单中的选项。
            async.parallel({
                authors: function (callback) {
                    Author.find().then((authors) => {
                        callback(null, authors);
                    });
                },
                genres: function (callback) {
                    Genre.find().then((genres) => {
                        callback(null, genres);
                    });
                },
            }, function (err, results) {
                if (err) { return next(err); }
                // 标记我们已经选择的类型
                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genre.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked = 'true';
                    }
                }
                res.render('book_form', { title: '创建藏书', authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
            });
        }
    }
]

// 由 GET 显示删除藏书的表单
exports.book_delete_get = (req, res, next) => { res.send('未实现：藏书删除表单的 GET'); };

// 由 POST 处理藏书删除操作
exports.book_delete_post = (req, res, next) => { res.send('未实现：删除藏书的 POST'); };

// 由 GET 显示更新藏书的表单
exports.book_update_get = (req, res, next) => { res.send('未实现：藏书更新表单的 GET'); };

// 由 POST 处理藏书更新操作
exports.book_update_post = (req, res, next) => { res.send('未实现：更新藏书的 POST'); };
