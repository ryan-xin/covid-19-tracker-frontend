import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThankYou from './ThankYou';

const Dashboard = (props) => {
  
  const WORLD_CASE_DATA_URL = "https://disease.sh/v3/covid-19/all";
  
  const [world, setWorld] = useState({
    cases: '-',
    todayCases: '-',
    active: '-',
    deaths: '-',
    recovered: '-',
    affectedCountries: '-',
    updated: '-'
  });
  
  const [showThankYou, setShowThankYou] = useState(false);
  // const [showThankYou, setShowThankYou] = useState(true);
  
  useEffect(() => {
    axios.get(WORLD_CASE_DATA_URL)
    .then(res => {
      console.log(res.data);
      if (res.data.cases === 0) {
        setShowThankYou(true);
      }
      setWorld({
        cases: numberFormat(res.data.cases),
        todayCases: numberFormat(res.data.todayCases),
        active: numberFormat(res.data.active),
        deaths: numberFormat(res.data.deaths),
        recovered: numberFormat(res.data.recovered),
        affectedCountries: numberFormat(res.data.affectedCountries),
        updated: new Date(res.data.updated).toLocaleString()
      });
    })
    .catch(err => {
      console.log(err);
    })
  }, []);
  
  const numberFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return(
    <div className="dashboard">
      { showThankYou && <ThankYou />}
      {/* <div className="dashboard_wrapper"> */}
      <div className="flex-container">
        <div className="flex-item">
          <h4>Total Cases</h4>
          <h1>{world.cases}</h1>
        </div>
        <div className = "flex-item">
          <h4>Today Cases</h4>
          <h1>{world.todayCases}</h1>
        </div>
        <div className = "flex-item">
          <h4>Active Cases</h4>
          <h1>{world.active}</h1>
        </div>
      </div>
      <div className="flex-container">
        <div className = "flex-item" >
          <h4>Deaths</h4>
          <h1>{world.deaths}</h1>
        </div>
        <div className = "flex-item" >
          <h4>Recovered</h4>
          <h1>{world.recovered}</h1>
        </div>
        <div className = "flex-item" >
          <h4>Affected Countries</h4>
          <h1>{world.affectedCountries}</h1>
        </div>
      </div>
      <div className="update_time">
        <p><strong>Last Update: </strong>{world.updated}</p>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Dashboard;