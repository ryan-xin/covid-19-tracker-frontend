import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from './Autocomplete';

const EditCase = (props) => {
  
  const SINGLE_CASE_URL = 'http://localhost:1337/cases';
  const EDIT_CASE_URL = 'http://localhost:1337/cases/edit';

  const [state, setState] = useState({
    suburb: '',
    location: '',
    day: '',
    month: '',
    year: '',
    startTime: '',
    endTime: '',
    blankFieldMessage: '',
    fieldValidationMessage: '',
    suburbs: []
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }; // handleChange
  
  const formValidation = (e) => {
    setState({...state, blankFieldMessage: ''});
    setState({...state, fieldValidationMessage: ''});
    if (state.suburb === '' || state.location === '' || state.day === '' || state.month === '' || state.year === '' || state.startTime === '' || state.endTime === '') {
      setState({...state, blankFieldMessage: 'Fields can"t be blank.'});
      return false;
    }
    const dateRegex = /\b([1-9]|[12][0-9]|3[01])\b/;
    if (!dateRegex.test(state.day)) {
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
  
  const handleUpdate = (e) => {
    e.preventDefault();
    if (formValidation()) {
      axios.post(EDIT_CASE_URL, {
        suburb: state.suburb,
        location: state.location,
        day: state.day,
        month: state.month,
        year: state.year,
        startTime: state.startTime,
        endTime: state.endTime,
        caseId: props.match.params.caseId
      })
      .then(res => {
        console.log(res.data);
        const admin = JSON.parse(localStorage.getItem('admin'));
        props.history.push(`/admin/profile/${admin._id}`);
        // window.location.reload();
      })
      .catch(err => console.log(err)); // axios post
    }    
    console.log('Edit case executed');
  }; // handleUpdate

  const handleSelectSuburb = (suburb) => {
    setState({...state, suburb: suburb});
  }; // handleSelectSuburb
  
  useEffect(() => {
    console.log(props.match.params.caseId);
    axios.get(`${SINGLE_CASE_URL}/${props.match.params.caseId}`)
    .then(res => {
      console.log(res.data.singleCase);
      const currentCase = res.data.singleCase;
      setState({...state, 
        suburb: currentCase.suburb,
        location: currentCase.location,
        day: currentCase.day,
        month: currentCase.month,
        year: currentCase.year,
        startTime: currentCase.startTime,
        endTime: currentCase.endTime
      });      
    })
    .catch(err => console.log(err));
  }, []);
  
  return(
    <div>
      <h1>Edit Case</h1>
      <form>
        <label>Suburb:</label>
        <Autocomplete onSelectSuburb={handleSelectSuburb} preSuburb={state.suburb}/>
        <label>Location:</label>
        <input type="text" name="location" placeholder="e.g. Shopping Mall" onChange={handleChange} defaultValue={state.location} />
        <label>Day:</label>
        <input type="text" name="day" placeholder="e.g. 11" onChange={handleChange} defaultValue={state.day} />
        <label>Month:</label>
        <select type="text" name="month" value={state.month} placeholder="e.g. January" onChange={handleChange}>
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
        <input type="text" name="year" placeholder="e.g. 2020" onChange={handleChange} defaultValue={state.year} />
        <label>Start Time:</label>
        <input type="text" name="startTime" placeholder="e.g. 11:00am" onChange={handleChange} defaultValue={state.startTime} />
        <label>End Time:</label>
        <input type="text" name="endTime" placeholder="e.g. 2:00pm" onChange={handleChange} defaultValue={state.endTime} />
        <input type="Submit" placeholder="Create" onClick={handleUpdate} />        
      </form>
      <div className="errorMessage">
        <p>{state.blankFieldMessage}</p>
        <p>{state.fieldValidationMessage}</p>
      </div>
    </div>
  ); // return
  
}; // EditCase

export default EditCase;