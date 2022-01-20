const UsersController = require('../controllers/users')

function joinRoomPath(socket, next) {
    socket.on('joinRoomPath', (roomPath, callback) => {
        UsersController.joinRoomPath(socket, roomPath)
            .then(() => callback(''))
            .catch(() => callback('Faild to join the room.'))
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
    disconnect
}
