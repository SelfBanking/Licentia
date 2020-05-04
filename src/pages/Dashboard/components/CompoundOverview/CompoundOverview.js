import React from 'react'
import useStyles from '../../styles'
import { Grid, Paper, Typography } from '@material-ui/core'

export default function CompoundOverview () {
  const { classes } = useCompoundOverviewLogic()
  return (
    <Grid item md={10}>
      <Paper elevation={0} className={classes.paper}>
        <center>
          <Typography variant='h4'>COMPOUND</Typography>
        </center>
      </Paper>
    </Grid>
  )
}

function useCompoundOverviewLogic () {
  const classes = useStyles()

  return { classes }
}
