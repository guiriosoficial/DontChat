import React from 'react';

const messages = [
  {
    name: 'Gui Rios',
    id: '423546465',
    content: 'Mensagem aqui',
    dateTime: 'timezone',
  },
  {
    name: 'Gui Rios',
    id: '354623465',
    content: 'Mensagem aqui',
    dateTime: 'timezone',
  },
  {
    name: 'Gui Rios',
    id: '4235462',
    content: 'Mensagem aqui',
    dateTime: 'timezone',
  },
  {
    name: 'Gui Rios',
    id: '423465',
    content: 'Mensagem aqui',
    dateTime: 'timezone',
  },
]

const Chat = () => {
  return(
    <main>
      <ul>
        {
          messages.map(message => (
            <li key={message.id}>{message.content}</li>
          ))
        }
      </ul>
    </main>
  )
}

export default Chat;
