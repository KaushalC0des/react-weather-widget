import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "0757e02e0f1f62939637d1422d7c479f";

  const getWeatherInfo = async () => {
    const response = await fetch(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    return {
      city: city,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      feelslike: data.main.feels_like,
      weather: data.weather[0].description,
    };
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError(true);
      return;
    }

    try {
      const newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="search-input-wrapper">
          <TextField
            id="city"
            label="Enter City Name"
            variant="outlined"
            fullWidth
            required
            value={city}
            onChange={handleChange}
            error={error}
            helperText={error ? "City not found! Please try again." : ""}
            className="search-input"

            autoComplete="off"
            inputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}

            InputProps={{
              style: {
                borderRadius: "12px",
              },
            }}
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          startIcon={<SearchIcon />}
          className="search-button"
        >
          Search Weather
        </Button>
      </form>
    </div>
  );
}
