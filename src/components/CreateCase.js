import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCase = (props) => {
  
  const CREATE_CASE_URL = 'http://localhost:1337/cases/create';

  const [state, setState] = useState({
    suburb: '',
    location: '',
    date: '',
    month: '',
    year: '',
    startTime: '',
    endTime: '',
    blankFieldMessage: '',
    fieldValidationMessage: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  };
  
  const formValidation = (e) => {
    setState({...state, blankFieldMessage: ''});
    setState({...state, fieldValidationMessage: ''});
    if (state.suburb === '' || state.location === '' || state.date === '' || state.month === '' || state.year === '' || state.startTime === '' || state.endTime === '') {
      setState({...state, blankFieldMessage: 'Fields can"t be blank.'});
      return false;
    }
    const dateRegex = /\b([1-9]|[12][0-9]|3[01])\b/;
    if (!dateRegex.test(state.date)) {
      setState({...state, fieldValidationMessage: 'Invalid date field.'});
      return false;
    }
    const yearRegex = /\b^[2][0]\d{2}\b/;
    if (!yearRegex.test(state.year)) {
      setState({...state, fieldValidationMessage: 'Invalid year field.'});
      return false;
    }
    const timeRegex = /\b(1[012]|[1-9]):[0-5][0-9](am|pm)$\b/;
    if (!timeRegex.test(state.startTime) || !timeRegex.test(state.endTime)) {
      setState({...state, fieldValidationMessage: 'Invalid time field.'});
      return false;
    }
    return true;
  };
  
  const handleCreate = (e) => {
    e.preventDefault();
    console.log('Case create submitted');
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (formValidation()) {
      axios.post(CREATE_CASE_URL, {
        suburb: state.suburb,
        location: state.location,
        date: state.date,
        month: state.month,
        year: state.year,
        startTime: state.startTime,
        endTime: state.endTime,
        adminID: admin.admin._id
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err)); // axios post
    }
  }; // handleCreate
  
  return(
    <div>
      <h1>Create New Case</h1>
      <form>
        <label>Suburb:</label>
        <input type="text" name="suburb" placeholder="e.g. Sydney" onChange={handleChange} />
        <label>Location:</label>
        <input type="text" name="location" placeholder="e.g. Shopping Mall" onChange={handleChange} />
        <label>Date:</label>
        <input type="text" name="date" placeholder="e.g. 11" onChange={handleChange}/>
        <label>Month:</label>
        <select type="text" name="month" placeholder="e.g. January" onChange={handleChange}>
          <option value="">Select...</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <label>Year:</label>
        <input type="text" name="year" placeholder="e.g. 2020" onChange={handleChange}/>
        <label>Start Time:</label>
        <input type="text" name="startTime" placeholder="e.g. 11:00am" onChange={handleChange}/>
        <label>End Time:</label>
        <input type="text" name="endTime" placeholder="e.g. 2:00pm" onChange={handleChange}/>
        <input type="Submit" placeholder="Create" onClick={handleCreate} />        
      </form>
      <div className="errorMessage">
        <p>{state.blankFieldMessage}</p>
        <p>{state.fieldValidationMessage}</p>
      </div>
    </div>
  ); // return
}; // Cases

export default CreateCase;