import React, { useEffect, useState } from 'react'
import useStyles from '../../styles'

import ContractService from '../../../../services/ContractService/'
import { currentProvider } from '../../../../services/MetaMaskService'
import cETHabi from '../../../../contracts/abi/cETH'
import { cETHaddress } from '../../../../contracts/addresses'

import { Box, Paper, Grid, Typography } from '@material-ui/core'

export default function Compound (props) {
  const classes = useStyles()

  const { cETH, symbol } = useCompoundLogic()

  return (
    <Grid container justify='center'>
      <Grid item md={9}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant='h3'>COMPOUND</Typography>
          <Box mt={3}></Box>
          <Grid container>
            <Grid item md={12}>
              <Typography variant='h5'>Current Balance</Typography>
            </Grid>
            <Grid item md={12}>
              SYMBOL: {symbol}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

function useCompoundLogic () {
  const cETH = new ContractService(
    currentProvider,
    cETHabi,
    cETHaddress.mainnet
  )
  const [symbol, setSymbol] = useState()

  console.log(cETH)
  useEffect(() => {
    if (!symbol) {
      const result = Promise.resolve(cETH.symbol.call())
      result.then(result => setSymbol(result[0]))

      const totalSupply = Promise.resolve(cETH.totalSupply.call())
      totalSupply.then(console.log)
    }
  })

  return { cETH, symbol }
}
