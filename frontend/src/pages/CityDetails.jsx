// src/pages/CityDetails.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useCity } from "../context/CityContext";
import TemperatureTrendChart from "../components/TemperatureTrendChart";

const CityDetails = () => {
  const { cityName } = useParams();
  const { city, forecast, isLoading, fetchCityById, fetchCityForecast } =
    useCity();

  useEffect(() => {
    fetchCityById(cityName);
    fetchCityForecast(cityName);
  }, [cityName]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6  max-w-2xl mt-20 bg-white drop-shadow-2xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-cyan-500">
        {city?.name}
      </h2>
      <div className="flex items-center justify-center mb-6">
        <img
          src={`http://openweathermap.org/img/wn/${city?.icon}@2x.png`}
          alt={city?.weather}
          className="w-25 h-25"
        />
        <div className="ml-6">
          <p className="text-xl font-semibold">
            Temperature: {city?.temperature} °C
          </p>
          <p className="text-lg text-gray-600">Weather: {city?.weather}</p>
        </div>
      </div>
      <div className="bg-gray-100 p-5 rounded-md shadow-sm">
        <p className="text-md font-medium mb-2">
          <strong>Humidity:</strong> {city?.humidity}%
        </p>
        <p className="text-md font-medium mb-2">
          <strong>Wind Speed:</strong> {city?.windSpeed} m/s
        </p>
        <p className="text-md font-medium mb-2">
          <strong>Sunrise:</strong>{" "}
          {new Date(city?.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p className="text-md font-medium">
          <strong>Sunset:</strong>{" "}
          {new Date(city?.sunset * 1000).toLocaleTimeString()}
        </p>
      </div>

      <TemperatureTrendChart forecast={forecast} />
    </div>
  );
};

export default CityDetails;
