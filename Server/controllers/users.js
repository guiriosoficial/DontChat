const Users = require('../models/users')
const MessagesController = require('./messages')
const validateUserName = require('../utils/validateUserName')
const validateUserColor = require('../utils/validateUserColor')

function handleUser(userData, roomPath) {
    return new Promise(async (resolve, reject) => {
        const { socketId, userName, userColor } = userData
    
        const userExists = await Users.exists({ socketId }) || false
    
        const isUserNameValid = validateUserName(userName)
        const isUserColorValid = validateUserColor(userColor)
        
        if (isUserNameValid && isUserColorValid) {
            if (!userExists) {
                setUser(userData, roomPath)
                    .then(result => resolve(result))
                    .catch(err => reject(err))
            } else {
                const currUser = await Users.findOne({ socketId })
                
                if (currUser?.userName !== userName || currUser?.userColor !== userColor) {
                    updateUser(userData, roomPath)
                        .then(result => resolve(result))
                        .catch(err => reject(err))
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
    
            reject(errorMessage)
        }
    })
}

function setUser(userData, roomPath) {
    return new Promise((resolve, reject) => {
        const { socketId, userName, userColor } = userData
    
        const newUser = new Users({
            userName,
            userColor,
            socketId,
            roomPath
        })
    
        newUser.save()
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject('Faild to set user. Reload page to try again')
                console.error('Error on create user', err)
            })
    })
}

function updateUser(userData, roomPath) {
    return new Promise((resolve, reject) => {
        const { socketId, userName, userColor } = userData
    
        const newUser = {
            userName,
            userColor,
            roomPath
        }
    
        Users.findOneAndUpdate({ socketId }, { ...newUser }, { returnDocument: 'after' })
            .then(result => {
                resolve(result)
                MessagesController.sendMessage(`Changed nickname`, 'log', socketId)
            })
            .catch(err => {
                reject('Faild to update user. Reload page to try again')
                console.error('Error on update user', err)
            })
    })
}

function deleteUser(socket) {
    const socketId = socket.id

    leaveRoomPath(socket).finally(() => {
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
