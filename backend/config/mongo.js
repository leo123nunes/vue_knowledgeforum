const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/knowledge_stats', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(x => {
        console.log('Connection establish with success.')
    })
    .catch(error => {
        const msg = "Unable to establish a connection with mongodb."

        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })

