import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';

const Cases = (props) => {
  
  const [cases, setCases] = useState([]);
  
  const ALL_CASES_URL = 'http://localhost:1337/cases';
  
  useEffect(() => {
    console.log('Fetching cases', axios);
    axios.get(ALL_CASES_URL)
    .then(res => {
      console.log(res.data);
      setCases(res.data);
    })
    .catch(err => console.log(err)); // axios get cases
  }, [])
  
  return(
    <div>
      <h1>All New Cases</h1>
      <button><Link to={'/cases/create'}>Add Case</Link></button>
      <div className="container header">
        <div>Suburb</div>
        <div>Location</div>
        <div>Date</div>
        <div>Time</div>
      </div>
      {
        cases.map(c => {
        return (
          <div className="container result">
            <div>{c.suburb}</div>
            <div>{c.location}</div>
            <div>{c.day}</div>
            <div>{c.startTime}</div>
          </div>
        )})
      }
    </div>
  );
  
}; // Cases

export default Cases;
