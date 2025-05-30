const express = require("express");
const app = express();
const blogRouter = require("./controllers/blogs");
const config = require("./utils/config");
const logger = require('./utils/requestLogger');
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("Connecting to MongoDB...");
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB", err.message);
  });

app.use(express.json());

app.use("/api/blogs", blogRouter);

module.exports = app;
