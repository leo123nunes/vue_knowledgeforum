const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    function decrypt(password){
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    async function save(req, resp){

        const user = {...req.body}

        if(req.params.id){
            user.id = req.params.id
        } 

        const existsOrError = app.api.validation.existsOrError
        const notExistsOrError = app.api.validation.notExistsOrError
        const equalsOrError = app.api.validation.equalsOrError

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
            console.log('dentro do catch')
            return resp.status(400).send(msg)
        }

        user.password = decrypt(user.password)
        delete user.confirmPassword

        if(user.id){
            return app
            .db
            .knex('users')
            .where({id: user.id})
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

        console.log('test')

        return app
        .db
        .knex('users')
        .select('*')
        .then(users => {
            resp.send(resp.json(users))
        })
        .catch(error => {
            resp.status(500).send()
        })
    }

    function getById(req, resp){
        const id = req.params.id
        return app.db.knex('users').select('*').where({id}).first().then(user => {
            resp.status(200).send(resp.json(user))
        }).catch(e => {
            resp.status(500).send()
        })
    }

    return { save, get, getById }
}