import { useEffect, useState } from 'react'
import  Contacts from './components.js/Contacts'
import Filter from './components.js/Filter'
import Form from './components.js/Form'
import personService from './services/personService'
import Notification from './components.js/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [term, setTerm] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => setPersons(initialContacts))
  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleTerm = (event) => {
    setTerm(event.target.value)
  }


  const addContact = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName}, is already in the phone book`)
      setNewName("")
    } else if (persons.find(person => person.number === newName)) {
      alert(`${newNumber}, is already in the phone book`)
      // window.confirm(`${newNumber}, is already in the phone book`)
      // personService
      //   .update(persons)
      //   .then(newContact => {
      //     setPersons(persons.map(person => person.id !== id ? note : returnedNote))
      //     setNewName('')
      //     setNewNumber('')
      //     setSuccessMessage(
      //       `Updated '${persons.name}'`
      //     )
      //     setTimeout(() => {
      //       setSuccessMessage(null)
      //     }, 5000)
      //   })
      setNewName("")
      setNewNumber('')
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(newContact => {
          setPersons(persons.concat(newContact))
          setNewName('')
          setNewNumber('')
          setSuccessMessage(
            `Added '${personObject.name}'`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const removeContact = id => {
    if (window.confirm("Do you really want to delete this person")) {
      personService
        .remove(id)
        .then(() => {
          window.confirm(`Deleted ${persons.find((person) => person.id === id).name}`)
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((err) => alert(err))
    } else {
      return
    }
  }

  return (
    <div>
      <h2>Phone Book</h2>
      <Notification message={successMessage}/>
      <Filter term={term} handleTerm={handleTerm}/>
      <h3>add a new</h3>
      <Form addContact={addContact} newName={newName} handleNewName={handleNewName}
        newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} term={term} removeContact={removeContact} />
    </div>
  )
}

export default App