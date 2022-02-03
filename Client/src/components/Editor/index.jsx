import React, { useState, useContext } from 'react'
import SocketContext from '../../socket'
import { EditorContainer } from './styles'

function Editor() {
  const socket = useContext(SocketContext)
  const [message, setMessage] = useState('')
  const handleChangeMessage = (evt) => setMessage(evt.target.value)

  const handleEnter = (evt) => {
    const { which, ctrlKey } = evt

    if (which === 13 && !ctrlKey) {
      evt.preventDefault()
      sendMessage()
    }
  }

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message.trim(), (res) => {
        if (res) setMessage('')
      })
    }
  }

  return (
    <EditorContainer>
      <textarea
        rows={3}
        value={message}
        onChange={handleChangeMessage}
        onKeyPress={handleEnter}
      />
      &nbsp;
      <button
        type="submit"
        onClick={sendMessage}
      >
        Send!
      </button>
    </EditorContainer>
  )
}

export default Editor
