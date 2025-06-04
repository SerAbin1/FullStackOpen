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

blogRouter.post("/", async (request, response) => {
  const user = await User.findOne()

  const blog = new Blog({ ...request.body, user: user._id })

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  await result.populate("user", { username: 1, name: 1, id: 1 })

  response.status(201).json(result)
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
