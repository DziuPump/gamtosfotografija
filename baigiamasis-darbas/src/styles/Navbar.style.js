import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "auto" : "80px")};
  background-color: #212121;
  display: flex;
  flex-direction: column;
  position: sticky;
  z-index: 51565;
  @media (min-width: 700px) {
    height: 80px;
  }
  box-shadow: -1px -3px 6px 8px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -1px -3px 6px 8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px -3px 6px 8px rgba(0, 0, 0, 0.75);
`;

export const LeftContainer = styled.div`
  flex: 50%;
  display: flex;
  align-items: center;
  padding-left: 5%;
  @media (max-width: 850px) {
    flex: 10%;
  }
`;
export const RightContainer = styled.div`
  flex: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 850px) {
    flex: 90%;
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
  height: 80%;
  border-radius: 15px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #292929;
    color: #ffffff;
  }
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
  height: 80px;
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
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  &:hover,
  &:focus {
    background-color: #f5f5f5;
    color: #212121;
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
  font-size: 45px;
  cursor: pointer;

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
