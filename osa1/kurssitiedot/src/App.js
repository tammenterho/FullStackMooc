
const Header = (props) => {

  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
  
}

const Part = ({p, t}) => {
  console.log('tämän saa Part', p, t)

  return(
    <div>
      <p>{p} - {t}</p>
    </div>
  )
}

// objekti tarvii propseihin ({}) sulkeet
const Content = ({parts}) => {
  console.log(parts)
  
  return(
    <div>
        <Part p = {parts[0].name} t = {parts[0].exercises} /> 
        <Part p = {parts[1].name} t = {parts[1].exercises}/> 
        <Part p = {parts[2].name} t = {parts[2].exercises}/>
    </div>
  )

}

const Total = (props) => {

  return(
    <div>
      <p>Total: {props.total}</p>
    </div>
  )
}
 

const App = () => {
  const course = 'Half Stack application development'

  const parts = [
    {name:'Fundamentals of React',
   exercises: 10},

  {name: 'Using props to pass data',
  exercises:  7},

  {name: 'State of a component',
  exercises: 13}
  ]
  
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  
return (
  <div>
    <Header course= {course}/>
    <Content parts= {parts} />
    <Total total = {total}/>
  </div>
)

}

export default App;
