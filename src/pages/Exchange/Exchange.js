import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'

function Exchange () {
  return (
    <Grid container>
      <Grid item>This is the Exchange page.</Grid>
    </Grid>
  )
}

export default withRouter(Exchange)
