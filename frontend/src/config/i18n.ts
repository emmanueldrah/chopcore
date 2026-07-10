import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      common: {
        appName: "Ferako",
        loading: "Loading...",
        error: "Something went wrong",
        confirm: "Confirm",
        cancel: "Cancel",
        back: "Back",
      },
      auth: {
        login: "Login",
        phoneNumber: "Phone Number",
        sendOtp: "Send OTP",
        verifyOtp: "Verify OTP",
      },
      buyer: {
        home: "Home",
        cart: "Cart",
        orders: "Orders",
        profile: "Profile",
        categories: {
          food: "Food",
          pharmacy: "Pharmacy",
          produce: "Fruits & Vegetables",
          beverages: "Beverages",
        }
      },
      vendor: {
        dashboard: "Vendor Dashboard",
        orders: "Orders",
        items: "Items",
        settings: "Settings",
      }
    }
  },
  ee: {
    translation: {
      common: {
        appName: "Ferako",
        loading: "Le dɔ dzi...",
        error: "Nane gblẽ",
        confirm: "Ɖo kpe edzi",
        cancel: "Tudzɔ",
        back: "Trɔ yi megbe",
      },
      auth: {
        login: "Ge ɖe eme",
        phoneNumber: "Kaƒoƒo xexlẽme",
        sendOtp: "Ɖo OTP ɖa",
        verifyOtp: "Lé ŋku ɖe OTP ŋu",
      },
      buyer: {
        home: "Aƒeme",
        cart: "Kevi",
        orders: "Nuɖuɖuwo",
        profile: "Ŋutinya",
        categories: {
          food: "Nuɖuɖu",
          pharmacy: "Atikeƒe",
          produce: "Nuɖuɖu siwo tso agble me",
          beverages: "Nunonowo",
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
