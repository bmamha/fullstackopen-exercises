import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral ,setNeutral] = useState(0)
  const [bad , setBad] = useState(0)
  


  const goodClick = () => {
   
    const updateGood = good + 1
    setGood(updateGood)
  }

  const neutralClick = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const badClick = () => {
    const updateBad = bad + 1
    setBad(updateBad)
  }

  const all = good + bad + neutral
  const average = ((good + (-1 * bad))/all).toFixed(2)
  const positive = ((good/all) * 100).toFixed(2) + "%"


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick = {goodClick} text='good'/>
      <Button onClick ={neutralClick} text='neutral'/>
      <Button onClick ={badClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} 
       positive={positive}/>
    
    </div>
  )
}


const Button = ({onClick, text}) => {
  return (
<button onClick= {onClick}>
  {text}
</button>
  )
}

const StatisticsLine = ({value, text}) => {
return (
<tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>
)
}
const Statistics = ({good,neutral,bad,all,average,positive}) => {
  if(good+neutral+bad === 0){
    return (
      <>
      <h2>Statistics</h2>
      <div>No feedback given</div>
      </>
    )
  }
  return (
    <div>
    <h2>Statistics</h2>
    <table>
      <tbody>
    <StatisticsLine value={good} text='good'/>
    <StatisticsLine value = {neutral} text= 'neutral'/>
    <StatisticsLine value = {bad} text= 'bad'/>
    <StatisticsLine value = {all} text='all'/>
    <StatisticsLine value = {average} text='average'/>
    <StatisticsLine value = {positive} text='positive'/>
    </tbody>
    </table>
    </div>
  

  )
}



export default App



