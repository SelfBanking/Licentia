import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Paper, Typography, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import Mainchart from './components/Mainchart'
import AccountDetails from './components/AccountDetails'
// import SideMenu from '../../components/SideMenu/SideMenu'
// //asset icons
// import HelpIcon from '../../assets/asset-help.png'
// //currency selection
// import ReactFlagsSelect from 'react-flags-select'
import 'react-flags-select/css/react-flags-select.css'

// compound state
import {
  useCompoundState,
  useCompoundDispatch,
  getCtokens
} from '../../context/CompoundContext'

function Dashboard (props) {
  const { cTokens, status } = useDashboardLogic()

  const classes = useStyles()

  return (
    <Grid container spacing={1} className={classes.mainGrid} align='center'>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={6}>
            <h2>Total Balance</h2>
          </Grid>
          <Grid item xs={6}>
            {/* <ReactFlagsSelect
              className={classes.flagDropdown}
              defaultCountry='US'
              countries={['US', 'GB', 'FR', 'DE', 'IT', 'NG']}
            /> */}
            <Typography variant='h1' component='h2'>
              $ 125,00
            </Typography>
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid>
            {status === 'GETTING' ? (
              <CircularProgress />
            ) : status === 'IDLE' ? (
              <CTokenPriceComponent cTokens={cTokens} />
            ) : null}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper className={classes.paper}>
          <Mainchart />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant='h3' gutterBottom>
          ALL ASSETS
        </Typography>
        <Paper className={classes.paper}>
          <AccountDetails />
        </Paper>
      </Grid>
    </Grid>
  )
}

function CTokenPriceComponent ({ cTokens }) {
  const template = []
  cTokens.map((token, i) => template.push(<p key={i}>{token.name}</p>))
  return template
}

export function useDashboardLogic () {
  const { status, cTokens, message, error } = useCompoundState()
  const compoundDispatch = useCompoundDispatch()

  useEffect(() => {
    if (status === 'INIT') {
      getCtokens(compoundDispatch)
    }
  })

  return { status, cTokens, message, error }
}

export default withRouter(Dashboard)
