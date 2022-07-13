import React from 'react'
import {useParams} from "react-router-dom";
import EditForm from './EditForm';
import { contactSelectors } from "../../redux/contactSlice";
import { useSelector } from 'react-redux';


const Edit = () => {
    const {id}=useParams();
    //parametrede id verilen selectById parametreye state ve id verecegiz
const contact = useSelector(state=>contactSelectors.selectById(state,id));
console.log("contact: ",contact);
/* Bizim edit diye gittgimiz obje yi bize getiriyor EntityAdapter ile, bu selectById EntityAdapter icerisinden geliyor */
/*{id: 's62TNcolUahXRolYpT0YQ', name: 'adem', phone_number: '435435'} */
  
   
    //Burada formu kullan
  return (
    <div>
        <h2>Edit</h2>
        <EditForm contact={contact}/>
    </div>
  )
}

export default Edit