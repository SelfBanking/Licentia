import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, GridList, GridListTile, Paper, Typography, ListItem, ListItemIcon, ListItemText, IconButton} from '@material-ui/core'
import useStyles from './styles'
import Mainchart from './components/Mainchart'
import AccountDetails from './components/AccountDetails'
import SideMenu from '../../components/SideMenu/SideMenu'
//asset icons
import HelpIcon from '../../assets/asset-help.png';
//currency selection
import ReactFlagsSelect from 'react-flags-select'
import 'react-flags-select/css/react-flags-select.css'
import ConnectModal from '../../components/ConnectModal/ConnectModal';

function Dashboard (props) {
  const classes = useStyles();

  return (
    <Grid container spacing={1} className={classes.mainGrid} align='center'>
      <GridList className={classes.topBtnContainer} cols={2} item xs={12}>
        <Grid item xs={4}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <SideMenu />
          <Typography variant='h6' className={classes.title}>
            LICENTIA
          </Typography>
        </Grid>
        <Grid item xs={8} container direction="row" justify="flex-end">
          <GridListTile>
            <ConnectModal/>
          </GridListTile>
          <GridListTile key="Learn">
            <ListItem button key="Learn" className={classes.leftIconsBtns}>
              <ListItemIcon>
                <img src={HelpIcon} alt="Learn" className={classes.imageIcon}/>;
              </ListItemIcon>
              <ListItemText primary="HELP" />
            </ListItem>
          </GridListTile>
        </Grid>
      </GridList>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Grid item xs={6}>
            <h2>Total Balance</h2>
          </Grid>
          <Grid item xs={6}>
            <ReactFlagsSelect
              className={classes.flagDropdown}
              defaultCountry='US'
              countries={['US', 'GB', 'FR', 'DE', 'IT', 'NG']}
            />
            <Typography variant='h1' component='h2'>
              $ 125,00
            </Typography>
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

export default withRouter(Dashboard)
