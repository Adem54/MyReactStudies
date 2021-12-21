import React from 'react'
import {Button,Form,FormGroup,Label,Input} from 'reactstrap';
import {useState} from 'react';
import alertify from "alertifyjs";

 function FormDemo2() {
     const [form2,setForm2]=useState({email:"",password:"",city:"", description:""});
     const handleChange=(e)=>{
        let name=[e.target.name];
        let value=e.target.value;
           setForm2({
                ...form2,
                [name]:value
            })      
    }

  const handleSubmit=(e)=>{
      e.preventDefault();
      alertify.success(`${form2.email}  added to db!`  )
      alertify.success(` ${form2.description} added to db!`  )
      alertify.success(`${form2.city}   added to db!`  )
      
  }      
   
    return (
        <div>
            <Form onSubmit={handleSubmit}>
           <FormGroup>
           <Label for="email">Email </Label>
           <Input type="email" name="email" id="email" placeholder="Enter email" onChange={handleChange} />
           </FormGroup>
           <FormGroup>
           <Label for="password">Password </Label>
           <Input type="password" name="password" id="password" placeholder="Enter password" onChange={handleChange} />
           </FormGroup>
           <FormGroup>
           <Label for="description">Description </Label>
           <Input type="textarea" name="description" id="description" placeholder="Enter description" onChange={handleChange} />
           </FormGroup>

           <FormGroup>
               <Label for="city">City</Label>
               <Input  type="select" name="city" id="city" onChange={handleChange} >
                   <option>Skien</option>
                   <option>Trondheim</option>
                   <option>Porsgrunn</option>
                   <option>Larvik</option>
                   <option>Tønsberg</option>
               </Input>
           </FormGroup>
           <Button type="submit">Save</Button>
            </Form>
        </div>
    )
}

export default FormDemo2;