import { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import SocketContext from '../../plugins/socket'
import './style.scss'

const FooterEditor = () => {
  const username = useSelector(({ username }) => username)
  const location = useLocation().pathname
  const socket = useContext(SocketContext)
  const [message, setMessage] = useState('')
  const handleChange = event => setMessage(event.target.value)

  const getDateTime = () => {
    const formatString = (value) => String(value).padStart(2, '0')
    const now = new Date()
    const year = formatString(now.getFullYear())
    const month = formatString(now.getMonth() + 1)
    const day = formatString(now.getDate())
    const hours = formatString(now.getHours())
    const minutes = formatString(now.getMinutes())

    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

  const sendMessage = async () => {
    if (message.trim()) {
      await socket.emit('SEND_MESSAGE', {
        userId: socket.id,
        userName: username,
        messageContent: message.trim(),
        dateTime: getDateTime(),
        path: location,
      })
  
      setMessage('')
    }
  }

  const handleEnter = (event) => {
    const { which, ctrlKey } = event

    if (which === 13 && !ctrlKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return(
    <section className='editor'>
      <textarea
        rows={3}
        value={message}
        onChange={handleChange}
        onKeyPress={handleEnter}
      />
      &nbsp;
      <button onClick={sendMessage}>Send!</button>
    </section>
  )
}

export default FooterEditor