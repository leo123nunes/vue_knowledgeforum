const admin = require('./admin.js')

module.exports = app => {
    // app.post('/signup', app.api.auth.signup)
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
        .get(admin(app.api.category.getById))

    app.route('/categories/remove/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.category.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.article.save))
        .get(app.api.article.get)

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.article.save))
        .get(admin(app.api.article.getById))

    app.route('/articles/remove/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getWithChildren)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)
}