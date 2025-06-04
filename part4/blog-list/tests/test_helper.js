const User = require('../models/user')
const Blog = require('../models/blog')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const notesInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  notesInDb, usersInDb
}
