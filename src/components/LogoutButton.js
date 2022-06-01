import React from 'react'
import './LogoutButton.css';
import {useAuth0} from '@auth0/auth0-react'

const LogoutButton = () => {

    const {logout} = useAuth0 ()
    
  return (
    <button className='btn btn-secondary' onClick={() => logout()}>Salir</button>
  )
}

export default LogoutButton