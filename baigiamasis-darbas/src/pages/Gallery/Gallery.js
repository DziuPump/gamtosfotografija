import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./Gallery.module.css";
import PhotoModal from "../../components/PhotoModal/PhotoModal";
import { FooterContainer } from "../../containers/footer";
import { TranslationContext } from "../../components/TranslationContext/TranslationContext";

export default function Gallery() {
  const [modalOpen, setModalOpen] = useState([]);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await axios.get(
          "https://api.gamtosfotografija.lt/api/albums"
        );
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

  const { translatedText } = useContext(TranslationContext);

  return (
    <>
      <div className={styles.galleryContainer}>
        <div className={styles.galleryHeader}></div>
        <div className={styles.galleryContent}>
          {galleryData.map((album, index) => (
            <React.Fragment key={index}>
              <div className={styles.galleryPost}>
                <div className={styles.buttonContainer2}>
                  <Link
                    className={styles.showMore2}
                    to={`/albums/${album.name}`}
                  >
                    {translatedText("view")}
                  </Link>
                </div>
                <div className={styles.galleryPostRight}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={`https://api.gamtosfotografija.lt/api/thumbnails/${album.thumbnail}`}
                      alt="thumbnail"
                      onClick={() => openModal(index)}
                    ></img>
                    <PhotoModal
                      open={modalOpen[index]}
                      imageUrl={`https://api.gamtosfotografija.lt/api/thumbnails/${album.thumbnail}`}
                      onClose={() => closeModal(index)}
                    />
                  </div>
                </div>
                <div className={styles.galleryPostLeft}>
                  <div className={styles.leftText}>
                    <div className={styles.h1Container}>
                      <h1>{album.name}</h1>
                    </div>
                    <div className={styles.paragraphContainer}>
                      <p>{album.description}</p>
                    </div>
                  </div>

                  <div className={styles.buttonContainer}>
                    <Link
                      className={styles.showMore}
                      to={`/albums/${album.name}`}
                    >
                      {translatedText("view")}
                    </Link>
                  </div>
                </div>
              </div>
              <hr></hr>
            </React.Fragment>
          ))}
        </div>
      </div>
      <FooterContainer />
    </>
  );
}
