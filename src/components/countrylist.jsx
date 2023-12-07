import React, { useState } from 'react';
import '../style.css';
//CountryList ist die Hauptseite

function CountrySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const filteredResults = data.filter(country =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
        setSearchPerformed(true);
      });
  };

  const handleRandomSearch = () => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        const randomCountry = data[Math.floor(Math.random() * data.length)];
        setResults([randomCountry]);
        setSearchPerformed(true);
      });
  };

  return (
    <div className="body">
      <div className="background"></div>
      <div id="search-container">
        <input
          type="text"
          id="country-search"
          placeholder="Enter Country..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <button className="button-search" onClick={handleSearch}>
          Search
        </button>
        <button className="button-random" onClick={handleRandomSearch}>
          Random Country
        </button>
      </div>
      <div id="results-container"> {/* Neuer Container */}
        <div id="results">
          {searchPerformed && results.length === 0 ? (
            <div className='error-container'>
              <p className='errorline'>No Country found</p>
              <img src={process.env.PUBLIC_URL + '/assets/img/false-2061131_640.png'} alt="" />
            </div>
          ) : (
            results.map(country => (
              <div key={country.name.common} className="country-info">
                <h2>{country.name.common}</h2>
                <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'Keine Daten'}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Population:</strong> {country.population ? country.population.toLocaleString() : 'Keine Daten'}</p>
                <p><strong>Area:</strong> {country.area ? country.area.toLocaleString() + ' km²' : 'Keine Daten'}</p>
                <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'Keine Daten'}</p>
                <p><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ') : 'Keine Daten'}</p>
                <img src={country.flags.png} alt={`Flagge von ${country.name.common}`} style={{ width: '100px', height: 'auto' }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CountrySearch;