import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/todoContext'
import { TodoContextType,ITodo } from '../@types/todo'



const AddTodo:React.FC = () => {
    const {saveTodo}=useContext(TodoContext) as TodoContextType;
    const [formData,setFormData]=useState<ITodo>({} as ITodo)

    /*
const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
    const handleForm=(e:React.FormEvent<HTMLInputElement>):void=>{
        Biz eger form elemnleri icindeki inputa ait onChange i yukardaki gibi type ini kullanir isek  o zaman burda event.target kullanamayiz, event.currentTarget kullanabiliriz, ama event.target kullanmak istersek de o zaman asagidaki gibi islem yapariz...
         const handleForm=(e:React.ChangeEvent<HTMLFormElement>):void=>{
        const {name,value}=e.target;

         const handleForm=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        const {name,value}=e.target;
            setFormData({
                ...formData,
                [name]:[value]
            })
    }
    */
    const handleForm=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        const {name,value}=e.target;
            setFormData({
                ...formData,
                [name]:[value],
            })
    }

    const handleSaveTodo=(e:React.FormEvent, formData:ITodo | any)=>{
        e.preventDefault();
        saveTodo(formData)
    }
    const {title,description}=formData;
    const canSave=Boolean(title) && Boolean(description);
  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e,formData)}>
      <div>
        <div>
          <label htmlFor="name">Title</label>
          <input onChange={handleForm} name="title" type="text" id="name" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input onChange={handleForm} name="description" type="text" id="description" />
        </div>
      </div>
      <button disabled={!canSave}>Add Todo</button>
    </form>
  )
}

export default AddTodo
