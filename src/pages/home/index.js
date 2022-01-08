import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.scss'

const Home = () => {
  const [path, setPeth] = useState('')
  const handleChange = event => setPeth(event.target.value)
  const navigate = useNavigate()

  return(
    <main className='home'>
      <h1>DONTCHAT</h1>
      <form onSubmit={() => navigate(path)}>
        <label htmlFor='path'>www.dontchat.com/</label>
        &nbsp;
        <input
          value={path}
          type='text'
          id='path'
          name='path'
          autoCapitalize='off'
          autoCorrect='off'
          onChange={handleChange}
        />
        &nbsp;
        <button type='submit'>Go!</button>
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

export default Home;
