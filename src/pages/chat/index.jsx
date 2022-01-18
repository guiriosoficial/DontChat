import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setUser } from '../../store/user'
import { setMessages } from '../../store/messages'
import getNewColor from '../../utils/getNewColor'
import SocketContext, { socket } from '../../socket'
import History from './history'
import Editor from './editor'
import axios from 'axios'
import './history.scss'

function Chat() {
  const [userColor, setUserColor] = useState(getNewColor())
  const [errorMessage, setErrorMessage] = useState('')
  const { user } = useSelector((state) => state)
  const roomPath = useLocation().pathname
  const dispatch = useDispatch()
  const handleChangeUserColor = (evt) => {
    setUserColor(evt.target.value)
    patchUser()
  }

  const setUserName = async (isChanging = false) => {
    if (!user._id || isChanging) {
      const nickName = prompt('Please, insert a nickname (cannot be empty or longer than 30 characters):')
      if (nickName && nickName?.trim() && nickName.trim()?.length < 30) {
        isChanging ? await patchUser(nickName) : await postUser(nickName)
      } else if (!nickName && !user.userName) {
        setUserName()
      }
    } else {
      await postUser(user.userName)
    }
  }

  const postUser = async (nickName) => {
    await axios.post(`http://localhost:3001/users/${socket.id}?roomPath=${roomPath}`, {
      userName: nickName.trim(),
      userColor,
    })
      .then(({ data }) => dispatch(setUser(data)))
      // .catch((_error) => setUserName())
  }

  const patchUser = async (nickName = '') => {
    await axios.patch(`http://localhost:3001/users/${socket.id}?roomPath=${roomPath}`, {
      userName: nickName.trim() || user.userName,
      userColor,
    })
      .then(({ data }) => dispatch(setUser(data)))
      // .catch((_error) => setUserName())
  }

  const joinRoomPath = () => {
    if (user._id) {
      socket.emit('joinRoomPath', roomPath)
    }
  }

  const socketStatus = () => {
    socket.on('connect', () => {
      setErrorMessage('')
    })
    socket.on('disconnect', () => {
      setErrorMessage('Not Connected. Trying to reconnect.')
    })
  }

  useEffect(async() => {
    setTimeout(async() => {
      await setUserName()
  
      await axios.get(`http://localhost:3001/messages?roomPath=${roomPath}`)
        .then(({ data }) => dispatch(setMessages(data)))
        .catch((error) => console.error(error))
  
      joinRoomPath()

      return () => socket.off('joinRoomPath', roomPath, user._id)
    }, 300)
  }, [])
    
  useEffect(() => {
    // joinRoomPath()
    socketStatus()
  }, [socket.connected])

  return (
    <SocketContext.Provider value={socket}>
      <main className="chat">
        {errorMessage && <div className="chat__error">{errorMessage}</div>}
        <History />
        <span>
          Click <a href="#" onClick={() => setUserName(true)}>here</a> to change your nickname!
          <input type="color" value={userColor} onChange={handleChangeUserColor}/>
        </span>
        <Editor />
      </main>
    </SocketContext.Provider>
  )
}

export default Chat
