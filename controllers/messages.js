const Messages = require('../models/messages')
const Users = require('../models/users')
// const io = require('../io')

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

async function sendMessage(messageContent, messageType, userId) {
    const userData = await Users.findOne({ userId })
    const { userName, userColor, roomPath } = userData
    
    const newMessage = new Messages({
        userId,
        userName,
        userColor,
        messageType,
        messageContent,
        roomPath
    })

    newMessage.save()
        .then(result => {
            const { roomPath } = result
            // io.in(roomPath).emit('reciveMessage', result)
        })
        .catch(err => {
            console.error(err)
        })
}

module.exports = {
    getMessages,
    sendMessage
}
