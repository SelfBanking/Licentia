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
    connectMetaMask: null,
    signOut: null
  },
  error: {
    checkAuth: false
  }
}

const actions = {
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',

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
          connectMetaMask: null
        }
      }
    case actions.CONNECT_METAMASK_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        activeUser: action.payload,
        error: {
          ...state.error,
          connectMetaMask: null
        }
      }

    case actions.CONNECT_METAMASK_FAILURE:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        activeUser: null,
        error: {
          ...state.error,
          connectMetaMask: action.payload
        }
      }
    case actions.SIGN_OUT_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.GETTING,
        activeUser: null,
        message: {
          ...state.message,
          signOut: 'Sign out successful.'
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
    await initalize()
    const user = await activeUser()

    if (web3Injected && user) {
      dispatch({ type: actions.CONNECT_METAMASK_SUCCESS, payload: user })
    } else {
      dispatch({
        type: actions.CONNECT_METAMASK_FAILURE,
        payload: 'Faled to connect Metamask.'
      })
      alert('Metamask is required.')
    }
  } catch (err) {
    dispatch({
      type: actions.CONNECT_METAMASK_FAILURE,
      payload: 'Failed to connect Metamask'
    })
  }
}

export function signOut (dispatch) {
  dispatch({ type: actions.SIGN_OUT_SUCCESS })
}
