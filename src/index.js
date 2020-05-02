import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App/App'

import * as serviceWorker from './serviceWorker'

import { UserProvider } from './context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
