const mongoose = require("mongoose");

const forecastSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  temperature: Number,
  weather: String,
  icon: String,
});

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  temperature: Number,
  weather: String,
  icon: String,
  humidity: Number,
  windSpeed: Number,
  sunrise: Number,
  sunset: Number,
  lastUpdated: { type: Date, default: Date.now },
  forecast: [forecastSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("City", citySchema);
