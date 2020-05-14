import React, {useState,useEffect} from 'react';
import { Typography } from '@material-ui/core';
import { ArrowForwardIosRounded } from '@material-ui/icons/ArrowForwardIosRounded';
import { withTheme } from '@material-ui/styles';

import useStyles from './accountDetailsStyle';
import { string } from 'prop-types';


const AccountDetails = () => {
    const classes = useStyles();
    const myPortisWalletAccount = string;
    //const stickyValue = window.localStorage.getItem(myPortisWalletAccount);
    const [account] = useState();
        

    useEffect(()=>
        window.localStorage.getItem("myPortisWalletAccount"),[account]
    );

    const functionOne = () => (
     {

     })
  
    return <div className={classes.accountDetailsStyle}>
            <Typography variant="h4" gutterBottom>
                Account 1
                <a>{account}</a>
            </Typography>

          </div>
  }
  
  export default AccountDetails