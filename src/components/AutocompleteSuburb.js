import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AutocompleteSuburb = (props) => {
  
  const ALL_SUBURBS_URL = 'https://covid19tracker-ryan.herokuapp.com/suburbs';
  
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
  }; // handleChange

  const handleClick = (e) => {
    setUserInput(e.target.innerText);
    props.onSelectSuburb(e.target.innerText);
    setFilteredOptions([]);
    setShowOptions(false);
  }; // handleClick
  
  const onClick = (e) => {
    setPreSuburb('');
  }; // onClick

  useEffect(() => {
    setPreSuburb(props.preSuburb);
  }, [props.preSuburb]); // useEffect

  useEffect(() => {
    axios.get(ALL_SUBURBS_URL)
    .then(res => {
      console.log(res.data);
      setSuburbs(res.data);
    })
    .catch(err => console.log(err));
  }, []); // useEffect
  
  let optionList;
  if (showOptions && userInput) {
    if (filteredOptions.length) {
      optionList = (
        <div className="auto_list_outer">
          <div className="auto_list_inner">
            <ul className="options">
              {filteredOptions.map((optionName, index) => {
                return (
                  <li key={optionName} onClick={handleClick}>
                    {optionName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    } else {
      optionList = (
        <div className = "errorMessage">
          <p>No Option!</p>
        </div>
      );
    }
  }    
    
  return(
    <div className="auto_wrapper">
      <div className="search">
        <input type="text" className="search-box" onChange={handleChange} onClick={onClick} value={preSuburb || userInput}/>
      </div>
      {optionList}
    </div>
  ); // return
}; // class Autocomplete

export default AutocompleteSuburb;