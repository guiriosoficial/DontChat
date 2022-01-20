const Messages = require('../models/messages')
const Users = require('../models/users')

function getMessages(req, res) {
    const { roomPath } = req.query
    
    Messages.find({ roomPath })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.status(500).send('Internar Server Error')
            console.error(err)
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
