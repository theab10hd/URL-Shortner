require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./src/routes/auth.routes");
const urlRoutes = require("./src/routes/url.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/", urlRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected!");
    app.listen(PORT, () => {
      console.log(`Server Started at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database Connection Error:", error);
    process.exit(1);
  });
