import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import "./SignIn.css";

function SignIn() {
  const { t, i18n } = useTranslation();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [showHelpText, setShowHelpText] = useState(false);
  const [showFullRecaptchaText, setShowFullRecaptchaText] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailOrMobile.length === 0 || !emailOrMobile.includes("@")) {
      setShowError(true);
    } else {
      setShowError(false);
      console.log("Attempting sign-in with:", emailOrMobile);
    }
  };

  const toggleHelpText = () => setShowHelpText(!showHelpText);
  const toggleRecaptchaText = () =>
    setShowFullRecaptchaText(!showFullRecaptchaText);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLanguageSelect = (lang, code) => {
    setSelectedLang(lang);
    setIsDropdownOpen(false);
    i18n.changeLanguage(code); // switch translation language dynamically
  };

  return (
    <div className="background">
      <div className="overlay"></div>

      {/* Netflix Logo */}
      <img
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
        className="netflix-logo"
      />

      {/* Sign-in Form */}
      <div className="sign-in-container">
        <form className="sign-in-form" onSubmit={handleSubmit}>
          <h2>{t("signin_title")}</h2>
          <p id="para">{t("signin_subtitle")}</p>

          <input
            id="mail"
            type="text"
            placeholder={t("signin_placeholder")}
            value={emailOrMobile}
            onChange={(e) => {
              setEmailOrMobile(e.target.value);
              setShowError(false);
            }}
            required
            className={`input-field ${showError ? "error-input" : ""}`}
          />

          {showError && (
            <div className="error-text">
              <span className="error-icon">⚠️</span>
              {t("signin_error")}
            </div>
          )}

          <button type="button" className="continue-btn">
            <Link
              to="/registerform"
              style={{ color: "white", textDecoration: "none" }}
            >
              {t("signin_continue")}
            </Link>
          </button>

          <div className="help-section">
            <a href="#!" onClick={toggleHelpText}>
              {t("signin_help")}{" "}
              <span className="arrow">{showHelpText ? "▲" : "▼"}</span>
            </a>
            {showHelpText && (
              <div className="help-expanded-content">
                <a href="#!">{t("signin_forgot")}</a>
                <a href="#!">{t("signin_learn_more")}</a>
              </div>
            )}
          </div>

          <div className="recaptcha-notice">
            <p>
              {t("recaptcha_text")}{" "}
              <a href="#!" onClick={toggleRecaptchaText}>
                {t("learn_more")}
              </a>
              .
            </p>
            {showFullRecaptchaText && (
              <div className="recaptcha-legal-text">
                <p>
                  {t("recaptcha_policy")}
                  <a href="#" className="recaptcha-link">
                    {t("privacy_policy")}
                  </a>{" "}
                  {t("and")}{" "}
                  <a href="#" className="recaptcha-link">
                    {t("terms_service")}
                  </a>
                  {t("recaptcha_end_text")}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer-bar">
        <p className="footer-text">{t("footer_contact")}</p>

        <ul className="footer-links-grid">
          <li><a href="#!">{t("footer_faq")}</a></li>
          <li><a href="#!">{t("footer_help")}</a></li>
          <li><a href="#!">{t("footer_terms")}</a></li>
          <li><a href="#!">{t("footer_privacy")}</a></li>
          <li><a href="#!">{t("footer_cookie")}</a></li>
          <li><a href="#!">{t("footer_corporate")}</a></li>
        </ul>

        {/* Language Dropdown */}
        <div className="footer-lang">
          <div className="lang-dropdown-wrapper">
            <button className="lang-btn" onClick={toggleDropdown} type="button">
              <span className="language-icon">🌐</span>
              {selectedLang} <span className="dropdown-arrow">▼</span>
            </button>

            {isDropdownOpen && (
              <div className="lang-dropdown-menu">
                <a
                  href="#!"
                  className={`lang-option ${
                    selectedLang === "English" ? "selected" : ""
                  }`}
                  onClick={() => handleLanguageSelect("English", "en")}
                >
                  English
                </a>
                <a
                  href="#!"
                  className={`lang-option ${
                    selectedLang === "हिन्दी" ? "selected" : ""
                  }`}
                  onClick={() => handleLanguageSelect("हिन्दी", "hi")}
                >
                  हिन्दी
                </a>
                <a
                  href="#!"
                  className={`lang-option ${
                    selectedLang === "తెలుగు" ? "selected" : ""
                  }`}
                  onClick={() => handleLanguageSelect("తెలుగు", "te")}
                >
                  తెలుగు
                </a>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SignIn;
