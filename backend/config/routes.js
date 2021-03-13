const admin = require('./admin.js')

module.exports = app => {

    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.save))
        .get(admin(app.api.category.get))

    app.route('/categories/three')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getThree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.save))
        .get(app.api.category.getById)
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.article.save))
        .get(app.api.article.get)

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.article.save))
        .get(app.api.article.getById)
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getWithChildren)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}