import Eth from 'ethjs-query'
import EthContract from 'ethjs-contract'

export default function ContractService (provider, abi, address) {
  const eth = new Eth(provider())
  const ethContract = new EthContract(eth)

  const Contract = ethContract(abi)
  const contract = Contract.at(address)

  return contract
}
