import { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

// 2.15 tähtitehtävä puuttuu

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`error ${message ? 'show' : ''}`}>
      {message}
    </div>
  )
}

const Numbers = ({ filteredPersons, setPersons, persons }) => {

  const handleDelete = (id) => {
    console.log('Yritetään poistaa', id)
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    console.log('poistettu', id)
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>ID</th>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersons.map(person =>
            <tr key={person.name}>
              <td style={{ paddingRight: '1em' }}>{person.id}</td>
              <td style={{ paddingRight: '1em' }}>{person.name}</td>
              <td style={{ paddingRight: '1em' }}>{person.number}</td>
              <td><button onClick={() => handleDelete(person.id)}>Delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const Etsi = ({ persons, setPersons }) => {

  const [filtteri, setNewFiltteri] = useState('')
  const handleFilter = (event) => {
    setNewFiltteri(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filtteri.toLowerCase()))

  return (
    <div>
      find: <input value={filtteri} onChange={handleFilter} />
      <Numbers filteredPersons={filteredPersons} setPersons={setPersons} persons={persons} />
    </div>

  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNum = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    console.log(personObject.name.length)
  
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${newName} is already in phonebook`)
      console.log('popup nyt')
    } else if (personObject.name.length < 3) {
      alert('name has to be at least 3 characters')
      return;
    } else if (personObject.number.length < 3) {
        alert('phonenumber has to be at least 3 numbers')
    } else {
      setPersons(persons.concat(personObject))
      console.log('lisätty ', personObject)
      console.log('lista', persons)
  
      setErrorMessage(
        `Contact '${newName}' succesfully added!`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  

  // tämä app sisällä vaan koska suoritetaan heti kun käynnistetään
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        console.log('nämä tulee getAll kutsulla palvelimelta = response.data', response.data)
      })
  }, [])



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <h3>Add a new</h3>
      <form>
        <table>
          <tr>
            <td>
              Name: <input value={newName} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>
              Number: <input value={newNumber} onChange={handleChangeNum} />
            </td>
          </tr>
          <div>
            <button onClick={addPerson} type="submit">Add</button>
          </div>
        </table>
      </form>
      <h3>Contacts</h3>
      <Etsi persons={persons} setPersons={setPersons} />
    </div>
  )

}

export default App