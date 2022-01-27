import { createContext } from 'react'
import io from 'socket.io-client'

export const socket = io(process.env.HOST)
const SocketContext = createContext(socket)

export default SocketContext
