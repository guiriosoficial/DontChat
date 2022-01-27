import { createContext } from 'react'
import io from 'socket.io-client'

const HOST = process.env.REACT_APP_API_URL || 'http://localhost:3001'
console.log(process.env)

export const socket = io(HOST)
const SocketContext = createContext(socket)

export default SocketContext
