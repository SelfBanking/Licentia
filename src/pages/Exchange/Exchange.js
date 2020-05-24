import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from '@material-ui/core'

import useStyles from './styles'

function Exchange () {
  const classes = useStyles()

  return (
    <Grid container justify='center'>
      <Grid item xs={8}>
        <Grid item xs={8}>
          <Typography variant='h2' align='center'>
          Swap between crypto currency easily
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant='subtitle2' align='center'>
          Swap/Exhcange between ERC20 cryptocurrencies, using DEX (Decentralized Exchanges) easily trusted and run by the community.
          </Typography>
        </Grid>
      </Grid>
      <Grid className={classes.divider} container justify='center'>
        <Grid container spacing={2}>
          <Typography className={classes.titleBalance} align='center' variant='h2'>My Balance:</Typography>
          <Typography align='center' variant='h4'>
                0.2341232
            <p> $ 125.00 </p>
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl required className={classes.formControl}>
              <InputLabel className={classes.labelForm}>I want to exchange</InputLabel>
              <Select
                className={classes.labelForm}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Eth</MenuItem>
                <MenuItem value={20}>Link</MenuItem>
                <MenuItem value={30}>Dai</MenuItem>
              </Select>
              <FormHelperText className={classes.labelForm}>Required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl required className={classes.formControl}>
              <InputLabel className={classes.labelForm}>I will get</InputLabel>
              <Select
                className={classes.labelForm}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Eth</MenuItem>
                <MenuItem value={20}>Link</MenuItem>
                <MenuItem value={30}>Dai</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withRouter(Exchange)
