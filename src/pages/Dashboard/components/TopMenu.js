import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from '../styles'

const TopMenu = () => {
  const classes = useStyles()
  return (
    <Grid item className={classes.topMenu}>
      This is the Top menu
    </Grid>
  )
}

export default TopMenu
