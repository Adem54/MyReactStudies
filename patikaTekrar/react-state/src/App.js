
import { useState } from 'react';
import './App.css';

function App() {
  const [name,setName]=useState({name:"Kamil"});
  const [lastName,setLastName]=useState("Erbas");
  //setName-camelCase olarak yazilir zorunluluk degil yazim standartidir ve onemlidir..
  return (
    <div className="App">
     <h1>Welcome {name.name}</h1> 
    {/* <label>Name:  </label>
     <input value={name}  name="" />
     <br/>
     <br/>
     <label>LastName:  </label>
     <input value={name}  name="" /> */}
     <button onClick={()=>setName({
       name:"Adnan"
     })}>Click!</button>
    </div>
  );
}

export default App;
//setName in ici ne ise
