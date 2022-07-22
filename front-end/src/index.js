import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import AllRoutes from "./components/AllRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AllRoutes />
  </Router>
);
