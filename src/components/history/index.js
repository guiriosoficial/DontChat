import { useEffect, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMessages } from '../../store/messages'
import SocketContext from '../../plugins/socket'
import './style.scss'

const History = () => {
  const messages = useSelector(({ messages }) => messages)
  const socket = useContext(SocketContext)
  const messageRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('RECIVE_MESSAGE', (message) => {
      dispatch(updateMessages(message))
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    })
  }, [socket])

  return(
    <section className='history'>
      <ul>
        {
          messages.map(({ userId, userName, messageContent, dateTime }, index) => (
            <li key={index} ref={messageRef}>
              [{dateTime}]&nbsp;
              <b>
                {userName}
                {userId === socket.id ? ' (You)' : ''}:&nbsp;
              </b>
              {messageContent}
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default History
