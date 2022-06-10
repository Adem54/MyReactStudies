import { useState } from 'react'

import './App.css'
import ContactList from './components/ContactList'
import SearchContact from './components/SearchContact'
import AddNewContact from './components/AddNewContact'
let initialContacts=[{name:"Adem",tel:46241369},{name:"Zehra",tel:18454669},{name:"Zeynep",tel:84638319}]
let initialContact={name:"",tel:""};
let initialSearchText="";
function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [newContact,setNewContact]=useState(initialContact);
  const [searchText,setSearchText]=useState(initialSearchText)
 
  const addNewCont=(contact)=>{
      setContacts([
        ...contacts,
        contact
      ])
      setNewContact(initialContact)
  }
  return (
    <div className="App">
      <h2 style={{color:'red'}}>Contact List App</h2>
      <SearchContact  searchText={searchText} setSearchText={setSearchText}/>
      <br/>
      <br/>
    
      <ContactList contacts={contacts} searchText={searchText}/>
      <br/>
      <br/>
      <AddNewContact  newContact={newContact} setNewContact={setNewContact} addNewCont={addNewCont}/>
    </div>
  )
}

export default App
