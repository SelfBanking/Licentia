import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    paddingLeft: '5px'
  },
  toolbar: {
    background: theme.palette.primary.main,
    boxShadow: 'none',
    padding: 10
  }
}))
