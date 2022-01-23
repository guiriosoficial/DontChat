const Messages = require('../models/messages')
const Users = require('../models/users')

function getMessages(roomPath) {
    return new Promise((resolve, reject) => {
        Messages.find({ roomPath })
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject('Internar Server Error')
                console.error(err)
            })
    })
}

async function sendMessage(messageContent, messageType, socketId) {
    const userData = await Users.findOne({ socketId })
    const { userName, userColor, roomPath } = userData

    const newMessage = new Messages({
        socketId,
        userName,
        userColor,
        messageType,
        messageContent,
        roomPath
    })

    newMessage.save()
        .then(result => {
            const { roomPath } = result
            global.io.in(roomPath).emit('reciveMessage', result)
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports = {
    getMessages,
    sendMessage
}
