const { Server } = require('socket.io')
const UsersEvents = require('./events/users')
const MessagesEvents = require('./events/messages')

function io(httpServer) {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ["GET", "POST"]
        }
    })

    io.use(UsersEvents.joinRoomPath)
    // io.use(MessagesEvents.sendMessage)
    io.use(UsersEvents.disconnect)
    
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`)
    })

    return io
}

module.exports = io
