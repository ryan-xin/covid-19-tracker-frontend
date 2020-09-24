import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmail } from 'validator';
import AutocompleteSuburb from './AutocompleteSuburb';

const UserSignup = (props) => {
  
  const USER_SIGNUP_URL = 'http://localhost:1337/user/signup';
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    suburb: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    blankField: '',
    email: '',
    password: '',
    passwordLength: '',
    existingEmail: ''
  });
  
  const handleChange = (e) => {
    const value = e.target.value;
    setForm({...form, [e.target.name]: value})
  };
  
  const handleSelectSuburb = (suburb) => {
    setForm({...form, suburb: suburb});
  }; // handleSelectSuburb  
  
  const formValidation = () => {
    setValidationErrors({
      blankField: '',
      email: '',
      password: '',
      passwordLength: '',
      existingEmail: ''
    });
    console.log('Signup Submitted');
    const errors = {};
    let validation = true;
    if (form.name === '' || form.email === '' || form.password === '' || form.suburb === '') {
      errors.blankField = 'Fields can"t be blank.';
      validation = false;
    }
    if (!isEmail(form.email)) {
      errors.email = 'Invalid email.';
      validation = false;
    }
    if (form.password.length < 6) {
      errors.passwordLength = 'Password must at least 6 characters.';
      validation = false;
    }
    if (form.password !== form.confirmPassword) {
      errors.password = 'Please make sure your passwords match.';
      validation = false;
    }
    if (!validation) {
      setValidationErrors(errors);
    } 
    return validation;
  }; // formValidation
   
  const handleSignup = (e) => {
    e.preventDefault();
    if (formValidation()) {
      axios.post(USER_SIGNUP_URL, {
        name: form.name,
        email: form.email,
        password: form.password,
        suburb: form.suburb
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
        console.dir(err);
        if (err.response.status === 401) {
          console.log(err.response.data.email);
          setValidationErrors({existingEmail: err.response.data.email});
        }
      }); // axios.post
    }
  }; // handleSignup
  
  return(
    <div className = "content" >
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
        <label>Suburb:</label>
        <AutocompleteSuburb onSelectSuburb={handleSelectSuburb}/>
        <input type="Submit" placeholder="Login" className="button_primary" onClick={handleSignup} />
      </form>
      <div className="errorMessage">
        <p>{validationErrors.blankField}</p>
        <p>{validationErrors.email}</p>
        <p>{validationErrors.password}</p>
        <p>{validationErrors.passwordLength}</p>
        <p>{validationErrors.existingEmail}</p>
      </div>
    </div>
  ) // return
}; // UserSignup

export default UserSignup