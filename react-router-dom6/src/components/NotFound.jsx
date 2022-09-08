import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h2>404</h2>
        <h5>Page Not Found</h5>
      <Link to="/">Back Homepage</Link>
    </div>
  )
}

export default NotFound
