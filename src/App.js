import './styles.css';
import React, { useState, useEffect } from 'react';

import { FaSun, FaMoon } from 'react-icons/fa';
const App = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [theme, setTheme] = useState("day-theme");
    const apiKey = "0930e6c90c94c842169fa276feca882a";
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 18) {
            setTheme("day-theme");
        } else {
            setTheme("night-theme");
        }
    }, []);
 
    useEffect(() => {
        const getData = async () => {
            if (city === "") return;
 
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error("Error fetching data");
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };
 
        getData();
    }, [city]);
 
    return (
        <div className={`weather-app ${theme}`}>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <div className="icon">
                {theme === "day-theme" ? <FaSun size={40} /> : <FaMoon size={40} />}
            </div>
            {city && weatherData.name && (
                <div>
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                    <p>Weather: {weatherData.weather && weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default App