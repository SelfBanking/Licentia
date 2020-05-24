import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  formControl: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    minHeight: '40px',
    minWidth: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  labelForm: {
    color: 'white'
  },
  divider: {
    paddingTop: '140px'
  },
  titleBalance: {
    paddingRight: '30px'
  }
}))
