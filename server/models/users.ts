import { Schema, model } from 'mongoose'

interface IUser {
    socketId: string,
    userName: string,
    roomPath: string,
    userColor: string,
}

const UsersSchema = new Schema<IUser>({
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
export type { IUser }