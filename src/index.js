import { render } from 'react-dom'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import SocketContext, { socket } from './plugins/socket'
import App from './routes'
import store from './store'
import './styles/main.scss'

render(
  <StrictMode>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);
