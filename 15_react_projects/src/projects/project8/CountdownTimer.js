import { useEffect, useState } from "react"
import'./App.css'

function CountdownTimer() {
  const [number, setNumber] = useState()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(()=>{
      setCount((decompte)=> {
        if(decompte<=1){
          clearInterval(timer)
          return 0
        }
        return decompte-1})
    },1000)
    return()=>{
      clearInterval(timer)
    }
  },[number]);

  const handleChange = (num) => {
    setNumber(num)
    setCount(num)
  }

  return (
    <div className="timer-container">
        <h1 className="timer-header">Countdown Timer</h1>
      <input
      className="timer-input"
        type="number"
        step="0"
        placeholder="set time in seconds"
        value={number}
        onChange={(e)=>handleChange(e.target.value)}
      />

      <p className="time-display">{count} seconds remainig</p>
    </div>
  )
}

export default CountdownTimer
