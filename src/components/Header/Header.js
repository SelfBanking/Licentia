import React from 'react'
import {
  Toolbar,
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
import SideMenu from '../SideMenu/SideMenu'
import PortisBtn from '../Portis/PortisBtn'

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
          <Grid>
            <Typography variant='h5'>{activeUser}</Typography>
          </Grid>
        )}

        {/* <PortisBtn /> */}
      </Grid>
    )
  }

  return (
    <Toolbar className={classes.toolbar} elevation={0}>
      <Grid container direction='row'>
        <Grid item md={1}>
          {/* <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton> */}
          <SideMenu />
        </Grid>
        <Grid item md={5} lg={7}>
          <Typography variant='h6' className={classes.title}>
            LICENTIA
          </Typography>
        </Grid>
        <Grid item md={2}>
          {connectStatus === 'GETTING' ? (
            <CircularProgress size={30} color='secondary' />
          ) : (
            <ButtonsOrAddress />
          )}
        </Grid>
      </Grid>
    </Toolbar>
  )
}

const useHeaderLogic = () => {
  const walletDispatch = useWalletDispatch()
  const { status: connectStatus, activeUser, Web3Injected } = useWalletState()

  const handleWalletConnect = () => connectMetamask(walletDispatch)

  return { handleWalletConnect, activeUser, Web3Injected, connectStatus }
}

export default Header
