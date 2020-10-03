import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

const AdminProfile = (props) => {
  
  const ADMIN_CASES_URL = 'https://covid19tracker-ryan.herokuapp.com/admin/profile';
  const CASES_DELETE_URL = 'https://covid19tracker-ryan.herokuapp.com/cases/delete';
  
  const [admin, setAdmin] = useState({});
  const [adminCases, setAdminCases] = useState([]);
  
  const handleDelete = (e) => {
    console.log('Delete case executed');
    console.log(e.target.id);
    console.log(admin._id);
    axios.post(CASES_DELETE_URL, {
      caseId: e.target.id,
      adminId: admin._id
    })
    .then(res => {
      console.log(res.data);
      setAdminCases(res.data.cases);
    })
    .catch(err => console.log(err)); // axios get cases
  }; // handleDelete
      
  useEffect(() => {
    axios.get(`${ADMIN_CASES_URL}/${props.match.params.adminId}`)
    .then(res => {
      console.log(res.data);
      setAdmin(res.data.admin);
      setAdminCases(res.data.cases);
    })
    .catch(err => console.log(err)); // axios get cases
  }, []); // useEffect
  
  return(
    <div className="admin_cases">
      <div className="admin_header">
        <h1>Admin Cases</h1>
        <Link className="button_secondary button_addcase" to={'/cases/create'}>Add Case</Link>
      </div>
      <div className="table header">
        <div>Suburb</div>
        <div>Location</div>
        <div>Date</div>
        <div>Time</div>
        <div></div>
        <div></div>
      </div>
      {
        adminCases.map(c => {
        return (
          <div key={c._id} className="table row">
            <div>{c.suburb}</div>
            <div>{c.location}</div>
            <div>{c.day} {c.month} {c.year}</div>
            <div>{c.startTime} - {c.endTime}</div>
            <Link className="button_third" to={`/cases/edit/${c._id}`}>Edit</Link>
            <div id={c._id} className="button_third" onClick={handleDelete}>Delete</div>
          </div>
        )})
      }
    </div>
  ); // return
}; // AdminProfile

export default AdminProfile;