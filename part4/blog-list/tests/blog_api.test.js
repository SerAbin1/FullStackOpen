const assert = require("node:assert")
const { test, after, beforeEach, describe } = require("node:test")
const supertest = require("supertest")
const bcrypt = require("bcrypt")
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

const app = require("../App")
const Blog = require("../models/blog")
const User = require("../models/user")

const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
]

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("sekret", 10)
  const user = new User({ username: "root", passwordHash })
  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)

  const blog1 = new Blog({ ...initialBlogs[0], user: savedUser._id })
  const blog2 = new Blog({ ...initialBlogs[1], user: savedUser._id })

  await blog1.save()
  await blog2.save()
})

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test("id is id, not _id", async () => {
  const response = await api.get("/api/blogs")
  const blogs = response.body

  for (const blog of blogs) {
    assert.ok(blog.id, "'id' should be defined")
    assert.strictEqual(blog._id, undefined, "'_id' should be undefined")
  }
})

describe("POST", () => {
  test("POST is successful with valid token", async () => {
    const blog = {
      title: "bin Serr",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 3,
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(201)

    const response = await api.get("/api/blogs")
    const titles = response.body.map((r) => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes("bin Serr"))
  })

  test("POST fails with 401 if token not provided", async () => {
    const blog = {
      title: "bin Serr",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 3,
    }

    await api.post("/api/blogs").send(blog).expect(401)
  })

  test("likes property defaults to 0 if missing", async () => {
    const blog = {
      title: "bin Serr",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    }

    const response = await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test("title or url missing, 400 bad req response", async () => {
    const blog = {
      title: "bin Serr",
      author: "Michael Chan",
    }

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(blog)
      .expect(400)
  })
})

describe("deletion", () => {
  test("deletion works with valid token and ownership", async () => {
    const blogsAtStart = await api.get("/api/blogs")
    const blogToDelete = blogsAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204)

    const res = await api.get("/api/blogs")
    assert.strictEqual(res.body.length, initialBlogs.length - 1)
  })
})

test("updation works", async () => {
  const blogsAtStart = await api.get("/api/blogs")
  const blogToUpdate = blogsAtStart.body[0]

  await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 10 }).expect(204)

  const res = await api.get("/api/blogs")
  const updated = res.body.find((blog) => blog.id === blogToUpdate.id)
  assert.strictEqual(updated.likes, 10)
})

after(async () => {
  await mongoose.connection.close()
})
