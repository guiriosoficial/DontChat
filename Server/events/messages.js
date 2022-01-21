const MessagesController = require('../controllers/messages')

function sendMessage(socket, next) {
    socket.on('sendMessage', (message, callback) => {
        if (message.trim()) {
            MessagesController.sendMessage(message, 'message', socket.id)
                .then(() => callback(true))
                .catch(() => callback(false))
        }
    })

    next()
}

module.exports = {
    sendMessage
}