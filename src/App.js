import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import AdminLogin from './components/AdminLogin';
import World from './components/World';
import Sydney from './components/Sydney';
import Cases from './components/Cases';
import CreateCase from './components/CreateCase';
import EditCase from './components/EditCase';
import AdminProfile from './components/AdminProfile';
import ThankYou from './components/ThankYou';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';

const App = (props) => {
  
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentAdmin, setCurrentAdmin] = useState(undefined);
  const [readyToRoute, setReadyToRoute] = useState(false);

  const logout = (e) => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      console.log('Use stored token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    // We have to wait for the axios header with the token to be set before any other components can load by the router, because other components might need authenticated request, so they will need the token to be in the header.
    setReadyToRoute(true);
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin) {
      setCurrentAdmin(admin);
    }
  }, []);
  
  return (
    <div>
      {
      readyToRoute && (
      <div>
        <Router>
          <div>
            <Link to={'/world'}><img src='/logo.svg' alt='logo' /></Link>
            {currentUser || currentAdmin ? (
              <div>
                <li><Link to='/world'>World</Link></li>
                <li><Link to='/sydney'>Sydney</Link></li>
                {
                  currentAdmin && <li><Link to={`/admin/profile/${currentAdmin._id}`}>Your Cases</Link></li>
                }
                <li><a href='/logout' onClick={logout}>Logout</a></li>
              </div>
            ) : (
              <div>
                <li><Link to='/user/login'>Login</Link></li>
                <li><Link to='/user/signup'>Sign Up</Link></li>
              </div>
            )}
          </div>
          <PrivateRoute exact path={['/', '/world']} component={World} />
          <PrivateRoute exact path='/sydney' component={Sydney} />
          <Route exact path='/user/login' component={UserLogin} />
          <Route exact path='/user/signup' component={UserSignup} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <PrivateRoute exact path='/admin/profile/:adminId' component={AdminProfile} />
          <PrivateRoute exact path='/cases' component={Cases} />
          <PrivateRoute exact path='/cases/create' component={CreateCase} />
          <PrivateRoute exact path='/cases/edit/:caseId' component={EditCase} />
          <Route exact path='/thankyoutoourheros' component={ThankYou} />
          <div>
            <hr />
            <footer>
              <ul>
                <li>Copyright &copy; 2020 GA-SEI 37 by Ryan Xin</li>
                <li><a target="_blank" href="https://www.linkedin.com/in/ryan-xin/">LinkedIn</a></li>
                <li><a target="_blank" href="https://github.com/ryan-xin/wdywt">GitHub</a></li>
                { !currentAdmin && <li><Link to='/admin/login'>Admin Login</Link></li>
                }
              </ul>
            </footer>
          </div>
        </Router>
      </div>
      )
      }
    </div>
  ) // return
}; // App

export default App;