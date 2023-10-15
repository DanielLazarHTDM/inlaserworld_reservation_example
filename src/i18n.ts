import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import {inLaserWorldI18nBackendOptions} from "@inlaserworld/reservation-widget";


i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(backend)
    .init({
        backend: inLaserWorldI18nBackendOptions(),
        fallbackLng: "en",
        debug: false,
        load:"languageOnly",
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
