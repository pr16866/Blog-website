import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {Auth0Provider} from '@auth0/auth0-react'

// domain="dev-wgart0ob.us.auth0.com"
//       clientId="PSulOR6hlw53NvnTLsUj6zmBtgHysXOw"
//       redirectUri={window.location.origin}


ReactDOM.render(
  
   <App/>

  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

