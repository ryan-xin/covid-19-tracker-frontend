import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import CreateCase from './components/CreateCase';
import Cases from './components/Cases';

const App = (props) => {
  
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentAdmin, setCurrentAdmin] = useState(undefined);

  const logout = (e) => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
  };
  
  useEffect(() => {
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
      <nav>
        <Link to={'/home'}>Logo</Link>

        {currentUser || currentAdmin ? (
          <div>
            <li><a href='/logout' onClick={logout}>Logout</a></li>
          </div>
        ) : (
          <div>
            <li><Link to={'/user/login'}>Login</Link></li>
            <li><Link to={'/user/signup'}>Sign Up</Link></li>
          </div>
        )}
      </nav>
      
      <div>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path={['/', '/user/login']} component={UserLogin} />
          <Route exact path='/user/signup' component={UserSignup} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <Route exact path='/cases' component={Cases} />
          <Route exact path='/cases/create' component={CreateCase} />
        </Switch>
      </div>
      
      <div>
        <hr />
        <footer>
          <Link to={'/admin/login'}>Admin Login</Link>
        </footer>
      </div>
      
    </div>
  )
}

export default App;