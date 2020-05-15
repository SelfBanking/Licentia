import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'

import Themes from './themes'
import * as serviceWorker from './serviceWorker'

import { WalletProvider } from './context/WalletContext'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Themes.default}>
      <CssBaseline />
      <WalletProvider>
        <App />
      </WalletProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
