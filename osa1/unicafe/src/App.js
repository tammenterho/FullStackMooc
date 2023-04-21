import { useState } from 'react'

const Button = (props) => (
  
  <button onClick={props.handleClick}>{props.text}
  </button>
  
)

const Total = (props) => {
  const total = props.good + props.neutral + props.bad // ilman {} sulkeita koska en voi objekteilla laskea
  const average = ((props.good * 1) + (props.bad * -1)) / total
  const positive = (props.good / (props.bad + props.neutral + props.good)) * 100

  return (
    <div>
<p>Total {total}</p>
<p>Average {average}</p>
<p>Positive {positive}%</p>
</div>
  )
}




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

console.log(good)
console.log(neutral)
console.log(bad)





  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"  />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"  />
      <Button handleClick={() => setBad(bad + 1)} text="bad"  />
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <Total 
      good= {good}
      neutral= {neutral}
      bad= {bad}
      />
    </div>
  )
}

export default App