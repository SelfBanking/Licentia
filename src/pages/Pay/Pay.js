import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Typography, Box } from '@material-ui/core'

function Pay () {
  return (
    <Grid container justify='center' align='center' alignItems='center'>
      <Grid item xs={12}>
        <Typography variant='h2'>Licentia Pay</Typography>
      </Grid>
      <Grid item xs={12}>
        <Box m={12}>
          Licentia pay enables crypto users to make payments from the comfort of
          their wallet.
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box m={5}>COMING SOON</Box>
      </Grid>
    </Grid>
  )
}

export default withRouter(Pay)
