import React, { createContext, useContext, useState } from "react";
import api from "../utils/api";

const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchCities = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/cities");
      setCities(response.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCityById = async (cityName) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/weather/${cityName}`);
      setCity(response.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCityForecast = async (cityName) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/cities/${cityName}/forecast`);
      setForecast(response.data.forecast);

      setIsError(false);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addCity = async (cityName) => {
    try {
      const response = await api.post("/cities", { city: cityName });
      setCities([...cities, response.data]);
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message);
    }
  };

  const removeCity = async (id) => {
    try {
      await api.delete(`/cities/${id}`);
      setCities(cities.filter((city) => city._id !== id));
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message);
    }
  };

  return (
    <CityContext.Provider
      value={{
        cities,
        city,
        forecast,
        isLoading,
        isError,
        message,
        fetchCities,
        fetchCityById,
        fetchCityForecast,
        addCity,
        removeCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => useContext(CityContext);
