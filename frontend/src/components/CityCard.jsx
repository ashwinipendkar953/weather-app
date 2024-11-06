import React from "react";
import { Link } from "react-router-dom";
import { useCity } from "../context/CityContext";

function CityCard({ city }) {
  const { removeCity, fetchCities } = useCity();

  const handleDeleteCity = async (id) => {
    await removeCity(id);
    fetchCities();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-left text-left transition-transform transform hover:scale-105">
      <Link to={`/cities/${city?.name}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          <span className="font-bold">City: </span>
          {city?.name}
        </h3>
        <p className="text-gray-600">
          <span className="font-bold">Temperature:</span> {city?.temperature} °C
        </p>
        <p className="text-gray-600">
          <span className="font-bold">Weather Condition:</span> {city?.weather}
        </p>
        <img
          src={`http://openweathermap.org/img/w/${city?.icon}.png`}
          alt="weather icon"
          className="w-20 h-20 my-3"
        />
      </Link>

      <button
        onClick={() => handleDeleteCity(city?._id)}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 "
      >
        Remove
      </button>
    </div>
  );
}

export default CityCard;
