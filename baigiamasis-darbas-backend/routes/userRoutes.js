const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersData = require("../public/data/users.json");

router.use(bodyParser.json({ limit: "100mb" }));
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.raw({ type: "image/*", limit: "100mb" }));

router.post("/api/authenticate", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    res.sendStatus(200);
  });
});

//visi admin user
router.get("/api/users", (req, res) => {
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
//visi admin user

//admin registracija
router.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = { username, password };
  const path = "./public/data/users.json";

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading users file");
      return;
    }

    const existingUsers = JSON.parse(data).users;
    const userExists = existingUsers.some((user) => user.username === username);

    if (userExists) {
      return res.status(409).send("User already exists");
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error hashing password");
        return;
      }

      newUser.password = hashedPassword;

      existingUsers.push(newUser);

      fs.writeFile(path, JSON.stringify({ users: existingUsers }), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send("Error writing to users file");
          return;
        }

        res.sendStatus(200);
      });
    });
  });
});
//admin registracija

// admin login
router.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = usersData.users.find((user) => user.username === username);

  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error comparing passwords");
      return;
    }

    if (result) {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});
//admin login

module.exports = router;
