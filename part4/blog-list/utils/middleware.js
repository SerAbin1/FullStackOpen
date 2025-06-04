const { request, response } = require("../App")
const logger = require("./logger")
const User = require("../models/user")

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method)
  logger.info("Path:  ", req.path)
  logger.info("Body:  ", req.body)
  logger.info("---")
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.split(" ")[1]
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid token" })
  }
  return (request.user = await User.findById(decodedToken.id))
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected 'username' to be unique" })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token invalid" })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}
