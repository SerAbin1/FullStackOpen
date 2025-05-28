const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());

app.use(morgan('tiny'))

let phonebook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
  res.json(phonebook)
})

app.get('/info', (req, res) => {
  const info = `Phonebook has info for ${phonebook.length} people`
  const time = new Date()
  res.send(info + time)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = phonebook.find(p => p.id === id)

  if(!person) {
    return res.status(204).end()
  }

  res.send(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  phonebook = phonebook.filter(p => p.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({ error: "content missing" })
  }

  if (phonebook.find(p => p.name === person.name)) {
    return res.status(400).json({ error: "name must be unique" })
  }

  const entry = {
    id: generateId(),
    name: person.name,
    number: person.number || 0,
  }

  phonebook = phonebook.concat(entry)

  res.json(entry)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

function generateId() {
  return Math.floor(Math.random() * 1884348).toString()
}
