import React, { useState } from 'react'
import SingleColor from './SingleColor'

import Values from 'values.js'


const defList=new Values('#f15025').all(10);
console.log("defList: ",defList);
console.log("defList: ",defList[0].hex);//icinde hex propertyi si var

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#f15025').all(10))

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      let colors = new Values(color).all(10)
      console.log("colors: ",colors);
      console.log("colors: ",colors[0].hex);//bu ffffff olarak gelir en acik rengin en acik kismi olarak gelir
      console.log("colors: ",colors[0].rgbString());
      console.log("colors: ",colors[0].hexString());
      setList(colors)
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  return (
    <>
      <section className='container'>
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder='#f15025'
            className={`${error ? 'error' : null}`}
          />
          <button className='btn' type='submit'>
            submit
          </button>
        </form>
      </section>
      <section className='colors'>
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          )
        })}
      </section>
    </>
  )
}

export default App
