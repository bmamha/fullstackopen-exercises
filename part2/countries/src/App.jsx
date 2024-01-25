import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Weather from './components/Weather'


const App = () => {
  const [searchName, setNewSearch] = useState('')
  const [allCountries, setCountries] = useState([ ])
  
  



useEffect ( () => {
  axios
  .get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(response =>{
    setCountries(response.data)
    
  }
  ).catch(response => {
    console.log("Unsuccessful")
  } )


}, []) 

const handleChange = (event) => {
  setNewSearch(event.target.value)
}

const filteredCountries = allCountries.filter((country) => 
   country.name.common.toLowerCase().includes(searchName.toLowerCase()))
  

const showButton = (country) => {
  const displayedCountry = country.name.common
  setNewSearch(displayedCountry)
}



       
const CountrySelector = ({ countries }) => {
  if (allCountries.length === 0) {
    return (
    <p>Loading data ...</p>
    )
  }

  else if (countries.length === allCountries.length) {
    return (
      <p>type country name...</p>
    )
  }
  else if (countries.length > 10) {
    console.log(countries.length)
    return (
      <p>Too many matches, specify another filter</p>
      
    )
  }
  else if (countries.length <= 10 && countries.length > 1) {
    console.log(countries.length)
    return (
      <ul>{countries.map( (country) => 
        <li key={country.name.official}>
          {country.name.common}
          <button onClick={() => showButton(country)}>Show</button>
        </li>)}
        </ul>
    )
  }
  else if (countries.length === 1) {

    const country = countries[0]
    const city = country.capital[0]
   console.log("City in App", city)
    
    return (
      <>     
       <h2>{country.name.common}</h2>
       <p> Capital: {country.capital[0]}</p>
       <p> Area: {country.area} </p>
       <h3>Languages</h3>
       <ul>{Object.values(country.languages).map( language => {
          return (
            <li key={language}>
              {language}
              </li>
          )
       })}
       </ul>
       
       <img src={country.flags.png} alt={country.flags.alt}></img>
       
       <h2>Weather in {city}</h2>
       <Weather city={city}/>

       </>
    )
    
  }

  else {
    return (
    <p> No country matches the search result</p>
    )
  }
  
  
}



 
return (
    <>
    <div>
     <p> find countries: <input id="search" value={searchName} onChange={handleChange}></input>
     </p>
     <CountrySelector countries={filteredCountries}/>

    </div>
     
    </>
  )
}

export default App
