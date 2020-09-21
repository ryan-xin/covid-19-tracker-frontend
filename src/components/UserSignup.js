import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmail } from 'validator';

const UserSignup = (props) => {
  
  const USER_SIGNUP_URL = 'http://localhost:1337/user/signup';
  
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    suburb: '',
    errorMessage: '',
    blankFieldMessage: '',
    emailValidationMessage: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  };
  
  const emailValidation = value => {
    if (isEmail(value)) {
      return true;
    } else {
      return false;
    }
  };
  
  const handleSignup = (e) => {
    e.preventDefault();
    setState({...state, blankFieldMessage: ''});
    setState({...state, emailValidationMessage: ''});
    setState({...state, errorMessage: ''});
    console.log('Signup Submitted');
    if (state.name === '' || state.email === '' || state.password === '' || state.suburb === '') {
      setState({...state, blankFieldMessage: 'Fields can"t be blank.'});
      return;
    }
    if (!emailValidation(state.email)) {
      setState({...state, emailValidationMessage: 'Invalid email.'});
      return;
    }
    if (state.password !== state.confirmPassword) {
      setState({...state, errorMessage: 'Please make sure your passwords match.'});
      return;
    }
    axios.post(USER_SIGNUP_URL, {
      name: state.name,
      email: state.email,
      password: state.password,
      suburb: state.suburb
    })
    .then(res => {
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      props.history.push('/home');
    })
    .catch(err => {
      console.dir(err);
      if (err.response.status === 401) {
        console.log(err.response.data.email);
        setState({...state, errorMessage: err.response.data.email});
      }
    }); // axios.post
  }; // handleSignup
  
  return(
    <div>
      <h1>User Signup</h1>
      <form>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} />
        <label>Email:</label>
        <input type="text" name="email" onChange={handleChange} />
        <label>Password:</label>
        <input type="text" name="password" onChange={handleChange}/>
        <label>Confirm Password:</label>
        <input type="text" name="confirmPassword" onChange={handleChange}/>
        {/* TODO: Sydney suburbs API */}
        <label>Suburb:</label>
        <input type="text" name="suburb" onChange={handleChange}/>
        <input type="Submit" placeholder="Login" onClick={handleSignup} />
      </form>
      <div className="errorMessage">
        <p>{state.errorMessage}</p>
        <p>{state.blankFieldMessage}</p>
        <p>{state.emailValidationMessage}</p>
      </div>
    </div>
  ) // return
}; // UserSignup

export default UserSignup