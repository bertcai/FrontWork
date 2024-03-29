const BookInstance = require('../models/bookinstance');

const Book = require('../models/book');
const { body, validationResult } = require('express-validator');
const async = require('async');

// 显示完整的藏书副本列表
exports.bookinstance_list = (req, res, next) => {
    BookInstance.find()
        .populate('book')
        .then((list_bookinstances) => {
            res.render('bookinstance_list', { title: '藏书副本列表', bookinstance_list: list_bookinstances });
        }
        );
}

// 为藏书的每一本副本显示详细信息的页面
exports.bookinstance_detail = (req, res, next) => {
    BookInstance.findById(req.params.id)
        .populate('book')
        .then((bookinstance) => {
            if (bookinstance == null) {
                const err = new Error('未找到藏书副本');
                err.status = 404;
                return next(err);
            }
            res.render('bookinstance_detail', { title: '藏书副本详情', bookinstance: bookinstance });
        }
        );
};

// 由 GET 显示创建藏书副本的表单
exports.bookinstance_create_get = (req, res, next) => {
    Book.find({}, 'title')
        .then((books) => {
            res.render('bookinstance_form', { title: '创建藏书副本', book_list: books });
        });
};

// 由 POST 处理藏书副本创建操作
exports.bookinstance_create_post = [
    // Validate and sanitize fields.
    body('book', '藏书必须指定').trim().isLength({ min: 1 }).escape(),
    body('imprint', '印刷信息必须指定').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', '无效的日期').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        const errors = validationResult(req);
        let bookinstance = new BookInstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                due_back: req.body.due_back,
            }
        );
        if (!errors.isEmpty()) {
            Book.find({}, 'title')
                .then((books) => {
                    res.render('bookinstance_form', { title: '创建藏书副本', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
                });
            return;
        } else {
            bookinstance.save()
                .then(() => {
                    res.redirect(bookinstance.url);
                });
        }
    }
]

// 由 GET 显示删除藏书副本的表单
exports.bookinstance_delete_get = (req, res, next) => {
    BookInstance.findById(req.params.id)
        .populate('book')
        .then((bookinstance) => {
            if (bookinstance == null) {
                res.redirect('/catalog/bookinstances');
            }
            res.render('bookinstance_delete', { title: '删除藏书副本', bookinstance: bookinstance });
        });
};

// 由 POST 处理藏书副本删除操作
exports.bookinstance_delete_post = (req, res, next) => {
    BookInstance.findByIdAndRemove(req.body.bookinstanceid)
        .then(() => {
            res.redirect('/catalog/bookinstances');
        })
};

// 由 GET 显示更新藏书副本的表单
exports.bookinstance_update_get = (req, res, next) => {
    async.parallel({
        bookinstance: function (callback) {
            BookInstance.findById(req.params.id)
                .populate('book')
                .then((bookinstance) => {
                    callback(null, bookinstance);
                });
        },
        books: function (callback) {
            Book.find({}, 'title')
                .then((books) => {
                    callback(null, books);
                });
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.bookinstance == null) {
            const err = new Error('未找到藏书副本');
            err.status = 404;
            return next(err);
        }
        res.render('bookinstance_form', { title: '更新藏书副本', book_list: results.books, selected_book: results.bookinstance.book._id, bookinstance: {
            _id: results.bookinstance._id,
            book: results.bookinstance.book._id,
            imprint: results.bookinstance.imprint,
            status: results.bookinstance.status,
            due_back: results.bookinstance.due_back.toISOString().slice(0, 10)
        } });
    });
};

// 由 POST 处理藏书副本更新操作
exports.bookinstance_update_post = [
    // Validate and sanitize fields.
    body('book', '藏书必须指定').trim().isLength({ min: 1 }).escape(),
    body('imprint', '印刷信息必须指定').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', '无效的日期').optional({ checkFalsy: true }).isISO8601().toDate(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        const errors = validationResult(req);
        let bookinstance = new BookInstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                due_back: req.body.due_back,
                _id: req.params.id
            }
        );
        if (!errors.isEmpty()) {
            Book.find({}, 'title')
                .then((books) => {
                    res.render('bookinstance_form', { title: '更新藏书副本', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
                });
            return;
        } else {
            BookInstance.findByIdAndUpdate(req.params.id, bookinstance)
                .then(() => {
                    res.redirect(bookinstance.url);
                });
        }
    }
]
