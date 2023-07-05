const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8800;
const serverIP = "localhost";

app.use(cors());

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use("", userRoutes);
app.use("", postRoutes);

app.listen(PORT, serverIP, () => {
  console.log(`Server started on ${serverIP}:${PORT}`);
});
