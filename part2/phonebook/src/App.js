import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const rows = () => persons.map(p => <p key={p.name}>{p.name} </p>)

  // onChange event handler
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  // onSubmit event handler
  const addPerson = (event) => {
    event.preventDefault()

    const person = {
      name: newName
    }

    setPersons(persons.concat(person))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
        
      </form>

      <h2>Numbers</h2>
      {rows()}
    </div>
  )
}

export default App