import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Typography } from '@material-ui/core'

import useStyles from './styles'
import Mainchart from './components/Mainchart'
import 'react-flags-select/css/react-flags-select.css'
import Header from '../../components/Header'
import { useWalletState } from '../../context/WalletContext'

function Dashboard (props) {
  const { activeUser, balanceUser, classes } = useDashboardLogic()

  return (
    <Grid container spacing={1} className={classes.root}>
      <Grid>
        <Header />
      </Grid>
      <Grid item xs={10}>
        <Grid container justify='center' align='center'>
          <Grid item xs={12}>
            <Typography variant='h2'>WALLET BALANCE</Typography>
            {!activeUser ? (
              <Typography variant='h3'>0.00000</Typography>
            ) : (
              <Grid>
                <Typography variant='h3'>{balanceUser}</Typography>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} />
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
const useDashboardLogic = () => {
  const classes = useStyles()

  const {
    status: connectStatus,
    activeUser,
    balanceUser,
    Web3Injected
  } = useWalletState()

  return {
    activeUser,
    balanceUser,
    Web3Injected,
    connectStatus,
    classes
  }
}

export default withRouter(Dashboard)
