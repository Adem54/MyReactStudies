import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo,addTodoAsync,selectAddTodoLoading,selectAddTodoError } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";
const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const loading=useSelector(selectAddTodoLoading);
  const error=useSelector(selectAddTodoError);
 
  //Yeni bir kural, action functionlarinin parantezine state objesini gondermemiz gerekiyor...
  //Ya da obje icinde gondemremiz gerekiyuor bunu bir test edelim
  const handleSubmit=async (e) => {
    e.preventDefault();
    if(!title) alert("Lutfen title a deger giriniz...."); 
   // dispatch(addTodo({id:nanoid(),title,completed:false}));
    //  dispatch(addTodo({title}));
  console.log("title: ",title);
    await dispatch(addTodoAsync({title}));
    //parametreyi de aynen, api nin bizden bekledgi sekilde gonderiyoruz...
    setTitle('');
  }
  //Hata durumunda bu sekilde de verebiliriz
  //Ya da alert de kullanabiliriz...
  if(error)return <Error message={error}/>
  return (
    <form
      onSubmit={handleSubmit} style={{display:"flex",alignItems:"center"}}>
      <input
      //Bu onemli....
        disabled={loading}//Eger loading true olursa inputa birsey girmemize izin verilmesin diyoruz...
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {loading && <Loading/>}
    </form>
  );
};

export default Form;

