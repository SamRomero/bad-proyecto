import './App.css';
import React from 'react';

//import Profile from './components/Profile'

import Navbar from './components/Navbar';
import NavbarLogout from './components/NavbarLogout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';
import Marketing from './components/pages/Marketing';
import Consulting from './components/pages/Consulting';
import Home from './components/pages/Home';

import {useAuth0} from '@auth0/auth0-react'

function App() {

  const {isAuthenticated, isLoading} = useAuth0()

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div className="App">
      {
        isAuthenticated ?
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/services' element={<Services/>} />
            <Route path='/products' element={<Products/>} />
            <Route path='/contact-us' element={<ContactUs/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/marketing' element={<Marketing/>} />
            <Route path='/consulting' element={<Consulting/>} />
          </Routes> 
        </Router>
        :
        <Router>
          <NavbarLogout/>
          <Routes>
            <Route path='/' exact element={<Home/>} />
          </Routes>
        </Router>
      }

    </div>
  );
}

export default App;
