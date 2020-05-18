import React from 'react'
import {
  web3Injected,
  initalize,
  activeUser
} from '../services/MetaMaskService'
import logger from 'use-reducer-logger'

const WalletContext = React.createContext()

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
  DISCONNECT_WALLET_SUCCESS: 'DISCONNECT_WALLET_SUCCESS',

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

export function useWalletReducer () {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(walletReducer)
      : walletReducer
  const memoizedReducer = React.useCallback(thisReducer, [])
  return React.useReducer(memoizedReducer, initialState)
}

export function WalletProvider ({ children }) {
  const { Provider } = WalletContext
  const [state, dispatch] = useWalletReducer()
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export function useWalletState () {
  const { state } = React.useContext(WalletContext)
  if (state === undefined) {
    throw new Error('useWalletState must be used within a WalletProvider')
  }
  return state
}

export function useWalletDispatch () {
  const { dispatch } = React.useContext(WalletContext)
  if (dispatch === undefined) {
    throw new Error('useWalletDispatch must be used within a WalletProvider')
  }
  return dispatch
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
      }, 300)
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
