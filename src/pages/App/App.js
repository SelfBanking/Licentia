import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import Header from '../../components/Header'
import Dashboard from '../Dashboard'
import Sidebar from '../../components/Sidebar'

import classnames from 'classnames'

import { CompoundProvider } from '../../context/CompoundContext'
import { LayoutProvider, useLayoutState } from '../../context/LayoutContext'
import { WalletProvider } from '../../context/WalletContext'
import useStyles from './styles'

function App (props) {
  return (
    <HashRouter>
      <LayoutProvider>
        <WalletProvider>
          <AppContent />
        </WalletProvider>
      </LayoutProvider>
    </HashRouter>
  )
}

function AppContent () {
  const classes = useStyles()
  const { isSidebarOpened } = useLayoutState()

  return (
    <Grid className={classes.root}>
      <Header />
      <Sidebar />
      <Grid
        className={classnames(classes.content, {
          [classes.contentShift]: isSidebarOpened
        })}
      >
        <CompoundProvider>
          <Switch>
            <Route exact path='/' component={Dashboard} />
          </Switch>
        </CompoundProvider>
      </Grid>
    </Grid>
  )
}

export default App
