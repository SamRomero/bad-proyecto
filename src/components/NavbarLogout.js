import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


import LoginButton from './LoginButton';

function NavbarLogout() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          LABCES
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
        </ul>
        <LoginButton/>
      </nav>
    </>
  ); 
}

export default NavbarLogout;