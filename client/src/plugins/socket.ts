import { createContext } from 'react'
import io from 'socket.io-client'

const HOST = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export const socket = io(HOST)
const SocketContext = createContext(socket)

export default SocketContext
