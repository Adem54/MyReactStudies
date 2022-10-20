import axios from "axios";

import './App.css';
function App() {

  const fetchUsers=async()=>{

   axios.get("https://jsonplaceholder.typicode.com/users");
  //const user=use(fetchUsers);


  }
  return (
    <div className="App">
      <h3>React-typescript</h3>
    </div>
  );
}

export default App;
