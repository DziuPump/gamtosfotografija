import React, { useRef, useState, useContext } from "react";
import emailjs from "@emailjs/browser";
import styles from "./EmailForm.module.css";

import { TranslationContext } from "../../components/TranslationContext/TranslationContext";

export const ContactUs = () => {
  const form = useRef();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const { translatedText } = useContext(TranslationContext);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_8lg244t",
        "template_6sn5swu",
        form.current,
        "prXK4espB4HeLSW48"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormSubmitted(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className={styles.container}>
      <h1>{translatedText("contactWithEmail")}</h1>

      {formSubmitted && <p>{translatedText("thanksForMessage")}</p>}
      <form ref={form} onSubmit={sendEmail} className={styles.wrapper}>
        <label>{translatedText("name")}</label>
        <input type="text" name="user_name" className={styles.inputField} />
        <label>{translatedText("email")}</label>
        {emailError && (
          <p className={styles.pastas}>Netinkamas el. pašto adresas</p>
        )}
        <input type="email" name="user_email" className={styles.inputField} />
        <label>{translatedText("subject")}</label>
        <input type="text" name="subject" className={styles.inputField} />
        <label>{translatedText("message")}</label>
        <textarea name="message" className={styles.textAreaField} />
        <input
          type="submit"
          value={translatedText("submit")}
          className={styles.submitButton}
        />
      </form>
    </div>
  );
};
