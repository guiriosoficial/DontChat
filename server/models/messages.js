const { Schema, model } = require('mongoose')

const MessagesSchema = new Schema({
    socketId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    userColor: {
        type: String,
        required: true
    },
    messageType: {
        type: String,
        enum: ['message', 'log'],
        default: 'message'
    },
    messageContent: {
        type: String,
        required: true,
        trim: true
    },
    roomPath: {
        type: String,
        required: true,
        trim: true
    },
    dateTime: {
        type: Date,
        default: new Date()
    }
})

const MessagesModel = model('Messages', MessagesSchema)

module.exports = MessagesModel
