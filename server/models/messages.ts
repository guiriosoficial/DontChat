import { Schema, model } from 'mongoose'
import type { MessageType } from '../types'

interface IMessage {
    socketId: string
    userName: string
    userColor: string
    roomPath: string
    messageContent: string
    messageType: MessageType
    dateTime: Date
}

const MessagesSchema = new Schema<IMessage>({
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

export default MessagesModel
export type { IMessage }
