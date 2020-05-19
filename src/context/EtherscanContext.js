import React from 'react'
import { getRequest } from '../services/HttpRequest'
import logger from 'use-reducer-logger'
import { utils } from 'ethers'

const EtherscanStateContext = React.createContext()
const EtherscanDispatchContext = React.createContext()

export const ETHSCAN_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING'
}

const initialState = {
  status: ETHSCAN_STATUS.INIT,
  balance: 0,
  message: {
    balance: null
  },
  error: {
    balance: null
  }
}

const actions = {
  GET_ETHSCAN_REQUEST: 'GET_ETHSCAN_REQUEST',
  GET_ETHSCAN_SUCCESS: 'GET_ETHSCAN_SUCCESS',
  GET_ETHSCAN_FAILURE: 'GET_ETHSCAN_FAILURE'
}

export function etherscanReducer (state, action) {
  switch (action.type) {
    case actions.GET_ETHSCAN_REQUEST:
      return {
        ...state,
        status: ETHSCAN_STATUS.GETTING,
        balance: 0,
        message: {
            balance: 'Requesting balance information data from Etherscan API'
        },
        error: {
          ...state.error,
          balance: null
        }
      }

    case actions.GET_ETHSCAN_SUCCESS:
      return {
        ...state,
        status: ETHSCAN_STATUS.IDLE,
        balance: action.payload,
        message: {
            balance: 'Success'
        },
        error: {
          ...state.error,
          balance: null
        }
      }

    case actions.GET_ETHSCAN_FAILURE:
      return {
        ...state,
        status: ETHSCAN_STATUS.IDLE,
        balance: 0,
        message: {
            balance: null
        },
        error: {
          ...state.error,
          balance: 'Failed to get balance information from Etherscan API'
        }
      }
    default:
      break
  }
}

export function EtherscanProvider ({ children }) {
  const [state, dispatch] = React.useReducer(
    logger(etherscanReducer),
    initialState
  )

  return (
    <EtherscanStateContext.Provider value={state}>
      <EtherscanDispatchContext.Provider value={dispatch}>
        {children}
      </EtherscanDispatchContext.Provider>
    </EtherscanStateContext.Provider>
  )
}

export function useEtherscanState () {
  const context = React.useContext(EtherscanStateContext)
  if (context === undefined) {
    throw new Error('useEtherscanState must be used within a etherscanProvider')
  }
  return context
}

export function useEtherscanDispatch () {
  const context = React.useContext(EtherscanDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useEtherscanDispatch must be used within a etherscanProvider'
    )
  }
  return context
}

export async function getAccountInfo (dispatch, address) {
  try {
    dispatch({ type: actions.GET_ETHSCAN_REQUEST })
    const newAddress = address ? address : '0xdf97e5F3446C5DE45D216e7D202F84d44b59703e'
    const url = new URL('https://api.etherscan.io/api')
    url.searchParams.append('module','account')
    url.searchParams.append('action','balance')
    url.searchParams.append('address',newAddress)
    url.searchParams.append('tag','latest')
    url.searchParams.append('apikey','BVFQGV541P13XRSMMBH2WP8CM3P3PDZG1U')
    console.log(url.href)
    

    const result = await getRequest(url)

    if (result.status === 200) {
      const data = await result.json()
      dispatch({ type: actions.GET_ETHSCAN_SUCCESS, payload: utils.formatEther(data.result) })
    } else {
      dispatch({ type: actions.GET_ETHSCAN_FAILURE })
    }
  } catch (err) {
    dispatch({
      type: actions.GET_ETHSCAN_FAILURE,
      payload: 'Failed to get balance information from Etherscan API'
    })
  }
}
