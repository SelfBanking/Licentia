import React from 'react'
import { getRequest } from '../services/HttpRequest'

const CompoundStateContext = React.createContext()
const CompoundDispatchContext = React.createContext()

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
  console.log('STATE: ', state)
  console.log('ACTION: ', action)
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
          ...state.error,
          cToken: null
        }
      }
  }
}

export function CompoundProvider ({ children }) {
  const [state, dispatch] = React.useReducer(compoundReducer, initialState)

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

export async function getCtokens (dispatch) {
  try {
    dispatch({ type: actions.GET_CTOKENS_REQUEST })
    const result = await getRequest(
      'https://api.compound.finance/api/v2/ctoken'
    )

    if (result.status === 200) {
      const data = await result.json()
      dispatch({ type: actions.GET_CTOKENS_SUCCESS, payload: data.cToken })
    } else {
      dispatch({
        type: actions.GET_CTOKENS_FAILURE,
        payload: 'Request failed.'
      })
    }
  } catch (err) {
    dispatch({
      type: actions.GET_CTOKENS_FAILURE,
      payload: 'Failed to get cTokens from Compound API'
    })
  }
}
