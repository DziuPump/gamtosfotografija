import React, { useState, useEffect } from "react";

import styles from "./AdminNavBar.module.css";

import { Link } from "react-router-dom";

export default function AdminNavBar() {
  const [token, setToken] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    window.location.href = "/";
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, [token]);

  return (
    <div className={styles.adminNavBar}>
      <button className={styles.adminLogOut} onClick={handleLogout}>
        Atsijungti
      </button>
      <Link className={styles.adminLogOut} to="/administravimas">
        Administravimas
      </Link>
    </div>
  );
}
