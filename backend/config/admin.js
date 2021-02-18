module.exports = middleware => {
    return (req, resp, next) => {
        console.log(req.user)
        if(req.user.admin){
            middleware(req, resp, next)
        }else{
            resp.status(401).send('User is not admin.')
        }
    }
}