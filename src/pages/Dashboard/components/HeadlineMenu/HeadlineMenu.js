import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import useStyles from '../../styles'

function HeadlineMenu (props) {
  const classes = useStyles()
  const active = props.match.params.crypto

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item md={3}>
        <Paper className={classes.paper}>
          <Grid container justify='center' spacing={4}>
            <Grid item>
              <Button
                variant={
                  active.toUpperCase() === 'ETH' ? 'contained' : 'outlined'
                }
                onClick={() => props.history.push('/eth')}
              >
                ETH
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={
                  active.toUpperCase() === 'BTC' ? 'contained' : 'outlined'
                }
                onClick={() => props.history.push('/btc')}
              >
                BTC
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default HeadlineMenu
