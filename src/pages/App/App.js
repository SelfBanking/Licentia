import React from 'react'
import { createBrowserHistory } from 'history'
import { Switch, Route, Router } from 'react-router-dom'

import DashboardPage from '../Dashboard'
import Header from '../../components/Header'

function App (props) {
  const hist = createBrowserHistory()

  return (
    <Router history={hist}>
      <Header />
      <Switch>
        <Route exact path='/' component={DashboardPage} />
      </Switch>
    </Router>
  )
}

export default App
