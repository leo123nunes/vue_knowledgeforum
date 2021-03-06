const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const existsOrError = app.api.validation.existsOrError
    const notExistsOrError = app.api.validation.notExistsOrError
    const equalsOrError = app.api.validation.equalsOrError

    function decrypt(password){
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    async function save(req, resp){

        console.log(req.body)

        const user = {...req.body}

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        if(req.params.id){
            user.id = req.params.id
        } 

        try{
            existsOrError(user.name, "Invalid name.")
            existsOrError(user.email, 'Invalid email')
            existsOrError(user.password, 'Invalid password')
            existsOrError(user.confirmPassword, 'Invalid confirmed password')
            equalsOrError(user.password, user.confirmPassword, 'Password and confirm password are not the same.')

            if(!user.id){
                const result = await app.db.knex('users').where({email: user.email}).first().then(result => result)
                notExistsOrError(result, 'Email already registered.')
            }
            
        }catch(msg){
            return resp.status(400).send(msg)
        }

        user.password = decrypt(user.password)
        delete user.confirmPassword

        if(user.id){
            return app
            .db
            .knex('users')
            .where({id: user.id})
            .whereNull('deletedAt')
            .update({...user})
            .then(user => {
                resp.status(204).send()
            })
            .catch(() => {
                resp.status(500).send()
            })
        }else{
            return app
            .db
            .knex('users')
            .insert({...user})
            .then(user => {
                resp.status(204).send()
            })
            .catch(() => {
                resp.status(500).send()
            })
        }
        
        
    }

    function get(req, resp){

        return app
        .db
        .knex('users')
        .select('id', 'name', 'email', 'admin')
        .whereNull('deletedAt')
        .then(users => {
            resp.send(resp.json(users))
        })
        .catch(error => {
            resp.status(500).send()
        })
    }

    function getById(req, resp){
        const id = req.params.id
        return app.db.knex('users').select('*').where({id}).whereNull('deletedAt').first().then(user => {
            resp.status(200).send(resp.json(user))
        }).catch(e => {
            resp.status(500).send()
        })
    }

    async function remove(req, resp){
        try{

            var articles = 
            await app
            .db
            .knex('articles')
            .where({userId: req.params.id})

            notExistsOrError(articles, "Can not remove because this user have articles.")

            var rows = 
            await app
            .db
            .knex('users')
            .update({deletedAt: new Date()})
            .where({id: req.params.id})
            existsOrError(rows, 'This user not exists.')

            return resp.status(204).send()
        }catch(e){
            return resp.status(400).send(e)
        }
    }

    return { save, get, getById, remove }
}