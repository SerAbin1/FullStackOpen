const express = require("express")
const app = express()
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

logger.info("Connecting to MongoDB...")
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((err) => {
    logger.error("Failed to connect to MongoDB", err.message)
  })

app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
