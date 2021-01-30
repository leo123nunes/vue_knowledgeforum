module.exports = api => {
    function save(req, resp){
        resp.send('user save')
    }

    return { save }
}