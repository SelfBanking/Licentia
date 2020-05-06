import React from 'react'
import { withRouter } from 'react-router-dom'

import { Grid, Box } from '@material-ui/core'

import Aave from './components/Aave'
import Compound from './components/Compound'
import HeadlineMenu from './components/HeadlineMenu'

function Dashboard (props) {
  return (
    <Grid container justify='center' spacing={3}>
      <HeadlineMenu {...props} />
      <Grid item md={6}>
        <Box m={3}>
          <Aave {...props} />
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box m={3}>
          <Compound {...props} />
        </Box>
      </Grid>
    </Grid>
  )
}

export default withRouter(Dashboard)
