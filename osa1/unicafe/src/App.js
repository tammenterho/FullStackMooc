import { useState } from 'react'
import './App.css';


const Button = (props) => (

  <button onClick={props.handleClick}>{props.text}
  </button>

)

const Statistics = (props) => {

  const total = props.good + props.neutral + props.bad // ilman {} sulkeita koska en voi objekteilla laskea
  const average = ((props.good * 1) + (props.bad * -1)) / total
  const positive = (props.good / (props.bad + props.neutral + props.good)) * 100
  

  if (total === 0) {
    return (
      <div>the app is used by pressing the buttons</div>
    )
  }


  return (
    <table className='lista'>
      <tbody>
      <tr>
        <td>good</td><td>{props.good}</td>
      </tr>
      <tr>
        <td>neutral</td><td>{props.neutral}</td>
      </tr>
      <tr>
      <td>bad</td><td>{props.bad}</td>
      </tr>
      <tr>
      <td>Total</td><td>{total}</td>
      </tr>
      <tr>
      <td>Average</td><td>{average}</td>
      </tr>
      <tr>
      <td>Positive</td><td>{positive}%</td>
      </tr>
      </tbody>
    </table>
  )
}




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  function getRandomInt(max) {
    const randomInt =  Math.floor(Math.random() * max);
    console.log(randomInt)
    return randomInt
  }
  
  const handleAneClick = () => {
    setSelected(getRandomInt(anecdotes.length))
  }

  
  


  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
      <br></br>
      <div>
      {anecdotes[selected]}<br></br>
      <button onClick={handleAneClick}>anekdootti</button>
      <button>vote</button>
      <p>Has numero votes</p>
      </div>
    </div>
  )
}
// vote ei toimi
export default App