module.exports = app => {
    async function save(req, resp){
        const existsOrError = app.api.validation.existsOrError
        const notExistsOrError = app.api.validation.notExistsOrError

        var article = {...req.body}

        console.log(article)

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

        // article.content = article.content.toString()

        console.log(article)


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

    async function get(req, resp){
        const limit = 10

        var paginator = req.query.id || 1

        var count = await app.db.knex('articles').count('id').first()

        count = parseInt(count.count)

        app
        .db
        .knex('articles')
        .select('id', 'name', 'description')
        .offset(paginator*limit - limit)
        .then(article => {
            return resp.status(200).send({data: article, count, limit})
        })
        .catch(error => {
            return resp.status(500).status(error)
        })
    }

    return { save, getById, remove, get}
}