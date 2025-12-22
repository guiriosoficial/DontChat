import type { ExtendedError } from 'socket.io'

type MessageType = 'message' | 'log'

type NextErr = (err?: ExtendedError) => void

export { MessageType, NextErr }
