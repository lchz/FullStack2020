import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/peopleService'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [notification, setNotification] = useState('')

  // Fetch data from json-server
  useEffect(() => {
    peopleService.getAll()
      .then(objects => setPersons(objects))
  }, [])

  // onChange event handler
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  /** Create new person, onSubmit event handler*/ 
  const addPerson = (event) => {
    event.preventDefault()

    const p = persons.find(pe => pe.name === newName)

    if (p != null) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...p, number: newNumber }
        peopleService.replaceNumber(p.id, changedPerson)
                      .then (returnedPerson => setPersons(
                        persons.map(person => person.id !== p.id ? person : returnedPerson)
                      ))
                      .catch (error => {
                        if (error) {
                          setNotification(`Information of ${p.name} has already been removed from server`)
                          setPersons(persons.filter(person => person.id !== p.id))
                        } else {
                          setNotification(`Replaced ${p.name}'s number`)
                        }
                      })
      }
      
    } else {
      const person = {
        name: newName,
        number: newNumber
      }

      peopleService.create(person)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNotification(`Added ${newName}`)
        }) 
        .catch(error => {
          setNotification(error.response.data.error)
          // console.log(error.response.data.error)
        })
      
    }

    setTimeout(() => {setNotification(null)}, 5000)
    setNewName('')
    setNewNumber('')
  }

  // filter onChange event handler
  const handleFilter = (event) => {
    setSearch(event.target.value)
    setResults(persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  // DELETE button handler
  const deletingHandler = (id) => {
    const deleting = persons.find(p => p.id === id)
    
    if (window.confirm(`Delete ${deleting.name}?`)) {
      peopleService.deletePerson(id)
                    .then(setPersons(persons.filter(p => p.id !== id)))

      setNotification(`Deleted ${deleting.name}`)
      setTimeout(() => {setNotification(null)}, 5000);
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />

      filter shown with: <Filter search={search} handleFilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons results={results} persons={persons} search={search} deletingHandler={deletingHandler} />
    </div>
  )
}

export default App