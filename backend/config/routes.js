module.exports = app => {
    // app.post('/signup', app.api.auth.signup)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.getById)

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .post(app.api.category.save)
        .get(app.api.category.get)

    app.route('/categories/three')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getThree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.category.save)
        .get(app.api.category.getById)

    app.route('/categories/remove/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.category.remove)

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .post(app.api.article.save)
        .get(app.api.article.get)

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.article.save)
        .get(app.api.article.getById)

    app.route('/articles/remove/:id')
        .all(app.config.passport.authenticate())
        .delete(app.api.article.remove)

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getWithChildren)
}