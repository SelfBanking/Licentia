import React from 'react'
import { withRouter } from 'react-router-dom'
import { signOut, useUserDispatch } from '../../context/UserContext'

function Dashboard (props) {
  const { handleSignOut } = useDashboardLogic()

  return (
    <div>
      <p>This is the dashboard.</p>
      <p>
        <button onClick={handleSignOut}>SIGN OUT</button>
      </p>
    </div>
  )
}

function useDashboardLogic () {
  const userDispatch = useUserDispatch()
  const handleSignOut = () => signOut(userDispatch)

  return { handleSignOut }
}

export default withRouter(Dashboard)
