import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

import LogoutButton from './LogoutButton';


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

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
          
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/users' className='nav-links' onClick={closeMobileMenu}>
              Usuario
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/patients' className='nav-links' onClick={closeMobileMenu}>
              Pacientes
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='/clinics' className='nav-links' onClick={closeMobileMenu}>
              Clinicas
            </Link>
          </li>

          <li className='nav-item'
/*               onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave} */
              >
            <Link to='/exams-order' className='nav-links' onClick={closeMobileMenu}
            >
              Orden de Exámenes <i className='fas' />
            </Link>
            {/* {dropdown && <Dropdown />} */}
          </li>       
          
          <li> 
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Salir
            </Link>
            
          </li>
        </ul>
        <LogoutButton/>
      </nav>
    </>
  ); 
}

export default Navbar;


/* function Navbar() {
  return(
    <nav className='navbar'>
      <Link to='/' className='navbar-logo'>
        Clinica
      </Link>
    </nav>

  )
} */

 /* const Navbar = () => {
  return(
    <h1>Hola</h1>
  )
}  */