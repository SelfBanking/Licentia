import React from 'react'
import logger from 'use-reducer-logger'
import {
  web3Injected,
  initalize,
  activeUser
} from '../services/MetaMaskService'

const WalletStateContext = React.createContext()
const WalletDispatchContext = React.createContext()

// fetch status:
// INIT is when the component first loads.
// IDLE is after a failed or successful fetch, and
// component is idle
// GETTING is during a request

export const USER_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING'
}

const initialState = {
  status: USER_STATUS.INIT,
  web3Injected,
  message: {
    metamask: null
  },
  error: {
    metamask: false
  }
}

const actions = {
  DISCONNECT_WALLET_SUCCESS: 'SIGN_OUT_SUCCESS',

  CONNECT_METAMASK_REQUEST: 'CONNECT_METAMASK_REQUEST',
  CONNECT_METAMASK_SUCCESS: 'CONNECT_METAMASK_SUCCESS',
  CONNECT_METAMASK_FAILURE: 'CONNECT_METAMASK_FAILURE'
}

export function walletReducer (state, action) {
  switch (action.type) {
    case actions.CONNECT_METAMASK_REQUEST:
      return {
        ...state,
        status: USER_STATUS.GETTING,
        activeUser: null,
        error: {
          ...state.error,
          metamask: null
        }
      }
    case actions.CONNECT_METAMASK_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        activeUser: action.payload.account,
        message: {
          ...state.message,
          metamask: action.payload.message
        },
        error: {
          ...state.error,
          metamask: null
        }
      }

    case actions.CONNECT_METAMASK_FAILURE:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        activeUser: null,
        error: {
          ...state.error,
          metamask: action.payload
        }
      }
    case actions.DISCONNECT_WALLET_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        activeUser: null,
        message: {
          ...state.message,
          metamask: 'Successfully disconnected wallet.'
        }
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function WalletProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(walletReducer)
      : walletReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <WalletStateContext.Provider value={state}>
      <WalletDispatchContext.Provider value={dispatch}>
        {children}
      </WalletDispatchContext.Provider>
    </WalletStateContext.Provider>
  )
}

export function useWalletState () {
  const context = React.useContext(WalletStateContext)
  if (context === undefined) {
    throw new Error('useWalletState must be used within a WalletProvider')
  }
  return context
}

export function useWalletDispatch () {
  const context = React.useContext(WalletDispatchContext)
  if (context === undefined) {
    throw new Error('useWalletDispatch must be used within a WalletProvider')
  }
  return context
}

export async function connectMetamask (dispatch) {
  dispatch({ type: actions.CONNECT_METAMASK_REQUEST })
  try {
    const initMM = await initalize()

    if (!window.ethereum) {
      alert('Metamask is required.')

      return dispatch({
        type: actions.CONNECT_METAMASK_FAILURE,
        payload: 'Mestamask is required.'
      })
    }

    if (initMM) {
      setTimeout(async () => {
        const user = await activeUser()

        dispatch({
          type: actions.CONNECT_METAMASK_SUCCESS,
          payload: {
            account: user,
            message: 'Succcessfully connected to wallet.'
          }
        })
      }, 1000)
    }

    if (!web3Injected && !initMM) {
      dispatch({
        type: actions.CONNECT_METAMASK_FAILURE,
        payload: 'Failed to connect Metamask.'
      })
    }
  } catch (err) {
    dispatch({
      type: actions.CONNECT_METAMASK_FAILURE,
      payload: 'Failed to connect Metamask'
    })
  }
}

export function disconnectWallet (dispatch) {
  dispatch({
    type: actions.DISCONNECT_WALLET_SUCCESS,
    payload: { message: 'Successfully disconnected wallet.' }
  })
}
