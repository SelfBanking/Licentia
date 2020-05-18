import React, { useReducer } from 'react'
import { getRequest } from '../services/HttpRequest'
import logger from 'use-reducer-logger'

const CompoundContext = React.createContext()

export const COMPOUND_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING'
}

const initialState = {
  status: COMPOUND_STATUS.INIT,
  cTokens: [],
  message: {
    cTokens: null
  },
  error: {
    cTokens: null
  }
}

const actions = {
  GET_CTOKENS_REQUEST: 'GET_CTOKENS_REQUEST',
  GET_CTOKENS_SUCCESS: 'GET_CTOKENS_SUCCESS',
  GET_CTOKENS_FAILURE: 'GET_CTOKENS_FAILURE'
}

export function compoundReducer (state, action) {
  switch (action.type) {
    case actions.GET_CTOKENS_REQUEST:
      return {
        ...state,
        status: COMPOUND_STATUS.GETTING,
        cTokens: [],
        message: {
          cTokens: 'Requesting cToken data from Compound API'
        },
        error: {
          cToken: null
        }
      }

    case actions.GET_CTOKENS_SUCCESS:
      return {
        ...state,
        status: COMPOUND_STATUS.IDLE,
        cTokens: action.payload,
        message: {
          cTokens: 'Success'
        },
        error: {
          cToken: null
        }
      }

    case actions.GET_CTOKENS_FAILURE:
      return {
        ...state,
        status: COMPOUND_STATUS.IDLE,
        cTokens: [],
        message: {
          cTokens: null
        },
        error: {
          cTokens: 'Failed to get cTokens from Compound API'
        }
      }

    default:
      break
  }
}

export function useCompoundReducer () {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(compoundReducer)
      : compoundReducer
  const memoizedReducer = React.useCallback(thisReducer, [])
  return useReducer(memoizedReducer, initialState)
}

export function CompoundProvider ({ children }) {
  const { Provider } = CompoundContext
  const [state, dispatch] = useCompoundReducer()
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export function useCompoundState () {
  const { state } = React.useContext(CompoundContext)
  if (state === undefined) {
    throw new Error('useCompoundState must be used in a CompoundProvider')
  }
  return state
}

export function useCompoundDispatch () {
  const { dispatch } = React.useContext(CompoundContext)
  if (dispatch === undefined) {
    throw new Error('useCompoundState must be used in a CompoundProvider')
  }
  return dispatch
}

export async function getCtokens (dispatch) {
  try {
    dispatch({ type: actions.GET_CTOKENS_REQUEST })
    const url = 'https://api.compound.finance/api/v2/ctoken'
    const result = await getRequest(url)

    if (result.status === 200) {
      const data = await result.json()
      dispatch({ type: actions.GET_CTOKENS_SUCCESS, payload: data.cToken })
    } else {
      dispatch({ type: actions.GET_CTOKENS_FAILURE })
    }
  } catch (err) {
    dispatch({
      type: actions.GET_CTOKENS_FAILURE,
      payload: 'Failed to get cTokens from Compound API'
    })
  }
}
