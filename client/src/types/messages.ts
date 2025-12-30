export interface IMessage {
  socketId: string,
  userName: string
  userColor: string
  messageType: 'message' | 'log'
  messageContent: string
  roomPath: string
  dateTime: Date
}
