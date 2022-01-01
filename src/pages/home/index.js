import React from 'react'
import './style.scss'

const Home = () => {
  return(
    <main className='home'>
      <h1 className='home__title'>DONTCHAT</h1>
      <form className='home__form'>
        <label htmlFor='url'>www.dontchat.com/</label>
        <input id='url' />
        <button>Go!</button>
      </form>
      <section className='home__intro'>
        Dont login, just use a URL
        <br />
        Dont save, text is auto-saved
        <br />
        Dont juggle attached files, edit online with your friends
        <br />
        Dont lose your content, download with YourURL.zip
        <br />
        Dont forget, you can use yourURL/yourChat/yourSubChat
        <br />
        Dontchat!
      </section>
    </main>
  )
}

export default Home;
