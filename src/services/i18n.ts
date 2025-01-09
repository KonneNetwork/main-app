import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "../utils/locales/en.json"
import pt from "../utils/locales/pt.json"

export const languageResources = {
  en: { translation: en },
  pt: { translation: pt },
}

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = String(Localization.getLocales().map(item => item.languageTag));
    // savedLanguage = 'pt';
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: 'en',
  resources: languageResources,
  fallbackLng: ['pt-BR', 'en-US'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

initI18n();

export default i18n;