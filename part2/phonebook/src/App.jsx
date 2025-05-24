import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ searchTerm, handleSearchChange }) => (
  <div>
    filter shown with <input value={searchTerm} onChange={handleSearchChange} />
  </div>
)

const PersonForm = ({
  newName,
  newNumber,
  handleNewname,
  handleNewNumber,
  addPerson
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNewname} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNewNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ personsToShow }) => (
  <>
    {personsToShow.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNewname = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addPerson = (e) => {
    e.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added`)
      return
    }
    const pers = { name: newName, number: newNumber }
    setNewName('')
    setNewNumber('')

    axios
      .post("http://localhost:3001/persons", pers)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
      })
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNewname={handleNewname}
        handleNewNumber={handleNewNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App

