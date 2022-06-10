import React from 'react'

const AddNewContact = ({newContact,setNewContact,addNewCont}) => {
    
  const handleChange=(e)=>{
      setNewContact({
        ...newContact,
        [e.target.name]:e.target.value
      })
      console.log(`newContact: ${newContact.name}- ${newContact.tel}`);
  }
  const {name,tel}=newContact;
  return (
    <>
    <div>
       <input style={{width:'300px', height:'25px'}} placeholder="Contact-Name"
       name="name"
       onChange={handleChange}
       value={name}
       />
       <br/><br/>
       <input style={{width:'300px', height:'25px'}} placeholder="Contact-Tel"
       name="tel"
       onChange={handleChange}
       value={tel}
       />
       <br/>
       <br/>
       <button style={{marginRight:'-20%'}}
       onClick={()=>addNewCont(newContact)}
       >Add</button>
    </div>
    </>
  )
}

export default AddNewContact;