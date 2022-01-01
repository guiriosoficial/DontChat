import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Home from './pages/home/index'
import Chat from './pages/chat/index'

const R = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' exact />
        <Route element={<Chat />} path='/:url/*' />
      </Routes>
    </BrowserRouter>
  )
}

export default R;
