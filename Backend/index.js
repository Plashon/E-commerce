const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

//create app
const app = express();
//connect data base
try {
  mongoose.connect(DB_URL);
  console.log("connect to mongo db successfully");
} catch (error) {
  console.log("connect failed " + error);
}
//allow web can connect app
app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>welcome to se npru web blog e-commerce restful api</h1>");
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
