import React, { useContext } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

import ImageCarousel from "../../components/imageCarousel/ImageCarousel";
// import Spinner from "../../components/Spinner/Spinner";
import { FooterContainer } from "../../containers/footer";

import heroImage from "../../images/Utenos rytas panorama.jpg";

import { TranslationContext } from "../../components/TranslationContext/TranslationContext";

function Home() {
  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/galerija`;
    navigate(path);
  };

  // const [images, setImages] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://api.gamtosfotografija.lt/api/images/hero_images"
  //       );
  //       setImages(response.data.images);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching images:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchImages();
  // }, []);

  const { changeLanguage, translatedText } = useContext(TranslationContext);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.heroContainer}>
          <div className={styles.heroText}>
            <h1>{translatedText("hero1")} </h1>
            <h1>{translatedText("hero2")}</h1>
            <h2>{translatedText("hero3")}</h2>
            <button className={styles.heroButton} onClick={routeChange}>
              {translatedText("gallery")}
            </button>
          </div>
          <div>
            <img
              src={heroImage}
              alt="panorama shot of utena in the morning"
              className={styles.heroImg}
            />
          </div>
        </div>
        <div>
          <ImageCarousel
            folder={
              "https://api.gamtosfotografija.lt/api/images/carousel_images"
            }
          />
        </div>
      </div>
      <FooterContainer />
    </>
  );
}

export default Home;
