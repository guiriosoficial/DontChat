import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { changeUsername } from '../../store/username'
import SocketContext, { socket } from '../../plugins/socket'
import History from '../../components/history'
import Editor from '../../components/editor'
import './style.scss'

const Chat = () => {
  const [error, setError] = useState('')
  const username = useSelector(({ username }) => username)
  const location = useLocation().pathname
  const dispatch = useDispatch()

  const changeNickname = () => {
    const nickname = prompt('Please, insert a nickname (cannot be empty or longer than 30 characters):')

    if (!nickname.trim() || nickname.trim().length > 30) {
      changeNickname()
    } else if (nickname) {
      dispatch(changeUsername(nickname.trim()))
    }
  }
  
  const joinPath = () => {
    socket.emit('JOIN_PATH', location)
  }
  
  const leavePath = () => {
    socket.emit('LEAVE_PATH', location)
  }

  const socketStatus = () => {
    socket.on('connect', () => {
      setError('')
      joinPath()
    })
    socket.on('disconnect', () => {
      setError('Not Connected. Trying to reconnect.')
      leavePath()
    })
  }

  useEffect(() => {
    if (!username) changeNickname()
    joinPath()
    socketStatus()
    return () => leavePath()
  }, [location, socket])

  return(
    <SocketContext.Provider value={socket}>
    <main className='chat'>
      {error && <div className='chat__error'>{error}</div>}
      <History />
      <span>&nbsp;Click <a href='#' onClick={changeNickname}>here</a> to change your nickname!</span>
      <Editor />
    </main>
    </SocketContext.Provider>
  )
}

export default Chat;
