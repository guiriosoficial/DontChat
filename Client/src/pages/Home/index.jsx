import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Title, Form, Texts } from './styles'

function Home() {
  const navigate = useNavigate()
  const [roomPath, setRoomPath] = useState('')
  const handleChangeRoomPath = (evt) => setRoomPath(evt.target.value)

  return (
    <main className="home">
      <Title>DONTCHAT</Title>
      <Form onSubmit={() => navigate(roomPath)}>
        <label htmlFor="roomPath">www.dontchat.com/</label>
        &nbsp;
        <input
          value={roomPath}
          id="roomPath"
          name="roomPath"
          autoCapitalize="off"
          autoCorrect="off"
          type="text"
          onChange={handleChangeRoomPath}
        />
        &nbsp;
        <button type="submit">Go!</button>
      </Form>
      <Texts>
        Dont login, just use a URL
        <br />
        Dont disrespect other users
        <br />
        Dont send or click in suspect links
        <br />
        Dont share any personal information
        <br />
        Dont forget, change your nickname whenever you want
        <br />
        Dontchat!
      </Texts>
    </main>
  )
}

export default Home
