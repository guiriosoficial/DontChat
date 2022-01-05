import { useEffect, useState } from 'react'
import './style.scss'

const History = ({ socket }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.on('RECIVE_MESSAGE', (message) => {
      setMessages((currentState) => [...currentState, message])
    })
  }, [socket])

  return(
    <section className='history'>
      <ul>
        {
          messages.map(({ userId, userName, messageContent, dateTime }, index) => (
            <li key={index}>
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
