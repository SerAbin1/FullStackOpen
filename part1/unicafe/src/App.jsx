import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, average, positive }) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average / total} />
          <StatisticLine text="positive" value={(good / total) * 100 + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAvg] = useState(0)

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
      <Statistics good={good} neutral={neutral} bad={bad} average={average} />
    </div>
  )
}

export default App
