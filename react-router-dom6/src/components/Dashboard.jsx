import React from 'react'

const Dashboard = ({user}) => {
    const {name,email}=user;
  return (
    <div>
      <h3>DashboardPage</h3>
      <h5>Hello, {name}</h5>
      <h5>{email}</h5>
    </div>
  )
}

export default Dashboard
