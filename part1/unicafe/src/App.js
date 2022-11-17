import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <h2>statistics</h2>
        <div>no response yet</div>
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <StatisticLine text={"good"} value={good}></StatisticLine>
          </tr>
          <tr>
            <StatisticLine text={"neutral"} value={neutral}></StatisticLine>
          </tr>
          <tr>
            <StatisticLine text={"bad"} value={bad}></StatisticLine>
          </tr>
          <tr>
            <StatisticLine text={"all"} value={good + neutral + bad}></StatisticLine>
          </tr>
          <tr>
            <StatisticLine text={"average"} value={(good + 0 + (bad * -1)) / (good + neutral + bad)}></StatisticLine>
          </tr>
          <tr>
            <StatisticLine text={"positive"} value={good / (good + neutral + bad) * 100}></StatisticLine>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={"good"}></Button>
      <Button handleClick={handleNeutral} text={"neutral"}></Button>
      <Button handleClick={handleBad} text={"bad"}></Button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App
