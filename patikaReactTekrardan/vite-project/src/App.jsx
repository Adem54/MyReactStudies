import './App.css';
import Header from "./components/Header";
import User from './components/User';

const friends=[{id:1,name:"Tayfun"}, {id:2,name:"Ahmet"}, {id:3,name:"Cenk"}];

function App() {
  return (
    <div className="App">
     <h2>Welcome to React</h2> 
     <User name="Adem" lastName="Erbas" isLoggedIn={true} friends={friends}/>
     <Header/>
    </div>
  )
}

export default App
