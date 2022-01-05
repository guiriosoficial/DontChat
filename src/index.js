import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './Routes'
import './styles/main.scss'


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
