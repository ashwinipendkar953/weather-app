const City = require("../models/City");
const cron = require("node-cron");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");

// Get weather data from the API
const getWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
};

// Fetch weather for a single city
const getWeatherForCity = async (req, res) => {
  try {
    const cityName = req.params.city;
    const userId = req.userId;
    const city = await City.findOne({ name: cityName, userId });

    if (!city) {
      return res
        .status(404)
        .json({ message: "City not found in the database." });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: "Error fetching weather data" });
  }
};

// Add a city
const addCity = async (req, res) => {
  try {
    const cityName = req.body.city;
    const userId = req.userId;

    const data = await getWeatherData(cityName);

    const isCityExists = await City.findOne({ name: cityName, userId });

    if (isCityExists) {
      return res.status(400).json({ message: "City already exists." });
    }

    const city = new City({
      name: data.name,
      temperature: data.main.temp,
      weather: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      userId: userId,
    });

    await city.save();
    res.status(201).json(city);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding city" });
  }
};

// Get all tracked cities
const getCities = async (req, res) => {
  try {
    const userId = req.userId;
    const cities = await City.find({ userId });

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cities" });
  }
};

//  fetch and update 5-day forecast for a city
const getForecastCity = async (req, res) => {
  const { cityName } = req.params;
  const userId = req.userId;

  try {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

    const response = await axios.get(forecastUrl);
    const forecastData = response.data;

    if (forecastData.cod !== "200") {
      return res.status(404).json({ message: "City not found" });
    }

    const dailyForecastMap = new Map();

    forecastData.list.forEach((entry) => {
      const date = new Date(entry.dt * 1000).toISOString().split("T")[0];
      if (!dailyForecastMap.has(date)) {
        dailyForecastMap.set(date, {
          date: entry.dt * 1000,
          temperature: entry.main.temp,
          weather: entry.weather[0].description,
          icon: entry.weather[0].icon,
        });
      }
    });

    const forecast = Array.from(dailyForecastMap.values()).slice(0, 5);

    const city = await City.findOneAndUpdate(
      { name: cityName, userId },
      { forecast, lastUpdated: new Date() },
      { new: true, upsert: true }
    );

    res.json(city);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch forecast data", error: error.message });
  }
};

// Delete a city
const deleteCity = async (req, res) => {
  try {
    const { id: cityId } = req.params;
    const userId = req.userId;

    const city = await City.findOneAndDelete({ _id: cityId, userId });

    if (!city) {
      return res
        .status(404)
        .json({ message: "City not found or not associated with this user." });
    }

    res.status(200).json({ message: "City removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error removing city" });
  }
};

// Function to fetch all cities and update their weather data
const updateWeatherForAllCities = async () => {
  try {
    const users = await City.distinct("userId");

    for (const userId of users) {
      const cities = await City.find({ userId });

      for (const city of cities) {
        const weatherData = await getWeatherData(city.name);

        city.temperature = weatherData.main.temp;
        city.weather = weatherData.weather[0].description;
        city.icon = weatherData.weather[0].icon;
        city.humidity = weatherData.main.humidity;
        city.windSpeed = weatherData.wind.speed;
        city.sunrise = weatherData.sys.sunrise;
        city.sunset = weatherData.sys.sunset;

        await city.save();
      }
    }

    console.log("All users' cities weather data have been updated.");
  } catch (error) {
    console.error("Error updating cities' weather data:", error.message);
  }
};

// Schedule the task to run every hour
cron.schedule("0 * * * *", async () => {
  console.log("Cron job started: Updating weather data for all cities...");
  await updateWeatherForAllCities();
});

module.exports = {
  getWeatherForCity,
  addCity,
  getCities,
  getForecastCity,
  deleteCity,
};
