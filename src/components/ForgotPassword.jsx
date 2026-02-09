import React, { useState } from "react";
import "/src/cssfiles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email");
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      alert("Please enter your email or phone number");
      return;
    }
    alert("Password reset instructions have been sent!");
  };

  return (
    <div className="forgot-page">
      <header className="forgot-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className="netflix-logo"
          onClick={() => navigate("/")}
        />
      </header>

      <div className="forgot-container">
        <h2>Forgot Email/Password</h2>
        <p>How would you like to reset your password?</p>

        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="email"
                checked={method === "email"}
                onChange={() => setMethod("email")}
              />
              Email
            </label>

            <label>
              <input
                type="radio"
                value="sms"
                checked={method === "sms"}
                onChange={() => setMethod("sms")}
              />
              Text Message (SMS)
            </label>
          </div>

          <p className="info-text">
            We will send you an {method === "email" ? "email" : "SMS"} with
            instructions on how to reset your password.
          </p>

          <input
            type={method === "email" ? "email" : "tel"}
            placeholder={
              method === "email" ? "name@example.com" : "Enter your phone number"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input-box"
          />

          <button type="submit" className="email-btn">
            Email Me
          </button>

          <a href="#!" className="forgot-link">
            I don’t remember my email or phone.
          </a>
        </form>

        <p className="recaptcha-text">
          This page is protected by Google reCAPTCHA to ensure you’re not a bot.{" "}
          <a href="#!">Learn more.</a>
        </p>
      </div>
    </div>
  );
}
