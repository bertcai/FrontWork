const BookInstance = require('../models/bookinstance');

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
exports.bookinstance_create_get = (req, res, next) => { res.send('未实现：藏书副本创建表单的 GET'); };

// 由 POST 处理藏书副本创建操作
exports.bookinstance_create_post = (req, res, next) => { res.send('未实现：创建藏书副本的 POST'); };

// 由 GET 显示删除藏书副本的表单
exports.bookinstance_delete_get = (req, res, next) => { res.send('未实现：藏书副本删除表单的 GET'); };

// 由 POST 处理藏书副本删除操作
exports.bookinstance_delete_post = (req, res, next) => { res.send('未实现：删除藏书副本的 POST'); };

// 由 GET 显示更新藏书副本的表单
exports.bookinstance_update_get = (req, res, next) => { res.send('未实现：藏书副本更新表单的 GET'); };

// 由 POST 处理藏书副本更新操作
exports.bookinstance_update_post = (req, res, next) => { res.send('未实现：更新藏书副本的 POST'); };
