import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ImageCarousel from "../../components/imageCarousel/ImageCarousel";
import Spinner from "../../components/Spinner/Spinner";
import { FooterContainer } from "../../containers/footer";

function Home() {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/galerija`;
    navigate(path);
  };

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://45.93.138.96:6000/api/images/hero_images"
        );
        setImages(response.data.images);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <h1>Gamtos grožis </h1>
            <h1>pro objektyvą</h1>
            <h2>Atraskite Lietuviškos gamtos grožį</h2>
            <button className={styles.heroButton} onClick={routeChange}>
              Galerija
            </button>
          </div>
          <div>
            {loading ? (
              <Spinner />
            ) : (
              images.map((image) => (
                <img
                  onClick={() => setIsOpen(true)}
                  key={image.fileName}
                  src={`data:image/jpeg;base64,${image.base64Data}`}
                  alt="hero section image of nature"
                  className={styles.heroImg}
                />
              ))
            )}
          </div>
        </div>
        <div>
          <ImageCarousel
            folder={"http://45.93.138.96:6000/api/images/carousel_images"}
          />
        </div>
      </div>
      {!loading && <FooterContainer />}
    </>
  );
}

export default Home;
