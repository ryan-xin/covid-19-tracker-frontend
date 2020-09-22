import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import axios from 'axios';
import '../map.css';

const Home = (props) => {
  
  const CASE_DATA_URL = "https://corona.lmao.ninja/v2/countries";
  const COUNTRY_GEOJSON_URL = 'http://localhost:1337/countries';
  
  const [cases, setCases] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCases, setCountryCases] = useState(undefined);
  
  useEffect(() => {
    console.log('useEffect');
    axios.get(CASE_DATA_URL)
    .then(res => {
      console.log(res.data);
      setCases(res.data);
      let countryCasesPair = {};
      res.data.forEach((r) => {
        let key = r.country;
        countryCasesPair[key] = r.cases;
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
    return number > 100001 ? '#800026' :
      number > 50000 ? '#BD0026' :
      number > 20000 ? '#E31A1C' :
      number > 10000 ? '#FC4E2A' :
      number > 5000 ? '#FD8D3C' :
      number > 2000 ? '#FEB24C' :
      number > 1000 ? '#FED976' :
      '#FFEDA0'; 
  }
  
  const style = (countryName) => {
    console.log(countryCases[countryName]);
    return {
      fillColor: getColor(countryCases[countryName]),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.6
    };
  }
  
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
          return <GeoJSON key={country.properties.admin} data={country} style={style(country.properties.admin)}/>
        })}
      </Map>)
      }
    </div>
  ); // return
}; // Home

export default Home;