import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Home from '@/pages/Home'
import Chat from '@/pages/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Chat />} path="/*" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
