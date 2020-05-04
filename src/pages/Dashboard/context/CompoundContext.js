import React from 'react'
import logger from 'use-reducer-logger'
import { getRequest } from 'services/HttpRequest'

const CompoundStateContext = React.createContext()
const CompoundDispatchContext = React.createContext()

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
  cToken: null,
  message: {
    get: null
  },
  error: {
    get: false
  }
}

const actions = {
  DISCONNECT_WALLET_SUCCESS: 'SIGN_OUT_SUCCESS',

  GET_CTOKEN_DATA_REQUEST: 'GET_CTOKEN_DATA_REQUEST',
  GET_CTOKEN_DATA_SUCCESS: 'GET_CTOKEN_DATA_SUCCESS',
  GET_CTOKEN_DATA_FAILURE: 'GET_CTOKEN_DATA_FAILURE'
}

export function compoundReducer (state, action) {
  switch (action.type) {
    case actions.GET_CTOKEN_DATA_REQUEST:
      return {
        ...state,
        status: USER_STATUS.GETTING,
        cToken: null,
        error: {
          ...state.error,
          get: null
        }
      }
    case actions.GET_CTOKEN_DATA_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        cToken: action.paylaod.cToken,
        message: {
          ...state.message,
          get: action.payload.message
        },
        error: {
          ...state.error,
          get: null
        }
      }

    case actions.GET_CTOKEN_DATA_REQUEST:
      return {
        ...state,
        cToken: null,
        status: USER_STATUS.IDLE,
        error: {
          ...state.error,
          get: action.payload
        }
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function CompoundProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(compoundReducer)
      : compoundReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <CompoundStateContext.Provider value={state}>
      <CompoundDispatchContext.Provider value={dispatch}>
        {children}
      </CompoundDispatchContext.Provider>
    </CompoundStateContext.Provider>
  )
}

export function useCompoundState () {
  const context = React.useContext(CompoundStateContext)
  if (context === undefined) {
    throw new Error('useCompoundState must be used within a CompoundProvider')
  }
  return context
}

export function useCompoundDispatch () {
  const context = React.useContext(CompoundDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useCompoundDispatch must be used within a CompoundProvider'
    )
  }
  return context
}

export async function getCtokenData () {
  try {
    const result = await getRequest(
      'https://api.compound.finance/api/v2/ctoken'
    )

    if (result.status === 200) {
      const response = await result.json()
      dispatch({
        type: actions.GET_CTOKEN_DATA_SUCCESS,
        payload: response.cToken
      })
    } else {
      dispatch({
        type: actions.GET_CTOKEN_DATA_FAILURE,
        payload: 'Failed to get cToken data from Compound.'
      })
    }
  } catch (err) {
    dispatch({
      type: actions.GET_CTOKEN_DATA_FAILURE,
      payload: 'Failed to get cToken data from Compound.'
    })
  }
}
