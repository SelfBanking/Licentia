import { makeStyles } from '@material-ui/core'
//import { color } from '@material-ui/system';

export default makeStyles(theme => ({
  list: {
    width: 250,
    color: 'black',
    backgroundColor: '#185f7d'
  },
  fullList: {
    width: 'auto',
    backgroundColor: '#185f7d'
  },
  arrowIcon: {
    backgroundColor: '#2d3438',
    height: '25px',
    width: '25px',
    borderRadius: '50%',
    position: 'relative',
    color: 'white',
    opacity: '80%'
  },
  leftSideDrawer: {
    backgroundColor: '#185f7d'
  },
  leftIconsBtns: {
    backgroundColor: '#044e65',
    color: '#ededed'
  },
  imageIcon: {
    height: '28px'
  }
}))
