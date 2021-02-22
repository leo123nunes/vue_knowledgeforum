const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function(){
        var articles = await app.db.knex('articles').count('id').first()
        var categories = await app.db.knex('categories').count('id').first()
        var users = await app.db.knex('users').count('id').first()

        const { Stat } = app.api.stat

        var latestStats = Stat.findOne({}, {}, {sort: {'createdAt': -1}})

        var stat = new Stat({
            users: users.count,
            categories: categories.count,
            articles: articles.count,
            createdAt: new Date()
        })

        var articlesChanged = !latestStats || stat.articles != latestStats.articles
        var categoriesChanged = !latestStats || stat.categories != latestStats.categories
        var usersChanged = !latestStats || stat.users != latestStats.users

        if(articlesChanged || categoriesChanged || usersChanged){
            stat.save().then(() => console.log('[Stats] Updated statistics.'))
        }else{
            console.log('[Stats] Statistics check, all the same.')
        }
    })
}