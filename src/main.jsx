import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global CSS
import "./App.css";
import "./cssfiles/Navbar.css";
import "./cssfiles/Hero.css";
import "./cssfiles/SignIn.css";
import "./cssfiles/Trending.css";
import "./cssfiles/FAQ.css";
import "./cssfiles/Footer.css";

// i18n
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
