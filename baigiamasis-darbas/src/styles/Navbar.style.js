import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "auto" : "60px")};
  background-color: #212121;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 1000;
  @media (min-width: 700px) {
    height: 60px;
  }
  box-shadow: -1px -3px 6px 8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px -3px 6px 8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px -3px 6px 8px rgba(0, 0, 0, 0.75);
`;

export const LeftContainer = styled.div`
  flex: 45%;
  display: flex;
  align-items: center;

  @media (max-width: 850px) {
    flex: 10%;
  }
`;
export const RightContainer = styled.div`
  flex: 45%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 850px) {
    flex: 90%;
  }
`;

export const MiddleContainer = styled.div`
  flex: 5%;
  display: flex;
  align-items: center;
  @media (max-width: 986px) {
    display: none;
  }
`;

export const RightContainerText = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: underline;
  text-decoration-color: transparent;
  color: white;
  font-size: 40px;
  font-family: "Montserrat", sans-serif;
  background-color: transparent;
  border-radius: 15px;
  margin-right: 40px;

  @media (max-width: 1183px) {
    font-size: 35px;
  }
  @media (max-width: 1134px) {
    font-size: 30px;
  }
  @media (max-width: 1094px) {
    font-size: 29px;
  }
  @media (max-width: 1076px) {
    font-size: 25px;
  }
  @media (max-width: 1037px) {
    font-size: 18px;
  }
  @media (max-width: 986px) {
    font-size: 29px;
  }
  @media (max-width: 461px) {
    font-size: 22px;
  }
  @media (max-width: 393px) {
    font-size: 15px;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  text-decoration: none;
  padding: 5px;
  margin-left: 15px;
  border-radius: 10px;
  background-color: transparent;
  &:hover,
  &:focus {
    color: #ffffff;
    text-underline-offset: 17px;
    text-decoration: underline;
  }
  transition: all 0.2s;
  @media (max-width: 986px) {
    display: none;
  }
`;
export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  margin: 10px;
`;

export const NavbarCountryFlagContainer = styled.div`
  margin: 10px;
  display: flex;
`;

export const Logo = styled.img`
  margin: 10px;
  max-width: 80px;
  height: auto;
  @media (max-width: 393px) {
    max-width: 50px;
  }
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 40px;
  cursor: pointer;
  text-align: center;
  text-transform: center;

  @media (min-width: 987px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;

  @media (min-width: 987px) {
    display: none;
  }
`;

export const LogOutButton = styled.div`
  color: white;
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
  font-weight: 200;
  text-decoration: none;
  padding: 5px;
  margin-left: 15px;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #ffffff;
    text-underline-offset: 17px;
    text-decoration: underline;
  }
  transition: all 0.2s;
  @media (max-width: 986px) {
    display: none;
  }
`;

export const NavBarExtendedLogOut = styled.div`
  color: white;
  font-size: x-large;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  cursor: pointer;
  margin: 10px;
`;

export const CountryFlag = styled.img`
  width: 26px;
  height: 13px;
  cursor: pointer;

  &:nth-child(1) {
    margin-right: 5px;
    margin-left: 25%;
  }

  @media (max-width: 986px) {
    margin-left: 0;
  }
`;
