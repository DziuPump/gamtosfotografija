import React, { useState, useContext } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { TranslationContext } from "../../components/TranslationContext/TranslationContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { translatedText } = useContext(TranslationContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.gamtosfotografija.lt/api/login",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Login error:", error);
    }

    setUsername("");
    setPassword("");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginDiv}>
        <div className={styles.innerLogin}>
          <h2>{translatedText("login")}</h2>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.loginWrapper}>
              <div className={styles.inputFields}>
                <label htmlFor="username" className={styles.inputLabel}>
                  {translatedText("name")}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className={styles.inputFields}>
                <label htmlFor="password" className={styles.inputLabel}>
                  {translatedText("password")}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit" className={styles.loginButton}>
                {translatedText("loginButton")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
