import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'

//import Header from '../../components/Header'
import Dashboard from '../Dashboard'
import { CompoundProvider } from '../../context/CompoundContext'
import { EtherscanProvider } from '../../context/EtherscanContext';

function App (props) {
  return (
    <HashRouter>
      {/* <Header /> */}
      <Switch>
        <CompoundProvider>
        <EtherscanProvider>
          <Route exact path='/' component={Dashboard} />
          </EtherscanProvider>
        </CompoundProvider>
      </Switch>
    </HashRouter>
  )
}

export default App
