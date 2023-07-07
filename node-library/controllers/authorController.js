const Author = require('../models/author');
const async = require('async');
const Book = require('../models/book');

// 显示完整的作者列表
exports.author_list = (req, res) => { 
    Author.find()
        .sort([['family_name', 'ascending']])
        .then((list_authors) => {
            res.render('author_list', { title: '作者列表', author_list: list_authors });
        }
    );
 };

// 为每位作者显示详细信息的页面
exports.author_detail = (req, res) => { 
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
                .then((author) => {
                    callback(null, author);
                }
            );
        },
        authors_books: function(callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .then((books) => {
                    callback(null, books);
                }
            );
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.author == null) {
            const err = new Error('未找到作者');
            err.status = 404;
            return next(err);
        }
        res.render('author_detail', { title: '作者详情', author: results.author, author_books: results.authors_books });
    });
 };

// 由 GET 显示创建作者的表单
exports.author_create_get = (req, res) => { res.send('未实现：作者创建表单的 GET'); };

// 由 POST 处理作者创建操作
exports.author_create_post = (req, res) => { res.send('未实现：创建作者的 POST'); };

// 由 GET 显示删除作者的表单
exports.author_delete_get = (req, res) => { res.send('未实现：作者删除表单的 GET'); };

// 由 POST 处理作者删除操作
exports.author_delete_post = (req, res) => { res.send('未实现：删除作者的 POST'); };

// 由 GET 显示更新作者的表单
exports.author_update_get = (req, res) => { res.send('未实现：作者更新表单的 GET'); };

// 由 POST 处理作者更新操作
exports.author_update_post = (req, res) => { res.send('未实现：更新作者的 POST'); };
