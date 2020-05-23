import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'

function Learn () {
  return (
    <Grid container justify='center'>
      <Grid item>This is the Learn page.</Grid>
    </Grid>
  )
}

export default withRouter(Learn)
