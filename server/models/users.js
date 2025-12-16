import { Schema, model } from 'mongoose'

const UsersSchema = new Schema({
    socketId: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30
    },
    roomPath: {
        type: String,
        required: true,
        trim: true
    },
    userColor: {
        type: String,
        required: true
    }
})

const UsersModel = model('Users', UsersSchema)

export default UsersModel
