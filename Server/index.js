const express = require('express')
const cors =  require('cors')
const { connect } = require('mongoose')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
app.set('etag', false)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"]
    }
})

exports.io = io

const UsersEvents = require('./events/users')
const MessagesEvents = require('./events/messages')
io.use(UsersEvents.handleUser)
io.use(UsersEvents.joinRoomPath)
io.use(UsersEvents.disconnect)
io.use(MessagesEvents.sendMessage)

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)
})

connect(process.env.CONNECTION_STRING_URI)
    .then(() => {
        console.log('MongoBD Connected...')
        httpServer.listen(process.env.PORT, () => {
            console.log('Server is running on port 3001...')
        })
    })
    .catch(err => {
        console.error('Faild to connect with MongoDB', err)
    })

    