import {useEffect, useState} from 'react';


const initialForm={fullname:"", phone_number:""}
const Form = ({addContact,contacts}) => {
    const [form,setForm]=useState(initialForm);

    const onChangeInput=(event)=>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        if(form.fullname==="" || form.phone_number===""){
            return false;
        }
        console.log("form: ", form);
        addContact([
            ...contacts,
            form
        ])
      //  setForm(initialForm);
    }

    useEffect(()=>{
       setForm(initialForm); 
    },[contacts])

    const {fullname,phone_number}=form;
   
  return <form  onSubmit={onSubmit}>
      <div><input name="fullname" value={fullname} placeholder='Fullname'  onChange={onChangeInput} /></div>
      <div><input name="phone_number" value={phone_number} placeholder='Phone Number'  onChange={onChangeInput}/></div>
      <div>
          <button className='btn' >Add New Contact</button>
      </div>
      
  </form>;
};

export default Form;
