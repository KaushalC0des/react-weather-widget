import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox() {
    let [city, setCity] = useState("");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "0757e02e0f1f62939637d1422d7c479f";

    let getWeatherInfo = async () => {
        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            
            if (response.ok) {
                console.log(jsonResponse);
                let result = {
                    temp: jsonResponse.main.temp,
                    tempMin: jsonResponse.main.temp_min,
                    tempMax: jsonResponse.main.temp_max,
                    humidity: jsonResponse.main.humidity,
                    feels_like: jsonResponse.main.feels_like,
                    weather: jsonResponse.weather[0].description,
                };
                console.log(result);
                // You can process the weather data here
                return jsonResponse;
            } else {
                console.error("City not found or API error:", jsonResponse.message);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(city);
        getWeatherInfo();
        setCity("");
    };

    return (
        <div className='SearchBox'>
            <h3>Search for weather</h3>
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="city" 
                    label="City Name" 
                    variant="outlined" 
                    required 
                    value={city}
                    onChange={handleChange}
                />
                <br></br>
                <br></br>
                <Button variant="contained" type='submit'>
                    Search
                </Button>
            </form>
        </div>
    )
}