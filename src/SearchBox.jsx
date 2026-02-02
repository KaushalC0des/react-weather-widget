
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBox({updateInfo}) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "0757e02e0f1f62939637d1422d7c479f";

    let getWeatherInfo = async () => {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        
        if (response.ok) {
            console.log(jsonResponse);
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelslike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
            };
            console.log(result);
            return result;
        } else {
            throw new Error("City not found");
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = async (evt) => {
        try {
            evt.preventDefault();
            console.log(city);
            setError(false);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            setCity("");
        } catch(err){
            setError(true);
        }
    };

    return (
        <div className='SearchBox'>
            <form onSubmit={handleSubmit}>
                <div className="search-input-wrapper">
                    <TextField 
                        id="city" 
                        label="Enter City Name" 
                        variant="outlined" 
                        required 
                        value={city}
                        onChange={handleChange}
                        className="search-input"
                        error={error}
                        helperText={error ? "City not found! Please try again." : ""}
                        fullWidth
                        InputProps={{
                            style: {
                                borderRadius: '12px',
                            }
                        }}
                    />
                </div>
                <Button 
                    variant="contained" 
                    type='submit'
                    className="search-button"
                    startIcon={<SearchIcon />}
                    fullWidth
                >
                    Search Weather
                </Button>
            </form>
        </div>
    );
}