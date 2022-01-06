import { useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { changeUsername } from '../../store/username'
import SocketContext from '../../plugins/socket'
import History from '../../components/history'
import Editor from '../../components/editor'
import io from 'socket.io-client'
import './style.scss'

const Chat = () => {
  const location = useLocation().pathname
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  
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
