import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    CardRoot: {
        backgroundColor:'#e5e5e5',
        opacity:'80%',
        height: '140px',
        width: '400px'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      pos: {
        marginBottom: 12,
      },
      title: {
        fontSize: 20,
        fontStyle: 'bold'
      },
      amount: {
        fontSize: 16,
        fontStyle: 'bold'
      },
      coinworth: {
        fontSize: 20,
        fontStyle: 'bold'
      },
      gain: {
        fontSize: 16,
        fontStyle: 'bold',
        color: 'green'
      },
}))
