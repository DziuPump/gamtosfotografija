import React, { useState } from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  Logo,
  OpenLinksButton,
  NavbarLinkExtended,
  RightContainerText,
} from "../../styles/Navbar.style";
import logoImg from "../../images/logo_small.png";

function NavBar() {
  const [extendNavbar, setExtendNavbar] = useState(false);

  const closeNavBar = () => {
    setExtendNavbar(false);
  };

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/galerija">Galerija</NavbarLink>
            <NavbarLink to="/blog">Tinklaraštis</NavbarLink>
            <NavbarLink to="/apie">Apie</NavbarLink>
            <NavbarLink to="/kontaktai">Kontaktai</NavbarLink>
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

          <Logo src={logoImg}></Logo>
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/galerija" onClick={closeNavBar}>
            Galerija
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/blog" onClick={closeNavBar}>
            Tinklaraštis
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/apie" onClick={closeNavBar}>
            Apie
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/kontaktai" onClick={closeNavBar}>
            Kontaktai
          </NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default NavBar;
