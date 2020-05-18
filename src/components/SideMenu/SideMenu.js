import React from 'react';
import clsx from 'clsx';
import {  } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded';

//from assets folder
import BorrowIcon from '../../assets/asset-borrow.png';
//import ConnectIcon from '../../assets/asset-connect.png';
import DonateIcon from '../../assets/asset-donate.png';
import ExchangeIcon from '../../assets/asset-exchange.png';
import HelpIcon from '../../assets/asset-help.png';
import InsureIcon from '../../assets/asset-insure.png';
//import InvestIcon from '../../assets/asset-invest.png';
import LendIcon from '../../assets/asset-lend.png';
import PayIcon from '../../assets/asset-pay.png';
//import SaveIcon from '../../assets/asset-save-white.png';
import ShopIcon from '../../assets/asset-shop.png';
import TradeIcon from '../../assets/asset-trade-invest.png';

import useStyles from './styles'
import ConnectModal from '../ConnectModal/ConnectModal';



const SideMenu = () => {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
 

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        //[classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ConnectModal/>
        <ListItem button key="Learn" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={HelpIcon} alt="Learn" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="HELP" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="Exchange" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={ExchangeIcon} alt="Exchange" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="EXCHANGE" />
        </ListItem>
        <ListItem button key="Trade" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={TradeIcon} alt="Trade" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="TRADE" />
        </ListItem>
        <ListItem button key="Lend" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={LendIcon} alt="Lend" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="LEND" />
        </ListItem>
      </List>
      <Divider />
      <List>
      <ListItem button key="Pay" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={PayIcon} alt="Pay" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="PAY" />
        </ListItem>
        <ListItem button key="Insure" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={InsureIcon} alt="Insure" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="INSURE" />
        </ListItem>
        <ListItem button key="Shop" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={ShopIcon} alt="Shop" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="SHOP" />
        </ListItem>
        <ListItem button key="Borrow" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={BorrowIcon} alt="Borrow" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="BORROW" />
        </ListItem>
        <ListItem button key="Donate" className={classes.leftIconsBtns}>
          <ListItemIcon>
            <img src={DonateIcon} alt="Donate" className={classes.imageIcon}/>;
          </ListItemIcon>
          <ListItemText primary="DONATE" />
        </ListItem>
      </List>
    </div>
  );

  return <div>
          {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <ArrowForwardIosRounded className={classes.arrowIcon} onClick={toggleDrawer(anchor, true)}>{anchor}</ArrowForwardIosRounded>
              {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
              <Drawer classes={{ paper: classes.leftSideDrawer }} anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </div>
}

export default SideMenu