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
  }

  const sendMessage = async () => {
    await socket.emit('SEND_MESSAGE', {
      userId: socket.id,
      userName: username,
      messageContent: message,
      dateTime: new Date(),
      path: location,
    })

    setMessage('')
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
        // contentEditable
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