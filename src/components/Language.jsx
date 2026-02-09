import React from "react";
import { useTranslation } from "react-i18next";

function Language() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} className="language-select">
      <option value="en">🌐 English</option>
      <option value="hi">हिन्दी</option>
      <option value="te">తెలుగు</option>
    </select>
  );
}

export default Language;
