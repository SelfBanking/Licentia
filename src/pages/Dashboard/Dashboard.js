import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

import { Paper, Grid, Box } from '@material-ui/core'
import SideMenu from '../../components/SideMenu'
import Overview from '../Overview'
import useStyles from './styles'

import AaveOverview from './components/AaveOverview'
import CompoundOverview from './components/CompoundOverview'

import TopMenu from './components/TopMenu'

function Dashboard (props) {
  const { classes } = useDashbaordLogic()

  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      spacing={3}
      className={classes.root}
    >
      <Grid item md={5}>
        <Box m={3}>
          <AaveOverview />
        </Box>
      </Grid>
      <Grid item md={5}>
        <Box m={3}>
          <CompoundOverview />
        </Box>
      </Grid>
    </Grid>
  )
}
function FirstDemo () {
  return (
    <Box m={3}>
      <AaveOverview />
      <CompoundOverview />
    </Box>
  )
}

function OldGrid () {
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

const useDashbaordLogic = () => {
  const classes = useStyles()
  return { classes }
}

export default withRouter(Dashboard)
