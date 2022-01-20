const express = require('express')
const cors =  require('cors')

const app = express()
app.set('etag', false)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const messagesRouter = require('./routes/messages')
const usersRouter = require('./routes/users')
app.use('/messages', messagesRouter)
app.use('/users', usersRouter)

module.exports = app
