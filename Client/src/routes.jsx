import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Chat />} path="/*" />
      </Routes>
    </Router>
  )
}

export default App
