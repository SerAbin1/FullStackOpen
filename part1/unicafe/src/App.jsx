import { useState } from 'react'

const Statistics = ({ good, neutral, bad, average, positive}) => {
    if((good + neutral + bad) !== 0) {
   return (
        <div>
       <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>average {average === 0? 0 : average / (good + bad + neutral)}</p>
      <p>positive {good / (good + bad + neutral) * 100}</p>
      </div>
     ) 
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    const [average, setAvg] = useState(0)
    const [positive, setPos] = useState(0)

    const goodSet = () => {
        setGood(good + 1)
        setAvg(average + 1)
    }

    const neutralSet = () => {
        setNeutral(neutral + 1)
    }

    const badSet = () => {
        setBad(bad + 1)
        setAvg(average - 1)
    }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodSet} text="good" />
      <Button onClick={neutralSet} text="neutral" />
      <Button onClick={badSet} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} average={average} positive={positive} />
    </div>
  )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}


export default App
