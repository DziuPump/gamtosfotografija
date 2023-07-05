import React, { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError(true);
      setError(true);
      return;
    }

    axios
      .post("https://api.gamtosfotografija.lt/api/register", {
        username: username,
        password: password,
      })
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        if (error.response.status) {
          setError(true);
          setUserExists(true);
        }
      });

    setUsername("");
    setPassword("");
    setPasswordError(false);
    setError(false);
    setSuccess(false);
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.registrationDiv}>
        <div className={styles.innerRegistration}>
          <h2>Registracija</h2>
          <form onSubmit={handleSubmit} className={styles.registrationForm}>
            <div className={styles.registrationWrapper}>
              <div className={styles.inputFields}>
                <label htmlFor="username" className={styles.inputLabel}>
                  Vardas
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                  style={{
                    border: error && "1px solid red",
                  }}
                />
              </div>
              <div className={styles.inputFields}>
                <label htmlFor="password" className={styles.inputLabel}>
                  Slaptažodis
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  style={{
                    border: error && "1px solid red",
                  }}
                />
                {passwordError && (
                  <p style={{ color: "red", padding: 20 }}>
                    Slaptažodis turi būti ilgesnis nei 8 simboliai
                  </p>
                )}
                {success && (
                  <p style={{ color: "green", padding: 20 }}>
                    Registracija sėkminga
                  </p>
                )}
                {userExists && (
                  <p style={{ color: "red", padding: 20 }}>
                    Toks vartotojas jau egzistuoja
                  </p>
                )}
              </div>
            </div>
            <div>
              <button type="submit" className={styles.registrationButton}>
                Registruotis
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
