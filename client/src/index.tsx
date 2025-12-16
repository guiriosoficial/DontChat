import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './routes'
import store from './store'
import GlobalStyles from './styles/main'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </StrictMode>
)
