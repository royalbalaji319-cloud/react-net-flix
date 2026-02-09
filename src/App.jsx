import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trending from "./components/Trending";
import ReasonsToJoin from "./components/ReasonsToJoin";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import RegisterForm from "./components/RegisterForm";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🌟 Home Page */}
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

        {/* 🔐 Auth Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 🎬 Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* 🚫 Unknown routes → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
