import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  return(
    <Route {...rest} render={props => (
        localStorage.getItem('token') ?
        <Component {...props} />
        : <Redirect to="/user/login" />
    )} />    
  ); // return
}; // PrivateRoute

export default PrivateRoute;