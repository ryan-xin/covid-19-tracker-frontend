import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmail } from 'validator';

const UserSignup = (props) => {
  
  const USER_SIGNUP_URL = 'http://localhost:1337/user/signup';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [suburb, setSuburb] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [blankFieldMessage, setBlankFieldMessage] = useState('');
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  
  const handleNameInput = (e) => {
    setName(e.target.value);
  }; // handleNameInput
  
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  }; // handleEmailInput

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  }; // handlePasswordInput

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  }; // handleConfirmPasswordInput
  
  const handleSuburbInput = (e) => {
    setSuburb(e.target.value);
  }; // handleConfirmPasswordInput
  
  const emailValidation = value => {
    if (isEmail(value)) {
      return true;
    } else {
      return false;
    }
  };
  
  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setBlankFieldMessage('');
    setEmailValidationMessage('');
    console.log('Signup Submitted');
    if (name === '' || email === '' || password === '' || suburb === '') {
      setBlankFieldMessage('Fields can"t be blank.');
      return;
    }
    if (!emailValidation(email)) {
      setEmailValidationMessage('Invalid email.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Please make sure your passwords match.');
      return;
    }
    axios.post(USER_SIGNUP_URL, {
        name: name,
        email: email,
        password: password,
        suburb: suburb
    })
    .then(res => {
      console.log(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      props.history.push('/home');
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    }); // axios.post

  }; // handleSignup
  
  return(
    <div>
      <h1>User Signup</h1>
      <form>
        <label>Name:</label>
        <input type="text" onChange={handleNameInput} />
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmailInput} />
        <label>Password:</label>
        <input type="text" onChange={handlePasswordInput}/>
        <label>Confirm Password:</label>
        <input type="text" onChange={handleConfirmPasswordInput}/>
        {/* TODO: Sydney suburbs API */}
        <label>Suburb:</label>
        <input type="text" onChange={handleSuburbInput}/>
        <input type="Submit" placeholder="Login" onClick={handleSignup} />
      </form>
      <div className="errorMessage">
        <p>{errorMessage}</p>
        <p>{blankFieldMessage}</p>
        <p>{emailValidationMessage}</p>
      </div>
    </div>
  )
}; // UserSignup

export default UserSignup