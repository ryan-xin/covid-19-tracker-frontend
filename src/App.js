import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import Cases from './components/Cases';
import CreateCase from './components/CreateCase';
import EditCase from './components/EditCase';
import AdminProfile from './components/AdminProfile';
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
          <nav>
            <Link to={'/home'}>Logo</Link>

            {currentUser || currentAdmin ? (
              <div>
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/cases'>Cases</Link></li>
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
          </nav>
          <Route exact path='/home' component={Home} />
          <Route exact path={['/', '/user/login']} component={UserLogin} />
          <Route exact path='/user/signup' component={UserSignup} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <Route exact path='/admin/profile/:adminId' component={AdminProfile} />
          <Route exact path='/cases' component={Cases} />
          <Route exact path='/cases/create' component={CreateCase} />
          <Route exact path='/cases/edit/:caseId' component={EditCase} />
          <div>
            <hr />
            <footer>
              { !currentAdmin && <div><Link to='/admin/login'>Admin Login</Link></div>
              }
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