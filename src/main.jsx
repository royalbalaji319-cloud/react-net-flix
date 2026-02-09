import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './cssfiles/Navbar.css';
import './cssfiles/Hero.css';
import "./cssfiles/SignIn.css";
import './cssfiles/Trending.css';
import './cssfiles/FAQ.css';
import './cssfiles/Footer.css';

import './i18n';

// import './ReasonsToJoin.css';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
