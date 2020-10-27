import React, {useState} from 'react';
import axios from 'axios';
import AutocompleteSuburb from './AutocompleteSuburb';
import AutocompleteLocation from './AutocompleteLocation';
import { Link } from 'react-router-dom';

const CreateCase = (props) => {
  
  const CREATE_CASE_URL = 'https://covid19tracker-ryan.herokuapp.com/cases/create';

  const admin = JSON.parse(localStorage.getItem('admin'));
  
  const [form, setForm] = useState({
    suburb: '',
    location: '',
    day: '',
    month: '',
    year: '',
    startTime: '',
    endTime: '',
    lat: '',
    lng: '',
    suburbs: []
  });
  
  const [validationErrors, setValidationErrors] = useState({
    blankField: '',
    dayFormat: '',
    yearFormat: '',
    timeFormat: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value
    });
  }; // handleChange
  
  const formValidation = (e) => {
    setValidationErrors({
      blankField: '',
      dayFormat: '',
      yearFormat: '',
      timeFormat: ''
    });
    const errors = {};
    let validation = true;
    if (form.suburb === '' || form.location === '' || form.day === '' || form.month === '' || form.year === '' || form.startTime === '' || form.endTime === '') {
      errors.blankField = 'Fields can"t be blank.';
      validation = false;
    }
    const dateRegex = /\b([1-9]|[12][0-9]|3[01])\b/;
    if (!dateRegex.test(form.day)) {
      errors.dayFormat = 'Invalid date field format.';
      validation = false;
    }
    const yearRegex = /\b^[2][0]\d{2}\b/;
    if (!yearRegex.test(form.year)) {
      errors.yearFormat = 'Invalid year field format.';
      validation = false;
    }
    const timeRegex = /\b(1[012]|[1-9]):[0-5][0-9](am|pm)$\b/;
    if (!timeRegex.test(form.startTime) || !timeRegex.test(form.endTime)) {
      errors.timeFormat = 'Invalid time field format.';
      validation = false;
    }
    if (!validation) {
      setValidationErrors(errors);
    }
    return validation;
  }; // formValidation
  
  const handleCreate = (e) => {
    e.preventDefault();
    console.log('Case create submitted');
    if (formValidation()) {
      axios.post(CREATE_CASE_URL, {
        suburb: form.suburb,
        location: form.location,
        day: form.day,
        month: form.month,
        year: form.year,
        startTime: form.startTime,
        endTime: form.endTime,
        lat: form.lat,
        lng: form.lng,
      })
      .then(res => {
        console.log(res.data);
        props.history.push(`/admin/profile/${admin._id}`);
      })
      .catch(err => console.log(err)); // axios post
    }
  }; // handleCreate
  
  const handleSelectSuburb = (suburb) => {
    setForm({...form, suburb: suburb});
  }; // handleSelectSuburb
  
  const handleSelectLocation = (location, lat, lng) => {
    setForm({...form, location: location, lat: lat, lng: lng});
  }; // handleSelectLocation
  
  return(
    <div className = "content">
      <h1>Create New Case</h1>
      <form>
        <label>Suburb:</label>
        <AutocompleteSuburb onSelectSuburb={handleSelectSuburb}/>
        <label>Location:</label>
        <AutocompleteLocation onSelectLocation={handleSelectLocation}/>
        <div className = "form_container">
          <div className = "form_container_item">
            <label>Day:</label>
            <input type="text" name="day" placeholder="e.g. 11" onChange={handleChange}/>
          </div>
          <div className = "form_container_item">
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
          </div>
          <div className = "form_container_item">
            <label>Year:</label>
            <input type="text" name="year" placeholder="e.g. 2020" onChange={handleChange}/>
          </div>
        </div>
        <div className="form_container">
          <div className = "form_container_item" >
            <label>Start Time:</label>
            <input type="text" name="startTime" placeholder="e.g. 11:00am" onChange={handleChange}/>
          </div>
            <div className = "form_container_item" >
            <label>End Time:</label>
            <input type="text" name="endTime" placeholder="e.g. 2:00pm" onChange={handleChange}/>
          </div>
        </div>
        <input type="Submit" class="button_primary" placeholder="Create" onClick={handleCreate} />
        <Link className="button_third" to={`/admin/profile/${admin._id}`}><p>Cancel</p></Link>
      </form>
      <div className="errorMessage">
        <p>{validationErrors.blankField}</p>
        <p>{validationErrors.dayFormat}</p>
        <p>{validationErrors.yearFormat}</p>
        <p>{validationErrors.timeFormat}</p>
      </div>
    </div>
  ); // return
}; // Cases

export default CreateCase;