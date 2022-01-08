const { Server } = require('socket.io')
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const server = require('http').createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

const clientsList = []

io.on('connect', (socket) => {
    const userId = socket.id
    console.log('connected', userId)

    const findClient = () => clientsList.find(client => client.userId === userId)

    const sendMessage = (messageContent, messageType) => {
        const { userName, userColor, roomPath } = findClient()

        io.in(roomPath).emit('RECIVE_MESSAGE', {
            userId,
            userName,
            userColor,
            messageType,
            messageContent,
            dateTime: new Date(),
        })
    }

    socket.on('CHANGE_USERNAME', (userName) => {
        if (userName?.trim() && userName?.trim().length < 30) {
            const clientIndex = clientsList.findIndex(client => client.userId === userId)
            clientsList[clientIndex].userName = userName
        } else {
            socket.emit('CHANGE_USERNAME')
        }
    })

    socket.on('JOIN_PATH', (roomPath, userName) => {
        leavPath()

        if (userName?.trim() && userName?.trim().length < 30) {
            socket.join(roomPath)
    
            clientsList.push({
                userId,
                userName,
                roomPath,
                userColor: generateColor(roomPath)
            })
            sendMessage('Joined room', 'log')
            
            console.log(`User ${userId} joined ${roomPath}`);
        } else {
            socket.emit('CHANGE_USERNAME')
        }
    })
    
    const leavPath = () => {
        if (findClient()) {
            const { roomPath } = findClient()
        
            socket.leave(roomPath);
            sendMessage('Left room', 'log')
            clientsList.splice(userId, 1);

            console.log(`User ${userId}, left ${roomPath}`);
        }
    }

    socket.on('SEND_MESSAGE', (messageContent) => {
        sendMessage(messageContent, 'message')
    })

    socket.on('disconnect', () => {
        leavPath()
        console.log('disconnected', userId)
    })
});

const generateColor = (roomPath) => {
    const getRandomColor = () => Math.random() * 255
    let r = getRandomColor()
    let g = getRandomColor()
    let b = getRandomColor()

    const c = ((r * 0.299 + g * 0.587 + b * 0.114) / 255) - 0.6

    if (c > 0) {
      r = r * c
      g = g * c
      b = b * c
    }

    const color = `rgb(${r}, ${g}, ${b})`

    const clientsRoom = clientsList.filter(client => client.roomPath === roomPath)
    const clientsColor = clientsRoom.filter(client => client.userColor === color)

    if (clientsColor.length) {
        generateColor(roomPath)
    } else {
        return color
    }
}

server.listen(3001, () => {
    console.log('Server is Running on Port 3001...')
})
