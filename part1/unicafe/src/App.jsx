import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

    const goodSet = () => {
        setGood(good + 1)
    }

    const neutralSet = () => {
        setNeutral(neutral + 1)
    }

    const badSet = () => {
        setBad(bad + 1)
    }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodSet} text="good" />
      <Button onClick={neutralSet} text="neutral" />
      <Button onClick={badSet} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    )
}


export default App
