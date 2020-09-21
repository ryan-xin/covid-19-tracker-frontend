import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const Cases = (props) => {
  
  const ALL_CASES_URL = 'http://localhost:1337/cases';
  
  const [cases, setCases] = useState([]);
  
  useEffect(() => {
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
      <div className="container header">
        <div>Suburb</div>
        <div>Location</div>
        <div>Date</div>
        <div>Time</div>
      </div>
      {
        cases.reverse().map(c => {
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
