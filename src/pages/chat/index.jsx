import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { changeUsername } from '../../store/username'
import SocketContext, { socket } from '../../plugins/socket'
import History from '../../components/history'
import Editor from '../../components/editor'
import './style.scss'

const Chat = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const userName = useSelector(({ username }) => username)
  const roomPath = useLocation().pathname
  const dispatch = useDispatch()

  const setUsername = (isChanging = false) => {
    if (!userName || isChanging) {
      const nickname = prompt('Please, insert a nickname (cannot be empty or longer than 30 characters):')

      if (nickname && nickname?.trim() && nickname.trim()?.length < 30) {
        dispatch(changeUsername(nickname.trim()))
        if (isChanging) socket.emit('CHANGE_USERNAME', nickname)
      } else if (!nickname && !userName) {
        setUsername()
      }
    }
  }

  const joinPath = () => {
    if (userName) {
      socket.emit('JOIN_PATH', roomPath, userName)
    }
  }

  const invalidName = () => {
    socket.on('CHANGE_USERNAME', () => {
      setUsername(true)
    })
  }

  const socketStatus = () => {
    socket.on('connect', () => {
      setErrorMessage('')
    })
    socket.on('disconnect', () => {
      setErrorMessage('Not Connected. Trying to reconnect.')
    })
  }

  useEffect(() => {
    setUsername()
    joinPath()
    socketStatus()
    invalidName()
  }, [roomPath, socket.connected])

  return (
    <SocketContext.Provider value={socket}>
      <main className="chat">
        {errorMessage && <div className="chat__error">{errorMessage}</div>}
        <History />
        <span>&nbsp;Click <a href='#' onClick={() => setUsername(true)}>here</a> to change your nickname!</span>
        <Editor />
      </main>
    </SocketContext.Provider>
  )
}

export default Chat
