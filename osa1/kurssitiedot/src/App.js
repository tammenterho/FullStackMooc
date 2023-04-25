


const Course = (course) => {
  console.log('tämä on course', course)


  const Total = ({ total }) => {
    console.log('total saa tämän', total)
    const summa = total.reduce((sum, total) => sum + total.exercises, 0)
    // https://www.youtube.com/watch?v=Wl98eZpkp-c täällä selitys


    return (
      <div>
        <p>Total: {summa} </p>
      </div>
    )
  }

  const Header = ({ header }) => {
    console.log('otsikko tässä', header)

    return (
      <div>
        <h1> {header} </h1>
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
