import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./BlogPage.module.css";
import { Link } from "react-router-dom";

import { FooterContainer } from "../../containers/footer";
import { TranslationContext } from "../../components/TranslationContext/TranslationContext";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://api.gamtosfotografija.lt/api/blog"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  const { translatedText } = useContext(TranslationContext);
  return (
    <>
      <div className={styles.blogWrapper}>
        <div className={styles.blogContentWrapper}>
          {blogs.map((blog, index) => (
            <div className={styles.blogPost} key={index}>
              <Link className={styles.blogReadMore2} to={`/blog/${blog.name}`}>
                {translatedText("readMore")}
              </Link>
              <div className={styles.blogPostLeft}>
                <img
                  src={`https://api.gamtosfotografija.lt/api/blogthumbnails/${blog.thumbnail}`}
                  className={styles.blogImg}
                ></img>
              </div>
              <div className={styles.blogPostRight}>
                <h3 className={styles.blogTopic}>{blog.subject}</h3>
                <div className={styles.blogText}>
                  <h2 className={styles.blogPostHeader}>{blog.name}</h2>
                  <p className={styles.blogIntro}>{blog.description}</p>
                </div>
                <Link className={styles.blogReadMore} to={`/blog/${blog.name}`}>
                  {translatedText("readMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterContainer />
    </>
  );
}
