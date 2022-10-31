const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
require("./DB/conn");
const cors = require("cors");
const User = require("./models/userSchema");
const Item = require("./models/itemSchema");
const Admin = require("./models/adminSchema");
const router = require("./routes/router");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app
  .get("/", (req, res) => {
    res.send("Hello World");
  })
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
