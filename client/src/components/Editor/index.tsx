import React, { useState, useContext } from 'react'
import SocketContext from '@/plugins/socket'
import { EditorContainer } from './styles'

const ENTER_KEY_CODE = 'Enter'
const TEXTAREA_ROWS = 3

function Editor() {
  const socket = useContext(SocketContext)
  const [message, setMessage] = useState('')

  const handleChangeMessage = (evt: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(evt.target.value)
  }

  const handleEnter = (evt: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const { key, ctrlKey } = evt

    if (key === ENTER_KEY_CODE && ctrlKey) return

    evt.preventDefault()
    sendMessage()
  }

  const sendMessage = (): void => {
    const trimMessage = message.trim()

    if (!trimMessage) return

    socket.emit('sendMessage', trimMessage, (success: boolean) => {
      if (success) setMessage('')
    })
  }

  return (
    <EditorContainer>
      <textarea
        rows={TEXTAREA_ROWS}
        value={message}
        onChange={handleChangeMessage}
        onKeyDown={handleEnter}
      />
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
