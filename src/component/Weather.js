import React, { useState } from 'react'
import { FaWind } from 'react-icons/fa';
import { Divide } from 'react-feather'
import './Weather.css';
import {FaSearch} from "react-icons/fa";
import {MdLocationOn} from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';



const Weather = () => {

        const [city, setCity] = useState("")
        const [weather, setWeather] = useState();
        const [error, setError] = useState('');


        const API_KEY = "47202466c0442221e1e77595cbc9ece9"; 
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    
        function handleOnChange(event) {
            setCity(event.target.value);
        }

        async function fetchData() {
            try{
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
                const output = await response.json();

                if(response.ok) {
                    setWeather(output);
                    console.log(output);
                    setError('');
                }
                else{
                    setWeather(null);
                    setError('City not found. Please enter a valid city name.')
                }
            }
            catch (error){
                setError('Something went wrong. Please try again later.')
            }
            
            
        }

     return (
        <div className='container'>
            <div className='city'>
                <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name'></input>
                <button onClick={fetchData}>
                    <FaSearch></FaSearch>
                </button>
            </div>
            {
                error &&<p className='error-message'>{error}</p>
            }
            {
                weather && weather.weather &&
                <div className='content'>

                    <div className='weather-image'>
                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
                        <h3 className='desc'>{weather.weather[0].description}</h3>
                    </div>

                    <div className='weather-temp'>
                        <h2>{weather.main.temp}<span>&deg;C</span></h2>
                    </div>

                    <div className='weather-city'>
                        <div className='location'>
                            <MdLocationOn/>
                        </div>
                        <p>{weather.name},<span>{weather.sys.country}</span></p>
                    </div>

                    <div className='weather-status'>
                        <div className='wind'>
                            <div className='wind-icon'>
                                <FaWind/>
                            </div>
                            <h3 className='wind-speed'>{weather.wind.speed}<span>km/h</span></h3>
                            <h3 className='wind-heading'>Wind Speed</h3>
                        </div>

                        <div className='humidity'>
                            <div className='humidity-icon'>
                                <WiHumidity/>
                            </div>
                            <h3 className='humidity-percent'>{weather.main.humidity}<span>%</span></h3>
                            <h3 className='humidity-heading'>Humidity</h3>
                        </div>
                    </div>
                </div>   
            
            }
        </div>
    )
}
export default Weather;