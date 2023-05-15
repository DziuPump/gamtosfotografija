const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const PORT = process.env.PORT || 6000;
const serverIP = "45.93.138.96";
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "image/*", limit: "100mb" }));
app.use(cors());

// administratoriaus duomenys
app.get("/api/users", (req, res) => {
  fs.readFile("./public/data/users.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading users file");
      return;
    }

    const users = JSON.parse(data).users;
    res.json(users);
  });
});

app.post("/api/users", (req, res) => {
  const { vardas, password } = req.body;
  const newUser = { vardas, password };
  const path = "./public/data/users.json";

  const usersFileData = fs.readFileSync(path);
  const existingUsers = JSON.parse(usersFileData).users;

  fs.readFile(path, (err, data) => {
    if (err) throw err;

    const userExists = existingUsers.some((user) => user.vardas === vardas);

    if (userExists) {
      return res.status(409).end("error 409: User already exists");
    }

    const users = JSON.parse(data).users;
    users.push(newUser);
    console.log(users);

    fs.writeFile(path, JSON.stringify({ users }), (err) => {
      if (err) throw err;
      res.send(`Vartotojas pridetas`);
    });
  });
});
// administratoriaus duomenys

//nuotrauku postinimas base 64
app.post("/api/convert/:folder", (req, res) => {
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
app.get("/api/images/:folder", (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(__dirname, "public/images", folder);

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

//postinimas albumu db
app.post("/api/albums", (req, res) => {
  const { name, thumbnail, description } = req.body;
  const albumName = name;
  const folderName = albumName.replace(/\s+/g, "-").toLowerCase();
  const route = `./public/images/album_images/${folderName}`;
  const newAlbum = { name: albumName, thumbnail, description, route };
  const filePath = "./public/data/gallery.json";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading gallery file");
      return;
    }

    const gallery = JSON.parse(data);
    const existingAlbum = gallery.albums.find(
      (album) => album.name === albumName
    );

    if (existingAlbum) {
      res.status(409).send("Albumas tokiu pavadinimu jau egzistuoja");
      return;
    }

    gallery.albums.push(newAlbum);

    fs.writeFile(filePath, JSON.stringify(gallery), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error writing gallery file");
        return;
      }
      res.send("Albumas pridetas");
    });
  });
});
//postinimas albumu db

//get albumu db
app.get("/api/albums", (req, res) => {
  console.log("visited");
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
app.use("/api/thumbnails", express.static("./public/images/thumbnail_images"));
// get albumo thumbnail

//albumo nuotraukos get
app.use(
  "/api/images",
  express.static(path.join(__dirname, "public", "images", "album_images"))
);

app.get("/api/albumimages/:folder", (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(
    __dirname,
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

app.listen(PORT, serverIP, () => {
  console.log(`Server started on ${serverIP}:${PORT}`);
});
