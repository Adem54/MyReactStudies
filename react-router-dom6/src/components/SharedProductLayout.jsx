import React from 'react'
import { Outlet } from 'react-router-dom'

const SharedProductLayout = () => {
  return (
    <div>
      <h2>Products</h2>
      <Outlet/>
    </div>
  )
}

export default SharedProductLayout
