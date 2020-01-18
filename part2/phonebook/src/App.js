import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  // const rows = () => persons.map(p => <p key={p.name}>{p.name} {p.number} </p>)

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

  // filter onChange event handler
  const handleFilter = (event) => {
    setSearch(event.target.value)
    event.target.value === '' ? setResults([])
                              : setResults(persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>

      filter shown with: <Filter search={search} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons results={results} />
    </div>
  )
}

export default App