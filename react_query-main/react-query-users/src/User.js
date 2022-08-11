import React, { useState } from "react";
import UserDetail from "./UserDetail";
const User = (props) => {
    const { data,user, setUser }=props;
    const [show,setShow]=useState(false);
    
  return (
    <div>
      <li style={{display:"inline-block",marginBottom:".5rem"}}>{data.name}</li>
      <button
      style={{marginLeft:"2rem"}}
        onClick={() => {
          setUser(data);
          setShow(show=>!show);
        
        }}
      >
        View
      </button>
      {show ? <UserDetail user={user}/> : null}
    </div>
  );
};

export default User;
