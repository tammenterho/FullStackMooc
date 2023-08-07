


const Course = (course) => {
  console.log('tämä on course', course)


  const Total = ({ total }) => {
    console.log('total saa tämän', total)
    const summa = total.reduce((sum, total) => sum + total.exercises, 0)
    // https://www.youtube.com/watch?v=Wl98eZpkp-c täällä selitys


    return (
      <div>
        <b>Total: {summa} </b>
      </div>
    )
  }

  const Header = ({ header }) => {
    console.log('otsikko tässä', header)

    return (
      <div>
        <h3> {header} </h3>
      </div>
    )

  }



  // objekti tarvii propseihin ({}) sulkeet
  const Content = ({ content }) => {
    console.log('tämä on kontenttii', content)


    return (
      <div>
        {content.map(cont =>
          <p key={cont.id}>
            {cont.name}: {cont.exercises}
          </p>
        )}
        <Total total={content} />
      </div>
    )

  }

  console.log('tässä kaikki', course)
  
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header header={course.course[0].name} />
      <Content content={course.course[0].parts} />
      <Header header={course.course[1].name} />
      <Content content={course.course[1].parts} />
    </div>
  )
}


const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course={courses} />
    </div>
  )
}

export default App
