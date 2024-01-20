import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import noteService from './services/persons'
import Notification from './components/Notification'
import ErrorNotification  from './components/ErrorNotification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [searchName, setNewSearch] = useState('')
  const [newNotification, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {    
      
   noteService
   .getAll()
   .then(initialPerson => setPersons(initialPerson))
    
   }

     , []) 
        
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const showPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.every( (person) => person.name !== newName))
    { noteService
      .create(nameObject)
      .then(returnedName => {
      setPersons(persons.concat(returnedName))
     setNewName('')
     setNewNumber('')
     setNewSearch('') 
     setNotificationMessage(
      `Added ${newName}`)
     setTimeout ( () => {
      setNotificationMessage(null)
     }, 5000) 
     } 
     )

   } else { 
      const  repeatedPerson = persons.filter( (person) => person.name === newName)[0]
      const  id = repeatedPerson.id
      
      

        if (newNumber !== repeatedPerson.number)
          {
    
             if (window.confirm(`${newName} is already added on phonebook, replace the old number with a new one?`))
             {
                noteService
                .update(id, nameObject)
                .then (updatedPerson => {
                  setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
                  setNotificationMessage(`Phone number for ${newName} has been changed`)
                  setNewName('')
                  setNewNumber('')
                  setNewSearch('')
                  setTimeout( () => {
                    setNotificationMessage(null)
                  }, 5000)
                
                }
                
                ).catch (error => {
                  setErrorMessage(
                    `${newName} has already been deleted from server`
                  )
                  setTimeout( () => {
                    setErrorMessage(null)
                  }, 5000)
                  setPersons(persons.filter(p => p.id !== id))
                 })
                 
             }
           
           }  else {
    
                  alert(`${newName} with number: ${newNumber} has already been added`)}

         }

  }



const deletePersons = id => {
  const url = `http://localhost:3001/persons/${id}`
  const person = persons.find(p => p.id === id)
 

  if (window.confirm(`Do you want to delete ${person.name}?`)) {

  noteService
  .remove(url)
  .then(deletedPerson => {
    setPersons(persons.filter(p => p.id !== deletedPerson.id))

    setNotificationMessage(`${person.name} has been deleted`)
    setNewName('')
    setNewNumber('')
    setTimeout( () => {
      setNotificationMessage(null)
    }, 5000)
  })
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {newNotification}/>
      <ErrorNotification message = {errorMessage}/>
      <Filter value={searchName} onChange={handleSearchChange}/>
      <h2>add a New</h2>
      <PersonForm addName= {addName} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons persons={showPersons} deleteButton={deletePersons}/>
    </div>
  )
}

export default App