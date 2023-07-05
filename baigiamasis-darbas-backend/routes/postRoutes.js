const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

router.use(bodyParser.json({ limit: "100mb" }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.raw({ type: "image/*", limit: "100mb" }));

//albumo nuotrauku saugojimas
const albumStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, "./public/images/thumbnail_images");
    } else {
      const folder = req.body.name.toLowerCase().replace(/ /g, "-");
      const albumPath = `./public/images/album_images/${folder}`;
      if (!fs.existsSync(albumPath)) {
        fs.mkdirSync(albumPath, { recursive: true });
      }
      cb(null, albumPath);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: albumStorage });

//albumo nuotrauku saugojimas

//blogo thumbnailo saugojimas
const blogThumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/blog_thumbnails");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadThumbnail = multer({ storage: blogThumbnailStorage });

//blogo thumbnailo saugojimas

const galleryDataPath = path.join(__dirname, "../public/data/gallery.json");

//tokeno autentifikavimas/autorizacija
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    next();
  });
}
//tokeno autentifikavimas/autorizacija

//nuotrauku postinimas base 64
router.post("/api/convert/:folder", (req, res) => {
  const base64Image = req.body.toString("base64");
  const folder = req.params.folder;

  const folderPath = path.join(__dirname, "images", folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const fileName = `image_${Date.now()}.jpg`;
  const imagePath = path.join(folderPath, fileName);

  fs.writeFileSync(imagePath, base64Image, "base64");

  res.json({ success: true, message: "Nuotrauka issaugota." });
});
//nuotrauku postinimas base 64

//nuotrauku get base 64
router.get("/api/images/:folder", (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(__dirname, "../public/images", folder);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const imagePromises = files.map((file) => {
      const filePath = path.join(folderPath, file);
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, { encoding: "base64" }, (err, data) => {
          if (err) {
            console.error("Error reading file:", err);
            return reject(err);
          }
          resolve({ fileName: file, base64Data: data });
        });
      });
    });

    Promise.all(imagePromises)
      .then((images) => {
        res.json({ images });
      })
      .catch((err) => {
        console.error("Error processing images:", err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
});
//nuotrauku get base 64

//get albumu db
router.get("/api/albums", (req, res) => {
  fs.readFile("./public/data/gallery.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading gallery file");
      return;
    }

    const gallery = JSON.parse(data);
    res.json(gallery.albums);
  });
});
//get albumu db

// get albumo thumbnail
router.use(
  "/api/thumbnails",
  express.static("./public/images/thumbnail_images")
);
// get albumo thumbnail

//albumo nuotraukos get
router.use(
  "/api/images",
  express.static(path.join(__dirname, "..", "public", "images", "album_images"))
);

router.get("/api/albumimages/:folder", (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(
    __dirname,
    "..",
    "public",
    "images",
    "album_images",
    folder
  );

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const images = files.map((file) => {
      const imageUrl = `/images/${folder}/${file}`;
      return { fileName: file, imageUrl };
    });

    res.json({ images });
  });
});
//albumo nuotraukos get

//naujo albumo sukurimas
router.post(
  "/api/newalbum",
  authenticateToken,
  upload.fields([
    { name: "images", maxCount: undefined },
    { name: "thumbnail", maxCount: 1 },
  ]),
  (req, res) => {
    const { name, description } = req.body;
    const images = req.files.images;
    const thumbnail = req.files.thumbnail[0]?.filename || "";
    const albumFolder = name.toLowerCase().replace(/ /g, "-");
    const albumRoute = `./public/images/album_images/${albumFolder}`;

    const newAlbum = {
      name,
      thumbnail,
      description,
      route: albumRoute,
    };

    const filePath = "./public/data/gallery.json";

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Klaida skaitant galerijos duomenų failą");
        return;
      }

      const gallery = JSON.parse(data);
      const existingAlbum = gallery.albums.find((album) => album.name === name);

      if (existingAlbum) {
        res.status(409).send("Albumas tokiu pavadinimu jau egzistuoja");
        return;
      }

      gallery.albums.unshift(newAlbum);

      fs.writeFile(filePath, JSON.stringify(gallery), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Klaida saugant galerijos duomenų failą");
          return;
        }
        const thumbnailFolder = "./public/images/thumbnail_images";
        const thumbnailPath = path.join(thumbnailFolder, thumbnail);

        if (!fs.existsSync(thumbnailFolder)) {
          fs.mkdirSync(thumbnailFolder, { recursive: true });
        }

        const albumFolderPath = path.join(
          "./public/images/album_images",
          albumFolder
        );

        if (!fs.existsSync(albumFolderPath)) {
          fs.mkdirSync(albumFolderPath, { recursive: true });
        }

        fs.copyFile(req.files["thumbnail"][0].path, thumbnailPath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).send("Klaida saugant thumbnail nuotrauką");
            return;
          }

          images.forEach((image) => {
            const imageDestPath = path.join(albumFolderPath, image.filename);
            fs.renameSync(image.path, imageDestPath);
          });

          res.send("Albumas sukurtas sėkmingai :)");
        });
      });
    });
  }
);
//naujo albumo sukurimas

