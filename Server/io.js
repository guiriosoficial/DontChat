const { Server } = require('socket.io')
const UsersEvents = require('./events/users')
const MessagesEvents = require('./events/messages')

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000'

function io(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: '*',
            methods: ["GET", "POST"]
        }
    })

    io.use(UsersEvents.handleUser)
    io.use(UsersEvents.joinRoomPath)
    io.use(UsersEvents.disconnect)
    io.use(MessagesEvents.sendMessage)
    
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`)
    })

    return io
}

module.exports = io
