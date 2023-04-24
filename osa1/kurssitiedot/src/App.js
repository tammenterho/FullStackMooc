


const Course = (course) => {
  console.log('tämä on course', course)

  


const Header = ({header}) => {
  console.log('otsikko tässä', header)

  return(
    <div>
      <h1> {header} </h1>
    </div>
  )
  
}

const Part = ({p, t}) => {
  console.log('tämän saa Part', p, t)

  return(
    <div>
      <p>{p}: {t}</p>
    </div>
  )
}

// objekti tarvii propseihin ({}) sulkeet
const Content = ({content}) => {
  console.log('tämä on kontenttii', content)
  
  return(
    <div>
        <Part p = {content[0].name} t = {content[0].exercises} /> 
        <Part p = {content[1].name} t = {content[1].exercises}/> 
        <Part p = {content[2].name} t = {content[2].exercises}/>
    </div>
  )

}
/*
const Total = ({parts}) => {
  console.log('total saa tämän', parts[0].exercises)
 const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return(
    <div>
      <p>Total:  {total}</p>
    </div>
  )
}
*/
console.log('tässä kaikki', course)
return (
  <div>
    <Header header={course.course.name} />
    <Content content={course.course.parts} />
  </div>
)
}
 

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
