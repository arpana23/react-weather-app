import React from 'react';
import { TiWeatherCloudy } from "react-icons/ti";
import { TiWeatherShower } from "react-icons/ti";
import { TiWeatherPartlySunny } from "react-icons/ti";



const BigCard = ({weatherData}) => {
  return (
        <div className="bigcard">
            <h3>{weatherData.name}</h3><span className="now">Now</span>
            <p>{weatherData.sys?.country}</p>
            <h1>{weatherData.main?.temp?.toFixed(1)}°C<span>{weatherData.weather?.[0]?.main === 'Clouds' ? (<TiWeatherCloudy />) : weatherData.weather?.[0]?.main === 'Rain' ? (<TiWeatherShower />) : <TiWeatherPartlySunny />}</span></h1>
            <p>{weatherData.main?.feels_like}°C</p>
        </div>
  )
}

export default BigCard
