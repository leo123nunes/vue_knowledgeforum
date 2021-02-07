module.exports = app => {
    const existsOrError = app.api.validation.existsOrError
    const notExistsOrError = app.api.validation.notExistsOrError
    const equalsOrError = app.api.validation.equalsOrError

    async function save(req, resp){
        const category = {...req.body}

        if(req.params.id){
            category.id = req.params.id
        }

        existsOrError(category.name, "Category doesn't have name.")

        if(category.id){
            app
            .db
            .knex('categories')
            .update(category)
            .where({id: category.id})
            .then(category => {
                return resp.status(204).send()
            })
            .catch(error => {
                return resp.status(500).send(error)
            })
        }else{
            app
            .db
            .knex('categories')
            .insert(category)
            .then(category => {
                return resp.status(204).send()
            })
            .catch(error => {
                return resp.status(500).send(error)
            })
        }
    }

    async function remove(req, resp){

        const id = req.params.id

        const category = await app.db.knex('categories').select('*').where({id}).first()

        try{
            existsOrError(category, "This category doesn't exists.")
        }catch(msg){
            return resp.status(400).send(msg)
        }

        const childrenCategories = await app.db.knex('categories').select('*').where({parentId: id})
        const articles = await app.db.knex('articles').select('*').where({categoryId: id})

        try{
            notExistsOrError(childrenCategories, "The category have children categories.")
            notExistsOrError(articles, "The category have articles.")
        }catch(msg){
            return resp.status(400).send(msg)
        }

        app
        .db
        .knex('categories')
        .where({id})
        .del()
        .then(category => {
            return resp.status(204).send()
        })
        .catch(error => {
            return resp.status(500).send(error)
        })
    }

    function getById(req, resp){
        app
        .db
        .knex('categories')
        .select('*')
        .where({id: req.params.id})
        .first()
        .then(category => {
            resp.status(200).send(category)
        })
        .catch(error => {
            resp.status(500).send(error)
        })
    }

    function get(req, resp){
        app
        .db
        .knex('categories')
        .select('*')
        .then(categories => { 
            return resp.status(200).send(withPath(categories))
        })
        .catch(error => {
            // return resp.status(500).send(error)
            console.log(error)
        })    
    }

    function withPath(categories){

        function getPath(cat, parentId){

            var parent = cat.filter(el => el.id === parentId)
    
            return parent.length > 0 ? parent[0] : null
        }

        function namesToPath(vector){
            var length = vector.length

            var result = ""

            while(length > 0){
                result = result.concat(vector[length - 1])

                length--

                if(length > 0){
                    result = result.concat(' > ')
                }
            }

            return result
        }

        var finalCategories = categories.map(element=>{
            var parentId = element.parentId

            var paths = []
            
            paths.push(element.name)

            parent = getPath(categories, parentId)

            while(parent){
                paths.push(parent.name)

                if(parent.parentId){
                    parent = getPath(categories, parent.parentId) 
                }else{
                    parent = null
                }   
            }

            element.path = namesToPath(paths)
            return element

        })

        return finalCategories
    }


   return { save, remove, get, getById } 
}