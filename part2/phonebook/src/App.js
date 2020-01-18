import React, { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '123-456'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const rows = () => persons.map(p => <p key={p.name}>{p.name} {p.number} </p>)

  // onChange event handler
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // onSubmit event handler
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(p => p.name === newName) != null) {

      alert(`${newName} is already added to phonebook!`)

    } else {

      const person = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(person))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
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