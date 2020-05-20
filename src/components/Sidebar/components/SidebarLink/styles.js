import { makeStyles } from '@material-ui/styles'

export default makeStyles(theme => ({
  link: {
    backgroundColor: theme.palette.primary.darken,
    textDecoration: 'none',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.secondary
    }
  },
  linkActive: {
    backgroundColor: theme.palette.secondary.light
  },
  linkNested: {
    paddingLeft: 0,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.secondary
    }
  },
  linkIcon: {
    color: '#FFF',
    transition: theme.transitions.create('color'),
    display: 'flex',
    justifyContent: 'center'
  },
  linkIconActive: {
    color: '#FFF'
  },
  linkText: {
    padding: 0,
    color: '#FFF',
    transition: theme.transitions.create(['opacity', 'color']),
    fontSize: 16
  },
  linkTextActive: {
    color: '#E9E9E9',
    fontWeight: 'bold'
  },
  linkTextHidden: {
    opacity: 0
  },
  nestedList: {
    paddingLeft: theme.spacing(2) + 30
  },
  sectionTitle: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    height: 1,
    backgroundColor: theme.palette.primary.light
  }
}))
