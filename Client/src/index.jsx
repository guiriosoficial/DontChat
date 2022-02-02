import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './routes'
import store from './store'
import GlobaStyles from './styles/main'

const rootNode = document.getElementById('root')

render(
  <StrictMode>
    <Provider store={store}>
      <GlobaStyles />
      <App />
    </Provider>
  </StrictMode>,
  rootNode
)
