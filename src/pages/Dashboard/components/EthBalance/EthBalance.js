import React, { useEffect } from 'react'
import { Typography, Grid, CircularProgress } from '@material-ui/core'

import {
  useEtherscanState,
  useEtherscanDispatch,
  getAccountInfo
} from '../../../../context/EtherscanContext'

const EthBalance = () => {
  const { balance, status } = useEthBalanceLogic()
  // const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Typography variant='h3' component='h4'>
        {status === 'GETTING' ? (
          <CircularProgress />
        ) : status === 'IDLE' && balance.length ? (
          <AccountInfoComponent balance={balance} />
        ) : null}
      </Typography>
    </Grid>
  )
}
function AccountInfoComponent ({ balance }) {
  return balance
}
export function useEthBalanceLogic () {
  const { status, balance, message, error } = useEtherscanState()
  const etherscanDispatch = useEtherscanDispatch()
  useEffect(() => {
    if (status === 'INIT') {
      getAccountInfo(etherscanDispatch)
    }
  })

  return { status, balance, message, error }
}

export default EthBalance
