import React from 'react'
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  Grid,
  FormGroup,
  Switch,
  FormControlLabel
} from '@material-ui/core'
import useStyles from './styles'
import {
  useWalletDispatch,
  useWalletState,
  connectMetamask
} from '../../context/WalletContext'
import SideMenu from '../SideMenu/SideMenu';
import PortisBtn from '../Portis/PortisBtn';

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

        <PortisBtn/>
      </Grid>
    )
  }

  const SwitchComponent = () => (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={false}
            onChange={() => console.log}
            name='checkedB'
            color='primary'
          />
        }
        label='Primary'
      />
    </FormGroup>
  )

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar} elevation={0}>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='menu'
        ></IconButton>
         <SideMenu/>
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
