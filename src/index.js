import { render } from 'react-dom'
import App from './Routes'
import './styles/main.scss'

const rootElement = document.getElementById('root')

render(
  <App />,
  rootElement
);

