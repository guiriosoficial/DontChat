const Users = require('../models/users')
const MessagesController = require('./messages')
const validateUserName = require('../utils/validateUserName')
const validateUserColor = require('../utils/validateUserColor')

async function setUser(req, res) {
    const { params, query, body, } = req
    const { userName, userColor } = body
    const { socketId } = params
    const { roomPath } = query

    const isUserNameValid = validateUserName(userName)
    const isUserColorValid = validateUserColor(userColor)

    if (isUserNameValid && isUserColorValid) {
        const newUser = new Users({
            userName,
            userColor,
            socketId,
            roomPath
        })

        newUser.save()
            .then(result => {
                delete result._id
                delete result._v
                res.send(result)
            })
            .catch(err => {
                res.status(500).send('Internal Server Error')
                console.error('Error on create user', err)
            })
    } else {
        res.status(400).send('Invalid User Name or Color')
    }
}

async function updateUser(res, req) {
    const { params, query, body, } = req
    const { userName, userColor } = body
    const { socketId } = params
    const { roomPath } = query

    const isUserNameValid = validateUserName(userName)
    const isUserColorValid = validateUserColor(userColor)

    if (isUserNameValid && isUserColorValid) {
        const newUser = {
            userName,
            userColor,
            roomPath
        }

        Users.findOneAndUpdate({ socketId }, { ...newUser }, { returnDocument: 'after' })
            .then(result => {
                delete result._id
                delete result._v
                res.send(result)
                // MessagesController.sendMessage(`Changed Nickname to ${userName}`, 'log', userId)
            })
            .catch(err => {
                res.status(500).send('Internal Server Error')
                console.error('Error on update user', err)
            })
    } else {
        res.status(400).send('Invalid User Name or Color')
    }
}

async function deleteUser(socket) {
    const socketId = socket.id

    await leaveRoomPath(socket).finally(() => {
        Users.findOneAndDelete({ socketId })
            .then(_result => {
                console.log(`User ${socketId} deleted`)
            })
            .catch(err => {
                console.error('Error on delete user', err)
            })
    })
}

async function leaveRoomPath(socket) {
    const socketId = socket.id
    const clientExists = await Users.exists({ socketId })

    if (clientExists) {
        const { roomPath } = await Users.findOne({ socketId })

        socket.leave(roomPath)
        // await MessagesController.sendMessage('Left room', 'log', userId)
        console.log(`User ${socketId} left ${roomPath}`);
    } else {
        console.error('Error on leave room', `User ${socketId} dose not exists`)
    }
}

async function joinRoomPath(socket, roomPath) {
    const socketId = socket.id
    const clientExists = await Users.exists({ socketId })

    if (clientExists) {
        const { roomPath: currRoomPath } = await Users.findOne({ socketId })

        if (currRoomPath !== roomPath) {
            await leaveRoomPath(socket)
            await Users.updateOne({ socketId }, { roomPath })
        }

        socket.join(roomPath)
        // await MessagesController.sendMessage('Joined room', 'log', userId)
        console.log(`User ${socketId} joined ${roomPath}`);
    } else {
        console.error('Error on join room', `User ${socketId} dose not exists`)
    }
}

module.exports = {
    setUser,
    updateUser,
    deleteUser,
    leaveRoomPath,
    joinRoomPath
}
