import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // translation file path
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en",
    // disable for prod
    debug: true,
    ns: ["home", "navbar", "diaries", "gallery", "widget", "forum", "comments", "modals", "mechanics"], //"common", "diaries", "forms", 
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      formatSeparator: ",",
    },
    react: {
      // wait: true,
      useSuspense: true,
    },
  });

export default i18n;
