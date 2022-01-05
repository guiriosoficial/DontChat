import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import History from '../../components/history'
import Editor from '../../components/editor'
import io from 'socket.io-client'
import './style.scss'

const Chat = () => {
  const location = useLocation().pathname
  const socket = io.connect('http://localhost:3001')
  const [username, setUsername] = useState('')
  
  const joinPath = () => {
    socket.emit('JOIN_PATH', location)
  }
  
  const leavePath = () => {
    socket.emit('LEAVE_PATH', location)
  }

  const changeUsername = () => {
    setUsername(prompt('Insert your nickname: '))
  }
  
  useEffect(() => {
    changeUsername()
    joinPath()
    return () => leavePath()
  }, [location])

  return(
    <main className='chat'>
      <History socket={socket} />
      <Editor socket={socket} location={location} username={username} />
    </main>
  )
}

export default Chat;
