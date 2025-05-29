require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${phonebook.length} people`
  const time = new Date()
  res.send(info + time)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(foundPerson => {
      if (foundPerson) {
        res.json(foundPerson)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.use(morgan(':body'))

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({ error: "content missing" })
  }

 /* if (phonebook.find(p => p.name === person.name)) {
    return res.status(400).json({ error: "name must be unique" })
  } */

  const entry = new Person({
    name: person.name,
    number: person.number || 0,
  })

  entry.save().then(savedEntry => {
    res.json(savedEntry)
  })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted' })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})

