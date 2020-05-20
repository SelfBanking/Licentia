import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  logotype: {
    color: 'white',
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    fontWeight: 500,
    fontSize: 18,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  appBar: {
    width: '100vw',
    border: '0px',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  grow: {
    flexGrow: 1
  },
  headerMenu: {
    marginTop: theme.spacing(7)
  },
  headerMenuList: {
    display: 'flex',
    flexDirection: 'column'
  },
  headerMenuItem: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    }
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5)
  },
  headerMenuButtonCollapse: {
    marginRight: theme.spacing(2)
  },
  headerIcon: {
    fontSize: 28,
    color: 'rgba(255, 255, 255, 0.35)'
  }
}))
