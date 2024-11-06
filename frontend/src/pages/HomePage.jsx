import React, { useEffect, useState } from "react";
import CityCard from "../components/CityCard";
import Loader from "../components/Loader";
import { useCity } from "../context/CityContext";
import { toast } from "react-toastify";

function HomePage() {
  const { cities, isLoading, isError, message, fetchCities, addCity } =
    useCity();
  const [newCity, setNewCity] = useState("");

  useEffect(() => {
    fetchCities();
    const interval = setInterval(fetchCities, 3600000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleAddCity = async () => {
    await addCity(newCity);
    setNewCity("");
    fetchCities();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          className="capitalize border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={newCity}
          onChange={(e) =>
            setNewCity(
              e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            )
          }
          placeholder="Add city"
        />
        <button
          onClick={handleAddCity}
          className="bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-white text-white font-semibold py-2 px-4 rounded-lg"
          disabled={!newCity.trim()}
        >
          Add City
        </button>
      </div>

      {cities?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {cities.map((city) => (
            <CityCard key={city?._id} city={city} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No cities available. Add a new city to get started!
        </p>
      )}
    </div>
  );
}

export default HomePage;
