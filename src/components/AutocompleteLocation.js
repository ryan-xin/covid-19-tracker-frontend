import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import axios from 'axios';

// AIzaSyBjEpuJyAC9GNXxNkUK0YgathZrvdRjndk

const AutocompleteLocation = (props) => {
  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
    },
    debounce: 300,
  });
  
  const [preLocation, setPreLocation] = useState(undefined);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();
    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
    .then((results) => getLatLng(results[0]))
    .then(({ lat, lng }) => {
      console.log(description);
      console.log("Coordinates: ", { lat, lng });
      props.onSelectLocation(description, lat, lng);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
  };
  
  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

    return (
      <li key={id} onClick={handleSelect(suggestion)}>
        <strong>{main_text}</strong> <small>{secondary_text}</small>
      </li>
    );
  });

  const onClick = (e) => {
    setPreLocation('');
  }
  
  useEffect(() => {
    setPreLocation(props.preLocation);
  }, [props.preLocation])

  return (
    <div className="search">
      <input
        value={preLocation || value}
        onChange={handleInput}
        onClick={onClick}
        disabled={!ready}
        placeholder="e.g. Shopping Mall"
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}; // AutocompleteLocation

export default AutocompleteLocation;