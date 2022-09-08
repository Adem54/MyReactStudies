import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
console.log("name, email : ",name + " - ", email)

const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        //Form islemlerinde her zaman alanlarin doldurulmamasi durumlari goz onunde
        //bulundurulmalidir...
        if(!name || !email) return;
        setUser({name,email})
        navigate("/dashboard");
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
<h5>login</h5>
<div>
    <label htmlFor="name">name  </label>
    <input  type="text" id="name" value={name}
    onChange={(e)=>setName(e.target.value)}
    />
<br/>
<br/>
<label htmlFor="email">email  </label>
    <input  type="text" id="email" value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />

</div>
<br></br>
<br></br>
<button>Login</button>

      </form>
    </div>
  )
}

export default Login
