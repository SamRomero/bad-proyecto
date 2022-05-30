import './App.css';
import React from 'react';

//import Profile from './components/Profile'

import Navbar from './components/Navbar';
import NavbarLogout from './components/NavbarLogout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Clinics from './components/pages/Clinics';
import Patients from './components/pages/Patients';
import Home from './components/pages/Home';
import Users from './components/pages/Users';
import Exams from './components/pages/Exams';
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';

import {useAuth0, User} from '@auth0/auth0-react'

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
            <Route path='/users' element={<Users/>} />
            <Route path='/patients' element={<Patients/>} />
            <Route path='/contact-us' element={<ContactUs/>} />
            <Route path='/sign-up' element={<SignUp/>} />
            <Route path='/clinics' element={<Clinics/>} />
            <Route path='/exams' element={<Exams/>} />
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
