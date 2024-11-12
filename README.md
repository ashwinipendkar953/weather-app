# Weather Dashboard Application

A comprehensive weather dashboard application built with **React** (frontend) and **Node.js** (backend). This application allows users to track weather conditions for multiple cities, view detailed weather information, and manage tracked cities. Weather data is fetched from a weather API and updated hourly for accurate results.

## Features

### Frontend

- **Dashboard**: Displays a list of tracked cities with their current weather information.
- **Search Bar**: Allows users to add new cities to the tracking list.
- **Remove Option**: Users can remove cities from the tracking list.
- **City Details**: Detailed view for each city, showing additional information such as humidity, wind speed, sunrise, and sunset times.
- **Responsive Design**: Built with Tailwind CSS to ensure a responsive and user-friendly interface on all devices.

### Backend

- **Node.js with Express.js**: Handles API requests to fetch and manage weather data.
- **Weather API Integration**: Fetches weather data from [OpenWeatherMap](https://openweathermap.org/) or [WeatherAPI](https://www.weatherapi.com/).
- **API Endpoints**:
  - `GET /api/weather/:city` - Fetch weather data for a specific city.
  - `POST /api/cities` - Add a new city to the tracking list.
  - `GET /api/cities` - Retrieve a list of tracked cities.
  - `DELETE /api/cities/:id` - Remove a city from tracking.
- **MongoDB**: Stores the list of tracked cities and the latest weather data for each city.
- **Scheduled Weather Update**: Hourly update task to refresh weather data for all tracked cities.

### Additional Features

- **User Authentication**: Allows users to create accounts and manage personalized tracked cities.
- **5-Day Forecast**: Provides a 5-day weather forecast for each city.
- **Data Visualizations**: Displays line chart for temperature trends.

## Getting Started

### Prerequisites

- **Node.js** and **npm**
- **MongoDB**: You need a MongoDB instance running locally or in the cloud.
- **API Key**: Sign up for an API key from [OpenWeatherMap](https://openweathermap.org/) or [WeatherAPI](https://www.weatherapi.com/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashwinipendkar953/weather-app.git
   cd weather-app
   ```
