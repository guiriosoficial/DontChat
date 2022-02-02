import React, { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMessages } from '../../store/messages'
import { formatDateTime } from '../../utils'
import SocketContext from '../../socket'
import { HistryContainer, MessageHeaders } from './styles'

function History() {
  const dispatch = useDispatch()
  const messageRef = useRef(null)
  const socket = useContext(SocketContext)
  const { messages } = useSelector((store) => store)

  useEffect(() => {
    socket.on('reciveMessage', (message) => {
      dispatch(updateMessages(message))
      messageRef.current.scrollIntoView({ behavior: 'smooth' })
    })
  }, [dispatch, socket])

  return (
    <HistryContainer>
      <ul>
        {
          messages.map(({
            _id,
            socketId,
            userName,
            userColor,
            messageContent,
            messageType,
            dateTime
          }) => (
            <li
              key={_id}
              ref={messageRef}
            >
              <MessageHeaders color={userColor}>
                {`[${formatDateTime(dateTime)}]`}
                &nbsp;
                <b>
                  {userName}
                  {socketId === socket.id && ' (You)'}
                  {':'}
                </b>
                &nbsp;
              </MessageHeaders>
              {
                messageType === 'message'
                  ? messageContent
                  : <i dangerouslySetInnerHTML={{__html: messageContent}} />
              }
            </li>
          ))
        }
      </ul>
    </HistryContainer>
  )
}

export default History
