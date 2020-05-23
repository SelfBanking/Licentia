import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
import {ThemeProvider} from '@material-ui/styles'
import {CssBaseline} from '@material-ui/core'

import Themes from './themes'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ThemeProvider theme={Themes.default}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
