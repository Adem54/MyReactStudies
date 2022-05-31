import React,{useState} from 'react'

 function FormDemo1() {
     const [form,setMystate]=useState({userName:"",city:"",adress:""})
     const onChangeHandler=(e)=>setMystate({
             ...form,
             //userName:e.target.value
             [e.target.name] : e.target.value,//Burda e.target.value biz hangi inputta calisir isek ordaki properties in degeri icin calissin bunu ancak bu sekilde saglariz...
             //name attributu dikkat edelim state ismimz ile ayni isimde
         })
     
         const onSubmitHandler=(e)=>{
             e.preventDefault();
             alert(form.userName)
         }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
            <h3>User Name</h3>
            <input  onChange={onChangeHandler} value={form.userName}  name="userName" type="text"/> 
            <h3>User Name is {form.userName}</h3>
            <h3>City</h3>
            <input  onChange={onChangeHandler} value={form.city}  name="city" type="text"/> 
            <h3>City Name is {form.city}</h3>
            <h3>Adress</h3>
            <input  onChange={onChangeHandler} value={form.adress}  name="adress" type="text"/> 
            <h3>Adress is {form.adress}</h3>
            <input type="submit" value="Submit" />
                       </form>
        </div>
    )
}
export default FormDemo1;
