import React from 'react'

const User = (props) => {
   const {name,lastName,isLoggedIn,friends}=props;
  return (
      <>
    <h3>{ isLoggedIn ? `Benim adim ${name} soyadim ${lastName} ` : "Giris yapmadiniz"}</h3>
    <ul>
        {friends.map(({name,id})=>(
            <li style={{listStyle:'none', fontSize:'1.5rem'}} key={id}>{name}</li>
        ))}
    </ul>
    </>
  )
}

export default User