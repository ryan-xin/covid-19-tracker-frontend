import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";

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
  }; // handleInput

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
  }; // handleSelect
  
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
  }); // renderSuggestions

  const onClick = (e) => {
    setPreLocation('');
  }; // onClick
  
  useEffect(() => {
    setPreLocation(props.preLocation);
  }, [props.preLocation]); // useEffect

  return (
    <div className="auto_wrapper">
      <div className="search">
        <input
          value={preLocation || value}
          onChange={handleInput}
          onClick={onClick}
          disabled={!ready}
          placeholder="e.g. Shopping Mall"
        />
      </div>
      {
        status === "OK" &&
        <div className="auto_list_outer">
          <div className="auto_list_inner">
            <ul>
              {renderSuggestions()}
            </ul>
          </div>
        </div>
      }
    </div>
  ); // return
}; // AutocompleteLocation

export default AutocompleteLocation;