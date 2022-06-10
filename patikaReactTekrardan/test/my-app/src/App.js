
import './App.css';
import Header from './components/Header'; 
import User from './components/User';


const friends=[{id:1,name:"Tayfun"}, {id:2,name:"Ahmet"}, {id:3,name:"Cenk"}];

function App() {
  return (
    <>
    <div className="App">
      <User name="Adem" surname={`Erbas`} departman={34} isLoggedIn={true} age={34}
      friends={friends} 
      address={{
        title:"Skien",
        zip:3735
      }}
      />
      <Header/>
    </div>
    </>
  );
}

export default App;
