import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import BigCard from './components/BigCard'
import SmallCard from './components/SmallCard'
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

import { TiWeatherPartlySunny } from "react-icons/ti";


function App() {
  const [city, setCity] = useState("Mumbai");
  const [weatherData,setWeatherData] = useState({});
  const [error, setError] =  useState("")
  const [isLoading , setIsLoading ] = useState(false)


  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const getWeatherData = async () => {
    try{
      setIsLoading(true)
      const response = await axios.get(url);
      if(response.status === 200){
        setWeatherData(response.data);
        setError("");
        setIsLoading(false)
      }
    }catch(error){
      console.log(error)
      setError(error.response?.data?.message || "Something went wrong");
      setIsLoading(false)
    }
  }


  useEffect(()=>{
    getWeatherData()
  },[])

  return (
    <section className="container">
      <div className="top">
          <h1>Weather Forecast</h1>
          <p>Real-time atmospheric conditions</p>
          <div>
            <span className="searchIcon"><IoIosSearch /></span>
            <input type="search" value={city} onChange={(event)=>setCity(event.target.value)} className="searchInput" placeholder="Search city..." />
            <button className="searchBtn" onClick={getWeatherData}>Search</button>
            
          </div>
        </div>
      <div className="inner">
        {error === "city not found" ?  (<p className="error">{error}</p>) : (
           isLoading === true ? <h2 style={{textAlign:"center"}}>Loading...</h2> :
        
           (<div className="cards">
          <div className="leftcard">
            <BigCard weatherData={weatherData}  />
          </div>
          <div className="rightcard">
            <div className="topcards">
              <SmallCard logo={<FaWind />} title="WIND" unit={`${(weatherData.wind?.speed * 3.6).toFixed(1)} km/h`} />
              <SmallCard logo={<WiHumidity />} title="HUMIDITY" unit={`${weatherData.main?.humidity} %`} />
            </div>
            <div className="bottomcards">
              <SmallCard logo={<FaArrowUp />} title="HIGH" unit={`${weatherData.main?.temp_max} °C`} />
              <SmallCard logo={<FaArrowDown />} title="LOW" unit={`${weatherData.main?.temp_min} °C`} />
            </div>
          </div>
        </div>))
         }
       
        
      </div>
      {/* <h5>Hourly Forecast</h5>
        <div className="hourlyForecast">
          <HourlyForecast time="12AM" forcastIcon={<TiWeatherPartlySunny />} temperature="4"/>
        </div> */}
    </section>
  )
}

export default App
