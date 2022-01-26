import React, { useEffect, useState } from 'react';
import ContactList from './ContactList';
import Form from './Form';
import './style.css';

const initialContacts=[{fullname:"Adem Erbas", phone_number:"2342343"}];
const Contacts = () => {
    const [contacts,setContacts]=useState(initialContacts);
    useEffect(()=>{
        console.log(contacts);
    },[contacts])
  return <div id="container">
      <h1>Contacts</h1>    
      <ContactList contacts={contacts}/>
      <Form  addContact={setContacts} contacts={contacts}  />
  </div>;
};

export default Contacts
