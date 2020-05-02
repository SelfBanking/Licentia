import React from 'react'
import logger from 'use-reducer-logger'

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

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
  accountId: null,
  email: null,
  status: USER_STATUS.INIT,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  message: {
    checkAuth: null,
    signOut: null
  },
  error: {
    checkAuth: false
  }
}

const actions = {
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',

  CHECK_AUTH_REQUEST: 'CHECK_AUTH_REQUEST',
  CHECK_AUTH_SUCCESS: 'CHECK_AUTH_SUCCESS',
  CHECK_AUTH_FAILURE: 'CHECK_AUTH_FAILURE'
}

export function userReducer (state, action) {
  switch (action.type) {
    case actions.CHECK_AUTH_REQUEST:
      return {
        ...state,
        status: USER_STATUS.GETTING,
        accountId: null,
        error: {
          ...state.error,
          checkAuth: null
        }
      }
    case actions.CHECK_AUTH_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        accountId: action.payload,
        isAuthenticated: true,
        error: {
          ...state.error,
          checkAuth: null
        }
      }
    case actions.CHECK_AUTH_FAILURE:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        accountId: null,
        isAuthenticated: false,
        user: initialState.user,
        error: {
          ...state.error,
          checkAuth: action.payload
        }
      }
    case actions.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        status: USER_STATUS.GETTING,
        message: {
          ...state.message,
          signOut: 'Sign out successful.'
        }
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function UserProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development' ? logger(userReducer) : userReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export function useUserState () {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider')
  }
  return context
}

export function useUserDispatch () {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider')
  }
  return context
}

export async function checkAuth (dispatch, payload) {
  dispatch({ type: actions.CHECK_AUTH_REQUEST })
  try {
    const result = localStorage.getItem('accessToken')

    if (result === 'yes') {
      dispatch({ type: actions.CHECK_AUTH_SUCCESS, payload: '33' })
    } else {
      dispatch({ type: actions.CHECK_AUTH_FAILURE, payload: 'Unauthorized.' })
    }
  } catch (err) {
    dispatch({ type: actions.CHECK_AUTH_FAILURE, payload: 'Unauthorized.' })
  }
}

export function signOut (dispatch) {
  localStorage.removeItem('accessToken')
  dispatch({ type: actions.SIGN_OUT_SUCCESS })
}
