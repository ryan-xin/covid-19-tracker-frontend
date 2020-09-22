import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Autocomplete = (props) => {
  
  const ALL_SUBURBS_URL = 'http://localhost:1337/suburbs';
  
  const [suburbs, setSuburbs] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [preSuburb, setPreSuburb] = useState(undefined);
  
  const handleChange = (e) => {
    console.log('onChanges');
    const userInput = e.target.value;
    const filteredOptions = suburbs.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setUserInput(userInput);
    setFilteredOptions(filteredOptions);
    setShowOptions(true);
  };

  const handleClick = (e) => {
    setUserInput(e.target.innerText);
    props.onSelectSuburb(e.target.innerText);
    setFilteredOptions([]);
    setShowOptions(false);
  };
  
  const onClick = (e) => {
    setPreSuburb('');
  }

  useEffect(() => {
    setPreSuburb(props.preSuburb);
  }, [props.preSuburb])

  useEffect(() => {
    axios.get(ALL_SUBURBS_URL)
    .then(res => {
      console.log(res.data);
      setSuburbs(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <ul className="options">
          {filteredOptions.map((optionName, index) => {
            return (
              <li key={optionName} onClick={handleClick}>
                {optionName}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className="no-options">
          <em>No Option!</em>
        </div>
      );
    }
  }    
    
  return(
    <React.Fragment>
      <div className="search">
        <input type="text" className="search-box" onChange={handleChange} onClick={onClick} value={preSuburb || userInput}/>
      </div>
      {optionList}
    </React.Fragment>
  );
}; // class Autocomplete

Autocomplete.propTypes = {
  options: PropTypes.instanceOf(Array)
};

export default Autocomplete;