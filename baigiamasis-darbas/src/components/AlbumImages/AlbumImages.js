import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./AlbumImages.module.css";
import { FooterContainer } from "../../containers/footer";
import PhotoModal from "../PhotoModal/PhotoModal";

function AlbumImages(props) {
  const { albumId } = useParams();
  const route = decodeURIComponent(albumId).replace(/\s+/g, "-").toLowerCase();
  const [albumImages, setAlbumImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const albumName =
    route.charAt(0).toUpperCase() + route.slice(1).replace(/-/g, " ");
  useEffect(() => {
    const fetchAlbumImages = async () => {
      try {
        const response = await axios.get(
          `https://api.gamtosfotografija.lt/api/albumimages/${route}`
        );
        setAlbumImages(response.data.images);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbumImages();
  }, [albumId, route]);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.albumContainer}>
        <div className={styles.albumTop}>
          <h1 className={styles.albumName}>{albumName}</h1>
        </div>
        <div className={styles.albumImages}>
          {albumImages.map((image, index) => {
            return (
              <div className={styles.imgWrapper} key={image.fileName}>
                <img
                  src={`https://api.gamtosfotografija.lt/api${image.imageUrl}`}
                  alt={`Album ${image.fileName}`}
                  onClick={() => openModal(index)}
                  className={styles.albumImg}
                />
              </div>
            );
          })}
        </div>
      </div>
      {selectedImageIndex !== null && (
        <PhotoModal
          open={modalOpen}
          imageUrl={`https://api.gamtosfotografija.lt/api${albumImages[selectedImageIndex].imageUrl}`}
          onClose={closeModal}
        />
      )}
      <FooterContainer />
    </>
  );
}

export default AlbumImages;
