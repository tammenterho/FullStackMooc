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
      {filteredPersons.map(person =>
        <p key={person.name}>
          <span style={{fontWeight: 'bold'}}>ID:</span> {person.id} {' '}
          <span style={{fontWeight: 'bold'}}>Nimi:</span> {person.name} {' '}
          <span style={{fontWeight: 'bold'}}>Numero:</span> {person.number} {'   '}
        <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      )}
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
      etsi: <input value={filtteri} onChange={handleFilter} />
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

    if (persons.some(person => person.name === personObject.name)) {
      alert(`${newName} is already in phonebook`) // nämä on backtickejä eikä lainausmerkkejä
      console.log('popup nyt')
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


      personService // pitää olla addPerson sisällä
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
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNum} />
        </div>
        <div>
          <button onClick={addPerson} type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Etsi persons={persons} setPersons={setPersons}/>
    </div>
  )

}

export default App