import React from "react";

function About() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>About React Weather App 🌤️</h1>
      
      <p>
        This is a simple React weather application built with <strong>Vite</strong>.
        It allows users to search for any city and view the current weather, hourly forecast,
        and 7-day forecast. The app also features dynamic background videos based on the weather
        conditions.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Search weather by city</li>
        <li>Current weather display with temperature, highs/lows, and weather icon</li>
        <li>Hourly forecast for today</li>
        <li>7-day forecast</li>
        <li>Toggle between Celsius and Fahrenheit</li>
        <li>Dynamic background video based on weather: Clear, Rain, Snow</li>
        <li>User-friendly error handling for invalid cities or network issues</li>
      </ul>

      <h2>Tech Stack</h2>
      <p>
        This project was built using <strong>React</strong> with <strong>Vite</strong>, 
        JavaScript (ES6+), CSS, and <strong>OpenWeatherMap API</strong>.
      </p>

      <h2>Getting Started</h2>
      <p>
        To run this app locally, clone the repository, install dependencies, 
        and create a <code>.env</code> file in the root directory with your OpenWeatherMap API key:
      </p>
      <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
VITE_WEATHER_API_KEY=your_openweathermap_api_key
      </pre>

      <p>Then start the development server using <code>npm run dev</code> or <code>yarn dev</code>.</p>

      <h2>Author</h2>
      <p>
        Aleksandar Čolović – portfolio-ready Frontend developer.
      </p>
    </div>
  );
}

export default About;