const userRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

userRouter.post("/", async (req, res) => {
  const { username, password, name } = req.body

  if (!username || !password || password.length < 3 || username.length < 3) {
    return res.status(400).json({ error: "Invalid username or password" })
  }

  console.log("only valid username", username)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs")

  res.json(users)
})

module.exports = userRouter
