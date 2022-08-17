import React, { useEffect,useCallback } from 'react'
import { useReminderContext } from './context/ReminderContext';
import axios from "axios";
import Person from './Person';

const url="http://localhost:3500/users";
const PersonList = () => {
    const {data,setData,clearAll}=useReminderContext();
    console.log("data: ",data)

    const getUsers=useCallback(async()=>{
        try {
        const res=await axios.get(url);
         setData(res.data);   
        } catch (error) {
            console.error("Get request failed");
        }

    },[url])
    
    const getPeopleHaveBirthday=()=>{
         return data?.filter(user=>{
          const date=new Date(user.birthday).getDate();
          const today=new Date().getDate();
          if(date===today){
        
            return user;
          }
         });
    }

    
    useEffect(()=>{
     console.log("useEffect");   
    getUsers();
    },[getUsers])
  return (
    <div className="person-list">
        <p className="top-text">{data?.length} birthdays today</p>
      {getPeopleHaveBirthday()?.map((user)=>(
        <div key={user.id}>
        <Person  user={user}/>
        </div>
      ))}
      <button className="btn" onClick={()=>clearAll()}>Clear All</button>
    </div>
  )
}

export default PersonList
