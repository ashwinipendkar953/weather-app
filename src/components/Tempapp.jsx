import React, { useEffect, useState } from "react";
import "./css/style.css";

const Tempapp = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("Pune");

  useEffect(() => {
    const fetchApi = async () => {
      const apiKey = "abaeed62cfc448f4db94d74e19f44d59";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const resData = await response.json();
      // console.log(resData);
      setCity(resData.main);
      console.log(resData);
    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <input
            type="search"
            value={search}
            className="inputField"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {!city ? (
          <p> {search} no data found</p>
        ) : (
          <div className="info">
            <h2 className="location">
              <i className="fa-solid fa-street-view"></i>
              {search}
            </h2>
            <h1 className="temp">{city.temp} °C</h1>
            <h3 className="tempmin_max">
              Min : {city.temp_min} °C | Max :{city.temp_max} °C
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Tempapp;
