import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

import { Grid } from '@material-ui/core'
import SideMenu from '../../components/SideMenu'
import Overview from '../Overview'

import TopMenu from './components/TopMenu'

function Dashboard (props) {
  return (
    <Grid container>
      <Grid item xs={2} md={2}>
        <SideMenu />
      </Grid>
      <Grid item xs={10}>
        <TopMenu />
        <Switch>
          <Route exact path='/' component={Overview} />
        </Switch>
      </Grid>
    </Grid>
  )
}

export default withRouter(Dashboard)
