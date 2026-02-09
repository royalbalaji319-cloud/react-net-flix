import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./RegisterForm.css";

export default function RegisterForm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLearn, setShowLearn] = useState(false);

  // ✅ Auto-fill when coming from Signup page
  useEffect(() => {
    if (location.state) {
      if (location.state.email) {
        setEmail(location.state.email);
        localStorage.setItem("signupEmail", location.state.email);
      }
      if (location.state.password) {
        setPassword(location.state.password);
        localStorage.setItem("signupPassword", location.state.password);
      }
    }
  }, [location.state]);

  // ✅ Restore if refreshed
  useEffect(() => {
    const savedEmail = localStorage.getItem("signupEmail");
    const savedPassword = localStorage.getItem("signupPassword");
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  // ✅ Handle Sign-In
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      setError("✕ Invalid email or password");
      return;
    }

    // ✅ Success
    setError("");
    localStorage.setItem("currentUser", JSON.stringify(foundUser)); // optional
    navigate("/dashboard", { replace: true });
  };

  const handleSignupClick = () => navigate("/signup");

  return (
    <div className="page-root">
      <div className="hero">
        <div className="hero-overlay" />

        <header className="logo-wrap">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="Netflix Logo"
            className="logo"
          />
        </header>

        <main className="signin-card" aria-label={t("signin")}>
          <h1 className="title">{t("signin") || "Sign In"}</h1>

          <form onSubmit={handleSubmit} className="form">
            <input
              type="email"
              className={`input ${error && !email ? "input-error" : ""}`}
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className={`input ${error && !password ? "input-error" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="error-text">{error}</div>}

            <button type="submit" className="btn primary">
              {t("signin") || "Sign In"}
            </button>

            <div className="or">or</div>

            <button type="button" className="btn code">
              {t("Sign in with code") || "Sign in with code"}
            </button>

            <a
              className="forgot"
              href="#!"
              onClick={() => navigate("/forgot-password")}
            >
             {t(" Forgot password?") || " Forgot password?"}
            </a>

            <div className="remember-row">
              <label className="remember">
                <input type="checkbox" /> <span>{t("Remember me") || "Remember me"}</span>
              </label>
            </div>

            <p className="signup">
              {t("New to Netflix?") || " New to Netflix?"}{" "}
              <a href="#!" onClick={handleSignupClick}>
                {t("Sign up now") || " Sign up now"}
              </a>
            </p>

            <p className="recap">
              This page is protected by reCAPTCHA.{" "}
              <button
                type="button"
                className="learn-toggle"
                onClick={() => setShowLearn((s) => !s)}
              >
                Learn more {showLearn ? "▲" : "▼"}
              </button>
            </p>

            {showLearn && (
              <div className="learn-more">
                reCAPTCHA helps prevent automated abuse.
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}
