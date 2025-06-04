const { test, after, beforeEach, describe } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const bcrypt = require("bcrypt")

const app = require("../App")
const api = supertest(app)

const User = require("../models/user")
const helper = require("./test_helper")

describe("user creation validation", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })
    await user.save()
  })

  test("fails if username is shorter than 3 chars", async () => {
    const newUser = {
      username: "ro",
      name: "Short Name",
      password: "validpass",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)

    assert.match(result.body.error, /username/i)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test("fails if password is shorter than 3 chars", async () => {
    const newUser = {
      username: "validuser",
      name: "Short Password",
      password: "pw",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test("fails if username is missing", async () => {
    const newUser = {
      name: "No Username",
      password: "validpass",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test("fails if password is missing", async () => {
    const newUser = {
      username: "missingpass",
      name: "No Password",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test("fails if username is not unique", async () => {
    const newUser = {
      username: "root",
      name: "Duplicate User",
      password: "validpass",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 1)
  })

  test("succeeds with valid username and password", async () => {
    const newUser = {
      username: "newuser",
      name: "Valid User",
      password: "strongpass",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, 2)

    const usernames = usersAtEnd.map((u) => u.username)
    assert(usernames.includes("newuser"))
  })
})

after(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
