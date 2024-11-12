// // weather.js
// const fetch = require('node-fetch'); 

// async function fetchWeatherData(city) {
//     try {
//         const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1aa204652b3037e2306f80c9c603d1dd`);
        
//     // Check if the response is ok (status code 200-299)
//     if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
// }

//         const weatherData = await response.json();

//         // Access temperature from the first item in the list
//         const tempK = weatherData.list[0].main.temp; // Get temperature in Kelvin
//         const tempC = (tempK - 273.15).toFixed(2); // Convert to Celsius

//         // Update the DOM elements
//         document.getElementById('weather-temperature').textContent = `${tempC}°C`;
//         document.getElementById('weather-condition').textContent = weatherData.list[0].weather[0].description;

//         return weatherData; // Return the weather data if needed
//     }catch (error) {
//         console.error("Error fetching weather data:", error);
        
//         // Clear previously set weather data
//         document.getElementById('weather-temperature').textContent = '';
//         document.getElementById('weather-condition').textContent = '';
      
//         // Display the error message
//         document.getElementById('weather-error').textContent = 'Error fetching weather data. Please try again.';
//       }
      
// }

// // Exporting the function for testing
// module.exports = { fetchWeatherData };

document.addEventListener('DOMContentLoaded', () => {
    const APIKey = b1555897d542e4ca6519f3cece1b410f; // Replace with your OpenWeatherMap API Key

    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const countryInput = document.getElementById('country');
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const weatherDetails = document.getElementById('weather-details');

    console.log("weather.js loaded"); // Add this line to check if the script is loaded

    // Event listener for button click
    getWeatherBtn.addEventListener('click', () => {
        console.log('Button clicked');

        const city = cityInput.value.trim();
        const state = stateInput.value.trim();
        const country = countryInput.value.trim();

        if (city && state && country) {
            fetchGeocode(city, state, country); // Fetch geolocation data
        } else {
            weatherDetails.innerHTML = 'Please enter a city, state, and country.';
        }
    });

    // Function to fetch geocoding data and get lat/lon
    function fetchGeocode(city, state, country) {
        const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${APIKey}`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    fetchWeatherForecast(lat, lon); // Fetch weather data with lat/lon
                } else {
                    weatherDetails.innerHTML = 'City not found. Please check your input.';
                }
            })
            .catch(error => {
                weatherDetails.innerHTML = 'Error fetching location data';
                console.error('Error:', error);
            });
    }

    // Function to fetch weather forecast
    function fetchWeatherForecast(lat, lon) {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                const forecast = data.list.slice(0, 5).map(item => {
                    return `
                        <p>${new Date(item.dt * 1000).toLocaleString()}: ${item.main.temp}°C, ${item.weather[0].description}</p>
                    `;
                }).join('');
                weatherDetails.innerHTML = forecast;
            })
            .catch(error => {
                weatherDetails.innerHTML = 'Error fetching weather data';
                console.error('Error:', error);
            });
    }
});
