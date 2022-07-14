import React from 'react'

const Main = (props) => {
  return (
    <div className="container">
     {props.name} Application
     Private sayfaya girebilmek icin tikla: <a href="private">PrivateComponent</a>
    </div>
  )
}

export default Main
