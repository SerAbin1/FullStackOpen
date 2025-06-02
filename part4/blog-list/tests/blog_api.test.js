const assert = require("node:assert")
const { test, after, beforeEach, describe } = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../App")
const Blog = require("../models/blog")
const { title } = require("node:process")

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
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
  test("POST is successfull", async () => {
    const blog = {
      title: "bin Serr",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 3,
    }

    await api.post("/api/blogs").send(blog).expect(201)

    const response = await api.get("/api/blogs")

    const titles = response.body.map((r) => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    assert(titles.includes("bin Serr"))
  })

  test("likes property defaults to 0 if missing", async () => {
    const blog = {
      title: "bin Serr",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
    }

    const response = await api
      .post("/api/blogs")
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

    await api.post("/api/blogs").send(blog).expect(400)
  })
})

describe("deletion", () => {
  test("deletion works", async () => {
    await api.delete(`/api/blogs/${initialBlogs[0]._id}`)
    .expect(204)

    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, initialBlogs.length - 1)
  })
})

test("updation works", async () => {
    await api.put(`/api/blogs/${initialBlogs[0]._id}`)
    .send({likes: 10})
    .expect(204)

    const res = await api.get('/api/blogs')
    const updated = res.body.find(blog => blog.id === initialBlogs[0]._id)
    assert.strictEqual(updated.likes, 10)
})

after(async () => {
  await mongoose.connection.close()
})
