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
import './history.scss'

function Chat() {
  const dispatch = useDispatch()
  const isInitialMount = useRef(true)
  const roomPath = useLocation().pathname
  const { user } = useSelector((state) => state)
  const [userColor, setUserColor] = useState(user.userColor || generateColor())
  const [userName, setUserName] = useState(user.userName || generateName())
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      handleUser()
    }
  }, [userColor, userName])

  const handleChangeUserColor = async (evt) => {
    const newColor = evt.target.value
    
    if (validateColor(newColor) && newColor !== user.userColor) {
      setUserColor(newColor)
    } else {
      showErrorMessage('Invalid color. Select a darker color.')
    }
  }

  const handleChangeUserName = async () => {
    const newName = prompt('Please, insert a nickname:')

    if (validateName(newName) && newName !== user.userName) {
      setUserName(newName)
    } else if (newName) {
      showErrorMessage('Invalid name. Cannot be shorter than 3 or longer than 27 characters.')
    }
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const joinRoomPath = () => {
    socket.emit('joinRoomPath', roomPath, (res) => {
      if (res instanceof Error) {
        setErrorMessage(res.message)
      } else {
        dispatch(setMessages(res))
      }
    })
  }

  const handleUser = (isJoining = false) => {
    const userData = { userName, userColor }

    socket.emit('handleUser', userData, roomPath, (res) => {
      if (res instanceof Error) {
        setErrorMessage(res.message)
      } else {
        dispatch(setUser(res))
        if (isJoining) joinRoomPath()
      }
    })
  }

  useEffect(() => {
    handleUser(true)
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
