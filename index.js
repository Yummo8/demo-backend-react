const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();

const router = require("./router/index");
const errorMiddleware = require("./middlewares/error.middleware");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api/uploads", express.static("uploads"));
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(5000, async () => console.log(`server ok ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
