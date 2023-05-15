import React from "react";
import Footer from "../components/Footer/Footer";
import Icon from "../components/icons/icons";

export function FooterContainer() {
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>Nuorodos</Footer.Title>
            <Footer.Link href="/galerija">Galerija</Footer.Link>
            <Footer.Link href="/tinklarastis">Tinklaraštis</Footer.Link>
            <Footer.Link href="/tinklarastis">Kontaktai</Footer.Link>
            <Footer.Link href="/apie">Apie</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>Socialiniai Tinklai</Footer.Title>
            <Footer.Link href="#">
              <Icon className="fab fa-facebook-f" /> Facebook
            </Footer.Link>
            <Footer.Link href="#">
              <Icon className="fab fa-twitter" />
              Twitter
            </Footer.Link>
            <Footer.Link href="#">
              <Icon className="fab fa-facebook-f" />
              Nuoroda
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  );
}
