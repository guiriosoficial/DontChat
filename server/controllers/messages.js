const Messages = require('../models/messages')
const Users = require('../models/users')
const app = require('../server')

function getMessages(roomPath) {
    return new Promise((resolve, reject) => {
        Messages.find({ roomPath })
            .then(res => {
                resolve(res)
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

    newMessage
        .save()
        .then(res => {
            const { roomPath } = res
            app.io.in(roomPath).emit('receiveMessage', res)
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports = {
    getMessages,
    sendMessage
}
