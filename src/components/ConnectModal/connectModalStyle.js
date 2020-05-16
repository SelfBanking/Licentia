import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
    leftIconsBtns:{
        backgroundColor:'#044e65',
        color:'#ededed'
      },
    imageIcon:{
        height:'28px',
      },
    topBtnContainer:{
        flex:'10px',
        maxHeight:'100px'
      },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: '#185f7d',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      h2:{
        fontWeight:'bold'
      }
}))
