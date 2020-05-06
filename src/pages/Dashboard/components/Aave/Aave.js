import React from 'react'
import useStyles from '../../styles'
import { Grid, Paper, Typography } from '@material-ui/core'

export default function Aave () {
  const { classes } = useAaveLogic()
  return (
    <Grid container justify='center'>
      <Grid item md={9}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant='h4'>AAVE</Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

function useAaveLogic () {
  const classes = useStyles()

  return { classes }
}
