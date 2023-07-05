import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import styles from "./ImageCarousel.module.css";

import karusele1 from "../../images/Karusele_1.jpg";
import karusele2 from "../../images/karusele_2.jpg";
import karusele3 from "../../images/karusele_3.jpg";
import karusele4 from "../../images/karusele_4.jpg";
import karusele5 from "../../images/karusele_5.jpg";
import karusele6 from "../../images/karusele_6.jpg";

const ImageCarousel = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(props.folder);
        setImages(response.data.images);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [props.folder]);

  const carouselResponsiveConfig = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 580, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      arrows={false}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      responsive={carouselResponsiveConfig}
    >
      <div className={styles.carouselimgwrapper}>
        <img
          src={karusele1}
          alt={`Northern lights`}
          className={styles.carouselImg}
          draggable={false}
        />
      </div>
      <div className={styles.carouselimgwrapper}>
        <img
          src={karusele2}
          alt={`Lightning strike`}
          className={styles.carouselImg}
          draggable={false}
        />
      </div>
      <div className={styles.carouselimgwrapper}>
        <img
          src={karusele3}
          alt={`Curious squirell`}
          className={styles.carouselImg}
          draggable={false}
        />
      </div>
      <div className={styles.carouselimgwrapper}>
        <img
          src={karusele4}
          alt={`Foggy view of forest`}
          className={styles.carouselImg}
          draggable={false}
        />
      </div>
      <div className={styles.carouselimgwrapper}>
        <img
          src={karusele5}
          alt={`Old monastery from afar`}
          className={styles.carouselImg}
          draggable={false}
        />
      </div>
      <div className={styles.carouselimgwrapper}>
        <img
          src={karusele6}
          alt={`Pine tree in winter`}
          className={styles.carouselImg}
          draggable={false}
        />
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
