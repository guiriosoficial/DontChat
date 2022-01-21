import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setUser } from '../../store/user'
import { setMessages } from '../../store/messages'
import { 
  generateColor,
  generateName,
  validateColor,
  validateName
} from '../../utils'
import SocketContext, { socket } from '../../socket'
import History from './history'
import Editor from './editor'
import axios from 'axios'
import './history.scss'

function Chat() {
  const dispatch = useDispatch()
  const roomPath = useLocation().pathname
  const { user } = useSelector((state) => state)
  const [userColor, setUserColor] = useState(user.userColor || generateColor())
  const [errorMessage, setErrorMessage] = useState('')


  const handleChangeUserColor = async (evt) => {
    const newColor = evt.target.value
    
    if (validateColor(newColor) && newColor !== user.userColor) {
      setUserColor(newColor)
      await putUser()
    } else {
      showErrorMessage('Invalid color. Select a darker color.')
    }
  }

  const handleChangeUserName = async () => {
    const nickName = prompt('Please, insert a nickname:')

    if (validateName(nickName) && nickName !== user.userName) {
      await putUser(nickName)
    } else if (nickName) {
      showErrorMessage('Invalid name. Cannot be shorter than 3 or longer than 27 characters.')
    }
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const putUser = async (nickName = '') => {
    await axios.put(`http://localhost:3001/users/${socket.id}?roomPath=${roomPath}`, {
      userName: nickName.trim() || user.userName || generateName(),
      userColor
    })
      .then(({ data }) => dispatch(setUser(data)))
      .catch(({ response: { data }}) => setErrorMessage(data))
  }

  const getMessages = async () => {
    await axios.get(`http://localhost:3001/messages?roomPath=${roomPath}`)
      .then(({ data }) => dispatch(setMessages(data)))
      .catch(({ response: { data }}) => setErrorMessage(data))
  }

  const joinRoomPath = () => {
    if (user.socketId) {
      socket.emit('joinRoomPath', roomPath, (res) => {
        setErrorMessage(res)
      })
    }
  }

  useEffect(() => {
    setTimeout(async() => {
      await getMessages()
      await putUser()
      joinRoomPath()

    }, 300)
    return () => socket.off('joinRoomPath', roomPath)
  }, [])
    
  useEffect(() => {
    // joinRoomPath()
    socket.on('connect', () => {
      setErrorMessage('')
    })
    socket.on('disconnect', () => {
      setErrorMessage('Not Connected. Trying to reconnect.')
    })
  }, [socket.connected])

  return (
    <SocketContext.Provider value={socket}>
      <main className="chat">
        {errorMessage && <div className="error">{errorMessage}</div>}
        <History />
        <span>
          Click&nbsp;
          <a
            href="#"
            onClick={handleChangeUserName}
          >
            here
          </a>
          &nbsp;to change your nickname!
          <input
            value={userColor}
            type="color"
            onChange={handleChangeUserColor}
          />
        </span>
        <Editor />
      </main>
    </SocketContext.Provider>
  )
}

export default Chat
