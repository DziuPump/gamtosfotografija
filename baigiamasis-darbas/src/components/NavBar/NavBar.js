import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TranslationContext } from "../TranslationContext/TranslationContext";

import ltFlag from "../../images/lt.svg";
import gbFlag from "../../images/gb.svg";

import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  OpenLinksButton,
  NavbarLinkExtended,
  RightContainerText,
  NavBarExtendedLogOut,
  MiddleContainer,
  CountryFlag,
  NavbarCountryFlagContainer,
} from "../../styles/Navbar.style";

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { changeLanguage, translatedText } = useContext(TranslationContext);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post("https://api.gamtosfotografija.lt/api/authenticate", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsAuthenticated(response.status === 200);
        })
        .catch((error) => {
          setIsAuthenticated(error.response.status === 200);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const closeNavBar = () => {
    setExtendNavbar(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <MiddleContainer>
          <CountryFlag
            src={gbFlag}
            onClick={() => handleLanguageChange("en")}
          />
          <CountryFlag
            src={ltFlag}
            onClick={() => handleLanguageChange("lt")}
          />
        </MiddleContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/galerija">{translatedText("gallery")}</NavbarLink>
            <NavbarLink to="/tinklarastis">{translatedText("blog")}</NavbarLink>
            <NavbarLink to="/apie">{translatedText("about")}</NavbarLink>
            <NavbarLink to="/kontaktai">
              {translatedText("contacts")}
            </NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <RightContainerText to="/">Gamtos fotografija</RightContainerText>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/galerija" onClick={closeNavBar}>
            {translatedText("gallery")}
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/tinklarastis" onClick={closeNavBar}>
            {translatedText("blog")}
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/apie" onClick={closeNavBar}>
            {translatedText("about")}
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/kontaktai" onClick={closeNavBar}>
            {translatedText("contacts")}
          </NavbarLinkExtended>
          {isAuthenticated && (
            <NavbarLinkExtended to="/administravimas" onClick={closeNavBar}>
              Administravimas
            </NavbarLinkExtended>
          )}
          {isAuthenticated && (
            <NavBarExtendedLogOut onClick={handleLogout}>
              Atsijungti
            </NavBarExtendedLogOut>
          )}
          <NavbarCountryFlagContainer>
            <CountryFlag
              src={gbFlag}
              onClick={() => handleLanguageChange("en")}
            />
            <CountryFlag
              src={ltFlag}
              onClick={() => handleLanguageChange("lt")}
            />
          </NavbarCountryFlagContainer>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default NavBar;
