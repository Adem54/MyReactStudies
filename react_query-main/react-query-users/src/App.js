import { useState } from 'react';
import './App.css';
import UserList from './UserList';


function App() {
const [user,setUser]=useState(0);
const values={user,setUser}
  return (
    <div className="App">
    <h3>React</h3>
    <UserList {...values}/>
    </div>
  );
}

export default App;
