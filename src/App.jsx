import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Trending from "./components/Trending";
import ReasonsToJoin from "./components/ReasonsToJoin";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup"; // ✅ Netflix-style Signup page
import RegisterForm from "./components/RegisterForm";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🌟 Homepage */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Trending />
              <ReasonsToJoin />
              <FAQ />
              <Footer />
            </>
          }
        />

        {/* 🔐 Authentication Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 🎬 Dashboard (after login) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🚫 Catch-all Route (redirect unknown URLs to homepage) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
