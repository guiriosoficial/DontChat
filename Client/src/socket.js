import { createContext } from 'react'
import io from 'socket.io-client'

const HOST = process.env.HOST || 'http://localhost:3001'

export const socket = io(HOST)
const SocketContext = createContext(socket)

export default SocketContext
