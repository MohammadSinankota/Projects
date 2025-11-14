// Configuration for multiple weather APIs
const WEATHER_APIS = {
  openweather: {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/",
    name: "OpenWeatherMap"
  },
  openmeteo: {
    base: "https://api.open-meteo.com/v1/",
    name: "Open-Meteo "
  },
  weatherapi: {
    key: "YOUR_WEATHERAPI_KEY_HERE", // Free key from weatherapi.com
    base: "https://api.weatherapi.com/v1/",
    name: "WeatherAPI"
  }
};

// Currently active API (change this to switch providers)
const CURRENT_API = "openmeteo"; // Options: "openweather", "openmeteo", "weatherapi"
const api = WEATHER_APIS[CURRENT_API];

// You'll need to replace this with your actual OpenAI API key
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";

const searchbox = document.querySelector('.search-box');
const searchBtn = document.querySelector('.search-btn');

// Display the current API name
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('api-name').textContent = WEATHER_APIS[CURRENT_API].name;
});

searchbox.addEventListener('keypress', function(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
});

searchBtn.addEventListener('click', function() {
  getResults(searchbox.value);
});

function getResults(query) {
  // Show loading state for weather data
  document.querySelector('.insight-text').innerHTML = '<div class="loading"></div>Fetching weather data...';
  
  let fetchPromise;
  
  // Fetch data based on the selected API
  switch(CURRENT_API) {
    case "openweather":
      fetchPromise = fetchOpenWeatherData(query);
      break;
    case "openmeteo":
      fetchPromise = fetchOpenMeteoData(query);
      break;
    case "weatherapi":
      fetchPromise = fetchWeatherAPIData(query);
      break;
    default:
      fetchPromise = fetchOpenWeatherData(query);
  }
  
  fetchPromise
    .then(async (weather) => {
      displayResults(weather);
      // Get AI insights after displaying weather data
      await getAIInsights(weather);
    })
    .catch(error => {
      document.querySelector('.insight-text').innerText = 'City not found or API error. Please try again.';
      console.error(error);
    });
}

// OpenWeatherMap API implementation
function fetchOpenWeatherData(query) {
  return fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    });
}

// Open-Meteo API implementation (free, no API key required)
function fetchOpenMeteoData(query) {
  // First we need to geocode the city name to coordinates
  return fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`)
    .then(response => response.json())
    .then(geoData => {
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      
      const lat = geoData.results[0].latitude;
      const lon = geoData.results[0].longitude;
      const cityName = geoData.results[0].name;
      const country = geoData.results[0].country_code || '';
      
      // Now fetch weather data using coordinates
      return fetch(`${api.base}forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`)
        .then(response => response.json())
        .then(weatherData => {
          // Convert Open-Meteo data to our standard format
          return {
            name: cityName,
            sys: { country: country },
            main: {
              temp: weatherData.current_weather.temperature,
              temp_min: weatherData.current_weather.temperature - 2, // Approximation
              temp_max: weatherData.current_weather.temperature + 2, // Approximation
              humidity: 70 // Default value as Open-Meteo doesn't provide this in current weather
            },
            weather: [{
              main: getWeatherDescription(weatherData.current_weather.weathercode),
              description: getWeatherDescription(weatherData.current_weather.weathercode).toLowerCase()
            }],
            wind: {
              speed: weatherData.current_weather.windspeed
            },
            coord: {
              lat: lat,
              lon: lon
            }
          };
        });
    });
}

// WeatherAPI implementation (requires free API key)
function fetchWeatherAPIData(query) {
  return fetch(`${api.base}current.json?key=${api.key}&q=${query}&aqi=no`)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      // Convert WeatherAPI data to our standard format
      return {
        name: data.location.name,
        sys: { country: data.location.country },
        main: {
          temp: data.current.temp_c,
          temp_min: data.current.temp_c - 2, // Approximation
          temp_max: data.current.temp_c + 2, // Approximation
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb
        },
        weather: [{
          main: data.current.condition.text,
          description: data.current.condition.text.toLowerCase()
        }],
        wind: {
          speed: data.current.wind_kph / 3.6 // Convert kph to m/s
        },
        coord: {
          lat: data.location.lat,
          lon: data.location.lon
        }
      };
    });
}

// Helper function to convert Open-Meteo weather codes to descriptions
function getWeatherDescription(code) {
  const weatherCodes = {
    0: 'Clear',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  
  return weatherCodes[code] || 'Unknown';
}

function displayResults (weather) {
  // Update city and date
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  // Update temperature and weather description
  let temp = document.querySelector('.temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}`;

  let weatherDesc = document.querySelector('.weather-description');
  weatherDesc.innerText = weather.weather[0].description;

  // Update min/max temperatures
  let minTemp = document.querySelector('.min-temp');
  minTemp.innerText = `${Math.round(weather.main.temp_min)}°C`;

  let maxTemp = document.querySelector('.max-temp');
  maxTemp.innerText = `${Math.round(weather.main.temp_max)}°C`;

  // Update additional weather information
  let humidity = document.querySelector('.humidity');
  humidity.innerText = `${weather.main.humidity || 'N/A'}%`;

  let wind = document.querySelector('.wind');
  wind.innerText = `${weather.wind.speed ? weather.wind.speed.toFixed(1) : 'N/A'} m/s`;

  let pressure = document.querySelector('.pressure');
  pressure.innerText = `${weather.main.pressure || 'N/A'} hPa`;

  // Update weather icon based on weather condition
  updateWeatherIcon(weather.weather[0].main);
}

