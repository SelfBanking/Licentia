import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

import Header from '../../components/Header'
import Dashboard from '../Dashboard'

function App (props) {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route exact path='/' render={props => <Dashboard {...props} />} />
      </Switch>
    </HashRouter>
  )
}

export default App
