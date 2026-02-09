import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Hero.css";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() !== "") {
      // Save email and go to signup page
      localStorage.setItem("signupEmail", email);
      navigate("/registerform");
    } else {
      // Show toast instead of alert
      toast.error("Please enter email address ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "dark",
      });
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>{t("hero_title")}</h1>
        <h2>{t("hero_subtitle")}</h2>
        <br />
        <p>{t("hero_description")}</p>

        <form className="email-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={t("email_placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">{t("get_started")}</button>
        </form>
      </div>

      {/* Curved red divider */}
      {/* <div className="curve">
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,80 Q720,0 1440,80"
            fill="none"
            stroke="#e50914"
            strokeWidth="4"
          />
        </svg>
      </div> */}

      {/* Toast Container*/}
      <ToastContainer />
    </div>
  );
};

export default Hero;
