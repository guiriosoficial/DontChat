import * as UsersController from '../controllers/users.js'
import * as MessagesController from '../controllers/messages.js'

function joinRoomPath(socket, next) {
    socket.on('joinRoomPath', (roomPath, callback) => {
        UsersController.joinRoomPath(socket, roomPath)
            .then(() => {
                MessagesController.getMessages(roomPath)
                    .then(res => callback(res))
                    .catch(() => callback(new Error('Failed to get messages. Pleas reload page to try again')))
            })
            .catch(() => {
                callback(new Error('Failed to join the room. Pleas reload page to try again'))
            })
    })

    next()
}

function handleUser(socket, next) {
    socket.on('handleUser', (userData, roomPath, callback) => {
        userData = { socketId: socket.id, ...userData }

        UsersController.handleUser(userData, roomPath)
            .then(res => callback(res))
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

export {
    joinRoomPath,
    handleUser,
    disconnect
}
