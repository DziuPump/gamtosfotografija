import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
