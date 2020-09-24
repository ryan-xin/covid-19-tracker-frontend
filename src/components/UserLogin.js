import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLogin = (props) => {
  
  const USER_LOGIN_URL = 'http://localhost:1337/user/login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }; // handleEmailInput
  
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }; // handlePasswordInput
  
  const logout = (e) => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    logout();
    console.log('Login Submitted');
    axios.post(USER_LOGIN_URL, {
      email: email,
      password: password
    })
    .then(res => {
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      props.history.push('/world');
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      if (err.response.status === 401) {
        setErrorMessage('Invalid email and/or password.');
      }
    }); // axios.post
  }; // handleLogin
  
  return(
    <div className="content">
      <h1>User Login</h1>
      <form>
        <label>Email:</label>
        <input type="text" onChange={handleEmailInput}/>
        <label>Password:</label>
        <input type="text" onChange={handlePasswordInput}/>
        <input type="Submit" placeholder="Login" className="button_primary" onClick={handleLogin} />
      </form>
      <div className="errorMessage">
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}; // UserLogin

export default UserLogin;