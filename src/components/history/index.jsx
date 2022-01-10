import React, { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMessages } from '../../store/messages'
import SocketContext from '../../plugins/socket'
import './style.scss'

const History = () => {
  const messages = useSelector(({ messages }) => messages)
  const socket = useContext(SocketContext)
  const messageRef = useRef(null)
  const dispatch = useDispatch()

  const getDateTime = (dateTime) => {
    const formatString = (value) => String(value).padStart(2, '0')
    const now = new Date(dateTime)
    const year = formatString(now.getFullYear())
    const month = formatString(now.getMonth() + 1)
    const day = formatString(now.getDate())
    const hours = formatString(now.getHours())
    const minutes = formatString(now.getMinutes())

    return `${year}/${month}/${day} ${hours}:${minutes}`
  }

  useEffect(() => {
    socket.on('RECIVE_MESSAGE', (message) => {
      dispatch(updateMessages(message))
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    })
  }, [socket])

  return (
    <section className="history">
      <ul>
        {
          messages.map(({ userId, userName, userColor, messageContent, dateTime, messageType }, index) => (
            <li key={index} ref={messageRef}>
              <span style={{ color: userColor }}>
                [{getDateTime(dateTime)}]&nbsp;
                <b>
                  {userName}
                  {userId === socket.id ? ' (You)' : ''}:
                </b>
              </span>
              &nbsp;
              {messageType === 'message' ? messageContent : <i>{messageContent}</i>}
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default History
