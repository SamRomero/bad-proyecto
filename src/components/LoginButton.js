import {useAuth0} from '@auth0/auth0-react'
import './LoginButton.css';

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0()
     return (
        <button className='btn' onClick={() => loginWithRedirect() }>Login</button>
    )
}
export default LoginButton