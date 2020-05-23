import React from 'react'

import { Typography, Card, CardContent, Grid } from '@material-ui/core'
import {} from '@material-ui/icons'
import {} from '@material-ui/styles'

import useStyles from './styles'
import {} from '@material-ui/system'
// import { string } from 'prop-types';
// Crypto icons source: https://github.com/atomiclabs/cryptocurrency-icons/tree/master/svg/color
import BTCicon from 'cryptocurrency-icons/svg/color/btc.svg'
import ETHicon from 'cryptocurrency-icons/svg/color/eth.svg'

const AccountDetails = () => {
  const classes = useStyles()

  // const [account] = useState()

  return (
    <Grid container spacing={2} className={classes.accountGridStyle}>
      <Card className={classes.CardRoot} variant='outlined'>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs>
              <Typography color='textSecondary' gutterBottom>
                <img src={BTCicon} alt='BTC Icon' />
              </Typography>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  Bitcoin
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.coinworth}
                  color='textSecondary'
                  gutterBottom
                >
                  $ 300.00
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs>
                <Typography
                  className={classes.amount}
                  color='textSecondary'
                  gutterBottom
                >
                  1.23321
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.gain}
                  color='textSecondary'
                  gutterBottom
                >
                  30%
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* <Typography variant="h5" component="h2" color="textSecondary">
                    be{bull}nev{bull}o{bull}lent
                    </Typography> */}
        </CardContent>
      </Card>
      <Card className={classes.CardRoot} variant='outlined'>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs>
              <Typography color='textSecondary' gutterBottom>
                <img src={ETHicon} alt='Eth Icon' />
              </Typography>
            </Grid>
            <Grid container spacing={0}>
              <Grid item xs>
                <Typography
                  className={classes.title}
                  color='textSecondary'
                  gutterBottom
                >
                  Ether
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.coinworth}
                  color='textSecondary'
                  gutterBottom
                >
                  $ 300.00
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs>
                <Typography
                  className={classes.amount}
                  color='textSecondary'
                  gutterBottom
                >
                  1.23321
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  className={classes.gain}
                  color='textSecondary'
                  gutterBottom
                >
                  30%
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* <Typography variant="h5" component="h2" color="textSecondary">
                    be{bull}nev{bull}o{bull}lent
                    </Typography> */}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default AccountDetails
