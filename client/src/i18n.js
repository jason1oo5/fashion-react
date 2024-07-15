import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const fallbackLng = ["en"];
const availableLanguages = localStorage.getItem('locales');

i18n
  .use(Backend) 
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: `${process.env.REACT_APP_BASEURL}/public/getLocalesData/{{lng}}`,
    },
    // resources,
    fallbackLng,
    detection: {
      checkWhitelist: true,
    },
    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;
