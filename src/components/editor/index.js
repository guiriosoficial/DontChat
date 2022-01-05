import { useState } from 'react'
import './style.scss'

const FooterEditor = ({ socket, location, username }) => {
  const [message, setMessage] = useState('')
  const handleChange = event => {
    console.log(event);
    setMessage(event.target.value)
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