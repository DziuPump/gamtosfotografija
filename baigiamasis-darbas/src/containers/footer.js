import React, { useContext } from "react";
import Footer from "../components/Footer/Footer";
import Icon from "../components/icons/icons";
import { TranslationContext } from "../components/TranslationContext/TranslationContext";

export function FooterContainer() {
  const { translatedText } = useContext(TranslationContext);
  return (
    <Footer>
      <Footer.Wrapper>
        <Footer.Row>
          <Footer.Column>
            <Footer.Title>{translatedText("links")}</Footer.Title>
            <Footer.Link href="/galerija">
              {translatedText("gallery")}
            </Footer.Link>
            <Footer.Link href="/tinklarastis">
              {translatedText("blog")}
            </Footer.Link>
            <Footer.Link href="/kontaktai">
              {translatedText("contacts")}
            </Footer.Link>
            <Footer.Link href="/apie">{translatedText("about")}</Footer.Link>
          </Footer.Column>
          <Footer.Column>
            <Footer.Title>{translatedText("socialMedia")}</Footer.Title>
            <Footer.Link
              href="https://www.facebook.com/tomas.pumputis.33"
              target="_blank"
            >
              <Icon className="fab fa-facebook-f" /> Facebook
            </Footer.Link>
            <Footer.Link
              href="https://www.efoto.lt/user/67175/nuotraukos"
              target="_blank"
            >
              <Icon className="fa-solid fa-camera" />
              eFoto
            </Footer.Link>
          </Footer.Column>
        </Footer.Row>
      </Footer.Wrapper>
    </Footer>
  );
}
