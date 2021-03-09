const query = require('./query.js')

module.exports = app => {
        const existsOrError = app.api.validation.existsOrError
        const notExistsOrError = app.api.validation.notExistsOrError

    async function save(req, resp){

        var article = {...req.body}

        if(req.params.id){
            article.id = req.params.id 
        }
         
        
        try{
            existsOrError(article.name, "Article's name can't be empty.")
            existsOrError(article.description, "Article's description can't be empty.")
            existsOrError(article.content, "Article's content can't be empty.")
            existsOrError(article.userId, "Article's user's id can't be empty.")
            existsOrError(article.categoryId, "Article's category's id can't be empty.")
        }catch(msg){
            return resp.status(400).send(msg)
        }


        if(!req.params.id){
            app
            .db
            .knex('articles')
            .insert(article)
            .then(_ => {
                return resp.status(204).send()
            })
            .catch(error => {
                return resp.status(500).send(error)
            })
        }else{
            app
            .db
            .knex('articles')
            .update({...article})
            .where({id: req.params.id})
            .then(_ => {
                return resp.status(204).send()
            })
            .catch(error => {
                return resp.status(500).send(error)
            })
        }
    }

    async function remove(req, resp){
        var deletedRows = await app.db.knex('articles').where({id: req.params.id}).del()   
    
        try{
            existsOrError(deletedRows, "Article not found.")
            return resp.status(200).send()
        }catch(msg){
            return resp.status(400).send(msg)
        }
    }

    function getById(req, resp){
        app
        .db
        .knex('articles')
        .where({id: req.params.id})
        .then(article => {
            return resp.status(200).send(article)
        })
        .catch(error => {
            return resp.status(500).send(error)
        })
    }

    const limit = 2

    async function get(req, resp){

        var paginator = req.query.page || 1

        var count = await app.db.knex('articles').count('id').first()

        count = parseInt(count.count)

        app
        .db
        .knex('articles')
        .select('id', 'name', 'description', 'userId', 'categoryId', 'content')
        .offset(paginator*limit - limit)
        .limit(limit)
        .orderBy('name')
        .then(articles => {
            articles = articles.map(article => {
                return { ...article, content: article.content.toString()}
            })
            return resp.status(200).send({data: articles, count, limit})
        })
        .catch(error => {
            return resp.status(500).status(error)
        })
    }

    async function getWithChildren(req, resp){
        var categoryId = req.params.id
        const page = req.query.page || 1
        console.log(categoryId)
        var ids = await app.db.knex.raw(query.getChildrenId, categoryId)
        ids = ids.rows.map(element => element.id)
        consnole.log(ids)

        app
        .db
        .knex({a: "articles", u:"users"})
        .select('a.id', 'a.name', 'a.description', 'a.imageUrl', {author: 'u.name'})
        .whereRaw('?? = ??', ['a.userId', 'u.id'])
        .whereIn('categoryId', ids)
        .limit(limit).offset(page*limit - limit)
        .orderBy('a.id', 'desc')
        .then(result => {
            return resp.status(200).send(result)
        })
        .catch(error => {
            return resp.status(500).send(error)
        })
    }

    return { save, getById, remove, get, getWithChildren}
}