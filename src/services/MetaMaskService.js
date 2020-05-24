export const initalize = async () => {
  if (window.ethereum) {
    window.web3 = new window.Web3(window.ethereum)
    try {
      await window.ethereum.enable()
      return true
    } catch {
      return false
    }
  }
  return false
}

export const web3Injected = () => {
  return window.web3 !== undefined && window.web3.currentProvider !== undefined
}

export const currentProvider = () => {
  return window.web3.currentProvider
}

export const activeUser = () => {
  return window.web3?.eth.defaultAccount
}

export const balanceUser = async user => {
  const accountBalance = new Promise((resolve, reject) => {
    window.web3.eth.getBalance(user, 'latest', function(err, result) {
      if (!err) {
        let balance = window.web3.fromWei(result.toNumber())
        resolve(balance)
      }
    })
  })

  const mybalance = await accountBalance

  return mybalance
}
// accounts: (...)
// blockNumber: (...)
// call: ƒ ()
// coinbase: (...)
// compile: {solidity: ƒ, lll: ƒ, serpent: ƒ}
// estimateGas: ƒ ()
// gasPrice: (...)
// getAccounts: ƒ (e)
// getBalance: ƒ ()
// getBlock: ƒ ()
// getBlockNumber: ƒ (e)
// getBlockTransactionCount: ƒ ()
// getBlockUncleCount: ƒ ()
// getCode: ƒ ()
// getCoinbase: ƒ (e)
// getCompilers: ƒ ()
// getGasPrice: ƒ (e)
// getHashrate: ƒ (e)
// getMining: ƒ (e)
// getProtocolVersion: ƒ (e)
// getStorageAt: ƒ ()
// getSyncing: ƒ (e)
// getTransaction: ƒ ()
// getTransactionCount: ƒ ()
// getTransactionFromBlock: ƒ ()
// getTransactionReceipt: ƒ ()
// getUncle: ƒ ()
// getWork: ƒ ()
// hashrate: (...)
// iban: ƒ (t)
// mining: (...)
// protocolVersion: (...)
// sendIBANTransaction: ƒ ()
// sendRawTransaction: ƒ ()
// sendTransaction: ƒ ()
// sign: ƒ ()
// signTransaction: ƒ ()
// submitWork: ƒ ()
// syncing: (...)
// _requestManager: a {provider: Proxy, polls: {…}, timeout: null}
// defaultAccount: (...)
// defaultBlock: (...)
// get accounts: ƒ ()
// get blockNumber: ƒ ()
// get coinbase: ƒ ()
// get gasPrice: ƒ ()
// get hashrate: ƒ ()
// get mining: ƒ ()
// get protocolVersion: ƒ ()
// get syncing: ƒ ()
// __proto__: Object
