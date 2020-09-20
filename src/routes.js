import React from 'react';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import UserLogin from './components/UserLogin';
import Footer from './components/Footer';


const Routes = (
  <Router>
    <div>
      {
      // If we create a route WITHOUT the 'exact' attribute, and we say path='/', then that component will appear on EVERY route, since every path includes a '/' somwwhere.
      }
      <Route path='/' component={Navigation} />
      <Route exact path='/' component={UserLogin} />
      <Route path='/' component={Footer} />
      {/* <Route exact path='/profile/:user' component={Profile} /> */}
    </div>
  </Router>
);

export default Routes;
