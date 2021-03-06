module.exports = middleware => {
    return (req, resp, next) => {
        if(req.user.admin){
            middleware(req, resp, next)
        }else{
            resp.status(401).send('User is not admin.')
        }
    }
}