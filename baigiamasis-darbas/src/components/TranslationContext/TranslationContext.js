import React, { createContext, useState } from "react";

export const TranslationContext = createContext();

export default function TranslationProvider({ children }) {
  const [language, setLanguage] = useState("lt");

  const translations = {
    en: {
      header: "Home",
      about: "About",
      contacts: "Contacts",
      blog: "Blog",
      gallery: "Gallery",
      hero1: "Nature's beauty",
      hero2: "trough the lens",
      hero3: "Discover the beauty of Lithuanian nature",
      links: "Links",
      socialMedia: "Social Media",
      view: "View",
      readMore: "Read More",
      photographyEquipment: "Photography equipment",
      drone: "Drone",
      camera: "Camera",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      submit: "Submit",
      thanksForMessage: "Thank you for your message!",
      contactWithEmail: "Contact by Email",
      login: "Login",
      password: "Password",
      loginButton: "Login",
      aboutMe:
        "Hi, I'm Tomas Pumputis. I live in Utena. I like to photograph nature and its phenomena, explore the beauty of the night sky with my camera. I have found out that those dark nights are not so black. So I want to show it to others. I want to tell a story, to evoke positive emotions through a moment captured by a camera. Photography is not my profession, it's more of a passion. Thank you for visiting and good luck on your visual photographic journey.",
    },
    lt: {
      header: "Pagrindinis",
      about: "Apie",
      contacts: "Kontaktai",
      blog: "Tinklaraštis",
      gallery: "Galerija",
      hero1: "Gamtos grožis",
      hero2: "pro objektyvą",
      hero3: "Atraskite lietuviškos gamtos grožį",
      links: "Nuorodos",
      socialMedia: "Socialiniai Tinklai",
      view: "Žiūrėti",
      readMore: "Skaityti daugiau",
      photographyEquipment: "Fotografavimo įranga",
      drone: "Dronas",
      camera: "Fotoaparatas",
      name: "Vardas",
      email: "El. pašto adresas",
      subject: "Tema",
      message: "Žinutė",
      submit: "Siųsti",
      thanksForMessage: "Ačiū už jūsų žinutę!",
      contactWithEmail: "Susisiekite El. paštu",
      login: "Prisijungimas",
      password: "Slaptažodis",
      loginButton: "Prisijungti",
      aboutMe:
        "Sveiki, esu Tomas Pumputis. Gyvenu Utenoje. Mėgstu fotografuoti gamtą ir jos reiškinius, su kamera tyrinėti nakties dangaus grožybes. Įsitikinau, kad tos tamsios naktys nėra jau tokios juodos. Tad noriu tai parodyti ir kitiems. Per fotoaparato užfiksuotą akimirką noriu papasakot istoriją, sukelt teigiamas emocijas. Fotografija nėra mano profesija, tai daugiau aistra. Ačiū, kad apsilankėte ir sėkmės vizualioje foto kelionėje - klajoklėje.",
    },
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const translatedText = (key) => {
    return translations[language][key] || "";
  };

  return (
    <TranslationContext.Provider
      value={{
        language,
        setLanguage,
        translations,
        changeLanguage,
        translatedText,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
}
