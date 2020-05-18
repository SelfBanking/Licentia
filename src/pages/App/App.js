import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

//import Header from '../../components/Header'
import Dashboard from '../Dashboard'
import { CompoundProvider } from '../../context/CompoundContext'
import Header from '../../components/Header'
function App (props) {
  return (
    <HashRouter>
      <Header />
      <Switch>
        <CompoundProvider>
          <Route exact path='/' component={Dashboard} />
        </CompoundProvider>
      </Switch>
    </HashRouter>
  )
}

export default App
