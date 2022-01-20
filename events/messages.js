const MessagesController = require('../controllers/messages')

function sendMessage(socket, next) {
    socket.on('sendMessage', (message, callback) => {
        MessagesController.sendMessage(message, 'message', socket.id)
            .then(() => callback(true))
            .catch(() => callback(false))
    })

    next()
}

module.exports = {
    sendMessage
}