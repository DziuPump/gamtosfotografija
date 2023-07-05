import React from "react";
import { ContactUs } from "../../components/Email/EmailForm";

import { FooterContainer } from "../../containers/footer";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <>
      <div className={styles.contactWrapper}>
        <div className={styles.content}>
          <ContactUs />
        </div>
      </div>
      <FooterContainer />
    </>
  );
}
