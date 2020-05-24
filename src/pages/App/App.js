import React from 'react'
import { Switch, Route, HashRouter } from 'react-router-dom'
import { Grid, Box } from '@material-ui/core'

import Header from '../../components/Header'
import Dashboard from '../Dashboard'
import Sidebar from '../../components/Sidebar'
import Learn from '../Learn'
import Exchange from '../Exchange'
import Pay from '../Pay'

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
        <WithContext>
          <AddSpaceBelowHeader />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/learn' component={Learn} />
            <Route exact path='/exchange' component={Exchange} />
            <Route exact path='/pay' component={Pay} />
          </Switch>
        </WithContext>
      </Grid>
    </Grid>
  )
}

function WithContext ({ children }) {
  return <CompoundProvider>{children}</CompoundProvider>
}

function AddSpaceBelowHeader () {
  return <Box mt={10} />
}

export default App
