import React from 'react'
import useStyles from '../../styles'
import { Grid, Paper, Typography } from '@material-ui/core'

export default function AaveOverview () {
  const { classes } = useAaveOverviewLogic()
  return (
    <Grid item md={10}>
      <Paper elevation={0} className={classes.paper}>
        <center>
          <Typography variant='h4'>AAVE</Typography>
        </center>
      </Paper>
    </Grid>
  )
}

function useAaveOverviewLogic () {
  const classes = useStyles()

  return { classes }
}
