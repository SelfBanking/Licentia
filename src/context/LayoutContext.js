import React from 'react'
import logger from 'use-reducer-logger'

const LayoutContext = React.createContext()

const actions = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
}

const initialState = {
  isSidebarOpened: true
}

function layoutReducer (state, action) {
  switch (action.type) {
    case actions.TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpened: !state.isSidebarOpened }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export function useLayoutReducer () {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(layoutReducer)
      : layoutReducer
  const memoizedReducer = React.useCallback(thisReducer, [])
  return React.useReducer(memoizedReducer, initialState)
}

export function LayoutProvider ({ children }) {
  const { Provider } = LayoutContext
  const [state, dispatch] = useLayoutReducer()
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export function useLayoutState () {
  const { state } = React.useContext(LayoutContext)
  if (state === undefined) {
    throw new Error('useLayoutState must be used within a LayoutProvider')
  }
  return state
}

export function useLayoutDispatch () {
  const { dispatch } = React.useContext(LayoutContext)
  if (dispatch === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider')
  }
  return dispatch
}

export function toggleSidebar (dispatch) {
  dispatch({ type: actions.TOGGLE_SIDEBAR })
}
