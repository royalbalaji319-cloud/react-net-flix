import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../cssfiles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill out all fields.");
      return;
    }

    if (form.password.length < 4 || form.password.length > 60) {
      setError("Password must be between 4 and 60 characters.");
      return;
    }

    // ✅ Save user details to localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = existingUsers.some(
      (user) => user.email === form.email
    );

    if (emailExists) {
      setError("Email already registered. Please sign in.");
      return;
    }

    existingUsers.push(form);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // ✅ Redirect to SignIn page with prefilled 
    navigate("/registerform", { state: { email: form.email, password: form.password } });
  };

  return (
    <div className="signup-page">
      <div className="signup-overlay"></div>

      {/* Navbar */}
      <nav className="signup-nav container-fluid d-flex justify-content-between align-items-center px-5 pt-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix Logo"
          className="signup-logo"
        />
      </nav>

      {/* Form Card */}
      <div className="signup-card text-white">
        <h2 className="fw-bold mb-3 text-center">Create your account</h2>
        <p className="text-center mb-4">
          Just a few steps and you’re ready to watch.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control form-control-lg bg-dark text-white border-secondary"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control form-control-lg bg-dark text-white border-secondary"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control form-control-lg bg-dark text-white border-secondary"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-warning mb-3 text-center fw-semibold">
              {error}
            </p>
          )}

          <button type="submit" className="btn btn-danger btn-lg w-100 fw-bold">
            Sign Up
          </button>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-white fw-bold text-decoration-underline"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/registerform")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
