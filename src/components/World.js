import React, { useState, useEffect } from 'react';
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import axios from 'axios';
import Dashboard from './Dashboard';

const World = (props) => {
  
  const CASE_DATA_URL = "https://disease.sh/v3/covid-19/countries";
  const COUNTRY_GEOJSON_URL = 'https://covid19tracker-ryan.herokuapp.com/countries';
  
  const [cases, setCases] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCases, setCountryCases] = useState(undefined);
  const [currentCountry, setCurrentCountry] = useState({
    name: '-',
    cases: '-',
    todayCases: '-',
    deaths: '-',
    recovered: '-',
    active: '-',
    updated: '-'
  });
  
  useEffect(() => {
    console.log('useEffect');
    axios.get(CASE_DATA_URL)
    .then(res => {
      console.log(res.data);
      setCases(res.data);
      // Create an object to store country data, key is the country name, don't need to loop through the whole data
      let countryCasesPair = {};
      res.data.forEach((r) => {
        let key = r.country;
        countryCasesPair[key] = {};
        countryCasesPair[key].cases = r.cases;
        countryCasesPair[key].todayCases = r.todayCases;
        countryCasesPair[key].deaths = r.deaths;
        countryCasesPair[key].recovered = r.recovered;
        countryCasesPair[key].active = r.active;
        countryCasesPair[key].updated = r.updated;
      });
      setCountryCases(countryCasesPair);
    })
    .catch(err => {
      console.log(err);
    }); // axios get
  }, []); // useEffect
  
  useEffect(() => {
    axios.get(COUNTRY_GEOJSON_URL)
    .then(res => {
      console.log(res.data);
      setCountries(res.data);
    })
    .catch(err => {
      console.log(err);
    }); // axios get    
  }, []); // useEffect
  
  const getColor = (number) => {
    return number > 700000 ? '#4E1504' :
      number > 500000 ? '#7F270C' :
      number > 300000 ? '#B33A15' :
      number > 100000 ? '#E54C1E' :
      number > 50000 ? '#FF5F1D' :
      number > 20000 ? '#FF7014' :
      number > 10000 ? '#FE8209' :
      number > 5000 ? '#FE9003' :
      number > 2000 ? '#FEB351' :
      number > 1000 ? '#FECB88' :
      '#FFECD3';
  }; // getColor
  
  const style = (countryName) => {
    // Two different apis some country name doesn't match, if don't find the country name show data unavailable.
    if (countryCases[countryName]) {
      return {
        fillColor: getColor(countryCases[countryName].cases),
        weight: 1,
        opacity: 0.6,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
      };
    } else {
      return {
        fillColor: getColor(0),
        weight: 1,
        opacity: 0.6,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
      };
    }
  }; // style
  
  const handleMouseOver = (e) => {
    e.target.setStyle({
      weight: 2,
      fillOpacity: 0.6
    })
  }; // handleMouseOver

  const handleMouseOut = (e) => {
    e.target.setStyle({
      weight: 1,
      fillOpacity: 0.5
    })
  }; // handleMouseOut
  
  const handleClick = (e) => {
    console.log(e.sourceTarget.options.id);
    // As it's a library no target.id. Google doc -> 'sourceTarget.option.id'
    const countryName = e.sourceTarget.options.id;
    if (countryCases[countryName]) {
      setCurrentCountry({
        name: countryName,
        cases: numberFormat(countryCases[countryName].cases),
        todayCases: numberFormat(countryCases[countryName].todayCases),
        deaths: numberFormat(countryCases[countryName].deaths),
        recovered: numberFormat(countryCases[countryName].recovered),
        active: numberFormat(countryCases[countryName].active),
        updated: new Date(countryCases[countryName].updated).toLocaleString()
      });
    } else {
      setCurrentCountry({
        name: countryName,
        cases: 'Date unavailable',
        todayCases: 'Date unavailable',
        deaths: 'Date unavailable',
        recovered: 'Date unavailable',
        active: 'Date unavailable',
        updated: 'Date unavailable'
      });
    }
  }; // handleClick
  
  const numberFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }; // numberFormat
  
  return (
    <div>
    <div className="map_container">
      <Map center={[15, 25]} zoom={3}>
        <TileLayer
          url = "https://api.mapbox.com/styles/v1/ryanxin/ckfdup3bt0d5p19rtln7yawiw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicnlhbnhpbiIsImEiOiJja2ZkdTFhajQwNDh6MnRzaG51ZHFsenByIn0.eqvLzhrjtwg78imgHDi6SQ"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {
          countryCases && countries.map((country) => {
          return <GeoJSON 
            key={country.properties.admin} 
            id={country.properties.admin} 
            data={country} 
            style={style(country.properties.admin)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleClick}
          />
        })}
      </Map>
      <div className="stats_panel">
        <p>Country:</p>
        <h4>{currentCountry.name}</h4>
        <p>Cases:</p>
        <h4>{currentCountry.cases}</h4>
        <p>Today Cases:</p>
        <h4>{currentCountry.todayCases}</h4>
        <p>Deaths:</p>
        <h4>{currentCountry.deaths}</h4>
        <p>Recovered:</p>
        <h4>{currentCountry.recovered}</h4>
        <p>Active:</p>
        <h4>{currentCountry.active}</h4>
        <p>Last Updated:</p>
        <h4>{currentCountry.updated}</h4>
      </div>
      <Dashboard />
      </div>
    </div>
  ); // return
}; // Home

export default World;
