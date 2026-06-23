import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import {
  EnergyProvider,
} from "./context/EnergyContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <EnergyProvider>
      <App />
    </EnergyProvider>
  </React.StrictMode>
);
