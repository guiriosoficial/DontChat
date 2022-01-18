import React, { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMessages } from '../../store/messages'
import formatDateTime from '../../utils/formatDateTime'
import SocketContext from '../../socket'
import './style.scss'

function History() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()  
  const { messages, user } = useSelector((store) => store)
  const messageRef = useRef(null)

  useEffect(() => {
    socket.on('receveMessage', (message) => {
      dispatch(updateMessages(message))
      messageRef.current.scrollIntoView({ behavior: 'smooth' })
    })
  }, [socket])

  return (
    <section className="history">
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
            <li key={_id} ref={messageRef}>
              <span style={{ color: userColor }}>
                {`[${formatDateTime(dateTime)}]`}
                &nbsp;
                <b>
                  {userName}
                  {socketId === socket.id && ' (You)'}
                  {':'}
                </b>
                &nbsp;
              </span>
              {
                messageType === 'message'
                  ? messageContent
                  : <i>{messageContent}</i>
              }
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default History
