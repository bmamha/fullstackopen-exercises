import { useState, useEffect } from 'react'
import axios from 'axios'


const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

const Weather = ({city}) => {



    const [weather, setWeather] = useState(null)
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}aqi=no`
    console.log(url)

   useEffect ( () => {
   
          axios.get(url)
          .then(response => setWeather(response.data))
     }, [])

       
        if (weather === null) {
            return null
        }
      
        else {
        return (
            <>
            <p> Temperature: {weather.current.temp_c}</p>
            <p> Wind Speed: {weather.current.wind_kph}</p>
            </>
        )
}
        
}
export default Weather