import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./Gallery.module.css";
import PhotoModal from "../../components/PhotoModal/PhotoModal";

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState([]);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get("http://45.93.138.96:6000/api/albums");
        console.log(response.data);
        setGalleryData(response.data);

        setModalOpen(Array(response.data.length).fill(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchGalleryData();
  }, []);

  const openModal = (index) => {
    const updatedModalOpen = [...modalOpen];
    updatedModalOpen[index] = true;
    setModalOpen(updatedModalOpen);
  };

  const closeModal = (index) => {
    const updatedModalOpen = [...modalOpen];
    updatedModalOpen[index] = false;
    setModalOpen(updatedModalOpen);
  };
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        <h1>Galerija</h1>
      </div>
      <div className={styles.galleryContent}>
        {galleryData.map((album, index) => (
          <div className={styles.galleryPost} key={index}>
            <div className={styles.galleryPostRight}>
              <div className={styles.imageWrapper}>
                <img
                  src={`http://45.93.138.96:6000/api/thumbnails/${album.thumbnail}`}
                  alt="thumbnail photo"
                  onClick={() => openModal(index)}
                ></img>
                <PhotoModal
                  open={modalOpen[index]}
                  imageUrl={`http://45.93.138.96:6000/api/thumbnails/${album.thumbnail}`}
                  onClose={() => closeModal(index)}
                />
              </div>
            </div>
            <div className={styles.galleryPostLeft}>
              <h1>{album.name}</h1>
              <p>{album.description}</p>
              <Link to={`/albums/${album.name}`}>
                <button>Žiūrėti</button>
              </Link>
            </div>
          </div>
        ))}
        <hr></hr>
      </div>
    </div>
  );
}
