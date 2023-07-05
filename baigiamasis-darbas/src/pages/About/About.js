import React, { useContext } from "react";

import styles from "./About.module.css";
import { FooterContainer } from "../../containers/footer";

import person from "../../images/Dziugui-1-min.JPG";
import drone from "../../images/dronas.png";
import camera from "../../images/nikon_d750.jpeg";
import NikonZ50 from "../../images/nikon_z50.jpeg";

import { TranslationContext } from "../../components/TranslationContext/TranslationContext";

export default function About() {
  const { translatedText } = useContext(TranslationContext);
  return (
    <>
      <div className={styles.aboutContainer}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutIntroduction}>
            <div className={styles.introductionLeft}>
              <img
                src={person}
                alt="photographer"
                className={styles.introImg}
              />
            </div>
            <div className={styles.introductionRight}>
              <h2 className={styles.righth2}>
                Tomas Pumputis <br /> Utena, Lietuva
              </h2>
              <p>{translatedText("aboutMe")}</p>
            </div>
          </div>
          <hr className={styles.abouthr}></hr>
          <div className={styles.irankiai}>
            <div className={styles.irankiaiContainer}>
              <h1>{translatedText("photographyEquipment")}</h1>
              <div className={styles.irankiaiWrapper}>
                <div className={styles.firstRowTop}>
                  <hr className={styles.abouthritem}></hr>
                  <img src={drone} className={styles.TopImage} />
                  <div className={styles.topTekstas}>
                    <h2>{translatedText("drone")}</h2>
                    <h1>DJI Mini2</h1>
                  </div>
                </div>

                <div className={styles.secondRowTop}>
                  <hr className={styles.abouthritem}></hr>
                  <img src={NikonZ50} className={styles.TopImage} />
                  <div className={styles.topTekstas}>
                    <h2>{translatedText("camera")}</h2>
                    <h1>Nikon Z50</h1>
                  </div>
                </div>

                <div className={styles.thirdRowTop}>
                  <hr className={styles.abouthritem}></hr>
                  <img src={camera} className={styles.TopImage} />
                  <div className={styles.topTekstas}>
                    <h2>{translatedText("camera")}</h2>
                    <h1>Nikon D750</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterContainer />
    </>
  );
}
