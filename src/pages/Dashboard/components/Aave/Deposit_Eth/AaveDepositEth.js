import React, { useEffect, useState } from 'react'
import useStyles from '../../../styles'
import { Grid, Paper, Typography, Box } from '@material-ui/core'

import ContractService from '../../../../../services/ContractService/'
import { currentProvider } from '../../../../../services/MetaMaskService'
//import aETHabi from '../../../../contracts/abi/cETH'
import aETHabi from '../../../../../contracts/abi/aETH/kovan/AToken.json'
import { aETHaddress } from '../../../../../contracts/addresses'
import LendingPoolAddressesProviderABI from '../../../../../contracts/abi/aETH/kovan/LendingPoolAddressesProvider.json'
import LendingPoolABI from '../../../../../contracts/abi/aETH/kovan/LendingPool.json'

export default function AaveDeposit () {
  const { classes, symbol, name } = depositEth()
  return (
    <Grid container justify='center'>
      <Grid item md={9}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant='h3'>AAVE</Typography>
          <Box mt={3}></Box>

          <Grid container>
            <Grid item>
              <Typography variant='h5'>Current Balance</Typography>
              <li>SYMBOL: {symbol}</li>
              <li>Name: {name}</li>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

function depositEth () {
  const classes = useStyles()
  const ethAmountinWei = web3.utils.toWei("0.1", "ether").toString()
  const referralCode = '0'
  const aETH = new ContractService(
    currentProvider,
    aETHabi,
    aETHaddress.kovan //changed for kovan
  )
  const lpAddressProviderContract = new web3.eth.Contract(LendingPoolAddressesProviderABI, lpAddressProviderAddress)
  const [symbol, setSymbol] = useState();
  const [name, setName] = useState();

  // Get the latest LendingPoolCore address
    const lpCoreAddress = await lpAddressProviderContract.methods
    .getLendingPoolCore()
    .call()
    .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`)
    })


  console.log(aETH)
  useEffect(() => {
    if (!symbol) {
      const result = Promise.resolve(aETH.symbol.call());
      const resultName = Promise.resolve(aETH.name.call());
      
      result.then(result => setSymbol(result[0]));
      resultName.then(resultName => setName(resultName[0]));

    //   const totalSupply = Promise.resolve(aETH.totalSupply.call())
    //   console.log(totalSupply)
    //   window.web3.eth.getBalance(
    //     '0xf560DAa6959DaA8437f54cdd9e7A7602d1ba97De',
    //     (err, result) => console.log(err, result.toString())
    //   )
    }
  })

  return { aETH, symbol, classes, name }
}
