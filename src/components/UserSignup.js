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
  
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [suburb, setSuburb] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  // const [blankFieldMessage, setBlankFieldMessage] = useState('');
  // const [emailValidationMessage, setEmailValidationMessage] = useState('');
  
  // const handleNameInput = (e) => {
  //   setName(e.target.value);
  // }; // handleNameInput
  
  // const handleEmailInput = (e) => {
  //   setEmail(e.target.value);
  // }; // handleEmailInput

  // const handlePasswordInput = (e) => {
  //   setPassword(e.target.value);
  // }; // handlePasswordInput

  // const handleConfirmPasswordInput = (e) => {
  //   setConfirmPassword(e.target.value);
  // }; // handleConfirmPasswordInput
  
  // const handleSuburbInput = (e) => {
  //   setSuburb(e.target.value);
  // }; // handleConfirmPasswordInput

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
      localStorage.setItem('user', JSON.stringify(res.data));
      props.history.push('/home');
      window.location.reload();
    })
    .catch(err => {console.log(err);}); // axios.post
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