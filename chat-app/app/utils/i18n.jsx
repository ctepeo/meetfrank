import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache
import Backend from 'i18next-chained-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-xhr-backend';

import config from '_app/config/i18n.config';

const i18nObject = {};
i18nObject.init = async () => {
  return i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      whitelist: config.whitelist,
      load: 'currentOnly',
      fallbackLng: config.fallback,
      debug: true,

      backend: {
        backends: [
          //LocalStorageBackend, //primary
          XHR, // fallback,
        ],
        backendOptions: [
          /*{
            // prefix for stored languages
            prefix: 'i18next_res_',

            // expiration 7 days
            expirationTime: 7 * 24 * 60 * 60 * 1000,

          },*/
          {
            crossDomain: true,
            loadPath: config.loadPath,
          },
        ],
      },
    });
};

export default i18nObject;
