import React from 'react'

const Header = ({number,setNumber,increment}) => {
  console.log("header rendering...");
  return (
    <h3>
      HEADER- {number}
      <br/>
      <br/>
      <button onClick={increment}>Click</button>
    </h3>
  )
}

export default React.memo(Header)
