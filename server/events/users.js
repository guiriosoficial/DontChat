const UsersController = require('../controllers/users')
const MessagesController = require('../controllers/messages')

function joinRoomPath(socket, next) {
    socket.on('joinRoomPath', (roomPath, callback) => {
        UsersController.joinRoomPath(socket, roomPath)
            .then(() => {
                MessagesController.getMessages(roomPath)
                    .then(result => callback(result))
                    .catch(() => callback(new Error('Faild to get messages. Pleas reload page to try again')))
            })
            .catch(() => {
                callback(new Error('Faild to join the room. Pleas reload page to try again'))
            })
    })

    next()
}

function handleUser(socket, next) {
    socket.on('handleUser', (userData, roomPath, callback) => {
        userData = { socketId: socket.id, ...userData }

        UsersController.handleUser(userData, roomPath)
            .then(result => callback(result))
            .catch(err => callback(new Error(err)))
    })
    next()
}

function disconnect(socket, next) {
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`)
        UsersController.deleteUser(socket)
    })

    next()
}

module.exports = {
    joinRoomPath,
    handleUser,
    disconnect
}
