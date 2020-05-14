import React from 'react'
import { createBrowserHistory } from 'history'
import { Switch, Route, Router } from 'react-router-dom'

import DashboardPage from '../Dashboard'
import Header from '../../components/Header'
import MainPage from '../MainPage/MainPage';


function App (props) {
  const hist = createBrowserHistory()
  
  return (
    <Router history={hist}>
      <Header />
      <Switch>
        {/* <Route
          exact
          path='/:crypto?'
          render={props => <DashboardPage {...props} />}
        /> */}
        <Route
          exact
          path='/mainPage'
          render={props => <MainPage {...props} />}
        />
      </Switch>
    </Router>
  )
}

function TopPadding () {
  return <div styles={{ height: 100 }}>.</div>
}

export default App
