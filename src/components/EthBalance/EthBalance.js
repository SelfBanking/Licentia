import React, {useEffect} from 'react'
import {Typography, Grid, CircularProgress} from '@material-ui/core'
import {} from '@material-ui/icons'
import {} from '@material-ui/styles'

//import useStyles from './styles'
import {} from '@material-ui/system'

import {
  useEtherscanState,
  useEtherscanDispatch,
  getAccountInfo,
} from '../../context/EtherScanContext'

const EthBalance = () => {
  const {balance, status} = useDashboardLogic()
  //const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Typography variant="h3" component="h4">
        {status === 'GETTING' ? (
          <CircularProgress />
        ) : status === 'IDLE' && balance.length ? (
          <AccountInfoComponent balance={balance} />
        ) : null}
      </Typography>
    </Grid>
  )
}
function AccountInfoComponent({balance}) {
  return balance
}
export function useDashboardLogic() {
  const {status, balance, message, error} = useEtherscanState()
  const etherscanDispatch = useEtherscanDispatch()
  useEffect(() => {
    if (status === 'INIT') {
      getAccountInfo(etherscanDispatch)
    }
  })

  return {status, balance, message, error}
}

export default EthBalance
