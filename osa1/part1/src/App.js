
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age}</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Mikkeli'
  const ika = 10

  return (
  <div>
   <h1>Greetings</h1>
   <Hello name="Mikko" age={23+6} />
   <Hello name={nimi} age={ika} />
  </div>
  )
}

export default App