
import { useState } from 'react';
import './App.css';

function App() {
  const [name,setName]=useState({name:"Kamil"});
  const [lastName,setLastName]=useState("Erbas");
  const [number,setNumber]=useState(0);
  const [friends,setFriends]=useState(['Ahmet','Murat'])
  const [address,setAddress]=useState({title:"Istanbul",zip:3455})
  //setName-camelCase olarak yazilir zorunluluk degil yazim standartidir ve onemlidir..
  const handleClick=()=>{
    console.log("Running");
    setNumber(previousstate=>previousstate+1);
  }
  function handleClick2(){
    console.log("Running");
    setNumber(number+1);
  }

  const handleClick3=(newName)=>{
      setFriends([...friends,newName]);
  }
  const handleClick4=(newName)=>{
    setFriends(previousstate=>[newName,...previousstate]);//Basina ekletmek istersek ekleyecegimiz degiskeni basina yazariz...
}

const handleClick5=(newAddress)=>{
    newAddress={...address,...newAddress}
    setAddress(previousstate=>newAddress)
}
    const {title,zip}=address;
  return (
    <div className="App">
     <h1>Welcome {name.name}</h1> 
     <h2>{number}</h2>
     <h2>{title}- {zip}</h2>
    {/* <label>Name:  </label>
     <input value={name}  name="" />
     <br/>
     <br/>
     <label>LastName:  </label>
     <input value={name}  name="" /> */}
     <button onClick={()=>setName({
       name:"Adnan"
     })}>Click!</button>
     <button onClick={handleClick} >Increase</button>
     <br/>
     <button onClick={handleClick2} >Increase2</button>
      <br/>
     <button onClick={e=>handleClick3("Kamil")} >
       AddNewFriend
     </button>
     <br/>
     <button onClick={e=>handleClick4("Erik")} >
       AddMYNewFriend
     </button>
     <br/>  <br/>
     <button onClick={e=>handleClick5({title:"Skien", zip:3735})} >
       ChangeAddress
     </button>
     <br/>  <br/>
     <hr/>

   {friends.map((friend,index)=>(
     <div key={index}>{friend}</div>
   ))}
    </div>
  );
}

export default App;
//setName in ici ne ise
