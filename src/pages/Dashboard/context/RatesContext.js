import React, { useReducer } from 'react'
import { getRequest } from '../../../services/HttpRequest'

const RatesStateContext = React.createContext()
const RatesDispatchContext = React.createContext()

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

export function ratesReducer (state, action) {
  console.log('prevState: ', state)
  console.log('action: ', action)
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
        cToken: action.payload,
        message: {
          ...state.message,
          get: action.payload.message
        },
        error: {
          ...state.error,
          get: null
        }
      }
    case actions.GET_CTOKEN_DATA_FAILURE:
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

export function RatesProvider ({ children }) {
  const [state, dispatch] = useReducer(ratesReducer, initialState)

  return (
    <RatesStateContext.Provider value={state}>
      <RatesDispatchContext.Provider value={dispatch}>
        {children}
      </RatesDispatchContext.Provider>
    </RatesStateContext.Provider>
  )
}

export function useRatesState () {
  const context = React.useContext(RatesStateContext)
  if (context === undefined) {
    throw new Error('useRatesState must be used within a RatesProvider')
  }
  return context
}

export function useRatesDispatch () {
  const context = React.useContext(RatesDispatchContext)
  if (context === undefined) {
    throw new Error('useRatesDispatch must be used within a RatesProvider')
  }
  return context
}

export async function getCtokenData (dispatch) {
  try {
    dispatch({ type: actions.GET_CTOKEN_DATA_REQUEST })
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
        payload: 'Failed to get cToken rates from Compound.'
      })
    }
  } catch (err) {
    dispatch({
      type: actions.GET_CTOKEN_DATA_FAILURE,
      payload: 'Failed to get cToken rates from Compound.'
    })
  }
}
