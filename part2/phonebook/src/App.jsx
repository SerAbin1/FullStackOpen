import { useState, useEffect } from 'react'
import service from './services/persons'

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

const Persons = ({ personsToShow, deletePerson }) => (
  <>
    {personsToShow.map((person) => (
      <p key={person.name}>
        {person.name} {person.number} {<button onClick={() => deletePerson(person.id, person.name)}>delete</button>}
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
    service
      .getAll()
      .then(response => {
        setPersons(response)
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
    
    service
      .create(pers)
      .then(person => {
        setPersons(persons.concat(person))
      })
  }

  const deletePersonOf = (id, name) => {
    if(window.confirm(`Do you really want to delete ${name}?`)){
      service
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    
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
      <Persons personsToShow={personsToShow} deletePerson={deletePersonOf} />
    </div>
  )
}

export default App

