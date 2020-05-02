import React from 'react'
import logger from 'use-reducer-logger'

const LoginStateContext = React.createContext()
const LoginDispatchContext = React.createContext()

export const LOGIN_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING'
}

const initialState = {
  accountId: null,
  email: null,
  status: LOGIN_STATUS.INIT,
  error: {
    checkAuth: false,
    login: false,
    signUp: false
  }
}

const actions = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE'
}

export function loginReducer (state, action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        status: LOGIN_STATUS.GETTING,
        message: {
          ...state.message,
          login: 'Logging in'
        },
        error: {
          ...state.error,
          login: null
        }
      }
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        status: LOGIN_STATUS.IDLE,
        message: {
          ...state.message,
          login: 'Login Successful.'
        },
        error: {
          ...state.error,
          login: null
        }
      }
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        status: LOGIN_STATUS.IDLE,
        message: {
          ...state.message,
          login: null
        },
        error: {
          ...state.error,
          login: action.payload
        }
      }
    case actions.SIGN_UP_REQUEST:
      return {
        ...state,
        status: LOGIN_STATUS.GETTING,
        message: {
          ...state.message,
          signUp: 'Signing up'
        },
        error: {
          ...state.error,
          signUp: null
        }
      }
    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        status: LOGIN_STATUS.IDLE,
        message: {
          ...state.message,
          signUp: 'Singup was successful.'
        },
        error: {
          ...state.error,
          signUp: null
        }
      }
    case actions.SIGN_UP_FAILURE:
      return {
        ...state,
        status: LOGIN_STATUS.IDLE,
        message: {
          ...state.message,
          signUp: null
        },
        error: {
          ...state.error,
          signUp: action.payload
        }
      }

    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function LoginProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development' ? logger(loginReducer) : loginReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <LoginStateContext.Provider value={state}>
      <LoginDispatchContext.Provider value={dispatch}>
        {children}
      </LoginDispatchContext.Provider>
    </LoginStateContext.Provider>
  )
}

export function useLoginState () {
  const context = React.useContext(LoginStateContext)
  if (context === undefined) {
    throw new Error('useLoginState must be used within a LoginProvider')
  }
  return context
}

export function useLoginDispatch () {
  const context = React.useContext(LoginDispatchContext)
  if (context === undefined) {
    throw new Error('useLoginDispatch must be used within a LoginProvider')
  }
  return context
}

export async function login (dispatch, payload) {
  dispatch({ type: actions.LOGIN_REQUEST })
  try {
    const result = await (() => true) // some kind of portis service

    if (result) {
      localStorage.setItem('accessToken', 'yes')
      dispatch({ type: actions.LOGIN_SUCCESS })
    } else {
      dispatch({ type: actions.LOGIN_FAILURE, payload: 'Login Failed' })
    }
  } catch (err) {
    dispatch({ type: actions.LOGIN_FAILURE, payload: 'Login failed.' })
  }
}
