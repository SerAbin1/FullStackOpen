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

export default PersonForm
