import React, { useState, useEffect } from 'react';

const ThankYou = (props) => {
  
  const closeThankYou = () => {
    props.onHandleThankYou();
  };
  
  return(
    <div className="thank_you">
      <div className="thank_you_wrapper">
        < h4 > To all healthcare workers who were on the frontlines of <br/> battling COVID - 19: </h4>
        <h1>Thank You to Our Heros!</h1>
        <h3>Thank you for the sacrifices you make, every day and especially during this pandemic. Your dedication, commitment and courage deserve our deepest gratitude and admiration. Your service to patients is saving countless lives and making thousands of differences. </h3>
        <button className="button_thankyou" onClick={closeThankYou}>Thank You!</button>
      </div>
    </div>
  )
}; // ThankYou

export default ThankYou