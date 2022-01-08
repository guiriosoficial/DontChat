const { Server } = require('socket.io')
const express = require('express')
const cors = require('cors')
const app = express()

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
    // const userId = socket.id
    console.log('connected', socket.id)

    const findClient = () => clientsList.find(client => client.id === socket.id)

    const sendMessage = (message, messageType) => {
        const { name, color } = findClient()

        io.in(findClient()?.path).emit('RECIVE_MESSAGE', {
            ...message,
            messageType,
            dateTime: new Date(),
            userId: socket.id,
            userName: name || socket.id,
            userColor: color || 'rgb(0, 0, 0,)',
        })
    }

    socket.on('JOIN_PATH', (path, name) => {
        leavPath()
        socket.join(path)

        clientsList.push({
            id: socket.id,
            name,
            path,
            color: generateColor(path)
        })
        sendMessage({
            userName: name,
            messageContent: 'Joined room',
            path
        }, 'log')
        
        console.log(`User ${socket.id} joined ${path}`);
    })
    
    const leavPath = () => {
        if (findClient()) {
            const { path, name } = findClient()?.path
        
            socket.leave(path);
            sendMessage({
                userName: name,
                messageContent: 'Left room',
                path
            }, 'log')
            clientsList.splice(socket.id, 1);

            console.log(`User ${socket.id}, left ${path}`);
        }
    }

    socket.on('SEND_MESSAGE', (message) => {
        sendMessage(message, 'message')
    })

    socket.on('disconnect', () => {
        leavPath()
        console.log('disconnected', socket.id)
    })
});

const generateColor = (path) => {
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

    const clientsRoom = clientsList.filter(client => client.path === path)
    const clientsColor = clientsRoom.filter(client => client.color === color)

    if (clientsColor.length) {
        generateColor(path)
    } else {
        return color
    }
}

server.listen(3001, () => {
    console.log('Server is Running on Port 3001...')
})
