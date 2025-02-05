const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./router/user.router");
const productRouter = require("./router/product.router");
const cartRouter = require("./router/cart.router");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./doc/swagger-output.json");

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

//router
//http://localhost:5000/api/docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
//upload image for local
//app.use("/upload", express.static(__dirname + "/upload"));
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
