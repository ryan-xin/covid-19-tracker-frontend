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
    <div>
      { showThankYou && <ThankYou />}
      <div>
        <div>
          <h5>Total Cases</h5>
          <h2>{world.cases}</h2>
        </div>
        <div>
          <h5>Today Cases</h5>
          <h2>{world.todayCases}</h2>
        </div>
        <div>
          <h5>Active Cases</h5>
          <h2>{world.active}</h2>
        </div>
        <div>
          <h5>Deaths</h5>
          <h2>{world.deaths}</h2>
        </div>
        <div>
          <h5>Recovered</h5>
          <h2>{world.recovered}</h2>
        </div>
        <div>
          <h5>Affected Countries</h5>
          <h2>{world.affectedCountries}</h2>
        </div>
        <div>
          <p><strong>Last Update: </strong>{world.updated}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;