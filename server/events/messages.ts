import * as MessagesController from '../services/messages.ts'
import type { Socket, ExtendedError } from 'socket.io';

function sendMessage(socket: Socket, next: (err?: ExtendedError) => void): void {
    socket.on('sendMessage', (message, callback) => {
        if (message.trim()) {
            MessagesController.sendMessage(message, 'message', socket.id)
                .then(() => callback(true))
                .catch(() => callback(false))
        }
    })

    next()
}

export {
    sendMessage
}
