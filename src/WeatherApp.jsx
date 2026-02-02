import SearchBox from "./SearchBox";
import InfoBox from "./infoBox";
import { useState } from "react";
import "./Weatherapp.css";

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        feelslike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        weather: "haze",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    return (
        <div className="weather-app">
            <div className="app-header">
                <h1 className="app-title">Weather Forecast</h1>
                <p className="app-subtitle">Get real-time weather updates for any city</p>
            </div>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo}/>
        </div>
    );
}