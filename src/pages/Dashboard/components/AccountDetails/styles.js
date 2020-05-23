import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  CardRoot: {
    backgroundColor: '#044e65',
    opacity: '80%',
    height: '140px',
    width: '400px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  pos: {
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontStyle: 'bold',
    color: '#ededed'
  },
  amount: {
    fontSize: 16,
    fontStyle: 'bold',
    color: '#ededed'
  },
  coinworth: {
    fontSize: 20,
    fontStyle: 'bold',
    color: '#ededed'
  },
  gain: {
    fontSize: 18,
    fontStyle: 'bold',
    color: '#71ff71'
  }
}))
