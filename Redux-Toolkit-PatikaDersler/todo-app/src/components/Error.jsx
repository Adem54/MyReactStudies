import React from 'react'

const Error = ({message}) => {
  return (
    <div style={{padding:"15px",fontSize:"18px",color:"tomato"}}>Error: {message}</div>
  )
}

export default Error