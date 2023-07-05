import React from "react";
import styles from "./PhotoModal.module.css";
import ReactDom from "react-dom";

const PhotoModal = ({ open, imageUrl, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.photoModalContainer} onClick={onClose}>
        <div className={styles.imgWrapper}>
          <img src={imageUrl} alt="Modal" className={styles.modalImg}></img>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default PhotoModal;
