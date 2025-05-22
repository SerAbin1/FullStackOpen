import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewname = (e) => {
    setNewName(e.target.value)
  }

  const addName = (e) => {
    e.preventDefault()
    const pers = persons.concat({ name: newName })
    setPersons(pers)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewname}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person => <p key={person.name}>{person.name}</p>))}
    </div>
  )
}

export default App
