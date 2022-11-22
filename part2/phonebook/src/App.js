import { useState } from 'react'
import  Contacts from './components.js/Contacts'
import Filter from './components.js/Filter'
import Form from './components.js/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [term, setTerm] = useState("")

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