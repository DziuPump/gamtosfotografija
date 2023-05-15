import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./AlbumImages.module.css";

function AlbumImages() {
  const { albumId } = useParams();
  const route = decodeURIComponent(albumId).replace(/\s+/g, "-").toLowerCase();
  const [albumImages, setAlbumImages] = useState([]);

  useEffect(() => {
    const fetchAlbumImages = async () => {
      try {
        const response = await axios.get(
          `http://45.93.138.96:6000/api/albumimages/${route}`
        );
        setAlbumImages(response.data.images);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlbumImages();
  }, [albumId, route]);

  return (
    <div>
      {albumImages.map((image) => {
        return (
          <img
            key={image.fileName}
            src={`http://45.93.138.96:6000/api${image.imageUrl}`}
            alt="Album Image"
          />
        );
      })}
    </div>
  );
}

export default AlbumImages;
