import React from 'react'
import { person } from './Types'





const Person:React.FC<PersonPropsType> = ({user}) => {
  const getAge=new Date().getFullYear()- new Date(user.birthday).getFullYear();
   
  return (
    <section className="section-person">
    <div className="person">
      <img src={user.image} alt={user.name}/>
      <div className="personInfo">
        <h4 className="h4-name">{user.name}</h4>
        <p className="p-age">{getAge} years</p>
      </div>
    </div>
    </section>
  )
}

interface PersonPropsType {
    user:person
}

export default Person
