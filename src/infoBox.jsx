import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import "./infoBox.css";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';

export default function InfoBox({ info }) {
    // Dynamic images based on weather conditions
    const HOT_URL = "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&q=80";
    const COLD_URL = "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=500&q=80";
    const RAIN_URL = "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=500&q=80";
    const CLOUDY_URL = "https://images.unsplash.com/photo-1561553543-f8c90d34c1af?w=500&q=80";

    // Determine weather icon and image
    const getWeatherIcon = () => {
        const weather = info.weather.toLowerCase();
        if (weather.includes("rain") || weather.includes("drizzle")) {
            return <ThunderstormIcon className="weather-icon rain-icon" />;
        } else if (weather.includes("cloud")) {
            return <CloudIcon className="weather-icon cloud-icon" />;
        } else if (info.temp > 25) {
            return <WbSunnyIcon className="weather-icon sun-icon" />;
        } else {
            return <AcUnitIcon className="weather-icon cold-icon" />;
        }
    };

    const getWeatherImage = () => {
        // Priority 1: Check humidity for rain
        if (info.humidity > 80) {
            return RAIN_URL;
        }
        // Priority 2: Check temperature
        else if (info.temp < 15) {
            return COLD_URL;
        }
        else if (info.temp >= 15) {
            return HOT_URL;
        }
        // Fallback
        return CLOUDY_URL;
    };

    return (
        <div className="InfoBox"> 
            <div className='card-container'>
                <Card className="weather-card">
                    <div className="image-wrapper">
                        <CardMedia
                            className="weather-image"
                            image={getWeatherImage()}
                            title={info.weather}
                        />
                        <div className="image-overlay"></div>
                    </div>
                    
                    <CardContent className="weather-content">
                        <div className="location-section">
                            <Typography variant="h4" className="city-name">
                                {info.city}
                            </Typography>
                            <Typography variant="body2" className="weather-description">
                                {info.weather}
                            </Typography>
                        </div>

                        <div className="temperature-section">
                            <div className="main-temp">
                                {getWeatherIcon()}
                                <span className="temp-value">{Math.round(info.temp)}</span>
                                <span className="temp-unit">°C</span>
                            </div>
                            <Typography variant="body2" className="feels-like">
                                Feels like {Math.round(info.feelslike)}°C
                            </Typography>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <WaterDropIcon className="stat-icon" />
                                <div className="stat-content">
                                    <Typography variant="caption" className="stat-label">
                                        Humidity
                                    </Typography>
                                    <Typography variant="h6" className="stat-value">
                                        {info.humidity}%
                                    </Typography>
                                </div>
                            </div>

                            <div className="stat-item">
                                <AcUnitIcon className="stat-icon" />
                                <div className="stat-content">
                                    <Typography variant="caption" className="stat-label">
                                        Min Temp
                                    </Typography>
                                    <Typography variant="h6" className="stat-value">
                                        {Math.round(info.tempMin)}°C
                                    </Typography>
                                </div>
                            </div>

                            <div className="stat-item">
                                <WbSunnyIcon className="stat-icon" />
                                <div className="stat-content">
                                    <Typography variant="caption" className="stat-label">
                                        Max Temp
                                    </Typography>
                                    <Typography variant="h6" className="stat-value">
                                        {Math.round(info.tempMax)}°C
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card> 
            </div>
        </div>
    );
}
