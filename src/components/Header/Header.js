import React from 'react'
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Grid
} from '@material-ui/core'
import useStyles from './styles'
import {
  useWalletDispatch,
  useWalletState,
  connectMetamask
} from '../../context/WalletContext'

const Header = () => {
  const classes = useStyles()
  const { handleWalletConnect, activeUser, connectStatus } = useHeaderLogic()

  const ButtonsOrAddress = () => {
    return (
      <Grid>
        {!activeUser ? (
          <Button
            variant='outlined'
            color='inherit'
            onClick={handleWalletConnect}
          >
            CONNECT WALLET
          </Button>
        ) : (
          <Typography variant='h5'>{activeUser}</Typography>
        )}
      </Grid>
    )
  }

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar} elevation={0}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        ></IconButton>
        <Typography variant='h6' className={classes.title}>
          LICENTIA
        </Typography>
        {connectStatus === 'GETTING' ? (
          <CircularProgress />
        ) : (
          <ButtonsOrAddress />
        )}
      </Toolbar>
    </AppBar>
  )
}

const useHeaderLogic = () => {
  const walletDispatch = useWalletDispatch()
  const { status: connectStatus, activeUser, Web3Injected } = useWalletState()

  const handleWalletConnect = () => connectMetamask(walletDispatch)

  return { handleWalletConnect, activeUser, Web3Injected, connectStatus }
}

export default Header
