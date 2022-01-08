import React, { useState, useContext } from 'react'
import SocketContext from '../../plugins/socket'
import './style.scss'

const FooterEditor = () => {
  const socket = useContext(SocketContext)
  const [message, setMessage] = useState('')
  const handleChange = event => setMessage(event.target.value)

  const sendMessage = async () => {
    if (message.trim()) {
      await socket.emit('SEND_MESSAGE', message.trim())
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