//albumo trinimas
router.delete("/api/albums", authenticateToken, (req, res) => {
  const { name } = req.body;

  fs.readFile(galleryDataPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Error deleting album." });
    } else {
      let galleryData = JSON.parse(data);
      const albums = galleryData.albums;

      const albumIndex = albums.findIndex((album) => album.name === name);
      if (albumIndex !== -1) {
        const album = albums[albumIndex];
        albums.splice(albumIndex, 1);

        if (album.thumbnail) {
          const thumbnailPath = `./public/images/thumbnail_images/${album.thumbnail}`;
          fs.unlink(thumbnailPath, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }

        const routePath = `${album.route}`;
        fs.rmdir(routePath, { recursive: true }, (err) => {
          if (err) {
            console.error(err);
          }
        });

        fs.writeFile(galleryDataPath, JSON.stringify(galleryData), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({
              success: false,
              message: "Klaida bandant istrinti albuma",
            });
          } else {
            res
              .status(200)
              .json({ success: true, message: "Albumas istrintas sekmingai" });
          }
        });
      } else {
        res.status(404).json({ success: false, message: "Albumas nerastas" });
      }
    }
  });
});
//albumo trinimas

//albumo update
router.put(
  "/api/albums/:name",
  authenticateToken,
  upload.fields([{ name: "thumbnail", maxCount: 1 }, { name: "images" }]),
  (req, res) => {
    const albumName = req.params.id;

    // Read the gallery.json file
    fs.readFile(galleryDataPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading gallery.json:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      try {
        const galleryData = JSON.parse(data);

        const album = galleryData.albums.find(
          (album) => album.id === albumName
        );

        if (!album) {
          return res.status(404).json({ error: "Album not found" });
        }

        album.name = req.body.name;
        album.description = req.body.description;

        if (req.files["thumbnail"]) {
          const thumbnail = req.files["thumbnail"][0];
          album.thumbnail = thumbnail.filename;
        }

        if (req.files["images"]) {
          const images = req.files["images"].map((image) => image.filename);
          album.images = [...album.images, ...images];
        }

        fs.writeFile(galleryDataPath, JSON.stringify(galleryData), (err) => {
          if (err) {
            console.error("Error writing gallery.json:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          res.json({ success: true });
        });
      } catch (error) {
        console.error("Error parsing gallery.json:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
);

//albumo update

//blog kurimas

const blogPath = path.join(__dirname, "../public/data/blog.json");

if (!fs.existsSync(blogPath)) {
  fs.writeFileSync(blogPath, "[]");
}

router.post(
  "/api/blog",
  authenticateToken,
  uploadThumbnail.single("thumbnail"),
  (req, res) => {
    const { name, subject, description, content } = req.body;
    const thumbnail = req.file.filename || "";

    const newBlog = {
      name,
      subject,
      description,
      thumbnail,
      content,
    };

    const blogsData = fs.readFileSync(blogPath, "utf-8");
    const blogs = JSON.parse(blogsData);

    const existingBlog = blogs.blogs.find((blog) => blog.name === name);
    if (existingBlog) {
      return res
        .status(400)
        .json({ error: "Blog'as tokiu pavadinimu jau egzistuoja" });
    }

    blogs.blogs.unshift(newBlog);
    fs.writeFileSync(blogPath, JSON.stringify(blogs));

    res.status(200).json({ message: "Blog'as sukurtas!" });
  }
);
//blog kurimas

//blog get
router.get("/api/blog", (req, res) => {
  fs.readFile(blogPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const blogData = JSON.parse(data);
    res.json(blogData.blogs);
  });
});
//blog get

//blog editinimas
router.put("/api/blog/:name", authenticateToken, (req, res) => {
  const blogName = req.params.name;
  console.log(blogName);
  console.log(req.body);

  const { newName, subject, description, content } = req.body;

  fs.readFile(blogPath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read blog.json:", err);
      return res.status(500).json({ error: "Failed to update blog post" });
    }

    try {
      const blogData = JSON.parse(data);
      const blogIndex = blogData.blogs.findIndex(
        (blog) => blog.name === blogName
      );

      if (blogIndex !== -1) {
        if (newName) {
          blogData.blogs[blogIndex].name = newName;
        }
        if (subject) {
          blogData.blogs[blogIndex].subject = subject;
        }
        if (description) {
          blogData.blogs[blogIndex].description = description;
        }
        if (content) {
          blogData.blogs[blogIndex].content = content;
        }

        const updatedData = JSON.stringify(blogData, null, 2);

        fs.writeFile(blogPath, updatedData, "utf8", (err) => {
          if (err) {
            console.error("Failed to write to blog.json:", err);
            return res
              .status(500)
              .json({ error: "Failed to update blog post" });
          }

          res.json({ message: "Blog post updated successfully" });
        });
      } else {
        res.status(404).json({ error: "Blog post not found" });
      }
    } catch (error) {
      console.error("Failed to parse blog.json:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });
});
//blog editinimas

//blog delete
router.delete("/api/blog/:name", authenticateToken, (req, res) => {
  const blogName = req.params.name;

  fs.readFile(blogPath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read blog.json:", err);
      return res.status(500).json({ error: "Failed to delete blog post" });
    }

    try {
      const blogData = JSON.parse(data);

      const blogIndex = blogData.blogs.findIndex(
        (blog) => blog.name === blogName
      );

      if (blogIndex !== -1) {
        const thumbnailPath = path.join(
          __dirname,
          "../public/images/blog_thumbnails",
          blogData.blogs[blogIndex].thumbnail
        );
        fs.unlink(thumbnailPath, (err) => {
          if (err) {
            console.error("Failed to delete blog thumbnail:", err);
          }
        });

        blogData.blogs.splice(blogIndex, 1);

        const updatedData = JSON.stringify(blogData, null, 2);

        fs.writeFile(blogPath, updatedData, "utf8", (err) => {
          if (err) {
            console.error("Failed to write to blog.json:", err);
            return res
              .status(500)
              .json({ error: "Failed to delete blog post" });
          }

          res.json({ message: "Blog post deleted successfully" });
        });
      } else {
        res.status(404).json({ error: "Blog post not found" });
      }
    } catch (error) {
      console.error("Failed to parse blog.json:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });
});
//blog delete

//blogo thumbnailas
router.use(
  "/api/blogthumbnails",
  express.static("./public/images/blog_thumbnails")
);
//blogo thumbnailas

//blogo contentas
router.get("/api/blog/:name", (req, res) => {
  const blogName = req.params.name;

  fs.readFile(blogPath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read blog.json:", err);
      return res.status(500).json({ error: "Failed to retrieve blog content" });
    }

    try {
      const blogData = JSON.parse(data);

      const blog = blogData.blogs.find((blog) => blog.name === blogName);

      if (blog) {
        const content = JSON.parse(blog.content);
        res.json({ content });
      } else {
        res.status(404).json({ error: "Blog not found" });
      }
    } catch (error) {
      console.error("Failed to parse blog.json:", error);
      res.status(500).json({ error: "Failed to retrieve blog content" });
    }
  });
});
//blogo contentas

module.exports = router;
