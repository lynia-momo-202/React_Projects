import React, { useState } from 'react'
import './App.css'

function ColorGenerator() {
    const[color,setColor]=useState('#FFFFFF')
    const handleGenerate =() =>{
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        // console.log(randomColor)
        setColor('#'+randomColor)
    }

  return (
    <div style={{ height: '100vh' , backgroundColor: color ,textAlign: 'center' }}>
        <h2>Color Generator</h2>
        <button onClick={handleGenerate}>Generate</button>
        <h3>{color}</h3>
    </div>
  )
}

export default ColorGenerator