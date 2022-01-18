const express = require('express')
const cors =  require('cors')
const { connect } = require('mongoose')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
app.set('etag', false)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const httpServer = createServer(app)

const messagesRouter = require('./routes/messages')
const usersRouter = require('./routes/users')
app.use('/messages', messagesRouter)
app.use('/users', usersRouter)

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

const UsersEvents = require('./events/users')
const MessagesEvents = require('./events/messages')
io.use(UsersEvents.joinRoomPath)
// io.use(MessagesEvents.sendMessage)
io.use(UsersEvents.joinRoomPath)

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)
})

connect('mongodb://localhost:27017/dontchat')
    .then(() => {
        console.log('MongoBD Connected...')
        httpServer.listen(3001, () => {
            console.log('Server is running on port 3001...')
        })
    })
    .catch(err => {
        console.error('Faild to connect with MongoDB', err)
    })
