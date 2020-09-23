import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const AdminProfile = (props) => {
  
  const ADMIN_CASES_URL = 'http://localhost:1337/admin/profile';
  const CASES_DELETE_URL = 'http://localhost:1337/cases/delete';
  
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
    <div>
      <h1>Admin Cases</h1>
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
          <div key={c._id} className="container result">
            <div>{c.suburb}</div>
            <div>{c.location}</div>
            <div>{c.day}</div>
            <div>{c.startTime}</div>
            <div></div>
            <Link to={`/cases/edit/${c._id}`}>Edit</Link>
            <div id={c._id} onClick={handleDelete}>Delete</div>
          </div>
        )})
      }
    </div>
  ); // return
}; // AdminProfile

export default AdminProfile;