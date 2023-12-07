import React from 'react';
import CountryList from './components/countrylist';
import Title from './components/title';
//App fügt alle Komponenten zusammen
const App = () => {
  return (
    <div>
      <Title /> {"Countries around the Globe"}
      <CountryList />
      <footer>
        LB M294 - Ben Müller - API from: https://restcountries.com/ 
      </footer> 
    </div>
  );
};

export default App;