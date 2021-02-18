const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const authSecret = require('../.env').authSecret

module.exports = app => {
    async function signin(req, resp){
        if(!req.body.email || !req.body.password){
            return resp.status(400).send('Enter the email and password.')
        }

        var user = await app.db.knex('users').where({email: req.body.email}).first()

        if(!user){
            return resp.status(400).send('User not found.')
        }

        var password = bcrypt.compareSync(req.body.password, user.password)

        if(!password){
            return resp.status(400).send('Invalid password.')
        }

        var now = Math.floor(Date.now() / 1000)

        const payload = {
            name: user.name,
            email: user.email,
            password: user.password,
            id: user.id,
            admin: user.admin,
            iat: now,
            exp: now + 1000 * 60 * 60 * 24 * 3
        }

        console.log(payload.iat)
        console.log(payload.exp)

        resp.json({...payload, token: jwt.encode(payload, authSecret)})


    }

    function validateToken(req, resp){
        try{
            var userData = req.body || null

            if(userData){

                var token = jwt.decode(userData.token, authSecret)

                if(new Date(token.exp * 1000) > new Date()){
                    return resp.send(true)
                }
            }
        }catch(e){

        }

        return resp.send(false)
    }

    return { signin, validateToken }
}