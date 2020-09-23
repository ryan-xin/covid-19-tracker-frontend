import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import axios from 'axios';
import '../map.css';
import Dashboard from './Dashboard';

const Home = (props) => {
  
  const CASE_DATA_URL = "https://disease.sh/v3/covid-19/countries";
  const COUNTRY_GEOJSON_URL = 'http://localhost:1337/countries';
  
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
  }, []);
  
  useEffect(() => {
    axios.get(COUNTRY_GEOJSON_URL)
    .then(res => {
      console.log(res.data);
      setCountries(res.data);
    })
    .catch(err => {
      console.log(err);
    }); // axios get    
  }, []);
  
  const getColor = (number) => {
    return number > 700000 ? '#3a0012' :
      number > 500000 ? '#520019' :
      number > 300000 ? '#6a0020' :
      number > 100000 ? '#800026' :
      number > 50000 ? '#BD0026' :
      number > 20000 ? '#E31A1C' :
      number > 10000 ? '#FC4E2A' :
      number > 5000 ? '#FD8D3C' :
      number > 2000 ? '#FEB24C' :
      number > 1000 ? '#FED976' :
      '#FFEDA0'; 
  };
  
  const style = (countryName) => {
    // console.log(countryCases[countryName]);
    if (countryCases[countryName]) {
      return {
        fillColor: getColor(countryCases[countryName].cases),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4
      };
    } else {
        return {
          fillColor: getColor(0),
          weight: 1,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.4
        };
    }
  };
  
  const handleMouseOver = (e) => {
    e.target.setStyle({
      weight: 3,
      fillOpacity: 0.6
    })
  };

  const handleMouseOut = (e) => {
    e.target.setStyle({
      weight: 1,
      fillOpacity: 0.4
    })
  };
  
  const handleClick = (e) => {
    console.log(e.sourceTarget.options.id);
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
  };
  
  const numberFormat = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div>
      {
      countryCases && 
      (<Map center={[0, 0]} zoom={3}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/ryanxin/ckfdup3bt0d5p19rtln7yawiw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicnlhbnhpbiIsImEiOiJja2ZkdTFhajQwNDh6MnRzaG51ZHFsenByIn0.eqvLzhrjtwg78imgHDi6SQ"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {/* {cases.map((c) => (
          <Marker
            key={c.name}
            position={[c.countryInfo.lat, c.countryInfo.long]}
          />
        ))} */}
        {countries.map((country) => {
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
      )
      }
      <div>
        <p><strong>Country: </strong>{currentCountry.name}</p>
        <p><strong>Cases: </strong>{currentCountry.cases}</p>
        <p><strong>Today Cases: </strong>{currentCountry.todayCases}</p>
        <p><strong>Deaths: </strong>{currentCountry.deaths}</p>
        <p><strong>Recovered: </strong>{currentCountry.recovered}</p>
        <p><strong>Active: </strong>{currentCountry.active}</p>
        <p><strong>Last Updated: </strong>{currentCountry.updated}</p>
      </div>
      <hr />
      <Dashboard />
    </div>
  ); // return
}; // Home

export default Home;