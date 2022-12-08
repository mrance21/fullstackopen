import { useEffect, useState } from 'react'
import  Contacts from './components.js/Contacts'
import Filter from './components.js/Filter'
import Form from './components.js/Form'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [term, setTerm] = useState("")

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName}, is already in the phonebook`)
      setNewName("")
    } else if (persons.find(person => person.number === newName)) {
      alert(`${newNumber}, is already in the phonebook`)
      setNewName("")
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNewName = (event) => {
      setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleTerm = (event) => {
    setTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={term} handleTerm={handleTerm}/>
      <h3>add a new</h3>
      <Form addContact={addContact} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} term={term}/>
    </div>
  )
}

export default App