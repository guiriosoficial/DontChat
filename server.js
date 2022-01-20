const { createServer } = require('http')
const app = require('./app')
const db = require('./db')

const httpServer = createServer(app)
const io = require('./io')(httpServer)
global.io = io

db
    .then(() => {
        httpServer.listen(3001, () => {
            console.log('Server is running on port 3001...')
        })
    })
    .catch(err => {
        console.error('Faild to start http server!', err)
    })

