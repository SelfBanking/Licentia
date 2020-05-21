import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  root: {
    marginTop: 0,
    paddingTop: '10px',
    height: '100%',
    backgroundColor: theme.palette.primary.main
  },
  paper: {
    backgroundColor: '#185f7d',
    padding: '50px'
  },
  flagDropdown: {
    color: 'black',
    backgroundColor: 'white'
  },
  accountGridStyle: {
    paddingLeft: '20px'
  },
  leftIconsBtns: {
    backgroundColor: '#044e65',
    color: '#ededed'
  },
  imageIcon: {
    height: '28px'
  },
  topBtnContainer: {
    flex: '10px',
    maxHeight: '100px'
  }
}))
