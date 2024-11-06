const express = require("express");
const {
  getWeatherForCity,
  addCity,
  getCities,
  deleteCity,
  getForecastCity,
} = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/weather/:city", authMiddleware, getWeatherForCity);
router.post("/cities", authMiddleware, addCity);
router.get("/cities", authMiddleware, getCities);
router.get("/cities/:cityName/forecast", authMiddleware, getForecastCity);
router.delete("/cities/:id", authMiddleware, deleteCity);

module.exports = router;
