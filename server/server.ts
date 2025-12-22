import express from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import * as UsersEvents from './events/users.ts'
import * as MessagesEvents from './events/messages.ts'

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'
const CONNECTION_STRING_URI = process.env.CONNECTION_STRING_URI || 'mongodb://localhost:27017/dontchat'
const PORT = process.env.PORT || 3000

const app = express()
app.set('etag', false)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = createServer(app)
const corsOptions = {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST']
  }
}

const io = new Server(httpServer, corsOptions)

io.use(UsersEvents.handleUser)
io.use(UsersEvents.joinRoomPath)
io.use(UsersEvents.disconnect)
io.use(MessagesEvents.sendMessage)

io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
})

connect(CONNECTION_STRING_URI)
    .then(() => {
        console.log('MongoBD Connected...')
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`)
        })
    })
    .catch(err => {
        console.error('Failed to connect with MongoDB', err)
    })

export { io }
