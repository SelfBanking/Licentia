import React, { useEffect, useState } from 'react'
import useStyles from '../../styles'
import { Grid, Paper, Typography, Box } from '@material-ui/core'

import ContractService from '../../../../services/ContractService/'
import { currentProvider } from '../../../../services/MetaMaskService'
import aETHabi from '../../../../contracts/abi/cETH'
import { aETHaddress } from '../../../../contracts/addresses'

export default function Aave () {
  const { classes, symbol } = useAaveLogic()
  return (
    <Grid container justify='center'>
      <Grid item md={9}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant='h3'>AAVE</Typography>
          <Box mt={3}></Box>

          <Grid container>
            <Grid item>
              <Typography variant='h5'>Current Balance</Typography>
              SYMBOL: {symbol}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

function useAaveLogic () {
  const classes = useStyles()

  const aETH = new ContractService(
    currentProvider,
    aETHabi,
    aETHaddress.mainnet
  )
  const [symbol, setSymbol] = useState()

  console.log(aETH)
  useEffect(() => {
    if (!symbol) {
      const result = Promise.resolve(aETH.symbol.call())
      result.then(result => setSymbol(result[0]))

      const totalSupply = Promise.resolve(aETH.totalSupply.call())
      console.log(totalSupply)
      window.web3.eth.getBalance(
        '0x7702d9af72e914dd619892e626220696e185da44',
        (err, result) => console.log(err, result.toString())
      )
    }
  })

  return { aETH, symbol, classes }
}
