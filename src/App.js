import './styles.css';
import React, { useState, useEffect, useRef } from 'react';

const App = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const cityInputRef = useRef(null);
    const apiKey = "0930e6c90c94c842169fa276feca882a";

    useEffect(() => {
        if (cityInputRef.current) {
            cityInputRef.current.focus();
        }
    }, [city]);

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
        <div className="weather-app">
            <h1>Weather App</h1>
            <input
                ref={cityInputRef}
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <div className="icon">
                {city && weatherData.weather && (
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt="Weather Icon"
                    />
                )}
            </div>
            {city && weatherData.name && (
                <div className="weather-info">
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default App;
