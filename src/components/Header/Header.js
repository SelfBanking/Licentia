import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Grid,
  IconButton
} from '@material-ui/core'

import { Menu as MenuIcon } from '@material-ui/icons'
import MenuOpenTwoToneIcon from '@material-ui/icons/MenuOpenTwoTone'

import classNames from 'classnames'
import ShortPublicKey from '../ShortPublicKey'

import useStyles from './styles'

import {
  useWalletDispatch,
  useWalletState,
  connectMetamask,
  disconnectWallet
} from '../../context/WalletContext'

import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from '../../context/LayoutContext'

const Header = () => {
  const {
    handleWalletConnect,
    activeUser,
    connectStatus,
    layoutState,
    layoutDispatch,
    handleDisconnectWallet,
    classes
  } = useHeaderLogic()

  const ConnectOrAddress = () => {
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
            <Typography variant='h5'>
              <Button
                variant='outlined'
                color='inherit'
                onClick={handleDisconnectWallet}
              >
                <ShortPublicKey address={activeUser} />
              </Button>
            </Typography>
          </Grid>
        )}
      </Grid>
    )
  }

  return (
    <AppBar elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar} elevation={0}>
        <Grid container direction='row' alignItems='center'>
          <Grid item xs={3} sm={1} md={1} lg={1}>
            <IconButton
              color='inherit'
              onClick={() => toggleSidebar(layoutDispatch)}
              className={classNames(
                classes.headerMenuButton,
                classes.headerMenuButtonCollapse
              )}
            >
              {layoutState.isSidebarOpened ? (
                <MenuOpenTwoToneIcon
                  classes={{
                    root: classNames(
                      classes.headerIcon,
                      classes.headerIconCollapse
                    )
                  }}
                />
              ) : (
                <MenuIcon
                  classes={{
                    root: classNames(
                      classes.headerIcon,
                      classes.headerIconCollapse
                    )
                  }}
                />
              )}
            </IconButton>
          </Grid>
          <Grid item xs={5} sm={4} md={4} lg={4}>
            <Typography variant='h6' className={classes.title}>
              SELF BANKING
            </Typography>
          </Grid>
          <Grid item xs={6} sm={5} md={6} lg={5}>
            <Grid container alignItems='flex-start' justify='flex-end'>
              <Grid item xs={12} sm={7} md={6} lg={4}>
                {connectStatus === 'GETTING' ? (
                  <CircularProgress size={30} color='inherit' />
                ) : (
                  <ConnectOrAddress />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

const useHeaderLogic = () => {
  const classes = useStyles()
  const layoutState = useLayoutState()
  const layoutDispatch = useLayoutDispatch()
  const walletDispatch = useWalletDispatch()

  const { status: connectStatus, activeUser, Web3Injected } = useWalletState()

  const handleWalletConnect = () => connectMetamask(walletDispatch)
  const handleDisconnectWallet = () => disconnectWallet(walletDispatch)

  return {
    handleWalletConnect,
    handleDisconnectWallet,
    activeUser,
    Web3Injected,
    connectStatus,
    layoutState,
    layoutDispatch,
    classes
  }
}

export default Header
