import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import styles from "./ImageCarousel.module.css";

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
  }, []);

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
      {images.map((image, index) => (
        <>
          <div key={image.fileName} className={styles.carouselimgwrapper}>
            <img
              src={`data:image/jpeg;base64,${image.base64Data}`}
              alt="Carousel Image"
              key={image.fileName}
              className={styles.carouselImg}
              draggable={false}
            />
          </div>
        </>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
