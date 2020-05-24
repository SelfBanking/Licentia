import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'

import useStyles from './styles'
import Mainchart from './components/Mainchart'
// import AccountDetails from './components/AccountDetails'
import 'react-flags-select/css/react-flags-select.css'
import Header from '../../components/Header'
import EthBalance from './components/EthBalance/EthBalance'

function Dashboard (props) {
  const classes = useStyles()

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid>
        <Header />
      </Grid>
      <Grid item xs={10}>
        <Grid container justify='center' align='center'>
          <Grid item xs={12}>
            <Typography variant='h2'>WALLET BALANCE</Typography>
          </Grid>
          <Grid item xs={12}>
            <EthBalance />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container jusity='center' align='center'>
          <Mainchart />
        </Grid>
      </Grid>
      {/* <Grid item xs={12} sm={4}>
        <Typography variant='h3' gutterBottom>
          ALL ASSETS
        </Typography>
        <AccountDetails />
      </Grid> */}
    </Grid>
  )
}

export default withRouter(Dashboard)
