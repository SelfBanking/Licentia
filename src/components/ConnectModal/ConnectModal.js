import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core'
import ConnectIcon from '../../assets/asset-connect.png'
import useStyles from './connectModalStyle'
import PortisBtn from '../Portis/PortisBtn'

export default function ConnectModal () {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (<ListItem button onClick={handleOpen} className={classes.leftIconsBtns}>
    <ListItemIcon>
      <img src={ConnectIcon} alt='Connect' className={classes.imageIcon} />;
    </ListItemIcon>
    <ListItemText primary='CONNECT' />

    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography variant='h2'>
                            Get your ticket to ride
          </Typography>
          <Typography variant='span'>
                            Connect your wallet to access hundreds of apps on the blockchain that allows you to transact, play and more.
          </Typography>
          <Typography variant='h3'>
                            No wallet? No problem.
          </Typography>
          <Typography variant='span'>
                            Choce one and create a new wallet that works for you!
          </Typography>
          <ul />
          <PortisBtn />

        </div>
      </Fade>
    </Modal>
          </ListItem>
  )
}
