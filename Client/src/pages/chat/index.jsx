import React, { useEffect, useState, useRef } from 'react'
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
  const isInitialMount = useRef(true)
  const roomPath = useLocation().pathname
  const { user } = useSelector((state) => state)
  const [userColor, setUserColor] = useState(user.userColor || generateColor())
  // const [userName, setUserName] = useState(user.userName || generateName())
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      putUser()
    }
  }, [userColor])

  const handleChangeUserColor = async (evt) => {
    const newColor = evt.target.value
    
    if (validateColor(newColor) && newColor !== user.userColor) {
      setUserColor(newColor)
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

  // const userData = () => {
  //   return {
  //     userName: nickName.trim() || user.userName || generateName(),
  //     userColor
  //   }
  // }

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

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const joinRoomPath = () => {
    if (user.socketId) {
      socket.emit('joinRoomPath', roomPath, (res) => {
        setErrorMessage(res)
      })
    }
  }

  useEffect(() => {
    socket.emit('conn', async() => {
      await putUser()
      await getMessages()
      joinRoomPath()
    })
  }, [])
    
  useEffect(() => {
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
        <History socket={socket} />
        <span>
          &nbsp;Click&nbsp;
          <a
            href="#"
            onClick={handleChangeUserName}
          >
            here
          </a>
          &nbsp;to change your nickname!&nbsp;
          <input
            value={userColor}
            type="color"
            onChange={handleChangeUserColor}
          />
        </span>
        <Editor socket={socket} />
      </main>
    </SocketContext.Provider>
  )
}

export default Chat
