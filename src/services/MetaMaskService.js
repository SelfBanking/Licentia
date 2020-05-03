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
