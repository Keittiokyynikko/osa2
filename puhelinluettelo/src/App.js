import React, {useState, useEffect} from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm'
import personService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [changeMessage, setChangeMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

//Datan hakeminen json-serveriltä

  useEffect(() => {
    personService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

//--------

//Uuden tiedon lisääminen serverille

  const addContact = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }
    const sameName = (element) => element.name === newName
    const testi = persons.some(sameName)
    const sameNumber = (element) => element.number === newNumber
    const testi2 = persons.some(sameNumber)
    const person = persons.find(person => person.name === newName)
    const changedNumber = {...person, number: newNumber}
    console.log(persons.some(sameName))

    if(testi === true && testi2 === false) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        personService
          .update(person.id, changedNumber)
          .then(returnedContact => {
            setPersons(persons.map(person => person.name !== nameObject.name ? person : returnedContact))
            setNewName('')
            setNewNumber('')
          })
          .then(error => {
            setChangeMessage(
              `Number's change for ${newName} committed`
            )
            setTimeout(() => {
              setChangeMessage('')
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage('')
            }, 5000)
          })
      }

    } else if(testi === true) {
        window.alert(`${newName} is already added to phonebook`)

    } else {
      personService
        .create(nameObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
        .then(error => {
          setChangeMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setChangeMessage('')
          }, 5000)
        })
    }
  }

//--------

//Yhteystiedon poistaminen

  const deletePerson = (id, name) => {

    if(window.confirm(`Delete ${name} ?`)) {
      personService
        .deletePerson(id, name)
        setPersons(persons.filter(person => person.id !== id))
        setChangeMessage(
            `${name} deleted`
          )
          setTimeout(() => {
            setChangeMessage('')
          }, 5000)
    }


  }

//--------

//Muutosilmoituksen käsittely

const Notification = ({message}) => {
  if (message === '') {
    return null;
  } else {
    return (
      <div className="change">
        {message}
      </div>
    )
  }

}

//--------

//Virheilmoituksen käsittely

const Error = ({message}) => {
  if (message === '') {
    return null;
  } else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

}

//--------

//Yhteystietojen ja hakujen käsittelyt

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

//--------

return (
  <>
    <h2>Phonebook</h2>

    <Notification message={changeMessage}/>
    <Error message={errorMessage}/>

    <Filter handleSearch={handleSearch}/>

    <PersonForm adder={addContact} name={newName} nameHand={handleNameChange}
    num={newNumber} numHand={handleNumberChange}/>

    <h3>Numbers</h3>

    {persons.filter(person =>
      person.content.includes(newSearch))
        .map((filteredName) =>
          <Persons
              key = {filteredName.id}
          	  person = {filteredName}
              deletePerson={() => deletePerson(filteredName.id, filteredName.name)}
          />
        )
    }

  </>
)

}

export default App;
