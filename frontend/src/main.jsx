import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "flowbite";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { CityProvider } from "./context/CityContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <CityProvider>
        <App />
      </CityProvider>
    </UserProvider>
  </StrictMode>
);
