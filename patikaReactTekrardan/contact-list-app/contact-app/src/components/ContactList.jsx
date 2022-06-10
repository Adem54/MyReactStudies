
import React from 'react'
const ContactList = ({contacts,searchText}) => {
   
    let filteredContacts=contacts.filter(contact=>contact.name.toLowerCase().includes(searchText.toLowerCase()) || contact.tel.toString().includes(searchText))
  return (
      <>
      <ul>
          {filteredContacts.map(({name,tel},index)=>( 
            <li key={index} style={{listStyle:'none', fontFamily:'tahoma', fontWeight:'normal'}}>{`${name}-${tel}`} </li>
          ))}
      </ul>
      </>
  )
}

export default ContactList