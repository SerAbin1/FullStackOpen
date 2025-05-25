import { useState, useEffect } from 'react'
import service from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/personForm'

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
  const [message, setMessage] = useState(null)

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
    if (persons.some((person) => person.name === newName) && newNumber !== '') {
      const existingPerson = persons.find(p => p.name === newName)
      const updatedPerson = { ...existingPerson, number: newNumber }

      if (window.confirm(`${newName} already exists. Replace the old number with a new one?`)) {
        service
          .updateNum(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setMessage(`Updated ${newName}'s number`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(`${newName} was already deleted from the server`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    return
    }

    const pers = { name: newName, number: newNumber }
    
    service
      .create(pers)
      .then(person => {
        setPersons(persons.concat(person))
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
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
      <Notification message={message} />
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

