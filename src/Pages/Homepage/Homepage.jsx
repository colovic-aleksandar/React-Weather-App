import { useEffect, useState } from "react";

import clearWeather from "../../assets/clear.mp4";
import initialVideo from "../../assets/initialVideo.mp4";
import rainWeather from "../../assets/rain.mp4";
import snowWeather from "../../assets/snow.mp4";
import "./Homepage.css";

function Homepage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [video, setVideo] = useState(initialVideo);
  const [unit, setUnit] = useState('metric')
  const [unitLetter, setUnitLetter] = useState('C')
  const [errorCity, setErrorCity] = useState(null)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const handleToggle = () => {
    if (unit === 'metric') {
      setUnit('imperial');
      setUnitLetter('F')
    } else {
      setUnit('metric');
      setUnitLetter('C')
    }

      console.log(unit);
  };

useEffect(() => {
  if (city) {
    fetchWeather();
  }
}, [unit]);
  const fetchWeather = async () => {
    setErrorCity(null)
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod === "200") {
        setWeather(data);
        
        console.log(data);
      } else {
        setWeather(null);
        setErrorCity(`⚠️ City doesn't exist. Please check your spelling!`)
      }
    } catch (err) {
      setWeather(null);
    setErrorCity("⚠️ Something went wrong. Please try again!",err);
    }
  };

  useEffect(() => {
    if (!weather) return;

    const mainWeather = weather.list[0].weather[0].main;

    switch (mainWeather) {
      case "Clear":
        setVideo(clearWeather);
        break;
      case "Rain":
        setVideo(rainWeather);
        break;
      case "Snow":
        setVideo(snowWeather);
        break;
      default:
        setVideo(initialVideo);
    }
  }, [weather]);


     const radios = document.querySelectorAll('input[name="toggle"]');
        radios.forEach(radio => {
            radio.addEventListener('change', function() {
                console.log('Toggle state:', this.value);
            });
        });
  return (
    <div className="homepage">
      <section className="hero">
        <video autoPlay loop muted className="hero-video" key={video}>
          <source src={video} type="video/mp4" />
        </video>
        <div className="hero-overlay">
          <h1>Welcome to React Weather App</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter the city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={fetchWeather}>Search</button>
          </div>
      
          {weather ? (
            <div className="weather-info">
              <h2>
                {weather.city.name}, {weather.city.country}
              </h2>
              <div className="weather-details">
                <p>
                  <strong>Temperature:</strong> {weather.list[0].main.temp}°{unitLetter}
                </p>
                <p>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
                    alt={weather.list[0].weather[0].description}
                  />
                </p>
                <div>
                <p>
                  <strong>H:</strong> {weather.list[0].main.temp_max}°{unitLetter}
                </p>
                <p>
                  <strong>L:</strong> {weather.list[0].main.temp_min}°{unitLetter}
                </p></div>
              </div>
              <div className="weather-toggle">
                <div className="toggle-switch">
                  <input type="radio" name="temperature" value="C" checked={unit==='metric'} onChange={() => setUnit('metric')} />
                  <input type="radio" name="temperature" value="F" checked={unit==='imperial'} onChange={() => setUnit('imperial')} />
                  <div className="metric-toggle-wrapper">
                  <div className={`slider ${unit === 'metric' ? 'slider-active' : ''}`} onClick={handleToggle}></div></div>
                  <p className="current-metric">{unit}</p>
                </div>
             </div>
            </div>
          ): (
            <div>{errorCity}</div>
          )}
        </div>
      </section>

      {weather && (
        <div className="forecast-tables">
          {/* Hourly forecast */}
          <h3>Hourly Forecast (Today)</h3>
          <div className="hourly-forecast">
            {weather.list
              .filter((item) =>
                item.dt_txt.includes(new Date().toISOString().slice(0, 10))
              )
              .map((item, index) => (
                <div className="hour-card" key={index}>
                  <span className="hour">{item.dt_txt.slice(11, 16)}</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                  />
                  <span className="temp">{Math.round(item.main.temp)}°{unitLetter}</span>
                </div>
              ))}
          </div>

          {/* 7-day forecast */}
          <h3>7-Day Forecast</h3>
          <div className="daily-forecast">
            {Object.entries(
              weather.list.reduce((acc, item) => {
                const date = new Date(item.dt_txt);
                const day = date.toLocaleDateString("en-US", {
                  weekday: "long",
                });

                if (!acc[day]) {
                  acc[day] = {
                    min: item.main.temp_min,
                    max: item.main.temp_max,
                    icon: item.weather[0].icon,
                  };
                } else {
                  acc[day].min = Math.min(acc[day].min, item.main.temp_min);
                  acc[day].max = Math.max(acc[day].max, item.main.temp_max);
                }

                return acc;
              }, {})
            )
              .slice(0, 7)
              .map(([dayName, info], index) => (
                <div className="day-card" key={index}>
                  <div className="day-icon">
                    {" "}
                    <span className="day">
                      {index === 0 ? "Today" : dayName}
                    </span>
                    <img
                      src={`https://openweathermap.org/img/wn/${info.icon}.png`}
                      alt="weather icon"
                    />
                  </div>
                  <div className="low-high-temp">
                    <span className="low">L: {Math.round(info.min)}°{unitLetter}</span>
                    <span className="high">H: {Math.round(info.max)}°{unitLetter}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
