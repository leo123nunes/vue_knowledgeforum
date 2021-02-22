const app = require('express')()
const consign = require('consign')
const db = require('./config/db.js')
const mongoose = require('mongoose')

require('./config/mongo.js')

app.mongoose = mongoose
app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/auth.js')
    .then('./api/validation.js')
    .then('./api/category.js')
    .then('./api/article.js')
    .then('./api/user.js')
    .then('./api/stat.js')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(3000, () => {
    console.log('The backend is running...')
})