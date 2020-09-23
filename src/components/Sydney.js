import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer, GeoJSON } from "react-leaflet";
import { Icon } from "leaflet";
import axios from 'axios';


const Sydney = (props) => {
  
  const ALL_CASES_URL = 'http://localhost:1337/cases';
  const SINGLE_CASE_URL = 'http://localhost:1337/cases';
  
  const [cases, setCases] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: -33.86785,
    lng: 151.20732
  })
  const [currentCase, setCurrentCase] = useState({
    suburb: '-',
    location: '-',
    day: '-',
    month: '-',
    year: '-',
    startTime: '-',
    endTime: '-',
  });
  
  const caseIcon = new Icon({
    iconUrl: "/caseIcon.svg",
    iconSize: [25, 25]
  });
  
  const handleClick = (e) => {
    console.log('Clicked');
    axios.get(`${SINGLE_CASE_URL}/${e.sourceTarget.options.id}`)
    .then(res => {
      console.log(res.data.singleCase);
      const receivedCase = res.data.singleCase;
      setCurrentCase({
        ...currentCase,
        suburb: receivedCase.suburb,
        location: receivedCase.location,
        day: receivedCase.day,
        month: receivedCase.month,
        year: receivedCase.year,
        startTime: receivedCase.startTime,
        endTime: receivedCase.endTime
      });
    })
    .catch(err => console.log(err));
  }; 
  
  useEffect(() => {
    axios.get(ALL_CASES_URL)
      .then(res => {
        console.log(res.data);
        setCases(res.data);
      })
      .catch(err => console.log(err)); // axios get cases
  }, [cases.length])
  
  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      }, console.log);
    }
  }, []);
  
  return(
    <div>
      <Map center={[currentLocation.lat, currentLocation.lng]} zoom={13}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/ryanxin/ckfdup3bt0d5p19rtln7yawiw/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicnlhbnhpbiIsImEiOiJja2ZkdTFhajQwNDh6MnRzaG51ZHFsenByIn0.eqvLzhrjtwg78imgHDi6SQ"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        {cases.map((c) => (
          <Marker
            key={c.location}
            position={[c.lat, c.lng]}
            icon={caseIcon}
            id = {c._id}
            onClick={handleClick}
          />
        ))}
        <Marker position={[currentLocation.lat, currentLocation.lng]} />
      </Map>
      <div>
        <p><strong>Suburb: </strong>{currentCase.suburb}</p>
        <p><strong>Location: </strong>{currentCase.location}</p>
        <p><strong>Date: </strong>{currentCase.day} {currentCase.month} {currentCase.year}</p>
        <p><strong>From </strong>{currentCase.startTime}<strong> to </strong>{currentCase.endTime}</p>
      </div>
    </div>
  )
}; // Sydney

export default Sydney;