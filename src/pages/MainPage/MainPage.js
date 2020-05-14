import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Box, Paper, Icon, Typography } from '@material-ui/core'
import useStyles from './styles'
import Mainchart from './components/Mainchart/Mainchart';
import AccountDetails from './components/AccountDetails/AccountDetails';

//import Aave from './components/Aave'
//import Compound from './components/Compound'
//Library used: https://www.npmjs.com/package/react-flags-select
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';


function MainPage (props) {
  const classes = useStyles()

  return (
    <Grid container spacing={1} className={classes.mainGrid} align="center">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid item xs={6}>
              <h2>Total Balance</h2>
            </Grid>
            <Grid item xs={6}>
              <ReactFlagsSelect className={classes.flagDropdown} defaultCountry="US" countries={["US", "GB", "FR", "DE", "IT", "NG"]}/>
              <Typography variant="h1" component="h2">
                $ 125,00
              </Typography>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Mainchart/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h3" gutterBottom>
                ALL ASSETS
          </Typography>
          <Paper className={classes.paper}>
            <AccountDetails/>
          </Paper>
        </Grid>

      </Grid>
  )
}

export default withRouter(MainPage)