import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({ good, neutral, bad, average, positive }) => {
  const all = good + neutral + bad

  if (all !== 0) {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average === 0 ? 0 : average / all} />
        <StatisticLine text="positive" value={(good / all) * 100} />
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

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
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

export default App

