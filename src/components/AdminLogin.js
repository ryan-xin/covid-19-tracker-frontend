import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLogin = (props) => {
  const ADMIN_LOGIN_URL = 'http://localhost:1337/admin/login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }; // handleEmailInput
  
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }; // handlePasswordInput
  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login Submitted');
    axios.post(ADMIN_LOGIN_URL, {
      email: email,
      password: password
    })
    .then(res => {
      console.log(res.data);
      localStorage.setItem('admin', JSON.stringify(res.data.admin));
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      props.history.push('/cases');
    })
    .catch(err => {
      console.log(err);
      if (err.response.status === 401) {
        setErrorMessage('Invalid email and/or password.');
      }
    }); // axios.post
  }; // handleLogin
  
  return(
    <div>
      <h1>Admin Login</h1>
      <form>
        <label>Email:</label>
        <input type="text" onChange={handleEmailInput}/>
        <label>Password:</label>
        <input type="text" onChange={handlePasswordInput}/>
        <input type="Submit" placeholder="Login" onClick={handleLogin} />
      </form>
      <div className="errorMessage">
        <p>{errorMessage}</p>
      </div>
    </div>
  ) // return
  
}; //AdminLogin

export default AdminLogin;