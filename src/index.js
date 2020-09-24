import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from "./App";
import * as serviceWorker from './serviceWorker';
import './css/index.css';
import './css/app.css';
import './css/form.css';
import './css/worldMap.css';
import './css/dashboard.css';
import './css/adminProfile.css';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
