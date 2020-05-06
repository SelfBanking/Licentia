import React, { useEffect, useState } from 'react'
import useStyles from '../../styles'

import ContractService from '../../../../services/ContractService/'
import { currentProvider } from '../../../../services/MetaMaskService'
import cETHabi from '../../../../contracts/abi/cETH'
import { cETHaddress } from '../../../../contracts/addresses'

import { Box, Paper, Grid } from '@material-ui/core'

export default function Compound (props) {
  const classes = useStyles()

  const { cETH, symbol } = useCompoundLogic()

  return (
    <Grid container justify='center'>
      <Grid item md={9}>
        <Paper elevation={0} className={classes.paper}>
          COMPOUND {symbol}
          <Box mt={3}>Data</Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

function useCompoundLogic () {
  const cETH = new ContractService(currentProvider, cETHabi, cETHaddress)
  const [symbol, setSymbol] = useState()

  useEffect(() => {
    if (!symbol) {
      const result = Promise.resolve(cETH.symbol.call())
      result.then(result => setSymbol(result[0]))
    }
  })

  return { cETH, symbol }
}
