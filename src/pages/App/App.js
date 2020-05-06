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
      <TopPadding />
      <Switch>
        <Route
          exact
          path='/:crypto?'
          render={props => <DashboardPage {...props} />}
        />
      </Switch>
    </Router>
  )
}

function TopPadding () {
  return <div styles={{ height: 100 }}>.</div>
}

export default App
