import React, { useReducer } from 'react'

const ContractsStateContext = React.createContext()
const ContractsDispatchContext = React.createContext()

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

const actions = {}

export function ratesReducer (state, action) {
  console.log('prevState: ', state)
  console.log('action: ', action)
  switch (action.type) {
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function ContractsProvider ({ children }) {
  const [state, dispatch] = useReducer(ratesReducer, initialState)

  return (
    <ContractsStateContext.Provider value={state}>
      <ContractsDispatchContext.Provider value={dispatch}>
        {children}
      </ContractsDispatchContext.Provider>
    </ContractsStateContext.Provider>
  )
}

export function useContractsState () {
  const context = React.useContext(ContractsStateContext)
  if (context === undefined) {
    throw new Error('useContractsState must be used within a ContractsProvider')
  }
  return context
}

export function useContractsDispatch () {
  const context = React.useContext(ContractsDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useContractsDispatch must be used within a ContractsProvider'
    )
  }
  return context
}

export async function getCtokenData (dispatch) {
  try {
  } catch (err) {}
}
