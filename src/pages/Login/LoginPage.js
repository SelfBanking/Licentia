import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useLoginState, useLoginDispatch, login } from './LoginContext'
import {
  useUserDispatch,
  useUserState,
  checkAuth
} from '../../context/UserContext'

function Login (props) {
  const { address, handleInputChange, handleLogin } = useLoginLogic(props)
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type='string'
          placeholder='Wallet Address'
          onChange={handleInputChange}
        />
        <button type='submit'>Login</button>
      </form>

      <p>{address}</p>
    </div>
  )
}

function useLoginLogic (props) {
  const [address, setAddress] = useState()
  const loginDispatch = useLoginDispatch()
  const userDispatch = useUserDispatch()
  const { isAuthenticated } = useUserState()
  const { status: loginStatus, message, error } = useLoginState()

  if (isAuthenticated) {
    props.history.push('/')
  }

  useEffect(() => {
    if (loginStatus === 'IDLE') {
      checkAuth(userDispatch)
    }
  })

  const handleLogin = () => {
    login(loginDispatch, address)
  }

  const handleInputChange = event => {
    event.preventDefault()
    setAddress(event.target.value)
  }

  return { address, setAddress, handleInputChange, handleLogin, message, error }
}

export default withRouter(Login)
