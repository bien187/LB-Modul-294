import React from 'react';
import '../style.css';

const Login = () => (
  <div>
    <h1>Login Page</h1>
    <Link to="/countrylist">
      <button className = 'button-login'>Start</button>
    </Link>
    <footer>LB M294 - Ben Müller - API from: https://restcountries.com/</footer>
  </div>
);

export default Login;
