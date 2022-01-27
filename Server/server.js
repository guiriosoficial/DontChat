const { createServer } = require('http')
const app = require('./app')
const db = require('./db')

const httpServer = createServer(app)
const io = require('./io')(httpServer)
exports.io = io

const PORT = process.env.PORT || 3001

db
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log('Server is running on port 3001...')
        })
    })
    .catch(err => {
        console.error('Faild to start http server!', err)
    })
