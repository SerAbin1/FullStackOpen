require("dotenv").config()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const blogRouter = require("express").Router()
const middleware = require("../utils/middleware")

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = await User.findById(request.user)

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" })
  }

  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === request.user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
    } else {
      return response
        .status(401)
        .json({ error: "You are not authorized to delete this blog" })
    }
    response.status(204).end()
  },
)

blogRouter.put("/:id", async (request, response) => {
  const newBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true },
  )
  response.status(200).json(newBlog)
})

module.exports = blogRouter
