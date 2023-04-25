import { useState } from 'react'

const Numbers = ({ filteredPersons }) => {

  return (
    <div>
      {filteredPersons.map(person =>
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const Etsi = ({persons}) => {

  const [filtteri, setNewFiltteri] = useState('')
  const handleFilter = (event) => {
    setNewFiltteri(event.target.value)
  }
  
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filtteri.toLowerCase()))


  return(
    <div>
    etsi: <input value={filtteri} onChange={handleFilter} />
    <Numbers filteredPersons={filteredPersons} />
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  // const [filtteri, setNewFiltteri] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNum = (event) => {
    setNewNumber(event.target.value)
  }
  /*
   const handleFilter = (event) => {
    setNewFiltteri(event.target.value)
  }
*/
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
    }
  }

  // const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filtteri.toLowerCase()))




  return (
    <div>
      <h2>Phonebook</h2>

      {/* etsi: <input value={filtteri} onChange={handleFilter} /> */}
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
      <Etsi persons={persons}/>

      {/*
      {persons.map(pers =>
        <p key={pers.name}>{pers.name} {pers.number}</p>)}
      
        <div>
        {filteredPersons.map(person =>
          <p key={person.name}>{person.name} {person.number}</p>
        )}
        
      <Numbers filteredPersons={filteredPersons} />
        */}

    </div>
  )

}

export default App