const MessagesController = require('../controllers/messages')

function sendMessage(socket, next) {
    socet.on('sendMessage', (message) => {
        MessagesController.sendMessage(message, 'message', socket.id)
    })

    next()
}

module.exports = {
    sendMessage
}