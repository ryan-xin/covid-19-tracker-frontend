import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const AdminProfile = (props) => {
  
  const ADMIN_CASES_URL = 'http://localhost:1337/admin/profile';
  
  const [admin, setAdmin] = useState({});
  const [adminCases, setAdminCases] = useState([]);
  
  useEffect(() => {
    axios.get(`${ADMIN_CASES_URL}/${props.match.params.adminId}`)
    .then(res => {
      console.log(res.data);
      setAdmin(res.data.admin);
      setAdminCases(res.data.cases);
    })
    .catch(err => console.log(err)); // axios get cases
  }, [adminCases.length]); // useEffect
  
  return(
    <div>
      <h1>Admin Profile</h1>
      <button><Link to={'/cases/create'}>Add Case</Link></button>
      <div className="container header">
        <div>Suburb</div>
        <div>Location</div>
        <div>Date</div>
        <div>Time</div>
      </div>
      {
        adminCases.reverse().map(c => {
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
  ); // return
}; // AdminProfile

export default AdminProfile;