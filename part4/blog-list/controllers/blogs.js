require("dotenv").config()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const blogRouter = require("express").Router()

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

const getToken = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.split(" ")[1]
  }
  return null
}

blogRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(getToken(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid token" })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" })
  }

  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  //await savedBlog.populate("user", { username: 1, name: 1, id: 1 })

  response.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogRouter
