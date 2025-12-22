import Messages, { type IMessage } from '../models/messages.ts'
import Users, { type IUser } from '../models/users.ts'
import * as app from '../server.ts'
import type { MessageType } from "../types";

function getMessages(roomPath: string): Promise<IMessage[]> {
    return new Promise((resolve, reject) => {
        Messages.find({ roomPath })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject('Internar Server Error')
                console.error(err)
            })
    })
}

async function sendMessage(messageContent: string, messageType: MessageType, socketId: string): Promise<void> {
    const userData = await Users.findOne({ socketId })
    const { userName, userColor, roomPath } = userData

    const newMessage = new Messages({
        socketId,
        userName,
        userColor,
        messageType,
        messageContent,
        roomPath
    })

    newMessage
        .save()
        .then(res => {
            const { roomPath } = res
            app.io.in(roomPath).emit('receiveMessage', res)
        })
        .catch(err => {
            console.error(err)
        })
}

export {
    getMessages,
    sendMessage
}
