import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./localisation/en/translation.json";
import hi from "./localisation/hi/translation.json";
import te from "./localisation/te/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    te: { translation: te },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
