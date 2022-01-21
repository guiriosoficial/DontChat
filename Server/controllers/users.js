const Users = require('../models/users')
const MessagesController = require('./messages')
const validateUserName = require('../utils/validateUserName')
const validateUserColor = require('../utils/validateUserColor')

async function handleUser(req, res) {
    const { params, body, } = req
    const { userName, userColor } = body
    const { socketId } = params

    const userExists = await Users.exists({ socketId }) || false

    const isUserNameValid = validateUserName(userName)
    const isUserColorValid = validateUserColor(userColor)
    
    if (isUserNameValid && isUserColorValid) {
        if (!userExists) {
            await setUser(req, res)
        } else {
            const currUser = await Users.findOne({ socketId })
            
            if (currUser?.userName !== userName || currUser?.userColor !== userColor) {
                await updateUser(req, res)
            }
        }
    } else {
        let errorMessage

        if (!isUserNameValid && isUserColorValid) {
            errorMessage = 'Invalid name. Cannot be shorter than 3 or longer than 27 characters.'
        } else if (isUserNameValid && !isUserColorValid) {
            errorMessage = 'Invalid color. Select a darker color.'
        } else {
            errorMessage = 'Name and color is invalid'
        }
        
        res.status(400).send(errorMessage)
    }
}

async function setUser(req, res) {
    const { params, query, body, } = req
    const { userName, userColor } = body
    const { socketId } = params
    const { roomPath } = query

    const newUser = new Users({
        userName,
        userColor,
        socketId,
        roomPath
    })

    newUser.save()
        .then(result => {
            delete result._id
            delete result.__v
            res.send(result)
        })
        .catch(err => {
            res.status(500).send('Faild to set user. Reload page to try again')
            console.error('Error on create user', err)
        })
}

async function updateUser(req, res) {
    const { params, query, body, } = req
    const { userName, userColor } = body
    const { socketId } = params
    const { roomPath } = query

    const newUser = {
        userName,
        userColor,
        roomPath
    }

    Users.findOneAndUpdate({ socketId }, { ...newUser }, { returnDocument: 'after' })
        .then(result => {
            delete result._id
            delete result.__v
            res.send(result)
            MessagesController.sendMessage(`Changed nickname`, 'log', socketId)
        })
        .catch(err => {
            res.status(500).send('Faild to update user. Reload page to try again')
            console.error('Error on update user', err)
        })
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
        await MessagesController.sendMessage('Left room', 'log', socketId)
        console.log(`User ${socketId} left ${roomPath}`)
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
        await MessagesController.sendMessage('Joined room', 'log', socketId)
        console.log(`User ${socketId} joined ${roomPath}`)
    } else {
        console.error('Error on join room', `User ${socketId} dose not exists`)
    }
}

module.exports = {
    handleUser,
    deleteUser,
    leaveRoomPath,
    joinRoomPath
}
