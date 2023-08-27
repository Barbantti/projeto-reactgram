// Imports

require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
// const mongoose = require("mongoose");

const port = process.env.PORT;

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Config cors
// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cors());

// Uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

// Routes
const router = require("./routes/Router.js");

app.use(router);

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`App working at port ${port}`);
});
