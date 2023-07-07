var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

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
    Book.find({}, {title: 1, author: 1})
        .populate('author')
        .then((list_books) => {
            res.render('book_list', { title: '藏书列表', book_list: list_books });
        }
    );
};

// 为每本藏书显示详细信息的页面
exports.book_detail = (req, res, next) => { res.send('未实现：藏书详细信息：' + req.params.id); };

// 由 GET 显示创建藏书的表单
exports.book_create_get = (req, res, next) => { res.send('未实现：藏书创建表单的 GET'); };

// 由 POST 处理藏书创建操作
exports.book_create_post = (req, res, next) => { res.send('未实现：创建藏书的 POST'); };

// 由 GET 显示删除藏书的表单
exports.book_delete_get = (req, res, next) => { res.send('未实现：藏书删除表单的 GET'); };

// 由 POST 处理藏书删除操作
exports.book_delete_post = (req, res, next) => { res.send('未实现：删除藏书的 POST'); };

// 由 GET 显示更新藏书的表单
exports.book_update_get = (req, res, next) => { res.send('未实现：藏书更新表单的 GET'); };

// 由 POST 处理藏书更新操作
exports.book_update_post = (req, res, next) => { res.send('未实现：更新藏书的 POST'); };
