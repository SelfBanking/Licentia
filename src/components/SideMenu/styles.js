import { makeStyles } from '@material-ui/core'
import { color } from '@material-ui/system';

export default makeStyles(theme => ({
  list: {
    width: 250,
    color: 'black'
  },
  fullList: {
    width: 'auto',
  },
  arrowIcon: {
    backgroundColor:"#dbdbd9",
    height: '25px',
    width: '25px',
    borderRadius: '50%',
    position: 'relative',
    color: "black"
  },
}))
