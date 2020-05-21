import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'

function Connect () {
  return (
    <Grid container>
      <Grid item>This is the Connect page.</Grid>
    </Grid>
  )
}

export default withRouter(Connect)