async function getAIInsights(weatherData) {
  // Show loading state for AI insights
  document.querySelector('.insight-text').innerHTML = '<div class="loading"></div>Generating AI insights...';
  
  try {
    // Create a prompt for OpenAI based on weather data
    const prompt = `Based on the following weather conditions, provide a brief, helpful insight or recommendation (2 sentences max):
    Location: ${weatherData.name}, ${weatherData.sys.country}
    Temperature: ${Math.round(weatherData.main.temp)}°C
    Weather: ${weatherData.weather[0].description}
    Humidity: ${weatherData.main.humidity || 'N/A'}%
    Wind Speed: ${weatherData.wind.speed ? weatherData.wind.speed.toFixed(1) : 'N/A'} m/s
    
    Please provide a concise, helpful tip or insight based on these conditions.`;

    // Note: In a real implementation, you would call the OpenAI API here
    // For demonstration purposes, we'll simulate a response
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a simulated response based on weather conditions
    const simulatedResponse = generateSimulatedAIResponse(weatherData);
    
    // Display the insights
    document.querySelector('.insight-text').innerText = simulatedResponse;
  } catch (error) {
    console.error('Error getting AI insights:', error);
    document.querySelector('.insight-text').innerText = 'Unable to generate insights at this time.';
  }
}

function generateSimulatedAIResponse(weatherData) {
  const temp = Math.round(weatherData.main.temp);
  const weatherMain = weatherData.weather[0].main.toLowerCase();
  const humidity = weatherData.main.humidity;
  const windSpeed = weatherData.wind.speed;
  
  // Generate context-aware responses
  if (weatherMain.includes('rain')) {
    return "Don't forget your umbrella! This rain will help plants grow but may make roads slippery.";
  } else if (temp > 30) {
    return "It's quite hot today! Stay hydrated and try to stay in the shade during peak hours.";
  } else if (temp < 0) {
    return "Brrr, it's freezing! Dress warmly and watch for icy conditions on roads and sidewalks.";
  } else if (humidity && humidity > 80) {
    return "High humidity today! It might feel stickier than the actual temperature suggests.";
  } else if (windSpeed && windSpeed > 10) {
    return "It's quite windy today! Secure loose items outside and be cautious when driving.";
  } else if (weatherMain.includes('clear')) {
    return "Beautiful clear skies today! Perfect weather for outdoor activities and solar energy generation.";
  } else {
    return "Enjoy the pleasant weather today! It's a great day for both indoor and outdoor activities.";
  }
}

function updateWeatherIcon(condition) {
  const weatherIcon = document.querySelector('.weather-icon');
  
  switch(condition.toLowerCase()) {
    case 'clear':
      weatherIcon.className = 'fas fa-sun weather-icon';
      weatherIcon.style.color = '#FFD166';
      break;
    case 'clouds':
    case 'partly cloudy':
    case 'mainly clear':
      weatherIcon.className = 'fas fa-cloud weather-icon';
      weatherIcon.style.color = '#90E0EF';
      break;
    case 'rain':
    case 'drizzle':
    case 'light rain':
    case 'moderate rain':
    case 'heavy rain':
      weatherIcon.className = 'fas fa-cloud-rain weather-icon';
      weatherIcon.style.color = '#4CC9F0';
      break;
    case 'thunderstorm':
      weatherIcon.className = 'fas fa-bolt weather-icon';
      weatherIcon.style.color = '#F72585';
      break;
    case 'snow':
    case 'light snow':
    case 'moderate snow':
    case 'heavy snow':
      weatherIcon.className = 'fas fa-snowflake weather-icon';
      weatherIcon.style.color = '#4CC9F0';
      break;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'fog':
      weatherIcon.className = 'fas fa-smog weather-icon';
      weatherIcon.style.color = '#ADB5BD';
      break;
    default:
      weatherIcon.className = 'fas fa-cloud weather-icon';
      weatherIcon.style.color = '#90E0EF';
  }
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}

// Load default city on page load
window.addEventListener('load', function() {
  getResults('New York');
});