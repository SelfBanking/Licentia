import React from 'react'
import { Paper } from '@material-ui/core'

import useStyles from './styles'

const SideMenu = () => {
  const classes = useStyles()

  return <Paper className={classes.paper}>Menu</Paper>
}

export default SideMenu
