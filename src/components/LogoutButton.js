import React from 'react'
import './LogoutButton.css';
import {useAuth0} from '@auth0/auth0-react'

const LogoutButton = () => {

    const {logout} = useAuth0 ()
    
  return (
    <button className='btn' onClick={() => logout()}>
        Logout
    </button>
  )
}

export default LogoutButton