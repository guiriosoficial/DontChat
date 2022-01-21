import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

function Home() {
  const navigate = useNavigate()
  const [roomPath, setRoomPath] = useState('')
  const handleChangeRoomPath = (evt) => setRoomPath(evt.target.value)

  return (
    <main className="home">
      <h1>DONTCHAT</h1>
      <form onSubmit={() => navigate(roomPath)}>
        <label htmlFor="roomPath">
          www.dontchat.com/
        </label>
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
        <button type="submit">
          Go!
        </button>
      </form>
      <section>
        Dont login, just use a URL<br />
        Dont save any message or chat history<br />
        Dont pass any personal information<br />
        Dont lose your conversation, download with YourURL.zip<br />
        Dont forget, change your nickname whenever you want<br />
        Dontchat!<br />
      </section>
    </main>
  )
}

export default Home
