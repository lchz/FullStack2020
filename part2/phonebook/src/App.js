import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  // Fetch data from json-server
  useEffect(() => {
    axios.get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
  }, [])

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