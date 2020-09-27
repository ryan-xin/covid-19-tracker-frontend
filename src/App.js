import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import AdminLogin from './components/AdminLogin';
import World from './components/World';
import Sydney from './components/Sydney';
import CreateCase from './components/CreateCase';
import EditCase from './components/EditCase';
import AdminProfile from './components/AdminProfile';
import ThankYou from './components/ThankYou';
import PrivateRoute from './components/PrivateRoute';

const App = (props) => {
  
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentAdmin, setCurrentAdmin] = useState(undefined);
  const [readyToRoute, setReadyToRoute] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [newCase, setNewCase] = useState('');
  const history = useHistory();
  
  const logout = (e) => {
    setCurrentUser(undefined);
    setCurrentAdmin(undefined);
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    history.push('/user/login');
  };
  
  const hideNotification = (e) => {
    setHasNotification(false);
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
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
    
    // TODO: make connection when logged in
    const socket = io('http://localhost:1337');
    socket.on('connect', () => {
      console.log('Websocket connection established!');
    }); // on socket connect    

    socket.on('notification', data => {
      setHasNotification(true);
      setNewCase(data.case);
    }); // socket listen to 'notification' channel to show notification
  }, []); // useEffect()
  
  return (
    <div>
      {
      readyToRoute && (
      <div className="main_wrapper">
        <Router>
          <nav>
            <div className="nav_wrapper">
              <div className="nav_left">
                <Link to={'/world'}><img src='./logo.svg' alt='logo' className="logo" /></Link>
              </div>
              <div className="nav_right">
              <ul>
              {currentUser || currentAdmin ? (
                <div>
                  <li><Link to='/world'>World Cases</Link></li>
                  <li><Link to='/sydney'>Nearby Cases</Link></li>
                  {
                    currentAdmin && <li><Link to={`/admin/profile/${currentAdmin._id}`}>Your Cases</Link></li>
                  }
                  <li><a onClick={logout}>Logout</a></li>
                </div>
              ) : (
                <div>
                  <li><Link to='/user/login'>Login</Link></li>
                  <li><Link to='/user/signup'>Sign Up</Link></li>
                </div>
              )}
              </ul>
              </div>
            </div>
          </nav>
          <PrivateRoute exact path={['/', '/world']} component={World} />
          <PrivateRoute exact path='/sydney' component={Sydney} />
          <Route exact path='/user/login' component={UserLogin} />
          <Route exact path='/user/signup' component={UserSignup} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <PrivateRoute exact path='/admin/profile/:adminId' component={AdminProfile} />
          <PrivateRoute exact path='/cases/create' component={CreateCase} />
          <PrivateRoute exact path='/cases/edit/:caseId' component={EditCase} />
          <Route exact path='/thankyoutoourheros' component={ThankYou} />
          <footer>
            <div className="footer_wrapper">
              <div className="footer_left">
              <ul>
              <li>Copyright &copy; 2020 GA-SEI 37 by Ryan Xin</li>
              <li><a target="_blank" href="https://www.linkedin.com/in/ryan-xin/">LinkedIn</a></li>
              <li><a target="_blank" href="https://github.com/ryan-xin">GitHub</a></li>
              </ul>
              </div>
              <div className="footer_right">
              { !currentAdmin && <p><Link to='/admin/login'>Admin Login</Link></p>
              }
              </div>
            </div>
          </footer>
          {(hasNotification && currentUser) && 
            <div className="notification" >
              <h3>New Case Alert</h3>
              <p><strong>Suburb: </strong></p>
              <h4>{newCase.suburb}</h4>
              <p><strong>Location: </strong></p>
              <h4>{newCase.location}</h4>
              <p><strong>Date: </strong></p>
              <h4>{newCase.day} {newCase.month} {newCase.year}</h4>
              <p><strong>Time: </strong></p>
              <h4>From {newCase.startTime} to {newCase.endTime}</h4>
              <span className="button_fourth" onClick={hideNotification}>Got it.</span>
            </div>
          }
        </Router>
      </div>
      )
      }
    </div>  
  ) // return
}; // App

export default App;